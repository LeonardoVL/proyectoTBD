import mongoose from 'mongoose';
import { MONGODB_URI } from '../config.js';

const connectToDatabase = async () => {
    await mongoose.connect(
		MONGODB_URI
	)
	.then(() => {
		console.log("🟢 MongoDB Connected...");
	})
	.catch((err) => {
		console.log("🔴 Can't connect to MongoDB: " + err);
	});
};

export default connectToDatabase;
