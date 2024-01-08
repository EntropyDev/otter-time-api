import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import { User } from '../models/Users.js'

export const signUp = async (req, res, next) => {
    let { name: first_name, email, password } = req.body
    let username = 'user1'

    try{
        // Check if the email is already in use
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.locals = {status:400,msg: "email already in use"} 
            next()
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({ first_name, email, password: hashedPassword, username });
        await newUser.save();
        res.locals = {status:201,msg: 'User created successfully'}
        next()

    }catch(err){
        console.error(`Error creating user: ${err}`);
        res.locals = {status:500,msg:'Internal Server Error'} 
        next()
    }
}

