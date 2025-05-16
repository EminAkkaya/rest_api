const {pool} = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    port : 5432,
    password: '1234',
    db : 'restapi',
});

module.exports = pool;