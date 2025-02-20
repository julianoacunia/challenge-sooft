import { Injectable } from '@nestjs/common';
import { CompanyRepository } from '../ports/company.repository';
import { Company } from '../domain/company.entity';

@Injectable()
export class AdheredCompany {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute(company: Company): Promise<Company> {
    return this.companyRepository.save({...company, fechaAdhesion: new Date(company.fechaAdhesion)});
  }
}