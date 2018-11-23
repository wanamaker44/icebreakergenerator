const express = require('express');
const { Pool, Client } = require('pg')
var app = express();
app.use(express.static('static'));
var ibIndex;
var pool;

app.get('/', (req, res) => {
    res.sendFile('static/index.html', {root: __dirname });
});

app.get('/randomicebreaker', (req, res) => {
	getRandomIB(res);
});

function setupPool() {
	pool = new Pool({
  		user: 'postgres',
  		host: 'localhost',
  		database: 'postgres',
  		password: 'mysecretpassword',
  		port: 5432
	});
}

async function getRandomIB(response) {
	setupPool();
	await pool.query('SELECT count(*) from icebreakers', function(err, result) {
		ibIndex = result.rows[0].count;
		ibIndex = Math.floor(Math.random() * ibIndex);
	});

	pool.query('SELECT * from icebreakers', function(err, result) {
		response.send(result.rows[ibIndex]);
	});
}
	
app.listen(process.env.PORT || 3000)