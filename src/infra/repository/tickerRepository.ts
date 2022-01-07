import moment from "moment";
import { injectable, inject, scoped, Lifecycle } from "tsyringe";

import ITickerIntegration from "../../domain/interface/integration/iTickerIntegration";
import ITickerRepository from "../../domain/interface/repository/iTickerRepository";
import Ticker from "../../domain/model/ticker";
import TickerIntegration from "../integration/tickerIntegration";
import { Ticker as TickerEntity } from "./schemas/ticker";

@injectable()
@scoped(Lifecycle.ResolutionScoped)
export default class TickerRepository implements ITickerRepository {
  constructor(
    @inject(TickerIntegration)
    private readonly _tickerIntegration: ITickerIntegration
  ) {}

  public async getCurrentTicker(): Promise<Ticker> {
    try {
      const ticker: Ticker = await this._tickerIntegration.get();

      const tickerEntity = new TickerEntity(ticker);
      await tickerEntity.save();

      return ticker;
    } catch (error) {
      throw error;
    }
  }

  public async getOldestTickerIn24h(): Promise<Ticker> {
    try {
      let ticker: Ticker;

      ticker = await TickerEntity.findOne({
        createdAt: { $lte: moment().add(-24, "hours").toDate() },
      }).sort({ createdAt: -1 });

      if (ticker === null)
        ticker = await TickerEntity.findOne().sort({ createdAt: 1 });

      return ticker;
    } catch (error) {
      throw error;
    }
  }
}
