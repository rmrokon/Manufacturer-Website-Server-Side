import { Request, Response } from "express"
import { UserService } from "./service"
import { UserDocument } from "./types";

export const UserController = {
    async getAllUsers(req: Request, res: Response){
       const users = await UserService.getAll();
       return users;
    },
    async createUser(body: UserDocument){
        return await UserService.addProduct(body);
    }
}