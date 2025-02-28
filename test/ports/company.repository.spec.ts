import { Company } from '@core/domain/company.entity';
import { CompanyRepository } from '@core/ports/company.repository';
import { ObjectId } from 'mongodb';

describe('CompanyRepository', () => {
  let mockCompanyRepository: CompanyRepository;

  beforeEach(() => {
    mockCompanyRepository = {
      findCompaniesAdheredLastMonth: jest.fn(),
      save: jest.fn(),
    };
  });

  it('should call findCompaniesAdheredLastMonth and return an array of companies', async () => {
    const mockCompanies: Company[] = [
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
    ];

    mockCompanyRepository.findCompaniesAdheredLastMonth = jest.fn().mockResolvedValue(mockCompanies);

    const result = await mockCompanyRepository.findCompaniesAdheredLastMonth();
    expect(result).toEqual(mockCompanies);
    expect(mockCompanyRepository.findCompaniesAdheredLastMonth).toHaveBeenCalled();
  });

  it('should call save and return the saved company', async () => {
    const mockCompany: Company = {
      id: new ObjectId('507f1f77bcf86cd799439013'),
      cuit: '20111222333',
      razonSocial: 'Company C',
      fechaAdhesion: new Date()
    };

    mockCompanyRepository.save = jest.fn().mockResolvedValue(mockCompany);

    const result = await mockCompanyRepository.save(mockCompany);
    expect(result).toEqual(mockCompany);
    expect(mockCompanyRepository.save).toHaveBeenCalledWith(mockCompany);
  });
});