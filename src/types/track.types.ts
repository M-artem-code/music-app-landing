import type { IArtist } from "./artist.types";

export interface ITrack {
  name: string;
  file: string;
  artist: IArtist;
  duration: number;
}



