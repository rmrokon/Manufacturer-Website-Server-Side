const { default: connectDatabase } = require("./mongoose");

module.exports = (function Loaders(){
    return {
        async load(config){
            return Promise.all([
                await loadDatabase(config?.mongo_uri) 
            ])
        }
    }
})();

async function loadDatabase(uri){
    try{
        const mongooseConnection = await connectDatabase(uri);
        console.log("📦 Database connected")
        return mongooseConnection;
    }catch(error){
        console.log("Database connection failed", error);
    }
}
