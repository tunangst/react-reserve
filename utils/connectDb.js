import mongoose from 'mongoose';

const connection = {};

const connectDb = async () => {
    if (connection.isConnected) {
        //use existing db connection
    }
    //use new db connection
    const db = await mongoose.connect(process.env.MONGO_SRV, {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    connection.isConnected = db.connections[0].readyState;
};

export default connectDb;
