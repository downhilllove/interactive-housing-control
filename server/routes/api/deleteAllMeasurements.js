const express = require('express')
const router = express.Router()

const SensorMeasurement = require('../../models/SensorMeasurement')

// @route   DELETE api/deleteAllMeasurements
// @desc    Drop sensor measurements collection from db
// @access  Public
router.delete('/', (req, res) => {
  SensorMeasurement.collection
    .drop()
    .then(() => res.sendStatus(200))
    .catch(err => {
      res
        .status(500)
        .json({ error: 'Could not fetch sensor data from database' })
      console.error(err)
    })
})

module.exports = router
