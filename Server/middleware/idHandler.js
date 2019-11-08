// import entries from '../data/entryData';
import send from '../helpers/send';
import DbMethods from '../helpers/dbMethods';

const idHandler = async (req, res, next) => {
  const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  const truth = regex.test(req.params.id);
  if (!truth) {
    send.error(400, new Error('the id given is not a valid UUID'));
    return send.send(res);
  }
  const query = await DbMethods.select('id', 'entries', `id='${req.params.id}' AND userid='${req.userid}'`);
  if (!query['0']) {
    send.error(404, new Error('entry not found in your diary'));
    return send.send(res);
  }
  return next();
};
export default idHandler;
