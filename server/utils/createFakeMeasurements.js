const moment = require('moment')
const getRandomNumberInRange = require('./getRandomNumberInRange')

// Config of fake data generation
const startYear = 2019
const startMonth = 0 // Months are 0-indexed in js
const currentYear = moment().year()
const currentMonth = moment().month()
const currentDay = moment().date()
const minutesInterval = 30 // Generate data for every 10 minutes

const getRandomTemperature = (min = -10, max = 35) =>
  getRandomNumberInRange(min, max)

const getRandomHumidity = (min = 20, max = 100) =>
  Math.floor(getRandomNumberInRange(min, max))

const createFakeMeasurements = () => {
  const fakeMeasurements = []

  for (let year = startYear; year <= currentYear; year++) {
    const isCurrentYear = year === currentYear
    let month = year === startYear ? startMonth : 0
    const endMonth = isCurrentYear ? currentMonth : 11

    for (month; month <= endMonth; month++) {
      const isCurrentMonth = isCurrentYear && month === currentMonth
      const daysInMonth = moment({ year, month }).daysInMonth()
      const endDay = isCurrentMonth ? currentDay - 1 : daysInMonth

      for (let day = 1; day <= endDay; day++) {
        for (let hours = 0; hours <= 11; hours++) {
          for (let minutes = 0; minutes <= 59; minutes += minutesInterval) {
            fakeMeasurements.push({
              date: new Date(year, month, day, hours, minutes, 0, 0),
              temperatureCelsius: getRandomTemperature(),
              humidityPercentage: getRandomHumidity(),
            })
          }
        }
      }
    }
  }

  return fakeMeasurements
}

module.exports = createFakeMeasurements
