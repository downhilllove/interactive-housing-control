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

  const availableDatesOfSelectedMonth = sensorDataForSelectedYearMonth.map(
    ({ date }) => moment(date).date(),
  )
  const averageTemperatures = sensorDataForSelectedYearMonth.map(
    ({ averageTemperatureCelsius }) => averageTemperatureCelsius,
  )
  const averageHumidities = sensorDataForSelectedYearMonth.map(
    ({ averageHumidityPercentage }) => averageHumidityPercentage,
  )
  const tableData = sensorDataForSelectedYearMonth.map(
    ({ date, averageTemperatureCelsius, averageHumidityPercentage }) => {
      return {
        date: new Date(selectedYear, selectedMonth - 1, moment(date).date()),
        temperatureCelsius: averageTemperatureCelsius,
        humidityPercentage: averageHumidityPercentage,
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
