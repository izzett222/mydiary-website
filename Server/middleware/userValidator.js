import UserValidator from '../helpers/userValidators';
import Send from '../helpers/send';
import errorString from '../helpers/errorString';

export default class userValidatorMid {
  static signup(req, res, next) {
    const send = new Send();
    const { error } = UserValidator.signup(req.body);
    if (error) {
      const newMessage = errorString(error);
      send.error(400, new Error(newMessage));
      return send.send(res);
    }
    next();
  }

  static login(req, res, next) {
    const send = new Send();
    const { error } = UserValidator.login(req.body);
    if (error) {
      const newMessage = errorString(error);
      send.error(400, new Error(newMessage));
      return send.send(res);
    }
    next();
  }
}
