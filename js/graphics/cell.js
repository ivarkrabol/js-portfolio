class Cell {
	constructor(i, x, y) {
		this.$node = document.createElement('span');
		this.x = x;
		this.y = y;
		this.boring = true;

		this.prepareNode(i);
	}

	prepareNode(i) {
		this.$node.className = `cell row_${this.y} col_${this.x}`;
		this.$node.id = 'cell_' + i;
		this.$node.textContent = ' ';
	}

	mouseUpdate(relX, relY) {
		const
				dist = Math.sqrt(relX * relX + relY * relY),
				radius = window.config.radius;
		if (dist > radius) {
			if (!this.boring) {
				this.$node.style.left = '0';
				this.$node.style.top = '0';
				this.boring = true;
			}
			return;
		}
		const move = 8 * (1 / dist - 1 / radius);
		this.$node.style.left = move * relX + 'px';
		this.$node.style.top = move * relY + 'px';
		this.boring = false;
	}
}

export default Cell;
