//Creating Server
// we have some core modules in node js
// http,https,fs(it use for file system management),path(it use to create path),os(this module is use to
//interact with operating system)
// http use to launch server,and sending request/response
//by using required keyword we simply import any module or another file inside our nodejs file

const http = require("http");
const route = require("./routes");
//for creating server we have createServer method on http module
//it takes function as argument which take request and response as parameter
//request is use to handle incoming request
//response is use to send any response to client
//http.createServer() will return new server instance
// callback will run everytime we trigger a request from client
//it use eventloop which keep on check code will run in loop
// we ever we get request
const server = http.createServer(route.handler);
//Start a server listening for connections
//it tell on which port or hostname server needs to run
server.listen(3000);
//Javascript use single thread to run code
//but we have some aysnc code is will handle by event loop
//Event loop basically running the callback code when certain event occur
//it know all the callbacks
//event loop is use for fast complete callback
//if we have some heavy lifting file like working with files
//it will be done by worker pool which is completely
//detached from javascript code execution
//workpool use multiple theards to perfomr heavy lifting
//once workpool done tis working it trigger callback to event loop
