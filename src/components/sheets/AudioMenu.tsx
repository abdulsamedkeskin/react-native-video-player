import { useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import type { AudioTrack } from '../../types';

export interface AudioMenuProps {
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
      enableDynamicSizing={false}
      backgroundStyle={styles.bottomSheetBackground}
      style={styles.modalContent}
      backdropComponent={(props) => (
        <View style={[props.style, {}]}>
          <TouchableOpacity style={{ flex: 1 }} onPress={onClose} />
        </View>
      )}
    >
      <Text style={styles.modalTitle}>Audio</Text>
      <BottomSheetFlatList
        data={audioTracks}
        keyExtractor={(item) => item.index.toString()}
        style={{ marginBottom: 16 }}
        renderItem={({ item }: { item: AudioTrack }) => (
          <View key={item.index} style={styles.menuItemContainer}>
            <TouchableOpacity
              onPress={() => {
                onAudioTrackChange(item);
                onClose();
              }}
            >
              <View
                style={[
                  styles.menuItem,
                  currentAudioTrack?.index === item.index &&
                    styles.selectedItem,
                ]}
              >
                <Text
                  style={[
                    styles.menuItemText,
                    currentAudioTrack?.index === item.index &&
                      styles.selectedItemText,
                  ]}
                >
                  {item.label || item.language}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      />
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
