import { Controller, Get } from '@nestjs/common';
import { FindCompanieWithTransfers } from '../core/application/findCompanieWithTransfers.service';
import { Company } from '../core/domain/company.entity';

@Controller('transfers')
export class TransfersController {
  constructor(private readonly findCompanieWithTransfers: FindCompanieWithTransfers) {}

  @Get('companies-last-month')
  async findCompaniesWithTransfers(): Promise<Company[]> {
    return this.findCompanieWithTransfers.execute();
  }
}