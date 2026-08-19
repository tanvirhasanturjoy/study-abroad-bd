const isValidEmail = (email)=>{

const emailRegex =

/^[^\s@]+@[^\s@]+\.[^\s@]+$/;


return emailRegex.test(email);


};



const isValidPhone = (phone)=>{


const phoneRegex=/^01[3-9]\d{8}$/;


return phoneRegex.test(phone);


};





const isValidFullname = (fullname)=>{

return /^[A-Za-z ]{3,50}$/.test(fullname);

};


const isValidPassword = (password)=>{

return password.length>=8 &&
       password.length<=30;

};

module.exports={

isValidEmail,

isValidPhone,

isValidFullname,

isValidPassword

};