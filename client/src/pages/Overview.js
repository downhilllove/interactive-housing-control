import React from 'react'
import { Container } from 'reactstrap'
import moment from 'moment'

import MonthOverview from '../components/MonthOverview'

import useAxios from '../hooks/useAxios'

const getAvailableMonths = sensorData => {
  const yearMonths = sensorData.map(({ date }) =>
    moment(date).format('YYYY-MM'),
  )
  const uniqueYearMonths = [...new Set(yearMonths)]

  return uniqueYearMonths
}

const Overview = () => {
  const { data, isLoading, isError } = useAxios('/api/mariaDB/allMeasurements')

  if (isLoading) return <h2>Daten werden geladen...</h2>
  if (isError) return <h2>Ein Fehler ist aufgetreten!</h2>
  const availableMonths = getAvailableMonths(data || [])

  return (
    <Container>
      <br />
      <h1>Übersicht</h1>
      <br />
      {availableMonths.length > 0 && (
        <MonthOverview
          availableMonths={availableMonths}
          sensorData={data || []}
        />
      )}
    </Container>
  )
}

export default Overview
