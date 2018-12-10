import TrackPlayer from 'react-native-track-player';

// Creates the player
export const musicPlayer = () => TrackPlayer.setupPlayer().then(async () => {

  // Adds a track to the queue
  await TrackPlayer.add({
    id: 'trackId',
    url: require('../media/music.mp3'),
    title: 'Track Title',
    artist: 'Track Artist'
  });

  // Starts playing it
  TrackPlayer.play();

});