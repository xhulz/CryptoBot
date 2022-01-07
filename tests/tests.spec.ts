import "reflect-metadata";

import dotenv from "dotenv";
import mongoose from "mongoose";
import { container } from "tsyringe";

import Alert from "../src/domain/model/alert";
import Currency from "../src/domain/model/currency";
import Ticker from "../src/domain/model/ticker";
import TickerService from "../src/domain/service/tickerService";
import Database from "../src/infra/config/database";
import Ioc from "../src/infra/config/ioc";
import TickerIntegration from "../src/infra/integration/tickerIntegration";
import AlertRepository from "../src/infra/repository/alertRepository";
import TickerRepository from "../src/infra/repository/tickerRepository";

// Starting environment config
dotenv.config();

// Starting inversion of control
const ioc = new Ioc();
ioc.configureServices();

const alertRepository = container.resolve(AlertRepository);
const tickerIntegration = container.resolve(TickerIntegration);
const tickerRepository = container.resolve(TickerRepository);
const tickerService = container.resolve(TickerService);

const currency: Currency = {
  ask: 42693.8286054628,
  bid: 42508.6457792761,
  currency: "USD",
  pair: "BTCUSD",
};

const alert: Alert = {
  currency,
  currentPrice: 43,
  oldPrice: 42,
  variationPercentage: 2.35294,
};

jest.mock("../src/infra/repository/alertRepository");
jest.mock("../src/domain/service/tickerService");

describe("Database testing", () => {
  it("Should connect to the database", async () => {
    const database = container.resolve(Database);
    await database.startService();
    database.startService().then(() => {
      expect(mongoose.connection.readyState).toBe(1);
    });
  });
});

describe("Alert repository testing", () => {
  it("Should save log on database", async (done) => {
    await alertRepository.create(alert);
    expect(AlertRepository).toHaveBeenCalledTimes(1);
    done();
  });
});

describe("Ticker integration testing", () => {
  it("Should retreive information from ticker", async (done) => {
    const ticker: Ticker = await tickerIntegration.get();
    expect(ticker).not.toBeNull();
    done();
  });
});

describe("Ticker repository testing", () => {
  it("Should retreive information from current ticker", async (done) => {
    const ticker: Ticker = await tickerRepository.getCurrentTicker();
    expect(ticker).not.toBeNull();
    done();
  });

  it("Should retreive information from oldest ticker in 24 hours", async (done) => {
    const ticker: Ticker = await tickerRepository.getOldestTickerIn24h();
    expect(ticker).not.toBeNull();
    done();
  });
});

describe("Ticker service testing", () => {
  it("Should start the bot service", async (done) => {
    await tickerService.start();
    expect(TickerService).toHaveBeenCalledTimes(1);
    done();
  });
});
