import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Logger } from '@nestjs/common';
import NoSqlDatabaseModule from '@config/database/nosql/database.module';
import { ConfigurationModule } from '@config/configuration/configuration.module';
import { Company } from '@core/domain/company.entity';
import { Transfer } from '@core/domain/transfers.entity';
import { CompanyRepository } from '@core/ports/company.repository';
import { TransfersRepository } from '@core/ports/transfers.repository';
import { CompanyMongoRepository } from '@infrastructure/repositories/company-mongo.repository';
import { TransfersMongoRepository } from '@infrastructure/repositories/transfers-mongo.repository';

describe('NoSqlDatabaseModule', () => {
  let module: TestingModule;
  let dataSource: DataSource;
  let logger: Logger;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        ConfigurationModule,
        TypeOrmModule.forRoot({
          type: 'mongodb',
          url: process.env.MONGODB_URL,
          database: process.env.MONGODB_DATABASE,
          entities: [Company, Transfer],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Company, Transfer]),
        NoSqlDatabaseModule,
      ],
      providers: [
        { provide: CompanyRepository, useClass: CompanyMongoRepository },
        { provide: TransfersRepository, useClass: TransfersMongoRepository },
      ],
    }).compile();

    dataSource = module.get<DataSource>(DataSource);
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should initialize the module and connect to the database', async () => {
    const noSqlDatabaseModule = module.get<NoSqlDatabaseModule>(NoSqlDatabaseModule);
    await noSqlDatabaseModule.onModuleInit();
    expect(dataSource.isInitialized).toBeTruthy();
  });

  it('should provide CompanyRepository and TransfersRepository', () => {
    const companyRepository = module.get<CompanyRepository>(CompanyRepository);
    const transfersRepository = module.get<TransfersRepository>(TransfersRepository);

    expect(companyRepository).toBeDefined();
    expect(transfersRepository).toBeDefined();
  });
});