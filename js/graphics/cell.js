class Cell {
	constructor(i, x, y) {
		this.$node = document.createElement('span');
		this.x = x;
		this.y = y;

		this.prepareNode(i);
	}

	prepareNode(i) {
		this.$node.className = `cell row_${this.y} col_${this.x}`;
		this.$node.id = 'cell_' + i;
		this.$node.textContent = ' ';
	}
}

export default Cell;
