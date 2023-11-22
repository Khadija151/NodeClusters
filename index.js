const express = require('express')
const os = require('os');
const cluster = require('cluster');


const totalCPUs = os.cpus().length;
console.log(os.cpus().length)
// ager cluster primary hai then make workers, and if not then run server
if (cluster.isPrimary) {
    for (i = 0; i < totalCPUs; i++) {
        cluster.fork();
    }
}
else {
    const app = express();
    const PORT = 8000;
    app.get('/', (req, res) => {
        res.end(`Hello from server with pid: ${process.pid}`,);
    })
    app.listen(PORT, () => { console.log(`Server started successfully on http://localhost:${PORT}`) })
}

