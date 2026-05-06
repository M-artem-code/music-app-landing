import { observer } from "mobx-react-lite";
import { playStore } from "@/store/store";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import type { ITrack } from "@/types/track.types";
import { Pause, Play } from "lucide-react";

interface Props {
  className?: string;
  image: string;
  title: string;
  subtitle: string;
  track?: ITrack | null;
}

export const TrackInfo: React.FC<Props> = observer(
  ({ className, image, title, subtitle, track }) => {
    const isActive = playStore.currentTrack?.name === track?.name;

    const handleClick = () => {
      if (!track) return;

      if (!isActive) {
        // переключаем трек и сразу ставим на воспроизведение
        playStore.setTrack(track);
        playStore.isPlaying = true;
      } else {
        // для активного трека — обычный toggle
        playStore.tooglePlayPause();
      }
    };

    return (
      <div className={className}>
        <div className="flex items-center space-x-3">
          {track ? (
            <button onClick={handleClick} className="relative block">
              {/* Круговой прогресс поверх картинки (если активный) */}
              {isActive && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-12 h-12">
                    <CircularProgressbar
                      strokeWidth={5}
                      value={playStore.progress}
                      styles={{
                        trail: { stroke: "#2E3235" },
                        path: { stroke: "#edb300" },
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Иконка плей/пауза поверх (делаем через span, а не кнопку) */}
              {isActive && (
                <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  {playStore.isPlaying ? <Pause /> : <Play />}
                </span>
              )}

              <img src={image} alt={title} className="w-12 h-12 rounded-full" />
            </button>
          ) : (
            <img src={image} alt={title} className="w-12 h-12 rounded-full" />
          )}

          <div>
            <div
              onClick={handleClick}
              className="text-white font-medium hover:underline cursor-pointer"
            >
              {title}
            </div>
            <div className="text-gray-400 text-sm">{subtitle}</div>
          </div>
        </div>
      </div>
    );
  },
);
