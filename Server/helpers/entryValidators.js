import Joi from '@hapi/joi';

export default class EntryValidator {
  static create(entry) {
    const schema = Joi.object().keys({
      title: Joi.string().required().min(3).max(40),
      discription: Joi.string().required().min(3)
    });
    return schema.validate(entry);
  }
}
