import express from 'express';
import EntryController from '../controllers/entryController';
import users from '../data/userData';
import protect from '../helpers/protect';

const router = express.Router();
router.use(protect);
router
  .route('/')
  .post(EntryController.createEntry);
router
  .route('/:id')
  .patch(EntryController.updateEntry);

export default router;
