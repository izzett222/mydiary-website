import Joi from '@hapi/joi';

export default class UserValidator {
  static signup(user) {
    const schema = Joi.object().keys({
      firstName: Joi.string().required().min(3).max(40)
        .trim()
        .pattern(/^[a-zA-Z]+$/),
      lastName: Joi.string().required().min(3).max(40)
        .trim()
        .regex(/^[a-zA-Z]+$/),
      email: Joi.string().email().required().trim(),
      password: Joi.string().required().min(5).trim()
    });
    return schema.validate(user);
  }

  static login(user) {
    const schema = Joi.object().keys({
      email: Joi.string().email().required().trim(),
      password: Joi.string().required().trim()
    });
    return schema.validate(user);
  }
}
