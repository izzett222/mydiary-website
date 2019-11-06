import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { users } from '../data/userData';
import send from '../helpers/send';

dotenv.config();
const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.token
    && req.headers.token.startsWith('Bearer')
  ) {
    [, ...token] = req.headers.token.split(' ');
  }
  if (!token) {
    send.error(401, new Error('token not found'));
    return send.send(res);
  }
  const decoded = jwt.verify(token, process.env.JWT_KEY);
  const freshUser = users.find((el) => el.userid === decoded.userid);
  if (!freshUser) {
    send.error(401, new Error('the user who belong to this token does not exist'));
    return send.send(res);
  }
  req.user = freshUser;
  return next();
};
export default protect;
