import express from 'express';
import EntryController from '../controllers/entryController';
import users from '../data/userData';
import protect from '../middleware/protect';
import idhandler from '../middleware/idHandler';

const router = express.Router();
router.use(protect);
router
  .route('/')
  .post(EntryController.createEntry)
  .get(EntryController.getAllEntry);
router.param('id', idhandler);
router
  .route('/:id')
  .patch(EntryController.updateEntry)
  .delete(EntryController.deleteEntry)
  .get(EntryController.getAnEntry);
router
  .route('/title/:slug')
  .get(EntryController.getBySlug);

export default router;
