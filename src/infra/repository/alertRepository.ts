import { scoped, Lifecycle } from "tsyringe";

import IAlertRepository from "../../domain/interface/repository/iAlertRepository";
import Alert from "../../domain/model/alert";
import { Alert as AlertEntity } from "./schemas/alert";

@scoped(Lifecycle.ResolutionScoped)
export default class AlertRepository implements IAlertRepository {
  public async create(alert: Alert): Promise<void> {
    try {
      const alertEntity = new AlertEntity(alert);
      await alertEntity.save();
      return;
    } catch (error) {
      throw error;
    }
  }
}
