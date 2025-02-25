import { Module , OnModuleInit, Logger} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from '@core/domain/company.entity';
import { Transfer } from '@core/domain/transfers.entity';
import { CompanyRepository } from '@core/ports/company.repository';
import { TransfersRepository } from '@core/ports/transfers.repository';
import { CompanyMongoRepository } from '@infrastructure/repositories/company-mongo.repository';
import { TransfersMongoRepository } from '@infrastructure/repositories/transfers-mongo.repository';
import { FindCompaniesAdhered } from '@core/application/findCompaniesAdhered.service';
import { FindCompanieWithTransfers } from '@core/application/findCompanieWithTransfers.service';
import { AdheredCompany } from '@core/application/adheredCompany.service';
import { CompanyController } from '@controllers/company.controller';
import { TransfersController } from '@controllers/transfer.controller';
import { DataSource } from 'typeorm';
import * as process from 'process'
import { ConfigurationModule } from '@config/configuration/configuration.module';

@Module({
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
  ],
  providers: [
    { provide: CompanyRepository, useClass: CompanyMongoRepository },
    { provide: TransfersRepository, useClass: TransfersMongoRepository },
    FindCompaniesAdhered,
    FindCompanieWithTransfers,
    AdheredCompany,
  ],
  controllers: [CompanyController, TransfersController],
  exports: [CompanyRepository, TransfersRepository],
})
export default class NoSqlDatabaseModule implements OnModuleInit {
  private readonly logger = new Logger(NoSqlDatabaseModule.name);

  constructor(private readonly dataSource: DataSource) {}

  async onModuleInit() {
    try {
      if (this.dataSource.isInitialized) {
        this.logger.log('🚀 Database connected successfully');
      }
    } catch (error) {
      this.logger.error('❌ Database connection failed', error);
    }
  }
}