import { Test, TestingModule } from '@nestjs/testing';
import { AdheredCompany } from '../../src/core/application/adheredCompany.service';
import { CompanyRepository } from '../../src/core/ports/company.repository';
import { Company } from '../../src/core/domain/company.entity';
import { ObjectId } from 'mongodb';

describe('AdheredCompany', () => {
  let adheredCompany: AdheredCompany;
  let companyRepository: { save: jest.Mock; findCompaniesAdheredLastMonth: jest.Mock };

  beforeEach(async () => {
    const companyRepositoryMock = {
      save: jest.fn(),
      findCompaniesAdheredLastMonth: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdheredCompany,
        { provide: CompanyRepository, useValue: companyRepositoryMock },
      ],
    }).compile();

    adheredCompany = module.get<AdheredCompany>(AdheredCompany);
    companyRepository = module.get(CompanyRepository);
  });

  it('should save the company with updated fechaAdhesion', async () => {
    const company: Company = {
      id: new ObjectId('507f1f77bcf86cd799439011'),
      cuit: '20123456789',
      razonSocial: 'Company A',
      fechaAdhesion: new Date('2024-02-20T00:00:00.000Z'),
    } as Company;

    const expectedCompany = { ...company, fechaAdhesion: new Date(company.fechaAdhesion) };
    companyRepository.save.mockResolvedValue(expectedCompany);

    const result = await adheredCompany.execute(company);

    expect(companyRepository.save).toHaveBeenCalledWith(expectedCompany);
    expect(result).toEqual(expectedCompany);
  });
});
