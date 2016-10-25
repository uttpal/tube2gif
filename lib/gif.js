'use strict';
const _ = require('lodash');
const ytdl = require('ytdl-core');
const sanitize = require("sanitize-filename");
const spawn = require('child_process').spawn;

// ffmpeg -t 10 -ss 00:00:02 -i narco.mp4 small-clip.gif
// When the meta is ready, we can start converting the stream

function getFileName(meta){
  return './public/gif/' + sanitize(meta.title).replace(/ /g, '_') + '.gif';
}

const createFFmpegArgs = (options) => {
  let args = [];
  args.push('-n');
  args.push('-t', options.duration);
  args.push('-ss', '00:00:02');
  args.push('-i', options.url);
  args.push(options.filename);
  return args;
};
const callFFmpeg = (options) => {
  return new Promise(function(resolve, reject) {
    let ffmpeg = spawn('ffmpeg', createFFmpegArgs(options));
    // ffmpeg.stdin.on('error', function ignoreThisError(err) {
    //   console.log(79,err);
    // });
    // ffmpeg.on('error', function (err) {
    //   console.log(722,err);
    // });
    ffmpeg.on('close', (code) => {
      console.log(82,code);
      resolve();
    });
  });
};

function generate(video){
  console.log(10,video);
  return new Promise(function(resolve, reject) {
    const stream = ytdl(video.url);
    stream.on('info', function(meta){
      const videos = _.sortBy(_.filter(meta.formats, (format) => {
        return format.container === 'mp4' && (parseInt(format.quality_label) || parseInt(format.resolution));
      }), [function(o) { return parseInt(o.quality_label) || parseInt(o.resolution);}]);
      console.log(22,videos);
      const options = {
        url: videos[0].url,
        filename: getFileName(meta),
        from: video.start,
        duration: 10
      };
      callFFmpeg(options)
        .then(() => resolve(options.filename.substr(9)))
        .catch(reject);
    });
  });
}



  module.exports = {
    generate: generate
  };
