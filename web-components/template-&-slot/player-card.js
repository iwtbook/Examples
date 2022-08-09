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
	 * Runs every time the element is inserted into the DOM. Runs once right
	 * after page load if element is written into the DOM already.
	 */
	connectedCallback() {
		// Detect if this element has been inserted into the DOM before so we
		// don't accidentally double up the markup.
		if (this.hasBeenConnected) return;
		this.hasBeenConnected = true;

		/* With <template> & <slot> we don't need to track any attribute changes,
		   we can use the slot element and slot attribute to associate data
			 together and automatically insert data into our <template> (You can
			 only use <slot> inside of a <template> element) */
		let template = document.createElement('template');
		template.innerHTML = `
			<article>
				<slot name="player-img"></slot>
				<p class="name">
					<span class="prop">Name:</span>
					<slot name="name"></slot>
				</p>
				<p class="birthday">
					<span class="prop">Birthday:</span>
					<slot name="bday"></slot>
				</p>
				<p class="nationality">
					<span class="prop">Nationality:</span>
					<slot name="nationality"></slot>
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
							<td><slot name="team-1"></slot></td>
							<td class="number"><slot name="num-1"></slot></td>
						</tr>
						<tr>
							<td><slot name="team-2"></slot></td>
							<td class="number"><slot name="num-2"></slot></td>
						</tr>
					</tbody>
				</table>
			</article>
		`;

		// The styles for our element
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

		/* Append our styles element and the content within our template
			 element into the shadowRoot (you have to clone the content out of
			 the template element since the <template> element is insert and won't
			 render if you insert directly). <template> & <slot> MUST be used
			 with a shadow DOM, they will not work otherwise. */
		this.shadowRoot.append(styles, template.content.cloneNode(true));
	}
}

// Define the <player-card> element so our code above gets associated with it
customElements.define('player-card', PlayerCard);
