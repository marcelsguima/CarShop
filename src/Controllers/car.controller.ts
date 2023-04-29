import { NextFunction, Request, Response } from 'express';
import ICar from '../Interfaces/ICar';
import CarService from '../Services/car.service';

const invalidId = 'Invalid mongo id';
class CarController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: CarService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new CarService();
  }
  
  public async createNewCar() {
    let carStatus = false;
    if (this.req.body.status) {
      carStatus = true;
    }

    const car: ICar = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: carStatus,
      buyValue: this.req.body.buyValue,
      doorsQty: this.req.body.doorsQty,
      seatsQty: this.req.body.seatsQty,
    };

    try {
      const newCar = await this.service.createNewCar(car);
      return this.res.status(201).json(newCar);
    } catch (error) {
      this.next(error); 
    }
  }

  public async getAllCars() {
    try {
      const allCars = await this.service.getAllCars();
      return this.res.status(200).json(allCars);
    } catch (error) {
      this.next(error);
    }
  }

  public async getCarById() {
    const { id } = this.req.params;
    try {
      const validCar = await this.service.getCarById(id);
      if (!validCar) {
        return this.res.status(404).json({ message: 'Car not found' });
      }
      return this.res.status(200).json(validCar);
    } catch (error: unknown) {
      if (error instanceof Error && error.message === invalidId) {
        return this.res.status(422).json({ message: invalidId });
      }
      return this.next(error);
    }
  }

  public async updateCarById(req: Request, res: Response) {
    try {
      const carUpdate = req.body;
      const { id } = req.params;
      const newCar = new CarService();
      const car = await newCar.updateById(id, carUpdate);
      const validCar = await this.service.getCarById(id);
      if (!validCar) {
        return this.res.status(404).json({ message: 'Car not found' });
      }
      return res.status(200).json(car);
    } catch (error: unknown) {
      if (error instanceof Error && error.message === invalidId) {
        return this.res.status(422).json({ message: invalidId });
      }
      return this.next(error);
    }
  }
}
export default CarController;