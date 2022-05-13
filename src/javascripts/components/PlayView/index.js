export default class PlayView {
  constructor() {
    this.renderElement = PlayView.createRenderElement();
    this.playViewMusic = null;
  }

  static createRenderElement() {
    const renderElement = document.createElement("article");
    renderElement.classList.add("play-view");

    return renderElement;
  }

  render() {
    const { cover, artists, title } = this.playViewMusic;

    this.renderElement.innerHTML = `
      <div class="play-view-container">
        <h2 class="invisible-text>Play View</h2>
        <button class="back-button">
          <i class="icon-controller-back"></i>
        </button>
        <div class="cover-container">
          <img src=${cover} />
        </div>
        <div class="music-info">
          <h3 class="music-title">${title}</h3>
          <span class="music-artist-name">${artists.join(", ")}</span>
        </div>
        <div class="play-view-controller">
          <div class="controller-container">
            <button class="control-button control-repeat ${this.repeat && "on"}>
              <i class="icon-controller-repeat"></i>
            </button>
            <button class="control-button control-backward>
              <i class="icon-controller-backward"></i>
            </button>
            <button class="control-button control-play hide>
              <i class="icon-controller-play"></i>
            </button>
            <button class="control-button control-pause>
              <i class="icon-controller-pause"></i>
            </button>
            <button class="control-button control-forward>
              <i class="icon-controller-forward"></i>
            </button>
            <button class="control-button control-rotate ${this.random && "on"}>
              <i class="icon-controller-rotate"></i>
            </button>
          </div>
          <div class="progress-container">
            <input class="progress" type="range" min="0" max="1000" value="0">
            <div class="progress-time">
              <div class="current-time">0:02</div>
              <div class="end-time">3:56</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
