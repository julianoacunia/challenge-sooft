import { Injectable } from '@nestjs/common';
import { CompanyRepository } from '@core/ports/company.repository';
import { Company } from '@core/domain/company.entity';

@Injectable()
export class FindCompaniesAdhered {
  constructor(private readonly companyRepository: CompanyRepository) { }

  async execute(): Promise<Company[]> {
    return this.companyRepository.findCompaniesAdheredLastMonth();
  }
}