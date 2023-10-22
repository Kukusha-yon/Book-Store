import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";

import booksRoutes from "./routes/booksRoutes.js"
import cors from "cors";


const app = express();
//Middleware for parsing request body
app.use(express.json());

//Middleware for handling CORS POLICY
//Option 1: Allow All Orgins with default of Cors(*)
// app.use(cors());
//option 2 Allow Custom Orgins
app.use(
    cors({
    origin:'http://localhost:3000',
    methods:['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'], 
   })
);

app.get('/', (request, response)=>{
    console.log(request)
    return response.status(234).send("Welcome to my home page !")
});

app.use('/books', booksRoutes);

mongoose
 .connect(mongoDBURL)
 .then(()=>{
    console.log('App connected to database..')
    app.listen(PORT,  ()=>{
        console.log(`App is listening to port: ${PORT}`);
    })
 })
 .catch((error)=>{
    console.log(error);

 })





