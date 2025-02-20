import { Module } from '@nestjs/common';
import NoSqlDatabaseModule from './database/nosql/database.module';

@Module({
  imports: [NoSqlDatabaseModule],
  controllers: [],
  providers: []
})
export class ConfigurationModule {}