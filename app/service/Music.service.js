import TrackPlayer from 'react-native-track-player';
// Creates the player
export const musicPlayer = async (musicFile) => {
  musicPlayerstop();
  await TrackPlayer.setupPlayer({});
  await TrackPlayer.add(musicFile);
  await TrackPlayer.updateOptions({
    capabilities: [
      TrackPlayer.CAPABILITY_PLAY,
      TrackPlayer.CAPABILITY_PAUSE,
      TrackPlayer.CAPABILITY_STOP
    ], compactCapabilities: [
      TrackPlayer.CAPABILITY_PLAY,
      TrackPlayer.CAPABILITY_PAUSE,
      TrackPlayer.CAPABILITY_STOP
    ],
    stopWithApp: true
  });
  await TrackPlayer.play();
  return TrackPlayer;
};

export const musicPlayerstop = async () => {
  await TrackPlayer.stop();
  await TrackPlayer.removeUpcomingTracks();
  return TrackPlayer;
};