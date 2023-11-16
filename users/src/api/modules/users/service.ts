import { UserRepo } from "./repository"
import { UserDocument } from "./types";

export const UserService = {
    async getAll(){
        return await UserRepo.getAll();
    },
    async addProduct(body: UserDocument){
        return await UserRepo.create(body);
    }
}