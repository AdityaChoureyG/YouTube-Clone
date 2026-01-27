const formatDuration = (duration) => {
  // Regex to find numbers before H (hours), M (minutes), and S (seconds)
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);

  // match[1] = Hours, match[2] = Minutes, match[3] = Seconds
  const hours = parseInt(match[1] || 0);
  const minutes = parseInt(match[2] || 0);
  const seconds = parseInt(match[3] || 0);

  // Format the output
  if (hours > 0) {
    // Returns H:MM:SS (ensures minutes and seconds are always 2 digits)
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  } else {
    // Returns MM:SS
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
};
export default formatDuration;

