import { Test, TestingModule } from '@nestjs/testing';
import { FindCompanieWithTransfers } from '@core/application/findCompanieWithTransfers.service';
import { TransfersRepository } from '@core/ports/transfers.repository';
import { Company } from '@core/domain/company.entity';
import { ObjectId } from 'mongodb';

describe('FindCompanieWithTransfers', () => {
  let findCompanieWithTransfers: FindCompanieWithTransfers;
  let transfersRepository: { save: jest.Mock; findCompanieWithTransfersLastMonth: jest.Mock };

  beforeEach(async () => {
    const transfersRepositoryMock = {
      findCompanieWithTransfersLastMonth: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindCompanieWithTransfers,
        { provide: TransfersRepository, useValue: transfersRepositoryMock },
      ],
    }).compile();

    findCompanieWithTransfers = module.get<FindCompanieWithTransfers>(FindCompanieWithTransfers);
    transfersRepository = module.get(TransfersRepository);
  });

  it('should return companies with transfers in the last month', async () => {
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

    transfersRepository.findCompanieWithTransfersLastMonth.mockResolvedValue(companies);

    const result = await findCompanieWithTransfers.execute();

    expect(transfersRepository.findCompanieWithTransfersLastMonth).toHaveBeenCalled();
    expect(result).toEqual(companies);
  });
});