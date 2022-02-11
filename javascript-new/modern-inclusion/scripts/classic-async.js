// classic.js

const classicAsync = {};
classicAsync.div = document.createElement('div');
classicAsync.div.style.color = 'orange';
classicAsync.div.innerHTML = 'Classic linked script loaded asynchronously!';
document.body.append(classicAsync.div);
