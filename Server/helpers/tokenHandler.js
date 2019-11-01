import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const tokenHandler = (user) => {
  return jwt.sign({ user_id: user.user_id }, process.env.JWT_KEY);
};
export default tokenHandler;
