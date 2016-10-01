const express = require('express');
const bodyParser = require('body-parser');
const bot = require('./bot');

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
