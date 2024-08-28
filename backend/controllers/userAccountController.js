const userAccount_model = require("../models/userAccountModel")
const bcrypt = require("bcrypt")

const getUserAccount = async(req,res)=>{
     
}

const getSingleUserAccount = async(req,res)=>{

}


// @Request   POST
// @Route     /api/userAccount/

const createUserAccount = async(req,res)=>{
    console.log("req.file contains" , req.file)
    console.log("req.file contains buffer" , req.file.buffer)
   try {
    const {username,useremail,userpassword,userrole} = req.body;


    // Regular expressions for validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[A-Za-z\s]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // Validation checks
    const nameCheck = nameRegex.test(username);
    const emailCheck = emailRegex.test(useremail);
    const passwordCheck = passwordRegex.test(userpassword);
      
    if(!nameCheck)
    {
        res.status(400).json({msg: "Invalid username. Only letters and spaces are allowed." }) 
    }
    if(!emailCheck)
    {
        res.status(400).json({msg: "Invalid email address."}) 
    }
    if(!passwordCheck)
        {
        res.status(400).json({msg:"Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character."}) 
        }
        
    // checking user exist if exist than passing a ERROR in json
    const CheckUserExistance =await userAccount_model.findOne({useremail});
    if(CheckUserExistance) return res.status(400).json({msg:"Email already exist's!"});

    // hashing the password using bcrypt
    const saltRound = await bcrypt.genSalt(10);
    const hash_Password = await bcrypt.hash(userpassword,saltRound);

    // creating the user
    const createUser = await userAccount_model.create({username,useremail,userpassword:hash_Password,userrole,userimage:req.file.buffer})

    
   } catch (err) {
        res.status(400).json({msg:"user Registration failed",error:err.message});
   }
}

const updateUserAccount = async(req,res)=>{

}

const deleteUserAccount = async(req,res)=>{

}

module.exports = {
    getSingleUserAccount,
    getUserAccount,
    createUserAccount,
    updateUserAccount,
    deleteUserAccount   
}