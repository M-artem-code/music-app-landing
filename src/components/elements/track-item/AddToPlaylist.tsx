import { observer } from "mobx-react-lite";
import { playlistStore } from "@/store/playlist.store";
import type { ITrack } from "@/types/track.types";
import { trackKey } from "@/functions";
import { Check, Plus } from "lucide-react";
import { Modal } from "@/components/ui/modal/modal";
import { useState } from "react";
import { toast } from "sonner";

interface AddToPlaylistProps {
  isOpen: boolean;
  onClose: () => void;
  track: ITrack;
}

export const AddToPlaylist = observer(
  ({ isOpen, onClose, track }: AddToPlaylistProps) => {
    const playlists = playlistStore.getPlaylists();
    const [newPlaylistName, setNewPlaylistName] = useState("");

    const handleToggle = (playlistId: string, playlistName: string) => {
      const result = playlistStore.toggleTrackInPlaylist(playlistId, track);

      if (result === "added") {
        toast.success(`Added to "${playlistName}"`);
        return;
      }

      if (result === "removed") {
        toast.success(`Removed from "${playlistName}"`);
      }
    };

    const handleQuickCreate = () => {
      const name = newPlaylistName.trim();
      if (!name) return;

      const playlist = playlistStore.createPlaylist(name);
      playlistStore.addTrackToPlaylist(playlist.id, track);
      setNewPlaylistName("");
      toast.success(`Playlist "${name}" created and track added`);
    };

    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="p-4 w-80">
          <h3 className="text-white font-bold mb-3">Add to playlist</h3>

          {playlists.length === 0 && (
            <div className="space-y-3 py-2">
              <p className="text-gray-400 text-sm text-center">
                No playlists yet — create one to save this track
              </p>
              <input
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleQuickCreate()}
                placeholder="Playlist name"
                className="w-full bg-zinc-700 text-white rounded-md px-3 py-2 text-sm"
              />
              <button
                type="button"
                onClick={handleQuickCreate}
                disabled={!newPlaylistName.trim()}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-zinc-700 hover:bg-zinc-600 disabled:opacity-50 text-white text-sm"
              >
                <Plus className="w-4 h-4" />
                Create & add
              </button>
            </div>
          )}

          <div className="space-y-1 max-h-60 overflow-y-auto">
            {playlists.map((playlist) => {
              const key = trackKey(track);
              const isAdded = playlist.tracks.some((t) => trackKey(t) === key);

              return (
                <button
                  key={playlist.id}
                  type="button"
                  onClick={() => handleToggle(playlist.id, playlist.name)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-md hover:bg-zinc-700"
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
