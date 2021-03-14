const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
require('dotenv').config();

const moduloR = require('./modulos');
const admistradorR = require('./administradores');
const modAdmR = require('./admMod');
const loginR = require('./auth');

app.use('/modulos', moduloR);
app.use('/admin', admistradorR);
app.use('/MA', modAdmR);
app.use('/login', loginR);

module.exports = app

if (require.main === module) {
  const port = process.env.PORT || 3001
  app.listen(port, () => {

    console.log(`API server listening on port ${port}`)
  })
}
