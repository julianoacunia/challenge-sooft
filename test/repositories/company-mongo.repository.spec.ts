import { Test, TestingModule } from '@nestjs/testing';
import { CompanyMongoRepository } from '@infrastructure/repositories/company-mongo.repository';
import { Repository } from 'typeorm';
import { Company } from '@core/domain/company.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';

describe('CompanyMongoRepository', () => {
  let repository: CompanyMongoRepository;
  let companyRepository: Repository<Company>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyMongoRepository,
        {
          provide: getRepositoryToken(Company),
          useClass: Repository,
        },
      ],
    }).compile();

    repository = module.get<CompanyMongoRepository>(CompanyMongoRepository);
    companyRepository = module.get<Repository<Company>>(getRepositoryToken(Company));
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('should return companies adhered last month', async () => {
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    const companies: Company[] = [
      {
        id: new ObjectId('507f1f77bcf86cd799439011'),
        cuit: '20123456789',
        razonSocial: 'Company A',
        fechaAdhesion: new Date()
      } as Company,
      {
        id: new ObjectId('507f1f77bcf86cd799439012'),
        cuit: '20987654321',
        razonSocial: 'Company B',
        fechaAdhesion: new Date(lastMonth.getTime() - 1000)
      } as Company,
    ];

    jest.spyOn(companyRepository, 'find').mockResolvedValue(companies);

    const result = await repository.findCompaniesAdheredLastMonth();
    expect(result).toEqual([companies[0]]);
  });

  it('should save a company', async () => {
    const company: Company = {
      id: new ObjectId('507f1f77bcf86cd799439013'),
      cuit: '20111222333',
      razonSocial: 'Company C',
      fechaAdhesion: new Date()
    } as Company;
    jest.spyOn(companyRepository, 'save').mockResolvedValue(company);

    const result = await repository.save(company);
    expect(result).toEqual(company);
  });
});