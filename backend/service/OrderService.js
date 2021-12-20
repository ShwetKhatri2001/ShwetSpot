import Order from '../model/orderModel.js';
import User from '../model/userModel.js';
import Product from '../model/productModel.js';

export default class OrderService {
  constructor() {}

  getAll = async () => {
    await Order.find({}).populate('user', 'id name');
  };

  getMy = async userId => {
    return await Order.find({ user: userId });
  };

  getById = async orderId => {
    const foundOrder = await Order.findById(orderId).populate(
      'user',
      'name email'
    );

    if (!foundOrder) {
      throw new Error('Order not found');
    }

    return foundOrder;
  };

  add = async (
    orderItems,
    user,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice
  ) => {
    if (orderItems && orderItems.length === 0) {
      throw new Error('No order items');
    } else {
      const addedOrder = new Order({
        orderItems,
        user,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });

      return await addedOrder.save();
    }
  };

  updateToPaid = async (
    orderId,
    userId,
    paymentId,
    paymentStatus,
    paymentUpdateTime,
    paymentEmailAddress
  ) => {
    const orderToUpdate = await Order.findById(orderId);
    const userToUpdate = await User.findById(userId);

    if (
      orderToUpdate &&
      userToUpdate &&
      orderToUpdate.totalPrice < userToUpdate.money
    ) {
      orderToUpdate.isPaid = true;
      orderToUpdate.paidAt = Date.now();
      orderToUpdate.paymentResult = {
        id: paymentId,
        status: paymentStatus,
        update_time: paymentUpdateTime,
        email_address: paymentEmailAddress,
      };

      userToUpdate.money -= orderToUpdate.totalPrice;

      const userIdAmountMap = new Map();

      orderToUpdate.orderItems.map(item => {
        userIdAmountMap.set(item.user, item.qty * item.price);
      });

      for (const [userId, amount] of userIdAmountMap) {
        const user = await User.findById(userId);
        user.money += amount;
        await user.save();
      }

      const updatedOrder = await orderToUpdate.save();
      const updatedUser = await userToUpdate.save();

      if (!updatedOrder.isPaid) {
        throw new Error('Order not found');
      }

      return {
        order: updatedOrder,
        user: updatedUser,
      };
    }
  };

  updateToDelivered = async orderId => {
    const order = await Order.findById(orderId);
    const productIdQtyMap = new Map();

    order.orderItems.map(item => {
      productIdQtyMap.set(item.product, item.qty);
    });

    for (const [product, qty] of productIdQtyMap) {
      const products = await Product.find({ _id: { $in: product } });
      const foundProduct = products[0];
      foundProduct.countInStock -= qty;
      await foundProduct.save();
    }

    if (!order) {
      throw new Error('Order not found');
    }

    order.isDelivered = true;
    order.deliveredAt = Date.now();
    return await order.save();
  };
}
