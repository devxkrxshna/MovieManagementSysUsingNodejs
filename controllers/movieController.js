//this cotroller controls all our logic to the request connction to database 
 
const asyncHandler = require("express-async-handler");
const Moviedb = require("../models/movieModel");

 
 //@description: GET all contacts
 //@route GET /api/contacts
 // @access public

 const getMovies = asyncHandler(async(req,res)=>{ //async is used because mongo db returns a promise
    const movies = await Moviedb.find(); //database 
    res.status(200).json(movies)
});


 //@description: POST contact
 //@route POST /api/contacts
 // @access public

const  createMovie = asyncHandler(async(req,res)=>{
    console.log(req.body);
    const {name, genre, rating}= req.body;
    if(!name || !genre || !rating){
        res.status(400);
        throw new Error("All fields are mandatory !");
    }
    const movierecord = await Moviedb.create({  //adding record to the data base
        name, 
        genre,
        rating
    });
    res.status(201).json(movierecord);
});


 //@description: GET contact
 //@route GET /api/contacts/:id
 // @access public

const getMovie = asyncHandler(async(req,res)=>{
    const movierecord = await Moviedb.findById(req.params.id)
    if(!movierecord){
        res.status(404);
        throw new Error("Movie not found")
    }
    res.status(200).json(movierecord);
});

 //@description: PUT contact
 //@route PUT /api/contacts/:id
 // @access public
 
const updateMovie= asyncHandler(async(req,res)=>{
    const movierecord = await Moviedb.findById(req.params.id)
    if(!movierecord){
        res.status(404);
        throw new Error("Movie not found")
    }
    const updatedMovie = await Moviedb.findByIdAndUpdate(
        req.params.id,  // id of which the record that is to be updated 
        req.body, // body which we are going to update with
        {new:true} //some query
        
        );

        res.status(200).json(updatedMovie);
});

 //@description: DELETE contact
 //@route DELETE /api/contacts/:id
 // @access public

const deleteMovie = asyncHandler(async(req,res)=>{
    const movierecord = await Moviedb.findById(req.params.id)
    if(!movierecord){
        res.status(404);
        throw new Error("Movie not found")
    }
    await movierecord.deleteOne(); // since movierecord is already found

    res.status(200).json(movierecord);
});


module.exports= {
    getMovies, 
    createMovie,
    getMovie,
    updateMovie,
    deleteMovie
}