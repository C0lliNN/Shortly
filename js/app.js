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

  console.log(sideDrawer);
};
