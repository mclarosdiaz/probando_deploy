import mongoose from "mongoose";

// tests/helpers/database.js
export async function clearDatabase() {
    const collections = mongoose.connection.collections;

    for (const collection of Object.values(collections)) {
        await collection.deleteMany({});
    }
}