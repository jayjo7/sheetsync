var express = require('express'),
    MongoClient = require('mongodb').MongoClient,
   // Server = require('mongodb').Server,
    CollectionDriver = require('./collectionDriver').CollectionDriver;
    bodyParser = require('body-parser')

var app = express();
var collectionDriver;
app.set('port', process.env.PORT || 3000);
app.set('mongodb_url', process.MONGO_URL || "mongodb://fifthdonut:fifthdonut123@kahana.mongohq.com:10051/Websheets");
app.set('sheet_uniqueid_column_name', process.SHEET_UNIQUEID_COLUMN_NAME || "WebId");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


MongoClient.connect(app.get('mongodb_url'), {native_parser:true}, function(err, db) 
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

app.get('/', function(req, res)
	{

		res.send('Get is working');

	});

app.put('/sheetSync', function(req, res)
{
	var result = true;
	var failure=[];

	for(var key in req.body)
	{
		

		console.log( "Working with the worksheet = " + key);

		var data= req.body[key];

		console.log( "Number of records received = " + data.length);
		

		for (i=0; i<data.length; i++)
		{

		   collectionDriver.upsert(key, data[i], app.get('sheet_uniqueid_column_name') ,function(err,docs) 
		   {
          		if (err) 
          			{ 
          				console.log(err); 
          				result = false;
          				failure.push(data[i][app.get('sheet_uniqueid_column_name')]);

          			}  
     		});
		}


	}
	if (result)
	{
		var resultObject ={"result": "Success"};

		res.send(resultObject);	
	}
	else
	{
		res.send(failure);
	}

	
});

app.listen(app.get('port'));
console.log("listening on port : " + app.get('port'));