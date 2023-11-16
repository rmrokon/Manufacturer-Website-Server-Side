import { Schema, model } from "mongoose";
import { UserDocument } from "./types";

const UserSchema = new Schema<UserDocument>({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    }
})
// ProductSchema.index({ "$**": "text" });
export const UserModel = model("User", UserSchema, "users");

