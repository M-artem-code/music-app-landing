import { TrackInfo } from "@/components/ui/track-info/TrackInfo";
import { formatDuration } from "@/functions";
import { favoriteStore } from "@/store/favorite.store";
import type { ITrack } from "@/types/track.types";
import { Ellipsis, Heart } from "lucide-react";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { toast } from "sonner";
import { AddToPlaylist } from "./AddToPlaylist";

interface Props {
  track: ITrack;
}

export const Track: React.FC<Props> = observer(({ track }: Props) => {
  const isFav = favoriteStore.isFavorite(track);
  const [showAddToPlaylist, setShowAddToPlaylist] = useState(false);

  return (
    <div className="flex items-center justify-between p-2 hover:bg-gray-800 border-b border-gray-700/20">
      <TrackInfo
        image={track.artist.image}
        title={track.name}
        subtitle={formatDuration(track.duration)}
        track={track}
      />

      <div className="flex items-center space-x-2">
        {isFav ? (
          <button
            onClick={() => {
              favoriteStore.removeFromFavorites(track);
              toast.success("Track removed from favorites");
            }}
            className="cursor-pointer"
          >
            <Heart className="text-yellow-500 w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={() => {
              favoriteStore.addToFavorites(track);
              toast.success("Track added to favorites");
            }}
            className="cursor-pointer"
          >
            <Heart className="opacity-50 w-4 h-4" />
          </button>
        )}

        <div className="relative">
          <Ellipsis
            onClick={() => setShowAddToPlaylist(true)}
            className="opacity-50 w-4 h-4 cursor-pointer"
          />
        </div>
      </div>
      <AddToPlaylist
        track={track}
        isOpen={showAddToPlaylist}
        onClose={() => setShowAddToPlaylist(false)}
      />
    </div>
  );
});
