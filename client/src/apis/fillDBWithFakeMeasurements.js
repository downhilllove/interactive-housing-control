const fillDBWithFakeMeasurements = async () => {
  try {
    const response = await fetch('/api/mariaDB/fillWithFakeMeasurements', {
      method: 'PUT',
    })

    const { status } = response

    if (status === 200)
      console.info('Successfully wrote fake sensor measurements to db!')

    window.location.reload()
  } catch (err) {
    console.error(err)
  }
}

export default fillDBWithFakeMeasurements
