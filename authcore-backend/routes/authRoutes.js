const express = require("express");

const router = express.Router();

const {

    sendOTPController,
    verifyOTPController,
    registerController,
    loginController,
    meController

} = require("../controllers/authController");

const {

    verifyToken

} = require("../middleware/authMiddleware");


router.get("/", (req, res) => {

    res.send("Auth Route Working Successfully.");

});


router.post(

    "/send-otp",

    sendOTPController

);


router.post(

    "/verify-otp",

    verifyOTPController

);


router.post(

    "/register",

    registerController

);


router.post(

    "/login",

    loginController

);


router.get(

    "/protected",

    verifyToken,

    (req, res) => {

        return res.status(200).json({

            success: true,

            message: "Protected Route Accessed Successfully."

        });

    }

);


router.get(

    "/me",

    verifyToken,

    meController

);


module.exports = router;