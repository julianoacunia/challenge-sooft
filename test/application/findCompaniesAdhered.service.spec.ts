import { Test, TestingModule } from '@nestjs/testing';
import { FindCompaniesAdhered } from '@core/application/findCompaniesAdhered.service';
import { CompanyRepository } from '@core/ports/company.repository';
import { Company } from '@core/domain/company.entity';
import { ObjectId } from 'mongodb';

describe('FindCompaniesAdhered', () => {
  let findCompaniesAdhered: FindCompaniesAdhered;
  let companyRepository: { save: jest.Mock; findCompaniesAdheredLastMonth: jest.Mock };

  beforeEach(async () => {
    const companyRepositoryMock = {
      findCompaniesAdheredLastMonth: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindCompaniesAdhered,
        { provide: CompanyRepository, useValue: companyRepositoryMock },
      ],
    }).compile();

    findCompaniesAdhered = module.get<FindCompaniesAdhered>(FindCompaniesAdhered);
    companyRepository = module.get(CompanyRepository);
  });

  it('should return companies adhered in the last month', async () => {
    const companies: Company[] = [
      {
        id: new ObjectId('507f1f77bcf86cd799439011'),
        cuit: '20123456789',
        razonSocial: 'Company A',
        fechaAdhesion: new Date()
      },
      {
        id: new ObjectId('507f1f77bcf86cd799439012'),
        cuit: '20987654321',
        razonSocial: 'Company B',
        fechaAdhesion: new Date()
      }
    ] as Company[];

    companyRepository.findCompaniesAdheredLastMonth.mockResolvedValue(companies);

    const result = await findCompaniesAdhered.execute();

    expect(companyRepository.findCompaniesAdheredLastMonth).toHaveBeenCalled();
    expect(result).toEqual(companies);
  });
});