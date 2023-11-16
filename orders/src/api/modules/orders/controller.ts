import { Request, Response } from "express"
import { OrderService } from "./service"
import { OrderDocument } from "./types";

export const OrderController = {
    async getAllOrders(req: Request, res: Response){
       const users = await OrderService.getAll();
       return users;
    },
    async createOrder(body: OrderDocument){
        return await OrderService.addOrder(body);
    }
}