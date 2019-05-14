const resetDB = async () => {
  try {
    const response = await fetch('/api/mariaDB/resetDB', {
      method: 'DELETE',
    })

    const { status } = response

    if (status === 200) console.info('Successfully dropped and recreated db!')

    window.location.reload()
  } catch (err) {
    console.error(err)
  }
}

export default resetDB
