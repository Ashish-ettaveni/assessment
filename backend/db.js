const { Pool } = require('pg');
const colors = require('colors')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database:'NewDB',
  password: 'root',
  port: 5432,
});
console.log("connected successfully".bgGreen.white)
module.exports = pool;
