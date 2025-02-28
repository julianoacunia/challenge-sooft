import { Entity, ObjectIdColumn, Column } from 'typeorm';
import { ObjectId } from 'mongodb';
import { IsString, IsNumber, IsDate } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

@Entity('transfer')
export class Transfer {
  @ObjectIdColumn()
  @ApiProperty({
    description: 'Transfer Id',
    type: String,
    example: ''
  })
  id: ObjectId;

  @ObjectIdColumn()
  @Column()
  @ApiProperty({
    description: 'Company Id',
    type: String,
    example: ''
  })
  idEmpresa: ObjectId;

  @IsNumber()
  @Column()
  @ApiProperty({
    description: 'Import',
    type: Number,
    example: ''
  })
  importe: number;

  @IsString()
  @Column()
  @ApiProperty({
    description: 'Debit Account',
    type: String,
    example: ''
  })
  cuentaDebito: string;
  
  @IsString()
  @Column()
  @ApiProperty({
    description: 'Credit Account',
    type: String,
    example: ''
  })
  cuentaCredito: string;

  @IsDate()
  @Column()
  @ApiProperty({
    description: 'Date',
    type: Date,
    example: ''
  })
  fecha: Date;
}