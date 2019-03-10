const express = require('express')
const router = express.Router()

const SensorMeasurement = require('../../models/SensorMeasurement')

// @route   GET api/sensorData
// @desc    Get sensor data from database
// @access  Public
router.get('/', (req, res) => {
  SensorMeasurement.find()
    .sort({ date: 1 })
    .lean()
    .then(sensorData => res.json(sensorData))
    .catch(err => {
      res
        .status(500)
        .json({ error: 'Could not fetch sensor data from database' })
      console.error(err)
    })
})

module.exports = router
