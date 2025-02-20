import { Injectable } from '@nestjs/common';
import { CompanyRepository } from '@core/ports/company.repository';
import { Company } from '@core/domain/company.entity';

@Injectable()
export class AdheredCompany {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute(company: Company): Promise<Company> {
    return this.companyRepository.save({...company, fechaAdhesion: new Date(company.fechaAdhesion)});
  }
}