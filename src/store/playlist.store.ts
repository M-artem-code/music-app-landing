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

  // Добавить трек в плейлист
  addTrackToPlaylist(playlistId: string, track: ITrack) {
    const playlist = this.playlists.find((p) => p.id === playlistId);
    if (playlist) {
      // Проверяем, есть ли уже такой трек в плейлисте
      const key = trackKey(track);
      const isAlreadyInPlaylist = playlist.tracks.some(
        (t) => trackKey(t) === key,
      );

      if (!isAlreadyInPlaylist) {
        playlist.tracks.push(track);
        saveToLocalStorage("playlists", this.playlists);
      }
    }
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
