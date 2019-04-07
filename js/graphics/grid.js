class Grid {
	constructor(cells) {
		this.mouseX = 0;
		this.mouseY = 0;

		this.gridCells = cells.map(cell => new GridCell(cell));
		window.addEventListener('mousemove', e => this.mouseMove(e.clientX, e.clientY));
		// window.addEventListener('mousedown', e => this.mouseMove(e.clientX, e.clientY));
	}

	mouseMove(mouseX, mouseY) {
		if (Math.pow(mouseX - this.mouseX, 2) + Math.pow(mouseY - this.mouseY, 2) < 4) return;
		this.gridCells.forEach(gridCell => gridCell.cell.mouseUpdate(gridCell.left - mouseX, gridCell.top - mouseY));
		this.mouseX = mouseX;
		this.mouseY = mouseY;
	}
}

class GridCell {
	constructor(cell) {
		const viewportOffset = cell.$node.getBoundingClientRect();
		this.top = viewportOffset.top;
		this.left = viewportOffset.left;
		this.cell = cell;
	}
}

export default Grid;
