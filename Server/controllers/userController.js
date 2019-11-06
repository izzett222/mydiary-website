import bcrypt from 'bcrypt';
import uuidv4 from 'uuid/v4';
import send from '../helpers/send';
import tokenHandler from '../helpers/tokenHandler';
import DbMethods from '../helpers/dbMethods';

export default class UserController {
  static async userSignup(req, res) {
    const {
      firstname, lastname, email, password,
    } = req.body;
    const userid = uuidv4();
    try {
      const crypted = await bcrypt.hash(password.trim(), 10);
      const newUser = await DbMethods.insert('users', 'userid, firstname, lastname, email, password', '$1, $2, $3, $4, $5', [userid, firstname.trim(), lastname.trim(), email.trim(), crypted], 'userid, firstName, lastName, email');
      const token = tokenHandler(newUser);
      send.successful(201, 'user created successfully', { token, user: newUser });
      return send.send(res);
    } catch (err) {
      if (err.message.startsWith('duplicate key')) {
        send.error(409, new Error('email already taken'));
        return send.send(res);
      }
      send.error(500, err);
      return send.send(res);
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await DbMethods.select('userid, firstName,lastName, email, password', 'users', `email='${email}'`);
      if (!user) {
        send.error(404, new Error('incorrect email or password'));
        return send.send(res);
      }
      if (!await bcrypt.compare(password.trim(), user.password)) {
        send.error(401, new Error('incorrect email or password'));
        return send.send(res);
      }
      const { ...sendUser } = user;
      delete sendUser.password;
      const token = tokenHandler(user);

      send.successful(200, 'User logged in successfully', { token, user: sendUser });
      return send.send(res);
    } catch (err) {
      send.error(500, err);
      return send.send(res);
    }
  }
}
