import { Injectable } from '@nestjs/common';
import { TransfersRepository } from '@core/ports/transfers.repository';
import { Company } from '@core/domain/company.entity';

@Injectable()
export class FindCompanieWithTransfers {
  constructor(private readonly transfersRepository: TransfersRepository) {}

  async execute(): Promise<Company[]> {
    return this.transfersRepository.findCompanieWithTransfersLastMonth();
  }
}