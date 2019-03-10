import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'reactstrap'
import moment from 'moment'

const SensorDataTable = ({
  title = '',
  sensorData = [],
  dateFormatter = 'DD.MM.YYYY HH:MM:ss',
}) => {
  return (
    <div>
      <h3>{title}</h3>
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
              const formattedDate = moment(date).format(dateFormatter)
              return (
                <tr key={_id}>
                  <td>{formattedDate}</td>
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

SensorDataTable.propTypes = {
  title: PropTypes.string.isRequired,
  sensorData: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  dateFormatter: PropTypes.string,
}

export default SensorDataTable
