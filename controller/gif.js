'use strict';
const gif = require("../lib/gif.js");

module.exports = (req, res, next) => {

  const id = encodeURIComponent(req.body.id);
  const start = new Date(req.body.start * 1000).toISOString().substr(11, 8);
  const end = (start + parseInt(req.body.duration));

  const video = {
    url: 'https://www.youtube.com/watch?v=' + id,
    start: start,
    end: end
  };

  console.log(video);
  gif.generate(video)
    .then((filename) => {
      console.log(19,filename);
      res.render('gif', {
        filename: filename
      });
    });

};
