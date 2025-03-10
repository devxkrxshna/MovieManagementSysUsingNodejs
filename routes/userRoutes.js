const express = require("express")

const router = express.Router();
const validateToken = require("../middleware/validateTokenHandler")
const {registerUser,loginUser,currentUser} = require("../controllers/userController")


router.post("/register", registerUser);

router.post("/login", loginUser);

// router.post("/login", (req,res)=>{
//     res.json({message: "Login user"});
// });

router.get("/current",validateToken,currentUser );
module.exports = router;