import { playStore } from "@/store/store";
import { useRef } from "react";

export const useAudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const tooglePlay = () => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      audioRef.current
        .play()
        .then(() => {
          playStore.isPlaying = true;
        })
        .catch(() => {
          playStore.isPlaying = false;
        });
    } else {
      audioRef.current.pause();
      playStore.isPlaying = false;
    }
  };

  const onSeek = (time: number) => {
    if (!audioRef.current) return;

    audioRef.current.currentTime = time;
    playStore.seek(time);
  };

  const changeTrack = (type: "next" | "prev") => {
    playStore.changeTrack(type);
  };

  const setVolume = (volume: number) => {
    if (!audioRef.current) return;

    audioRef.current.volume = volume / 100;
    playStore.setVolume(volume);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;

    if (playStore.volume > 0) {
      playStore.previousVolume = playStore.volume;
      audioRef.current.volume = 0;
      playStore.setVolume(0);
    } else {
      const prev = playStore.previousVolume > 0 ? playStore.previousVolume : 85;
      audioRef.current.volume = prev / 100;
      playStore.setVolume(prev);
    }
  };

  return {
    audioRef,
    tooglePlay,
    onSeek,
    changeTrack,
    setVolume,
    toggleMute,
  };
};
