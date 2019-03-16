import Layer from './layer.js';

class Graphics {
	constructor($root) {
		this.$root = $root;
		this.width = window.ø.width;
		this.height = window.ø.height;

		this.layers = new Map();
		const background = new Layer();
		background.setContent(0, 0, (' '.repeat(this.width) + '\n').repeat(this.height));
		this.layers.set(0, background);

		this.$rows = [];
		for (let i = 0; i < this.height; i++) {
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
				$row = this.$rows[rowIndex],
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

	getLayer(key) {
		if (!this.layers.has(key)) {
			this.layers.set(key, new Layer(this.height));
		}
		return this.layers.get(key);
	}
}

export default Graphics;
