import { Transfer } from '@core/domain/transfers.entity';
import { Company } from '@core/domain/company.entity';

export abstract class TransfersRepository {
  abstract findCompanieWithTransfersLastMonth(): Promise<Company[]>;
  abstract save(transfer: Transfer): Promise<Transfer>;
}