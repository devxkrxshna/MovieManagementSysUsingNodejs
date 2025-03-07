const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const dotenv= require("dotenv").config();
const app = express();
const port = process.env.PORT||  5000;

connectDb(); //connecting to the db

app.use(express.json());

app.use("/api/movies", require("./routes/movieRoutes")); // middleware for api path
app.use("/api/users", require("./routes/userRoutes")); // middle ware for authenticating and managing users
app.use(errorHandler); // middleware


app.listen(port,()=>{
    console.log(`server running on port ${port}`)
})
