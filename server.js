const express = require('express');
const { Pool, Client } = require('pg');
var fs = require("fs");
var app = express();
var ibIndex;
var pool;
app.use(express.static('static'));

app.listen(process.env.PORT || 3000);

app.get('/', (req, res) => {
    res.sendFile('static/index.html', {root: __dirname });
});

app.get('/randomicebreaker', (req, res) => {
	getRandomIB(res);
});

function setupPool() {
	var contents = fs.readFileSync("config.json");
	var configFile = JSON.parse(contents);
	pool = new Pool({
  		user: configFile.user,
  		host: configFile.host,
  		database: configFile.database,
  		password: configFile.password,
  		port: configFile.port
	});
}

async function getRandomIB(response) {
	setupPool();
	await pool.query('SELECT count(*) from icebreakers', function(err, result) {
		console.log('querying for count of rows in DB');
		if (err) {
			console.log('error so returning from count query function');
			return;
		} else {
			console.log('no error so returning ib index');
			ibIndex = result.rows[0].count;
			ibIndex = Math.floor(Math.random() * ibIndex);
		}
	});

	pool.query('SELECT * from icebreakers', function(err, result) {
		console.log('querying for ice breaker row');
		if(err) {
			console.log('error in querying for ice breaker row');
			response.send(JSON.parse('{"ibtext": "Having trouble connecting."}'));
		} else {
			console.log('no error so returning ice breaker row');
			response.send(result.rows[ibIndex]);
		}
	});
}