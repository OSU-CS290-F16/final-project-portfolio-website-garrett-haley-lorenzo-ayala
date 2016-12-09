var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var mysql = require('mysql');

var app = express();
var usersData = require('./person-data')
var port = process.env.PORT || 3000;

var mysqlHost = "mysql.cs.orst.edu";
var mysqlUser = "cs290_haleyg";
var mysqlPassword = "9184";
var mysqlDB = "cs290_haleyg";
var mysqlConnection = mysql.createConnection({
  host: mysqlHost,
  user: mysqlUser,
  password: mysqlPassword,
  database: mysqlDB
});

// Use Handlebars as the view engine for the app.
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars');

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){

  mysqlConnection.query('SELECT * FROM person', function(err, rows){

    if(err){
      console.log("== error getting data from person: ", err)
      res.status(500).send("error getting data from person:" + err)

    } else{

      var personName= [];
      rows.forEach(function(row){
        personName.push({
          userID: row.userID,
          name: row.name
        });
      });
      res.render('index-page',{
      usersData: personName
    });


  }

  });
});


app.get('/post/:person',function(req, res){
console.log("before query logged "+ req.params.person)
  mysqlConnection.query('SELECT * FROM person WHERE userID=?', [req.params.person], function(err,rows){
console.log("just made the query", rows);
    if(err){
      console.log("==error getting person requested", err);
      res.status(500).send("error fetching person requested: " + err)

    } else if(rows.length >= 1){

      var person = rows[0];

      mysqlConnection.query('SELECT * FROM post WHERE userID= ?', [req.params.person],function(err, rows){

        if(err){
          console.log("==error getting posts for person", err);
          res.status(500).send("error getting posts for person "+ err);
        } else{
          var post= [];
          rows.forEach(function (row){
            post.push({
              userID: row.userID,
              date: row.date,
              details: row.details

            });
          });
          person.post= post;
          res.render('post-page',{
            person: person,
            userName: person.name
          });
        }
      });
    }
  });
});

app.post('/post/:person/add-post', function (req, res, next) {

  console.log(req.body)
  console.log(req.body.details)
if (req.body && req.body.details) {
mysqlConnection.query(
  'INSERT INTO post (userID, date, details) VALUES (?, ?, ?)',
  [ req.params.person, req.body.date, req.body.details ],
  function (err, result) {
    if (err) {

      console.log("== Error inserting photos for person (", req.params.person, ") from database:", err);
      res.status(500).send("Error inserting photos itnto database: " + err);
    }
    res.status(200).send();
  });
} else {
res.status(400).send("Person photo must have a URL.");
}

});



app.get('*', function(req, res){
  res.status(404).render('404-page')
});

mysqlConnection.connect(function(err){
  if(err){
  console.log("==unable to connect to database.")
  throw err;
}
// Listen on the specified port.
app.listen(port, function () {
  console.log("== Listening on port", port);
});
});
