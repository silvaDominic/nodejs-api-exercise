import http from 'node:http';

function getProjects() {
  const options = {
    hostname: '127.0.0.1',
    port: 8000,
    path: '/projects',
    method: 'GET',
  }

  const req = http.request(options, (res) => {
    let data = '';

    // Listen for data
    res.on('data', (chunk) => {
      data += chunk;
    });

    // Listen for the end of the response
    res.on('end', () => {
      console.log(JSON.parse(data));
    });
  });

  req.on('error', (err) => {
    console.error(`Request error: ${err.message}`);
  })

  req.end();
}

getProjects();




