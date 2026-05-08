import { makeAutoObservable } from "mobx";
import type { ITrack } from "@/types/track.types";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
  trackKey,
} from "@/functions";

class FavoriteStore {
  favorites: ITrack[] = [];

  constructor() {
    makeAutoObservable(this);
    this.favorites = loadFromLocalStorage<ITrack[]>("favoriteTracks", []);
  }

  // Добавить трек в избранное
  addToFavorites(track: ITrack) {
    // Проверяем, есть ли уже такой трек в избранном
    const key = trackKey(track);
    const isAlreadyFavorite = this.favorites.some(
      (fav) => trackKey(fav) === key,
    );

    if (!isAlreadyFavorite) {
      this.favorites.push(track);
      saveToLocalStorage("favoriteTracks", this.favorites);
    }
  }

  // Удалить трек из избранного
  removeFromFavorites(track: ITrack) {
    const key = trackKey(track);
    this.favorites = this.favorites.filter((fav) => trackKey(fav) !== key);
    saveToLocalStorage("favoriteTracks", this.favorites);
  }

  // Проверить, находится ли трек в избранном
  isFavorite(track: ITrack): boolean {
    const key = trackKey(track);
    return this.favorites.some((fav) => trackKey(fav) === key);
  }
}

export const favoriteStore = new FavoriteStore();
