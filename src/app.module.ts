import { Module } from '@nestjs/common';
import { ConfigurationModule } from './config/config.module';

@Module({
  imports: [ConfigurationModule],
  providers: [],
  exports: [],
})
export class AppModule {}