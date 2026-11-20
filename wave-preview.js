document.querySelector('#replay').addEventListener('click', () => {
  const sprite = document.querySelector('.penguin-sprite');
  sprite.classList.remove('waving');
  void sprite.offsetWidth;
  sprite.classList.add('waving');
});
