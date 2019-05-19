import React, { useState } from 'react' // ist eine Libary für moderne frontend Entwicklung.
import { Container } from 'reactstrap' // von Bootstrap, hilft das Layout der Seite aufzubauen

import LoadingAnimation from '../components/LoadingAnimation' // erzeugt die Ladeanimation
import SensorDataTable from '../components/SensorDataTable' // erzeugt die Tabelle mit Werten

import useAxios from '../hooks/useAxios' //daten werden von dem Server geholt
import useInterval from '../hooks/useInterval' //daten werden von dem Server geholt

import styles from './Home.module.scss' // Klassen mit CSS Styles

const initialNumberOfMeasurementsToDisplay = 10 // Variable für die anzuzeigenden Messungen
const interval = 20 * 1000 // 20 Sekunden

const Home = () => {
  const [numberOfMeasurements, setNumberOfMeasurements] = useState(
    initialNumberOfMeasurementsToDisplay,
  )
  //reactcomponent für die Homepage
  const { data, isLoading, isError, doFetch } = useAxios(
    `/api/mariaDB/latestMeasurements?count=${numberOfMeasurements}`,
  )

  useInterval(() => {
    setNumberOfMeasurements(numberOfMeasurements + 1)
    doFetch(`/api/mariaDB/latestMeasurements?count=${numberOfMeasurements + 1}`)
  }, interval)

  if (isLoading) return <LoadingAnimation /> // Wenn es ladet dann zeigt es die Ladeanimation
  if (isError) return <h2>Ein Fehler ist aufgetreten!</h2> // Wenn ein Fehler auftretet

  return (
    //Homepage wird ausgegeben/ gerendert
    <Container>
      <div className={styles.distance}>
        <h1>Home</h1>
        <br />
        <SensorDataTable
          title={`Letzte ${numberOfMeasurements} Messungen`}
          sensorData={data || []}
        />
      </div>
    </Container>
  )
}

export default Home
