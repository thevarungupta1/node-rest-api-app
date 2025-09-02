// import
const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv')
const dbConnect = require('./config/db');
const authMiddleware = require('./middleware/auth');

// import routes
const productRoute = require('./api/routes/product.route');
const authRoute = require('./api/routes/auth.route');

// load env vars
dotenv.config({ path: './config/config.env' })

// connect to database
dbConnect();

// initializing express app
const app = express();

// middleware
app.use(express.json());

app.use('/api/v1/auth', authRoute);

app.use(authMiddleware);



// setup the endpoint
app.use('/api/v1/products', productRoute);



// setup server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server is running on ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
})