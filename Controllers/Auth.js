import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import { User } from '../models/Users.js'
import { generateNewCalData } from './CalData.js'

export const signUp = async (req, res, next) => {
    let { name: first_name, email, password } = req.body
    let username = 'user_'+first_name

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
        const newDataId = await generateNewCalData()
        const newUser = new User({ first_name, email, password: hashedPassword, username, dataId: newDataId });
        await newUser.save();
        res.locals = {status:201,msg: 'User created successfully'}
        next()

    }catch(err){
        console.error(`Error creating user: ${err}`);
        res.locals = {status:500,msg:'Internal Server Error'} 
        next()
    }
}


export const login = async (req, res, next) => {
    let {email, username, password} = req.body
    try{
        const user = (email) ? await User.findOne({ email }) : await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        // Compare the provided password with the stored hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Create and sign a JWT
        const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: '1h', // Token expires in 1 hour
        });
        res.locals.token = token
        res.json({ token });
        next()

    }catch(err)
    {
       console.error(`Error logining in user: ${err}`);
        res.locals = {status:500,msg:'Internal Server Error'} 
        next() 
    }
}

// Middleware to verify JWT and extract user information
export function authenticateToken(req, res, next) {
  const token = req.header('Authorization').split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    req.user = user;
    next();
  });
}