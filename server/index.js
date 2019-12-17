// Server
require('dotenv').config()
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const bcrypt = require('bcrypt')
const cookieSession = require('cookie-session')
const { callAPI } = require('./api-caller')

// Node cluster dependencies
const cluster = require('cluster')
const numCPUs = require('os').cpus().length

// Environment variables
const isDev = process.env.NODE_ENV !== 'production'
const PORT = process.env.PORT || 5000
const PASSWORD_HASH = process.env.PASSWORD_HASH
const COOKIE_KEY_1 = process.env.COOKIE_KEY_1
const COOKIE_KEY_2 = process.env.COOKIE_KEY_2
const AUTH_TOKEN = process.env.AUTH_TOKEN

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

  // Middleware
  app.use(cors())
  app.use(express.static(path.resolve(__dirname, '../react-ui/build')))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

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

  // Admin routes
  // Set up session cookies
  app.use(cookieSession({
    name: 'session',
    keys: [COOKIE_KEY_1, COOKIE_KEY_2],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }))

  // Login POST
  app.post('/login', (req, res) => {
    console.log(req.body)
    if (req.body && req.body.username && req.body.password) {
      // If password hashes match, supply the authentication token
      if (req.body.username === 'admin' &&
          bcrypt.compareSync(req.body.password, PASSWORD_HASH)) {
        console.log('Authenticated')
        req.session.authToken = AUTH_TOKEN
        res.json({ auth: true, token: AUTH_TOKEN })
      } else {
        console.log('Password mismatch')
        res.status(401).end()
      }
    } else {
      res.status(401).end()
    }
  })

  // Logout POST
  app.post('/logout', (req, res) => {
    console.log('Logged out')
    req.session = null
    res.json({ auth: false, logout: true })
  })

  // Authentication check GET
  app.get('/check-auth', (req, res) => {
    let auth
    console.log('Checking auth...')
    console.log('Cookie: ', req.session.headers)

    // Check for session
    if (req.session) {
      console.log('req.session present...')

      // Check for data on session object
      if (req.session.isPopulated) {
        console.log('Session data: ', req.session)
      } else {
        console.log('No session data present in req.session.')
      }

      // Check for authentication token
      if (req.session.authToken) {
        console.log('Authentication token present...')
        if (req.session.authToken === AUTH_TOKEN) {
          console.log('Auth token match!')
          auth = true
        }
      }
    }

    auth ? res.json({ auth }) : res.json({ auth: false })
  })

  // All remaining requests return the React app, so it can handle routing
  app.get('*', (request, response) => {
    response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'))
  })

  app.listen(PORT, function () {
    console.error(`Node ${isDev ? 'dev server' : 'cluster worker ' + process.pid}: listening on port ${PORT}`)
  })
}
