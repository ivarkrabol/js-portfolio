import Graphics from './graphics/graphics.js';
import LayerUtils from './graphics/layer-utils.js';

class App {
	constructor(rootSelector, config) {
		window.ø = config;

		this.graphics = new Graphics(
				document.querySelector(rootSelector)
		);

		this.update();
		setInterval(
				() => this.update(),
				1000.0 / config.fps
		);
	}

	update() {
		LayerUtils.dialog(
				this.graphics.getLayer(1),
				'Hello world!\n============\nHome of Ivar. He codes.'
		);

		this.graphics.draw();
	}
}

export default App;
