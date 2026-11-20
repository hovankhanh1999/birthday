const stage = document.querySelector('.pocket-stage');
const actor = document.querySelector('.pocket-actor');
const bubble = document.querySelector('.pocket-bubble');
const replay = document.querySelector('#replay-pocket');
const sos = document.querySelector('#preview-sos');
const wave = document.querySelector('.penguin-sprite');
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
let playing = false;

async function playPocket() {
  if (playing) return;
  playing = true;
  replay.disabled = true;
  sos.hidden = true;
  stage.dataset.phase = 'ready';
  wave.classList.remove('waving');
  void stage.offsetWidth;
  wave.classList.add('waving');
  actor.setAttribute('aria-label', 'Cánh cụt vui vẻ chuẩn bị lấy đồ cho chị');
  bubble.textContent = 'Có cái này cho chị nèeee';
  bubble.hidden = false;
  await pause(2400);
  wave.classList.remove('waving');
  stage.dataset.phase = 'rummaging';
  actor.setAttribute('aria-label', 'Cánh cụt vẫn vui vẻ, lục túi trong im lặng');
  bubble.hidden = true;
  await pause(4200);
  stage.dataset.phase = 'huh';
  actor.setAttribute('aria-label', 'Tìm một lúc chưa thấy, cánh cụt bắt đầu bối rối');
  bubble.textContent = 'Ủa..';
  bubble.hidden = false;
  await pause(1800);
  stage.dataset.phase = 'looking';
  actor.setAttribute('aria-label', 'Cánh cụt vẫn lục túi, vừa ngó trái ngó phải tìm đồ');
  bubble.textContent = 'ủa đâu rồi....';
  await pause(2400);
  stage.dataset.phase = 'done';
  sos.hidden = false;
  replay.disabled = false;
  playing = false;
}
replay.addEventListener('click', playPocket);
const images = [...document.querySelectorAll('link[rel="preload"][as="image"]')].map(link => {
  const img = new Image();
  img.src = link.href;
  return img.decode().catch(() => {});
});
Promise.all(images).then(playPocket);
