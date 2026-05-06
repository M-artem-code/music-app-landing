import type { ITrack } from "../types/track.types";
import { ARTISTS } from "./artist.data";

export const TRACKS: ITrack[] = [
  {
    name: "Fat Nick New Opps",
    file: "/audio/Fat Nick New Opps.mp3", // Убираем /public
    artist: ARTISTS[0],
    duration: 200,
  },
  {
    name: "N ave New Opps",
    file: "/audio/n ave flawless.mp3", // Убираем /public
    artist: ARTISTS[1],
    duration: 300,
  },
  {
    name: "Sn w New Opps",
    file: "/audio/Sn w Fake Friend.mp3", // Убираем /public
    artist: ARTISTS[2],
    duration: 190,
  },
  {
    name: "Sikh Nyla New Opps",
    file: "/audio/Sihk Nvla Next Level.mp3", // Убираем /public
    artist: ARTISTS[3],
    duration: 401,
  },
  {
    name: "NiveK New Opps",
    file: "/audio/Nivek Fforhs Serialnumber.mp3", // Убираем /public
    artist: ARTISTS[4],
    duration: 198,
  },
];

