const pool = require("../database/connection");


const checkEmailExists = (email) => {

    return new Promise((resolve,reject)=>{

        pool.query(

            "SELECT * FROM users WHERE email=?",

            [email],

            (error,result)=>{

                if(error){

                    reject(error);

                }

                else{

                    resolve(result);

                }

            }

        );

    });

};



const checkPhoneExists = (phone)=>{


    return new Promise((resolve,reject)=>{


        pool.query(

            "SELECT * FROM users WHERE phone=?",

            [phone],

            (error,result)=>{


                if(error){

                    reject(error);

                }

                else{

                    resolve(result);

                }


            }

        );


    });


};



const saveOTP = (email,otp,expiresAt)=>{


return new Promise((resolve,reject)=>{


pool.query(

`INSERT INTO otp
(email,otp,expires_at)

VALUES(?,?,?)`,

[email,otp,expiresAt],

(error,result)=>{


if(error){

reject(error);

}

else{

resolve(result);

}


}


);


});


};

const getOTPByEmail = (email)=>{

    return new Promise((resolve,reject)=>{

        pool.query(

            `SELECT *
FROM otp
WHERE email=?
ORDER BY id DESC
LIMIT 1`,

            [email],

            (error,result)=>{

                if(error){

                    reject(error);

                }

                else{

                    resolve(result);

                }

            }

        );

    });

};

const deleteOTP = (email)=>{

    return new Promise((resolve,reject)=>{

        pool.query(

            "DELETE FROM otp WHERE email=?",

            [email],

            (error,result)=>{

                if(error){

                    reject(error);

                }

                else{

                    resolve(result);

                }

            }

        );



    });

};

const saveUser = (

fullname,
email,
phone,
password

)=>{

return new Promise((resolve,reject)=>{

pool.query(

`INSERT INTO users(

fullname,
email,
phone,
password,
is_verified,
profile_completed

)

VALUES(?,?,?,?,?,?)`,

[
fullname,
email,
phone,
password,
1,
0
],

(error,result)=>{

if(error){

reject(error);

}

else{

resolve(result);

}

}

);

});

};

const getUserByEmail = (email)=>{

return new Promise((resolve,reject)=>{

pool.query(

"SELECT * FROM users WHERE email=?",

[email],

(error,result)=>{

if(error){

reject(error);

}

else{

resolve(result);

}

}

);

});

};

const getUserById = (id) => {

  return new Promise((resolve, reject) => {

    pool.query(

      "SELECT id, fullname, email, phone, is_verified, profile_completed FROM users WHERE id=?",

      [id],

      (error, result) => {

        if (error) {

          reject(error);

        }

        else {

          resolve(result);

        }

      }

    );

  });

};

module.exports={

checkEmailExists,

checkPhoneExists,

saveOTP,

getOTPByEmail,

deleteOTP,

saveUser,

getUserByEmail,

getUserById

};