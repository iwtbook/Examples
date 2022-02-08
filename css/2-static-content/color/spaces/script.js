// script.js

import { namedColors } from './named-colors.js';

document.addEventListener('DOMContentLoaded', init);

function init() {
  addNamedColors();
  bindListeners();
  document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
  });
}

function addNamedColors() {
  const select = document.querySelector('select[name^="color"]');
  for (const color in namedColors) {
    const option = document.createElement('option');
    option.innerHTML = color;
    option.setAttribute('value', color);
    if (color == 'darkseagreen') {
      option.setAttribute('selected', '');
    }
    select.appendChild(option);
  }
}

function bindListeners() {
  const select = document.querySelector('select');
  const ranges = Array.from(document.querySelectorAll('input[type="range"]'));
  const colorInput = document.querySelector('input[type="color"]');
  const colorBox = document.querySelector('div.color-swatch');
  const hexInput = document.querySelector('#hex-input');

  select.addEventListener('input', () => {
    colorBox.style.backgroundColor = select.value;
    const colors = getColors(select.value, 'name');
    // Update hex field
    document.querySelector('#hex-input').value = colors.hex.toUpperCase();
    colorInput.value = colors.hex;
    // Update other fields
    updateColorFields(colors);
    updateOutputs(colors);
  });

  ranges.forEach((range) => {
    range.addEventListener('input', () => {
      select.children[0].selected = true;

      const space = range.getAttribute('id').split('-')[0];
      const colorInputs = Array.from(
        document.querySelectorAll(`input[id^="${space}-"]`)
      );
      const comp = [];
      colorInputs.forEach((input) => {
        comp.push(Number(input.value));
      });

      switch (space) {
        case 'hsl':
          comp[1] /= 100;
          comp[2] /= 100;
          break;
        case 'hsla':
          comp[1] /= 100;
          comp[2] /= 100;
          break;
        case 'hwb':
          comp[1] /= 100;
          comp[2] /= 100;
          break;
        case 'lab':
          comp[0] /= 100;
          break;
        case 'lch':
          comp[0] /= 100;
          break;
        case 'oklab':
          comp[0] /= 100;
          break;
        case 'oklch':
          comp[0] /= 100;
          break;
      }

      const colors = getColors(comp, space);
      colorBox.style.backgroundColor = colors.hex;
      // Update hex field
      hexInput.value = colors.hex.toUpperCase();
      // Update other fields
      updateColorFields(colors, space);
      updateOutputs(colors);
      if (colors.hex.length == 9) colors.hex = colors.hex.slice(0, -2);
      colorInput.value = colors.hex;
    });
  });

  hexInput.addEventListener('input', () => {
    const regex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3}|[A-Fa-f0-9]{8})$/;
    if (!regex.test(hexInput.value)) return;
    hexInput.value = hexInput.value.toUpperCase();
    colorBox.style.backgroundColor = hexInput.value;
    const colors = getColors([hexInput.value], 'hex');
    updateColorFields(colors, 'hex');
    updateOutputs(colors);
  });

  colorInput.addEventListener('input', () => {
    colorBox.style.backgroundColor = colorInput.value;
    const colors = getColors([colorInput.value], 'hex');
    hexInput.value = colors.hex.toUpperCase();
    updateColorFields(colors, 'hex');
    updateOutputs(colors);
  });
}

function getColors(inputColor, space) {
  let newChroma, hwb;
  if (space == 'name') {
    newChroma = chroma(inputColor);
  } else if (space == 'rgba') {
    newChroma = chroma(...inputColor, 'rgb');
  } else if (space == 'hsla') {
    newChroma = chroma(...inputColor, 'hsl');
  } else if (space == 'hwb') {
    newChroma = chroma(...convertHwbToRgba(inputColor), 'rgb');
    hwb = inputColor;
  } else if (space == 'lab' || space == 'lch') {
    inputColor[0] *= 100;
    newChroma = chroma(...inputColor, space);
  } else {
    newChroma = chroma(...inputColor, space);
  }

  const colors = {};
  const alpha = newChroma.rgba()[3];
  if (!hwb) hwb = rgba2hwb(...newChroma.rgba());

  colors.hex = newChroma.hex();
  colors.rgb = newChroma.rgb();
  colors.rgba = newChroma.rgba();
  colors.hsl = newChroma.hsl().slice(0, -1);
  colors.hsla = newChroma.hsl();
  colors.hwb = hwb;
  colors.lab = newChroma.lab();
  colors.lch = newChroma.lch();
  colors.oklab = newChroma.oklab();
  colors.oklch = newChroma.oklch();

  // Adding alpha to colors that support= it
  colors.lab[3] = alpha;
  colors.lch[3] = alpha;
  colors.oklab[3] = alpha;
  colors.oklch[3] = alpha;

  // Formatting percentages
  colors.hsl[1] *= 100;
  colors.hsl[2] *= 100;
  colors.hsla[1] *= 100;
  colors.hsla[2] *= 100;
  colors.hwb[1] *= 100;
  colors.hwb[2] *= 100;
  colors.oklab[0] *= 100;
  colors.oklch[0] *= 100;

  // Fixing NaN issues
  if (isNaN(colors.hsl[0])) colors.hsl[0] = 0;
  if (isNaN(colors.hsla[0])) colors.hsla[0] = 0;
  if (isNaN(colors.hwb[0])) colors.hwb[0] = 0;
  if (
    (isNaN(colors.hwb[1]) || isNaN(colors.hwb[2])) &&
    colors.rgb[0] == 255 &&
    colors.rgb[1] == 255 &&
    colors.rgb[2] == 255
  ) {
    colors.hwb[1] = 100;
    colors.hwb[2] = 0;
    colors.hwb[3] = 1;
  }
  if (
    (isNaN(colors.hwb[1]) || isNaN(colors.hwb[2])) &&
    colors.rgb[0] == 0 &&
    colors.rgb[1] == 0 &&
    colors.rgb[2] == 0
  ) {
    colors.hwb[1] = 0;
    colors.hwb[2] = 100;
    colors.hwb[3] = 1;
  }
  if (isNaN(colors.lch[2])) colors.lch[2] = 0;
  if (isNaN(colors.oklch[2])) colors.oklch[2] = 0;

  return colors;
}

function updateColorFields(colors, fromSpace) {
  const fields = getFormFields();
  for (const space in fields) {
    if (space == fromSpace) continue;
    fields[space][0].value = colors[space][0];
    fields[space][1].value = colors[space][1];
    fields[space][2].value = colors[space][2];
    if (space != 'rgb' && space != 'hsl') {
      fields[space][3].value = colors[space][3];
    }
  }
}

function updateOutputs(colors) {
  const outputs = getOutputFields();
  for (const space in outputs) {
    let outputStr = 'color: ';
    if (!['hex', 'rgb', 'rgba'].includes(space)) {
      for (const num in colors[space]) {
        colors[space][num] = Number(colors[space][num]).toFixed(2);
      }
    }
    switch (space) {
      case 'hex':
        outputStr += colors[space];
        break;
      case 'rgb':
        outputStr += `${space}(`;
        outputStr += `${colors[space][0]}, ${colors[space][1]}, ${colors[space][2]}`;
        outputStr += ')';
        break;
      case 'rgba':
        outputStr += `${space}(`;
        outputStr += `${colors[space][0]}, ${colors[space][1]}, ${colors[space][2]}`;
        outputStr += `, ${colors[space][3]}`;
        outputStr += ')';
        break;
      case 'hsl':
        outputStr += `${space}(`;
        outputStr += `${colors[space][0]}deg ${colors[space][1]}% ${colors[space][2]}%`;
        outputStr += ')';
        break;
      case 'hsla':
        outputStr += `${space}(`;
        outputStr += `${colors[space][0]}deg ${colors[space][1]}% ${colors[space][2]}%`;
        outputStr += ` / ${colors['rgba'][3]}`;
        outputStr += ')';
        break;
      case 'hwb':
        outputStr += `${space}(`;
        outputStr += `${colors[space][0]}deg ${colors[space][1]}% ${colors[space][2]}%`;
        outputStr += ` / ${colors['rgba'][3]}`;
        outputStr += ')';
        break;
      case 'lab':
        outputStr += `${space}(`;
        outputStr += `${colors[space][0]}% ${colors[space][1]} ${colors[space][2]}`;
        outputStr += ` / ${colors['rgba'][3]}`;
        outputStr += ')';
        break;
      case 'lch':
        outputStr += `${space}(`;
        outputStr += `${colors[space][0]}% ${colors[space][1]} ${colors[space][2]}`;
        outputStr += ` / ${colors['rgba'][3]}`;
        outputStr += ')';
        break;
      case 'oklab':
        outputStr += `${space}(`;
        outputStr += `${colors[space][0]}% ${colors[space][1]} ${colors[space][2]}`;
        outputStr += ` / ${colors['rgba'][3]}`;
        outputStr += ')';
        break;
      case 'oklch':
        outputStr += `${space}(`;
        outputStr += `${colors[space][0]}% ${colors[space][1]} ${colors[space][2]}`;
        outputStr += ` / ${colors['rgba'][3]}`;
        outputStr += ')';
        break;
    }
    outputs[space].innerHTML = outputStr;
  }
}

function getFormFields() {
  return {
    rgb: Array.from(document.querySelectorAll('input[id^="rgb-"]')),
    rgba: Array.from(document.querySelectorAll('input[id^="rgba-"]')),
    hsl: Array.from(document.querySelectorAll('input[id^="hsl-"]')),
    hsla: Array.from(document.querySelectorAll('input[id^="hsla-"]')),
    hwb: Array.from(document.querySelectorAll('input[id^="hwb-"]')),
    lab: Array.from(document.querySelectorAll('input[id^="lab-"]')),
    lch: Array.from(document.querySelectorAll('input[id^="lch-"]')),
    oklab: Array.from(document.querySelectorAll('input[id^="oklab-"]')),
    oklch: Array.from(document.querySelectorAll('input[id^="oklch-"]')),
  };
}

function getOutputFields() {
  return {
    hex: document.querySelector('output.hex code'),
    rgb: document.querySelector('output.rgb code'),
    rgba: document.querySelector('output.rgba code'),
    hsl: document.querySelector('output.hsl code'),
    hsla: document.querySelector('output.hsla code'),
    hwb: document.querySelector('output.hwb code'),
    lab: document.querySelector('output.lab code'),
    lch: document.querySelector('output.lch code'),
    oklab: document.querySelector('output.oklab code'),
    oklch: document.querySelector('output.oklch code'),
  };
}

// Converting function borrowed from:
// https://jsfiddle.net/seamusleahy/12eL2qse/
function convertHwbToRgba(hwb) {
  var h = hwb[0] / 360;
  var wh = hwb[1];
  var bl = hwb[2];
  var ratio = wh + bl;
  var i;
  var v;
  var f;
  var n;

  // wh + bl cant be > 1
  if (ratio > 1) {
    wh /= ratio;
    bl /= ratio;
  }

  i = Math.floor(6 * h);
  v = 1 - bl;
  f = 6 * h - i;

  if ((i & 0x01) !== 0) {
    f = 1 - f;
  }

  n = wh + f * (v - wh); // linear interpolation

  var r;
  var g;
  var b;
  switch (i) {
    default:
    case 6:
    case 0:
      r = v;
      g = n;
      b = wh;
      break;
    case 1:
      r = n;
      g = v;
      b = wh;
      break;
    case 2:
      r = wh;
      g = v;
      b = n;
      break;
    case 3:
      r = wh;
      g = n;
      b = v;
      break;
    case 4:
      r = n;
      g = wh;
      b = v;
      break;
    case 5:
      r = v;
      g = wh;
      b = n;
      break;
  }

  return [
    Math.round(r * 255),
    Math.round(g * 255),
    Math.round(b * 255),
    hwb[3],
  ];
}

// Converting function borrowed from:
// https://stackoverflow.com/questions/29461757/how-to-display-hwb-hsb-cmyk-channels-using-rgb-or-hsl
function rgba2hwb(r, g, b, a) {
  r /= 255;
  g /= 255;
  b /= 255;

  var f,
    i,
    w = Math.min(r, g, b);
  var v = Math.max(r, g, b);
  var black = 1 - v;

  if (v === w) return { h: 0, w: w, b: black };
  f = r === w ? g - b : g === w ? b - r : r - g;
  i = r === w ? 3 : g === w ? 5 : 1;

  let hue = (i - f / (v - w)) / 6;
  hue *= 360;

  return [hue, w, black, a];
}
