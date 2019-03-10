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
  yaxis: {
    min: 0,
    max: 100,
  },
  xaxis: {
    categories: labels,
  },
  theme: {
    monochrome: {
      enabled: true,
      color: '00E396',
    },
  },
})

const HumidityChart = ({ humidities, labels }) => {
  const series = [
    {
      name: 'Luftfeuchtigkeit',
      data: humidities,
    },
  ]

  const options = getOptions(labels)

  return (
    <div className={styles.wrapper}>
      <Chart options={options} series={series} type="area" height="350" />
    </div>
  )
}

HumidityChart.propTypes = {
  humidities: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  labels: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
}

export default HumidityChart
