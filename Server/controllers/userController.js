import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import Send from '../helpers/send';
import users from '../data/userData';
import UserValidator from '../helpers/userValidators';

dotenv.config();
export default class UserController {
  static async userSignup(req, res) {
    const send = new Send();
    const {
      firstName, lastName, email, password
    } = req.body;
    const { error } = UserValidator.signup(req.body);
    if (error) {
      send.error(400, error);
      return send.send(res);
    }
    if (users.find((el) => el.email === email)) {
      send.error(409, new Error('email already taken'));
      return send.send(res);
    }
    try {
      const newUser = {
        user_id: 1, firstName, lastName, email, password: await bcrypt.hash(password, 10)
      };
      if (users.length > 0) newUser.user_id = users[users.length - 1].user_id + 1;
      users.push(newUser);
      send.successful(201, 'user created successfully', { token: jwt.sign({ user_id: newUser.user_id }, process.env.JWT_KEY) });
      return send.send(res);
    } catch (err) {
      send.error(500, err);
      return send.send(res);
    }
  }
}