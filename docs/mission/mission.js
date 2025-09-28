const themeSelector = document.querySelector('#theme');
const body = document.body;
const logo = document.querySelector('#logo');

function changeTheme() {
  if (themeSelector.value === 'dark') {
    body.classList.add('dark');
    logo.src = 'byui-logo-white.png';
  } else {
    body.classList.remove('dark');
    logo.src = 'byui-logo-blue.png';
  }
}

themeSelector.addEventListener('change', changeTheme);
