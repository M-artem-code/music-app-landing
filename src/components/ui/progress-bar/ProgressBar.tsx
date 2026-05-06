import { formatDuration } from "@/functions";

interface Props {
  currentValue?: number;
  value?: number;
  onSeek: (time: number) => void;
  isTextDisplayed?: boolean;
  className?: string;
}

export const ProgressBar: React.FC<Props> = ({
  currentValue,
  value,
  onSeek,
  isTextDisplayed,
  className,
}) => {
  return (
    <div className={className}>
      {isTextDisplayed && (
        <span className="text-xs w-[40px] text-right">
          {currentValue ? formatDuration(currentValue) : "0:00"}
        </span>
      )}

      <input
        type="range"
        min={0}
        max={value}
        onChange={(e) => onSeek(Number(e.target.value))}
        value={currentValue}
        className="flex-1"
      />

      {value && isTextDisplayed && (
        <span className="text-xs w-[40px] text-right">
          {formatDuration(value)}
        </span>
      )}
    </div>
  );
};
