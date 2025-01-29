const net = require('net');
const fs = require('fs');

const main = async () => {
  const [new_backend_port, new_frontend_port] = await findNewPorts(3000, 2);  
  const filesToUpdate = [
    { path: 'backend/package.json', port: new_backend_port },
    { path: 'frontend/package.json', port: new_frontend_port },
    { path: 'frontend/vite.config.ts', port: new_frontend_port },
  ];

  filesToUpdate.forEach(({ path, port }) => {
    const fileContent = fs.readFileSync(path, 'utf8');
    const updatedContent = fileContent.replace(/\$NEW_PORT/g, port);
    fs.writeFileSync(path, updatedContent, 'utf8');
  });
}

const findNewPorts = async (startPort, count) => {
  const isPortAvailable = async (port) => {
    return new Promise((resolve) => {
      const server = net.createServer();
      server.listen(port, () => {
        server.close(() => resolve(true));
      }).on('error', () => resolve(false));
    });
  };

  let availablePorts = [];
  let port = startPort;

  while (availablePorts.length < count) {
    if (await isPortAvailable(port)) {
      availablePorts.push(port);
    }
    port++;
  }

  return availablePorts;
};

main();