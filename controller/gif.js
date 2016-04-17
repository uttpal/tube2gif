'use strict';
var request = require("request");

module.exports = function getGif(req, res, next) {

  var id = encodeURIComponent(req.body.id);
  var start = (req.body.start * 60);
  var end = (start + parseInt(req.body.duration)).toString();

  var options = { method: 'GET',
  url: 'http://apilayer.net/api/capture',
  qs:
   { access_key: '1f68677082a6fe0a36f0bef2fba84ec7',
     url: 'https://www.youtube.com/watch?v=' + id,
     start: start.toString(),
     end: end }
    };


    console.log(options);
  request(options).on('response', function(res) {
    delete res.request;
  }).pipe(res);
};
