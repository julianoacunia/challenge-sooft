import { ConfigurationService } from '@config/configuration/configuration.service';

export const getDatabaseConfiguration = (configService: ConfigurationService) => ({
  type: 'mongodb' as const,
  url: configService.get('MONGODB_URL'),
  database: configService.get('MONGODB_DATABASE'),
});