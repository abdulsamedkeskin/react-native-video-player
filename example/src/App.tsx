import { VideoPlayer } from '@sametkeskin/react-native-video-player';
import { View, StyleSheet, StatusBar, Platform } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    const hideSystemUI = async () => {
      if (Platform.OS === 'android') {
        ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.LANDSCAPE
        );
        await NavigationBar.setVisibilityAsync('hidden');
      }
      StatusBar.setHidden(true);
    };

    const showSystemUI = async () => {
      StatusBar.setHidden(false);
      if (Platform.OS === 'android') {
        ScreenOrientation.unlockAsync();
        await NavigationBar.setVisibilityAsync('visible');
      }
    };

    hideSystemUI();

    return () => {
      showSystemUI();
    };
  }, []);

  return (
    <View style={styles.container}>
      <VideoPlayer
        source={{
          uri: 'https://media.axprod.net/TestVectors/Dash/not_protected_dash_1080p_h264/manifest.mpd',
          type: 'mpd',
        }}
        style={styles.player}
        title="Big Buck Bunny"
        initialSubtitleLanguage="en"
        initialQualityHeight={1080}
        initialAudioLanguage="en"
        onError={(error: Error) => {
          console.error(error);
        }}
        onBack={() => {
          // router.back();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  player: {
    flex: 1,
  },
});
