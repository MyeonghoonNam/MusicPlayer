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
          // 음악 실행 함수 구현
          break;
        case "icon-pause":
          // 음악 중지 함수 구현
          break;
        case "icon-plus":
          // 음악 추가 함수 궇현
          break;
      }
    });
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
          <div class="music-simple-controller">
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
