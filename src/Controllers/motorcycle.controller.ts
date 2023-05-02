import { NextFunction, Request, Response } from 'express';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleService from '../Services/motorcycle.service';

const invalidId = 'Invalid mongo id';
class MotorcycleController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotorcycleService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotorcycleService();
  }
  
  public async createNewMotorcycle() {
    let motorcycleStatus = false;
    if (this.req.body.status) {
      motorcycleStatus = true;
    }

    const motorcycle: IMotorcycle = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: motorcycleStatus,
      buyValue: this.req.body.buyValue,
      category: this.req.body.category,
      engineCapacity: this.req.body.engineCapacity,
    };

    try {
      const newMotorcycle = await this.service.createNewMotorcycle(motorcycle);
      return this.res.status(201).json(newMotorcycle);
    } catch (error) {
      this.next(error); 
    }
  }

  public async getAllMotorcycles() {
    try {
      const allMotorcycles = await this.service.getAllMotorcycle();
      return this.res.status(200).json(allMotorcycles);
    } catch (error) {
      this.next(error);
    }
  }

  public async getMotorcycleById() {
    const { id } = this.req.params;
    try {
      const validMotorcycle = await this.service.getMotorcycleById(id);
      if (!validMotorcycle) {
        return this.res.status(404).json({ message: "Motorcycle not found" });
      }
      return this.res.status(200).json(validMotorcycle);
    } catch (error: unknown) {
      if (error instanceof Error && error.message === invalidId) {
        return this.res.status(422).json({ message: invalidId });
      }
      return this.next(error);
    }
  }

  public async updateById(req: Request, res: Response) {
    try {
      const carUpdate = req.body;
      const { id } = req.params;
      const newCar = new MotorcycleService();
      const car = await newCar.updateById(id, carUpdate);
      const validCar = await this.service.getMotorcycleById(id);
      if (!validCar) {
        return this.res.status(404).json({ message: "Motorcycle not found" });
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
export default MotorcycleController;