const express = require('express');
const server = express();
const mongoose = require('mongoose');
const productRouters = require('./routes/Products');
const categoriesRouters = require('./routes/Categories');
const brandsRouters = require('./routes/Brands');
const cors = require('cors');


server.use(cors({ exposedHeaders: ['Content-Range', 'X-Content-Range'] }));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use('/products', productRouters.router);
server.use('/categories', categoriesRouters.router);
server.use('/brands', brandsRouters.router);


connect();

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/BuyMyCoolStuff')
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB');
    }
}

server.get('/', (req, res) => {
    res.send('Hello World');
}
);


server.listen(8080, () => {
    console.log('Server is running on port 8080');
}
);
