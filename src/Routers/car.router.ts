import { Router } from 'express';
import CarController from '../Controllers/car.controller';

const carRoutes = Router();

carRoutes.post(
  '/',
  (req, res, next) => new CarController(req, res, next).createNewCar(),
);

carRoutes.get(
  '/',
  (req, res, next) => new CarController(req, res, next).getAllCars(),
);

carRoutes.get(
  '/:id',
  (req, res, next) => new CarController(req, res, next).getCarById(),
);

carRoutes.put(
  '/:id',
  (req, res, next) => new CarController(req, res, next).updateCarById(req, res),
);

export default carRoutes;