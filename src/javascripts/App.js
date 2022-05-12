import { Intro, TabButtons, TopMusicList } from "./components/index.js";
import { removeAllChildNodes } from "./utils/index.js";
import { fetchMusicList } from "../apis/index.js";

export default class App {
  constructor(props) {
    this.props = props;
    this.currentMainIndex = 0;
  }

  async setUp() {
    const { el } = this.props;
    this.rootElement = document.querySelector(el);

    this.intro = new Intro();
    this.tabButtons = new TabButtons();
    this.topMusicList = new TopMusicList();

    this.bindEvents();
    await this.fetchMusicData();
    this.init();
  }

  bindEvents() {
    this.tabButtons.on("clickTab", (payload) => {
      const { currentIndex = 0 } = payload;
      this.currentMainIndex = currentIndex;
    });

    this.topMusicList.on("play", (payload) => {
      // 기능 구현 필요
    });

    this.topMusicList.on("pause", () => {
      // 기능 구현 필요
    });

    this.topMusicList.on("addPlayList", (payload) => {
      // 기능 구현 필요
    });
  }

  async fetchMusicData() {
    const response = await fetchMusicList();
    const { musicList = [] } = response;

    this.topMusicList.setMusicList(musicList);
  }

  init() {
    this.intro.show();
    setTimeout(() => {
      this.render();
      this.intro.hide();
    }, 2000);
  }

  render() {
    removeAllChildNodes(this.rootElement);
    const tabButtons = this.tabButtons.render();
    this.rootElement.append(tabButtons);
  }
}
