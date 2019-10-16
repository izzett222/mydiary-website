import Send from '../helpers/send';
import entries from '../data/entryData';
import EntryValidator from '../helpers/entryValidators';

export default class EntryController {
  static createEntry(req, res) {
    const send = new Send();
    const { error } = EntryValidator.create(req.body);
    if (error) {
      send.error(400, error);
      return send.send(res);
    }
    const entry = {
      id: 1,
      title: req.body.title,
      createdOn: new Date().toDateString(),
      user_id: req.user.user_id,
      discription: req.body.discription
    };
    if (entries.length > 0) {
      entry.id = entries[entries.length - 1].id + 1;
    }
    entries.push(entry);
    send.successful(201, 'entry successfully created', entry);
    return send.send(res);
  }
}
