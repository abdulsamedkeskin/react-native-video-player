import { useRef } from 'react';
import type { OnLoadData } from 'react-native-video';
import { useVideoPlayerStore } from '../store';

export const useVideoPlayer = (options: {
  initialSubtitleLanguage?: string;
  initialQualityHeight?: number;
  initialAudioLanguage?: string;
}) => {
  const videoRef = useRef<any>(null);
  const store = useVideoPlayerStore();

  const seek = (time: number) => {
    if (videoRef.current) {
      videoRef.current.seek(time);
      store.setCurrentTime(time);
    }
  };

  return {
    videoRef,
    state: {
      showControls: store.showControls,
      currentTime: store.currentTime,
      duration: store.duration,
      paused: store.paused,
      bufferLoading: store.bufferLoading,
      qualities: store.qualities,
      currentQuality: store.currentQuality,
      subtitles: store.subtitles,
      currentSubtitle: store.currentSubtitle,
      audioTracks: store.audioTracks,
      currentAudioTrack: store.currentAudioTrack,
    },
    controls: {
      setShowControls: store.setShowControls,
      setCurrentTime: store.setCurrentTime,
      setPaused: store.setPaused,
      setBufferLoading: store.setBufferLoading,
      setCurrentQuality: store.setCurrentQuality,
      setCurrentSubtitle: store.setCurrentSubtitle,
      setCurrentAudioTrack: store.setCurrentAudioTrack,
    },
    actions: {
      handleLoadComplete: (data: OnLoadData) =>
        store.handleLoadComplete(data, options),
      seek,
      togglePlay: store.togglePlay,
      toggleControls: store.toggleControls,
    },
  };
};
