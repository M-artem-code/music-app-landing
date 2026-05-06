import { observer } from "mobx-react-lite";
import { playlistStore } from "@/store/playlist.store";
import type { ITrack } from "@/types/track.types";
import { Check, Plus } from "lucide-react";
import { Modal } from "@/components/ui/modal/modal";

interface AddToPlaylistProps {
  isOpen: boolean;
  onClose: () => void;
  track: ITrack;
}

export const AddToPlaylist = observer(
  ({ isOpen, onClose, track }: AddToPlaylistProps) => {
    const playlists = playlistStore.getPlaylists();

    const handleAdd = (playlistId: string) => {
      playlistStore.addTrackToPlaylist(playlistId, track);
    };

    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="p-4 w-80">
          <h3 className="text-white font-bold mb-3">Add to playlist</h3>

          {playlists.length === 0 && (
            <p className="text-gray-400 text-sm text-center py-6">
              Playlist not defined
            </p>
          )}

          <div className="space-y-1 max-h-60 overflow-y-auto">
            {playlists.map((playlist) => {
              const isAdded = playlist.tracks.some(
                (t) =>
                  t.name === track.name && t.artist.name === track.artist.name,
              );

              return (
                <button
                  key={playlist.id}
                  onClick={() => handleAdd(playlist.id)}
                  disabled={isAdded}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-md hover:bg-zinc-700 disabled:opacity-60"
                >
                  <span className="text-white text-sm">{playlist.name}</span>

                  {isAdded ? (
                    <Check className="text-green-500 w-4 h-4" />
                  ) : (
                    <Plus className="text-gray-400 w-4 h-4" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </Modal>
    );
  },
);
