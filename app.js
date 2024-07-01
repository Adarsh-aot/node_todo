// config server
const express = require('express')
const todo_route  = require('./todo_route')
const app = express()
const port = 3000 
app.use(express.json())



// routes
app.use('/todo' , todo_route)




// listen server
app.listen(port , () => {
    console.log("server is running ....")
})
