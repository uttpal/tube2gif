'use strict';
var request = require("request");

module.exports = function getGif(req, res, next) {

  var id = encodeURIComponent(req.body.id);
  var start = (req.body.start * 60);
  var end = (start + parseInt(req.body.duration)).toString();

  var options = { method: 'GET',
  url: 'http://apilayer.net/api/capture',
  qs:
   { access_key: 'd0a352a5e8f6f725b269e2e9ccf78602',
     url: 'https://www.youtube.com/watch?v=' + id,
     start: start.toString(),
     end: end }
    };


    console.log(options);
  request(options).on('response', function(res) {
    delete res.request;
  }).pipe(res);
};
