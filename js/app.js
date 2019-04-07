import Graphics from './graphics/graphics.js';
import LayerUtils from './graphics/layer-utils.js';
import Time from "./time.js";

class App {
	constructor(rootSelector) {
		this.$root = document.querySelector(rootSelector);

		this.graphics = new Graphics(this.$root);

		Time.init(true);
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
		if (window.config.debug) this.graphics.getLayer(1).setTextContent(`FPS: ${Time._fps}`);

		this.graphics.draw();

		Time.getDeltaTime();
	}
}

export default App;
