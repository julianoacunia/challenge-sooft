import { Entity, ObjectIdColumn, Column } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity('company')
export class Company {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  cuit: string;

  @Column()
  razonSocial: string;

  @Column()
  fechaAdhesion: Date;
}