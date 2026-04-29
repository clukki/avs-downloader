// ==UserScript==
// @name        Avs downloader
// @namespace   avs_downloader
// @match       https://animevietsub.bz/phim/*/*.html
// @grant       GM.download
// @version     1.0
// @author      clukki
// @description Download videos from animevietsub (parent script).
// ==/UserScript==

let downloadRunning = false;
const onDownload = async (allLinks) => {
  if (downloadRunning) {
    throw new Error("Another download process is running");
  }
  downloadRunning = true;

  // cleanup
  const oldDownload = $("#downloadPanelMsg").attr("href");
  if (oldDownload) {
    unsafeWindow.URL.revokeObjectURL(oldDownload);
  }
  for (const i in allLinks) {
    $(`#downloadPanelProgress${i}`).attr("value", 0);
  }

  let chunks = [];
  for (const i in allLinks) {
    // if (i > 2) {
    //   break;
    // }
    const response = await fetch(allLinks[i]);
    const reader = response.body.getReader();
    const contentLength = +response.headers.get("content-length");
    let receivedLength = 0;
    let chunk = new Uint8Array(contentLength);
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      chunk.set(value, receivedLength);
      receivedLength += value.length;
      $(`#downloadPanelProgress${i}`).attr(
        "value",
        receivedLength / contentLength,
      );
    }
    const iendStart = chunk.findIndex((e, i, a) => {
      if (i >= a.length - 3) {
        return false;
      }
      // iend sig
      if (e == 73 && a[i + 1] == 69 && a[i + 2] == 78 && a[i + 3] == 68) {
        return true;
      }
      return false;
    });
    if (iendStart == -1) {
      throw new Error("can't find IEND signature inside chunk");
    }
    chunks.push(chunk.slice(iendStart + 8));

    await sleep(200 + Math.random() * 300);
  }
  const blob = new Blob(chunks, { type: "video/mp2t" });
  const url = unsafeWindow.URL.createObjectURL(blob);
  $("#downloadPanelDownloadLink")
    .attr("href", url)
    .attr("download", "anime.ts")
    .text(url);
  // GM.download(url, "unnamed.ts");
  downloadRunning = false;
};

let ran = false;
const onLoaded = async (playlist) => {
  if (ran) return;
  ran = true;
  const $downloadPanel = $("<div>")
    .attr("id", "downloadPanel")
    .height($("#media-player").height())
    .css("background-color", "white")
    .css("display", "none")
    .css("overflow", "auto")
    .insertAfter($(".MovieTabNav.ControlPlayer"));

  $("<div>")
    .addClass("Lnk")
    .text("toggle download panel")
    .on("click", () => {
      if ($downloadPanel.css("display") == "none") {
        $downloadPanel.css("display", "block");
      } else if ($downloadPanel.css("display") == "block") {
        $downloadPanel.css("display", "none");
      }
    })
    .appendTo($(".MovieTabNav.ControlPlayer"));

  let allLinks = [];
  let linkI = 0;
  for (const line of playlist.split("\n")) {
    if (line.startsWith("https://")) {
      allLinks.push(line);
      const $linkDiv = $("<div>").appendTo($downloadPanel);
      $("<span>")
        .text(`video${linkI}`)
        .css("margin-right", "0.5em")
        .appendTo($linkDiv);
      $("<progress>")
        .attr("id", `downloadPanelProgress${linkI}`)
        .attr("value", 0)
        .appendTo($linkDiv);
      linkI++;
    }
  }
  $("<a>")
    .attr("id", "downloadPanelDownloadLink")
    .css("color", "black")
    .prependTo($downloadPanel);
  $("<button>")
    .attr("id", "downloadButton")
    .text("Download")
    .on("click", async () => {
      await onDownload(allLinks);
    })
    .prependTo($downloadPanel);
};

unsafeWindow.addEventListener("message", (ev) => {
  if (ev.origin !== "https://storage.googleapiscdn.com") return;
  if (ev.data[0] != "avs-downloader-fetcher") return;
  onLoaded(ev.data[1]);
});
