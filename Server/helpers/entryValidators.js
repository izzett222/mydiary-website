import Joi from '@hapi/joi';

export default class EntryValidator {
  static create(entry) {
    const schema = Joi.object().keys({
      title: Joi.string().required().min(3).max(40),
      description: Joi.string().required().min(3)
    });
    return schema.validate(entry);
  }

  static update(entry) {
    const schema = Joi.object().keys({
      title: Joi.string().min(3).max(40),
      description: Joi.string().min(3)
    }).or('title', 'description');
    return schema.validate(entry);
  }
}
