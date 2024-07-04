// config server
const express = require('express')
const cors = require('cors')
const todo_route  = require('./todo_route')
const app = express()
const port = 3000 
app.use(express.json())
app.use(cors())


// routes
app.use('/todo' , todo_route)




// listen server
app.listen(port , () => {
    console.log("server is running ....")
})
