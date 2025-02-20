import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Transfer } from '../../core/domain/transfers.entity';
import { TransfersRepository } from '../../core/ports/transfers.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from '../../core/domain/company.entity';

@Injectable()
export class TransfersMongoRepository implements TransfersRepository {
  constructor(
    @InjectRepository(Transfer)
    private readonly transfersRepository: Repository<Transfer>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async findCompanieWithTransfersLastMonth(): Promise<Company[]> {
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    const allTransfers = await this.transfersRepository.find();
    const filteredTransfers = allTransfers.filter(t => t.fecha >= lastMonth);
    const companiesIds = filteredTransfers.map(t => t.idEmpresa.toString());
    if (companiesIds.length === 0) {
      return [];
    }
    const allCompanies = await this.companyRepository.find();

    const companies = allCompanies.filter(company => companiesIds.includes(company.id.toString()));
    
    return companies;
  }

  async save(transfers: Transfer): Promise<Transfer> {
    return this.transfersRepository.save(transfers);
  }
}