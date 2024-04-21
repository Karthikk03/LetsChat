const jwt=require('jsonwebtoken');
require('dotenv').config();
const secretKey=process.env.T_SECRET;

const generateToken=(data)=>{
    return jwt.sign(data,secretKey);
}

const verifyToken=(token)=>{
    try{
        return jwt.verify(token,secretKey);
    }
    catch(e){
        return null;
    }
}

module.exports = {
    generateToken,
    verifyToken
};