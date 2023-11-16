import { ProductModel } from "./model"
import { ProductDocument } from "./types";

export const ProductRepo = {
    async getAll(){
        try {
            const docs = await ProductModel.find({});
            return docs;
          } catch (error) {
            console.error('Error fetching products:', error); 
            throw error;
          }
    },
    async addProduct(body: ProductDocument){
        return await ProductModel.create(body);
    }
}