require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const isProduction = require('./server/utils/isProduction')

// Import routes
const mariaDBRoute = require('./server/routes/api/mariaDB')

const port = process.env.PORT || 5000
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// API routes
app.use('/api/mariaDB', mariaDBRoute)

// Send React entry point for every route except for apis
if (isProduction()) {
  app.use(express.static('client/build'))
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client/build', 'index.html')),
  )
}

app.listen(port, () => console.info(`Server running on port ${port}`))
