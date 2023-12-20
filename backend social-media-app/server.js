const express = require('express')
const mongoose = require("mongoose")
const app = express()
const user_route = require("./routes/user.router")
const cors = require("cors")
require("dotenv").config()
app.use(express.json())
app.use(cors())
app.get('/', (req , res)=>{
    res.send("hello social media")
})
mongoose.connect(process.env.DB_CONNECTION,
{
    useNewUrlParser:true,
    useUnifiedTopology:true

})
app.use("/users",user_route)
const db = mongoose.connection ;
db.once("open", function(){
        console.log("db conneccted successfully ...")});
  // creating a new log in case of db error
db.on("error",console.error.bind(console,"connection error :"))

app.listen( process.env.PORT , ()=>{
    console.log(`app listen on port ${process.env.PORT }`)
})