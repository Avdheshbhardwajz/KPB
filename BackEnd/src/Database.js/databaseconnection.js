import mongoose from 'mongoose';

const connectDB = async ()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/KPB`);
        console.log(`\n MongoDB connected !! DB HOST : ${connectionInstance.connection.host}`);
        // console.log(connectionInstance)
    } catch (error) {
        console.log("MONGODB CONNECTION ERROR" , error)
        process.exit(1);
    }
}

export default connectDB