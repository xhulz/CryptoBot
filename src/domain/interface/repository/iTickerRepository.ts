import Ticker from "../../model/ticker";

export default interface ITickerRepository {
  getCurrentTicker(): Promise<Ticker>;
  getOldestTickerIn24h(): Promise<Ticker>;
}
