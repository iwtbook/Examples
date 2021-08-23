// script.js

function init() {
  const canvas = document.querySelector('#glCanvas');
  const gl = canvas.getContext('webgl');

  if (gl === null) {
    alert('Unable to initialize WebGL. Your browser or machine may not support it.');
    return;
  }

  // Set clear color to black, fully opaque
  gl.clearColor(0.55, 0.55, 0.95, 1.0);
  // Clear the color buffer with specified clear color
  gl.clear(gl.COLOR_BUFFER_BIT);
}

window.addEventListener('DOMContentLoaded', init);
