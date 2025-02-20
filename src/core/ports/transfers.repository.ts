import { Transfer } from '../domain/transfers.entity';
import { Company } from '../domain/company.entity';

export abstract class TransfersRepository {
  abstract findCompanieWithTransfersLastMonth(): Promise<Company[]>;
  abstract save(transfer: Transfer): Promise<Transfer>;
}