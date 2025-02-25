import { useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import type { Quality } from '../../types';

export interface QualityMenuProps {
  visible: boolean;
  onClose: () => void;
  qualities: Quality[];
  currentQuality: Quality | null;
  onQualityChange: (quality: Quality) => void;
}

export function QualityMenu({
  visible,
  onClose,
  qualities,
  currentQuality,
  onQualityChange,
}: QualityMenuProps) {
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
      <Text style={styles.modalTitle}>Quality</Text>
      <BottomSheetFlatList
        data={qualities}
        keyExtractor={(item: Quality) => item.trackId}
        style={{ marginBottom: 16 }}
        renderItem={({ item }: { item: Quality }) => (
          <View key={item.trackId} style={styles.menuItemContainer}>
            <TouchableOpacity
              onPress={() => {
                onQualityChange(item);
                onClose();
              }}
            >
              <View
                style={[
                  styles.menuItem,
                  currentQuality?.trackId === item.trackId &&
                    styles.selectedItem,
                ]}
              >
                <Text
                  style={[
                    styles.menuItemText,
                    currentQuality?.trackId === item.trackId &&
                      styles.selectedItemText,
                  ]}
                >
                  {item.label}
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
