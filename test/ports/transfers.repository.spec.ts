import { Transfer } from '@core/domain/transfers.entity';
import { Company } from '@core/domain/company.entity';
import { TransfersRepository } from '@core/ports/transfers.repository';
import { ObjectId } from 'mongodb';

describe('TransfersRepository', () => {
  let mockTransfersRepository: TransfersRepository;

  beforeEach(() => {
    mockTransfersRepository = {
      findCompanieWithTransfersLastMonth: jest.fn(),
      save: jest.fn(),
    };
  });

  it('should call findCompanieWithTransfersLastMonth and return an array of companies', async () => {
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

    mockTransfersRepository.findCompanieWithTransfersLastMonth = jest.fn().mockResolvedValue(mockCompanies);

    const result = await mockTransfersRepository.findCompanieWithTransfersLastMonth();
    expect(result).toEqual(mockCompanies);
    expect(mockTransfersRepository.findCompanieWithTransfersLastMonth).toHaveBeenCalled();
  });

  it('should call save and return the saved transfer', async () => {
    const mockTransfer: Transfer = {
      id: new ObjectId('507f1f77bcf86cd799439013'),
      idEmpresa: new ObjectId('507f1f77bcf86cd799439011'),
      fecha: new Date(),
      importe: 100,
      cuentaDebito: '1234567890',
      cuentaCredito: '0987654321'
    };

    mockTransfersRepository.save = jest.fn().mockResolvedValue(mockTransfer);

    const result = await mockTransfersRepository.save(mockTransfer);
    expect(result).toEqual(mockTransfer);
    expect(mockTransfersRepository.save).toHaveBeenCalledWith(mockTransfer);
  });
});