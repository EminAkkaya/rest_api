const {Pool} = require('pg');

require('dotenv').config();

host = process.env.HOST;
user = process.env.USER;
password = `${process.env.PASSWORD}`;
db = process.env.DB;


const pool = new Pool({
    host: host,
    user: user,
    port : 5432,
    password: password,
    db : db,
});

module.exports = pool;