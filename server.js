import http from 'node:http';
import projects from './data-store.js';

const hostname = '127.0.0.1';
const port = 8000;

const inMemoryProjects = [...projects];
let server = http.createServer((req, res) => {
  res.setHeader('content-type', 'application/json');

  if (req.url === '/projects') {
    switch(req.method) {
      case "GET":
        res.statusCode = 200;
        res.end(JSON.stringify(inMemoryProjects));
        break;
      case "POST":
        let body = '';

        req.on('data', (chunk) => {
          body += chunk.toString();
        });

        req.on('end', () => {
          // If invalid JSON
          if (!isJSON(body)) {
            res.statusCode = 400;
            res.end(JSON.stringify({message: "BAD REQUEST"}));
            return;
          }

          const postData = JSON.parse(body);

          // If duplicate
          if (inMemoryProjects.find((proj) => proj.id === postData.id)) {
            res.statusCode = 400;
            res.end(JSON.stringify({message: "BAD REQUEST"}));
            return;
          }

          // Add project
          inMemoryProjects.push(postData);
          res.statusCode = 201;
          res.end(JSON.stringify(inMemoryProjects));
        });
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

function isJSON(str) {
  if (typeof str !== 'string') return false;

  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
}

export default server;
