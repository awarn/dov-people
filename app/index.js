
"use strict";

require('dotenv').config();

var express = require('express');
let bodyParser = require('body-parser')
var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(function (req, res) {
	console.log(JSON.stringify(req.body, null, 2))
	res.setHeader('Content-Type', 'text/plain')
	res.write('you posted:\n')
	res.end(JSON.stringify(req.body, null, 2))
})

// app.get('/', function (req, res) {
// 	console.log(req)
// 	res.send('Hello World!');
// });

// app.post('/', function () {
// 	console.log(req.body);
// 	res.send({ status: success });
// });

app.listen(process.env.PORT, function () {
	console.log('Example app listening on port ' + process.env.PORT);
});

