const Cryptr = require('cryptr');
const cryptr = new Cryptr('varshakumawat1995');

const jwt = require('jsonwebtoken');
const secertKey = "varsha@gmail.com";





const createToken = (data) => {
    const token = jwt.sign(data.toJSON(), secertKey);
        
   
    return token;
}



const verifyToken = (token) => {
    try {
        const admin = jwt.verify(token, secertKey);
        return admin;
    } catch {
        return undefined;
    }
    // return tokens.get(token);
}

const generateFileName = (file_name) => {
    return Math.floor(Math.random() * 10000) + new Date().getTime() + file_name
} 


const encodePassword = (password) => {
    return cryptr.encrypt(password);
}

const decodePassword = (encoded_password) => {
    return cryptr.decrypt(encoded_password)
}

encodePassword, decodePassword,
module.exports = {  encodePassword, decodePassword, verifyToken, createToken, generateFileName };