import { Module } from "@nestjs/common";
import { ImSenderService } from "./im-sender.service";

@Module({
  providers: [ImSenderService],
  exports: [ImSenderService],
})
export class ImSenderModule {}
