import express from 'express';
import morgan from 'morgan';
import usersRoute from './routes/userRoute';
import entriesRoute from './routes/entryRoute';
import send from './helpers/send';

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/v1/users', usersRoute);
app.use('/api/v1/entries', entriesRoute);
app.all('*', (req, res) => {
  send.error(404, new Error(`can't find ${req.originalUrl}`));
  return send.send(res);
});

export default app;
