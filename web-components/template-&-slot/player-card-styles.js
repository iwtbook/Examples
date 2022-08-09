const styles = document.createElement('style');
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
