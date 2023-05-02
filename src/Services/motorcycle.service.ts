import { isValidObjectId } from 'mongoose';
import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM.model';

class MotorcycleService {
  private createMotorcycleDomain(motorcycle: IMotorcycle | null): Motorcycle | null {
    if (motorcycle) {
      return new Motorcycle(motorcycle);
    }
    return null;
  }

  public async createNewMotorcycle(motorcycle: IMotorcycle) {
    const motorcycleODM = new MotorcycleODM();
    const newCar = await motorcycleODM.create(motorcycle);
    return this.createMotorcycleDomain(newCar);
  }

  public async getAllMotorcycle() {
    const motorcycleODM = new MotorcycleODM();
    const carList = await motorcycleODM.getAllMotorcycle();
    return carList.map((motorcycle) => this.createMotorcycleDomain(motorcycle));
  }

  public async getMotorcycleById(id: string) {
    const motorcycleODM = new MotorcycleODM();
    const validCarId = isValidObjectId(id);
    if (!validCarId) {
      throw new Error('Invalid mongo id');
    }
    const motorcycle = await motorcycleODM.getMotorcycleById(id);
    if (!motorcycle) {
      return null;
    }
    return this.createMotorcycleDomain(motorcycle as IMotorcycle);
  }

  public async updateById(id: string, car:IMotorcycle): Promise<Motorcycle | null> {
    const carODM = new MotorcycleODM();    
    const update = await carODM.updateById(id, car);
    return this.createMotorcycleDomain(update);
  }
}
export default MotorcycleService;