import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const tokenHandler = (user) => jwt.sign({ userid: user.userid }, process.env.JWT_KEY);

export default tokenHandler;
