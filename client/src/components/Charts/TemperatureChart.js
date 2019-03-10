import React from 'react'
import PropTypes from 'prop-types'
import Chart from 'react-apexcharts'

import styles from './Chart.module.scss'

const getOptions = labels => ({
  dataLabels: {
    enabled: true,
  },
  stroke: {
    curve: 'smooth',
  },
  xaxis: {
    categories: labels,
  },
})

const TemperatureChart = ({ temperatures, labels, unit = 'celsius' }) => {
  const series = [
    {
      name: 'Temperatur',
      data: temperatures.map(temperature => Math.round(temperature)),
    },
  ]

  const options = getOptions(labels, unit)

  return (
    <div className={styles.wrapper}>
      <Chart options={options} series={series} type="area" height="350" />
    </div>
  )
}

TemperatureChart.propTypes = {
  temperatures: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  labels: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  unit: PropTypes.string,
}

export default TemperatureChart
