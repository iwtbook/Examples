class PlayerCard extends HTMLElement {
	// A variable to store whether we have run the connectedCallback
	// function before
	hasBeenConnected = false;

	// Runs once when the element is created with createElement()
	// or when the element is written directly into the DOM
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	/**
	 * The list of attributes we want to monitor. If the value
	 * isn't returned in this array, attributeChangedCallback won't
	 * run for it
	 */
	static get observedAttributes() {
		return [
			'img-src',
			'img-alt',
			'name',
			'birthday',
			'nationality',
			'team-1',
			'team-2',
			'num-1',
			'num-2',
		];
	}

	/**
	 * Runs every time an attribute (that is listed in the observedAttributes)
	 * is modified. If element is written in the DOM already on page load, then
	 * this will fire once for every specified attribute before
	 * connectedCallback runs. Does NOT fire when attribute is removed.
	 * @param {String} name The name of the modified attribute (e.g. 'birthday')
	 * @param {String} oldVal The old value of the modified attribute (null if no
	 *                        previous value)
	 * @param {String} newVal The new value of the modified attribute (empty
	 *                        string if the attribute is a boolean attribute)
	 */
	attributeChangedCallback(name, oldVal, newVal) {
		// Store the attribute values for use in the connectedCallback later
		this[name] = newVal;
	}

	/**
	 * Runs every time the element is inserted into the DOM. Runs once right
	 * after page load if element is written into the DOM already.
	 */
	connectedCallback() {
		// Detect if this element has been inserted into the DOM before so we
		// don't accidentally double up the markup.
		if (this.hasBeenConnected) return;
		this.hasBeenConnected = true;

		// The semantic root element that will hold our markup for this element.
		// More semantic than just shadowRoot so we insert everything here.
		let article = document.createElement('article');
		article.innerHTML = `
			<img
				src="${this['img-src']}"
				alt="${this['img-alt']}"
			/>
			<p class="name">
				<span class="prop">Name:</span>
				<span class="value">${this.name}</span>
			</p>
			<p class="birthday">
				<span class="prop">Birthday:</span>
				<span class="value">${this.bday}</span>
			</p>
			<p class="nationality">
				<span class="prop">Nationality:</span>
				<span class="value">${this.nationality}</span>
			</p>
			<table class="teams">
				<thead>
					<tr>
						<th>Current Teams</th>
						<th class="number">Number</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>${this['team-1']}</td>
						<td class="number">${this['num-1']}</td>
					</tr>
					<tr>
						<td>${this['team-2']}</td>
						<td class="number">${this['num-2']}</td>
					</tr>
				</tbody>
			</table>
		`;

		// The styles for our element.
		let styles = document.createElement('style');
		styles.innerHTML = `
			* {
				font-family: sans-serif;
			}

			article {
				align-items: center;
				background-color: rgb(218, 218, 218);
				box-sizing: border-box;
				border-radius: 5px;
				display: grid;
				justify-items: left;
				padding: 20px;
				width: 350px;
			}

			article img {
				border-radius: 5px;
				margin-bottom: 10px;
				width: 100%;
			}

			article>p {
				font-size: 17px;
				margin: 10px 0;
			}

			.player-img {
				box-shadow: inset 0px 0px 6px rgba(0, 0, 0, 0.2);
				width: 100%;
			}

			.prop {
				font-weight: bold;
			}

			.teams {
				border: 1px solid black;
				border-radius: 3px;
				box-sizing: border-box;
				margin-top: 10px;
				padding: 5px;
				width: 100%;
			}

			.teams th {
				padding-bottom: 5px;
				text-align: left;
			}

			.teams td {
				border-top: 1px solid black;
				padding-top: 5px;
			}

			.teams td:first-child {
				border-right: 1px solid black;
			}

			.teams .number {
				text-align: center !important;
			}
		`;

		// Append the styles and markup to our shadowRoot
		this.shadowRoot.append(styles, article);
	}
}

// Define the <player-card> element so our code above gets associated with it
customElements.define('player-card', PlayerCard);
