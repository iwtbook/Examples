// script.js

let isDefined, isCreated, isAdded, isModified, isRemoved, newCustomElement;
isDefined = false;
isCreated = false;
isAdded = false;
isModified = false;
isRemoved = false;

function updateLifecycle(stage) {
	let currentStage, prevStages;
	currentStage = document.querySelector('#currentStage');
	prevStages = document.querySelector('#prevStages');

	if (currentStage.innerText != '') {
		let newListElem = document.createElement('li');
		newListElem.innerText = currentStage.innerText.substr(3);
		prevStages.insertAdjacentElement('afterbegin', newListElem);
	}

	let stageNum = document.querySelector('#prevStages').children.length;
	currentStage.innerText = `${stageNum + 1}. ${stage}`;
}

function createCustomElement() {
	let template = document.createElement('template');
	template.innerHTML = `
    <player-card>
      <player-img src="https://introweb.tech/demo-file/web-components/lifecycle/assets/cristiano-ronaldo.jpeg"></player-img>
      <player-name slot="name">Cristiano Ronaldo</player-name>
      <player-bday slot="bday">February 2nd, 1985 (Age 36)</player-bday>
      <player-nationality slot="nationality">Portuguese</player-nationality>
      <player-teams>Juventus F.C., Portugal national football team</player-teams>
      <player-numbers>7, 7</player-numbers>
    </player-card>
  `;
	return template.content.children[0];
}

function addElementToPage(customElement) {
	document
		.querySelector('#elementWrapper')
		.insertAdjacentElement('afterbegin', customElement);
}

function bindEvents() {
	let btnDefine, btnCreate, btnAdd, btnModify, btnRemove, form;
	btnDefine = document.querySelector('#btn-define');
	btnCreate = document.querySelector('#btn-create');
	btnAdd = document.querySelector('#btn-add');
	btnModify = document.querySelector('#btn-modify');
	btnRemove = document.querySelector('#btn-remove');
	form = document.querySelector('form');

	form.addEventListener('submit', (e) => {
		e.preventDefault();
	});

	btnDefine.addEventListener('click', () => {
		if (!isDefined) {
			customElements.define('player-card', PlayerCard);
			updateLifecycle('Defined Custom Element');
			isDefined = true;
		}
	});

	btnCreate.addEventListener('click', () => {
		if (!isCreated && isDefined) {
			newCustomElement = createCustomElement();
			updateLifecycle('Created Custom Element');
			isCreated = true;
		}
	});

	btnAdd.addEventListener('click', () => {
		if (!isAdded && isCreated) {
			addElementToPage(newCustomElement);
			updateLifecycle('Added Custom Element to Page');
			isAdded = true;
		}
	});

	btnModify.addEventListener('click', () => {
		if (!isModified && isAdded) {
			newCustomElement.editPic(
				'https://introweb.tech/demo-file/web-components/lifecycle/lionel-messi.jpeg'
			);
			newCustomElement.editName('Lionel Messi');
			newCustomElement.editBday('June 24, 1987 (age 34 years)');
			newCustomElement.editNationality('Argentinian');
			newCustomElement.editTeam(1, 'Paris Saint-Germain F.C.', 30);
			newCustomElement.editTeam(2, 'Argentina national football team', 10);
			updateLifecycle('Modified Custom Element');
			isModified = true;
		}
	});

	btnRemove.addEventListener('click', () => {
		if (!isRemoved && isModified) {
			document.querySelector('#elementWrapper').innerHTML = '';
			newCustomElement = null;
			updateLifecycle('Removed Custom Element');
			isRemoved = true;
		}
	});
}

function init() {
	bindEvents();
}

window.addEventListener('DOMContentLoaded', init);
