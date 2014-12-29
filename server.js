var express = require('express'),
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    CollectionDriver = require('./collectionDriver').CollectionDriver;
    bodyParser = require('body-parser')

var app = express();
var collectionDriver;
app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

  MongoClient.connect("mongodb://fifthdonut:fifthdonut123@kahana.mongohq.com:10051/Websheets", {native_parser:true}, function(err, db) 
  	{
  		if(err)
  		{
  			console.log("Trouble connecting to the database ...");
  		}
  		else
  		{
  			console.log("Connected to the database sucessfully ...");
  			collectionDriver = new CollectionDriver (db);
  		}

  	});

app.get('/', function(req, res){

res.send('Get is working');

});

app.put('/sheetSync', function(req, res){


	//var jsonString = JSON.stringify(req.body);
	var keyOut ="";

	for(var key in req.body)
	{
		keyOut = key;
		console.log( "key = " + keyOut);
		var data= req.body[key];

		console.log( "data.length= " + data.length);
		

		for (i=0; i<data.length; i++)
		{
			for (var key in data[i])
			{
				//console.log("date[" + i+ "] = " +data[i].toString());
				console.log("data key = " + key);

		   }
		   collectionDriver.upsert(keyOut, data[i],"PhoneNumber",function(err,docs) {
          	if (err) { console.log(err); } 
          else { console.log("upsert Success"); } 
     });
		}


	}

//var key = req.body.keys();


	//console.log("body = " + jsonString);
	//res.send("key = " + keyOut);
});

app.listen(app.get('port'));
console.log("listening on port : " + app.get('port'));