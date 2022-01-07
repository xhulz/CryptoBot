import Currency from "./currency";

export default class Ticker {
  public _id?: string;
  public currencies: Currency[];
  public createAt?: Date;
}
