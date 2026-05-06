import { Play } from "lucide-react";

export function Lyrics() {
  return (
    <div className="bg-[#2a2b2f] px-4 py-4 mr-5">
      <div className=" px-4 py-4 font-medium text-yellow-500">[ Verse 1]</div>
      <p className="text-white/50">It might not be the right time</p>
      <p className="text-white/50">I might not be the right one</p>
      <p className="text-white/50">
        But there's something about us I want to say
      </p>
      <p>
        <Play fill="currentColor" className="text-yellow-500 mr-2" size={11} />{" "}
        Cause there's something between us anyway
      </p>
      <div className=" px-4 py-4 font-medium text-yellow-500">[ Verse 2]</div>
      <p className="text-white/50">I might not be the right one</p>
      <p className="text-white/50">It might not be the right time</p>
      <p className="text-white/50">
        But there's something about us I've got to do
      </p>
      <p className="text-white/50">Some kind of secret I will share with you</p>
      <div className=" px-4 py-4 font-medium text-yellow-500">[ Verse 3]</div>
      <p className="text-white/50">I need you more than anything in my life</p>
      <p className="text-white/50">I want you more than anything in my life</p>
      <p className="text-white/50">I'll miss you more than anyone in my life</p>
    </div>
  );
}
