class Layer {
	constructor(height) {
		this.content = [];
		this.updatedRows = 0;
		for (let i = 0; i < height; i++) {
			this.content.push('');
		}
	}

	setContent(x, y, content) {
		if (Array.isArray(content)) content = content.join('\n');
		while (content.charAt(0) === '\n') content = content.substr(1);
		while (content.charAt(content.length - 1) === '\n') content = content.substr(0, content.length - 1);
		content = content.split('\n');
		const width = Math.max(...content.map(r => r.length));
		const paddingSpaces = ' '.repeat(width);
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
}

export default Layer;
