'use strict';
const request = require('request');

module.exports = function search(req, res, next) {
  const query = req.query.q;
  var options = {
    method: 'GET',
    url: 'https://www.googleapis.com/youtube/v3/search',
    qs: {
      part: 'snippet',
      maxResults: '15',
      order: 'viewCount',
      q: query,
      type: 'video',
      key: ' AIzaSyCHN0IzD3Aj9eMY2b_XHwWJYnLWWUv41ao'
    }
  };

  request(options, function(err, response, videosObj) {
    videosObj = JSON.parse(videosObj);
    res.render('search', {
      videos: videosObj
    });
  });
};
