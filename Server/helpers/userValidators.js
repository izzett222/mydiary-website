import Joi from '@hapi/joi';

export default class UserValidator {
  static signup(user) {
    const schema = Joi.object().keys({
      firstName: Joi.string().required().min(3).max(40),
      lastName: Joi.string().required().min(3).max(40),
      email: Joi.string().email().required(),
      password: Joi.string().required().min(5)
    });
    return schema.validate(user);
  }

  static login(user) {
    const schema = Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required()
    });
    return schema.validate(user);
  }
}
