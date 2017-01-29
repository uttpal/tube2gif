

const request = require('request');
const config = require('config');

module.exports = function search(req, res) {
  const query = req.query.q;
  const options = {
    method: 'GET',
    url: 'https://www.googleapis.com/youtube/v3/search',
    qs: {
      part: 'snippet',
      maxResults: '15',
      order: 'viewCount',
      q: query,
      type: 'video',
      key: config.get('YOUTUBE_API_KEY'),
    },
  };

  request(options, (err, response, videosObj) => {
    const videos = JSON.parse(videosObj);
    res.render('search', {
      videos,
    });
  });
};
