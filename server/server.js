require('./configs/config.js');
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var path = require('path');
var cors = require('cors');
const port=process.env.PORT;
// Init App
var app = express();
app.use(cors());

//Logger
app.use(morgan('dev'));


// BodyParser Middleware
app.use(bodyParser.json({
  limit: '50mb'
}));
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '50mb'
}));

//Set view to angular folder
// app.use(express.static(path.join(__dirname, './../public')));

//Setting routes main file
app.use('/', require('./controllers/index.js'));

// Set Port
app.set('port', (process.env.PORT || 3000));

// catch 404 and forward to error handler
app.get('*', function (req, res, next) {
  req.status = 404;
  next("Page Not Found!!");
});

// error handler
app.use(function (err, req, res, next) {
  res.send(err);
});

//listening port
app.listen(port, function () {
  console.log(`Started up at port ${port}`);
});