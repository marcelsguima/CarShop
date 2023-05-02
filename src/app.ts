import express from 'express';
import carRoutes from './Routers/car.router';
import motorcycleRoutes from './Routers/motorcycle.router';

const app = express();

app.use(express.json());
app.use('/cars', carRoutes);
app.use('/motorcycles', motorcycleRoutes);

export default app;
