const express = require('express')
const path = require('path')
const { callAPI } = require('./api-caller')

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
    callAPI('https://catalogue.data.gov.bc.ca/api/3/action/datastore_search?resource_id=79cfd06f-8f3e-41b6-a411-4b843ee39236&q=beer')
      .then(response => {
        const beers = response.result.records.filter(
          product => product.ITEM_CATEGORY_NAME === 'Beer'
        )

        res.json({ beers })
      })
      .catch(error => {
        res.send(error)
      })
  })

  // All remaining requests return the React app, so it can handle routing
  app.get('*', (request, response) => {
    response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'))
  })

  app.listen(PORT, function () {
    console.error(`Node ${isDev ? 'dev server' : 'cluster worker ' + process.pid}: listening on port ${PORT}`)
  })
}
