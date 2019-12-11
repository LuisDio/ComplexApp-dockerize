const keys = require('./keys');

// Express App Setup
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
// allow us to make request from one domain
// to a completly different domain
app.use(cors());
// Parse incoming request from the react
// application and turn body into json value
// which express can use for its work
app.use(bodyParser.json());

// Postgres client Setup
const { Pool } = require('pg');
const pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort
})
