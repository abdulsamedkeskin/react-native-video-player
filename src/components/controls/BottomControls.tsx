import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { formatTime } from '../../utils';
import type { Quality, Subtitle, AudioTrack } from '../../types';

export interface BottomControlsProps {
  currentTime: number;
  duration: number;
  qualities: Quality[];
  currentQuality: Quality | null;
  subtitles: Subtitle[];
  currentSubtitle: Subtitle | null;
  audioTracks: AudioTrack[];
  currentAudioTrack: AudioTrack | null;
  onQualityChange?: (quality: Quality) => void;
  onSubtitleChange?: (subtitle: Subtitle | null) => void;
  onAudioTrackChange?: (track: AudioTrack) => void;
  onSliderStart: () => void;
  onSliderComplete: (value: number) => void;
  onShowQualityMenu: () => void;
  onShowSubtitleMenu: () => void;
  onShowAudioMenu: () => void;
}

export function BottomControls({
  currentTime,
  duration,
  onSliderStart,
  onSliderComplete,
  onShowQualityMenu,
  onShowSubtitleMenu,
  onShowAudioMenu,
}: BottomControlsProps) {
  return (
    <LinearGradient
      style={styles.container}
      colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, .6)']}
    >
      <View style={styles.progressContainer}>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={duration}
          value={currentTime}
          minimumTrackTintColor="#ff0000"
          maximumTrackTintColor="rgba(255, 255, 255, 1)"
          thumbTintColor="#ff0000"
          step={1}
          onSlidingStart={onSliderStart}
          onSlidingComplete={onSliderComplete}
        />
        <Text style={styles.timeText}>
          {formatTime(currentTime)} / {formatTime(duration)}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={onShowSubtitleMenu}
        >
          <MaterialIcons name="closed-caption-off" size={20} color="white" />
          <Text style={styles.controlButtonText}>Subtitles</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.controlButton}
          onPress={onShowAudioMenu}
        >
          <FontAwesome5 name="audio-description" size={18} color="white" />
          <Text style={styles.controlButtonText}>Audio</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.controlButton}
          onPress={onShowQualityMenu}
        >
          <Ionicons name="settings-outline" size={20} color="white" />
          <Text style={styles.controlButtonText}>Quality</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  slider: {
    flex: 1,
    height: 40,
    marginRight: 10,
  },
  timeText: {
    color: 'white',
    fontSize: 12,
    minWidth: 100,
    textAlign: 'right',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  controlButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    padding: 8,
    marginHorizontal: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
  },
  controlButtonText: {
    color: 'white',
    fontSize: 14,
    letterSpacing: 1,
    fontWeight: '700',
  },
});
