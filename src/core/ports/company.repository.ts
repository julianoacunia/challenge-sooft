import { Company } from '@core/domain/company.entity';

export abstract class CompanyRepository {
  abstract findCompaniesAdheredLastMonth(): Promise<Company[]>;
  abstract save(company: Company): Promise<Company>;
}