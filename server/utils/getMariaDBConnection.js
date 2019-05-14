const mariadb = require('mariadb')
const { DB_HOST, DB_USER, DB_PASSWORD } = process.env

const host = DB_HOST
const port = 3306
const user = DB_USER
const password = DB_PASSWORD

const dbConnectionPool = mariadb.createPool({
  host,
  port,
  user,
  password,
  connectionLimit: 10,
})

const getMariaDBConnection = async () => {
  try {
    const connection = await dbConnectionPool.getConnection()
    console.info('MariaDB connection successfully established ')
    return connection
  } catch (error) {
    console.error(error)
  }
}

module.exports = getMariaDBConnection
