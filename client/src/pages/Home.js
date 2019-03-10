import React, { useContext } from 'react'
import { Container } from 'reactstrap'

import SensorDataTable from '../components/SensorDataTable'

import SensorDataContext from '../context/SensorDataContext'

const numberOfLatestMeasurementsToDisplay = 10

const Home = () => {
  const {
    sensorData: { data: sensorData },
  } = useContext(SensorDataContext)

  const latest10SensorDataMeasurements = [...sensorData].splice(
    0,
    numberOfLatestMeasurementsToDisplay,
  )
  return (
    <Container>
      <h1>Home</h1>
      <SensorDataTable
        title={`Letzte ${numberOfLatestMeasurementsToDisplay} Messungen`}
        sensorData={latest10SensorDataMeasurements}
      />
    </Container>
  )
}

export default Home
