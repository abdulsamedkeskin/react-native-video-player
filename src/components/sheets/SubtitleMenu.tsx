import { useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import type { Subtitle } from '../../types';

export interface SubtitleMenuProps {
  visible: boolean;
  onClose: () => void;
  subtitles: Subtitle[];
  currentSubtitle: Subtitle | null;
  onSubtitleChange: (subtitle: Subtitle | null) => void;
}

export function SubtitleMenu({
  visible,
  onClose,
  subtitles,
  currentSubtitle,
  onSubtitleChange,
}: SubtitleMenuProps) {
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
      style={styles.modalContent}
      enableDynamicSizing={false}
      backdropComponent={(props) => (
        <View style={[props.style, {}]}>
          <TouchableOpacity style={{ flex: 1 }} onPress={onClose} />
        </View>
      )}
    >
      <Text style={styles.modalTitle}>Subtitles</Text>
      <View style={styles.menuItemContainer}>
        <TouchableOpacity
          onPress={() => {
            onSubtitleChange(null);
            onClose();
          }}
        >
          <View
            style={[styles.menuItem, !currentSubtitle && styles.selectedItem]}
          >
            <Text
              style={[
                styles.menuItemText,
                !currentSubtitle && styles.selectedItemText,
              ]}
            >
              Off
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <BottomSheetFlatList
        data={subtitles}
        keyExtractor={(item: Subtitle) => item.index.toString()}
        style={{ marginBottom: 16 }}
        renderItem={({ item }: { item: Subtitle }) => (
          <View key={item.index} style={styles.menuItemContainer}>
            <TouchableOpacity
              onPress={() => {
                onSubtitleChange(item);
                onClose();
              }}
            >
              <View
                style={[
                  styles.menuItem,
                  currentSubtitle?.index === item.index && styles.selectedItem,
                ]}
              >
                <Text
                  style={[
                    styles.menuItemText,
                    currentSubtitle?.index === item.index &&
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
