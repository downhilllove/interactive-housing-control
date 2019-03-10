import React from 'react'
import PropTypes from 'prop-types'
import { Input } from 'reactstrap'
import moment from 'moment'
import TemperatureChart from './Charts/TemperatureChart'
import HumidityChart from './Charts/HumidityChart'

import useInputValue from '../hooks/useInputValue'

const getSensorDataForSelectedYearMonth = (sensorData, yearMonth) => {
  const [selectedYear, selectedMonth] = yearMonth.split('-')
  return sensorData.filter(({ date }) => {
    const year = moment(date).format('YYYY')
    const month = moment(date).format('MM')

    return year === selectedYear && month === selectedMonth
  })
}

const aggregateSensorDataByDay = sensorDataForMonth => {
  const datesOfMonth = sensorDataForMonth.map(({ date }) => moment(date).date())
  const uniqueDatesOfMonth = [...new Set(datesOfMonth)]

  return uniqueDatesOfMonth.reduce((aggregatedSensorDataByDay, dateOfMonth) => {
    const sensorDataForDay = sensorDataForMonth.filter(
      ({ date }) => moment(date).date() === dateOfMonth,
    )

    const temperatures = sensorDataForDay.map(
      ({ temperatureCelsius }) => temperatureCelsius,
    )
    const humidities = sensorDataForDay.map(
      ({ humidityPercentage }) => humidityPercentage,
    )

    const aggregatedTemperatures = temperatures.reduce(
      (aggregatedTemperature, temperature) =>
        aggregatedTemperature + temperature,
    )

    const aggregatedHumidities = humidities.reduce(
      (aggregatedHumidity, humidity) => aggregatedHumidity + humidity,
    )

    const averageTemperature = aggregatedTemperatures / temperatures.length
    const averageHumidity = aggregatedHumidities / temperatures.length

    return [
      ...aggregatedSensorDataByDay,
      {
        dateOfMonth,
        averageTemperature,
        averageHumidity,
      },
    ]
  }, [])
}

const MonthOverview = ({ availableMonths = [], sensorData = [] }) => {
  const selectedYearMonth = useInputValue(availableMonths[0])

  const sensorDataForSelectedYearMonth = getSensorDataForSelectedYearMonth(
    sensorData,
    selectedYearMonth.value,
  )

  const sensorDataByDay = aggregateSensorDataByDay(
    sensorDataForSelectedYearMonth,
  )

  const availableDatesOfSelectedMonth = sensorDataByDay.map(
    ({ dateOfMonth }) => dateOfMonth,
  )
  const averageTemperatures = sensorDataByDay.map(
    ({ averageTemperature }) => averageTemperature,
  )
  const averageHumidities = sensorDataByDay.map(
    ({ averageHumidity }) => averageHumidity,
  )

  return (
    <div>
      <h2>Monatsübersicht</h2>
      <Input type="select" name="selectedMonth" {...selectedYearMonth}>
        {availableMonths.map(month => (
          <option key={month}>{month}</option>
        ))}
      </Input>
      <TemperatureChart
        temperatures={averageTemperatures}
        labels={availableDatesOfSelectedMonth}
      />
      <HumidityChart
        humidities={averageHumidities}
        labels={availableDatesOfSelectedMonth}
      />
    </div>
  )
}

MonthOverview.propTypes = {
  availableMonths: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  sensorData: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
}

export default MonthOverview
