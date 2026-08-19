const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {

    console.log("Middleware Started.");

    const authHeader = req.header("Authorization");

    if (!authHeader) {

        console.log("No Token Found.");

        return res.status(401).json({

            success: false,
            message: "Access Denied. No Token Provided."

        });

    }

    const token = authHeader.split(" ")[1];

    console.log("Token Received.");

    try {

        const decoded = jwt.verify(

            token,
            process.env.JWT_SECRET

        );

        console.log("Token Verified Successfully.");

        req.user = decoded;

        console.log("Calling next().");

        next();

    }

    catch (error) {

        console.log(error);

        return res.status(401).json({

            success: false,
            message: "Invalid or Expired Token."

        });

    }

};

module.exports = {

    verifyToken

};