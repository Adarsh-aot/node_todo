const express = require('express')
const todo = require('./todo')
const router = express.Router()


// routes
router.get('/clear' , todo.clear)
router.get('/' , todo.getalldata)
router.get('/:id' ,  todo.getidbydata)
router.post('/' , todo.adddata)
router.delete('/:id' , todo.deletedata)
router.put('/:id' , todo.putdata)
router.get('/completed/:id' , todo.completed)




module.exports = router