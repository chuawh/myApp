var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var request = require('request');

//var routes = require('./routes/index');
//var users = require('./routes/users');

var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', routes);

app.get('/',function(req, res, next) {
  res.send('App is up and running');  
});


app.post('/users', function (req, res,next) {

  res.send('You are lucky!!!!');
  console.log('The Spark Webhook Post is: ');
  console.log(req.body);      //  JSON data
  
  getMsg(req.body.data.id);

});



function getMsg(msgId){

var token='Bearer NTE5YWNhMDUtZDUzYy00MDU1LTgzYWMtNGYyOGJhNjgxMDU3NTYxMjA0MmMtM2Y0';

request({
    url: 'https://api.ciscospark.com/v1/messages/' + msgId,
    method: 'GET', 
    headers:{
         'Authorization' : token,
         'Content-type' : 'application/json'
         }
}, function(error, res){
    if(error) {
        console.log(error);
    } else {
        console.log('The response code is ' + res.statusCode + '\n');
        console.log('The json body is: ' + '\n' + res.body + '\n');
    }
    var jsonText=JSON.parse(res.body);
    console.log('The chat message is: ' + jsonText.text + '\n');
    //postHttp(textMsg.text); 

    var mtext=jsonText.text;
    var str1 = mtext.split(" ");
    console.log(str1[0]);
    console.log(str1[1]);
    console.log(str1[2]);

    if (str1[0]=='/inform') {
      postMsg(jsonText.roomId, 'Please wait while we connect your call to ' + str1[1]);
     }else {
        console.log('I will not do anything');
     
       }

     postHttp(str1[2]);  

     /*

     if (str1[0]=='/sms') {
      postMsg(jsonText.roomId, 'We are sending your SMS to ' + str1[1]);
     }else {
        console.log('I will not do anything');
       }
    postHttp();  */

});

};


/*
function postHttp(msg){

var token='6248436a7461745a50424e6f615363576162666672796e436871794e68454a514a444a4162666e784b565851';

request({
    url: 'https://api.tropo.com/1.0/sessions?action=create' + '&token=' + token + '&txt=' + msg,
    method: 'POST', 
}, function(error, response, body){
    if(error) {
        console.log(error);
    } else {
        console.log(response.statusCode, body);
    }
});
};*/

function postHttp(msg){

var token='0b437a811a975d418d6ec35003a1b41db2259d1ac56015d1305905c5a57af795e847c1eda544801fd6a2c84b';
var mobile='+6597809414';
var sparkNumber='84484189@ciscospark.com';

request({
    url: 'https://api.tropo.com/1.0/sessions?action=create' + '&token=' + token + '&mobile=' + mobile + '&sparkNumber=' + sparkNumber + '&msg=' + msg,
    method: 'POST', 
}, function(error, response, body){
    if(error) {
        console.log(error);
    } else {
        console.log(response.statusCode, body);
    }
});
};




function postMsg(roomId,msgContent){

var token='Bearer NTE5YWNhMDUtZDUzYy00MDU1LTgzYWMtNGYyOGJhNjgxMDU3NTYxMjA0MmMtM2Y0';

request({
    url: 'https://api.ciscospark.com/v1/messages/',
    method: 'POST', 
    json:true,
    headers:{
         'Authorization' : token,
         'Content-type' : 'application/json'
         },
    body:{
        roomId: roomId,
        text: msgContent
    }     
}, function(error, res){
    if(error) {
        console.log(error);
    } else {
        console.log('The response code is ' + res.statusCode + '\n')
        console.log('The json body is: ' + '\n' + res.body + '\n');
    }

});

};





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!');
});

module.exports = app;
