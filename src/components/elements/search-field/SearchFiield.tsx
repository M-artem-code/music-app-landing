import { Search } from "lucide-react";
import React, { type ChangeEvent } from "react";

interface Props {
  className?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const SearchFiield: React.FC<Props> = ({
  className,
  value,
  onChange,
}: Props) => {
  return (
    <div className={className}>
      <label className="flex items-center gap-2  mb-2">
        <Search className="opacity-40" />
        <input
          type="text"
          placeholder="Search for songs, artists, and more"
          className="bg-transparent w-full gap-3 group"
          value={value}
          onChange={onChange}
        />
      </label>
    </div>
  );
};
