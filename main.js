class Grid {
  constructor(node) {
    this.node = node;
    this.index = 0;
    this.elements = {};
    this.inflateHTML(16);
    this.setEvents();
  }

  static get MODIFIERS () {
    return {
      ITEM_SELECTED: 'grid__item--selected'
    }
  }

  static get itemHTML () {
    return (
      `<div class="grid__item"></div>`
    )
  }

  inflateHTML (number) {
    this.node.innerHTML = Array(number).fill(null).map( _ => Grid.itemHTML).join('');
    this.elements.items = this.node.querySelectorAll('.grid__item')
  }

  setEvents () {
    this.node.addEventListener('click', this.gridHandler.bind(this));
  }

  gridHandler (event) {
    const isItem = event.target.classList.contains('grid__item');

    if (isItem) {
      this.setItemSelected(Array.from(this.elements.items).indexOf(event.target))
    }
  }

  goNext () {
    this.setItemSelected(this.index + 1);
  }

  setItemSelected (index) {

    if (index >= 0 && index < this.elements.items.length && index !== this.index) {
      this.elements.items[this.index].classList.remove(Grid.MODIFIERS.ITEM_SELECTED)
      this.index = index;
      this.elements.items[this.index].classList.add(Grid.MODIFIERS.ITEM_SELECTED)
    }
  }
}

class Controls {
  constructor (node, callback) {
    this.node = node;
    this.callback = callback;
    this.elements = {};

    this.inflateHTML();
    this.setEvents();
  }

  static get html () {
    return (
      `<button class="control control__play"><i class="fa fa-play"></i></button>
       <button class="control control__pause"><i class="fa fa-pause"></i></button>`
    )
  }

  inflateHTML () {
    this.node.innerHTML = Controls.html;
    this.elements.play = this.node.querySelector('control__play');
    this.elements.pause = this.node.querySelector('control__pause');
  }

  setEvents (event) {
    console.log("setting events");
  }
}


const controls = new Controls(document.querySelector('.controls'), console.log("hola"));
const grid = new Grid(document.querySelector('.grid'));
const timeOut = 1000;

