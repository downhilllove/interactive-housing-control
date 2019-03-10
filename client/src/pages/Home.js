import React, { useContext } from 'react'
import { Container } from 'reactstrap'

import SensorDataTable from '../components/SensorDataTable'

import SensorDataContext from '../context/SensorDataContext'

import styles from './Home.module.scss'

const numberOfLatestMeasurementsToDisplay = 10

const Home = () => {
  const {
    sensorData: { data: sensorData },
  } = useContext(SensorDataContext)

  const latest10SensorDataMeasurements = [...sensorData]
    .reverse()
    .splice(0, numberOfLatestMeasurementsToDisplay)

  return (
    <Container>
      <div className={styles.distance}>
        <h1>Home</h1>
        <br />
        <SensorDataTable
          title={`Letzte ${numberOfLatestMeasurementsToDisplay} Messungen`}
          sensorData={latest10SensorDataMeasurements}
        />
      </div>
    </Container>
  )
}

export default Home
