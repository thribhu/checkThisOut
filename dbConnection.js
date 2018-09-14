const {Pool, Client } = require('pg');
const pool = new Pool({
    user: 'techbuddies',
    host: 'mystore.ck1wujocvz7c.us-west-2.rds.amazonaws.com',
    database: 'mystore',
    password:'changeme123',
});

pool.query('SELECT * FROM filings.sp_next_filing_state()', (err, res) => {
    if (err) {
        console.log(err);
    }
    console.log(res);
    pool.end()
});