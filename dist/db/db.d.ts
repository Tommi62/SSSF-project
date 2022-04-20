import mongoose from 'mongoose';
declare const connectMongo: () => Promise<typeof mongoose | undefined>;
export default connectMongo;
