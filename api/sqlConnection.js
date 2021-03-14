const sql = require('mssql');

const config = {
  user: 'pablobubu14_SQLLogin_1',
  password: process.env.password,
  server: 'HeyBookDB.mssql.somee.com',
  database: 'HeyBookDB',
  options: {
    encrypt : true,
    enableArithAbort : true
  },
}

sql.on('error', err => {
  console.log('Base de datos no conectada')
})

const runQuery = (query) => {
  return sql.connect(config).then((pool) => {
    const e = pool.query(query);
    return e;
  })
}

module.exports = {
  runQuery
};


