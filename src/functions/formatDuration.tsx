export const formatDuration = (num: number): string => {

  const minutes = Math.floor(num / 60);
  const seconds = num % 60;
  const formattedSeconds = String(seconds).padStart(2, "0");
  return `${minutes}:${formattedSeconds}`;
};

