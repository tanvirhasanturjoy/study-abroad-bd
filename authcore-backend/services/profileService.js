const pool = require("../database/connection");

const createProfile = (

    user_id,
    profile_type,
    profile_picture,
    id_number,
    department,
    institution,
    cgpa,
    semester,
    graduation_year,
    address,
    bio

)=>{

    return new Promise((resolve,reject)=>{

        pool.query(

            `INSERT INTO profiles(

            user_id,
            profile_type,
            profile_picture,
            id_number,
            department,
            institution,
            cgpa,
            semester,
            graduation_year,
            address,
            bio

            )

            VALUES(?,?,?,?,?,?,?,?,?,?,?)`,

            [

                user_id,
                profile_type,
                profile_picture,
                id_number,
                department,
                institution,
                cgpa,
                semester,
                graduation_year,
                address,
                bio

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
const getProfileByUserID = (user_id)=>{

    return new Promise((resolve,reject)=>{

        pool.query(

            "SELECT * FROM profiles WHERE user_id=?",

            [user_id],

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
module.exports = {

    createProfile,

    getProfileByUserID

};