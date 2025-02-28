import { Test, TestingModule } from '@nestjs/testing';
import { ConfigurationModule } from '@config/configuration/configuration.module';
import NoSqlDatabaseModule from '@config/database/nosql/database.module';

describe('ConfigurationModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [NoSqlDatabaseModule, ConfigurationModule],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should import NoSqlDatabaseModule', () => {
    const noSqlDatabaseModule = module.get<NoSqlDatabaseModule>(NoSqlDatabaseModule);
    expect(noSqlDatabaseModule).toBeDefined();
  });
});