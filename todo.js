const {v4 : uuidv4} = require('uuid')

let data = [
    {
        id : 1 ,
        content : "name"  ,  
        date : "20-07-2024" , 
        completed_task : false
    },
]

function extractNumbersFromUUID(uuid) {
    return uuid.replace(/\D/g, '');
  }
  



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
    const id = extractNumbersFromUUID(uuidv4())
    if( req.body.content ){
        const todo = data.findIndex((todo) => todo.id === id)
        if(todo == -1){
            const todo = {
                id ,
                ...req.body
            }
            
            console.log(todo)
            data.push(todo)
            return res.json(data)
        }
        console.log(id)
        res.status(400).json({                  
            message : "id already exist"
        })
    }else{
        res.status(400).json({                  
            message : "Error in adding data"
        })
    }
    
    
    
}




const completed = (req , res) => {
    const id = req.params.id
    const index = data.findIndex((todo) => todo.id == id)
    if(index != -1){
        data[index].completed_task = !data[index].completed_task
        return res.json(data)
    }
    return res.status(400).json({   
        message : "todo not found"
    })
}


const clear = (req , res) => {
    const updatedData = data.filter((todo) => !todo.completed_task)
    data = updatedData
    return res.json(updatedData)
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



const searchdata = (req, res) => {
    console.log("search");
    const name = req.query.name;
    console.log(name);
    const todo = data.filter((todo) => todo.name.toLowerCase().includes(name.toLowerCase()));
    console.log(todo);
    if(todo.length > 0) {
        return res.json(todo);
    }
    res.status(400).json({
        message: "Todo not found"
    });
};



module.exports = {
    getalldata , 
    getidbydata , 
    adddata ,
    deletedata ,
    putdata,
    searchdata ,
    completed ,
    clear
}
