<div align="center">
  <a href="https://github.com/uttpal/tube2gif">
    <img width="200" heigth="200" src="https://cloud.githubusercontent.com/assets/8591801/22406988/b486c34a-e683-11e6-824a-909dd63c61d8.png">
  </a>
  <br>
  <br>
	<a href="https://img.shields.io/travis/USER/REPO.svg">
		<img src="https://img.shields.io/travis/USER/REPO.svg">
	</a>
	<a href="https://img.shields.io/npm/v/npm.svg">
		<img src="https://img.shields.io/npm/v/npm.svg">
	</a>
	<a href="https://img.shields.io/npm/l/express.svg">
		<img src="https://img.shields.io/npm/l/express.svg">
	</a>
	<a href="https://img.shields.io/david/strongloop/express.svg">
		<img src="https://img.shields.io/david/strongloop/express.svg">
	</a>
  <h1>tube2gif</h1>
  <p>
    tube2gif is a web-based Youtube to GIF creator built using Node.Js and FFMPEG, using which you can search any Youtube video and create GIFs from it of desired duration.
  <p>
</div>
<h2 align="center">Demo</h2>

```
https://ytube2gif.herokuapp.com/
```

<h2 align="center">Install</h2>

####Pre-requisites
* Node.Js 6+
* FFMPEG installed ([Ubuntu Installation Guide](http://tipsonubuntu.com/2016/11/02/install-ffmpeg-3-2-via-ppa-ubuntu-16-04))

####Installation
1. Clone Repository
3. cd into dir && `npm install`
4. Obtain Youtube Api key ([Instructions](https://www.slickremix.com/docs/get-api-key-for-youtube/))
5. Add obtained Youtube key to config/local.js or `export YOUTUBE_API_KEY=key`
4. `npm start` && visit localhost:3000

<h2 align="center">Heroku Install</h2>

1. Add buildapps https://github.com/jonathanong/heroku-buildpack-ffmpeg-latest.git and heroku/nodejs
2. Push to heroku master
