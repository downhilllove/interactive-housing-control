import React, { createContext, useReducer } from 'react'
import PropTypes from 'prop-types'

export const defaultSensorDataContext = {
  lastFetched: 0,
  data: [],
}

export const actionTypes = {
  ADD_SENSOR_DATA: 'ADD_SENSOR_DATA',
}

const { ADD_SENSOR_DATA } = actionTypes

const SensorDataContext = createContext(defaultSensorDataContext)

const expensesReducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case ADD_SENSOR_DATA:
      return {
        lastFetched: payload.lastFetched,
        data: [...state.data, ...payload.data],
      }

    default:
      return state
  }
}

export const SensorDataContextProvider = ({ children }) => {
  const [sensorData, dispatch] = useReducer(
    expensesReducer,
    defaultSensorDataContext,
  )
  return (
    <SensorDataContext.Provider value={{ sensorData, dispatch }}>
      {children}
    </SensorDataContext.Provider>
  )
}

SensorDataContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const SensorDataContextConsumer = SensorDataContext.Consumer

export default SensorDataContext
