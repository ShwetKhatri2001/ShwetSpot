import express from 'express';
import { admin, protect } from '../middleware/authMiddleware.js';
import { container, setup } from '../di-setup.js';

setup();
const router = express.Router();

const userController = container.resolve('userController');

router
  .route('/')
  .post(userController.registerUser)
  .get(protect, admin, userController.getAllUsers);
router.post('/login', userController.authUser);
router
  .route('/profile')
  .get(protect, userController.getUserProfile)
  .put(protect, userController.updateUserProfile);
router
  .route('/:id')
  .delete(protect, admin, userController.deleteUser)
  .get(protect, admin, userController.getUserById)
  .put(protect, admin, userController.updateUser);

export default router;
