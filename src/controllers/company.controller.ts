import { Controller, Get, Post, Body } from '@nestjs/common';
import { FindCompaniesAdhered } from '../core/application/findCompaniesAdhered.service';
import { AdheredCompany } from '../core/application/adheredCompany.service';
import { Company } from '../core/domain/company.entity';

@Controller('companies')
export class CompanyController {
  constructor(
    private readonly findCompaniesAdhered: FindCompaniesAdhered,
    private readonly adheredCompany: AdheredCompany,
  ) {}

  @Get('adhered-last-month')
  async findCompanyAdhered(): Promise<Company[]> {
    return this.findCompaniesAdhered.execute();
  }

  @Post('adhered')
  async adheredCompanies(@Body() company: Company): Promise<Company> {
    return this.adheredCompany.execute(company);
  }
}