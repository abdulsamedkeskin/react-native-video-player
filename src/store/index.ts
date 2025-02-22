import { create } from 'zustand';
import type { Quality, Subtitle, AudioTrack } from '../types';
import type { OnLoadData } from 'react-native-video';
import {
  getHighestQuality,
  findSubtitleByLanguage,
  findAudioTrackByLanguage,
} from '../utils';

interface VideoPlayerStore {
  // UI State
  showControls: boolean;
  setShowControls: (show: boolean) => void;
  toggleControls: () => void;

  // Video State
  currentTime: number;
  duration: number;
  paused: boolean;
  bufferLoading: boolean;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setPaused: (paused: boolean) => void;
  setBufferLoading: (loading: boolean) => void;
  togglePlay: () => void;

  // Quality settings
  qualities: Quality[];
  currentQuality: Quality | null;
  setQualities: (qualities: Quality[]) => void;
  setCurrentQuality: (quality: Quality) => void;

  // Subtitle settings
  subtitles: Subtitle[];
  currentSubtitle: Subtitle | null;
  setSubtitles: (subtitles: Subtitle[]) => void;
  setCurrentSubtitle: (subtitle: Subtitle | null) => void;

  // Audio settings
  audioTracks: AudioTrack[];
  currentAudioTrack: AudioTrack | null;
  setAudioTracks: (tracks: AudioTrack[]) => void;
  setCurrentAudioTrack: (track: AudioTrack) => void;

  // Video loading
  handleLoadComplete: (
    data: OnLoadData,
    options: {
      initialSubtitleLanguage?: string;
      initialQualityHeight?: number;
      initialAudioLanguage?: string;
    }
  ) => void;
}

export const useVideoPlayerStore = create<VideoPlayerStore>((set) => ({
  // UI State
  showControls: false,
  setShowControls: (show) => set({ showControls: show }),
  toggleControls: () => set((state) => ({ showControls: !state.showControls })),

  // Video State
  currentTime: 0,
  duration: 0,
  paused: false,
  bufferLoading: false,
  setCurrentTime: (time) => set({ currentTime: time }),
  setDuration: (duration) => set({ duration }),
  setPaused: (paused) => set({ paused }),
  setBufferLoading: (loading) => set({ bufferLoading: loading }),
  togglePlay: () => set((state) => ({ paused: !state.paused })),

  // Quality
  qualities: [],
  currentQuality: null,
  setQualities: (qualities) => set({ qualities }),
  setCurrentQuality: (quality) => set({ currentQuality: quality }),

  // Subtitles
  subtitles: [],
  currentSubtitle: null,
  setSubtitles: (subtitles) => set({ subtitles }),
  setCurrentSubtitle: (subtitle) => set({ currentSubtitle: subtitle }),

  // Audio
  audioTracks: [],
  currentAudioTrack: null,
  setAudioTracks: (tracks) => set({ audioTracks: tracks }),
  setCurrentAudioTrack: (track) => set({ currentAudioTrack: track }),

  // Video loading handler
  handleLoadComplete: (data, options) => {
    // Reset all state values first
    set({
      qualities: [],
      currentQuality: null,
      subtitles: [],
      currentSubtitle: null,
      audioTracks: [],
      currentAudioTrack: null,
    });

    set({ duration: data.duration });

    if (data.videoTracks) {
      const availableQualities = data.videoTracks
        .filter(
          (track) =>
            track.width != null && track.height != null && track.bitrate != null
        )
        .map((track) => ({
          width: track.width!,
          height: track.height!,
          bitrate: `${Math.round(track.bitrate! / 1000)}k`,
          label: `${track.height}p`,
          trackId: track.tracksID || '',
        }));

      if (availableQualities.length > 0) {
        set({ qualities: availableQualities });

        if (options.initialQualityHeight) {
          const requestedQuality = availableQualities.find(
            (q) => q.height === options.initialQualityHeight
          );
          const qualityToSet =
            requestedQuality || getHighestQuality(availableQualities);
          set({ currentQuality: qualityToSet });
        } else {
          set({ currentQuality: getHighestQuality(availableQualities) });
        }
      }
    }

    if (data.textTracks) {
      const availableSubtitles = data.textTracks
        .filter((track) => track.language)
        .map((track) => ({
          language: track.language!,
          url: '',
          label: `${track.title!}`,
          index: track.index,
        }));

      set({ subtitles: availableSubtitles });

      if (options.initialSubtitleLanguage && availableSubtitles.length > 0) {
        const subtitle = findSubtitleByLanguage(
          availableSubtitles,
          options.initialSubtitleLanguage
        );
        if (subtitle) {
          set({ currentSubtitle: subtitle });
        }
      }
    }

    if (data.audioTracks) {
      const availableAudioTracks = data.audioTracks
        .filter((track) => track.language)
        .map((track) => ({
          language: track.language!,
          label: `${track.title!}`,
          index: track.index,
        }));

      set({ audioTracks: availableAudioTracks });

      if (options.initialAudioLanguage && availableAudioTracks.length > 0) {
        const track = findAudioTrackByLanguage(
          availableAudioTracks,
          options.initialAudioLanguage
        );
        if (track) {
          set({ currentAudioTrack: track });
        }
      } else if (availableAudioTracks.length > 0) {
        set({ currentAudioTrack: availableAudioTracks[0] });
      }
    }
  },
}));
