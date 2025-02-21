import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigurationService {
  constructor(readonly configService: ConfigService){}

  get(propertyPath: string) {
    return this.configService.get(propertyPath);
  }
}