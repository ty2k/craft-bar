const express = require('express')
const path = require('path')

// Node cluster dependencies
const cluster = require('cluster')
const numCPUs = require('os').cpus().length

// Environment variables
const isDev = process.env.NODE_ENV !== 'production'
const PORT = process.env.PORT || 5000

// Node cluster implementation to enable multi-processing across cores
if (!isDev && cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`)

  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`)
  })
} else {
  const app = express()

  // Priority serve any static files
  app.use(express.static(path.resolve(__dirname, '../react-ui/build')))

  // Answer API requests
  app.get('/api', (req, res) => {
    res.set('Content-Type', 'application/json')
    res.send('{"message":"Hello from /api in Express!"}')
  })

  // All remaining requests return the React app, so it can handle routing
  app.get('*', (request, response) => {
    response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'))
  })

  app.listen(PORT, function () {
    console.error(`Node ${isDev ? 'dev server' : 'cluster worker ' + process.pid}: listening on port ${PORT}`)
  })
}
