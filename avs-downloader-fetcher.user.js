// ==UserScript==
// @name        Avs downloader fetcher
// @namespace   avs_downloader
// @match       https://storage.googleapiscdn.com/player/*
// @version     1.0
// @author      clukki
// @description Playlist fetcher for parent script. Requires parent script to be installed.
// ==/UserScript==

ID_REGEX = /id = "(.*)"/;
TOKEN_REGEX = /avsToken = "(.*)"/;

const getPlaylist = async () => {
  const lastScript = document.querySelector("head script:last-of-type");
  if (!lastScript) {
    throw new Error("Error finding the last script element");
  }
  const meta = lastScript.innerHTML;
  const id = meta.match(ID_REGEX)[1];
  const token = meta.match(TOKEN_REGEX)[1];
  const playlist = await (
    await fetch(
      `https://storage.googleapiscdn.com/playlist/${id}/playlist.m3u8?token=${token}`,
    )
  ).text();
  return playlist;
};

(async () => {
  unsafeWindow.top.postMessage(
    ["avs-downloader-fetcher", await getPlaylist()],
    "https://animevietsub.id",
  );
})();
