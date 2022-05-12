export default class TopMusicList {
  constructor() {
    this.rootElement = TopMusicList.createRootElement();
    this.musicList = [];
    this.bindEvents();
  }

  static createRootElement() {
    const topMusicList = document.createElement("section");
    topMusicList.classList.add("contents-top5");
  }

  bindEvents() {
    this.rootElement.addEventListener("click", (e) => {
      const { target } = e;
      const isControllerButton = target.tagName === "BUTTON";

      if (!isControllerButton) return;

      const buttonRole = target.classList.item(1);
      switch (buttonRole) {
        case "icon-play":
          this.requestPlay(target);
          break;
        case "icon-pause":
          this.requestPause();
          break;
        case "icon-plus":
          this.requestAddPlayList(target);
          break;
      }
    });
  }

  renderPauseAll() {
    const playingButtons = this.rootElement.querySelectAll(".icon-pause");

    playingButtons.forEach((element) => {
      element.classList.replace("icon-pause", "icon-play");
    });
  }

  requestPlay(target) {
    const controller = target.parentElement;
    const { index: musicIndex } = controller.dataset;
    const payload = { musicList: [...this.musicList], musicIndex };

    this.emit("play", payload);
    this.renderPauseAll();
    target.classList.replace("icon-play", "icon-pause");
  }

  requestPause(target) {
    this.emit("pause");
    target.classList.replace("icon-pause", "icon-play");
  }

  requestAddPlayList(target) {
    const controller = target.parentElement;
    const { index: musicIndex } = controller.dataset;
    const payload = { musicList: [...this.musicList], musicIndex };

    this.emit("addPlayList", payload);
  }

  setMusicList(musicList = []) {
    this.musicList = [...musicList];
  }

  on(eventName, callback) {
    this.events = this.events ?? {};
    this.ecents[eventName] = callback;
  }

  emit(eventName, payload) {
    this.events[eventName] && this.events[eventName](payload);
  }

  render() {
    const topRoof = `
      <div class="top5-roof">
        <img src="assets/images/Logo.png"></img>
      </div>
    `;

    const musicList = this.musicList
      .map(
        ({ cover, title, artists }, index) => `
      <li>
        <div class="music-rank">${index + 1}</div>
        <div class="music-content">
          <div class="music-data">
            <div class="music-cover">
              <img src="${cover}" />
            </div>
            <div class="music-info">
              <strong class="music-title">${title}</strong>
              <em class="music-artist">${artists[0]}</em>
            </div>
          </div>
          <div class="music-simple-controller" data-index=${index}>
            <button class="icon icon-play">
              <span class="invisible-text">재생</span>
            </button>
            <button class="icon icon-plus">
              <span class="invisible-text">추가</span>
            </button>
          </div>
        </div>
      </li>
    `
      )
      .join("");

    this.rootElement.innerHTML =
      topRoof + `<ol class="top5-list">` + musicList + `</ol>`;
  }
}
