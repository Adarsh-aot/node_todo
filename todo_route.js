const express = require('express')
const todo = require('./todo')
const router = express.Router()


// routes
router.get('/search' , todo.searchdata)
router.get('/' , todo.getalldata)
router.get('/:id' ,  todo.getidbydata)
router.post('/' , todo.adddata)
router.delete('/:id' , todo.deletedata)
router.put('/:id' , todo.putdata)



module.exports = router