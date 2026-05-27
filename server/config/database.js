import mongoose from "mongoose";

export class MongoDBClient{
    static async connect(){
        try {
            const conn = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.MONGODB_NAME}?authSource=admin`)    
        } catch (error) {
            console.error(`Error: ${error.message}`)
            process.exit(1)
        }
    }
}