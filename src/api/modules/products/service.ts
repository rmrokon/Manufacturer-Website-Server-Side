import { ProductRepo } from "./repository"
import { ProductDocument } from "./types";

export const ProductService = {
    async getAll(){
        return await ProductRepo.getAll();
    },
    async addProduct(body: ProductDocument){
        return await ProductRepo.addProduct(body);
    }
}