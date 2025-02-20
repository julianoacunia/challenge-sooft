import { Entity, ObjectIdColumn, Column } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity('transfer')
export class Transfer {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  idEmpresa: ObjectId;

  @Column()
  importe: number;

  @Column()
  cuentaDebito: string;

  @Column()
  cuentaCredito: string;

  @Column()
  fecha: Date;
}