import Graphics from './graphics.js';

class App {
	constructor(rootSelector, width, height, fps) {
		this.rootElement = document.querySelector(rootSelector);
		this.width = width;
		this.height = height;

		this.graphics = new Graphics(this.rootElement, width, height);
		this.graphics.draw();

		this.updateInterval = setInterval(() => this.update(), 1000.0 / fps);
	}

	update() {
		this.graphics.dialog('Hello world!\n============\nHome of Ivar. He codes, sometimes.');
		this.graphics.draw();
	}
}

window.onload = () => new App('#main', Math.min(window.innerWidth, 1200) / 7, window.innerHeight / 12, 12);
