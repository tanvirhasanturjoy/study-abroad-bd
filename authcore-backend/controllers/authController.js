const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const generateOTP = require("../utils/generateOTP");

const sendOTP = require("../services/sendOTP");

const{

checkEmailExists,
checkPhoneExists,
saveOTP,
getOTPByEmail,
deleteOTP,
saveUser,
getUserByEmail,
getUserById

}=require("../services/authService");

const{

isValidEmail,

isValidPhone,

isValidFullname,

isValidPassword

}=require("../validators/authValidator");


//===================================================
// SEND OTP CONTROLLER
//===================================================

const sendOTPController = async (req, res) => {

    try {

        const {
            email,
            phone
        } = req.body;


        // Check if all fields are provided
        if (!email || !phone) {

            return res.status(400).json({

                success: false,
                message: "All fields are required."

            });

        }


        // Validate Email
        if (!isValidEmail(email)) {

            return res.status(400).json({

                success: false,
                message: "Invalid Email."

            });

        }


        // Validate Phone Number
        if (!isValidPhone(phone)) {

            return res.status(400).json({

                success: false,
                message: "Invalid Phone Number."

            });

        }


        // Check whether email already exists
        const emailExists = await checkEmailExists(email);

        if (emailExists.length > 0) {

            return res.status(400).json({

                success: false,
                message: "Email already exists."

            });

        }


        // Check whether phone number already exists
        const phoneExists = await checkPhoneExists(phone);

        if (phoneExists.length > 0) {

            return res.status(400).json({

                success: false,
                message: "Phone Number already exists."

            });

        }


        // Generate OTP
        const otp = generateOTP();


        // Set OTP expiration time (5 Minutes)
        const expiresAt = new Date(

            Date.now() + 5 * 60 * 1000

        );


        // Save OTP to Database
        await saveOTP(

            email,
            otp,
            expiresAt

        );


        // Send OTP through Email
        const emailSent = await sendOTP(

            email,
            otp

        );


        if (!emailSent) {

            return res.status(500).json({

                success: false,
                message: "Failed to send OTP."

            });

        }


        return res.status(200).json({

            success: true,
            message: "OTP Sent Successfully."

        });

    }

    catch (error) {

        console.log(error);

        return res.status(500).json({

            success: false,
            message: "Internal Server Error."

        });

    }

};


//===================================================
// VERIFY OTP CONTROLLER
//===================================================

const verifyOTPController = async (req, res) => {

    try {

        const {
            email,
            otp
        } = req.body;


        // Check whether email and otp are provided
        if (!email || !otp) {

            return res.status(400).json({

                success: false,
                message: "Email and OTP are required."

            });

        }

        const otpData = await getOTPByEmail(email);
        if(otpData.length===0){

return res.status(404).json({

success:false,

message:"OTP Record Not Found."

});

}

const otpRecord = otpData[0];
const currentTime = new Date();
if(currentTime > otpRecord.expires_at){

return res.status(400).json({

success:false,

message:"OTP has expired."

});

}

if(String(otp)!==String(otpRecord.otp)){

return res.status(400).json({

success:false,

message:"Invalid OTP."

});

}

await deleteOTP(email);

       return res.status(200).json({

success:true,

message:"OTP Verified Successfully."

});

    }

    catch (error) {

        return res.status(500).json({

            success: false,
            message: "Something Went Wrong.",
            error: error.message

        });

    }

};

const registerController = async (req,res)=>{

    try{

       const{

fullname,
email,
phone,
password

}=req.body;

if(

!fullname ||
!email ||
!phone ||
!password

){

return res.status(400).json({

success:false,

message:"All fields are required."

});

}

if(!isValidFullname(fullname)){

return res.status(400).json({

success:false,

message:"Invalid Full Name."

});

}

if(!isValidEmail(email)){

return res.status(400).json({

success:false,

message:"Invalid Email."

});

}

if(!isValidPhone(phone)){

return res.status(400).json({

success:false,

message:"Invalid Phone Number."

});

}

if(!isValidPassword(password)){

return res.status(400).json({

success:false,

message:"Invalid Password."

});

}

const emailExists =

await checkEmailExists(email);

if(emailExists.length>0){

return res.status(400).json({

success:false,

message:"Email already exists."

});

}

const phoneExists =

await checkPhoneExists(phone);

if(phoneExists.length>0){

return res.status(400).json({

success:false,

message:"Phone Number already exists."

});

}

const hashedPassword = await bcrypt.hash(

password,

10

);

await saveUser(

fullname,
email,
phone,
hashedPassword

);

return res.status(201).json({

success:true,

message:"Registration Successful."

});


    }

    catch(error){

        return res.status(500).json({

            success:false,

            message:"Something Went Wrong.",

            error:error.message

        });

    }

};

const loginController = async(req,res)=>{

try{

const{

email,
password

}=req.body;

if(!email || !password){

return res.status(400).json({

success:false,

message:"Email and Password are required."

});

}

const user = await getUserByEmail(

email

);

if(user.length===0){

return res.status(404).json({

success:false,

message:"User does not exist."

});

}

const userData = user[0];

const passwordMatched = await bcrypt.compare(

password,

userData.password

);

if(!passwordMatched){

return res.status(400).json({

success:false,

message:"Invalid Password."

});

}

const token = jwt.sign(

{

id:userData.id,
email:userData.email

},

process.env.JWT_SECRET,

{

expiresIn:"7d"

}

);

return res.status(200).json({

success:true,

message:"Login Successful.",

token

});

}

catch(error){

return res.status(500).json({

success:false,

message:"Something Went Wrong.",

error:error.message

});

}

};

//===================================================
// GET CURRENT USER (ME) CONTROLLER
//===================================================

const meController = async (req, res) => {

  try {

    const user = await getUserById(req.user.id);

    if (user.length === 0) {

      return res.status(404).json({

        success: false,
        message: "User not found."

      });

    }

    return res.status(200).json({

      success: true,
      user: user[0]

    });

  }

  catch (error) {

    return res.status(500).json({

      success: false,
      message: "Something Went Wrong.",
      error: error.message

    });

  }

};

module.exports={

sendOTPController,

verifyOTPController,

registerController,

loginController,

meController

};