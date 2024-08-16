const { Pool } = require('pg');
const pool = new Pool({
    host: 'database',
    port: 5432,
    user: 'admingemink',
    password: 'p@55word',
    database: 'logindb'
})

module.exports = pool;
