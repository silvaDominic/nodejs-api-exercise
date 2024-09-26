import http from 'node:http';
import projects from './data-store.js';

const hostname = '127.0.0.1';
const port = 3000;

let server = http.createServer((req, res) => {
  const inMemoryProjects = [...projects];
  res.setHeader('Content-Type', 'application/json');

  if (req.url === '/projects') {
    switch(req.method) {
      case "GET":
        res.statusCode = 200;
        res.end(JSON.stringify(inMemoryProjects));
        break;
    }
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({message: "NOT FOUND"}));
  }

});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

export default server;
