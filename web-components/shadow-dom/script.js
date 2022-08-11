function init() {
	let paragraphs = Array.from(document.querySelectorAll('p'));
	paragraphs.forEach((p) => {
		p.innerHTML = 'Edited! - ' + p.innerHTML;
	});
}

document.addEventListener('DOMContentLoaded', init);
