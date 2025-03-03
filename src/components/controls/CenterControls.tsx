import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

export interface CenterControlsProps {
  currentTime: number;
  duration: number;
  paused: boolean;
  bufferLoading: boolean;
  onSeek: (time: number) => void;
  onPlayPause: () => void;
}

export function CenterControls({
  currentTime,
  duration,
  paused,
  bufferLoading,
  onSeek,
  onPlayPause,
}: CenterControlsProps) {
  const { width, height } = Dimensions.get('window');

  const isLandscape = width > height;
  return (
    <View
      style={[styles.container, { gap: isLandscape ? height / 3 : width / 6 }]}
    >
      <TouchableOpacity onPress={() => onSeek(Math.max(0, currentTime - 10))}>
        <MaterialIcons
          name="replay-10"
          color="white"
          size={isLandscape ? height / 8 : width / 8}
        />
      </TouchableOpacity>

      <View style={[styles.playPauseContainer, { height: height / 5 }]}>
        {bufferLoading && (
          <ActivityIndicator
            size={isLandscape ? height / 5 : width / 5}
            color="red"
            style={styles.bufferingIndicator}
          />
        )}
        <TouchableOpacity
          onPress={onPlayPause}
          style={{ opacity: bufferLoading ? 0 : 1 }}
        >
          <Ionicons
            name={paused ? 'play' : 'pause'}
            size={isLandscape ? height / 7 : width / 7}
            color="white"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => onSeek(Math.min(duration, currentTime + 10))}
      >
        <MaterialIcons
          name="forward-10"
          color="white"
          size={isLandscape ? height / 8 : width / 8}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playPauseContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bufferingIndicator: {
    position: 'absolute',
  },
});
