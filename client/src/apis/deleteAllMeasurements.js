const deleteAllMeasurements = async () => {
  try {
    const response = await fetch('/api/deleteAllMeasurements', {
      method: 'DELETE',
    })

    const { status } = response

    if (status === 200) console.info('Successfully dropped db!')
  } catch (err) {
    console.error(err)
  }
}

export default deleteAllMeasurements
