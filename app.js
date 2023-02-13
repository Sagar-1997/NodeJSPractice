//Creating Server
// we have some core modules in node js
// http,https,fs(it use for file system management),path(it use to create path),os(this module is use to
//interact with operating system)
// http use to launch server,and sending request/response
//by using required keyword we simply import any module or another file inside our nodejs file

const http = require("http");
const fs = require("fs");
//for creating server we have createServer method on http module
//it takes function as argument which take request and response as parameter
//request is use to handle incoming request
//response is use to send any response to client
//http.createServer() will return new server instance
// callback will run everytime we trigger a request from client
//it use eventloop which keep on check code will run in loop
// we ever we get request
const server = http.createServer((request, response) => {
  //console.log(request.url, request.method, request.headers);
  // process.exit(); Node.js to terminate the process synchronously with an exit status of code
  const url = request.url;
  console.log(url);
  const method = request.method;
  console.log(method);
  if (url === "/") {
    response.write("<html>");
    response.write("<head><title>Enter Message</title><head>");
    response.write(
      '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>'
    );
    response.write("</html>");
    return response.end();
  }
  if (url === "/message" && method === "POST") {
    fs.writeFileSync("message.txt", "DUMMY");
    response.statusCode = 302;
    response.setHeader("Location", "/");
    return response.end();
  }
  if (url === "/message" && method === "POST") {
    fs.writeFileSync("message.txt", "DUMMY");
    response.statusCode = 302;
    response.setHeader("Location", "/");
    return response.end();
    //we can use above line or below line its same
    //response.writeHead(302, {
    //  Location: "/",
    //}); //Sends a response header to the request.
  }
  response.setHeader("Content-Type", "text/html"); // use to set request headers
  response.write(
    "<html><head><title>First Node</title></head><body><h1>My first node server</h1></body></html>"
  ); // use to write data that we we will as response
  response.end(); //it signals no more data will be written now
});
//Start a server listening for connections
//it tell on which port or hostname server needs to run
server.listen(3000);
