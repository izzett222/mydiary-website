import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
// import { users } from '../data/userData';
import send from '../helpers/send';
import DbMethods from '../helpers/dbMethods';

dotenv.config();
const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.token
    && req.headers.token.startsWith('Bearer')
  ) {
    [, ...token] = req.headers.token.split(' ');
    [token] = token;
  }
  if (!token) {
    send.error(401, new Error('token not found'));
    return send.send(res);
  } try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const query = await DbMethods.select('userid', 'users', `userid='${decoded.userid}'`);
    const freshUser = query['0'];
    if (!freshUser) {
      send.error(403, new Error('the user who belong to this token does not exist'));
      return send.send(res);
    }
    req.userid = freshUser.userid;
    return next();
  } catch (error) {
    if (error.message === 'jwt malformed') {
      send.error(400, new Error('your token is invalid'));
      return send.send(res);
    }
    send.error(500, error);
    return send.send(res);
  }
};
export default protect;
