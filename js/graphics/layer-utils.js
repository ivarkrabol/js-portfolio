import Time from '../time.js';

class LayerUtils {
	static frame(layer, x, y, width, height) {
		const
				offset = Math.floor(Time.getTime() * 4) % 4,
				hr = '~¤~ ~¤~'.substr(offset, 4).repeat(width - 3),
				top = '+' + hr.substr(0, width - 3) + '+\n',
				middle = (
						'|' + '\0'.repeat(width - 3) + '|\\\n').repeat(height - 3),
				bottom = '+' + hr.substr(offset * 2, width - 3) + '+\\\n' + ' ' + '\\'.repeat(width - 1);
		layer.setContent(
				x,
				y,
				top + middle + bottom
		);
	}

	static dialog(layer, text) {
		const
				x = Math.floor(window.ø.width / 2) - 23,
				y = Math.floor(window.ø.height / 2) - 5;
		this.frame(layer, x, y, 46, 8);
		layer.setContent(
				x + 3,
				y + 2,
				text
		);
	}
}

export default LayerUtils;
