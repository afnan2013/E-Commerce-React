import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

const saveOrder = asyncHandler(async (req, res) => {
  const user = req.user;
  if (user) {
    const order = new Order({
      user: req.user._id,
      orderItems: req.orderItems,
      shippingAddress: req.shippingAddress,
      paymentMethod: req.paymentMethod,
      taxPrice: req.taxPrice,
      shippingPrice: req.shippingPrice,
      totalPrice: req.totalPrice,
    });

    const placeOrder = await order.save();
    if (placeOrder) {
      res.json({
        placeOrder,
      });
    } else {
      res.status(500);
      throw new Error('Place Order Failed');
    }
  } else {
    res.status(401);
    throw new Error('User Not Found');
  }
});

export { saveOrder };
