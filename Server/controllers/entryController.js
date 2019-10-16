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

  static updateEntry(req, res) {
    const send = new Send();
    const { error } = EntryValidator.update(req.body);
    if (error) {
      send.error(400, error);
      return send.send(res);
    }
    const userEntries = entries.filter((el) => el.user_id === req.user.user_id);
    const entry = userEntries.find((el) => el.id === req.params.id * 1);
    if (!entry) {
      const errorID = new Error('entry not found');
      send.error(404, errorID);
      return send.send(res);
    }
    if (req.body.title) {
      entry.title = req.body.title;
    }
    if (req.body.discription) {
      entry.discription = req.body.discription;
    }
    send.successful(200, 'entry successfully edited', entry);
    return send.send(res);
  }

  static deleteEntry(req, res) {
    const send = new Send();
    const userEntries = entries.filter((el) => el.user_id === req.user.user_id);
    const entry = userEntries.find((el) => el.id === req.params.id * 1);
    if (!entry) {
      send.error(404, 'entry not found');
      return send.send(res);
    }
    entries.splice(entries.indexOf(entry), 1);
    send.successful(204, 'entry successful deleted', null);
    return send.send(res);
  }

  static getAllEntry(req, res) {
    const send = new Send();
    const userEntries = entries.filter((el) => el.user_id === req.user.user_id);
    send.successful(200, null, userEntries);
    return send.send(res);
  }

  static getAnEntry(req, res) {
    const send = new Send();
    const entry = entries.find((el) => el.id === req.params.id * 1);
    if (!entry) {
      const errorID = new Error('entry not found');
      send.error(404, errorID);
      return send.send(res);
    }
    send.successful(200, null, entry);
    return send.send(res);
  }
}
