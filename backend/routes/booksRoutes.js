import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();


//Route for save a new Book

router.post('/', async(request, response) =>{
    try {
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.year
        ){
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear'
            })
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            year: request.body.year,
        };
        const book = await Book.create(newBook);
        return response.status(201).send(book);

    }catch(error){
        console.log(error.message)
        response.status(500).send({message: error.message})
    }

})

// Route for Get All Books from database

router.get('/', async(request,response)=>{
    try { 
        const books = await Book.find({})

        return response.status(200).json({
            count: books.length,
            data: books
        })

    }catch(error){
        console.log(error.message)
        response.status(500).send({message: error.message});
    }
})

// Route for get one book

router.get('/:id', async(request,response)=>{
    try { 
        const {id} = request.params
        const books = await Book.findById(id)

        return response.status(200).json(books)

    }catch(error){
        console.log(error.message)
        response.status(500).send({message: error.message});
    }
})

//Route for update

router.put('/:id', async(request,response)=>{
    try {
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.year
        ){
            return response.status(400).send({
                message: 'Send all required fields: title, author, year',
            });
        }
        const {id} = request.params;
        const result = await Book.findByIdAndUpdate(id, request.body);
        if(!result){
            return response.status(404).json({ message: 'Book not found '});
        }
        return response.status(200).send({message: 'Book updated succesfully'});
    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});
//Route for delete



router.delete('/:id', async(request,response)=>{
    try {
        const {id} = request.params;

        const result = await Book.findByIdAndDelete(id);
        if(!result){
            return response.status(404).json({ message: 'Book not found '});
        }
        return response.status(200).send({message: 'Book updated succesfully'});

    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

export default router;