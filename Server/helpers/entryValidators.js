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
    let schema = Joi.object().keys({});
    if (entry.title) {
      schema = schema.keys({
        title: Joi.string().required().min(3).max(40)
      });
    }
    if (entry.description) {
      schema = schema.keys({
        description: Joi.string().required().min(3)
      });
    }
    return schema.validate(entry);
  }
}
