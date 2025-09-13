const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');
const title = document.querySelector('.logo');
const circle = document.querySelector(".circle");
const mainContent = document.querySelector('main');

if (hamButton && navigation && title) {
  hamButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    hamButton.classList.toggle('open');
    title.classList.toggle('hidden');
    circle.classList.toggle('hidden');

    // Dynamically push down content when nav opens
      if (navigation.classList.contains('open')) {
        // Temporarily display nav to get its height
        navigation.style.display = 'flex';
        const navHeight = navigation.offsetHeight;
        mainContent.style.marginTop = navHeight + 'px';
      } else {
        mainContent.style.marginTop = '0';
        navigation.style.display = '';
      }
  });
};
