const SLIDER_ACTIONS = {
  UP: "+",
  DOWN: "-",
};

class Slider {
  container;
  items;
  itemsElements;

  constructor(container, items) {
    this.setContainer(container);
    this.setItems(items);
    this.mountSlides();
  }

  rearrangeSlideBack() {
    const items = this.getItems();
    const newItems = [items[items.length - 1]];

    for (let i = 1; i < items.length; ++i) {
      newItems[i] = items[i - 1];
    }
    this.setItems(newItems);
    this.mountSlides();
  }

  rearrangeSlideForward() {
    const items = this.getItems();

    const newItems = [items[items.length - 1]];

    for (let i = 0; i < items.length - 1; ++i) {
      newItems[i + 1] = items[i];
    }

    this.setItems(newItems);
    this.setItemsElements(document.querySelectorAll(".card"));
    this.mountSlides();
  }

  mountSlides() {
    this.getContainer().innerHTML = "";
    console.log(this.getItems());
    const newArr = [];
    const imgs = [];
    this.getItems().forEach((item, id) => {
      const card = document.createElement("div");
      card.classList.add("card");
      imgs.push(item);
      if (id + 1 == this.getItems().length) {
        card.classList.add("active");
      }
      newArr.push(card);
      this.getContainer().appendChild(card);
    });
    const cards = [...document.querySelectorAll(".card")];
    cards.forEach((card, id) => {
      if (id == 0) {
        card.style.animation = `slideForward 1000ms linear forwards ${
          id * 100
        }ms`;
      }
      if (id == 1) {
        document.querySelector(
          ".slider"
        ).style.gridTemplateColumns = `10fr 5fr 5fr`;

        setTimeout(() => {
          document.querySelector(
            ".slider"
          ).style.gridTemplateColumns = `3fr 1fr 1fr`;
        }, 500);
      }
      // card.style.animation = `slideBackward 500ms linear forwards ${id * 40}ms`;

      card.style.backgroundImage = `url(${imgs[id]})`;
    });

    this.setItemsElements(newArr);
    const activeCard = document.querySelector(".card.active");
  }

  slide(direction) {
    switch (direction) {
      case "+":
        this.rearrangeSlideForward();
        break;
      case "-":
        this.rearrangeSlideBack();
        break;
      default:
        console.log("nao há direção");
    }
  }

  getContainer() {
    return this.container;
  }

  setContainer(container) {
    this.container = container;
  }

  getItems() {
    return this.items;
  }

  setItems(items) {
    this.items = items;
  }

  getItemsElements() {
    return this.itemsElements;
  }

  setItemsElements(itemsElements) {
    this.itemsElements = itemsElements;
  }
}

const sliderContainer = document.querySelector(".slider");
const slidesInfo = [
  "src/imagens/rio.jpeg",
  "src/imagens/maragogi.jpg",
  "src/imagens/flonopx.jpg",
];

const slider = new Slider(sliderContainer, slidesInfo);
