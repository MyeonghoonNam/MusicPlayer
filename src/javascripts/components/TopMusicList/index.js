export default class TopMusicList {
  constructor() {
    this.rootElement = TopMusicList.createRootElement();
    this.musicList = [];
  }

  static createRootElement() {
    const topMusicList = document.createElement("section");
    topMusicList.classList.add("contents-top5");
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
