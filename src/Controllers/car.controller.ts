import { NextFunction, Request, Response } from 'express';
import ICar from '../Interfaces/ICar';
import CarService from '../Services/car.service';

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

  public async listAllCars() {
    try {
      const carsList = await this.service.listCars();
      return this.res.status(200).json(carsList);
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
      if (error instanceof Error && error.message === 'Invalid mongo id') {
        return this.res.status(422).json({ message: 'Invalid mongo id' });
      }
      return this.next(error);
    }
  }
}
export default CarController;