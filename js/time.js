class Time {
	static getTime() {
		if (Time._timeOffset === undefined) Time._timeOffset = Date.now();
		return (Date.now() - Time._timeOffset) / 1000;
	}
}

export default Time;
