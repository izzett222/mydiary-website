import Joi from '@hapi/joi';

export default class EntryValidator {
  static create(entry) {
    const schema = Joi.object().keys({
      title: Joi.string().required().min(3).max(40)
        .trim(),
      description: Joi.string().required().min(3).trim(),
    });
    return schema.validate(entry);
  }

  static update(entry) {
    const schema = Joi.object().keys({
      title: Joi.string().min(3).max(40).trim(),
      description: Joi.string().min(3).trim(),
    }).or('title', 'description');
    return schema.validate(entry);
  }
}
