import { OrderRepo } from "./repository"
import { OrderDocument } from "./types";

export const OrderService = {
    async getAll(){
        return await OrderRepo.getAll();
    },
    async addOrder(body: OrderDocument){
        return await OrderRepo.create(body);
    }
}