class PlayerCard extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
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

		if (this.shadowRoot.innerHTML !== '') return;
		this.shadowRoot.append(styles, template.content.cloneNode(true));
	}
}

customElements.define('player-card', PlayerCard);
