export default class SearchView {
  constructor() {
    this.rootElement = SearchView.createRootElement();
    this.bindEvents();
  }

  static createRootElement() {
    const rootElement = document.createElement("article");
    rootElement.classList.add("contents-search");
    rootElement.innerHtml = `
      <div class="search-controller">
        <input class="search-input" type="text" placeholder="검색"/>
        <button class="search-button">
          <i class="icon-search-controller"></i>
        </button>
      </div>
      <ul class="music-list"></ul>
    `;

    return rootElement;
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

  on(eventName, callback) {
    this.events = this.events ?? {};
    this.events[eventName] = callback;
  }

  emit(eventName, payload) {
    this.events[eventName] && this.events[eventName](payload);
  }
}
