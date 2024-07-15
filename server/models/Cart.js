import mongoose from "mongoose";
import Product from "./Product.js";
import User from "./User.js";

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  items:[
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Product,
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;