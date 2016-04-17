'use strict';
var request = require("request");

module.exports = function getGif(req, res, next) {

  var id = encodeURIComponent(req.body.id);
  var start = req.body.start * 60;
  var end = start + parseInt(req.body.duration);
  console.log(start,end, parseInt(req.body.duration));

  var options = {
    method: 'GET',
    url: 'http://apilayer.net/api/capture',
    qs: {
      access_key: '2ed1edfe06b18fda5ae7003d7994a840',
      url: 'https://www.youtube.com/watch?v=' + id,
      start: start,
      end: end
    }
  };

  request(options).on('response', function(res) {
    delete res.request;
  }).pipe(res);
};
