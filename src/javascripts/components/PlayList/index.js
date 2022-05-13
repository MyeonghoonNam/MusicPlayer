export default class PlayList {
  constructor() {
    this.rootElement = PlayList.createRootElement();
    this.musicList = [];
  }

  static createRootElement() {
    const rootElement = document.createElement("article");
    rootElement.classList.add("contents-playlist");

    return rootElement;
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
