import { useState } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import type { Quality, Subtitle, AudioTrack } from '../../types';
import { QualityMenu, SubtitleMenu, AudioMenu } from '..';
import { TopControls } from './TopControls';
import { CenterControls } from './CenterControls';
import { BottomControls } from './BottomControls';

interface ControlsProps {
  show: boolean;
  title?: string;
  onBack?: () => void;
  currentTime: number;
  duration: number;
  paused: boolean;
  bufferLoading: boolean;
  qualities: Quality[];
  currentQuality: Quality | null;
  subtitles: Subtitle[];
  currentSubtitle: Subtitle | null;
  audioTracks: AudioTrack[];
  currentAudioTrack: AudioTrack | null;
  onSeek: (time: number) => void;
  onPlayPause: () => void;
  onQualityChange?: (quality: Quality) => void;
  onSubtitleChange?: (subtitle: Subtitle | null) => void;
  onAudioTrackChange?: (track: AudioTrack) => void;
  onSliderStart: () => void;
  onSliderComplete: (value: number) => void;
}

export function Controls({
  show,
  title,
  onBack,
  currentTime,
  duration,
  paused,
  bufferLoading,
  qualities,
  currentQuality,
  subtitles,
  currentSubtitle,
  audioTracks,
  currentAudioTrack,
  onSeek,
  onPlayPause,
  onQualityChange,
  onSubtitleChange,
  onAudioTrackChange,
  onSliderStart,
  onSliderComplete,
}: ControlsProps) {
  const [showQualityMenu, setShowQualityMenu] = useState(false);
  const [showSubtitleMenu, setShowSubtitleMenu] = useState(false);
  const [showAudioMenu, setShowAudioMenu] = useState(false);

  if (!show) return null;

  return (
    <>
      <Animated.View
        entering={FadeIn}
        exiting={FadeOut}
        style={styles.controlsOverlay}
      >
        <TopControls title={title} onBack={onBack} />

        <CenterControls
          currentTime={currentTime}
          duration={duration}
          paused={paused}
          bufferLoading={bufferLoading}
          onSeek={onSeek}
          onPlayPause={onPlayPause}
        />

        <BottomControls
          currentTime={currentTime}
          duration={duration}
          qualities={qualities}
          currentQuality={currentQuality}
          subtitles={subtitles}
          currentSubtitle={currentSubtitle}
          audioTracks={audioTracks}
          currentAudioTrack={currentAudioTrack}
          onQualityChange={onQualityChange}
          onSubtitleChange={onSubtitleChange}
          onAudioTrackChange={onAudioTrackChange}
          onSliderStart={onSliderStart}
          onSliderComplete={onSliderComplete}
          onShowQualityMenu={() => setShowQualityMenu(true)}
          onShowSubtitleMenu={() => setShowSubtitleMenu(true)}
          onShowAudioMenu={() => setShowAudioMenu(true)}
        />
      </Animated.View>

      {/* Menus */}
      <QualityMenu
        visible={showQualityMenu}
        onClose={() => setShowQualityMenu(false)}
        qualities={qualities}
        currentQuality={currentQuality}
        onQualityChange={onQualityChange || (() => {})}
      />

      <SubtitleMenu
        visible={showSubtitleMenu}
        onClose={() => setShowSubtitleMenu(false)}
        subtitles={subtitles}
        currentSubtitle={currentSubtitle}
        onSubtitleChange={onSubtitleChange || (() => {})}
      />

      <AudioMenu
        visible={showAudioMenu}
        onClose={() => setShowAudioMenu(false)}
        audioTracks={audioTracks}
        currentAudioTrack={currentAudioTrack}
        onAudioTrackChange={onAudioTrackChange || (() => {})}
      />
    </>
  );
}

const styles = StyleSheet.create({
  controlsOverlay: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    flex: 1,
  },
});
