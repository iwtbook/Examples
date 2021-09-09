export class PlayerCard extends HTMLElement {
  constructor() {
    super();

    let imageSrc, name, teams, numbers;
    imageSrc = this.querySelector('player-img')?.getAttribute('src');
    name = this.querySelector('player-name')?.innerText;
    teams = this.querySelector('player-teams')?.innerText.split(', ');
    numbers = this.querySelector('player-numbers')?.innerText.split(', ');

    let template = document.createElement('template');
    template.innerHTML = `
          <style>
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

            article > p {
              font-size: 17px;
              margin: 10px 0;
            }

            .player-img {
              box-shadow: inset 0px 0px 6px rgba(0,0,0,0.2);
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
          </style>
          <article>
            <img src="${imageSrc}" alt="${name}" />
            <p class="name">
              <span class="prop">Name:</span>
              <span class="value">
                <slot name="name"></slot>
              </span>
            </p>
            <p class="birthday">
              <span class="prop">Birthday:</span>
              <span class="value">
                <slot name="bday"></slot>
              </span>
            </p>
            <p class="nationality">
              <span class="prop">Nationality:</span>
              <span class="value">
                <slot name="nationality"></slot>
              </span>
            </p>
            <table class="teams">
              <thead>
                <tr>
                  <th>Current Teams</th>
                  <th class="number">Number</th>
                </tr>
              </thead>
              <tbody>
              </tbody>
              <tbody>
              </tbody>
            </table>
          </article>
        `;

    for (let i = 0; i < teams.length; i++) {
      let newRow = document.createElement('tr');
      newRow.innerHTML = `
          <tr>
            <td>${teams[i]}</td>
            <td class="number">${numbers[i]}</td>
          </tr>
          `;
      template.content.querySelector('tbody').appendChild(newRow);
    }

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  editPic(src) {
    this.shadowRoot.querySelector('article > img').src = src;
  }

  editName(name) {
    this.shadowRoot.querySelector('.name .value').innerText = name;
  }

  editBday(birthday) {
    this.shadowRoot.querySelector('.birthday .value').innerText = birthday;
  }

  editNationality(nationality) {
    this.shadowRoot.querySelector('.nationality .value').innerText = nationality;
  }

  editTeam(num, teamName, number) {
    let row = this.shadowRoot.querySelectorAll('tbody > tr')[num - 1];
    let cells = Array.from(row.querySelectorAll('td'));
    cells[0].innerText = teamName;
    cells[1].innerText = number;
  }
}
