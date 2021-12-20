import asyncHandler from 'express-async-handler';

export default class OrderController {
  constructor({ orderService }) {
    this.orderService = orderService;
  }

  addOrderItems = asyncHandler(async (req, res) => {
    const createdOrder = await this.orderService.add(
      req.body.orderItems,
      req.user._id,
      req.body.shippingAddress,
      req.body.paymentMethod,
      req.body.itemsPrice,
      req.body.taxPrice,
      req.body.shippingPrice,
      req.body.totalPrice
    );

    if (!createdOrder) {
      res.status(400);
      throw new Error('Order not created');
    }

    res.status(201).json(createdOrder);
  });

  getOrderById = asyncHandler(async (req, res) => {
    const order = await this.orderService.getById(req.params.id);

    if (!order) {
      res.status(404);
      throw new Error(`Order not found`);
    }

    res.json(order);
  });

  updateOrderToPaid = asyncHandler(async (req, res) => {
    const paidOrder = await this.orderService.updateToPaid(
      req.params.id,
      req.user.id,
      req.body.id,
      req.body.status,
      req.body.update_time,
      req.body.email_address
    );

    if (!paidOrder) {
      res.status(404);
      throw new Error('Order not paid');
    }

    res.json(paidOrder);
  });

  updateOrderToDelivered = asyncHandler(async (req, res) => {
    const updatedOrder = await this.orderService.updateToDelivered(
      req.params.id
    );

    if (!updatedOrder) {
      res.status(404);
      throw new Error("Can't update order");
    }

    res.json(updatedOrder);
  });

  getMyOrders = asyncHandler(async (req, res) => {
    const myOrders = await this.orderService.getMy(req.user._id);

    if (!myOrders) {
      res.status(404);
      throw new Error(`Can't get orders of ${req.user.name}`);
    }

    res.json(myOrders);
  });

  getAllOrders = asyncHandler(async (req, res) => {
    const allOrders = await this.orderService.getAll();

    if (!allOrders) {
      res.status(404);
      throw new Error(`Can't get orders`);
    }

    res.json(allOrders);
  });
}
