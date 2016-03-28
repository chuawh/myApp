var express = require('express');
var router = express.Router();
var request=require('request');

/* GET users listing. */
router.use('/', function (req, res) {

  res.send('You are lucky!!!!');
  console.log('The Spark Webhook Post is: ');
  console.log(req.body);      //  JSON data
  /*console.log('Message ID is: ' + req.body.id); //  text of JSON data
  console.log('Room ID is: ' + req.body.roomId); //  text of JSON data
  console.log('Person ID is: ' + req.body.personId); //  text of JSON data
  console.log('Person Email is: ' + req.body.personEmail); //  text of JSON data
  console.log('Text content is: ' + req.body.text); //  text of JSON data
  console.log('Date Created is: ' + req.body.created); //  text of JSON */
  
  getMsg(req.body.data.id);

});


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
};


function getMsg(msgId){

var token='Bearer MTU5OThlYmMtMTIxMC00MDZmLTg1NzEtNzU4MGJkODc3MTFiNzg1OGRlOTktYjdm';

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
        console.log('The response code is ' + res.statusCode + '\n')
        console.log('The json body is: ' + '\n' + res.body + '\n');
    }
    var textMsg=JSON.parse(res.body);
    console.log('The chat message is: ' + textMsg.text + '\n');
    console.log('Ther email is: ' + textMsg.personEmail + '\n');
    //postHttp(textMsg.text);

});

};

module.exports = router;
