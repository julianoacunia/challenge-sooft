import { Transfer } from '@core/domain/transfers.entity';
import { validate } from 'class-validator';
import { ObjectId } from 'mongodb';

describe('Transfer Entity', () => {
  it('should be defined', () => {
    expect(Transfer).toBeDefined();
  });

  it('should have an id of type ObjectId', () => {
    const transfer = new Transfer();
    transfer.id = new ObjectId('507f1f77bcf86cd799439013');
    expect(transfer.id).toBeInstanceOf(ObjectId);
  });

  it('should have an idEmpresa of type ObjectId', () => {
    const transfer = new Transfer();
    transfer.idEmpresa = new ObjectId('67b646af37d3980c51bb885a');
    expect(transfer.idEmpresa).toBeInstanceOf(ObjectId);
  });

  it('should have an importe of type number', () => {
    const transfer = new Transfer();
    transfer.importe = 1000;
    expect(typeof transfer.importe).toBe('number');
  });

  it('should have a cuentaDebito of type string', () => {
    const transfer = new Transfer();
    transfer.cuentaDebito = '123456789';
    expect(typeof transfer.cuentaDebito).toBe('string');
  });

  it('should have a cuentaCredito of type string', () => {
    const transfer = new Transfer();
    transfer.cuentaCredito = '987654321';
    expect(typeof transfer.cuentaCredito).toBe('string');
  });

  it('should have a fecha of type Date', () => {
    const transfer = new Transfer();
    transfer.fecha = new Date('2023-01-01T00:00:00.000Z');
    expect(transfer.fecha).toBeInstanceOf(Date);
  });

  it('should validate the properties with class-validator', async () => {
    const transfer = new Transfer();
    transfer.id = new ObjectId('507f1f77bcf86cd799439013');
    transfer.idEmpresa = new ObjectId('67b646af37d3980c51bb885a');
    transfer.importe = 1000;
    transfer.cuentaDebito = '123456789';
    transfer.cuentaCredito = '987654321';
    transfer.fecha = new Date('2023-01-01T00:00:00.000Z');

    const errors = await validate(transfer);
    expect(errors.length).toBe(0);
  });

  it('should fail validation if importe is not a number', async () => {
    const transfer = new Transfer();
    transfer.id = new ObjectId('507f1f77bcf86cd799439013');
    transfer.idEmpresa = new ObjectId('67b646af37d3980c51bb885a');
    transfer.importe = parseInt('1000');
    transfer.cuentaDebito = '123456789';
    transfer.cuentaCredito = '987654321';
    transfer.fecha = new Date('2023-01-01T00:00:00.000Z');

    const errors = await validate(transfer);
    expect(errors.length).toBe(0);
  });

  it('should fail validation if cuentaDebito is not a string', async () => {
    const transfer = new Transfer();
    transfer.id = new ObjectId('507f1f77bcf86cd799439013');
    transfer.idEmpresa = new ObjectId('67b646af37d3980c51bb885a');
    transfer.importe = 1000;
    transfer.cuentaDebito = '123456789';
    transfer.cuentaCredito = '987654321';
    transfer.fecha = new Date('2023-01-01T00:00:00.000Z');

    const errors = await validate(transfer);
    expect(errors.length).toBe(0);
  });

  it('should fail validation if fecha is not a Date', async () => {
    const transfer = new Transfer();
    transfer.id = new ObjectId('507f1f77bcf86cd799439013');
    transfer.idEmpresa = new ObjectId('67b646af37d3980c51bb885a');
    transfer.importe = 1000;
    transfer.cuentaDebito = '123456789';
    transfer.cuentaCredito = '987654321';
    transfer.fecha = new Date('2023-01-01T00:00:00.000Z');

    const errors = await validate(transfer);
    expect(errors.length).toBe(0);
  });
});