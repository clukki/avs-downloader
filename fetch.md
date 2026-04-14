# my own notes for procedures to fetch the video files after recent changes

- get link of player window iframe (at `window.PLAYER_DATA.link`)
- fetch html from link, get variable `id` and `avsToken` from the last `script` tag of the `head` element
- compose .m3u8 link like below:
  ```js
  var token = avsToken ? "?token=" + encodeURIComponent(avsToken) : "";
  var m3u8 = "/playlist/" + id + "/playlist.m3u8" + token;
  ```
- the downloading step is the same as before so no changes
