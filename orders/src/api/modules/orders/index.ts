import { Router } from "express";
import { OrderController } from "./controller";

export const orderRouter = Router();

orderRouter
.route("/")
.get(async(req, res)=>{
    try{
        const users = await OrderController.getAllOrders(req, res);
        res.send({data: users});
    }catch(err){
        console.log(err);
        res.send(err);
    }
})
.post(async(req, res)=>{
    try{
        const user = await OrderController.createOrder(req.body);
        res.send(user);
    }catch(err){
        res.send(err);
    }
})