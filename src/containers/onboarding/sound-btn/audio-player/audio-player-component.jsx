import React from 'react';
import ReactPlayer from 'react-player';

const AudioPlayer = ({
  file,
  startTime,
  endTime,
  muted,
  freeToPlay,
  playing,
  setPlaying,
  handleEndOfStep,
  setWaitingStartAudioClick,
  setFreeToPlay,
  script,
  textMark,
  setTextMark,
  setPlayedSeconds,
}) => (
  <ReactPlayer
    url={[`${file}#t=${startTime},${endTime}`]}
    playing={playing}
    wrapper={'audio'}
    muted={muted}
    onPlay={() => setPlaying(true)}
    onEnded={() => {
      handleEndOfStep();
    }}
    onProgress={({ playedSeconds }) => {
      setPlayedSeconds(playedSeconds);
      setFreeToPlay(true);
      if (!freeToPlay) {
        // Only happens in this case. See waitingStartAudioClick hook comment
        const notPlayingBecauseWaitingForUserClick = playedSeconds === 0;
        if (notPlayingBecauseWaitingForUserClick) {
          setPlaying(false);
          setWaitingStartAudioClick(true);
        } else {
          setFreeToPlay(true);
        }
      }

      if (script[textMark] && playedSeconds > script[textMark].endTime) {
        const hasNoMoreTextMarks = !script[textMark + 1];
        if (hasNoMoreTextMarks) {
          handleEndOfStep();
        } else {
          debugger
          setTextMark(textMark + 1);
        }
      }
    }}
    progressInterval={50}
    config={{
      file: {
        attributes: { preload: 'auto' },
        forceAudio: true,
        autoPlay: true,
        // muted: true,
      },
    }}
  />
);

export default AudioPlayer;
