import bcrypt from 'bcrypt';
import send from '../helpers/send';
import { users, User } from '../data/userData';
import tokenHandler from '../helpers/tokenHandler';

export default class UserController {
  static async userSignup(req, res) {
    const {
      firstName, lastName, email, password
    } = req.body;
    if (users.find((el) => el.email === email.trim())) {
      send.error(409, new Error('email already taken'));
      return send.send(res);
    }
    try {
      const newUser = new User(firstName, lastName, email, password);
      newUser.password = await bcrypt.hash(newUser.password.trim(), 10);
      if (users.length > 0) newUser.user_id = users[users.length - 1].user_id + 1;
      users.push(newUser);
      const { ...sendUser } = newUser;
      delete sendUser.password;
      const token = tokenHandler(newUser);
      send.successful(201, 'user created successfully', { token, user: sendUser });
      return send.send(res);
    } catch (err) {
      send.error(500, err);
      return send.send(res);
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;
    const user = users.find((el) => el.email === email.trim());
    if (!user) {
      send.error(404, new Error('incorrect email or password'));
      return send.send(res);
    }
    try {
      if (!await bcrypt.compare(password.trim(), user.password)) throw new Error('incorrect email or password');
      const { ...sendUser } = user;
      delete sendUser.password;
      const token = tokenHandler(user);
      send.successful(200, 'User logged in successfully', { token, user: sendUser });
      return send.send(res);
    } catch (err) {
      if (err.message === 'incorrect email or password') {
        send.error(401, err);
        return send.send(res);
      }
      send.error(500, err);
      return send.send(res);
    }
  }
}
