// classic.js

const classicDefer = {};
classicDefer.div = document.createElement('div');
classicDefer.div.style.color = 'rgb(186, 146, 14)';
classicDefer.div.innerHTML =
  'Classic linked script loaded after being deferred!';
document.body.append(classicDefer.div);
