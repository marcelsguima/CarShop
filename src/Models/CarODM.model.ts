import { Schema, model, models, Model } from 'mongoose';
import ICar from '../Interfaces/ICar';

export default class CarODM {
  private schema: Schema;
  private model: Model<ICar>;
    
  constructor() {
    this.schema = new Schema<ICar>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean, required: true },
      buyValue: { type: Number, required: true },
      doorsQty: { type: Number, required: true },
      seatsQty: { type: Number, required: true },
    });
    this.model = models.Car || model('Car', this.schema);
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

  public async updateById(id: string, carUpdate: Partial<ICar>): Promise <ICar | null> {
    const car = await this.model.findByIdAndUpdate(id, carUpdate, { new: true });
    
    if (car) {
      const { _id, __v, ...updatedCar } = car.toObject();
      return { id: _id.toString(), ...updatedCar };
    }
    
    return null;
  }
}