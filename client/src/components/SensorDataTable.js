import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'reactstrap'
import moment from 'moment'

import { formatNumberWithMaxFractionDigits } from '../utils/formatNumber'

const SensorDataTable = ({
  title = '',
  sensorData = [],
  dateFormatter = 'DD.MM.YYYY HH:mm:ss',
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
            ({ id, date, temperatureCelsius, humidityPercentage }) => {
              const formattedDate = moment(date).format(dateFormatter)
              return (
                <tr key={id || formattedDate}>
                  <td>{formattedDate}</td>
                  <td>
                    {formatNumberWithMaxFractionDigits(temperatureCelsius, 2)}{' '}
                    °C
                  </td>
                  <td>
                    {formatNumberWithMaxFractionDigits(humidityPercentage, 2)} %
                  </td>
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
