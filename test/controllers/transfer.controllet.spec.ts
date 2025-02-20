import { Test, TestingModule } from '@nestjs/testing';
import { TransfersController } from '@controllers/transfer.controller';
import { FindCompanieWithTransfers } from '@core/application/findCompanieWithTransfers.service';
import { Company } from '@core/domain/company.entity';
import { ObjectId } from 'mongodb';

describe('TransfersController', () => {
  let controller: TransfersController;
  let findCompanieWithTransfers: FindCompanieWithTransfers;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransfersController],
      providers: [
        {
          provide: FindCompanieWithTransfers,
          useValue: { execute: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get<TransfersController>(TransfersController);
    findCompanieWithTransfers = module.get<FindCompanieWithTransfers>(FindCompanieWithTransfers);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a list of companies with transfers last month', async () => {
    const companies: Company[] = [
      { id: new ObjectId('507f1f77bcf86cd799439011'),
      cuit: '20123456789',
      razonSocial: 'Company A',
      fechaAdhesion: new Date() 
    } as Company];
    jest.spyOn(findCompanieWithTransfers, 'execute').mockResolvedValue(companies);

    expect(await controller.findCompaniesWithTransfers()).toBe(companies);
  });
});