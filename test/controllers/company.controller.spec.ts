import { Test, TestingModule } from '@nestjs/testing';
import { CompanyController } from '@controllers/company.controller';
import { FindCompaniesAdhered } from '@core/application/findCompaniesAdhered.service';
import { AdheredCompany } from '@core/application/adheredCompany.service';
import { Company } from '@core/domain/company.entity';
import { ObjectId } from 'mongodb';

describe('CompanyController', () => {
  let controller: CompanyController;
  let findCompaniesAdhered: FindCompaniesAdhered;
  let adheredCompany: AdheredCompany;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyController],
      providers: [
        {
          provide: FindCompaniesAdhered,
          useValue: { execute: jest.fn() },
        },
        {
          provide: AdheredCompany,
          useValue: { execute: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get<CompanyController>(CompanyController);
    findCompaniesAdhered = module.get<FindCompaniesAdhered>(FindCompaniesAdhered);
    adheredCompany = module.get<AdheredCompany>(AdheredCompany);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a list of companies adhered last month', async () => {
    const companies: Company[] = [{
      id: new ObjectId('507f1f77bcf86cd799439011'),
      cuit: '20123456789',
      razonSocial: 'Company A',
      fechaAdhesion: new Date(),
    } as Company];
    jest.spyOn(findCompaniesAdhered, 'execute').mockResolvedValue(companies);

    expect(await controller.findCompanyAdhered()).toBe(companies);
  });

  it('should adhere a company', async () => {
    const company: Company = {
      id: new ObjectId('507f1f77bcf86cd799439012'),
      cuit: '20987654321',
      razonSocial: 'Company B',
      fechaAdhesion: new Date(),
    } as Company;
    jest.spyOn(adheredCompany, 'execute').mockResolvedValue(company);

    expect(await controller.adheredCompanies(company)).toBe(company);
  });
});
