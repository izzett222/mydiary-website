import express from 'express';
import UserController from '../controllers/userController';
import UserValidatorMiddleware from '../middleware/userValidator';
import { users } from '../data/userData';

const router = express.Router();

router
  .route('/signup')
  .post(UserValidatorMiddleware.signup, UserController.userSignup);
router
  .route('/signin')
  .post(UserValidatorMiddleware.login, UserController.login);
export default router;
