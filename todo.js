const {v4 : uuidv4} = require('uuid')

const data = [
    {
        id : 1 ,
        name : "name"  ,  
        description : "description"
    },
]

/**
 * Extracts all the numbers from a UUID string.
 *
 * @param {string} uuid - The UUID string from which to extract numbers.
 * @return {string} The string containing only the numbers from the UUID.
 */
function extractNumbersFromUUID(uuid) {
    // This regular expression matches all non-digit characters and replaces them with an empty string.
    // The 'g' flag means it will replace all occurrences in the string.
    return uuid.replace(/\D/g, '');
}
  

/**
 * Retrieves all data from the data array.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Object} The JSON response containing all data.
 */
const getalldata = (req, res) => {
    // Send the data array as a JSON response
    res.json(data);
}

/**
 * Retrieves a specific todo item from the data array based on the provided ID.
 *
 * @param {Object} req - The request object containing the ID in the parameters.
 * @param {Object} res - The response object to send the todo item or error message.
 * @return {Object} The JSON response containing the todo item or error message.
 */
const getidbydata =  (req , res) => { 
    // Extract the ID from the request parameters
    const id = req.params.id
    
    // Find the todo item with the matching ID in the data array
    const todo_id = data.find((todo) => todo.id == id)
    
    // If the todo item is found, return it as a JSON response
    if(todo_id){
        return res.json(todo_id)
    }
    
    // If the todo item is not found, return a 400 error message
    res.status(400).json(
        {
            message : "todo not found"
        }
    )
}


/**
 * Adds a new todo item to the data array.
 *
 * @param {Object} req - The request object containing the todo item in the body.
 * @param {Object} res - The response object to send the updated data array or error message.
 * @return {Object} The JSON response containing the updated data array or error message.
 */
const adddata =  (req , res) => {
    // Generate a unique ID for the new todo item
    const id = extractNumbersFromUUID(uuidv4())
    console.log(id) 

    // Check if the todo item has a name
    if( req.body.name ){
        // Check if a todo item with the same ID already exists
        const todo = data.find((todo) => todo.id === id)
        if(!todo){
            // Create a new todo item with the generated ID and other properties from the request body
            const todo = {
                id ,
                ...req.body
            }
            
            console.log(todo)
            // Add the new todo item to the data array
            data.push(todo)
            // Send the updated data array as a JSON response
            return res.json(data)
        }

        // If a todo item with the same ID already exists, return a 400 error message
        res.status(400).json({                  
            message : "id already exists"
        })
    } else {
        // If the todo item is missing a name, return a 400 error message
        res.status(400).json({                  
            message : "Error in adding data"
        })
    }
    
}

/**
 * Deletes a specific todo item from the data array based on the provided ID.
 *
 * @param {Object} req - The request object containing the ID in the parameters.
 * @param {Object} res - The response object to send the updated data array or error message.
 * @return {Object} The JSON response containing the updated data array or error message.
 */
const deletedata =  (req , res) => {
    // Extract the ID from the request parameters
    const id = req.params.id

    // Find the index of the todo item with the matching ID in the data array
    const index = data.findIndex((todo) => todo.id == id)

    // If the todo item is found, remove it from the data array and return the updated data array as a JSON response
    if(index != -1){
        data.splice(index , 1)
        return res.json(data)
    }

    // If the todo item is not found, return a 400 error message
    return res.status(400).json({
        message : "todo not found"
    })
}



/**
 * Updates a specific todo item in the data array based on the provided ID.
 *
 * @param {Object} req - The request object containing the ID in the parameters and the updated todo item in the body.
 * @param {Object} res - The response object to send the updated data array or error message.
 * @return {Object} The JSON response containing the updated data array or error message.
 */
const putdata =  (req , res) => {
    // Extract the ID from the request parameters
    const id = req.params.id

    // Find the index of the todo item with the matching ID in the data array
    const index = data.findIndex((todo) => todo.id == id)

    // If the todo item is found, update it with the new data and return the updated data array as a JSON response
    if(index != -1){
        data[index] = req.body
        return res.json(data)   
    }

    // If the todo item is not found, return a 400 error message
    return res.status(400).json({   
        message : "todo not found"
    })
}


/**
 * Searches for todo items in the data array based on the provided name.
 *
 * @param {Object} req - The request object containing the name in the query parameters.
 * @param {Object} res - The response object to send the matching todo items or error message.
 * @return {Object} The JSON response containing the matching todo items or error message.
 */
const searchdata = (req, res) => {
    // Log the search operation
    console.log("search");

    // Extract the name from the query parameters
    const name = req.query.name;

    // Log the name for debugging purposes
    console.log(name);

    // Filter the data array to find todo items whose name contains the search query
    const todo = data.filter((todo) => todo.name.toLowerCase().includes(name.toLowerCase()));

    // Log the matching todo items for debugging purposes
    console.log(todo);

    // If at least one todo item is found, return it as a JSON response
    if(todo.length > 0) {
        return res.json(todo);
    }
    
    // If no todo item is found, return a 400 error message
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
    searchdata
}
