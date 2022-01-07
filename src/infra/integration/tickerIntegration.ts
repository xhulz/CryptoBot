import axios, { Axios } from "axios";
import { injectable, inject, scoped, Lifecycle } from "tsyringe";

import IConfiguration from "../../domain/interface/configuration/iConfiguration";
import ITickerIntegration from "../../domain/interface/integration/iTickerIntegration";
import Currency from "../../domain/model/currency";
import Ticker from "../../domain/model/ticker";
import Configuration from "../config/configuration";

@injectable()
@scoped(Lifecycle.ResolutionScoped)
export default class TickerIntegration implements ITickerIntegration {
  private readonly _ticker: Axios;

  constructor(
    @inject(Configuration)
    private readonly _configuration: IConfiguration
  ) {
    this._ticker = axios.create({
      baseURL: this._configuration.TickerUrl,
    });
  }

  public async get(): Promise<Ticker> {
    try {
      const res: any = await this._ticker.get("/");
      const ticker: Ticker = {
        currencies: [],
      };

      if (Array.isArray(res.data)) ticker.currencies = <Currency[]>res.data;
      else ticker.currencies.push(res.data);

      return ticker;
    } catch (error) {
      throw error;
    }
  }
}
