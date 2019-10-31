import EntryValidator from '../helpers/entryValidators';
import Send from '../helpers/send';
import errorString from '../helpers/errorString';

export default class userValidatorMid {
  static create(req, res, next) {
    const send = new Send();
    const { error } = EntryValidator.create(req.body);
    if (error) {
      const newMessage = errorString(error);
      send.error(400, new Error(newMessage));
      return send.send(res);
    }
    next();
  }

  static update(req, res, next) {
    const send = new Send();
    const { error } = EntryValidator.update(req.body);
    if (error) {
      const newMessage = errorString(error);
      send.error(400, new Error(newMessage));
      return send.send(res);
    }
    next();
  }
}
