

const _ = require('lodash');
const ytdl = require('ytdl-core');
const sanitize = require('sanitize-filename');
const spawn = require('child_process').spawn;

// ffmpeg -t 10 -ss 00:00:02 -i narco.mp4 small-clip.gif

function getFileName(meta, options) {
  return `./public/gif/${sanitize(meta.title).replace(/ /g, '_')}${options.from}${options.duration}.gif`;
}

const createFFmpegArgs = (options) => {
  const args = [];
  args.push('-n');
  args.push('-t', options.duration);
  args.push('-ss', options.from);
  args.push('-i', options.url);
  args.push(options.filename);
  return args;
};
const callFFmpeg = options => new Promise((resolve) => {
  const ffmpeg = spawn('ffmpeg', createFFmpegArgs(options));
  ffmpeg.on('close', () => {
    resolve();
  });
});

function generate(video) {
  return new Promise((resolve, reject) => {
    const stream = ytdl(video.url);
    stream.on('info', (meta) => {
      const videos = _.sortBy(_.filter(meta.formats, format => format.container === 'mp4'
        && (parseInt(format.quality_label, 10) || parseInt(format.resolution, 10))),
        [o => parseInt(o.quality_label, 10) || parseInt(o.resolution, 10)]);
      const options = {
        url: videos[parseInt(videos.length / 4, 10)].url,
        filename: getFileName(meta, video),
        from: video.start,
        duration: video.duration,
      };
      callFFmpeg(options)
        .then(() => resolve(options.filename.substr(9)))
        .catch(reject);
    });
  });
}


module.exports = {
  generate,
};
