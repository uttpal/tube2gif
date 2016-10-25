'use strict';
const _ = require('lodash');
const ytdl = require('ytdl-core');
const sanitize = require("sanitize-filename");
const spawn = require('child_process').spawn;

// ffmpeg -t 10 -ss 00:00:02 -i narco.mp4 small-clip.gif

function getFileName(meta, options){
  return './public/gif/' + sanitize(meta.title).replace(/ /g, '_') + options.from + options.duration + '.gif';
}

const createFFmpegArgs = (options) => {
  console.log(options);
  let args = [];
  args.push('-n');
  args.push('-t', options.duration);
  args.push('-ss', options.from);
  args.push('-i', options.url);
  args.push(options.filename);
  return args;
};
const callFFmpeg = (options) => {
  return new Promise(function(resolve, reject) {
    let ffmpeg = spawn('ffmpeg', createFFmpegArgs(options));
    ffmpeg.on('close', (code) => {
      resolve();
    });
  });
};

function generate(video){
  console.log(34,video);
  return new Promise(function(resolve, reject) {
    const stream = ytdl(video.url);
    stream.on('info', function(meta){
      const videos = _.sortBy(_.filter(meta.formats, (format) => {
        return format.container === 'mp4' && (parseInt(format.quality_label) || parseInt(format.resolution));
      }), [function(o) { return parseInt(o.quality_label) || parseInt(o.resolution);}]);
      const options = {
        url: videos[0].url,
        filename: getFileName(meta, video),
        from: video.start,
        duration: video.duration
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
