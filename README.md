# React Native Video Player

[![npm version](https://img.shields.io/npm/v/@sametkeskin/react-native-video-player.svg)](https://www.npmjs.com/package/@sametkeskin/react-native-video-player)
[![npm downloads](https://img.shields.io/npm/dm/@sametkeskin&react-native-video-player.svg)](https://www.npmjs.com/package/@sametkeskin/react-native-video-player)

A customizable video player component for React Native with gesture controls, fullscreen support, and a modern UI.

## Features

- 🎮 Gesture controls for seeking and volume
- 🖥️ Fullscreen support
- ⏯️ Play/Pause controls
- 🎚️ Progress bar with seeking
- 🔊 Volume control
- 🎨 Customizable UI
- ⚡ Built with React Native Reanimated for smooth animations

https://github.com/user-attachments/assets/e5ce8cad-b08e-428d-a314-155a3189a2bc

## Installation

```bash
npm install @sametkeskin/react-native-video-player

# Install peer dependencies
npm install react-native-video react-native-gesture-handler react-native-reanimated
```

## Usage

```jsx
import VideoPlayer from 'react-native-video-player';

const App = () => {
  return (
    <VideoPlayer
      source={videoSource} // https://docs.thewidlarzgroup.com/react-native-video/component/props#source
      style={styles.player}
      title={title}
      initialSubtitleLanguage="en"
      initialQualityHeight={1080}
      initialAudioLanguage="en"
      onBack={() => {
        router.back();
      }}
    />
  );
};
```

## Props

| Prop                    | Type      | Default  | Description                                           |
| ----------------------- | --------- | -------- | ----------------------------------------------------- |
| source                  | Object    | required | Video source object containing URL and other metadata |
| style                   | ViewStyle | {}       | Container style for the video player                  |
| title                   | string    | -        | Title of the video to display in the player           |
| initialSubtitleLanguage | string    | 'en'     | Initial subtitle language code (e.g., 'en', 'es')     |
| initialQualityHeight    | number    | 1080     | Initial video quality height in pixels                |
| initialAudioLanguage    | string    | 'en'     | Initial audio language code (e.g., 'en', 'es')        |
| onBack                  | Function  | -        | Callback function when back button is pressed         |

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

MIT

## Author

Samet Keskin
