import http from 'node:http';

const DEFAULT_OPTIONS = {
  hostname: '127.0.0.1',
  port: 8000,
}

function getProjects() {
  const options = {
    ...DEFAULT_OPTIONS,
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

function postProjects(project) {
  const payload = JSON.stringify(project);
  const options = {
    ...DEFAULT_OPTIONS,
    path: '/projects',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload),
    }
  }

  const req = http.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      console.log(JSON.parse(data));
    });
  });

  req.on('err', (err) => {
    console.error(`Request error: ${err.message}`);
  });

  req.write(payload);
  req.end();
}

getProjects();
postProjects({
  id : 5,
  name : "Multitasking Demo",
});



