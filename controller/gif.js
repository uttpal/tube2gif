'use strict';
const gif = require("../lib/gif.js");

module.exports = (req, res, next) => {

  const id = encodeURIComponent(req.body.id);
  const start = new Date(req.body.start * 1000).toISOString().substr(11, 8);
  const duration = parseInt(req.body.duration);

  const video = {
    url: 'https://www.youtube.com/watch?v=' + id,
    start: start,
    duration: duration
  };

  gif.generate(video)
    .then((filename) => {
      res.render('gif', {
        filename: filename
      });
    });

};
