import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { ConfigurationService } from '@config/configuration/configuration.service';

describe('ConfigurationService', () => {
  let configService: ConfigService;
  let configurationService: ConfigurationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConfigurationService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              const mockConfig = {
                'some.config.key': 'mockValue',
                'another.config.key': 'anotherMockValue',
              };
              return mockConfig[key];
            }),
          },
        },
      ],
    }).compile();

    configService = module.get<ConfigService>(ConfigService);
    configurationService = module.get<ConfigurationService>(ConfigurationService);
  });

  it('should be defined', () => {
    expect(configurationService).toBeDefined();
  });

  it('should return the correct value for a given config key', () => {
    const value = configurationService.get('some.config.key');
    expect(value).toEqual('mockValue');
    expect(configService.get).toHaveBeenCalledWith('some.config.key');
  });

  it('should return undefined for a non-existent config key', () => {
    const value = configurationService.get('non.existent.key');
    expect(value).toBeUndefined();
    expect(configService.get).toHaveBeenCalledWith('non.existent.key');
  });
});