import { Entity, ObjectIdColumn, Column } from 'typeorm';
import { ObjectId } from 'mongodb';
import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

@Entity('company')
export class Company {
  @ObjectIdColumn()
  @ApiProperty({
    description: 'Company Id',
    type: String,
    example: '67b646af37d3980c51bb885a'
  })
  id: ObjectId;
  @IsString()

  @Column()
  @ApiProperty({
    description: 'Cuit',
    type: String,
    example: '0-12345678-9'
  })
  cuit: string;
  @IsString()

  @Column()
  @ApiProperty({
    description: 'Razon Social',
    type: String,
    example: 'Empresa Ejemplo 1 S.A.'
  })
  razonSocial: string;
  @IsString()

  @Column()
  @ApiProperty({
    description: 'Fecha',
    type: String,
    example: '2025-01-30T00:00:00.000Z'
  })
  fechaAdhesion: Date;
}