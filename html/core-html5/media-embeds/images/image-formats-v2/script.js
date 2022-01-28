// script.js

// Holds the img descriptions and file sizes
const imgData = {
  glitter: {
    alt: 'Pink and purple glitter',
    sizes: {
      avif: '3,500',
      gif: '20,943',
      jpg: '7,704',
      png: '41,582',
      webp: '5,236',
    },
  },
  'home-interior': {
    alt: 'A cozy reading nook with a chair, and  tall plant, and a bookshelf',
    sizes: {
      avif: '4,700',
      gif: '24,245',
      jpg: '9,856',
      png: '55,273',
      webp: '6,596',
    },
  },
  'iwt-logo': {
    alt: 'The letters i w and t',
    sizes: {
      avif: '10',
      gif: '86',
      jpg: '601',
      png: '47',
      svg: '1.5',
      webp: '61',
    },
  },
  'japanese-lamps': {
    alt: '3 rows of japanese lamps hanging from an outdoor overhand',
    sizes: {
      avif: '593',
      gif: '7,102',
      jpg: '2,220',
      png: '14,062',
      webp: '1,062',
    },
  },
  mountain: {
    alt: 'A plain image of a mountain in front of a sunset filled sky',
    sizes: {
      avif: '12',
      gif: '6,381',
      jpg: '466',
      png: '3,400',
      webp: '67',
    },
  },
};

// Only calls the init function when the page has loaded
document.addEventListener('DOMContentLoaded', init);

// The initial function, everything starts here
function init() {
  bindListeners();
}

// Bind the event listeners to the dropdown menus and <img> element
function bindListeners() {
  document.querySelector('#image-format').addEventListener('change', imgSelect);
  document.querySelector('#image-select').addEventListener('change', imgSelect);

  // Listen for any images that fail to load
  const img = document.querySelector('img');
  img.addEventListener('error', () => {
    const imgSelectMsg = document.querySelector('p.image-msg.select');
    const imgSelectLoad = document.querySelector('p.image-msg.loading');
    const imgSelectSupport = document.querySelector('p.image-msg.no-support');
    img.setAttribute('hidden', '');
    imgSelectMsg.setAttribute('hidden', '');
    imgSelectLoad.setAttribute('hidden', '');
    imgSelectSupport.removeAttribute('hidden');
  });

  // Hide all messages when the image loads
  img.addEventListener('load', () => {
    img.removeAttribute('hidden');
    const imgSelectLoad = document.querySelector('p.image-msg.loading');
    imgSelectLoad.setAttribute('hidden', '');
  });
}

// Change the image when the image dropdowns are modified
function imgSelect() {
  // Select the <img> and the two <select> elements
  const img = document.querySelector('img');
  let imgFormat = document.querySelector('#image-format').value;
  const imgSelect = document.querySelector('#image-select').value;
  // Allow SVGs to be selected if on the IWT logo
  if (imgSelect == 'iwt-logo') {
    document.querySelector('option[value="svg"]').removeAttribute('disabled');
    // Remove SVG as an option as well as select PNG as a default
  } else {
    document.querySelector('option[value="svg"]').setAttribute('disabled', '');
    if (imgFormat == 'svg') {
      document.querySelector('option[value="png"]').selected = 'selected';
      imgFormat = document.querySelector('#image-format').value;
    }
  }
  // If either are empty, return and don't continue.
  if (imgFormat == '' || imgSelect == '') return;
  img.setAttribute('hidden', '');
  // Selecting various needed elements
  const imgSelectMsg = document.querySelector('p.image-msg.select');
  const imgSelectLoad = document.querySelector('p.image-msg.loading');
  const imgSelectSupport = document.querySelector('p.image-msg.no-support');
  const figCaption = document.querySelector('figcaption');
  // Find the index of the selected <optino> so we can select that <option> element
  const index = document.querySelector('#image-select').selectedIndex;
  const selectedElem = document.querySelector('#image-select').children[index];

  // Construct the caption given the current picture & size
  figCaption.innerHTML = `${selectedElem.innerHTML} - ${imgData[imgSelect].sizes[imgFormat]} KB`;

  // Hide and show loading message, no image selected message, and unsupported file type message
  imgSelectMsg.setAttribute('hidden', '');
  imgSelectSupport.setAttribute('hidden', '');
  imgSelectLoad.removeAttribute('hidden');

  // Update the <img> element with the selection
  img.setAttribute('src', `images/${imgSelect}/${imgSelect}.${imgFormat}`);
  img.setAttribute('alt', imgData[imgSelect].alt);
}
