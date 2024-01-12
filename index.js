import express from 'express'
import 'dotenv/config'
import mongoose from 'mongoose'
import { User } from './models/Users.js'
import {authenticateToken, login, signUp} from './Controllers/Auth.js'
import { CalData } from './models/CalData.js'
import { generateNewCalData, saveCalData } from './Controllers/CalData.js'


const app = express()
const port = process.env.PORT

// MongoDB CLient
mongoose.connect(process.env.MONGO_CLIENT)
const db = mongoose.connection

app.use(express.json())


db.once('open', async ()=>{
    console.log('Connected to db')
})

app.get('/', (req, res) => res.json({msg: "Get request served! 😎"}))

app.get('/userdata', authenticateToken, async (req, res) => {
    try{
        let {email} = req.user
        const user = await User.findOne({email})
        const {first_name, second_name, username, is_pro, is_female, photo_url, wallet, streak, stage, purchased_items, dataId} = user
        const data = await CalData.findById(dataId)
        res.json({user:{first_name, second_name, email, username, is_pro, is_female, photo_url, wallet, streak, stage, purchased_items, data}})
    }catch(err){
       res.status(500).send("Server error - fetching user data") 
    }
})

app.post('/userdata', authenticateToken, async (req, res) => {
    try{
        //  update after few seconds, collect all changes for the week 
        let {dataId} = req.user
        let {year, weekno, data } = req.body
        await saveCalData(year, weekno, JSON.parse(data), dataId)
    }catch(err){
       res.status(500).send("Server error") 
    }
})


app.get('/test', async (req, res) => {
    // await saveCalData('659fdb37e877e3a8995cb979',2024,2,dummy)
    console.log("saved")
})

app.post('/signup' , signUp, (req, res) => {
    res.status(res.locals.status).send(res.locals.msg)
})

app.post('/login', login, (req,res) => {
    res.status(res.locals.status).send(res.locals.msg)
})


app.listen(port, async () => {
    console.log(`Listening on port: ${port}`)
})