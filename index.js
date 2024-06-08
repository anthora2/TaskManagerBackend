
/*
const app = express is what sets up the local server. We are using 
our own computers as temporary servers that can be accessed by other
local computers or real applications. app is assigned to the function 
express which is importred. This will allow us to create temporary servers
so that we can practice and test recieving inputs from our front end application
taking in that data, and doing some command or steps with it
require keyword is the node js equivalent to import so dw about that
*/
const app = express();

//Cross Origin Resource Sharing is what is goign to allow 
//our front end local host to communicate with our backend local host
const cors = require('cors');
const { application } = require('express');

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
app.get('/api/createTask', (req, res) => {
    //logic to create a task would go here
    //we would use the req.body which should be a JSON
    //and then we will respond with a result ie we use the res variable
})