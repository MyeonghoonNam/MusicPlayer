import { Intro, TabButtons } from "./components/index.js";
import { removeAllChildNodes } from "./utils/index.js";

export default class App {
  constructor(props) {
    this.props = props;
    this.currentMainIndex = 0;
  }

  setUp() {
    const { el } = this.props;
    this.rootElement = document.querySelector(el);
    this.intro = new Intro();
    this.tabButtons = new TabButtons();

    this.bindEvents();
    this.init();
  }

  bindEvents() {
    this.tabButtons.on("clickTab", (payload) => {
      const { currentIndex = 0 } = payload;
      this.currentMainIndex = currentIndex;
    });
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
