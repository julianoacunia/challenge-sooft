import { Entity, ObjectIdColumn, Column } from 'typeorm';
import { ObjectId } from 'mongodb';
import { IsString, IsNumber } from "class-validator";
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
  @IsString()

  @Column()
  @ApiProperty({
    description: 'Company Id',
    type: String,
    example: ''
  })
  idEmpresa: ObjectId;
  @IsString()

  @Column()
  @ApiProperty({
    description: 'Import',
    type: Number,
    example: ''
  })
  importe: number;
  @IsNumber()

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
  @IsString()

  @Column()
  @ApiProperty({
    description: 'Date',
    type: Date,
    example: ''
  })
  fecha: Date;
  // @IsDate()
}