import mongoose from "mongoose";

export class MongoDBClient {
    static async connect() {
        try {
            const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/GD1C2026';
            
            await mongoose.connect(connectionString, {
                dbName: process.env.MONGODB_NAME || 'GD1C2026'
            });
            
            console.log("✅ Servidor conectado a MongoDB con éxito.");
        } catch (error) {
            console.error(`❌ Error en Express conectando a Mongo: ${error.message}`);
            process.exit(1);
        }
    }
}