const http = require("http");
const { buffer } = require("stream/consumers");

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  console.log(url, method);
  if (url === "/") {
    res.write(
      "<html><head><title>Assigment 1</title></head><body><h1>Hello! greeting from student</h1><form action='/create-user' method='POST'><input type='text' name='username'/><button type='submit'>Submit</button></form></body></html>"
    );
    return res.end();
  }
  if (url === "/users") {
    res.write("<html>");
    res.write("<head><title>Assigment 1</title></head>");
    res.write(
      "<body><ul><li>Item1</li><li>Item2</li><li>Item3</li></ul></body>"
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/create-user" && method === "POST") {
    const body = [];
    req.on("data", (chunks) => {
      body.push(chunks);
      console.log(chunks);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody);
      const username = parsedBody.split("=")[1];
      console.log(username);
      res.statusCode = 302;
      res.write("<html>");
      res.write("<head><title>Assigment 1</title></head>");
      res.write(`<body>${username}</body>`);
      res.write("</html>");
      return res.end();
    });
  }
});
server.listen(8080);
