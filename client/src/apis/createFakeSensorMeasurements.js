const createFakeSensorMeasurements = async () => {
  try {
    const response = await fetch('/api/createFakeSensorMeasurements')
    const { status } = response

    if (status === 200)
      console.info('Successfully wrote fake sensor measurements to db!')
  } catch (err) {
    console.error(err)
  }
}

export default createFakeSensorMeasurements
