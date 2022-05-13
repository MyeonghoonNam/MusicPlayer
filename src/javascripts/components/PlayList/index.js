import { getClosestElement, findIndexListElement } from "../../utils/index.js";

export default class PlayList {
  constructor() {
    this.rootElement = PlayList.createRootElement();
    this.musicList = [];
    this.bindEvents();
  }

  static createRootElement() {
    const rootElement = document.createElement("article");
    rootElement.classList.add("contents-playlist");

    return rootElement;
  }

  bindEvents() {
    this.rootElement.addEventListener("click", (e) => {
      const { target } = e;
      const isControllerButton = target.tagName === "BUTTON";

      if (!isControllerButton) {
        return this.playMusic(target);
      }

      this.removeMusic(target);
    });
  }

  playMusic(target) {
    const listItemElement = getClosestElement(target, "LI");
    const musicIndex = findIndexListElement(listItemElement);
    const requestPlay = this.musicList[musicIndex].playing;

    this.musicList.forEach((musicInfo) => {
      musicInfo.playing = false;
    });

    this.rootElement
      .querySelectorAll("li")
      .forEach((el) => el.classList.remove("on"));

    if (!requestPlay) {
      listItemElement.classList.add("on");
      this.musicList[musicIndex].playing = true;
      this.emit("playMusic", { musicList: this.musicList, musicIndex });
    } else {
      this.emit("pauseMusic");
    }
  }

  removeMusic(target) {}

  loadStorage() {
    const stringifiedPlayList = localStorage.getItem("playlist");

    try {
      const playList = JSON.parse(stringifiedPlayList);
      this.musicList = playList instanceof Array ? playList : [];
    } catch (e) {
      console.error(e);
    }
  }

  savaStorage() {
    const musicList = this.musicList.map(
      ({ cover, source, title, artists }) => {
        cover, source, title, artists;
      }
    );

    try {
      localStorage.setItem("playlist", JSON.stringify(musicList));
    } catch (e) {
      console.error(e);
    }
  }

  on(eventName, callback) {
    this.events = this.events ? this.events : {};
    this.events[eventName] = callback;
  }

  emit(eventName, payload) {
    this.events[eventName] = this.events[eventName](payload);
  }

  render() {
    const playListTitle = `<h2 class="playlist-title">My PlayList</h2>`;
    const musicList = this.musicList
      .map((music) => {
        const { cover, title, artists } = music;

        return `
        <li>
          <div class="music-content">
            <div class="music-data">
              <div class="music-cover">
                <img src=${cover}/>
              </div>
              <div class="music-info">
                <strong class="music-title">${title}</strong>
                <em class="music-artist">${artists[0]}</em>
              </div>
            </div>
            <div class="music-controller">
              <button class="icon icon-minus">
                <span class="invisible-text">제거</span>
              </button>
            </div>
          </div>
        </li>
      `;
      })
      .join("");

    this.rootElement.innerHTML =
      playListTitle + '<ul class="music-list">' + musicList + "</ul>";

    return this.rootElement;
  }
}
