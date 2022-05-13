import {
  Intro,
  PlayList,
  SearchView,
  TabButtons,
  TopMusicList,
} from "./components/index.js";
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
    this.searchView = new SearchView();
    this.playList = new PlayList();

    this.mainViewComponents = [
      this.topMusicList,
      this.playList,
      this.searchView,
    ];

    this.bindEvents();
    await this.fetchMusicData();
    this.init();
  }

  bindEvents() {
    this.tabButtons.on("clickTab", (payload) => {
      const { currentIndex = 0 } = payload;
      this.currentMainViewIndex = currentIndex;
      this.render();
    });

    this.topMusicList.on("play", (payload) => {
      // 기능 구현 필요
    });

    this.topMusicList.on("pause", () => {
      // 기능 구현 필요
    });

    this.topMusicList.on("addPlayList", (payload) => {
      const { musicList, musicIndex } = payload;
      this.playList.add(musicList[musicIndex]);
    });

    this.playList.on("play", () => {
      // play view 구현 필요
    });

    this.playList.on("pause", () => {
      // play view 구현 필요
    });

    this.searchView.on("searchMusic", (query) => {
      if (!query) {
        return this.searchView.setSearchMusicList([]);
      }

      const searchedMusicList = this.topMusicList.musicList.filter((music) => {
        const { artists, title } = music;
        const upperCaseQuery = query.toUpperCase();
        const filteringName = artists.some((artist) =>
          artist.toUpperCase().includes(upperCaseQuery)
        );
        const filteringTitle = title.toUpperCase().includes(upperCaseQuery);

        return filteringName || filteringTitle;
      });

      this.searchView.setSearchMusicList(searchedMusicList);
    });

    this.searchView.on("play", (payload) => {
      // 기능 구현 필요
    });

    this.searchView.on("pause", () => {
      // 기능 구현 필요
    });

    this.searchView.on("addPlayList", (payload) => {
      const { musicList, musicIndex } = payload;
      this.playList.add(musicList[musicIndex]);
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
