import { useState } from "react";
import { playlistStore } from "@/store/playlist.store";
import { Modal } from "./modal/modal";

interface CreatePlaylistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreatePlaylistModal = ({
  isOpen,
  onClose,
}: CreatePlaylistModalProps) => {
  const [playlistName, setPlaylistName] = useState("");

  const handleCreate = () => {
    if (!playlistName.trim()) return;

    playlistStore.createPlaylist(playlistName.trim());
    setPlaylistName("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6 w-96">
        <h2 className="text-xl font-bold text-white mb-4">Create playlist</h2>

        <input
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
          placeholder="Playlist name"
          className="w-full bg-zinc-700 text-white rounded-md px-3 py-2"
        />

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleCreate}>Create</button>
        </div>
      </div>
    </Modal>
  );
};
