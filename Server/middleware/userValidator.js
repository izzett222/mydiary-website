import UserValidator from '../helpers/userValidators';
import Send from '../helpers/send';

export default class userValidatorMid {
  static signup(req, res, next) {
    const send = new Send();
    const { error } = UserValidator.signup(req.body);
    if (error) {
      send.error(400, error);
      return send.send(res);
    }
    next();
  }

  static login(req, res, next) {
    const send = new Send();
    const { error } = UserValidator.login(req.body);
    if (error) {
      send.error(400, error);
      return send.send(res);
    }
    next();
  }
}
