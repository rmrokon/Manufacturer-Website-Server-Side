import { Request, Response } from "express"
import { ProductService } from "./service"
import { ProductDocument } from "./types";

export const ProductController = {
    async getAllProducts(req: Request, res: Response){
       const products = await ProductService.getAll();
       return products;
    },
    async addProduct(body: ProductDocument){
        return await ProductService.addProduct(body);
    }
}