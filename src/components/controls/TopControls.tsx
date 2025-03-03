import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export interface TopControlsProps {
  title?: string;
  onBack?: () => void;
}

export function TopControls({ title, onBack }: TopControlsProps) {
  return (
    <LinearGradient
      style={styles.container}
      colors={['rgba(0, 0, 0, 0.4)', 'rgba(0, 0, 0, 0)']}
    >
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Ionicons name="arrow-back" size={28} color="white" />
      </TouchableOpacity>

      {title && (
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{title}</Text>
        </View>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  backButton: {
    marginHorizontal: 10,
  },
  titleContainer: {
    position: 'absolute',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
