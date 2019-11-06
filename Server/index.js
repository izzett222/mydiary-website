import dotenv from 'dotenv';
import app from './app';

dotenv.config();
const port = process.env.PORT || 5000;
app.listen(port, () => {
  process.stdout.write(`app running on port ${port}...`);
});
