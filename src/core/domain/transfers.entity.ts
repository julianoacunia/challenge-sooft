import { Entity, ObjectIdColumn, Column } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity('transfer')
export class Transfer {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  idEmpresa: string;

  @Column()
  importe: number;

  @Column()
  cuentaDebito: string;

  @Column()
  cuentaCredito: string;

  @Column()
  fecha: Date;
}