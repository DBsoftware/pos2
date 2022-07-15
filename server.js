var express  = require('express');
var app      = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
var path = require('path')

var https = require('https');

var fs = require('fs');

var https_options = {
  key: fs.readFileSync("./my_store.key"),
  cert: fs.readFileSync("./aiodc_com.crt"),
  ca: [
          fs.readFileSync('./TrustedRoot.crt'),

          fs.readFileSync('./DigiCertCA.crt')
       ]
};



app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(cors());

console.log('Start server initialization');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.static(__dirname + '/dist/restaurantManager'));
app.set('port', process.env.PORT || 3000);

https.createServer(https_options, app).listen(
  app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
  }
);
// app.listen(app.get('port'), function () {
//   console.log('Express server listening on port ' + app.get('port'));
// });

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/restaurantManager/index.html'))
})
