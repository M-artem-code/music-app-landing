import type { ITrack } from "@/types/track.types";

export const trackKey = (track: ITrack) => {
  return `${track.artist.name}::${track.name}`;
};
