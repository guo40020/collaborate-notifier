import { Injectable } from "@nestjs/common";
import { RepoPlatformType } from "src/types/common";

export interface INewPrNotifyData {
  prNumber: number;
  repoPlatform: RepoPlatformType;
}

@Injectable()
export class NotifierService {
  public async notifyNewPr() {

  }
}
