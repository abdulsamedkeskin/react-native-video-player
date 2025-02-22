import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

interface CenterControlsProps {
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

  return (
    <View style={[styles.container, { gap: width / 6 }]}>
      <TouchableOpacity onPress={() => onSeek(Math.max(0, currentTime - 10))}>
        <MaterialIcons name="replay-10" color="white" size={height / 8} />
      </TouchableOpacity>

      <View style={[styles.playPauseContainer, { height: height / 5 }]}>
        {bufferLoading && (
          <ActivityIndicator
            size={height / 5}
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
            size={height / 7}
            color="white"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => onSeek(Math.min(duration, currentTime + 10))}
      >
        <MaterialIcons name="forward-10" color="white" size={height / 8} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
