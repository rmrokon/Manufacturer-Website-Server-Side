import { OrderModel } from "./model"
import { OrderDocument } from "./types";

export const OrderRepo = {
    async getAll(){
        try {
            const docs = await OrderModel.find({});
            return docs;
          } catch (error) {
            console.error('Error fetching Users:', error); 
            throw error;
          }
    },
    async create(body: OrderDocument){
        return await OrderModel.create(body);
    }
}