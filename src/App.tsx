import "./App.css";
import { observer } from "mobx-react-lite";
import { SearchFiield } from "./components/elements/search-field/SearchFiield";
import { Play } from "lucide-react";
import { TRACKS } from "./data/tracks.data";
import { Track } from "./components/elements/track-item/Track";
import { Toaster } from "sonner";
import { useQueryState } from "nuqs";
import { playStore } from "./store/store";
import { useMemo } from "react";
import { useDebounce } from "./functions/useDebounce";

const App = observer(() => {
  const [searchTerm, setSearchTerm] = useQueryState("q");
  const debouncedSearchTerm = useDebounce(searchTerm || "", 400);

  const filteredTracks = useMemo(() => {
    return TRACKS.filter((track) =>
      track.name.toLowerCase().includes((searchTerm || "").toLowerCase()),
    );
  }, [debouncedSearchTerm]);

  return (
    <div>
      <Toaster position="top-center" />
      <SearchFiield
        value={searchTerm || ""}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="relative">
        <img
          src="/src/assets/qwe.webp"
          alt=""
          className="w-full h-64 object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <div className="flex justify-between items-center">
            <div>
              <div>
                <h1 className="text-2xl font-bold mb-1 text-white">
                  {playStore.currentTrack?.name}
                </h1>
                <h2 className="text-yellow-500 font-semibold">
                  {playStore.currentTrack?.artist.listenersCount} Listeners
                </h2>
              </div>
            </div>

            <button className="rounded-full bg-gray-700 p-2 text-white">
              <Play className="text-yellow-500" fill="black" />
            </button>
          </div>
        </div>
      </div>
      <div>
        {filteredTracks.map((track) => (
          <Track key={track.name} track={track} />
        ))}
      </div>
    </div>
  );
});

export default App;
