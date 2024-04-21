const User = require('../Models/User');
const bcrypt = require('bcrypt');
const jwtUtil=require('../util/jwt');

exports.signup=async(req,res,next)=>{
    const {userName,email,password}=req.body;
    try{
        const existing=await User.findOne({email});
        if(existing){
            return res.status(409).send('User already exists');
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const user=await User.create({name:userName,email,password:hashedPassword});
        return res.status(200).json('User account created succesfully');
    }
    catch(e){
        console.log(e);
        return res.status(500).json('Internal Server issue');
    }
}

exports.login=async(req,res,next)=>{
    const {email,password}=req.body;
    try{
        const user=await User.findOne({where:{email}});
        if(!user)return res.status(404).json({ message: 'User not found' });

        const check=await bcrypt.compare(password,user.password);

        if(!check) return res.status(401).json({ message: `Incorrect password` })

        const token=jwtUtil.generateToken({id:user.id});

        return res.status(201).json({ token,message: "User logged in Successfully" });

    }
    catch(e){
        console.log(e);
        res.status(500).json('Something went wrong');
    }
}