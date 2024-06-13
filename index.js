
/*
const app = express is what sets up the local server. We are using 
our own computers as temporary servers that can be accessed by other
local computers or real applications. app is assigned to the function 
express which is importred. This will allow us to create temporary servers
so that we can practice and test recieving inputs from our front end application
taking in that data, and doing some command or steps with it
require keyword is the node js equivalent to import so dw about that
*/

//Cross Origin Resource Sharing is what is goign to allow 
//our front end local host to communicate with our backend local host
const cors = require('cors');
const express = require('express');
const Joi = require('joi');

const app = express();
app.use(express.json());

//In the future we are going to want to store important keys/variables
//in env files that are not pushed or saved anywhere on git so that
//no one can access the apps other than developers on our team. As of right
//now we do not have anything in our .env file, so because it does not
//find anything we are going to end up using 5000 by defualt which will look
//something like http://localhost:5000
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Endpoint Routes

//Get request endpoint
/**
 * These are called enpoints or routes. When the front end makes a request
 * first it will have to specify what kind of request it is making. The below will 
 * only be triggered by a front end GET request hence the name. Among get requests
 * that are sent from the front end. THe below endpoint/route will only trigger
 * if the request was made to api/createTask. So if we had a bunch of 
 * app.get(api/userName)
 * app.get(api/Filler)
 * and more abovve the app.get("api/createTask"), when we receive a request from the
 * front end, it will iterate over all of the get endpoints that we create until it 
 * finds the get endpoint that has the route specific ie the request from the front end 
 * to the backend will only trigger the below endpoint if "api/createTask" is specified 
 * in the request. The front end request will be explained in the front end.
 * 
 */

const tasks = [
    {taskID: 123, taskStatus: 'Completed', description: 'Add sample endpoints', commentID: 0, sprintID: 0},
    {taskID: 456, taskStatus: 'In Progress', description: 'Create database schema', commentID: 1, sprintID: 1}
];

function validateTask(task) {
    // Schema for validating request body object
    const schema = Joi.object({
        taskID: Joi.number().integer().required(),
        taskStatus: Joi.string().required(),
        description: Joi.string().required(),
        commentID: Joi.number().integer().required(),
        sprintID: Joi.number().integer().required(),
    });

    const {error, value} = schema.validate(task);
    if (error) {
        throw new Error(error.details[0].message);
    }
    return {error, value};
}

// Create task endpoint
app.post('/api/createTask', (req, res) => {
    try {
        // Validate request body
        const {err} = validateTask(req.body);
        
        // Create new task
        const task = {
            taskID: req.body.taskID,
            taskStatus: req.body.taskStatus,
            description: req.body.description,
            commentID: req.body.commentID,
            sprintID: req.body.sprintID
        };

        tasks.push(task);
        res.send(task);
    } catch (err) {
        // Handle validation error
        res.status(400).send(err.message);
    }
});

// Read task endpoint given a taskID
app.get('/api/getTask/:taskID', (req, res) => {
    const task = tasks.find(t => t.taskID === parseInt(req.params.taskID));
    // No task found
    if (!task) return res.status(404).send(`No task found with id ${req.params.taskID}`);
    res.send(task);
});

app.get('/api/getTasks/', (req, res) => {
    res.send(tasks);
});

// Update task endpoint
app.put('/api/updateTask/:taskID', (req, res) => {
    // Look up task
    const task = tasks.find(t => t.taskID === parseInt(req.params.taskID));

    // If task does not exist, return 404 - Not Found
    if (!task) return res.status(404).send(`No task found with id ${req.params.taskID}`);

    try {
        // Validate request body
        const {err} = validateTask(req.body);
        
        // Update task
        task.taskID = req.body.taskID
        task.taskStatus = req.body.taskStatus
        task.description = req.body.description
        task.commentID = req.body.commentID
        task.sprintID = req.body.sprintID

        // Return updated task to client
        res.send(task);
    } catch (err) {
        // Handle validation error
        res.status(400).send(err.message);
    }
});

// Delete task endpoint
app.delete('/api/deleteTask/:taskID', (req, res) => { 
    // Look up task
    const task = tasks.find(t => t.taskID === parseInt(req.params.taskID));

    // No task found
    if (!task) return res.status(404).send(`No task found with id ${req.params.taskID}`);

    // Delete task
    const index = tasks.indexOf(task);
    tasks.splice(index, 1);

    // Return task deleted
    res.send(task);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));