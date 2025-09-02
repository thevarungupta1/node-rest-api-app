const mongoose = require('mongoose');

const dbConnect = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline.bold);
    } catch (err) {
        console.log(err)
    }
};
module.exports = dbConnect;
