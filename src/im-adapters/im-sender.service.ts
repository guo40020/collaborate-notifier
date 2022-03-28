import { Injectable } from "@nestjs/common";
import { ImPlatformType } from "src/types/common";

interface INewPrNotificationData {
  imPlatform: ImPlatformType;
  fromGitPlatformUser: string;
  title: string;
  description: string;
  assignees: string[];
  watchers: string[];
  url: string;
  fromBranch: string;
  toBranch: string;
}

@Injectable()
export class ImSenderService {
  public async newPrNotification(data: INewPrNotificationData) {
  }
}
