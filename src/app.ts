import express from 'express';
import carRoutes from './Routers/car.router';

const app = express();

app.use(express.json());
app.use('/cars', carRoutes);

export default app;
