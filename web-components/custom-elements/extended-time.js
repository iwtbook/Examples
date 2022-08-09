// Sets the datetime automatically given the data-epoch attribute, and then
// calculates the local time string and inputs that into the element
class ExtendedTime extends HTMLTimeElement {
	constructor() {
		self = super();

		if (self.getAttribute('data-epoch')) {
			// Assigning the date object as an attribute of the element for easier time
			// manipulation when using <time> elements
			self.epochTime = new Date(Number(self.getAttribute('data-epoch')));
			// Extract the hours, minutes, and seconds from the Date object
			let datetime = '';
			datetime += `${self.epochTime.getFullYear()}-`;
			datetime += `${self.epochTime.getMonth() + 1}-`;
			datetime += `${self.epochTime.getDate()}T`;
			datetime += `${self.epochTime.getHours()}:`;
			datetime += `${self.epochTime.getMinutes()}:`;
			datetime += `${self.epochTime.getSeconds()}.`;
			datetime += `${self.epochTime.getMilliseconds()}`;
			self.setAttribute('datetime', datetime);
		}

		// if you specify a data-format attribute, it will format the date for you
		// that way
		let format = self.getAttribute('data-format');
		switch (format) {
			case 'date':
				self.innerText = self.epochTime.toLocaleDateString();
				break;
			case 'time':
				self.innerText = self.epochTime.toLocaleTimeString();
				break;
			case 'datetime':
				self.innerText = self.epochTime.toLocaleDateString();
				self.innerText += ` ${self.epochTime.toLocaleTimeString()}`;
				break;
			default:
				self.innerText = self.epochTime.toLocaleTimeString();
		}
	}
}

customElements.define('extended-time', ExtendedTime, { extends: 'time' });
