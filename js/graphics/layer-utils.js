import Time from '../time.js';

class LayerUtils {
	static frame(layer, width, height, pos) {
		const
				offset = Math.floor(Time.getTime() * 4) % 4,
				hr = '~¤~ ~¤~'.substr(offset, 4).repeat(width - 2),
				content = Array(height + 1);

		content[0] = '+' + hr.substr(0, width - 2) + '+';
		content.fill('|' + '\0'.repeat(width - 2) + '|\\', 1, height - 1);
		content[height - 1] = '+' + hr.substr(offset * 2, width - 2) + '+\\';
		content[height] = ' ' + '\\'.repeat(width);

		layer.setContent(
				content,
				pos
		);
	}

	static dialog(layer, text) {
		const lines = text.split('\n');
		const textWidth = Math.max(...lines.map(l => l.length));
		this.frame(
				layer,
				Math.max(textWidth + 6, 46),
				Math.max(lines.length + 4, 7),
				{my: 'center', at: 'center'}
		);
		layer.setContent(
				[...lines, ' '.repeat(40)],
				{my: 'center', at: 'center'}
		);
	}
}

export default LayerUtils;
