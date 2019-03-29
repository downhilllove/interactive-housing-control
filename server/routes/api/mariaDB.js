const express = require('express')
const router = express.Router()
const moment = require('moment')
const createFakeMeasurements = require('../../utils/createFakeMeasurements')

const getMariaDBConnection = require('../../utils/getMariaDBConnection')
const database = process.env.DB_DATABASE || 'interactiveHousingControl'
const tableName = 'Measurements'

/*const getInsertQuery = ({ date, temperatureCelsius, humidityPercentage }) =>
`INSERT INTO ${tableName} (date, temperatureCelsius, humidityPercentage) VALUES ("${formatDateTimeForMariaDB(
  date,
)}", ${temperatureCelsius}, ${humidityPercentage});`*/

const formatDateTimeForMariaDB = date =>
  moment(date).format('YYYY-MM-DD HH:mm:ss')

const createTableQuery = `
CREATE TABLE ${tableName} (
    id INT PRIMARY KEY AUTO_INCREMENT,
    date DATETIME,
    temperatureCelsius FLOAT,
    humidityPercentage FLOAT
);
`

// @route   GET api/mariaDB/allMeasurements
// @desc    Get all measurements
// @access  Public
router.get('/allMeasurements', async (req, res) => {
  try {
    const dbConnection = await getMariaDBConnection()
    await dbConnection.query(`USE ${database};`)
    const measurements = await dbConnection.query(`SELECT * FROM ${tableName};`)
    res.json(measurements)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error })
  }
})
// @route   GET api/mariaDB/latestMeasurements
// @desc    Get latest n measurements
// @access  Public
router.get('/latestMeasurements', async (req, res) => {
  const numberOfMeasurements = req.query.count || 10

  const query = `
  SELECT *
  FROM Measurements
  ORDER BY date DESC
  LIMIT ${numberOfMeasurements}
  `

  try {
    const dbConnection = await getMariaDBConnection()
    await dbConnection.query(`USE ${database};`)
    const measurements = await dbConnection.query(query)
    res.json(measurements)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error })
  }
})

// @route   GET api/mariaDB/averageMeasurementsPerDay
// @desc    Get average measurements grouped by day
// @access  Public
router.get('/averageMeasurementsPerDay', async (req, res) => {
  const query = `
  SELECT
    id,
    DATE(date) AS date,
    AVG(temperatureCelsius) AS averageTemperatureCelsius,
    AVG(humidityPercentage) AS averageHumidityPercentage
  FROM ${tableName}
  GROUP BY DATE(date)
  `

  try {
    const dbConnection = await getMariaDBConnection()
    await dbConnection.query(`USE ${database};`)
    const measurements = await dbConnection.query(query)
    res.json(measurements)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error })
  }
})

// @route   GET api/mariaDB/resetDB
// @desc    Drop and recreate db and Measurements table
// @access  Public
router.get('/resetDB', async (req, res) => {
  try {
    const dbConnection = await getMariaDBConnection()
    await dbConnection.query(`CREATE OR REPLACE DATABASE ${database};`) // Reset the database
    console.info(`Dropped and created database ${database}`)
    await dbConnection.query(`USE ${database};`)
    console.info(`Reselected database ${database}`)
    await dbConnection.query(createTableQuery)
    console.info(`Successfully created table ${tableName}`)

    res.json(true)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error })
  }
})

// @route   GET api/mariaDB/fillWithFakeMeasurements
// @desc    Fill database with fake measurements
// @access  Public
router.get('/fillWithFakeMeasurements', async (req, res) => {
  const fakeMeasurements = createFakeMeasurements()

  const batchQuery = {
    sql: `INSERT INTO ${tableName} (date, temperatureCelsius, humidityPercentage) VALUES (?, ?, ?);`,
    values: fakeMeasurements.map(
      ({ date, temperatureCelsius, humidityPercentage }) => [
        formatDateTimeForMariaDB(date),
        temperatureCelsius,
        humidityPercentage,
      ],
    ),
  }

  try {
    const dbConnection = await getMariaDBConnection()
    await dbConnection.query(`USE ${database};`)
    console.info(`Selected database ${database}`)
    const result = await dbConnection.batch(batchQuery.sql, batchQuery.values)
    console.info(
      `Inserted ${result.affectedRows} fake measurements into ${tableName}`,
    )

    res.json(result)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error })
  }
})

module.exports = router
