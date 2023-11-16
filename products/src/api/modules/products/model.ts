import { Schema, model } from "mongoose";
import { ProductDocument } from "./types";

const ProductSchema = new Schema<ProductDocument>({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false,
    },
    min_order: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
})
// ProductSchema.index({ "$**": "text" });
export const ProductModel = model("Product", ProductSchema, "allproducts");

