import {musicPlayer, musicPlayerstop} from './app/service/Music.service';

module.exports = async (data) => {
  if (data.type === 'playback-state') {
    // Update the UI with the new state
  } else if (data.type === 'remote-play') {
    // The play button was pressed, we can forward this command to the player using
    // await TrackPlayer.start();
    // return TrackPlayer;
    // TrackPlayer.play();
  }  else if (data.type === 'remote-stop') {
  // The play button was pressed, we can forward this command to the player using
    const xx = await musicPlayerstop();
    return xx;
  // TrackPlayer.play();
  } else if (data.type === 'remote-seek') {
    // Again, we can forward this command to the player using
    // TrackPlayer.seekTo(data.position);
  }
  // ...
};