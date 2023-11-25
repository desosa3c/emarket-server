import fs from 'fs';
import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import { getDefaultCart, getProductComents, getProductDetail } from './services/products.js';
import { getAllCategories, getProductsByCategory } from './services/categories.js';
import { addUser, loginUser } from './services/users.js';
import { verifyToken } from './middlewares/verifyToken.js';

// const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;

app.use(cors())

//endpoints.
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5504');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


app.use(bodyParser.json());


app.get('/cats', (req, res) => {
    res.send(getAllCategories());
});

app.get('/cats/:catID', (req, res) => {
    const catID = parseInt(req.params.catID);
    res.send(getProductsByCategory(catID));
});


app.get('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const product = (getProductDetail(id));
    res.send(product);
});

app.get('/product_comments/:productID', (req, res) => {
    const id = parseInt(req.params.productID);
    const product_comments = (getProductComents(id));
    res.send(product_comments);
});

app.get('/user_cart', verifyToken, (req, res) => {
    const id = req.body.decoded.userId;
    const user_cart = (getDefaultCart(id));
    res.send(user_cart);
});

app.post('/register', async (req, res) => {
    const { username, password } = req.body
    const user = await addUser(username, password)
    res.send(user)
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body
    const response = await loginUser(email, password)
    res.send(response)
})


app.listen(port, () => {
    console.log('Servidor funcionando.');
});

