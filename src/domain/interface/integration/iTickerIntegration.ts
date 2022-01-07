import Ticker from "../../model/ticker";

export default interface ITickerIntegration {
  get(): Promise<Ticker>;
}
