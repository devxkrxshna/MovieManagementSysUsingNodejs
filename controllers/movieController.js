//this cotroller controls all our logic to the request connction to database 
 
const asyncHandler = require("express-async-handler");
const Moviedb = require("../models/movieModel");

 
 //@description: GET all contacts
 //@route GET /api/contacts
 // @access public

 const getMovies = asyncHandler(async(req,res)=>{ //async is used because mongo db returns a promise
    const movies = await Moviedb.find(); //database 
    if (movies.length === 0) {
        res.status(404);
        throw new Error("No movies available");
    }
    res.status(200).json(movies);
 
});


 //@description: POST contact
 //@route POST /api/contacts
 // @access Private

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
 // @access Private

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
 // @access Private
 
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
 // @access Private

const deleteMovie = asyncHandler(async(req,res)=>{
    const movierecord = await Moviedb.findById(req.params.id)
    if(!movierecord){
        res.status(404);
        throw new Error("Movie not found")
    }
    await movierecord.deleteOne(); // since movierecord is already found

    // or->  await Moviedb.findByIdAndDelete(req.params.id);

    res.status(200).json(movierecord);
});

// @description: Get the average rating of a movie by name
// @route GET /api/movies/rating?name=MovieName
// @access Public

const getMovieAverageRating = asyncHandler(async (req, res) => {
    const { name } = req.query; // Extract movie name from query parameters
    if (!name) {
        res.status(400);
        throw new Error("Movie name is required");
    }
    // Find all movie records with the specified name
    const movies = await Moviedb.find({ name });
    if (movies.length === 0) {
        res.status(404);
        throw new Error("Movie not found");
    }
    // Calculate the average rating
    const totalRatings = movies.reduce((sum, movie) => sum + movie.rating, 0);
    const averageRating = (totalRatings / movies.length).toFixed(1); // Round to 1 decimal place

    res.status(200).json({
        name,
        totalRatings: movies.length,
        averageRating
    });
});

// @description: Get movies filtered by name, rating, or genre
// @route GET /api/movies/search?name=MovieName&rating=4&genre=Action
// @access Public
const getMoviesByFilters = asyncHandler(async (req, res) => {
    const { name, rating, genre } = req.query;
    let query = {}; // Initialize an empty query object

    if (name) query.name = name;
    if (rating) query.rating = rating;
    if (genre) query.genre = genre;

    const movies = await Moviedb.find(query); // Fetch filtered movies

    if (movies.length === 0) {
        return res.status(404).json({ message: "No movies found matching the criteria." });
    }

    res.status(200).json(movies);
});


module.exports= {
    getMovies, 
    createMovie,
    getMovie,
    updateMovie,
    deleteMovie,
    getMovieAverageRating,
    getMoviesByFilters
}