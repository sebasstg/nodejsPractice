var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(morgan('dev'));

app.use(bodyParser.json());

app.all('/dishes', function (req, res, next) {
    console.log("all");
    res.writeHead(200, {'Content-Type': 'text/plain'});
    next();
});

app.get('/dishes',function (req,res,next) {
    console.log("get");
    res.end('Will send all the dishes to you');
});



app.post('/dishes', function (req,res,next) {
    console.log("post");
    res.end('Will add the dish: '+req.body.name+' with details: '+req.body.description);
});

app.delete('/dishes', function (req,res,next) {
    console.log("delete");
    res.end('Deleting all dishes');
});

app.get('/dishes/:dishId', function (req,res,next) {
    console.log("get "+req.params.dishId);

    res.end('Will send details of the dish: ' + req.params.dishId +' to you!');
});

app.put('/dishes/:dishId',function (req,res,next) {
    console.log("put "+req.params.dishId);

    res.write('Updating the dish: '+req.params.dishId);
    res.end('Will update the dish: ' + req.body.name +
        ' with details: ' + req.body.description);
});

app.delete('/dishes/:dishId', function(req, res, next){
    res.end('Deleting dish: ' + req.params.dishId);
});

app.use(express.static(__dirname + '/public'));

app.listen(port, hostname, function () {
    console.log("Server running at http://${hostname}:${port}/");
});
