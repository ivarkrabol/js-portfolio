class Time {
	static init() {
		Time._timeOffset = Date.now();
		Time._deltaOffset = Time._timeOffset;
		Time._fps = 0;
		Time._ready = true;
	}

	static getTime() {
		if (!Time._ready) Time.init();
		return (Date.now() - Time._timeOffset) / 1000;
	}

	static getDeltaTime() {
		if (!Time._ready) Time.init();
		const deltaTime = Date.now() - Time._deltaOffset;
		Time._deltaOffset += deltaTime;
		if (window.config.debug) Time._fps = 1000 / deltaTime;
		return deltaTime / 1000;
	}
}

export default Time;
