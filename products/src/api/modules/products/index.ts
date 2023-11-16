import { Router } from "express";
import { ProductController } from "./controller";

export const productsRouter = Router();

productsRouter
.route("/")
.get(async(req, res)=>{
    try{
        const products = await ProductController.getAllProducts(req, res);
        res.send({data: products});
    }catch(err){
        console.log(err);
        res.send(err);
    }
})
.post(async(req, res)=>{
    try{
        const product = await ProductController.addProduct(req.body);
        res.send(product);
    }catch(err){
        console.log(err);
        res.send(err);
    }
})