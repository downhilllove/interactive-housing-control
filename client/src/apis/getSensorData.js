const getSensorData = async () => {
  try {
    const response = await fetch('/api/sensorData')
    const sensorData = await response.json()

    if (!sensorData) console.error('Failed to fetch sensor data from server')

    return sensorData
  } catch (err) {
    console.error(err)
  }
}

export default getSensorData
