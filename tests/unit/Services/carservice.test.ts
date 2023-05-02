import { expect } from 'chai';
import { Model } from 'mongoose';
import sinon from 'sinon';
import Car from '../../../src/Domains/Car';
import ICar from '../../../src/Interfaces/ICar';
import CarService from '../../../src/Services/car.service';

const service = new CarService();

describe('Service', function () {
  describe('With valid parameters', function () {
    const newCar: ICar = {
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    };
    
    it('Creates a car successfully', async function () {
      const car = new Car({ id: '644bd1418f6917399103e3c8', ...newCar });
      sinon.stub(Model, 'create').resolves(car);
      
      const result = await service.createNewCar(newCar);

      expect(result).to.be.deep.equal(car);
    });

    it('Returns a list with all cars', async function () { 
      const car = [
        new Car({
          id: '644d6a6d59b71e63031ceebe',
          model: 'Lucid Air Saphir',
          year: 2023,
          color: 'Purple',
          status: true,
          buyValue: 500.99,
          doorsQty: 4,
          seatsQty: 5,
        }),
      ];
      sinon.stub(Model, 'find').resolves(car);
      
      const result = await service.getAllCars();

      expect(result).to.be.deep.equal(car);
    });

    it('Finds a car by id', async function () { 
      const car = new Car({
        id: '644bd1418f6917399103e3c8',
        model: 'Tempra',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 18.99,
        doorsQty: 4,
        seatsQty: 5,
      });
      sinon.stub(Model, 'findById').resolves(car);
     
      const result = await service.getCarById('644bd1418f6917399103e3c8');

      expect(result).to.be.deep.equal(car);
    });
  });

  describe('Error cases or invalid parameters', function () {
    it('Throws an exception if the id is invalid', async function () {
      sinon.stub(Model, 'findById').resolves();
      
      try {
        await service.getCarById('644bd1');
      } catch (error) {
        expect((error as Error).message).to.be.deep.equal('Invalid mongo id');
      }
    });

    it('Throws an exception if a car is not found', async function () {
      sinon.stub(Model, 'findById').resolves();
      try {
        await service.getCarById('644bd1418f6917399103e3c0');
      } catch (error) {
        expect((error as Error).message).to.be.deep.equal('Car not found');
      }
    });
  });
  afterEach(function () {
    sinon.restore();
  });
});
