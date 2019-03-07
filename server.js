require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')

const isProduction = require('./server/utils/isProduction')

const sensorDataRoute = require('./server/routes/api/sensorData')

const port = process.env.PORT || 5000
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Connect to database
mongoose
  .connect(process.env.MONGOURI, { useNewUrlParser: true })
  .then(() => console.info('MongoDB connection successfully established'))
  .catch(err => console.error(err))

// API routes
app.use('/api/sensorData', sensorDataRoute)

// Send React entry point for every route except for apis
if (isProduction()) {
  app.use(express.static('client/build'))
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client/build', 'index.html')),
  )
}

app.listen(port, () => console.info(`Server running on port ${port}`))
