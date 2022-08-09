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

		this.shadowRoot.append(styles, template.content.cloneNode(true));
	}
}

customElements.define('player-card', PlayerCard);
