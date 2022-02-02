// script.js

document.addEventListener('DOMContentLoaded', init);

function init() {
  bindListeners();
}

function bindListeners() {
  const bgColor = document.querySelector('#bg-color');
  const borderColor = document.querySelector('#border-color');
  const height = document.querySelector('#size-height');
  const width = document.querySelector('#size-width');
  const padding = Array.from(
    document.querySelectorAll('input[name^="padding-"]')
  );
  const border = Array.from(
    document.querySelectorAll('input[name^="border-"]')
  );
  const margin = Array.from(
    document.querySelectorAll('input[name^="margin-"]')
  );

  bgColor.addEventListener('input', modifyBoxModel);
  borderColor.addEventListener('input', modifyBoxModel);
  height.addEventListener('input', modifyBoxModel);
  width.addEventListener('input', modifyBoxModel);
  padding.forEach((slider) => {
    slider.addEventListener('input', modifyBoxModel);
  });
  border.forEach((slider) => {
    slider.addEventListener('input', modifyBoxModel);
  });
  margin.forEach((slider) => {
    slider.addEventListener('input', modifyBoxModel);
  });
}

function modifyBoxModel(e) {
  // Box Element
  const boxElem = document.querySelector('#demo-box');
  // Form Elements
  const syncSliders = Array.from(
    document.querySelectorAll('input[type="checkbox"]')
  );
  const height = document.querySelector('#size-height');
  const width = document.querySelector('#size-width');
  const padding = Array.from(
    document.querySelectorAll('input[name^="padding-"]')
  );
  const border = Array.from(
    document.querySelectorAll('input[id^="size-border-"]')
  );
  const margin = Array.from(
    document.querySelectorAll('input[name^="margin-"]')
  );
  // Code Elements
  const codeBgColor = document.querySelector('#code .bg-color');
  const codeBorderColor = document.querySelector('#code .border-color');
  const codeHeight = document.querySelector('#code .h');
  const codeWidth = document.querySelector('#code .w');
  const codePaddingTop = document.querySelector('#code .p.top');
  const codePaddingRight = document.querySelector('#code .p.right');
  const codePaddingBottom = document.querySelector('#code .p.bottom');
  const codePaddingLeft = document.querySelector('#code .p.left');
  const codeBorderTop = document.querySelector('#code .b.top');
  const codeBorderRight = document.querySelector('#code .b.right');
  const codeBorderBottom = document.querySelector('#code .b.bottom');
  const codeBorderLeft = document.querySelector('#code .b.left');
  const codeMarginTop = document.querySelector('#code .m.top');
  const codeMarginRight = document.querySelector('#code .m.right');
  const codeMarginBottom = document.querySelector('#code .m.bottom');
  const codeMarginLeft = document.querySelector('#code .m.left');

  // Event Element that was triggered - A specific form elem
  const elem = e.target;

  const delayTime = 2000;

  switch (elem.id) {
    case 'bg-color':
      boxElem.style.backgroundColor = elem.value;
      codeBgColor.innerHTML = elem.value;
      codeBgColor.classList.add('modified');
      setTimeout(() => {
        codeBgColor.classList.remove('modified');
      }, delayTime);
      break;
    case 'border-color':
      boxElem.style.borderColor = elem.value;
      codeBorderColor.innerHTML = elem.value;
      codeBorderColor.classList.add('modified');
      setTimeout(() => {
        codeBorderColor.classList.remove('modified');
      }, delayTime);
      break;
    case 'size-height':
      boxElem.style.height = `${elem.value}px`;
      codeHeight.innerHTML = elem.value;
      codeHeight.classList.add('modified');
      setTimeout(() => {
        codeHeight.classList.remove('modified');
      }, delayTime);
      if (syncSliders[0].checked) {
        width.value = width.max * (elem.value / elem.max);
        codeWidth.innerHTML = Math.round(width.max * (elem.value / elem.max));
        boxElem.style.width = `${width.value}px`;
        codeWidth.classList.add('modified');
        setTimeout(() => {
          codeWidth.classList.remove('modified');
        }, delayTime);
      }
      break;
    case 'size-width':
      boxElem.style.width = `${elem.value}px`;
      codeWidth.innerHTML = elem.value;
      codeWidth.classList.add('modified');
      setTimeout(() => {
        codeWidth.classList.remove('modified');
      }, delayTime);
      if (syncSliders[0].checked) {
        height.value = height.max * (elem.value / elem.max);
        codeHeight.innerHTML = Math.round(height.max * (elem.value / elem.max));
        boxElem.style.height = `${height.value}px`;
        codeHeight.classList.add('modified');
        setTimeout(() => {
          codeHeight.classList.remove('modified');
        }, delayTime);
      }
      break;
    case 'size-padding-top':
      if (syncSliders[1].checked) {
        padding[1].value = elem.value;
        padding[2].value = elem.value;
        padding[3].value = elem.value;
        boxElem.style.padding = `${elem.value}px`;
        codePaddingTop.innerHTML = elem.value;
        codePaddingRight.innerHTML = elem.value;
        codePaddingBottom.innerHTML = elem.value;
        codePaddingLeft.innerHTML = elem.value;
        codePaddingTop.classList.add('modified');
        codePaddingRight.classList.add('modified');
        codePaddingBottom.classList.add('modified');
        codePaddingLeft.classList.add('modified');
        setTimeout(() => {
          codePaddingTop.classList.remove('modified');
          codePaddingRight.classList.remove('modified');
          codePaddingBottom.classList.remove('modified');
          codePaddingLeft.classList.remove('modified');
        }, delayTime);
      } else {
        boxElem.style.paddingTop = `${elem.value}px`;
        codePaddingTop.innerHTML = elem.value;
        codePaddingTop.classList.add('modified');
        setTimeout(() => {
          codePaddingTop.classList.remove('modified');
        }, delayTime);
      }
      break;
    case 'size-padding-right':
      if (syncSliders[1].checked) {
        padding[0].value = elem.value;
        padding[2].value = elem.value;
        padding[3].value = elem.value;
        boxElem.style.padding = `${elem.value}px`;
        codePaddingTop.innerHTML = elem.value;
        codePaddingRight.innerHTML = elem.value;
        codePaddingBottom.innerHTML = elem.value;
        codePaddingLeft.innerHTML = elem.value;
        codePaddingTop.classList.add('modified');
        codePaddingRight.classList.add('modified');
        codePaddingBottom.classList.add('modified');
        codePaddingLeft.classList.add('modified');
        setTimeout(() => {
          codePaddingTop.classList.remove('modified');
          codePaddingRight.classList.remove('modified');
          codePaddingBottom.classList.remove('modified');
          codePaddingLeft.classList.remove('modified');
        }, delayTime);
      } else {
        boxElem.style.paddingRight = `${elem.value}px`;
        codePaddingRight.innerHTML = elem.value;
        codePaddingRight.classList.add('modified');
        setTimeout(() => {
          codePaddingRight.classList.remove('modified');
        }, delayTime);
      }
      break;
    case 'size-padding-bottom':
      if (syncSliders[1].checked) {
        padding[0].value = elem.value;
        padding[1].value = elem.value;
        padding[3].value = elem.value;
        boxElem.style.padding = `${elem.value}px`;
        codePaddingTop.innerHTML = elem.value;
        codePaddingRight.innerHTML = elem.value;
        codePaddingBottom.innerHTML = elem.value;
        codePaddingLeft.innerHTML = elem.value;
        codePaddingTop.classList.add('modified');
        codePaddingRight.classList.add('modified');
        codePaddingBottom.classList.add('modified');
        codePaddingLeft.classList.add('modified');
        setTimeout(() => {
          codePaddingTop.classList.remove('modified');
          codePaddingRight.classList.remove('modified');
          codePaddingBottom.classList.remove('modified');
          codePaddingLeft.classList.remove('modified');
        }, delayTime);
      } else {
        boxElem.style.paddingBottom = `${elem.value}px`;
        codePaddingBottom.innerHTML = elem.value;
        codePaddingBottom.classList.add('modified');
        setTimeout(() => {
          codePaddingBottom.classList.remove('modified');
        }, delayTime);
      }
      break;
    case 'size-padding-left':
      if (syncSliders[1].checked) {
        padding[0].value = elem.value;
        padding[1].value = elem.value;
        padding[2].value = elem.value;
        boxElem.style.padding = `${elem.value}px`;
        codePaddingTop.innerHTML = elem.value;
        codePaddingRight.innerHTML = elem.value;
        codePaddingBottom.innerHTML = elem.value;
        codePaddingLeft.innerHTML = elem.value;
        codePaddingTop.classList.add('modified');
        codePaddingRight.classList.add('modified');
        codePaddingBottom.classList.add('modified');
        codePaddingLeft.classList.add('modified');
        setTimeout(() => {
          codePaddingTop.classList.remove('modified');
          codePaddingRight.classList.remove('modified');
          codePaddingBottom.classList.remove('modified');
          codePaddingLeft.classList.remove('modified');
        }, delayTime);
      } else {
        boxElem.style.paddingLeft = `${elem.value}px`;
        codePaddingLeft.innerHTML = elem.value;
        codePaddingLeft.classList.add('modified');
        setTimeout(() => {
          codePaddingLeft.classList.remove('modified');
        }, delayTime);
      }
      break;
    case 'size-border-top':
      if (syncSliders[2].checked) {
        border[1].value = elem.value;
        border[2].value = elem.value;
        border[3].value = elem.value;
        boxElem.style.borderWidth = `${elem.value}px`;
        codeBorderTop.innerHTML = elem.value;
        codeBorderRight.innerHTML = elem.value;
        codeBorderBottom.innerHTML = elem.value;
        codeBorderLeft.innerHTML = elem.value;
        codeBorderTop.classList.add('modified');
        codeBorderRight.classList.add('modified');
        codeBorderBottom.classList.add('modified');
        codeBorderLeft.classList.add('modified');
        setTimeout(() => {
          codeBorderTop.classList.remove('modified');
          codeBorderRight.classList.remove('modified');
          codeBorderBottom.classList.remove('modified');
          codeBorderLeft.classList.remove('modified');
        }, delayTime);
      } else {
        boxElem.style.borderTopWidth = `${elem.value}px`;
        codeBorderTop.innerHTML = elem.value;
        codeBorderTop.classList.add('modified');
        setTimeout(() => {
          codeBorderTop.classList.remove('modified');
        }, delayTime);
      }
      break;
    case 'size-border-right':
      if (syncSliders[2].checked) {
        border[0].value = elem.value;
        border[2].value = elem.value;
        border[3].value = elem.value;
        boxElem.style.borderWidth = `${elem.value}px`;
        codeBorderTop.innerHTML = elem.value;
        codeBorderRight.innerHTML = elem.value;
        codeBorderBottom.innerHTML = elem.value;
        codeBorderLeft.innerHTML = elem.value;
        codeBorderTop.classList.add('modified');
        codeBorderRight.classList.add('modified');
        codeBorderBottom.classList.add('modified');
        codeBorderLeft.classList.add('modified');
        setTimeout(() => {
          codeBorderTop.classList.remove('modified');
          codeBorderRight.classList.remove('modified');
          codeBorderBottom.classList.remove('modified');
          codeBorderLeft.classList.remove('modified');
        }, delayTime);
      } else {
        boxElem.style.borderRightWidth = `${elem.value}px`;
        codeBorderRight.innerHTML = elem.value;
        codeBorderRight.classList.add('modified');
        setTimeout(() => {
          codeBorderRight.classList.remove('modified');
        }, delayTime);
      }
      break;
    case 'size-border-bottom':
      if (syncSliders[2].checked) {
        border[0].value = elem.value;
        border[1].value = elem.value;
        border[3].value = elem.value;
        boxElem.style.borderWidth = `${elem.value}px`;
        codeBorderTop.innerHTML = elem.value;
        codeBorderRight.innerHTML = elem.value;
        codeBorderBottom.innerHTML = elem.value;
        codeBorderLeft.innerHTML = elem.value;
        codeBorderTop.classList.add('modified');
        codeBorderRight.classList.add('modified');
        codeBorderBottom.classList.add('modified');
        codeBorderLeft.classList.add('modified');
        setTimeout(() => {
          codeBorderTop.classList.remove('modified');
          codeBorderRight.classList.remove('modified');
          codeBorderBottom.classList.remove('modified');
          codeBorderLeft.classList.remove('modified');
        }, delayTime);
      } else {
        boxElem.style.borderBottomWidth = `${elem.value}px`;
        codeBorderBottom.innerHTML = elem.value;
        codeBorderBottom.classList.add('modified');
        setTimeout(() => {
          codeBorderBottom.classList.remove('modified');
        }, delayTime);
      }
      break;
    case 'size-border-left':
      if (syncSliders[2].checked) {
        border[0].value = elem.value;
        border[1].value = elem.value;
        border[2].value = elem.value;
        boxElem.style.borderWidth = `${elem.value}px`;
        codeBorderTop.innerHTML = elem.value;
        codeBorderRight.innerHTML = elem.value;
        codeBorderBottom.innerHTML = elem.value;
        codeBorderLeft.innerHTML = elem.value;
        codeBorderTop.classList.add('modified');
        codeBorderRight.classList.add('modified');
        codeBorderBottom.classList.add('modified');
        codeBorderLeft.classList.add('modified');
        setTimeout(() => {
          codeBorderTop.classList.remove('modified');
          codeBorderRight.classList.remove('modified');
          codeBorderBottom.classList.remove('modified');
          codeBorderLeft.classList.remove('modified');
        }, delayTime);
      } else {
        boxElem.style.borderLeftWidth = `${elem.value}px`;
        codeBorderLeft.innerHTML = elem.value;
        codeBorderLeft.classList.add('modified');
        setTimeout(() => {
          codeBorderLeft.classList.remove('modified');
        }, delayTime);
      }
      break;
    case 'size-margin-top':
      if (syncSliders[3].checked) {
        margin[1].value = elem.value;
        margin[2].value = elem.value;
        margin[3].value = elem.value;
        boxElem.style.margin = `${elem.value}px`;
        codeMarginTop.innerHTML = elem.value;
        codeMarginRight.innerHTML = elem.value;
        codeMarginBottom.innerHTML = elem.value;
        codeMarginLeft.innerHTML = elem.value;
        codeMarginTop.classList.add('modified');
        codeMarginRight.classList.add('modified');
        codeMarginBottom.classList.add('modified');
        codeMarginLeft.classList.add('modified');
        setTimeout(() => {
          codeMarginTop.classList.remove('modified');
          codeMarginRight.classList.remove('modified');
          codeMarginBottom.classList.remove('modified');
          codeMarginLeft.classList.remove('modified');
        }, delayTime);
      } else {
        boxElem.style.marginTop = `${elem.value}px`;
        codeMarginTop.innerHTML = elem.value;
        codeMarginTop.classList.add('modified');
        setTimeout(() => {
          codeMarginTop.classList.remove('modified');
        }, delayTime);
      }
      break;
    case 'size-margin-right':
      if (syncSliders[3].checked) {
        margin[0].value = elem.value;
        margin[2].value = elem.value;
        margin[3].value = elem.value;
        boxElem.style.margin = `${elem.value}px`;
        codeMarginTop.innerHTML = elem.value;
        codeMarginRight.innerHTML = elem.value;
        codeMarginBottom.innerHTML = elem.value;
        codeMarginLeft.innerHTML = elem.value;
        codeMarginTop.classList.add('modified');
        codeMarginRight.classList.add('modified');
        codeMarginBottom.classList.add('modified');
        codeMarginLeft.classList.add('modified');
        setTimeout(() => {
          codeMarginTop.classList.remove('modified');
          codeMarginRight.classList.remove('modified');
          codeMarginBottom.classList.remove('modified');
          codeMarginLeft.classList.remove('modified');
        }, delayTime);
      } else {
        boxElem.style.marginRight = `${elem.value}px`;
        codeMarginRight.innerHTML = elem.value;
        codeMarginRight.classList.add('modified');
        setTimeout(() => {
          codeMarginRight.classList.remove('modified');
        }, delayTime);
      }
      break;
    case 'size-margin-bottom':
      if (syncSliders[3].checked) {
        margin[0].value = elem.value;
        margin[1].value = elem.value;
        margin[3].value = elem.value;
        boxElem.style.margin = `${elem.value}px`;
        codeMarginTop.innerHTML = elem.value;
        codeMarginRight.innerHTML = elem.value;
        codeMarginBottom.innerHTML = elem.value;
        codeMarginLeft.innerHTML = elem.value;
        codeMarginTop.classList.add('modified');
        codeMarginRight.classList.add('modified');
        codeMarginBottom.classList.add('modified');
        codeMarginLeft.classList.add('modified');
        setTimeout(() => {
          codeMarginTop.classList.remove('modified');
          codeMarginRight.classList.remove('modified');
          codeMarginBottom.classList.remove('modified');
          codeMarginLeft.classList.remove('modified');
        }, delayTime);
      } else {
        boxElem.style.marginBottom = `${elem.value}px`;
        codeMarginBottom.innerHTML = elem.value;
        codeMarginBottom.classList.add('modified');
        setTimeout(() => {
          codeMarginBottom.classList.remove('modified');
        }, delayTime);
      }
      break;
    case 'size-margin-left':
      if (syncSliders[3].checked) {
        margin[0].value = elem.value;
        margin[1].value = elem.value;
        margin[2].value = elem.value;
        boxElem.style.margin = `${elem.value}px`;
        codeMarginTop.innerHTML = elem.value;
        codeMarginRight.innerHTML = elem.value;
        codeMarginBottom.innerHTML = elem.value;
        codeMarginLeft.innerHTML = elem.value;
        codeMarginTop.classList.add('modified');
        codeMarginRight.classList.add('modified');
        codeMarginBottom.classList.add('modified');
        codeMarginLeft.classList.add('modified');
        setTimeout(() => {
          codeMarginTop.classList.remove('modified');
          codeMarginRight.classList.remove('modified');
          codeMarginBottom.classList.remove('modified');
          codeMarginLeft.classList.remove('modified');
        }, delayTime);
      } else {
        boxElem.style.marginLeft = `${elem.value}px`;
        codeMarginLeft.innerHTML = elem.value;
        codeMarginLeft.classList.add('modified');
        setTimeout(() => {
          codeMarginLeft.classList.remove('modified');
        }, delayTime);
      }
      break;
  }
}
