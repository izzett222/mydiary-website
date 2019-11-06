import UserValidator from '../helpers/userValidators';
import send from '../helpers/send';
import errorString from '../helpers/errorString';

export default class userValidatorMid {
  static signup(req, res, next) {
    const { error } = UserValidator.signup(req.body);
    if (error) {
      const newMessage = errorString(error);
      send.error(400, new Error(newMessage));
      return send.send(res);
    }
    return next();
  }

  static login(req, res, next) {
    const { error } = UserValidator.login(req.body);
    if (error) {
      const newMessage = errorString(error);
      send.error(400, new Error(newMessage));
      return send.send(res);
    }
    return next();
  }
}
