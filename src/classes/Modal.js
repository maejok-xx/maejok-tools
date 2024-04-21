import state from "../modules/state";
import * as events from "../modules/events";
import * as functions from "../modules/functions";
import ELEMENTS from "../data/elements";

export default class Modal {
  constructor(title, body) {
    this.title = title;
    this.body = null;
    this.modal = null;
    this.container = null;
    this.titleElement = null;

    this.bodyHTML = body;
    this.uuid = functions.uuid();
    this.modals = state.get("modals");

    this.create();
  }

  create() {
    const main = document.querySelector("main");

    const zIndex = functions.getHighestZIndex();

    this.container = document.createElement("div");
    this.container.classList.add(ELEMENTS.modal.class);
    this.container.classList.add(ELEMENTS.modal.container.class);
    this.container.setAttribute("style", `z-index: ${zIndex + 1}!important`);

    const backdrop = document.createElement("div");
    backdrop.classList.add(ELEMENTS.modal.backdrop.class);
    backdrop.setAttribute("style", `z-index: ${zIndex + 2}!important`);

    this.modal = document.createElement("div");
    this.modal.classList.add(ELEMENTS.modal.class);
    this.modal.setAttribute("style", `z-index: ${zIndex + 3}!important`);

    const header = document.createElement("div");
    header.classList.add(ELEMENTS.modal.header.class);

    const titleWrapper = document.createElement("div");
    titleWrapper.classList.add(ELEMENTS.modal.title.class);

    this.titleElement = document.createElement("h2");
    this.titleElement.classList.add(ELEMENTS.modal.title.class);
    this.titleElement.textContent = this.title;

    const close = document.createElement("div");
    close.classList.add(ELEMENTS.modal.close.class);

    const closeButton = document.createElement("button");
    closeButton.classList.add(...ELEMENTS.modal.close.button.classes);
    closeButton.addEventListener("click", () => events.clickCloseModal(this));

    const closeButtonIcon = document.createElement("img");
    closeButtonIcon.setAttribute(...ELEMENTS.modal.close.button.image.attr);

    this.body = document.createElement("div");
    this.body.classList.add(ELEMENTS.modal.body.class);

    header.appendChild(titleWrapper);
    titleWrapper.appendChild(this.titleElement);
    header.appendChild(close);
    close.appendChild(closeButton);
    closeButton.appendChild(closeButtonIcon);
    this.modal.appendChild(header);
    this.modal.appendChild(this.body);
    main.parentElement.insertBefore(this.container, main.nextSibling);
    this.container.appendChild(backdrop);
    this.container.appendChild(this.modal);

    this.setBody(this.bodyHTML);

    state.set("modals", [...this.modals, this.uuid]);
  }

  getElement() {
    return this.modal;
  }

  setTitle(title) {
    this.titleElement.textContent = title;
  }

  setBody(content) {
    if (!content) {
      return;
    } else if (content instanceof HTMLElement) {
      this.body.appendChild(content);
    } else {
      this.body.innerHTML = content;
    }
  }

  destroy = (node) => {
    if (!node) node = this.container;
    state.set(
      "modals",
      this.modals.filter((item) => item !== this.uuid)
    );
    for (const prop in this) {
      if (this.hasOwnProperty(prop)) {
        this[prop] = null;
      }
    }
    node?.remove();
  };
}
