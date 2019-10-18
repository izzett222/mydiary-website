import entries from '../data/entryData';
import Send from '../helpers/send';

const idHandler = (req, res, next) => {
  const send = new Send();
  const regex = /^\d+$/;
  console.log(req.params.id);
  const truth = regex.test(req.params.id);
  if (!truth) {
    send.error(400, new Error('the id should be numeric'));
    return send.send(res);
  }
  const userEntries = entries.filter((el) => el.user_id === req.user.user_id);
  const entry = userEntries.find((el) => el.id === req.params.id * 1);
  if (!entry) {
    const errorID = new Error('entry not found');
    send.error(404, errorID);
    return send.send(res);
  }
  req.entry = entry;
  next();
};
export default idHandler;
