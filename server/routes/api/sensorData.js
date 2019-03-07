const express = require('express')
const router = express.Router()

// const SensorData = require('../../models/SensorData')

const MOCK_SENSOR_DATA = require('../../../MOCK_SENSOR_DATA')

// @route   GET api/sensorData
// @desc    Get sensor data from database
// @access  Public
router.get('/', (req, res) => {
  /*SensorData.find()
    .sort({ date: -1 })
    .lean()
    .then(sensorData => res.json(sensorData))
    .catch(err => {
      res
        .status(500)
        .json({ error: 'Could not fetch sensor data from database' })
      console.error(err)
    })*/

  res.json(MOCK_SENSOR_DATA)
})

module.exports = router
