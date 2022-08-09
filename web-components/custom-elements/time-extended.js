// Sets the datetime automatically given the data-epoch attribute, and then
// calculates the local time string and inputs that into the element
class TimeExtended extends HTMLTimeElement {
	constructor() {
		super();
	}

	static get observedAttributes() {
		return ['epoch', 'format'];
	}

	attributeChangedCallback(name, oldVal, newVal) {
		this[name] = newVal;
	}

	connectedCallback() {
		// Set some defaults if missing any attributes
		if (!this.epoch) this.epoch = new Date().getTime();
		if (!this.format) this.format = 'time';

		// Assigning the date object as an attribute of the element for easier time
		// manipulation when using <time> elements
		this.epochTime = new Date(Number(this.epoch));
		// Extract the hours, minutes, and seconds from the Date object
		let datetime = '';
		datetime += `${this.epochTime.getFullYear()}-`;
		datetime += `${this.epochTime.getMonth() + 1}-`;
		datetime += `${this.epochTime.getDate()}T`;
		datetime += `${this.epochTime.getHours()}:`;
		datetime += `${this.epochTime.getMinutes()}:`;
		datetime += `${this.epochTime.getSeconds()}.`;
		datetime += `${this.epochTime.getMilliseconds()}`;
		this.setAttribute('datetime', datetime);

		// if you specify a data-format attribute, it will format the date for you
		// that way
		switch (this.format) {
			case 'date':
				this.innerText = this.epochTime.toLocaleDateString();
				break;
			case 'time':
				this.innerText = this.epochTime.toLocaleTimeString();
				break;
			case 'datetime':
				this.innerText = this.epochTime.toLocaleDateString();
				this.innerText += ` ${this.epochTime.toLocaleTimeString()}`;
				break;
			default:
				this.innerText = this.epochTime.toLocaleTimeString();
		}
	}
}

customElements.define('time-extended', TimeExtended, { extends: 'time' });
