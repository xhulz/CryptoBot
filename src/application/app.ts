import "reflect-metadata";
import dotenv from "dotenv";
import { container } from "tsyringe";

import TickerService from "../domain/service/tickerService";
import Configuration from "../infra/config/configuration";
import Database from "../infra/config/database";
import Ioc from "../infra/config/ioc";

(async () => {
  // Starting environment config
  dotenv.config();

  // Starting inversion of control
  const ioc = new Ioc();
  ioc.configureServices();

  // Starting the configuration
  const configuration = container.resolve(Configuration);
  const interval = configuration.Timer;

  // Starting the database
  const database = container.resolve(Database);
  await database.startService();

  // Starting the ticker
  const tickerService = container.resolve(TickerService);
  let timer: ReturnType<typeof setInterval>;

  try {
    timer = setInterval(async () => {
      await tickerService.start();
    }, interval);
  } catch (error) {
    console.log(error.message);
    clearInterval(timer);
  }
})();
