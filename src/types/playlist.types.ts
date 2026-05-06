import type { ITrack } from "./track.types";

export interface IPlaylist {
  id: string;
  name: string;
  tracks: ITrack[];
  createdAt: Date;
}