const userModel=require("../models/user.model") 
const bcript = require("bcrypt")
const jwt = require ("jsonwebtoken")

exports.signup = (req , res)=>{
    const passwordcript=bcript.hashSync(req.body.Password,8)
    const data = {
        firstname:req.body.Firstname,
        lastname : req.body.Lastname ,
        password:passwordcript,
        email :req.body.Email ,
        bio : req.body.Bio ,
        picture : req.body.Picture ,
        birthdate :req.body.Birthdate
    }
    const User = new userModel(data)
    User.save().then(
        (createuser)=>{
            res.status(200).json({message : "User added successfully"})
        }
    ).catch((error)=>{
        res.status(400).json({message:"User added failed "})
    })
}

exports.signin = async(req,res)=>{
    // const {email,password} = req.body ;
    const user =await  userModel.findOne({email:req.body.Email})
    if (!user){
        res.status(400).json({massage:"email invalide"})
    }
    bcript.compare( req.body.Password,user.password).then((isMatch)=>{
        if(isMatch==false){
            return res.status(400).json({message:"wrong password ..."})

        }else{
            const token = jwt.sign({data:{id:user.id ,Role:user.role }},process.env.CLE , {expiresIn : "1h"})
            return res.status(200).json({message:"success ...",token:token, user:user})


        }
    })

}
    

