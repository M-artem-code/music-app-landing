import { makeAutoObservable } from "mobx";
import type { ITrack } from "@/types/track.types";
import type { IPlaylist } from "@/types/playlist.types";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
  trackKey,
} from "@/functions";

class PlaylistStore {
  playlists: IPlaylist[] = [];

  constructor() {
    makeAutoObservable(this);
    this.playlists = loadFromLocalStorage<IPlaylist[]>("playlists", []);
  }

  // Создать новый плейлист
  createPlaylist(name: string): IPlaylist {
    const newPlaylist: IPlaylist = {
      id:
        "playlist_" +
        Date.now().toString() +
        "_" +
        Math.random().toString(36).substr(2, 9),
      name,
      tracks: [],
      createdAt: new Date(),
    };

    this.playlists.push(newPlaylist);
    saveToLocalStorage("playlists", this.playlists);
    return newPlaylist;
  }

  // Удалить плейлист
  deletePlaylist(id: string) {
    this.playlists = this.playlists.filter((playlist) => playlist.id !== id);
    saveToLocalStorage("playlists", this.playlists);
  }

  isTrackInPlaylist(playlistId: string, track: ITrack): boolean {
    const playlist = this.playlists.find((p) => p.id === playlistId);
    if (!playlist) return false;

    const key = trackKey(track);
    return playlist.tracks.some((t) => trackKey(t) === key);
  }

  // Добавить трек в плейлист (копия в localStorage, исходный каталог TRACKS не меняется)
  addTrackToPlaylist(playlistId: string, track: ITrack): boolean {
    const playlist = this.playlists.find((p) => p.id === playlistId);
    if (!playlist) return false;

    if (this.isTrackInPlaylist(playlistId, track)) return false;

    playlist.tracks.push({ ...track });
    saveToLocalStorage("playlists", this.playlists);
    return true;
  }

  toggleTrackInPlaylist(
    playlistId: string,
    track: ITrack,
  ): "added" | "removed" | "noop" {
    if (!this.playlists.some((p) => p.id === playlistId)) return "noop";

    if (this.isTrackInPlaylist(playlistId, track)) {
      this.removeTrackFromPlaylist(playlistId, track);
      return "removed";
    }

    return this.addTrackToPlaylist(playlistId, track) ? "added" : "noop";
  }

  // Удалить трек из плейлиста
  removeTrackFromPlaylist(playlistId: string, track: ITrack) {
    const playlist = this.playlists.find((p) => p.id === playlistId);
    if (playlist) {
      const key = trackKey(track);
      playlist.tracks = playlist.tracks.filter((t) => trackKey(t) !== key);
      saveToLocalStorage("playlists", this.playlists);
    }
  }

  // Получить все плейлисты
  getPlaylists(): IPlaylist[] {
    return this.playlists;
  }

  // Получить треки плейлиста
  getPlaylistTracks(playlistId: string): ITrack[] {
    const playlist = this.playlists.find((p) => p.id === playlistId);
    return playlist ? playlist.tracks : [];
  }
}

export const playlistStore = new PlaylistStore();
