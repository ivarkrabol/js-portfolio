import Layer from './layer.js';
import Cell from './cell.js';

class Graphics {
	constructor($root) {
		this.width = Math.floor(window.ø.width);
		// noinspection JSSuspiciousNameCombination
		this.height = Math.floor(window.ø.height);

		this.layers = new Map();
		const background = new Layer();
		background.setContent((' '.repeat(this.width) + '\n').repeat(this.height).split('\n'));
		this.layers.set(0, background);

		this.$cells = [];
		for (let i = 0; i < this.height; i++) {
			for (let j = 0; j < this.width; j++) {
				const cell = new Cell((i * this.width) + j, j, i);
				this.$cells.push(cell);
				$root.appendChild(cell.$node);
			}
			$root.appendChild(document.createElement('br'));
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
			if ((updatedRows & (1 << i)) !== 0) this.drawLayerRow(i, layer.content[i]);
		}
	}

	drawLayerRow(rowIndex, content) {
		for (let i = 0; i < this.width; i++) {
			const
					cell = this.getCell(i, rowIndex),
					contentChar = content.charAt(i);
			if (contentChar === '') break;
			if (contentChar !== '\0') cell.$node.firstChild.data = contentChar;
		}
	}

	getCell(x, y) {
		return this.$cells[y * this.width + x];
	}

	getLayer(key) {
		if (!this.layers.has(key)) this.layers.set(key, new Layer(this.height));
		return this.layers.get(key);
	}
}

export default Graphics;
