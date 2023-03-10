
const express = require('express')
require('dotenv').config({path:'./config.env'})
const connectToMongoose = require('./db')
const app = express()
const cors=require('cors');
const port = process.env.PORT || 5000
const bodyParser=require('body-parser')

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
connectToMongoose()
app.use('/api/',require('./routes/auth'))
app.use('/api/',require('./routes/notes'))
app.use('/api/',require('./routes/contact'))
app.use('/api/',require('./routes/clipboard'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})