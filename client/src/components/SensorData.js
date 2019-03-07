/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Table } from 'reactstrap'

import getSensorData from '../apis/getSensorData'

const SensorData = () => {
  const [sensorData, setSensorData] = useState(null)

  const fetchSensorData = async () => {
    try {
      const data = await getSensorData()
      setSensorData(data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchSensorData()
  }, [])

  if (!sensorData) return null

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Zeipunkt</th>
            <th>Temperatur</th>
            <th>Luftfeuchtigkeit</th>
          </tr>
        </thead>
        <tbody>
          {sensorData.map(
            ({ _id, date, temperatureCelsius, humidityPercentage }) => {
              return (
                <tr key={_id}>
                  <td>{date}</td>
                  <td>{temperatureCelsius} °C</td>
                  <td>{humidityPercentage} %</td>
                </tr>
              )
            },
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default SensorData