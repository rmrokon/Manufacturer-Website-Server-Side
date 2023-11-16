import { Schema, model } from "mongoose";
import { OrderDocument } from "./types";

const OrderSchema = new Schema<OrderDocument>({
   total: {
    type: Number,
    required: true
   },
   paid: {
    type: Boolean,
    required: true
   },
   phone: {
    type: Number,
    required: false
   },
   quantity: {
    type: Number,
    required: true
   },
   shipped: {
    type: Boolean,
    required: true,
    default: false
   },
   products: [
    {
        _id: {type: String, required: true},
        name: {type: String, required: true},
        price: {type: Number, required: true},
        image: {type: String, required: false},
        quantity: {type: Number, required: true},
        min_order: {type: Number, required: true},
        description: {type: String, required: false},
    }
   ],
   email: {
    type: String,
    required: true
   }
})
// ProductSchema.index({ "$**": "text" });
export const OrderModel = model("Order", OrderSchema, "order");

