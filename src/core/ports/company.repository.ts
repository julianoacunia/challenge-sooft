import { Company } from '../domain/company.entity';

export abstract class CompanyRepository {
  abstract findCompaniesAdheredLastMonth(): Promise<Company[]>;
  abstract save(company: Company): Promise<Company>;
}