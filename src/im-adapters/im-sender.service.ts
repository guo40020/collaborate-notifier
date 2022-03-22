import { Injectable } from "@nestjs/common";

interface INewPrNotificationData {

}

@Injectable()
export class ImSenderService {
  public async newPrNotification({}: INewPrNotificationData) {

  }
}
