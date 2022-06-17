export default class PlayView {
  constructor() {
    this.rootElement = PlayView.createRenderElement();
    this.playViewMusic = null;
    this.audio = new Audio();
    this.repeat = false;
    this.random = false;
    this.bindEvents();
  }

  static createRenderElement() {
    const rootElement = document.createElement("article");
    rootElement.classList.add("play-view");

    return rootElement;
  }

  bindEvents() {
    this.audio.addEventListener("ended", () => {
      const fromPauseToPlay = this.rootElement.querySelector(".control-play");
      const fromPlayToPause = this.rootElement.querySelector(".control-pause");

      fromPlayToPause.classList.add("hide");
      fromPauseToPlay.classList.remove("hide");
      this.emit("musicEnded", { repeat: this.repeat, random: this.random });
    });

    let intervaler = 0;
    this.audio.addEventListener("timeupdate", () => {
      intervaler += 1;

      if (intervaler % 3 !== 0) return;

      const audioProgress =
        (this.audio.currentTime / this.audio.duration) * 100;
      const controlProgress = audioProgress > 100 ? 100 : audioProgress;
      const progressBarElement = this.rootElement.querySelector(".progress");
      const currentTimeElement =
        this.rootElement.querySelector(".current-time");
      const endTimeElement = this.rootElement.querySelector(".end-time");
      const total_time = parseInt(this.audio.duration);
      progressBarElement.value = controlProgress ? controlProgress * 10 : 0;

      const current_minute = parseInt((this.audio.currentTime / 60) % 60);
      let current_second = parseInt(this.audio.currentTime % 60);

      if (current_second < 10) {
        current_second = "0" + current_second;
      }

      currentTimeElement.innerHTML = `${current_minute}:${current_second}`;

      const end_minute = parseInt(total_time / 60);
      const end_second = parseInt(total_time % 60);
      endTimeElement.innerHTML = `${end_minute}:${end_second}`;
    });
  }

  playMusic(payload) {
    if (payload) {
      const { musicList, musicIndex } = payload;

      this.audio.src = musicList[musicIndex].source;
      this.playViewMusic = musicList[musicIndex];
      this.render();
    }

    this.audio.play();
  }

  pause() {
    this.audio.pause();
  }

  render() {
    const { cover, artists, title } = this.playViewMusic;

    this.rootElement.innerHTML = `
      <div class="play-view-container">
        <h2 class="invisible-text">Play View</h2>
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
            <button class="control-button control-rotate ${
              this.random ? "on" : ""
            }">
              <i class="icon-controller-repeat"></i>
            </button>
            <button class="control-button control-backward">
              <i class="icon-controller-backward"></i>
            </button>
            <button class="control-button control-play hide">
              <i class="icon-controller-play"></i>
            </button>
            <button class="control-button control-pause">
              <i class="icon-controller-pause"></i>
            </button>
            <button class="control-button control-forward">
              <i class="icon-controller-forward"></i>
            </button>
            <button class="control-button control-repeat ${
              this.repeat ? "on" : ""
            }">
              <i class="icon-controller-rotate"></i>
            </button>
          </div>
          <div class="progress-container">
            <input class="progress" type="range" min="0" max="1000" value="0">
            <div class="progress-time">
              <div class="current-time"></div>
              <div class="end-time"></div>
            </div>
          </div>
        </div>
      </div>
    `;

    const backButton = this.rootElement.querySelector(".back-button");
    const playButton = this.rootElement.querySelector(".control-play");
    const pauseButton = this.rootElement.querySelector(".control-pause");
    const randomButton = this.rootElement.querySelector(".control-rotate");
    const repeatButton = this.rootElement.querySelector(".control-repeat");
    const backwardButton = this.rootElement.querySelector(".control-backward");
    const forwardButton = this.rootElement.querySelector(".control-forward");
    const progress = this.rootElement.querySelector(".progress");

    backButton.addEventListener("click", () => {
      this.hide();
    });

    playButton.addEventListener("click", () => {
      this.playMusic();
      playButton.classList.add("hide");
      pauseButton.classList.remove("hide");
    });

    pauseButton.addEventListener("click", () => {
      this.pause();
      pauseButton.classList.add("hide");
      playButton.classList.remove("hide");
    });

    randomButton.addEventListener("click", () => {
      this.random = !this.random;

      if (this.random) {
        randomButton.classList.add("on");
      } else {
        randomButton.classList.remove("on");
      }
    });

    backwardButton.addEventListener("click", () => {
      this.emit("backward");
    });

    forwardButton.addEventListener("click", () => {
      this.emit("forward");
    });

    repeatButton.addEventListener("click", () => {
      this.repeat = !this.repeat;

      if (this.repeat) {
        repeatButton.classList.add("on");
      } else {
        repeatButton.classList.remove("on");
      }
    });

    progress.addEventListener("change", (event) => {
      const targetTime =
        (this.audio.duration * Number(event.target.value)) / 1000;

      this.audio.currentTime = targetTime;
    });
  }

  show() {
    document.body.append(this.rootElement);
  }

  hide() {
    document.body.removeChild(this.rootElement);
  }

  on(eventName, callback) {
    this.events = this.events ?? {};
    this.events[eventName] = callback;
  }

  emit(eventName, payload) {
    this.events[eventName] && this.events[eventName](payload);
  }
}
