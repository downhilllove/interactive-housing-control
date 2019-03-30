import React from 'react'
import { Container } from 'reactstrap'

import LoadingAnimation from '../components/LoadingAnimation'
import SensorDataTable from '../components/SensorDataTable'

import useAxios from '../hooks/useAxios'

import styles from './Home.module.scss'

const numberOfLatestMeasurementsToDisplay = 10

const Home = () => {
  const { data, isLoading, isError } = useAxios(
    '/api/mariaDB/latestMeasurements',
    {},
    [],
  )

  if (isLoading) return <LoadingAnimation />
  if (isError) return <h2>Ein Fehler ist aufgetreten!</h2>

  return (
    <Container>
      <div className={styles.distance}>
        <h1>Home</h1>
        <br />
        <SensorDataTable
          title={`Letzte ${numberOfLatestMeasurementsToDisplay} Messungen`}
          sensorData={data}
        />
      </div>
    </Container>
  )
}

export default Home
