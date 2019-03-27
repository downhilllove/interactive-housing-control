import React from 'react'
import { Container } from 'reactstrap'

import LoadingAnimation from '../components/LoadingAnimation'
import SensorDataTable from '../components/SensorDataTable'

import useAxios from '../hooks/useAxios'

import styles from './Home.module.scss'

const numberOfLatestMeasurementsToDisplay = 10
const getLatest10Measurements = (measurements = []) =>
  [...measurements].reverse().splice(0, numberOfLatestMeasurementsToDisplay)

const Home = () => {
  const { data, isLoading, isError } = useAxios('/api/mariaDB/allMeasurements')

  if (isLoading) return <LoadingAnimation />
  if (isError) return <h2>Ein Fehler ist aufgetreten!</h2>

  const latest10SensorDataMeasurements = getLatest10Measurements(data || [])

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
