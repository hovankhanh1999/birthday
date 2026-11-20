const stage = document.querySelector('.climb-stage');
const actor = document.querySelector('.climb-actor');
const bubble = document.querySelector('.climb-bubble');
const replay = document.querySelector('#replay-climb');
const wave = document.querySelector('.wave-after-climb');
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
let playing = false;

async function playClimb() {
  if (playing) return;
  playing = true;
  replay.disabled = true;
  bubble.hidden = true;
  actor.classList.remove('in-front');
  wave.classList.remove('waving');
  stage.dataset.phase = 'ready';
  void stage.offsetWidth;
  stage.dataset.phase = 'peek';
  await pause(900);
  bubble.textContent = 'Hellooo';
  bubble.hidden = false;
  await pause(2400);
  bubble.hidden = true;
  stage.dataset.phase = 'climb';
  await pause(900);
  actor.classList.add('in-front');
  await pause(900);
  stage.dataset.phase = 'landed';
  wave.classList.add('waving');
  bubble.textContent = 'Có cái này cho chị nèeee';
  bubble.hidden = false;
  await pause(3000);
  replay.disabled = false;
  playing = false;
}
replay.addEventListener('click', playClimb);
const images = [...document.querySelectorAll('link[rel="preload"][as="image"]')].map(link => {
  const img = new Image();
  img.src = link.href;
  return img.decode().catch(() => {});
});
Promise.all(images).then(playClimb);
