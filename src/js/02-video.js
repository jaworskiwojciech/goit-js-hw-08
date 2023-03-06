import '../css/common.css';
import player from '@vimeo/player';
import throttle from 'lodash.throttle';

const TIME_KEY = 'videoplayer-current-time';
const iframe = document.querySelector('iframe');

const vimeoPlayer = new player(iframe);

const onPlay = function (data) {
  const strigifyData = JSON.stringify(data);
  localStorage.setItem(TIME_KEY, strigifyData);
};
vimeoPlayer.on('timeupdate', throttle(onPlay, 100));

function resumePlayback() {
  const storedData = JSON.parse(localStorage.getItem(TIME_KEY));
  if (storedData === null) {
    return;
  }
  const paused = storedData['seconds'];
  if (paused) {
    vimeoPlayer
      .setCurrentTime(paused)
      .then(function (seconds) {})
      .catch(function (error) {
        switch (error.name) {
          case 'RangeError':
            break;
          default:
            break;
        }
      });
  }
  console.log(storedData['seconds']);
}
resumePlayback();
