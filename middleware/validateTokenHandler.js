

const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1]; // Extract token

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(401); // 401 = Unauthorized
                throw new Error("User not authorized!");
            }
            req.user = decoded; // Store decoded token data in req.user
            next(); // Call next() to proceed to the next middleware/route
        });
    } else {
        res.status(401);
        throw new Error("No token provided, authorization denied!");
    }
});

module.exports = validateToken;
