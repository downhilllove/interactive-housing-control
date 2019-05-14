import React from 'react' // ist eine Libary für moderne frontend Entwicklung.
import { Container } from 'reactstrap' // von Bootstrap, hilft das Layout der Seite aufzubauen

import LoadingAnimation from '../components/LoadingAnimation' // erzeugt die Ladeanimation
import SensorDataTable from '../components/SensorDataTable' // erzeugt die Tabelle mit Werten

import useAxios from '../hooks/useAxios' //daten werden von dem Server geholt

import styles from './Home.module.scss' // Klassen mit CSS Styles

const numberOfLatestMeasurementsToDisplay = 10 // Variable für die anzuzeigenden Messungen

const Home = () => {
  //reactcomponent für die Homepage
  const { data, isLoading, isError } = useAxios(
    `/api/mariaDB/latestMeasurements?count=${numberOfLatestMeasurementsToDisplay}`,
  )

  if (isLoading) return <LoadingAnimation /> // Wenn es ladet dann zeigt es die Ladeanimation
  if (isError) return <h2>Ein Fehler ist aufgetreten!</h2> // Wenn ein Fehler auftretet

  return (
    //Homepage wird ausgegeben/ gerendert
    <Container>
      <div className={styles.distance}>
        <h1>Home</h1>
        <br />
        <SensorDataTable
          title={`Letzte ${numberOfLatestMeasurementsToDisplay} Messungen`}
          sensorData={data || []}
        />
      </div>
    </Container>
  )
}

export default Home
