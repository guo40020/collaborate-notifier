import { Injectable } from "@nestjs/common";
import { DataService } from "src/database/database.service";
import { ImPlatformType } from "src/types/common";

interface INewPrNotificationData {
  fromGitPlatformUser: string;
  title: string;
  description: string;
  assignees: string[];
  url: string;
  fromBranch: string;
  toBranch: string;
}

@Injectable()
export class ImSenderService {
  constructor(private readonly db: DataService) {}

  public async newPrNotification(data: INewPrNotificationData) {
  }
}
