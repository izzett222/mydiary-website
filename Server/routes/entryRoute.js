import express from 'express';
import EntryController from '../controllers/entryController';
import { users } from '../data/userData';
import protect from '../middleware/protect';
import EntryValidatorMiddleware from '../middleware/entryVal';
import idhandler from '../middleware/idHandler';

const router = express.Router();
router.use(protect);
router
  .route('/')
  .post(EntryValidatorMiddleware.create, EntryController.createEntry)
  .get(EntryController.getAllEntry);
router.param('id', idhandler);
router
  .route('/:id')
  .patch(EntryValidatorMiddleware.update, EntryController.updateEntry)
  .delete(EntryController.deleteEntry)
  .get(EntryController.getAnEntry);
router
  .route('/slug/:slug')
  .get(EntryController.getBySlug);

export default router;
