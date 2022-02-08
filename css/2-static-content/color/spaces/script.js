// script.js

import { namedColors } from './named-colors.js';

document.addEventListener('DOMContentLoaded', init);

function init() {
  addNamedColors();
  bindListeners();
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

  select.addEventListener('input', () => {
    colorBox.style.backgroundColor = select.value;
    const colors = getColors(select.value);
    // Update hex field
    document.querySelector('#hex-input').value = colors.hex.toUpperCase();
    colorInput.value = colors.hex;
    // Update other fields
    updateColorFields(colors);
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
        comp.push(input.value);
      });

      let newColor = '';
      switch (space) {
        case 'rgb':
          newColor = `${space}(${comp[0]},${comp[1]},${comp[2]})`;
          break;
        case 'rgba':
          newColor = `${space}(${comp[0]},${comp[1]},${comp[2]},${comp[3]})`;
          break;
        case 'hsl':
          newColor = `${space}(${comp[0]}, ${comp[1]}%, ${comp[2]}%)`;
          break;
        case 'hsla':
          newColor = `${space}(${comp[0]}, ${comp[1]}%, ${comp[2]}% / ${comp[3]})`;
          break;
        case 'hwb':
          newColor = `${space}(${comp[0]} ${comp[1]}% ${comp[2]}% / ${comp[3]})`;
          break;
        case 'lab':
          newColor = `${space}(${comp[0]} ${comp[1]}% ${comp[2]}% / ${comp[3]})`;
          break;
        case 'lch':
          newColor = `${space}(${comp[0]}% ${comp[1]} ${comp[2]} / ${comp[3]})`;
          break;
        case 'oklab':
          newColor = `${space}(${comp[0]}% ${comp[1]} ${comp[2]} / ${comp[3]})`;
          break;
        case 'oklch':
          newColor = `${space}(${comp[0]}% ${comp[1]} ${comp[2]} / ${comp[3]})`;
          break;
      }

      colorBox.style.backgroundColor = newColor;
      const colors = getColors(newColor);
      colorInput.value = colors.hex;
      // Update hex field
      document.querySelector('#hex-input').value = colors.hex.toUpperCase();
      // Update other fields
      updateColorFields(colors);
    });
  });

  colorInput.addEventListener('input', () => {
    colorBox.style.backgroundColor = colorInput.value;
    const colors = getColors(colorInput.value);
    document.querySelector('#hex-input').value = colors.hex.toUpperCase();
    updateColorFields(colors);
  });
}

function getColors(inputColor) {
  if (inputColor.startsWith('hwb')) {
    inputColor = hwbToHsv(inputColor);
  }

  const colors = {};
  const hsv = chroma(inputColor).hsv();
  const alpha = chroma(inputColor).rgba()[3];
  const hwb = [hsv[0], (1 - hsv[1]) * hsv[2], 1 - hsv[2], alpha];

  colors.hex = chroma(inputColor).hex();
  colors.rgb = chroma(inputColor).rgb();
  colors.rgba = chroma(inputColor).rgba();
  colors.hsl = chroma(inputColor).hsl().slice(0, -1);
  colors.hsla = chroma(inputColor).hsl();
  colors.hwb = hwb;
  colors.lab = chroma(inputColor).lab();
  colors.lch = chroma(inputColor).lch();
  colors.oklab = chroma(inputColor).oklab();
  colors.oklch = chroma(inputColor).oklch();

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

  return colors;
}

function updateColorFields(colors) {
  const fields = getFormFields();
  for (const space in fields) {
    fields[space][0].value = colors[space][0];
    fields[space][1].value = colors[space][1];
    fields[space][2].value = colors[space][2];
    if (space != 'rgb' && space != 'hsl') {
      fields[space][3].value = colors[space][3];
    }
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

// function hwbToHsv(hwb) {
//   hwb = hwb.slice(4).split(')')[0].split(' ');
//   hwb.splice(3, 1);
//   hwb[1] = hwb[1].replace('%', '');
//   hwb[2] = hwb[2].replace('%', '');
//   hwb[1]
//   hwb = [hwb[0], 1 - hwb[1] / (1 - hwb[2]), 1 - hwb[2], hwb[3]];
//   return `hsv(${hwb[0]}, ${hwb[1]}, ${hwb[2]})`;
// }
