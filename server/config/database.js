import mongoose from "mongoose";

export class MongoDBClient{
    static async connect(){
        try {
            const conn = await mongoose.connect(process.env.MONGODB_URI, {
                dbName: process.env.MONGODB_NAME || 'GD1C2026',
                authSource: 'admin'
            });
        } catch (error) {
            console.error(`Error: ${error.message}`)
            process.exit(1)
        }
    }
}