import { injectable, inject, scoped, Lifecycle } from "tsyringe";

import Configuration from "../../infra/config/configuration";
import AlertRepository from "../../infra/repository/alertRepository";
import TickerRepository from "../../infra/repository/tickerRepository";
import IConfiguration from "../interface/configuration/iConfiguration";
import IAlertRepository from "../interface/repository/iAlertRepository";
import ITickerRepository from "../interface/repository/iTickerRepository";
import ITickerService from "../interface/service/iTickerService";
import Alert from "../model/alert";
import Currency from "../model/currency";
import Ticker from "../model/ticker";

@injectable()
@scoped(Lifecycle.ResolutionScoped)
export default class TickerService implements ITickerService {
  constructor(
    @inject(Configuration)
    private readonly _configuration: IConfiguration,
    @inject(TickerRepository)
    private readonly _tickerRepository: ITickerRepository,
    @inject(AlertRepository)
    private readonly _alertRepository: IAlertRepository
  ) {}

  public async start(): Promise<void> {
    try {
      // Get the ticker
      const currentTicker: Ticker =
        await this._tickerRepository.getCurrentTicker();

      // Get the oldest price
      const oldestTicker: Ticker =
        await this._tickerRepository.getOldestTickerIn24h();

      // Check for alerts per currency pairs
      this._configuration.Pair.forEach(async (pair) => {
        // Get the current currency price
        const currentCurrency: Currency = currentTicker.currencies.find(
          (item) => item.pair === pair
        );

        const currentPrice: number = this.getPrice(
          Number(currentCurrency.ask),
          Number(currentCurrency.bid)
        );

        // Get the oldest currency price
        const oldestCurrency: Currency = oldestTicker.currencies.find(
          (item) => item.pair === pair
        );

        const oldPrice: number = this.getPrice(
          Number(oldestCurrency.ask),
          Number(oldestCurrency.bid)
        );

        // Calc the variation
        const variationPercentage: number = this.variation(
          oldPrice,
          currentPrice
        );

        console.log("pair:", pair);
        console.log("old price:", oldPrice);
        console.log("current price:", currentPrice);
        console.log("variation:", variationPercentage);

        // Check against variation to save log
        if (
          variationPercentage >
            Math.abs(this._configuration.PriceChangePercent) ||
          variationPercentage <
            -Math.abs(this._configuration.PriceChangePercent)
        ) {
          const alert: Alert = {
            currency: currentCurrency,
            currentPrice,
            oldPrice,
            variationPercentage,
          };

          this._alertRepository.create(alert);

          console.log("Log has been created");
        }

        console.log("----------------");
      });

      return;
    } catch (error) {
      throw error;
    }
  }

  private getPrice(ask: number, bid: number): number {
    const price: number = (ask + bid) / 2;
    return price;
  }

  private variation(oldestPrice: number, currentPrice: number): number {
    const variation: number =
      ((currentPrice - oldestPrice) / oldestPrice) * 100;
    return variation;
  }
}
