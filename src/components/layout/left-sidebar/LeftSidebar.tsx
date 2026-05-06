import { LIBRARY_MENU_ITEMS, MENU_ITEMS } from "@/data/menu.data";
import React, { useState } from "react";
import { Menu } from "./Menu";
import { playlistStore } from "@/store/playlist.store";
import { PagesConfig } from "@/config/pages.config";
import { observer } from "mobx-react-lite";
import { Plus } from "lucide-react";
import { CreatePlaylistModal } from "@/components/ui/CreatePlaylistModal";
import clsx from "clsx";

interface Props {
  className?: string;
}

export const LeftSidebar: React.FC<Props> = observer(({ className }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [show, setShow] = useState(false);

  const playlistMenuItems = playlistStore.playlists.map((playlist) => ({
    id: playlist.id,
    name: playlist.name,
    link: PagesConfig.PLAYLIST(playlist.name),
  }));

  return (
    <aside className={className}>
      <Menu items={MENU_ITEMS} />

      <hr className="my-10 border-t border-gray-400 opacity-10" />

      <Menu
        title="Your Library"
        items={LIBRARY_MENU_ITEMS.map((item) => ({
          name: item.name,
          link: typeof item.link === "function" ? item.link("") : item.link,
        }))}
      />

      <hr className="my-10 border-t border-gray-500 opacity-10" />

      <button
        onClick={() => {
          setShow(!show);
        }}
      >
        ВЫБРАТЬ ПЛЕЙЛИСТ
      </button>

      <Menu
        showX={show}
        onDelete={(id: string) => playlistStore.deletePlaylist(id)}
        className={clsx("p-4", show && "border border-gray-300/50 rounded-lg")}
        title="Playlists"
        items={playlistMenuItems}
      >
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-white font-medium flex
        items-center gap-2 bg-zinc-700/50 mt-1.5
         rounded-full duration-300 transition-colors hover:bg-zinc-700/30 py-2 px-3"
        >
          <Plus size={20} /> <span>New Playlist</span>
        </button>
      </Menu>

      <CreatePlaylistModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </aside>
  );
});
