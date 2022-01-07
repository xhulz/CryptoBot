import Alert from "../../model/alert";

export default interface IAlertRepository {
  create(alert: Alert): Promise<void>;
}
