import { Test, TestingModule } from '@nestjs/testing';
import { TransfersMongoRepository } from '@infrastructure/repositories/transfers-mongo.repository';
import { Repository } from 'typeorm';
import { Transfer } from '@core/domain/transfers.entity';
import { Company } from '@core/domain/company.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';

describe('TransfersMongoRepository', () => {
  let repository: TransfersMongoRepository;
  let transfersRepository: Repository<Transfer>;
  let companyRepository: Repository<Company>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransfersMongoRepository,
        {
          provide: getRepositoryToken(Transfer),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Company),
          useClass: Repository,
        },
      ],
    }).compile();

    repository = module.get<TransfersMongoRepository>(TransfersMongoRepository);
    transfersRepository = module.get<Repository<Transfer>>(getRepositoryToken(Transfer));
    companyRepository = module.get<Repository<Company>>(getRepositoryToken(Company));
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('findCompanieWithTransfersLastMonth', () => {
    it('should return companies with transfers in the last month', async () => {
      const lastMonth = new Date();
      lastMonth.setMonth(lastMonth.getMonth() - 1);

      const transfers = [
        {
          id: new ObjectId('507f1f77bcf86cd799439011'),
          idEmpresa: new ObjectId('507f1f77bcf86cd799439021'),
          fecha: new Date(),
          importe: 1000,
          cuentaDebito: '1234567890',
          cuentaCredito: '0987654321'
        } as Transfer,
        {
          id: new ObjectId('507f1f77bcf86cd799439012'),
          idEmpresa: new ObjectId('507f1f77bcf86cd799439022'),
          fecha: new Date(lastMonth.setDate(lastMonth.getDate() - 5)),
          importe: 2000,
          cuentaDebito: '2345678901',
          cuentaCredito: '1098765432'
        } as Transfer,
      ];

      const companies = [
        {
          id: new ObjectId('507f1f77bcf86cd799439021'),
          cuit: '20123456789',
          razonSocial: 'Company 1',
          fechaAdhesion: new Date()
        } as Company,
        {
          id: new ObjectId('507f1f77bcf86cd799439022'),
          cuit: '20123456789',
          razonSocial: 'Company 2',
          fechaAdhesion: new Date()
        } as Company,
      ];

      jest.spyOn(transfersRepository, 'find').mockResolvedValue(transfers);
      jest.spyOn(companyRepository, 'find').mockResolvedValue(companies);

      const result = await repository.findCompanieWithTransfersLastMonth();
      expect(result).toEqual([companies[0]]);
    });

    it('should return an empty array if no transfers are found for the last month', async () => {
      const transfers = [
        {
          id: new ObjectId('507f1f77bcf86cd799439013'),
          idEmpresa: new ObjectId('507f1f77bcf86cd799439023'),
          fecha: new Date('2023-01-01'),
          importe: 3000,
          cuentaDebito: '3456789012',
          cuentaCredito: '2109876543'
        } as Transfer,
      ];

      const companies = [
        {
          id: new ObjectId('507f1f77bcf86cd799439023'),
          cuit: '20123456789',
          razonSocial: 'Company 1',
          fechaAdhesion: new Date()
        } as Company,
      ];

      jest.spyOn(transfersRepository, 'find').mockResolvedValue(transfers);
      jest.spyOn(companyRepository, 'find').mockResolvedValue(companies);

      const result = await repository.findCompanieWithTransfersLastMonth();
      expect(result).toEqual([]);
    });
  });

  describe('save', () => {
    it('should save a transfer', async () => {
      const transfer = {
        id: new ObjectId('507f1f77bcf86cd799439014'),
        idEmpresa: new ObjectId('507f1f77bcf86cd799439024'),
        fecha: new Date(),
        importe: 4000,
        cuentaDebito: '4567890123',
        cuentaCredito: '3210987654'
      } as Transfer;
      jest.spyOn(transfersRepository, 'save').mockResolvedValue(transfer);

      const result = await repository.save(transfer);
      expect(result).toEqual(transfer);
      expect(transfersRepository.save).toHaveBeenCalledWith(transfer);
    });
  });
});
