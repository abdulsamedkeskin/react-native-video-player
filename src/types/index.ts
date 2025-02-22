import {
  DRMType,
  SelectedTrackType,
  SelectedVideoTrackType,
} from 'react-native-video';
import type { SelectedTrack, SelectedVideoTrack } from 'react-native-video';

export interface VideoSource {
  uri: string;
  type?: string;
  drm?: {
    type: DRMType;
    licenseServer: string;
  };
  headers?: Record<string, string>;
}

export interface Quality {
  width: number;
  height: number;
  bitrate: string;
  label: string;
  trackId: string;
}

export interface Subtitle {
  language: string;
  url: string;
  label: string;
  index: number;
}

export interface AudioTrack {
  language: string;
  label: string;
  index: number;
}

export interface VideoPlayerProps {
  source: VideoSource;
  style?: any;
  title?: string;
  onBack?: () => void;
  initialSubtitleLanguage?: string;
  initialQualityHeight?: number;
  initialAudioLanguage?: string;
  onQualityChange?: (quality: Quality) => void;
  onSubtitleChange?: (subtitle: Subtitle | null) => void;
  onAudioTrackChange?: (track: AudioTrack) => void;
  onTimeUpdate?: (currentTime: number) => void;
  onDurationChange?: (duration: number) => void;
  onEnd?: () => void;
  onError?: (error: any) => void;
}

export type {
  SelectedTrack,
  SelectedTrackType,
  SelectedVideoTrack,
  SelectedVideoTrackType,
};
