import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConfigurationModule } from '@config/configuration/configuration.module';
import { ConfigurationService } from '@config/configuration/configuration.service';
import { configLoader } from '@config/configuration/configuration.loader';

describe('ConfigurationModule', () => {
  let module: TestingModule;
  let configService: ConfigService;
  let configurationService: ConfigurationService;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [configLoader],
          isGlobal: true,
        }),
        ConfigurationModule,
      ],
    }).compile();

    configService = module.get<ConfigService>(ConfigService);
    configurationService = module.get<ConfigurationService>(ConfigurationService);
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should provide ConfigService', () => {
    expect(configService).toBeDefined();
  });

  it('should provide ConfigurationService', () => {
    expect(configurationService).toBeDefined();
  });
});