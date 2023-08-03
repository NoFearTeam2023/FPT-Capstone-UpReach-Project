const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const {v4 : uuidv4} = require("uuid")

const router = express.Router();

async function insertProfilesClient(req,res,next){
    try{
        const{} = req.body
        
    }catch (err){
        res.json({status : 'False', message: "Lỗi ", err });
    }

}