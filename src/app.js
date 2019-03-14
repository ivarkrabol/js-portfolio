import Graphics from './graphics.js';

class App {
	constructor(rootSelector, width, height, fps) {
		this.rootElement = document.querySelector(rootSelector);
		this.width = width;
		this.height = height;

		this.graphics = new Graphics(this.rootElement, width, height);
		this.graphics.draw();
		
		this.dialog('Hello world!!!\n==============\nWelcome to this, the holiest of sites!');

		this.updateInterval = setInterval(() => this.update(), 1000.0 / fps);
	}

	update() {
		this.graphics.draw();
	}

	dialog(text) {
		this.graphics.dialog(text);
	}
}

window.onload = () => new App('#main', window.innerWidth / 7, window.innerHeight / 12, 12);
