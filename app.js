
// config express
const express = require('express')
const todo = require('./todo')
const app = express()
const port = 3000 
app.use(express.json())


// routes
app.get('/' , todo.getalldata)
app.get('/:id' ,  todo.getidbydata)
app.post('/' , todo.adddata)
app.delete('/:id' , todo.deletedata)
app.put('/:id' , todo.putdata)



// listen
app.listen(port , () => {
    console.log("server is running .... ")
})
