export const fetchMusicList = async () => {
  const response = await fetch("/musics");

  return await response.json();
};
