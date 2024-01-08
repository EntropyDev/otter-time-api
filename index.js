import express from 'express'
import 'dotenv/config'
import mongoose from 'mongoose'
import { User } from './models/Users.js'
import {authenticateToken, login, signUp} from './Controllers/Auth.js'

const app = express()
const port = process.env.PORT

// Supabase intialization
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://yzdwcgycmxjvuchcvkzo.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

// MongoDB CLient
mongoose.connect(process.env.MONGO_CLIENT)
const db = mongoose.connection

app.use(express.json())


db.once('open', ()=>console.log("Connected to db succesfully"))

app.get('/', (req, res) => res.json({msg: "Get request served! 😎"}))

app.get('/getUsers', async (req, res) => {
    // await run()
    try{
        const users = await User.find()
        res.json({users: users})
    }catch(err){
        res.status(500).send("Server error")
    }

})

app.post('/signup' , signUp, (req, res) => {
    res.status(res.locals.status).send(res.locals.msg)
})

app.post('/login', login, (req,res) => {
    res.status(res.locals.status).send(res.locals.msg)
})

app.get('/:username',authenticateToken, async (req, res) => {
    try{
        let {email} = req.user
        const user = await User.findOne({email})
        const {first_name, second_name, username, is_pro, is_female, photo_url, wallet, streak, stage, purchased_items, data} = user
        res.json({user:{first_name, second_name, email, username, is_pro, is_female, photo_url, wallet, streak, stage, purchased_items, data}})
    }catch(err){
       res.status(500).send("Server error") 
    }
})


app.listen(port, async () => {
    console.log(`Listening on port: ${port}`)
})