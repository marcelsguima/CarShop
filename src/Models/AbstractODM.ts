import { Model, Schema, models, model, isValidObjectId, UpdateQuery } from 'mongoose';

export default abstract class AbstractODM<T> {
  protected model: Model<T>;
  protected schema: Schema;
  protected modelName: string;

  constructor(schema: Schema, modelName: string) {
    this.schema = schema;
    this.modelName = modelName;
    this.model = models[this.modelName] || model(modelName, this.schema);
  }
  
  public async create(vehicle: T): Promise<T> {
    return this.model.create({ ...vehicle });
  }
  
  public async getAll() {
    return this.model.find();
  }

  public async getById(id: string) {
    return this.model.findById(id);
  }

  public async updateById(id: string, obj: Partial<T>):
  Promise<T | null> {
    if (!isValidObjectId(id)) { 
      throw Error('Invalid Mongo id'); 
    }
    return this.model.findByIdAndUpdate(
      { _id: id },
      { ...obj } as UpdateQuery<T>,
      { new: true },
    );   
  }
}