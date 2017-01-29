

module.exports = function search(req, res) {
  const videoId = req.query.id;
  res.render('dialog', { videoId });
};
