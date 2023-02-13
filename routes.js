const fs = require("fs");
const requestHandler = (request, response) => {
  //console.log(request.url, request.method, request.headers);
  // process.exit(); Node.js to terminate the process synchronously with an exit status of code
  const url = request.url;
  const method = request.method;
  if (url === "/") {
    response.write("<html>");
    response.write("<head><title>Enter Message</title><head>");
    response.write(
      '<body><form action="/message" method="POST"><input type="text" name="message"/><input type="number" name="age"/><button type="submit">Send</button></form></body>'
    );
    response.write("</html>");
    return response.end();
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    //incoming request data come as a stream of data
    //nodeJS read request data in chunks
    //buffer holds some chunks of data for sometime so nodejs can read data
    //consider data stream as bus and buffer as bus stand
    //request.on()  add event listeners on request
    request.on("data", (chunks) => {
      console.log(chunks);
      body.push(chunks);
    });
    return request.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody);
      const slipString = parsedBody.split("&");
      const message = slipString[0].split("=")[1];
      const age = slipString[1].split("=")[1];
      //fs.writeFileSync("message.txt", message + " " + age); //writing in file sync. it block code execution
      fs.writeFile("message.txt", message + " " + age, (err) => {
        response.statusCode = 302;
        response.setHeader("Location", "/");
        return response.end();
      });
      //we can use above line or below line its same
      //response.writeHead(302, {
      //  Location: "/",
      //}); //Sends a response header to the request.
    });
  }
  response.setHeader("Content-Type", "text/html"); // use to set request headers
  response.write(
    "<html><head><title>First Node</title></head><body><h1>My first node server</h1></body></html>"
  ); // use to write data that we we will as response
  response.end(); //it signals no more data will be written now
};

//module.exports = requestHandler;

/*module.exports = {
  handler: requestHandler,
  someText: "Some text file",
};*/

//module.exports.handler = requestHandler;
//module.exports.someText = "Some text is fine";

exports.handler = requestHandler;
