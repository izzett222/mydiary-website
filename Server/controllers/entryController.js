import send from '../helpers/send';
import slugStr from '../helpers/slug';
import entries from '../data/entryData';
import EntryValidator from '../helpers/entryValidators';

export default class EntryController {
  static createEntry(req, res) {
    const slug = slugStr(req.body.title.trim());
    const entry = {
      id: 1,
      createdOn: new Date().toDateString(),
      slug,
      title: req.body.title.trim(),
      description: req.body.description.trim(),
      user_id: req.user.user_id
    };
    if (entries.length > 0) {
      entry.id = entries[entries.length - 1].id + 1;
    }
    entries.push(entry);
    send.successful(201, 'entry successfully created', entry);
    return send.send(res);
  }

  static updateEntry(req, res) {
    const { entry } = req;
    if (req.body.title) {
      entry.title = req.body.title.trim();
    }
    if (req.body.description) {
      entry.description = req.body.description.trim();
    }
    send.successful(200, 'entry successfully edited', entry);
    return send.send(res);
  }

  static deleteEntry(req, res) {
    const { entry } = req;
    entries.splice(entries.indexOf(entry), 1);
    send.successful(204, 'entry successful deleted', null);
    return send.send(res);
  }

  static getAllEntry(req, res) {
    const userEntries = entries.filter((el) => el.user_id === req.user.user_id);
    if (userEntries.length < 1) {
      send.error(404, new Error('your diary is empty, no entries found'));
      return send.send(res);
    }
    send.successful(200, null, userEntries);
    return send.send(res);
  }

  static getAnEntry(req, res) {
    const { entry } = req;
    send.successful(200, null, entry);
    return send.send(res);
  }

  static getBySlug(req, res) {
    const { slug } = req.params;
    const userEntries = entries.filter((el) => el.user_id === req.user.user_id);
    const entry = userEntries.find((el) => el.slug === slug);
    if (!entry) {
      send.error(404, new Error(`entry with slug equal to ${slug}. not found`));
      return send.send(res);
    }
    send.successful(200, null, entry);
    send.send(res);
  }
}
