import React from 'react'
import PropTypes from 'prop-types'
import { Input } from 'reactstrap'
import moment from 'moment'
import TemperatureChart from './Charts/TemperatureChart'
import HumidityChart from './Charts/HumidityChart'
import SensorDataTable from './SensorDataTable'

import useInputValue from '../hooks/useInputValue'

const getSelectedYearAndMonth = yearMonthInputValue => {
  const [selectedYear, selectedMonth] = yearMonthInputValue.value.split('-')
  return {
    selectedYear: selectedYear,
    selectedMonth: selectedMonth,
  }
}

const getSensorDataForSelectedYearMonth = (sensorData, yearMonth) => {
  const { selectedYear, selectedMonth } = getSelectedYearAndMonth(yearMonth)
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
  const { selectedYear, selectedMonth } = getSelectedYearAndMonth(
    selectedYearMonth,
  )

  const monthName = new Date(0, selectedMonth - 1).toLocaleString('de-AT', {
    month: 'long',
  })

  const sensorDataForSelectedYearMonth = getSensorDataForSelectedYearMonth(
    sensorData,
    selectedYearMonth,
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
  const tableData = sensorDataByDay.map(
    ({ dateOfMonth, averageTemperature, averageHumidity }) => {
      const date = new Date(selectedYear, selectedMonth - 1, dateOfMonth)
      return {
        date,
        temperatureCelsius: averageTemperature,
        humidityPercentage: averageHumidity,
      }
    },
  )

  return (
    <div>
      <h2>
        Monatsübersicht für {monthName} {selectedYear}
      </h2>

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
      <SensorDataTable
        title={`Durchschnittswerte für ${monthName} ${selectedYear}`}
        sensorData={tableData}
        dateFormatter="DD.MM.YYYY"
      />
    </div>
  )
}

MonthOverview.propTypes = {
  availableMonths: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  sensorData: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
}

export default MonthOverview
