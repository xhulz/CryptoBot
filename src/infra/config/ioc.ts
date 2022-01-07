import IDatabase from "src/domain/interface/configuration/iDataBase";
import { container } from "tsyringe";

import IConfiguration from "../../domain/interface/configuration/iConfiguration";
import ITickerIntegration from "../../domain/interface/integration/iTickerIntegration";
import IAlertRepository from "../../domain/interface/repository/iAlertRepository";
import ITickerRepository from "../../domain/interface/repository/iTickerRepository";
import ITickerService from "../../domain/interface/service/iTickerService";
import TickerService from "../../domain/service/tickerService";
import TickerIntegration from "../integration/tickerIntegration";
import AlertRepository from "../repository/alertRepository";
import TickerRepository from "../repository/tickerRepository";
import Configuration from "./configuration";
import Database from "./database";

export default class Ioc {
  public configureServices(): void {
    container.register<IConfiguration>(Configuration, {
      useClass: Configuration,
    });

    container.register<IDatabase>(Database, {
      useClass: Database,
    });
    container.register<ITickerIntegration>(TickerIntegration, {
      useClass: TickerIntegration,
    });
    container.register<ITickerRepository>(TickerRepository, {
      useClass: TickerRepository,
    });
    container.register<ITickerService>(TickerService, {
      useClass: TickerService,
    });
    container.register<IAlertRepository>(AlertRepository, {
      useClass: AlertRepository,
    });
  }
}
