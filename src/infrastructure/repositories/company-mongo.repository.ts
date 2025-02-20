import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Company } from '../../core/domain/company.entity';
import { CompanyRepository } from '../../core/ports/company.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CompanyMongoRepository implements CompanyRepository {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) { }

  async findCompaniesAdheredLastMonth(): Promise<Company[]> {
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    const allCompanies = await this.companyRepository.find();
    return allCompanies.filter(t => t.fechaAdhesion >= lastMonth);
  }

  async save(company: Company): Promise<Company> {
    return this.companyRepository.save(company);
  }
}