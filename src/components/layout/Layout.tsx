import { type PropsWithChildren } from "react";
import { LeftSidebar } from "./left-sidebar/LeftSidebar";
import { RightSidebar } from "./right-sidebar/RightSidebar";
import { AudioPlayer } from "../elements/playear/AudioPlayer";

export default function Layout({ children }: PropsWithChildren<unknown>) {
  return (
    <>
      <div className="w-screen h-screen overflow-auto grid grid-cols-[1fr_3.5fr_1.2fr] pb-20">
        <LeftSidebar />
        <main className="py-4 px-4">{children}</main>
        <div className="py-6 px-4">
          <RightSidebar />
        </div>
      </div>
      <AudioPlayer />
    </>
  );
}
