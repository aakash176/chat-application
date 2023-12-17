const express = require('express')
const User = require('../model/userModel')
const generateToken = require('../token/generateToken')
const bcrypt = require('bcryptjs')
const registerUser = async(req,res) => {
    console.log(req.body);
    const {email, name, password, pic} = req.body
    if(!email || !name || !password){
        res.status(400)
        throw new Error("Please enter required field!");
    }
    const existUser = await User.findOne({email})
    if(existUser){
        res.status(400)
        throw new Error("User already exists")
    }
    else{
        const salt = await bcrypt.genSalt(10)
        const newPassword = await bcrypt.hash(password, salt)
        const user = await User.create({
          name,
          email,
          password: newPassword,
          pic,
        });
        if(user){
            res.status(201).json({
                id:user._id,
                name:user.name,
                email: user.email,
                token: generateToken(user._id)
            })
        }
    }
}

const authUser = async(req,res) => {
    try{
        const {email, password} = req.body
        const user = await User.findOne({email})
        if(!user){
            res.status(400).json({message:"Invalid email or password"})
        }
        if(user && (await bcrypt.compare(password, user.password))){
            res.status(200).json({
                id:user._id,
                email:user.email,
                name:user.name,
                image:user.pic,
                token:generateToken(user._id)

            })
        }
        else{
            res.status(401).send("Invalid email or password!")
        }
    }
    catch(err){
        res.send(err)
    }
    
}

const allUsers = async(req,res) => {
    const keyword = req.query.search ? {
        $or: [
            {name: {$regex:req.query.search, $options:"i"}},
            {email: {$regex:req.query.search, $options:"i"}}
        ]
    }:{}
    const users = await User.find(keyword).find({email:{$ne:req.user.email}})
    console.log(users);
    res.send(users)
}

module.exports = {registerUser, authUser, allUsers}