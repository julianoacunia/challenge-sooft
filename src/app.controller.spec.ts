import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { ConfigurationModule } from '@config/config.module';

describe('AppModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should import ConfigurationModule', () => {
    const configurationModule = module.get<ConfigurationModule>(ConfigurationModule);
    expect(configurationModule).toBeDefined();
  });
});