import express, { Router } from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './router/index';

require('dotenv').config();

const port = process.env.PORT;
const MONGO_URL = `${process.env.MONGO_URL}`;


const app = express();

app.use(cors({
    credentials: true
}));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(compression());

const server = http.createServer(app);



server.listen(8080, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});



mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

app.use('/',router())