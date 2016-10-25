'use strict';

module.exports = function search(req, res, next) {

  var videoId = req.query.id;
    res.render('dialog', { videoId: videoId });
};
