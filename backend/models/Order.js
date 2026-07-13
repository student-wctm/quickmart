import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const orderSchema = new mongoose.Schema(
  {
    user: {
      name: {
        type: String,
        required: [true, 'User name is required'],
      },
      email: {
        type: String,
        required: [true, 'Email is required'],
      },
      phone: {
        type: String,
        required: [true, 'Phone number is required'],
      },
      address: {
        street: String,
        city: String,
        state: String,
        pincode: String,
      },
    },
    orderItems: [orderItemSchema],
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    deliveryFee: {
      type: Number,
      default: 0.0,
    },
    finalAmount: {
      type: Number,
      required: true,
      default: 0.0,
    },
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Processing', 'Out for Delivery', 'Delivered', 'Cancelled'],
      default: 'Pending',
    },
    paymentMethod: {
      type: String,
      enum: ['Cash on Delivery', 'Online Payment'],
      default: 'Cash on Delivery',
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    paymentDetails: {
      razorpay_order_id: String,
      razorpay_payment_id: String,
      razorpay_signature: String,
    },
    isDelivered: {
      type: Boolean,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
