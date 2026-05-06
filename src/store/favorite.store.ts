import { makeAutoObservable } from "mobx";
import type { ITrack } from "@/types/track.types";
import { loadFromLocalStorage, saveToLocalStorage } from "@/functions";

class FavoriteStore {
  favorites: ITrack[] = [];

  constructor() {
    makeAutoObservable(this);
    this.favorites = loadFromLocalStorage<ITrack[]>("favoriteTracks", []);
  }

  // Добавить трек в избранное
  addToFavorites(track: ITrack) {
    // Проверяем, есть ли уже такой трек в избранном
    const isAlreadyFavorite = this.favorites.some(
      (fav) => fav.name === track.name && fav.artist.name === track.artist.name,
    );

    if (!isAlreadyFavorite) {
      this.favorites.push(track);
      saveToLocalStorage("favoriteTracks", this.favorites);
    }
  }

  // Удалить трек из избранного
  removeFromFavorites(track: ITrack) {
    this.favorites = this.favorites.filter(
      (fav) =>
        !(fav.name === track.name && fav.artist.name === track.artist.name),
    );
    saveToLocalStorage("favoriteTracks", this.favorites);
  }

  // Проверить, находится ли трек в избранном
  isFavorite(track: ITrack): boolean {
    return this.favorites.some(
      (fav) => fav.name === track.name && fav.artist.name === track.artist.name,
    );
  }
}

export const favoriteStore = new FavoriteStore();
