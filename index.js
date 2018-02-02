
/**
 * Module dependencies.
 */
var express    = require('express');
var bodyParser = require('body-parser');
var port     = process.env.PORT || 5000; // set our port

var app = module.exports = express();
 
// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

 
app.use(express.urlencoded({ extended: false }))
function errorHandler(err, req, res, next) {
  console.error(err.stack)
  res.setHeader('Content-Type', 'application/json');
  res.status(400);

		res.format({

			json: function () {
				res.json({ error: 'Could not decode request: JSON parsing failed'})
			},
			default: function () {
				res.type('txt').send('Could not decode request: JSON parsing failed')
			}
		})
}
app.use(errorHandler)

app.get('/', function(req, res){
   res.setHeader('Content-Type', 'application/json');
	
   res.send('Please post Payloads');
});

app.post('/', function(req, res){
	function getPayload(input=null )
	{
		if (input && input.payload &&  Array.isArray(input.payload ))
			return  input.payload ;
		return null;
	}
	function getResponse(payload)
	{

		var response =  payload.filter(word => word.drm=== true && word.episodeCount >0)
		.map(function(x) {return {image :(x.image)? x.image.showImage:  '', slug: x.slug , title: x.title   } });

		return {response: response};

	}
	res.setHeader('Content-Type', 'application/json');
	var payload =  getPayload( req.body); 
	if(payload)
	{

		var response = getResponse(payload);

	    res.send( JSON.stringify(response));
	 	
	}
	else
	{
		errorHandler()
	 
	}
});


 
  app.listen(port);
  console.log('Express started on port 5000');
 
 