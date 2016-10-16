var express = require('express'),
    request = require('request'),
    bodyParser = require('body-parser'),
    http = require('http'),
    emailer = require('nodemailer'),
    app = express();

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 

// vars for Couch DB
var dbUrl = 'http://localhost:5984/';
//var db = 'eventapp/';

// url for creating CouchDB databse
// http://localhost:5984/user
// http://localhost:5984/event

// Load script files when http server starts
app.use('/scripts', express.static('scripts', {index: false}));
app.use('/CSS', express.static('CSS', {index: false}));
app.use('/Models', express.static('Models', {index: false}));

app.set('view engine', 'ejs');
app.set('Views', __dirname + '/Views');

app.get('/', function (req, res) {
  res.render('index.ejs', {layout: 'layout.ejs'});
});

app.get('/signin', function (req, res) {
  res.render('signin.ejs', {layout: 'layout.ejs'});
});

app.get('/signup', function (req, res) {
  res.render('signup.ejs', {layout: 'layout.ejs'});
});

app.get('/myaccount', function (req, res) {
  res.render('myAccount.ejs', {layout: 'layout.ejs'});
});


app.post('/signup', function(req, res){
  var id = req.body.userName;
  var table = "user/";

  request.put({
    url: dbUrl + table + id,
    header: 'Content-Type: application/json',
    body:{
      email: req.body.email,
      password: req.body.password
    },
    json: true
  }, function(error, response, body){
    if(error){
      console.log(error);
      res.send(error);
    }
    else if(body.error){
      console.log(body.error);
      res.send(body.error);
    }
    else{
      console.log('The account has been successfully created.');
      res.end();
    }
  });
});

app.post('/signin', function(req, res){
    var id = req.body.userName;
    var password = req.body.password;
    var table = "user/";

    request.get({
      url: dbUrl + table + id,
      header: "Content-Type: application-json",
      json: true
    }, function(error, response, body){
      if(error){
        console.log(error);
        res.send(error);
      }
      else if(body.error){
        console.log(body.error);
        res.send(body.error);
      }
      else{
        if (password === body.password){
          console.log("Log in: " + id + ", " + Date.now());
          res.end();
        } else {
          res.send("Password incorrect");
        }
      }
    });
});



app.listen(8000, function(){
    console.log('The server is listening port 8000');
});