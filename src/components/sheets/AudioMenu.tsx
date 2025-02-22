import { useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import type { AudioTrack } from '../../types';

interface AudioMenuProps {
  visible: boolean;
  onClose: () => void;
  audioTracks: AudioTrack[];
  currentAudioTrack: AudioTrack | null;
  onAudioTrackChange: (track: AudioTrack) => void;
}

export function AudioMenu({
  visible,
  onClose,
  audioTracks,
  currentAudioTrack,
  onAudioTrackChange,
}: AudioMenuProps) {
  const snapPoints = useMemo(() => ['100%'], []);
  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) onClose();
    },
    [onClose]
  );

  if (!visible) return null;

  return (
    <BottomSheet
      snapPoints={snapPoints}
      onClose={onClose}
      onChange={handleSheetChanges}
      enablePanDownToClose
      index={0}
      backgroundStyle={styles.bottomSheetBackground}
      backdropComponent={(props) => (
        <View style={[props.style, {}]}>
          <TouchableOpacity style={{ flex: 1 }} onPress={onClose} />
        </View>
      )}
    >
      <BottomSheetView style={styles.modalContent}>
        <Text style={styles.modalTitle}>Audio</Text>
        {audioTracks.map((track) => (
          <View key={track.language} style={styles.menuItemContainer}>
            <TouchableOpacity
              onPress={() => {
                onAudioTrackChange(track);
                onClose();
              }}
            >
              <View
                style={[
                  styles.menuItem,
                  currentAudioTrack?.language === track.language &&
                    styles.selectedItem,
                ]}
              >
                <Text
                  style={[
                    styles.menuItemText,
                    currentAudioTrack?.language === track.language &&
                      styles.selectedItemText,
                  ]}
                >
                  {track.label || track.language}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </BottomSheetView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  bottomSheetBackground: {
    backgroundColor: 'black',
  },
  modalContent: {
    padding: 16,
  },
  modalTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  menuItemContainer: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  menuItem: {
    padding: 16,
    borderRadius: 8,
  },
  selectedItem: {
    backgroundColor: 'white',
  },
  menuItemText: {
    color: 'white',
    fontSize: 16,
  },
  selectedItemText: {
    fontWeight: 'bold',
    color: 'black',
  },
});
