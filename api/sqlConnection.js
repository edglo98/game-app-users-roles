const sql = require('mssql')

const config = {
  user: process.env.user,
  password: process.env.password,
  server: process.env.server,
  database: process.env.database,
  options: {
    encrypt: true,
    enableArithAbort: true
  }
}

sql.on('error', (err) => {
  return err
})

const runQuery = (query) => {
  return sql.connect(config).then((pool) => {
    const e = pool.query(query)
    return e
  })
}

module.exports = {
  runQuery
}
