let webComponent;
const ELEMS = {};

function queryElements() {
	ELEMS.createWC = document.querySelector('#createWC');
	ELEMS.connectWC = document.querySelector('#connectWC');
	ELEMS.disconnectWC = document.querySelector('#disconnectWC');
	ELEMS.adoptWC = document.querySelector('#adoptWC');
	ELEMS.changeAttribute = document.querySelector('#changeAttribute');
	ELEMS.iframe = document.querySelector('iframe');
}

function bindListeners() {
	ELEMS.createWC.addEventListener('click', () => {
		if (!webComponent) {
			webComponent = document.createElement('hello-wc');
		} else {
			console.log('Web Component already created');
		}
	});

	ELEMS.connectWC.addEventListener('click', () => {
		if (webComponent?.connected) {
			console.log('Web Component already connected');
		} else if (webComponent) {
			document.body.append(webComponent);
		} else {
			console.log('Web Component not created yet');
		}
	});

	ELEMS.disconnectWC.addEventListener('click', () => {
		if (webComponent?.connected) {
			webComponent.remove();
		} else if (webComponent) {
			console.log('Web Component not currently in document');
		} else {
			console.log('Web Component not created yet');
		}
	});

	ELEMS.adoptWC.addEventListener('click', () => {
		if (webComponent) {
			let iframeBody = ELEMS.iframe.contentDocument.body;
			iframeBody.append(ELEMS.iframe.contentDocument.adoptNode(webComponent));
		} else {
			console.log('Web Component not created yet');
		}
	});

	ELEMS.changeAttribute.addEventListener('click', () => {
		if (webComponent) {
			if (webComponent.getAttribute('color') == 'green') {
				webComponent.setAttribute('color', 'red');
			} else {
				webComponent.setAttribute('color', 'green');
			}
		} else {
			console.log('Web Component not created yet');
		}
	});
}

function init() {
	queryElements();
	bindListeners();
}

document.addEventListener('DOMContentLoaded', init);
