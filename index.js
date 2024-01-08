import express from 'express'
import 'dotenv/config'
import mongoose from 'mongoose'
import { User } from './models/Users.js'
import {signUp} from './Controllers/Auth.js'

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
    console.log("works")
    res.status(res.locals.status).send(res.locals.msg)
} )


app.listen(port, async () => {
    console.log(`Listening on port: ${port}`)
})