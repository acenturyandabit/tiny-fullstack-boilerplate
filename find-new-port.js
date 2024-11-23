const net = require('net');
const fs = require('fs');

const main = async () => {
  const [new_backend_port, new_frontend_port] = await findNewPorts(3000, 2);  
  const filesToUpdate = [
    { path: 'backend/package.json', port: new_backend_port },
    { path: 'frontend/package.json', port: new_frontend_port },
    { path: 'frontend/vite.config.ts', port: new_backend_port },
  ];

  filesToUpdate.forEach(({ path, port }) => {
    const fileContent = fs.readFileSync(path, 'utf8');
    const updatedContent = fileContent.replace(/\$NEW_PORT/g, port);
    fs.writeFileSync(path, updatedContent, 'utf8');
  });
}

const findNewPorts = async (startPort, count) => {
  const basePort = startPort + (Date.now() % 1000); // Simple hash based on current time
  return Array.from({ length: count }, (_, i) => basePort + i);
};

main();