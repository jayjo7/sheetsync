var express = require('express'),
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    CollectionDriver = require('./collectionDriver').CollectionDriver;
    bodyParser = require('body-parser')

var app = express();
app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){

res.send('Get is working');

});

app.put('/sheetSync', function(req, res){


	var jsonString = JSON.stringify(req.body);
	var keyOut ="";
	for(var key in req.body)
	{
		keyOut = key;
		console.log( "key = " + key);
	}

//var key = req.body.keys();


	//console.log("body = " + jsonString);
	res.send("key = " + keyOut);
});

app.listen(app.get('port'));
console.log("listening on port : " + app.get('port'));