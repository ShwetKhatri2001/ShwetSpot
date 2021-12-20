import express from 'express';
import { admin, protect } from '../middleware/authMiddleware.js';
import { container, setup } from '../di-setup.js';

setup();
const router = express.Router();

const orderController = container.resolve('orderController');

router
  .route('/')
  .post(protect, orderController.addOrderItems)
  .get(protect, admin, orderController.getAllOrders);
router.route('/myorders').get(protect, orderController.getMyOrders);
router.route('/:id').get(protect, orderController.getOrderById);
router.route('/:id/pay').put(protect, orderController.updateOrderToPaid);
router
  .route('/:id/deliver')
  .put(protect, admin, orderController.updateOrderToDelivered);

export default router;
