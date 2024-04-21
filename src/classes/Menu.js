import state from "../modules/state";
import * as functions from "../modules/functions";
import ELEMENTS from "../data/elements";

export default class Menu {
  constructor(position, items, options) {
    this.position = position;
    this.items = items;
    this.title = options.title;
    this.titleColor = options.titleColor;
    this.class = options.class;
    this.id = functions.uuid();
    this.menu = null;
    this.noItems = options.noItems;
    this.create();
    this.setPosition(this.position);
  }

  create = () => {
    const zIndex = functions.getHighestZIndex();

    this.menu = document.createElement("div");
    this.menu.classList.add(ELEMENTS.menu.class);
    this.menu.classList.add(this.class);
    this.menu.id = `maejok-menu-${this.id}`;
    this.menu.style.zIndex = zIndex + 1;

    if (this.title) {
      const menuTitle = document.createElement("div");
      menuTitle.classList.add(ELEMENTS.menu.title.class);
      menuTitle.innerText = this.title;

      if (this.titleColor) {
        const color  = functions.isColorTooDark(this.titleColor) ?
          functions.increaseColorBrightness(this.titleColor) :
          this.titleColor;

        menuTitle.setAttribute("style", `color: ${color}`);
      } else {
        menuTitle.setAttribute("style", `color: #28d97f`);
      }
      this.menu.appendChild(menuTitle);
    }

    this.items.forEach((item) => {
      const menuItem = document.createElement("div");
      menuItem.classList.add(ELEMENTS.menu.item.class, item.class ?? null);
      menuItem.style.textAlign = item.align || "center";
      menuItem.setAttribute("title", item.hover || "");
      menuItem.innerHTML = item.label;
      menuItem.onclick = item.action;
      this.menu.appendChild(menuItem);
    });

    if (this.items.length === 0) {
      const menuItem = document.createElement("div");
      menuItem.classList.add(ELEMENTS.menu.noItems.class);
      menuItem.style.textAlign = "center";
      menuItem.innerHTML = this.noItems;
      this.menu.appendChild(menuItem);
    }

    const main = document.querySelector("main");

    main.appendChild(this.menu);
    functions.playSound("click-high-short");
  };

  setPosition = (position) => {
    this.position = position;

    const menu = document.getElementById(`maejok-menu-${this.id}`);

    const menuWidth = menu.offsetWidth;

    const leftBoundary = menu.getBoundingClientRect().left + menuWidth;
    const spaceOnRight = window.innerWidth - leftBoundary;
    const maxRight = spaceOnRight;

    this.position.x = Math.min(this.position.x - menuWidth / 2, maxRight);

    menu.style.left = `${this.position.x}px`;

    const bottomThreshold = window.innerHeight - 50;
    if (this.position.y + menu.offsetHeight > bottomThreshold) {
      menu.style.top = `${this.position.y - menu.offsetHeight - 6}px`;
    } else {
      menu.style.top = `${this.position.y}px`;
    }
  };

  destroy = () => {
    functions.playSound("shutter");
    this.menu.remove();
    state.set("menu", null);
    for (const prop in this) {
      if (this.hasOwnProperty(prop)) {
        this[prop] = null;
      }
    }
  };
}
