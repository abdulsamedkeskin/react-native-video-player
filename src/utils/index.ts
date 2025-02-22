import type { Quality, Subtitle, AudioTrack } from '../types';

export const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  }
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export const getHighestQuality = (qualities: Quality[]): Quality => {
  return qualities.reduce((prev, current) =>
    prev.height > current.height ? prev : current
  );
};

export const findSubtitleByLanguage = (
  subtitles: Subtitle[],
  language: string
): Subtitle | undefined => {
  return subtitles.find((sub) => sub.language === language);
};

export const findAudioTrackByLanguage = (
  tracks: AudioTrack[],
  language: string
): AudioTrack | undefined => {
  return tracks.find((track) => track.language === language);
};
