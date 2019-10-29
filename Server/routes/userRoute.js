import express from 'express';
import UserController from '../controllers/userController';
import users from '../data/userData';

const router = express.Router();

router
  .route('/signup')
  .post(UserController.userSignup);
router
  .route('/signin')
  .post(UserController.login);
export default router;
