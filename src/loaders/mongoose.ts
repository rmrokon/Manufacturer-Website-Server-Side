import mongoose from "mongoose";

const {MONGO_URL} = process.env;
async function connectDatabase(uri: string){
    const dbConnection = await mongoose.connect(uri || MONGO_URL!);
    return dbConnection;
}

async function closeDbConnection(){
    return mongoose.connection.close();
}

export {
    connectDatabase,
    closeDbConnection
}