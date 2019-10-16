import express from 'express';
import morgan from 'morgan';
import usersRoute from './routes/userRoute';

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/v1/users', usersRoute);

export default app;
