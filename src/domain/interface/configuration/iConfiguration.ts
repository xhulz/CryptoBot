export default interface IConfiguration {
  TickerUrl: string;
  Timer: number;
  MongoConnection: string;
  Pair: string[];
  PriceChangePercent: number;
}
