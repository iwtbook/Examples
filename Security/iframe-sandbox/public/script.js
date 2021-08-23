// script.js

const iframe = document.querySelector('#iframeWrapper > iframe')

function toggleValueSandbox(value) {
  let sandboxArr = iframe.getAttribute('sandbox')
  sandboxArr = sandboxArr ? sandboxArr.split(' ') : [];
  if (!sandboxArr.includes(value)) {
    sandboxArr.push(value);
  } else {
    sandboxArr.splice(sandboxArr.indexOf(value), 1);
  }
  iframe.setAttribute('sandbox', sandboxArr.join(' '));
}

function init() {
  let allowDownloads, allowForms, allowModals, allowPointerLock, allowPopups,
    allowPopupsToEscapeSandbox, allowPresentation, allowSameOrigin, allowScripts,
    allowTopNav, allowTopNavUserAct;

  allowDownloads = document.getElementById('allowDownloads');
  allowForms = document.getElementById('allowForms');
  allowModals = document.getElementById('allowModals');
  allowPointerLock = document.getElementById('allowPointerLock');
  allowPopups = document.getElementById('allowPopups');
  allowPopupsToEscapeSandbox = document.getElementById('allowPopupsToEscapeSandbox');
  allowPresentation = document.getElementById('allowPresentation');
  allowSameOrigin = document.getElementById('allowSameOrigin')
  allowScripts = document.getElementById('allowScripts');
  allowTopNav = document.getElementById('allowTopNav');
  allowTopNavUserAct = document.getElementById('allowTopNavUserAct');

  allowDownloads.addEventListener('change', () => { toggleValueSandbox('allow-downloads') });
  allowForms.addEventListener('change', () => { toggleValueSandbox('allow-forms') });
  allowModals.addEventListener('change', () => { toggleValueSandbox('allow-modals') });
  allowPointerLock.addEventListener('change', () => { toggleValueSandbox('allow-pointer-lock') });
  allowPopups.addEventListener('change', () => { toggleValueSandbox('allow-popups') });
  allowPopupsToEscapeSandbox.addEventListener('change', () => { toggleValueSandbox('allow-popups-to-escape-sandbox') });
  allowPresentation.addEventListener('change', () => { toggleValueSandbox('allow-presentation') });
  allowSameOrigin.addEventListener('change', () => { toggleValueSandbox('allow-same-origin') });
  allowScripts.addEventListener('change', () => { toggleValueSandbox('allow-scripts') });
  allowTopNav.addEventListener('change', () => { toggleValueSandbox('allow-top-navigation') });
  allowTopNavUserAct.addEventListener('change', () => { toggleValueSandbox('allow-top-navigation-by-user-activation') });
}

document.addEventListener('DOMContentLoaded', init);
