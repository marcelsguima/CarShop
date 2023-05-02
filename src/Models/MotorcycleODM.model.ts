import { Schema, isValidObjectId } from 'mongoose';
import IMotorcycle from '../Interfaces/IMotorcycle';
import AbstractODM from './AbstractODM';

export default class MotorcycleODM extends AbstractODM<IMotorcycle> {
  constructor() {
    const schema = new Schema<IMotorcycle>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean, required: false },
      buyValue: { type: Number, required: true },
      category: { type: String, required: true },
      engineCapacity: { type: Number, required: true },
    });
    super(schema, 'motorcycles');
  }
  
  public async create(motorcycle: IMotorcycle): Promise<IMotorcycle> {
    return this.model.create({ ...motorcycle });
  }
  
  public async getAllMotorcycle() {
    return this.model.find();
  }

  public async getMotorcycleById(id: string) {
    return this.model.findById(id);
  }

  public async updateById(id: string, car: IMotorcycle): Promise<IMotorcycle | null> {
    if (!isValidObjectId(id)) throw new Error('Invalid mongo id');
    await this.model.findByIdAndUpdate(id, car, { new: true });
    return this.getMotorcycleById(id);
  }
}