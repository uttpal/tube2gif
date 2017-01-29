'use strict';

module.exports = function search(req, res, next) {

  const videoId = req.query.id;
    res.render('dialog', { videoId: videoId });
};
