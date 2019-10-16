import express from 'express';
import morgan from 'morgan';
import usersRoute from './routes/userRoute';
import entriesRoute from './routes/entryRoute';

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/v1/users', usersRoute);
app.use('/api/v1/entries', entriesRoute);

export default app;
