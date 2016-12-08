var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var app = express();
//var usersData = require('./users-data');
var port = process.env.PORT || 3000;

// Use Handlebars as the view engine for the app.
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  res.render('index-page')
});

app.get('*', function(req, res){
  res.status(404).render('404-page')
});

// Listen on the specified port.
app.listen(port, function () {
  console.log("== Listening on port", port);
});
