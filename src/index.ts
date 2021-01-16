import './types';
import { generateRandomId, LINK_REGEX } from './utility';
import './assets/less/index.less';

let isMobileNavShowing = false;
const generatedLinks: string[] = [];

const sideDrawer = document.querySelector('.side-drawer') as HTMLElement;
const hamburguerButton = document.querySelector('.hamburguer') as HTMLElement;

function handleHamburguerButtonClick() {
  hamburguerButton.addEventListener('click', () => {
    isMobileNavShowing = !isMobileNavShowing;

    if (isMobileNavShowing) {
      sideDrawer.style.display = 'block';
    } else {
      sideDrawer.style.display = 'none';
    }
  });
}

function handleWindowResize() {
  window.onresize = () => {
    if (isMobileNavShowing && window.innerWidth >= 850) {
      sideDrawer.style.display = 'none';
      isMobileNavShowing = false;
    }
  };
}

function setUpNavigation() {
  handleHamburguerButtonClick();
  handleWindowResize();
}

function createShortedLinkItem(
  originalLink: string,
  generatedLink: string,
): HTMLLIElement {
  const item = document.createElement('li');

  item.innerHTML = `<p>${originalLink}</p>
    <div>
      <a href="#">${generatedLink}</a>
      <button>Copy</button>
    </div>`;

  return item;
}

function validateInput(value: string): boolean {
  return !!(value && value.match(LINK_REGEX));
}

function generateShortedLink(): string {
  let generatedId = generateRandomId(5);
  while (generatedLinks.includes(generatedId)) {
    generatedId = generateRandomId(5);
  }

  generatedLinks.includes(generatedId);

  const shortedLink = `https://rel.ink/${generatedId}`;
  return shortedLink;
}

function addCopyHandlerButton(item: HTMLLIElement, shortedLink: string) {
  const button = item.querySelector('button');

  button.addEventListener('click', async () => {
    const data = [
      new ClipboardItem({
        'text/plain': new Blob([shortedLink], { type: 'text/plain' }),
      }),
    ];

    try {
      await navigator.clipboard.write(data);
      button.className = 'copied';
      button.innerHTML = 'Copied!';
    } catch (error) {
      console.error('Unable to write to clipboard. :-(');
    }
  });
}

function showErrorMessage(element: HTMLElement, input: HTMLInputElement) {
  input.className = 'invalid';
  element.style.visibility = 'visible';
}

function hideErrorMessage(element: HTMLElement, input: HTMLInputElement) {
  input.className = '';
  element.style.visibility = 'hidden';
}

function clearInput(input: HTMLInputElement) {
  input.value = '';
}

function handleShortUrl() {
  const input = document.querySelector('#section-2 input') as HTMLInputElement;
  const errorMessage = document.querySelector('.error') as HTMLElement;

  const originLink = input.value;

  if (validateInput(originLink)) {
    const shortedLink = generateShortedLink();
    const item = createShortedLinkItem(originLink, shortedLink);

    addCopyHandlerButton(item, shortedLink);

    const links = document.querySelector('.shorted-links') as HTMLElement;
    links.appendChild(item);

    hideErrorMessage(errorMessage, input);
    clearInput(input);
  } else {
    showErrorMessage(errorMessage, input);
  }
}

function setUpShortForm() {
  const button = document.querySelector('#section-2 button') as HTMLElement;

  button.addEventListener('click', handleShortUrl);

  const input = document.querySelector('#section-2 input') as HTMLInputElement;

  input.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      handleShortUrl();
    }
  });
}

function handleDocumentLoad() {
  setUpNavigation();
  setUpShortForm();
}

document.body.onload = handleDocumentLoad;
