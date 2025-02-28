import * as process from 'process';
import { configLoader } from '@config/configuration/configuration.loader';

describe('configLoader', () => {
  beforeEach(() => {
    jest.resetModules();
    Object.assign(process.env, {});
  });

  it('should return the correct configuration object with environment variables', () => {
    process.env.PORT = '3000';
    process.env.MONGODB_URL = 'mongodb://localhost:27017';
    process.env.MONGODB_DATABASE = 'testdb';

    const expectedConfig = {
      port: '3000',
      database: {
        noqsl: {
          url: 'mongodb://localhost:27017',
          database: 'testdb',
        },
      },
    };

    const config = configLoader();
    expect(config).toEqual(expectedConfig);
  });

  it('should return the correct configuration object with undefined values if environment variables are not set', () => {
    delete process.env.PORT;
    delete process.env.MONGODB_URL;
    delete process.env.MONGODB_DATABASE;

    const expectedConfig = {
      port: undefined,
      database: {
        noqsl: {
          url: undefined,
          database: undefined,
        },
      },
    };

    const config = configLoader();
    expect(config).toEqual(expectedConfig);
  });
});