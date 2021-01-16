document.body.onload = () => {
  let isMobileNavShowing = false;

  const sideDrawer = document.querySelector('.side-drawer');

  const hamburguerButton = document.querySelector('.hamburguer');

  window.onresize = () => {
    if (isMobileNavShowing && window.innerWidth >= 850) {
      sideDrawer.style.display = 'none';
      isMobileNavShowing = false;
    }
  };

  hamburguerButton.addEventListener('click', () => {
    isMobileNavShowing = !isMobileNavShowing;

    if (isMobileNavShowing) {
      sideDrawer.style.display = 'block';
    } else {
      sideDrawer.style.display = 'none';
    }
  });

  const generateId = (length) => {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const shortButton = document.querySelector('#section-2 button');
  const errorMessage = document.querySelector('.error');
  const shortedLinks = document.querySelector('.shorted-links');

  shortButton.addEventListener('click', () => {
    const input = document.querySelector('#section-2 input');

    const linkRegex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

    if (input.value && input.value.match(linkRegex)) {
      const shortedLink = `https://rel.ink/${generateId(5)}`;

      const item = document.createElement('li');
      item.innerHTML = `<p>${input.value}</p>
        <div>
          <a href="#">${shortedLink}</a>
          <button>Copy</button>
        </div>`;

      const button = item.querySelector('button');
      button.addEventListener('click', () => {
        var data = [
          new ClipboardItem({
            'text/plain': new Blob([shortedLink], { type: 'text/plain' })
          })
        ];
        navigator.clipboard.write(data).then(
          () => {
            button.className = 'copied';
            button.innerHTML = 'Copied!';
          },
          () => {
            console.error('Unable to write to clipboard. :-(');
          }
        );
      });

      shortedLinks.appendChild(item);

      input.className = '';
      errorMessage.style.visibility = 'hidden';
    } else {
      input.className = 'invalid';
      errorMessage.style.visibility = 'visible';
    }
  });
};
