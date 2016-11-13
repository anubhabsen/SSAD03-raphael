const express = require('express');
const bodyParser = require('body-parser');
const bot = require('./bot');
var levelup = require('levelup');
var db = levelup('./reqdb');
var emaildb = levelup('./emaildb')
var time = require('time');
var validator = require("email-validator");

const app = express();

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.render('index');
});

app.post('/', function(req, res, next) {
  const postData = { input: req.body.input };
  timeNow = time.Date().toString();
  db.put(timeNow, postData.input, function (err) {
    if (err) return console.log('Ooops!', err)
  })
  inputQuery = postData.input;
  inputQuery = inputQuery.split(" ");
  inputQuery.forEach(function(item, index) {
    if(validator.validate(item))
    {
      timeNow = time.Date().toString();
      emaildb.put(timeNow, item, function (err) {
        if (err) return console.log('Ooops!', err)
      })
    }
    else if(validator.validate(item.substring(0, item.length - 1)))
    {
      timeNow = time.Date().toString();
      emaildb.put(timeNow, item.substring(0, item.length - 1), function (err) {
        if (err) return console.log('Ooops!', err)
      })
    }
  })
  if (req.body.clientName) {
    postData.client_name = req.body.clientName;
    bot.talk(postData, botResponseHandler);
  } else {
    bot.atalk(postData, botResponseHandler);
  }

  function botResponseHandler(err, botResponse) {
    if (err) {
      return next(err);
    }
    const resp = { text: botResponse.responses.join(' ') };
    if (botResponse.client_name) {
      resp.clientName = botResponse.client_name;
    }
    res.send(resp);
  }
});

module.exports = app;
