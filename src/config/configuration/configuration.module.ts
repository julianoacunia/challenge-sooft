import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configLoader } from './configuration.loader';
import { ConfigurationService } from './configuration.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configLoader],
      isGlobal: true
    }),
  ],
  providers: [ConfigurationService],
  exports: [ConfigurationService]
})
export class ConfigurationModule {}