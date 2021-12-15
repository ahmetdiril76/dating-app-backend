import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'
import Cors from 'cors'
import Cards from './dbCards.js'


//App Config
const app = express()
const port = process.env.PORT || 8001
//const connection_url = process.env.MONGODB_URL;
//console.log(process.env.connection_url);
const connection_url  = 'mongodb+srv://ahmetdiril:cCRACS2Byu9K3QV@cluster0.sfq4q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

//Middleware
app.use(express.json())
app.use(Cors())

//DB Config
// mongoose.connect(connection_url, {
//     //     useNewUrlParser: true,
//     //     useCreateIndex: true,
//     //     useUnifiedTopology: true
//})
mongoose.connect(connection_url)

//API Endpoints
app.get("/", (req, res) => res.status(200).send("Hello TheWebDev"))
app.post('/dating/cards', (req, res) => {
    const dbCard = req.body
    Cards.create(dbCard, (err, data) => {
        if(err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})

app.get('/dating/cards', (req, res) => {
    Cards.find((err, data) => {
        if(err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

//Listener
app.listen(port, () => console.log(`Listening on localhost: ${port}`))