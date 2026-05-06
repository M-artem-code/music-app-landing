import { ProgressBar } from "@/components/ui/progress-bar/ProgressBar";
import { TrackInfo } from "@/components/ui/track-info/TrackInfo";
import { playStore } from "@/store/store";
import {
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume1,
  Volume2,
  VolumeOff,
} from "lucide-react";
import { observer } from "mobx-react-lite";
import { useAudioPlayer } from "./useAudioPlayer";
import { useEffect } from "react";

export const AudioPlayer = observer(() => {
  const { audioRef, changeTrack, onSeek, setVolume, tooglePlay, toggleMute } =
    useAudioPlayer();

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // если isPlaying true — пытаемся воспроизвести (пользовательский клик или программно)
    if (playStore.isPlaying) {
      // browser может отклонить play(), но клик по треку — пользовательское действие, обычно OK
      audio
        .play()
        .then(() => {
          // всё ок
        })
        .catch((err) => {
          console.warn("Play blocked:", err);
          // если нужно — можно фоллбек: оставить isPlaying = false
          playStore.isPlaying = false;
        });
    } else {
      audio.pause();
    }
    // Подписываем effect на файл трека и флаг isPlaying
  }, [audioRef, playStore.currentTrack?.file, playStore.isPlaying]);

  if (!playStore.currentTrack) {
    return null;
  }

  return (
    <div className="flex pl-10 pr-10 justify-between items-center fixed bottom-0 left-0 right-0 bg-[#2f3034] p-4 border-t border-white/20">
      <TrackInfo
        title={playStore.currentTrack?.name || "Название трека"}
        subtitle={playStore.currentTrack?.artist.name || "Исполнитель"}
        image={playStore.currentTrack?.artist.image || ""}
      />

      <audio
        ref={audioRef}
        src={playStore.currentTrack.file}
        onTimeUpdate={(e) => {
          playStore.currentTime = Math.floor(e.currentTarget.currentTime);

          // console.log(playStore.currentTime);
          playStore.seek(playStore.currentTime);
        }}
        onEnded={() => {
          playStore.isPlaying = false;
          changeTrack("next");
        }}
        onLoadedMetadata={() => {
          // Обновляем продолжительность трека при загрузке
          if (audioRef.current && playStore.currentTrack) {
            playStore.currentTrack.duration = Math.floor(
              audioRef.current.duration,
            );
          }
        }}
      />

      <div className="flex justify-center flex-1">
        <div className="flex items-center space-x-4 w-full max-w-[850px]">
          <button
            onClick={() => changeTrack("prev")}
            className="opacity-80 hover:opacity-100 duration-300"
          >
            <SkipBack size={20} />
          </button>

          <button
            className="border transition-transform will-change-transform
            hover:scale-105 group hover:shadow text-yellow-500 border-white/5
            border-solid duration-300 p-3 rounded-full bg-gradient-to-r from-[#3C3D41]
          to-[#444549]"
            onClick={tooglePlay}
          >
            {playStore.isPlaying ? (
              <Pause />
            ) : (
              <Play className="group-hover:fill-yellow-500" />
            )}
          </button>

          <button
            onClick={() => changeTrack("next")}
            className="opacity-80 hover:opacity-100 duration-300"
          >
            <SkipForward size={20} />
          </button>

          <ProgressBar
            className="flex items-center gap-2 flex-1"
            currentValue={playStore.currentTime}
            value={playStore.currentTrack?.duration}
            onSeek={(time: number) => onSeek(time)}
            isTextDisplayed
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <ProgressBar
          className="flex items-center gap-2 w-[120px]"
          currentValue={playStore.volume}
          value={100}
          onSeek={(time: number) => setVolume(time)}
        />

        {playStore.volume == 0 ? (
          <VolumeOff onClick={toggleMute} className="cursor-pointer" />
        ) : playStore.volume < 50 ? (
          <Volume1 onClick={toggleMute} className="cursor-pointer" />
        ) : (
          <Volume2 onClick={toggleMute} className="cursor-pointer" />
        )}
      </div>
    </div>
  );
});
