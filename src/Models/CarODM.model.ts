import { Schema, isValidObjectId } from 'mongoose';
import ICar from '../Interfaces/ICar';
import AbstractODM from './AbstractODM';

export default class CarODM extends AbstractODM<ICar> {
  constructor() {
    const schema = new Schema<ICar>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean, required: true },
      buyValue: { type: Number, required: true },
      doorsQty: { type: Number, required: true },
      seatsQty: { type: Number, required: true },
    });
    super(schema, 'cars');
  }
  
  public async create(car: ICar): Promise<ICar> {
    return this.model.create({ ...car });
  }
  
  public async getAllCars() {
    return this.model.find();
  }

  public async getCarById(id: string) {
    return this.model.findById(id);
  }

  public async updateById(id: string, car: ICar): Promise<ICar | null> {
    if (!isValidObjectId(id)) throw new Error('Invalid mongo id');
    await this.model.findByIdAndUpdate(id, car, { new: true });
    return this.getCarById(id);
  }
}