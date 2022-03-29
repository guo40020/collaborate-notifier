import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { FeishuImController } from "./feishu.im.controller";
import { FeishuImService } from "./feishu.im.service";

@Module({
  controllers: [FeishuImController],
  providers: [
    FeishuImService.provide
  ],
})
export class FeishuImModule {}
