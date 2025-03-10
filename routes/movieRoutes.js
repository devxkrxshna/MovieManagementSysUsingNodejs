const express = require("express");
const router = express.Router();

const { 
    getMovies,
     createMovie,
     getMovie,
     updateMovie,
     deleteMovie,
     getMovieAverageRating,
     getMoviesByFilters
    } = require("../controllers/movieController");
const validateToken = require("../middleware/validateTokenHandler");


// router.use(validateToken);
router.route("/rating").get(getMovieAverageRating);
router.route("/search").get(getMoviesByFilters);
router.route("/").get(getMovies).post(validateToken,createMovie);
router.route("/:id").get(getMovie).put(validateToken,updateMovie).delete(validateToken,deleteMovie);

module.exports = router;