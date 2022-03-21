import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GitHubWebhookAdapterModule } from './github-webhook-adaptor/github-webhook-adaptor.module';

@Module({
  imports: [GitHubWebhookAdapterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
