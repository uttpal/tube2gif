'use strict';
const request = require('request');
const config = require('config');

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
      key: config.get('YOUTUBE_API_KEY')
    }
  };

  request(options, function(err, response, videosObj) {
    videosObj = JSON.parse(videosObj);
    res.render('search', {
      videos: videosObj
    });
  });
};
