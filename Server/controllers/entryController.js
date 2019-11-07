import uuidv4 from 'uuid/v4';
import send from '../helpers/send';
import slugStr from '../helpers/slug';
import DbMethods from '../helpers/dbMethods';
import paginate from '../helpers/pagination';

export default class EntryController {
  static async createEntry(req, res) {
    let { title } = req.body;
    const { description } = req.body;
    if (!title) {
      title = 'untitled';
    }
    const { userid } = req;
    const slug = slugStr(title.trim());
    const id = uuidv4();
    try {
      const entry = await DbMethods.insert('entries', 'id, slug, title, description, userid', '$1, $2, $3, $4, $5', [id, slug, title.trim(), description.trim(), userid], '*');
      send.successful(201, 'entry successfully created', entry);
      return send.send(res);
    } catch (err) {
      send.error(500, err);
      return send.send(res);
    }
  }

  static async updateEntry(req, res) {
    try {
      let entry;
      if (req.body.title) {
        entry = await DbMethods.update('entries', `title= '${req.body.title}'`, `id='${req.params.id}' AND userid='${req.userid}'`, '*');
      }
      if (req.body.description) {
        entry = await DbMethods.update('entries', `description='${req.body.description}'`, `id='${req.params.id}' AND userid='${req.userid}'`, '*');
      }
      send.successful(200, 'entry successfully edited', entry);
      return send.send(res);
    } catch (error) {
      send.error(500, error);
      return send.send(res);
    }
  }

  static async deleteEntry(req, res) {
    try {
      await DbMethods.delete('entries', `id='${req.params.id}' AND userid='${req.userid}'`);
      send.successful(200, 'entry successful deleted', null);
      return send.send(res);
    } catch (error) {
      send.error(500, error);
      return send.send(res);
    }
  }

  static async getAllEntry(req, res) {
    const { p } = req.query;
    try {
      const userEntries = await DbMethods.select('*', 'entries', `userid='${req.userid}'`);
      if (userEntries.length < 1) {
        send.error(404, new Error('your diary is empty, no entries found'));
        return send.send(res);
      }
      if (p) {
        if (p * 1 < 1 || Number.isNaN(p * 1)) {
          send.error(400, new Error('a page should be a number and should be greater than 0'));
          return send.send(res);
        }
        const result = paginate(userEntries, p * 1);
        if (result.entries.length < 1) {
          send.error(404, new Error(`page ${p} not found`));
          return send.send(res);
        }
        send.successful(200, `page ${p}`, result);
        return send.send(res);
      }
      send.successful(200, null, userEntries);
      return send.send(res);
    } catch (error) {
      send.successful(500, error);
      return send.send(res);
    }
  }

  static async getAnEntry(req, res) {
    try {
      const query = await DbMethods.select('*', 'entries', `id='${req.params.id}' AND userid='${req.userid}'`);
      const entry = query['0'];
      send.successful(200, null, entry);
      return send.send(res);
    } catch (error) {
      send.error(500, error);
      return send.send(res);
    }
  }

  static async getBySlug(req, res) {
    try {
      const { slug } = req.params;
      const query = await DbMethods.select('*', 'entries', `slug='${slug}' AND userid='${req.userid}'`);
      const entry = query['0'];
      if (!entry) {
        send.error(404, new Error(`entry with slug equal to ${slug}. not found`));
        return send.send(res);
      }
      send.successful(200, null, entry);
      return send.send(res);
    } catch (error) {
      send.error(500, error);
      return send.send(res);
    }
  }
}
