const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const MovieList_Schema = new mongoose.Schema({
    title: {
        type: String,
        min: 1,
        max: 50,
        required: true
    },
    data:{
        type: Date,
    },
    isPremium: Boolean,
    price :{
        type: Number,
        min: 100,
        max: 999,
        required: true
    }
})

const MovieList = mongoose.model('MovieList', MovieList_Schema);

router.get('/', async (req, res) => {
    const getMovieList = await MovieList.find();
    res.send(getMovieList);
})

router.post('/', async (req, res)=>{
    let Movie_in_database = await MovieList.find(req.params.title)
    if(Movie_in_database== req.body.title) return res.send({message: "Movie already exist"})

    const newMovie = new MovieList({
        title: req.body.title,
        data: req.body.data,
        isPremium: req.body.isPremium,
        price: req.body.price
    })
    newMovie.save();
    res.send(MovieList);
})

router.put('/:name', async (req, res) => {
    let Movie_in_database = await MovieList.find(req.params.name)
    console.log(Movie_in_database)
    if(!Movie_in_database) return res.send({message: "Movie not found"})
    Movie_in_database.set({
        title: req.body.title,
        data: req.body.data,
        isPremium: req.body.isPremium,
        price: req.body.price
    })
    Movie_in_database.save();
    res.send(MovieList);
})

router.delete('/:name', async (req, res) => {
    let Movie_in_database = await MovieList.find(req.params.name)
    if(!Movie_in_database) return res.send({message: "Movie not found"})

    Movie_in_database.delete({title: req.params.title});

    res.send(MovieList);
})


module.exports = router;
