import Layer from './layer.js';
import Time from '../time.js';

class Graphics {
	constructor($root, width, height) {
		this.$root = $root;
		this.width = width;
		this.height = height;

		this.layers = new Map();
		const background = new Layer(height);
		background.setContent(0, 0, (' '.repeat(width) + '\n').repeat(height));
		this.layers.set(0, background);

		this.$rows = [];
		for (let i = 0; i < height; i++) {
			const $row = document.createElement('div');
			$row.cssClass = 'row';
			$row.id = 'row_' + i;
			this.$rows.push($row);
			this.$root.appendChild(this.$rows[i]);
		}
	}

	draw() {
		// Check which rows are updated
		let updatedRows = 0;
		this.layers.forEach(layer => updatedRows |= layer.updatedRows);
		// Redraw updated rows
		this.layers.forEach(layer => this.drawLayer(layer, updatedRows));
	}

	drawLayer(layer, updatedRows) {
		for (let i = 0; i < this.height; i++) {
			if ((updatedRows & (1 << i)) !== 0) {
				this.drawLayerRow(i, layer.content[i]);
			}
		}
	}

	drawLayerRow(rowIndex, content) {
		const
				$row       = this.$rows[rowIndex],
				oldContent = $row.innerHTML;
		let newContent = '';
		for (let i = 0; i < this.width; i++) {
			const contentChar = content.charAt(i);
			if (contentChar === '') {
				newContent += oldContent.substr(i);
				break;
			}
			if (contentChar !== '\0') {
				newContent += contentChar;
			} else {
				newContent += oldContent.charAt(i);
			}
		}
		$row.innerHTML = newContent;
	}

	setLayerContent(x, y, content, layerKey = 1) {
		if (!this.layers.has(layerKey)) {
			this.layers.set(layerKey, new Layer(this.height));
		}
		this.layers.get(layerKey).setContent(x, y, content);
	}

	frame(x, y, width, height, layerKey = 1) {
		const
				offset = Math.floor(Time.getTime() * 4) % 4,
				hr     = '~¤~ ~¤~'.substr(offset, 4).repeat(width - 3),
				top    = '+' + hr.substr(0, width - 3) + '+\n',
				middle = ('|' + '\0'.repeat(width - 3) + '|\\\n').repeat(height - 3),
				bottom = '+' + hr.substr(offset * 2, width - 3) + '+\\\n' + ' ' + '\\'.repeat(width - 1);
		this.setLayerContent(
				x,
				y,
				top + middle + bottom,
				layerKey
		);
	}

	dialog(text) {
		const
				x = Math.floor(this.width / 2) - 23,
				y = Math.floor(this.height / 2) - 5;
		this.frame(x, y, 46, 8);
		this.setLayerContent(
				x + 3,
				y + 2,
				text,
				2
		);
	}
}

export default Graphics;
