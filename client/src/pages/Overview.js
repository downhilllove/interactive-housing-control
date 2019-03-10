import React, { useContext } from 'react'
import { Container } from 'reactstrap'
import moment from 'moment'

import MonthOverview from '../components/MonthOverview'

import SensorDataContext from '../context/SensorDataContext'

const getAvailableMonths = sensorData => {
  const yearMonths = sensorData.map(({ date }) =>
    moment(date).format('YYYY-MM'),
  )
  const uniqueYearMonths = [...new Set(yearMonths)]

  return uniqueYearMonths
}

const Overview = () => {
  const {
    sensorData: { data: sensorData },
  } = useContext(SensorDataContext)
  const availableMonths = getAvailableMonths(sensorData)

  return (
    <Container>
      <h1>Übersicht</h1>
      {availableMonths.length > 0 && (
        <MonthOverview
          availableMonths={availableMonths}
          sensorData={sensorData}
        />
      )}
    </Container>
  )
}

export default Overview
