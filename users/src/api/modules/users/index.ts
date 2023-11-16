import { Router } from "express";
import { UserController } from "./controller";

export const userRouter = Router();

userRouter
.route("/")
.get(async(req, res)=>{
    try{
        const users = await UserController.getAllUsers(req, res);
        res.send({data: users});
    }catch(err){
        console.log(err);
        res.send(err);
    }
})
.post(async(req, res)=>{
    try{
        const user = await UserController.createUser(req.body);
        res.send(user);
    }catch(err){
        console.log(err);
        res.send(err);
    }
})