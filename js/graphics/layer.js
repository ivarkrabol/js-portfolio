class Layer {
	constructor() {
		this.content = [];
		this.updatedRows = 0;
		for (let i = 0; i < window.ø.height; i++) {
			this.content.push('');
		}
	}

	setContent(content, pos = {my: '', at: ''}) {
		const
				width = Math.max(...content.map(r => r.length)),
				myPos = Layer.decodePos(pos.my, width, content.length),
				atPos = Layer.decodePos(pos.at, window.ø.width, window.ø.height),
				x = atPos.x - myPos.x,
				y = atPos.y - myPos.y,
				paddingSpaces = ' '.repeat(width);

		for (let i = 0; i < content.length; i++) {
			content[i] += paddingSpaces.substr(content[i].length);
		}
		const paddingNull = '\0'.repeat(x);
		for (let i = 0; i < content.length && i + y < this.content.length; i++) {
			const paddedOldContentRow = this.content[y + i] + paddingNull.substr(this.content[y + i].length);
			const newContentRow = paddedOldContentRow.substr(0, x) + content[i] + paddedOldContentRow.substr(x + width);
			this.updatedRows |= this.content[y + i] !== newContentRow ? 1 << (y + i) : 0;
			this.content[y + i] = newContentRow;
		}
	}

	static decodePos(pos, width, height) {
		if (typeof pos === 'object' && pos.hasOwnProperty('x') && pos.hasOwnProperty('y')) {
			return {...pos};
		} else if (pos === 'center') {
			return {
				x: Math.floor(width / 2),
				y: Math.floor(height / 2)
			}
		} else {
			return {
				x: 0,
				y: 0
			}
		}
	}
}

export default Layer;
