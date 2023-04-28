import { isValidObjectId } from 'mongoose';
import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM.model';

class CarService {
  private createCarDomain(car: ICar | null): Car | null {
    if (car) {
      return new Car(car);
    }
    return null;
  }

  public async createNewCar(car: ICar) {
    const carODM = new CarODM();
    const newCar = await carODM.create(car);
    return this.createCarDomain(newCar);
  }

  public async listCars() {
    const carODM = new CarODM();
    const carList = await carODM.listallCars();
    return carList.map((car) => this.createCarDomain(car));
  }

  public async getCarById(id: string) {
    const carODM = new CarODM();
    const validCarId = isValidObjectId(id);
    if (!validCarId) {
      throw new Error('Invalid mongo id');
    }
    const car = await carODM.getCarById(id);
    if (!car) {
      return null;
    }
    return this.createCarDomain(car as ICar);
  }
}
export default CarService;