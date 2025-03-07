const mongoose = require("mongoose");

//mongoose object for objectdata modelling
const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add the movie name"],
        trim: true
    },
    genre: {
        type: String,
        required: [true, "Please specify the genre"],
        enum: ["Action", "Comedy", "Drama", "Horror", "Sci-Fi", "Thriller", "Romance", "Adventure"], // Example genres
        trim: true
    },
    rating: {
        type: Number,
        min: [1, "Rating must be at least 1"],
        max: [5, "Rating must be at most 5"],
        required: true
    },
    // ratings: [
    //     {
    //         user: {
    //             type: mongoose.Schema.Types.ObjectId,
    //             ref: "User", // Assuming you have a User model
    //             required: true
    //         },
    //         rating: {
    //             type: Number,
    //             min: [1, "Rating must be at least 1"],
    //             max: [5, "Rating must be at most 5"],
    //             required: true
    //         }
    //     }
    // ],
}, { timestamps: true });

// // Virtual field to calculate average rating
// movieSchema.virtual("averageRating").get(function () {
//     if (this.ratings.length === 0) return 0;
//     const sum = this.ratings.reduce((total, r) => total + r.rating, 0);
//     return (sum / this.ratings.length).toFixed(1);
// });

// // Enable virtuals when converting to JSON
// movieSchema.set("toJSON", { virtuals: true });
// movieSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("Movie", movieSchema);
