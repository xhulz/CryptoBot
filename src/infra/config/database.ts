import mongoose from "mongoose";
import { injectable, inject, scoped, Lifecycle } from "tsyringe";

import IConfiguration from "../../domain/interface/configuration/iConfiguration";
import IDatabase from "../../domain/interface/configuration/iDataBase";
import Configuration from "./configuration";

@injectable()
@scoped(Lifecycle.ResolutionScoped)
export default class Database implements IDatabase {
  constructor(
    @inject(Configuration)
    private readonly _configuration: IConfiguration
  ) {}

  public async startService(): Promise<any> {
    try {
      await mongoose.connect(this._configuration.MongoConnection, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      });

      console.info("database connected");
    } catch (error) {
      console.error(error);
    }
  }
}
