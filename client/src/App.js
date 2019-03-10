import React, { useEffect, useContext } from 'react'
import { Switch, Route } from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'

import Home from './pages/Home'
import About from './pages/About'
import Overview from './pages/Overview'

import getSensorData from './apis/getSensorData'

import SensorDataContext, { actionTypes } from './context/SensorDataContext'
const { ADD_SENSOR_DATA } = actionTypes

const App = () => {
  const { dispatch } = useContext(SensorDataContext)

  const fetchSensorData = async () => {
    try {
      const data = await getSensorData()
      dispatch({
        type: ADD_SENSOR_DATA,
        payload: {
          lastFetched: new Date().getTime(),
          data,
        },
      })
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchSensorData()
  }, [])

  return (
    <>
      <Header />
      <main>
        <Switch>
          <Route path="/uebersicht" component={Overview} />
          <Route path="/ueber-uns" component={About} />
          <Route path="/" component={Home} />
        </Switch>
      </main>
      <Footer />
    </>
  )
}

export default App
