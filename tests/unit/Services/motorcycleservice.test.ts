import { expect } from 'chai';
import { Model } from 'mongoose';
import sinon from 'sinon';
import MotorcycleService from '../../../src/Services/motorcycle.service';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import Motorcycle from '../../../src/Domains/Motorcycle';

const service = new MotorcycleService();

describe('Service', function () {
  describe('With valid parameters', function () {
    const newMotorcycle: IMotorcycle = {
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      category: 'Sport',
      engineCapacity: 2.0,
    };
    
    it('Creates a motorcycle successfully', async function () {
      const motorcycle = new Motorcycle({ id: '644bd1418f6917399103e3c8', ...newMotorcycle });
      sinon.stub(Model, 'create').resolves(motorcycle);
      
      const result = await service.createNewMotorcycle(newMotorcycle);

      expect(result).to.be.deep.equal(motorcycle);
    });

    it('Returns a list with all motorcycles', async function () { 
      const motorcycle = [
        new Motorcycle({
          id: '644d6a6d59b71e63031ceebe',
          model: 'Lucid Air Saphir',
          year: 2023,
          color: 'Purple',
          status: true,
          buyValue: 500.99,
          category: 'Sport',
          engineCapacity: 2.0,
        }),
      ];
      sinon.stub(Model, 'find').resolves(motorcycle);
      
      const result = await service.getAllMotorcycle();

      expect(result).to.be.deep.equal(motorcycle);
    });

    it('Finds a motorcycle by id', async function () { 
      const motorcycle = new Motorcycle({
        id: '644bd1418f6917399103e3c8',
        model: 'Tempra',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 18.99,
        category: 'Sport',
        engineCapacity: 2.0,
      });
      sinon.stub(Model, 'findById').resolves(motorcycle);
     
      const result = await service.getMotorcycleById('644bd1418f6917399103e3c8');

      expect(result).to.be.deep.equal(motorcycle);
    });
  });

  describe('Error cases or invalid parameters', function () {
    it('Throws an exception if the id is invalid', async function () {
      sinon.stub(Model, 'findById').resolves();
      
      try {
        await service.getMotorcycleById('644bd1');
      } catch (error) {
        expect((error as Error).message).to.be.deep.equal('Invalid mongo id');
      }
    });

    it('Throws an exception if a motorcycle is not found', async function () {
      sinon.stub(Model, 'findById').resolves();
      try {
        await service.getMotorcycleById('644bd1418f6917399103e3c0');
      } catch (error) {
        expect((error as Error).message).to.be.deep.equal('Motorcycle not found');
      }
    });
  });
  afterEach(function () {
    sinon.restore();
  });
});
