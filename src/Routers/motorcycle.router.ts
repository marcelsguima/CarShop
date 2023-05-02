import { Router } from 'express';
import MotorcycleController from '../Controllers/motorcycle.controller';

const motorcycleRouter = Router();

motorcycleRouter.post(
  '/',
  (req, res, next) => new MotorcycleController(req, res, next).createNewMotorcycle(),
);

motorcycleRouter.get(
  '/',
  (req, res, next) => new MotorcycleController(req, res, next).getAllMotorcycles(),
);

motorcycleRouter.get(
  '/:id',
  (req, res, next) => new MotorcycleController(req, res, next).getMotorcycleById(),
);

motorcycleRouter.put(
  '/:id',
  (req, res, next) => new MotorcycleController(req, res, next).updateById(req, res),
);

export default motorcycleRouter;