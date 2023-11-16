import { UserModel } from "./model"
import { UserDocument } from "./types";

export const UserRepo = {
    async getAll(){
        try {
            const docs = await UserModel.find({});
            return docs;
          } catch (error) {
            console.error('Error fetching Users:', error); 
            throw error;
          }
    },
    async create(body: UserDocument){
        return await UserModel.create(body);
    }
}