import { Intro, TabButtons, TopMusicList } from "./components/index.js";
import { removeAllChildNodes } from "./utils/index.js";
import { fetchMusicList } from "../apis/index.js";

export default class App {
  constructor(props) {
    this.props = props;
    this.mainViewComponents = [];
    this.currentMainViewIndex = 0;
  }

  async setUp() {
    const { el } = this.props;
    this.rootElement = document.querySelector(el);

    this.intro = new Intro();
    this.tabButtons = new TabButtons();
    this.topMusicList = new TopMusicList();
    this.mainViewComponents = [this.topMusicList];

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
    const { musics = [] } = response;

    this.topMusicList.setMusicList(musics);
  }

  init() {
    this.intro.show();
    setTimeout(() => {
      this.render();
      this.intro.hide();
    }, 2000);
  }

  renderMainView() {
    const renderComponent = this.mainViewComponents[this.currentMainViewIndex];

    return renderComponent && renderComponent.render();
  }

  render() {
    removeAllChildNodes(this.rootElement);
    const tabButtons = this.tabButtons.render();
    const mainView = this.renderMainView();

    this.rootElement.append(tabButtons);
    this.rootElement.append(mainView);
  }
}
