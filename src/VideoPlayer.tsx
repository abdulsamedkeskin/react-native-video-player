import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Video, {
  SelectedTrackType,
  SelectedVideoTrackType,
} from 'react-native-video';
import type { SelectedTrack, SelectedVideoTrack } from 'react-native-video';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import type { VideoPlayerProps } from './types';
import { useVideoPlayer } from './hooks/useVideoPlayer';
import { Controls } from './components/controls';

export default function VideoPlayer({
  source,
  style,
  title,
  onBack,
  initialSubtitleLanguage,
  initialQualityHeight,
  initialAudioLanguage,
  onQualityChange,
  onSubtitleChange,
  onAudioTrackChange,
  onTimeUpdate,
  onDurationChange,
  onEnd,
  onError,
}: VideoPlayerProps) {
  const { width, height } = Dimensions.get('window');
  const { videoRef, state, controls, actions } = useVideoPlayer({
    initialSubtitleLanguage,
    initialQualityHeight,
    initialAudioLanguage,
  });

  React.useEffect(() => {
    if (onTimeUpdate) onTimeUpdate(state.currentTime);
  }, [state.currentTime, onTimeUpdate]);

  React.useEffect(() => {
    if (onDurationChange) onDurationChange(state.duration);
  }, [state.duration, onDurationChange]);

  const singleTap = Gesture.Tap()
    .onEnd((_event, success) => {
      if (success) {
        actions.toggleControls();
      }
    })
    .runOnJS(true);

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd((_event, success) => {
      if (success) {
        const x = _event.absoluteX;
        if (width / 2 > x) {
          actions.seek(Math.max(0, state.currentTime - 10));
        } else {
          actions.seek(Math.min(state.duration, state.currentTime + 10));
        }
      }
    })
    .runOnJS(true);

  const gesture = Gesture.Exclusive(doubleTap, singleTap);

  const selectedTextTrack: SelectedTrack | undefined = state.currentSubtitle
    ? {
        type: SelectedTrackType.INDEX,
        value: state.currentSubtitle.index,
      }
    : undefined;

  const selectedAudioTrack: SelectedTrack | undefined = state.currentAudioTrack
    ? {
        type: SelectedTrackType.INDEX,
        value: state.currentAudioTrack.index,
      }
    : undefined;

  const selectedVideoTrack: SelectedVideoTrack | undefined =
    state.currentQuality
      ? {
          type: SelectedVideoTrackType.RESOLUTION,
          value: state.currentQuality.height,
        }
      : undefined;

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.videoContainer}>
        <GestureDetector gesture={gesture}>
          <Animated.View
            style={[
              {
                flex: 1,
                opacity: state.showControls ? 0.9 : 1,
                width: width,
                height: height,
              },
            ]}
          >
            <Video
              ref={videoRef}
              source={source}
              style={[styles.video, style]}
              resizeMode="contain"
              muted={false}
              controls={false}
              fullscreen={false}
              fullscreenAutorotate={false}
              subtitleStyle={{
                paddingBottom: state.showControls ? 250 : 50,
                fontSize: 22,
              }}
              selectedTextTrack={selectedTextTrack}
              selectedAudioTrack={selectedAudioTrack}
              selectedVideoTrack={selectedVideoTrack}
              onLoad={actions.handleLoadComplete}
              progressUpdateInterval={1000}
              onProgress={(data) => {
                if (!state.paused) {
                  controls.setCurrentTime(data.currentTime);
                }
              }}
              onEnd={onEnd}
              onError={onError}
              paused={state.paused}
            />
          </Animated.View>
        </GestureDetector>
        <Controls
          show={state.showControls}
          title={title}
          onBack={onBack}
          currentTime={state.currentTime}
          duration={state.duration}
          paused={state.paused}
          bufferLoading={state.bufferLoading}
          qualities={state.qualities}
          currentQuality={state.currentQuality}
          subtitles={state.subtitles}
          currentSubtitle={state.currentSubtitle}
          audioTracks={state.audioTracks}
          currentAudioTrack={state.currentAudioTrack}
          onSeek={actions.seek}
          onPlayPause={actions.togglePlay}
          onQualityChange={(quality) => {
            controls.setCurrentQuality(quality);
            if (onQualityChange) onQualityChange(quality);
          }}
          onSubtitleChange={(subtitle) => {
            controls.setCurrentSubtitle(subtitle);
            if (onSubtitleChange) onSubtitleChange(subtitle);
          }}
          onAudioTrackChange={(track) => {
            controls.setCurrentAudioTrack(track);
            if (onAudioTrackChange) onAudioTrackChange(track);
          }}
          onSliderStart={() => controls.setPaused(true)}
          onSliderComplete={(value) => {
            actions.seek(value);
            controls.setPaused(false);
          }}
        />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  videoContainer: {
    flex: 1,
  },
  video: {
    flex: 1,
  },
});
