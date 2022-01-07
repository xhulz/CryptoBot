import { scoped, Lifecycle } from "tsyringe";

import IConfiguration from "../../domain/interface/configuration/iConfiguration";

@scoped(Lifecycle.ResolutionScoped)
export default class Configuration implements IConfiguration {
  public readonly TickerUrl: string;
  public readonly Timer: number;
  public readonly MongoConnection: string;
  public readonly Pair: string[];
  public readonly PriceChangePercent: number;

  constructor() {
    this.TickerUrl = process.env.TICKER_URL;
    this.Timer = Number(process.env.TIMER);
    this.MongoConnection = process.env.MONGOOSE_CONNECTION_STRING;
    this.Pair = process.env.PAIR.split(",");
    this.PriceChangePercent = Number(process.env.PRICE_CHANGE_PERCENT);
  }
}
