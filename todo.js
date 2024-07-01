const {v4 : uuidv4} = require('uuid')

const data = [
    {
        id : 1 ,
        name : "name"  ,  
        description : "description"
    },
]



const getalldata = (req , res) => {
    res.json(data)
}

const getidbydata =  (req , res) => { 
    const id = req.params.id
    const todo_id = data.find((todo) => todo.id == id)
    if(todo_id){
        return res.json(todo_id)
    }
    res.status(400).json(
        {
            message : "todo not found"
        }
    )
}


const adddata =  (req , res) => {
    const id = uuidv4()
    if( req.body.name ){
        const todo = data.find((todo) => todo.id === id)
        if(!todo){
            const todo = req.body
            console.log(todo)
            data.push(todo)
            return res.json(data)
        }

        res.status(400).json({                  
            message : "id already exist"
        })
    }else{
        res.status(400).json({                  
            message : "Error in adding data"
        })
    }
    
    
    
}

const deletedata =  (req , res) => {
    const id = req.params.id
    const index = data.findIndex((todo) => todo.id == id)
    if(index != -1){
        data.splice(index , 1)
        return res.json(data)
    }

    return res.status(400).json({
        message : "todo not found"
    })
}



const putdata =  (req , res) => {
    const id = req.params.id
    const index = data.findIndex((todo) => todo.id == id)
    if(index != -1){
        data[index] = req.body
        return res.json(data)   
    }
    return res.status(400).json({   
        message : "todo not found"
    })
}

module.exports = {
    getalldata , 
    getidbydata , 
    adddata ,
    deletedata ,
    putdata
}
