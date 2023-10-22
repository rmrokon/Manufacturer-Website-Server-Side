const mongoose = require("./mongoose");

const {MONGO_URL} = process.env;
async function connectDatabase(uri){
    const dbConnection = mongoose.connect(uri || MONGO_URL);
    return dbConnection;
}

async function closeDbConnection(){
    return mongoose.connection.close();
}

module.exports = {
    connectDatabase,
    closeDbConnection
}