import { getClosestElement, findIndexListElement } from "../../utils/index.js";

export default class TabButtons {
  constructor() {
    this.renderElement = TabButtons.createRenderElement();
    this.bindEvents();
  }

  static createRenderElement() {
    const tabsContainer = document.createElement("ul");
    tabsContainer.classList.add("app-controller");

    const tabs = [
      { title: "Top 5", iconName: "icon-top5" },
      { title: "Play List", iconName: "icon-playlist" },
      { title: "Search", iconName: "icon-search" },
    ];

    tabsContainer.innerHTML = tabs
      .map((tab) => {
        return `
        <li>
          <button type="button" class="button-app-controller">
            <i class="tap-icon" ${tab.iconName}></i>
            ${tab.title}
          </button>
        </li>
      `;
      })
      .join("");

    return tabsContainer;
  }

  bindEvents() {
    this.renderElement.addEventListener("click", (e) => {
      const element = getClosestElement(e.target, "li");
      const currentIndex = findIndexListElement(element);

      this.emit("clickTab", { currentIndex });
    });
  }

  on(eventName, callback) {
    this.events = this.events ?? {};
    this.events[eventName] = callback;
  }

  emit(eventName, payload) {
    this.events[eventName] && this.events[eventName](payload);
  }

  render() {
    return this.renderElement;
  }
}
