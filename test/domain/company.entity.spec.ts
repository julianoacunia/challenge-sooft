import { Company } from '@core/domain/company.entity';
import { ObjectId } from 'mongodb';
import { validate } from 'class-validator';

describe('Company Entity', () => {
  it('should be defined', () => {
    expect(Company).toBeDefined();
  });

  it('should have an id of type ObjectId', () => {
    const company = new Company();
    company.id = new ObjectId();
    expect(company.id).toBeInstanceOf(ObjectId);
  });

  it('should have a cuit of type string', () => {
    const company = new Company();
    company.cuit = '0-12345678-9';
    expect(typeof company.cuit).toBe('string');
  });

  it('should have a razonSocial of type string', () => {
    const company = new Company();
    company.razonSocial = 'Empresa Ejemplo 1 S.A.';
    expect(typeof company.razonSocial).toBe('string');
  });

  it('should have a fechaAdhesion of type Date', () => {
    const company = new Company();
    company.fechaAdhesion = new Date('2025-01-30T00:00:00.000Z');
    expect(company.fechaAdhesion).toBeInstanceOf(Date);
  });

  it('should validate the properties with class-validator', async () => {
    const company = new Company();
    company.id = new ObjectId('507f1f77bcf86cd799439011');
    company.cuit = '0-12345678-9';
    company.razonSocial = 'Empresa Ejemplo 1 S.A.';
    company.fechaAdhesion = new Date('2025-01-30T00:00:00.000Z');

    const errors = await validate(company);
    expect(errors.length).toBe(0);
  });

  it('should fail validation if cuit is not a string', async () => {
    const company = new Company();
    company.id = new ObjectId();
    company.cuit = 123456789 as any;
    company.razonSocial = 'Empresa Ejemplo 1 S.A.';
    company.fechaAdhesion = new Date('2025-01-30T00:00:00.000Z');

    const errors = await validate(company);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints?.isString).toBeDefined();
  });
});