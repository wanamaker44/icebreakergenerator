const express = require('express');
const { Pool, Client } = require('pg');
 var fs = require("fs");
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
		if (err) {
			return;
		} else {
			ibIndex = result.rows[0].count;
			ibIndex = Math.floor(Math.random() * ibIndex);
		}
	});

	pool.query('SELECT * from icebreakers', function(err, result) {
		if(err) {
			response.send(JSON.parse('{"ibtext": "Having trouble connecting."}'));
		} else {
			response.send(result.rows[ibIndex]);
		}
	});
}
	
app.listen(process.env.PORT || 3000)