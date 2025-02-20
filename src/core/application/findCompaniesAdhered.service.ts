import { Injectable } from '@nestjs/common';
import { CompanyRepository } from '../ports/company.repository';
import { Company } from '../domain/company.entity';

@Injectable()
export class FindCompaniesAdhered {
  constructor(private readonly companyRepository: CompanyRepository) { }

  async execute(): Promise<Company[]> {
    return this.companyRepository.findCompaniesAdheredLastMonth();
  }
}