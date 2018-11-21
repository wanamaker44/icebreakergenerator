const express = require('express');
var app = express();
app.use(express.static('static'));

ibOne = {text:"This is ibOne", creator: "wwanamaker"};
ibTwo = {text:"This is ibTwo", creator: "wwanamaker"};
ibThree = {text:"This is ibThree", creator: "wwanamaker"};
ibFour = {text:"This is ibFour", creator: "wwanamaker"}
iceBreakers = [ibOne, ibTwo, ibThree, ibFour];

app.get('/', (req, res) => {
    res.sendFile('/static/index.html', {root: __dirname });
});

app.get('/randomicebreaker', (req, res) => {
	var ibIndex = Math.floor(Math.random() * 4);

	// create call to DB for record. Get count first I guess then randomize that number

	res.send(iceBreakers[ibIndex]);
});

app.listen(process.env.PORT || 3000)