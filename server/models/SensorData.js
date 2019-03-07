const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SensorDataSchema = new Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  temperatureCelsius: {
    type: Number,
    required: true,
  },
  humidityPercentage: {
    type: Number,
    min: 0,
    max: 100,
    required: true,
  },
})

const SensorData = mongoose.model('SensorData', SensorDataSchema)

module.exports = SensorData
