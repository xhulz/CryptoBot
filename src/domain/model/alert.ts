import Currency from "./currency";

export default class Alert {
  public _id?: string;
  public currency: Currency;
  public oldPrice: number;
  public currentPrice: number;
  public variationPercentage: number;
  public createAt?: Date;
}
