import { TRACKS } from "@/data/tracks.data";
import type { ITrack } from "@/types/track.types";
import { makeAutoObservable } from "mobx";

class MusicPlayerStore {
  isPlaying: boolean = false;
  currentTrack: ITrack | null = null;
  volume: number = 85;
  currentTime: number = 30;
  previousVolume: number = 85;
  progress: number = 0;

  constructor() {
    this.currentTrack = {
      name: "Fat Nick New Opps",
      file: "/audio/Fat Nick New Opps.mp3",
      artist: { name: "Fat Nick", image: "", listenersCount: 0, tracksL: [] },
      duration: 200,
    };
    makeAutoObservable(this);
  }

  play(track: ITrack) {
    this.currentTrack = track;
    this.isPlaying = true;
    console.log(`Playing track: ${track.name}`);
  }

  setTrack(track: ITrack | null) {
    this.currentTrack = track;
  }

  tooglePlayPause() {
    this.isPlaying = !this.isPlaying;
  }

  seek(time: number) {
    console.log("Store seek called with time:", time);
    this.currentTime = time;
    this.progress = this.currentTrack
      ? (time / this.currentTrack.duration) * 100
      : 0;
    console.log(`Seeking to time: ${time}`);
  }

  handleProgressChange = (value: number) => {
    this.seek(value);
  };

  setVolume(value: number) {
    this.volume = value;
    console.log(`Volume set to: ${value}`);
  }

  changeTrack(type: "prev" | "next") {
    if (!this.currentTrack) return;

    const currentIndex = TRACKS.findIndex(
      (track) => track.name === this.currentTrack?.name,
    );
    const nextIndex =
      type === "next"
        ? (currentIndex + 1) % TRACKS.length
        : (currentIndex - 1 + TRACKS.length) % TRACKS.length;
    this.setTrack(TRACKS[nextIndex]);
    this.currentTime = 0;
    this.progress = 0;
  }
}

export const playStore = new MusicPlayerStore();