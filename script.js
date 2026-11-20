let introductionStarted = false;
const message = document.querySelector('#message');
const scene = document.querySelector('#penguin-scene');
const passwordForm = document.querySelector('#password-form');
const birthdayInput = document.querySelector('#birthday');
const passwordError = document.querySelector('#password-error');

setTimeout(() => {
  document.querySelector('#loading-text').textContent = 'Đợi xíu nha....';
}, 3000);

setTimeout(() => {
  document.querySelector('#loading').hidden = true;
  document.querySelector('#password-entry').hidden = false;
  document.body.dataset.stage = 'password';
}, 7000);

birthdayInput.addEventListener('input', () => {
  passwordError.textContent = '';
  birthdayInput.removeAttribute('aria-invalid');
});

passwordForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (introductionStarted) return;
  // This is a playful frontend gate, not authentication for private content.
  if (birthdayInput.value !== '21111998') {
    passwordError.textContent = 'Incorrect password. Try again.';
    birthdayInput.setAttribute('aria-invalid', 'true');
    birthdayInput.focus();
    return;
  }

  introductionStarted = true;
  passwordError.textContent = '';
  birthdayInput.removeAttribute('aria-invalid');
  birthdayInput.disabled = true;
  const unlockButton = passwordForm.querySelector('button[type="submit"]');
  unlockButton.disabled = true;
  unlockButton.textContent = 'Đang tải…';
  unlockButton.classList.add('unlock-loading');
  await pause(1100);
  birthdayInput.value = '';
  passwordForm.hidden = true;
  document.body.dataset.stage = 'searching';
  document.querySelector('#password-entry').hidden = true;
  scene.hidden = false;
  startPenguinIntroduction();
});

const pause = ms => new Promise(resolve => setTimeout(resolve, ms));

async function startPenguinIntroduction() {
  const stage = scene.querySelector('.climb-stage');
  const actor = scene.querySelector('.climb-actor');
  const wave = scene.querySelector('.wave-after-climb');

  stage.dataset.phase = 'peek';
  await pause(900);
  message.textContent = 'Helloooooo !!';
  message.hidden = false;
  await pause(2400);
  message.hidden = true;
  stage.dataset.phase = 'climb';
  await pause(900);
  actor.classList.add('in-front');
  await pause(900);

  stage.dataset.phase = 'landed';
  wave.classList.add('waving');
  message.textContent = 'Có cái này cho chị nèeee';
  message.hidden = false;
  await pause(1200);

  wave.classList.remove('waving');
  actor.dataset.phase = 'rummaging';
  actor.setAttribute('aria-label', 'Cánh cụt vui vẻ lục túi');
  message.hidden = true;
  await pause(2000);

  actor.dataset.phase = 'huh';
  message.textContent = 'Ủa..';
  message.hidden = false;
  await pause(900);
  actor.dataset.phase = 'looking';
  actor.setAttribute('aria-label', 'Cánh cụt cúi nhìn vào túi và tiếp tục lục tìm');
  message.hidden = true;
  await pause(700);
  message.hidden = true;
  actor.dataset.phase = 'found';
  actor.setAttribute('aria-label', 'Cánh cụt cúi xuống kiểm tra túi lần nữa');
  message.textContent = 'Ah đây rồi';
  message.hidden = false;
  await pause(700);
  actor.dataset.phase = 'offering';
  stage.dataset.tickets = 'drawing';
  actor.setAttribute('aria-label', 'Cánh cụt tìm thấy ba phiếu bốc thăm và đưa ra');
  const draw = document.querySelector('#paper-game');
  draw.hidden = false;
  await pause(900);
  stage.dataset.tickets = 'found';
  message.hidden = true;
  scene.dataset.view = 'zooming';
  document.querySelector('#ticket-options').hidden = false;
  await pause(600);
  stage.hidden = true;
  scene.dataset.view = 'tickets';
  document.querySelector('#ticket-options').hidden = false;
  document.querySelector('#game-title').hidden = false;
  ticketsReady = true;
  for (const paper of document.querySelectorAll('[data-paper]')) paper.disabled = false;
  document.querySelector('#game-title').focus({ preventScroll: true });
}

let ticketsReady = false;
let ticketPicked = false;
for (const paper of document.querySelectorAll('[data-paper]')) {
  paper.disabled = true;
  paper.addEventListener('click', () => {
    if (!ticketsReady || ticketPicked) return;
    ticketPicked = true;
    for (const ticket of document.querySelectorAll('[data-paper]')) ticket.disabled = true;
    paper.classList.add('picked');
    const stamp = document.createElement('span');
    stamp.textContent = 'BÀI KIỂM TRA';
    paper.replaceChildren();
    paper.append(stamp);
    paper.setAttribute('aria-label', 'Bài kiểm tra');
    setTimeout(() => {
      document.querySelector('#open-letter').hidden = false;
    }, 1750);
  });
}

document.querySelector('#open-letter').addEventListener('click', () => {
  if (!ticketPicked || document.querySelector('#open-letter').hidden) return;
  scene.hidden = true;
  document.querySelector('#age-quiz').hidden = false;
  showQuizQuestion();
});

const quizQuestions = [
  {
    title: 'Giờ là 2 giờ sáng. Chị Nhi đang:',
    answers: ['Hỏi thừa zị', 'Làm nốt tí thoi, sắp xong rùii.', 'Không tiện trả lời, đang làm ời.']
  },
  {
    title: 'Vừa đứng dậy sau khi ngồi làm việc, âm thanh nào xuất hiện?',
    answers: ['“Rắc.”', '“Á… lưng.”', '*đau quá không nói nên lời...*']
  },
  {
    title: 'Câu đầu tiên của bài kiểm tra hỏi gì?',
    answers: ['Ủa???', 'Không nhớ, cho xem lại ii', 'Câu đầu tiên nào??']
  }
];
let quizIndex = 0;
let questionAnswered = false;
const nextQuestion = document.querySelector('#quiz-next');

function showQuizQuestion() {
  questionAnswered = false;
  const question = quizQuestions[quizIndex];
  document.querySelector('#quiz-progress').textContent = `Câu ${quizIndex + 1} / ${quizQuestions.length}`;
  const title = document.querySelector('#quiz-title');
  title.textContent = question.title;
  const answers = document.querySelector('#quiz-answers');
  answers.replaceChildren();
  nextQuestion.hidden = true;
  nextQuestion.textContent = quizIndex === quizQuestions.length - 1 ? 'Nộp bài' : 'Câu tiếp theo';
  question.answers.forEach((answer, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('aria-pressed', 'false');
    button.textContent = `${'ABC'[index]}. ${answer}`;
    button.addEventListener('click', () => {
      questionAnswered = true;
      for (const option of answers.children) {
        option.classList.remove('selected');
        option.setAttribute('aria-pressed', 'false');
      }
      button.classList.add('selected');
      button.setAttribute('aria-pressed', 'true');
      nextQuestion.hidden = false;
    });
    answers.append(button);
  });
  title.focus();
}

nextQuestion.addEventListener('click', () => {
  if (!questionAnswered || nextQuestion.hidden) return;
  quizIndex += 1;
  if (quizIndex < quizQuestions.length) {
    showQuizQuestion();
  } else {
    nextQuestion.hidden = true;
    document.querySelector('#quiz-questions').hidden = true;
    startBirthdayFinale();
  }
});

const guide = document.querySelector('#birthday-guide');
const guideLine = document.querySelector('#guide-line');
const takeHand = document.querySelector('#take-hand');
const cake = document.querySelector('#cake');
const candleMessage = document.querySelector('#candle-message');
const wishDone = document.querySelector('#wish-done');
const birthdayContinue = document.querySelector('#birthday-continue');
const partyTitle = document.querySelector('#party-title');
const birthdayEffects = document.querySelector('#birthday-effects');
function showBirthdayEffects(kind) {
  birthdayEffects.replaceChildren();
  birthdayEffects.hidden = false;
  birthdayEffects.dataset.kind = kind;
  const count = kind === 'confetti' ? 24 : 20;
  for (let index = 0; index < count; index += 1) {
    const particle = document.createElement('span');
    particle.textContent = kind === 'hearts' ? '♥' : '✦';
    particle.setAttribute('style', `--x:${(index * 37) % 100}%;--delay:${index * .13}s;--tilt:${index * 53}deg;--hue:${index * 29};--angle:${(index % 12) * 30}deg;--burst-delay:${index < 12 ? .3 : 1.1}s`);
    birthdayEffects.append(particle);
  }
}
partyTitle.addEventListener('click', () => birthdayContinue.click());
async function startBirthdayFinale() {
  const dialogue = document.querySelector('#grading-dialogue');
  document.body.dataset.stage = 'grading';
  document.querySelector('#quiz-result').hidden = false;
  document.querySelector('#result-title').focus();
  const gradingMessages = [
    'Gòi đợi xíu em chấm bài he !! 🧐',
    'Hmm.... 🤨',
    'S--sao mà.... 🫥',
    'Hmm.... 🤔',
    'Chị Nhi nghĩ mình sẽ được nhiu điểm zị ?? 😟',
    'Haizz... 😥',
    'Được rồi em bảo nè....😟',
    'ĐÙA Á CHỨ ĐIỂM CHÁC GÌ GIỜ NÀYYYY 🤣🤣🤣'
  ];
  for (const [index, text] of gradingMessages.entries()) {
    const isJoke = index === gradingMessages.length - 1;
    if (isJoke) {
      dialogue.textContent = '';
      await pause(300);
    }
    const duration = text.startsWith('Ghé sát') ? 5000 : 3000;
    dialogue.textContent = text;
    dialogue.classList.remove('grading-long');
    if (duration === 5000) dialogue.classList.add('grading-long');
    dialogue.classList.remove('grading-fade');
    void dialogue.offsetWidth;
    dialogue.classList.add(isJoke ? 'grading-joke' : 'grading-fade');
    await pause(duration);
  }
  document.querySelector('#age-quiz').hidden = true;
  document.body.dataset.stage = 'guide';
  guide.hidden = false;
  guideLine.focus();
}

// Match --guide-duration so the walk ends as the floor finishes scrolling.
let guideTimeLeft = 3600;
let guideStartedAt;
let guideTimer;
let handInput;

function holdHand(input) {
  if (guide.hidden || !['ready', 'paused'].includes(guide.dataset.phase) || handInput !== undefined) return false;
  handInput = input;
  guideStartedAt = performance.now();
  guide.dataset.phase = 'walking';
  guideTimer = setTimeout(arriveAtCake, guideTimeLeft);
  return true;
}

function releaseHand(input) {
  if (handInput === undefined || handInput !== input) return;
  clearTimeout(guideTimer);
  handInput = undefined;
  if (guide.dataset.phase === 'release') {
    revealCake();
    return;
  }
  guideTimeLeft = Math.max(0, guideTimeLeft - (performance.now() - guideStartedAt));
  guide.dataset.phase = 'paused';
}

takeHand.addEventListener('pointerdown', (event) => {
  if (event.button !== 0 || !holdHand(event.pointerId)) return;
  takeHand.setPointerCapture(event.pointerId);
});
for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) {
  takeHand.addEventListener(type, (event) => releaseHand(event.pointerId));
}
takeHand.addEventListener('pointermove', (event) => {
  if (handInput !== event.pointerId || guide.dataset.phase !== 'walking') return;
  const ring = takeHand.getBoundingClientRect();
  const distance = Math.hypot(event.clientX - ring.left - ring.width / 2,
    event.clientY - ring.top - ring.height / 2);
  if (distance > ring.width / 2) releaseHand(event.pointerId);
});
for (const type of ['keydown', 'keyup']) {
  takeHand.addEventListener(type, (event) => {
    if (event.key !== ' ' && event.key !== 'Enter') return;
    event.preventDefault();
    if (type === 'keyup') releaseHand(event.key);
    else if (!event.repeat) holdHand(event.key);
  });
}
takeHand.addEventListener('blur', () => releaseHand(handInput));

function arriveAtCake() {
  guide.dataset.phase = 'release';
  guideLine.textContent = 'Gòi gòi, giờ buông tay ra nhe';
}

async function revealCake() {
  await pause(420);
  guide.dataset.phase = 'blackout';
  document.body.dataset.stage = 'blackout';
  await pause(1250);
  guide.dataset.phase = 'arrived';
  guide.classList.add('message-only');
  partyTitle.textContent = birthdayMessages[0];
  partyTitle.classList.add('birthday-message');
  birthdayMessageIndex = 1;
  document.querySelector('#birthday-party').hidden = false;
  document.body.dataset.stage = 'party';
  partyTitle.focus();
  await pause(1600);
  birthdayContinue.hidden = false;
}

// Thêm lời nhắn ở đây. Mỗi chuỗi hiện sau một lần chạm.
const birthdayMessages = [
  'Em đã nói là sẽ nhớ đến sinh nhật của chị năm nay he 😁',
  'Chúc mừng sinh nhật chị Nhiiiiiiii',
  'Chúc chị Nhi của em sẽ có một tuổi 28 thật là rực rỡ nháaaa 💕💕💕🥳🥳🥳',
  'Em biết là mọi thứ không phải lúc nào cũng dễ dàng, nhưng chị vẫn đang làm rất tốt rùiiiii',
  '❤️ Em tự hào về cô gái của em ❤️',
  'Và em cũng hi vọng cô gái ấy sẽ luôn thật hạnh phúc, và phải biết yêu thương chính mình nhó!',
  // 'Và em cũng hi vọng cô gái ấy sẽ không quên mình luôn xứng đáng được nhận tình yêu thương nháaa 💕️',
  'Thêm tuổi mới, nhớ dành thêm thời gian để nghỉ ngơi nữa hen',
  'From khanhiu của chị with love ❤️',
  '❤️ Em yêu chị ❤️',
];
let birthdayMessageIndex = 0;

birthdayContinue.addEventListener('click', async () => {
  if (birthdayContinue.hidden) return;
  birthdayContinue.hidden = true;
  birthdayContinue.textContent = '';
  birthdayContinue.setAttribute('aria-label', 'Chuyển lời nhắn tiếp theo');
  const hasMessage = birthdayMessageIndex < birthdayMessages.length;
  if (!hasMessage) partyTitle.classList.add('wish-transition');
  partyTitle.classList.add('fading');
  await pause(hasMessage ? 650 : 1100);
  partyTitle.classList.remove('birthday-celebration', 'love-message');
  birthdayEffects.hidden = true;
  if (!hasMessage) await pause(350);
  partyTitle.textContent = hasMessage ? birthdayMessages[birthdayMessageIndex] : 'Giờ mình nhắm mắt lại và ước nhá 😌';
  if (hasMessage && /Em iu chị/i.test(partyTitle.textContent)) {
    partyTitle.classList.add('love-message');
    showBirthdayEffects('hearts');
  }
  if (hasMessage) partyTitle.classList.add('birthday-message');
  else partyTitle.classList.remove('birthday-message');
  partyTitle.classList.remove('fading');
  partyTitle.focus();
  if (birthdayMessageIndex === 1 && hasMessage) {
    guide.classList.remove('message-only');
    cake.dataset.phase = 'lit';
    showBirthdayEffects('confetti');
    partyTitle.classList.add('birthday-celebration');
    await pause(2200);
    birthdayContinue.textContent = 'Chạm vào màn hình để tiếp tục';
    birthdayContinue.removeAttribute('aria-label');
  }
  if (hasMessage) {
    birthdayMessageIndex += 1;
    birthdayContinue.hidden = false;
    return;
  }
  await pause(8000);
  wishDone.hidden = false;
});

wishDone.addEventListener('click', async () => {
  if (wishDone.hidden) return;
  wishDone.hidden = true;
  partyTitle.textContent = 'Đếm 1, 2, 3 rồi thổi nến hennnn';
  await pause(1800);
  candleMessage.textContent = '';
  partyTitle.classList.add('counting');
  for (let count = 1; count <= 3; count += 1) {
    partyTitle.textContent = String(count);
    await pause(1000);
  }
  cake.dataset.phase = 'out';
  partyTitle.classList.remove('counting');
  partyTitle.textContent = '';
  candleMessage.textContent = '';
  const party = document.querySelector('#birthday-party');
  party.hidden = true;
  guide.hidden = true;
  birthdayEffects.hidden = true;
  document.body.dataset.stage = 'blackout';
  await pause(5000);
  const bedtime = document.querySelector('#bedtime');
  bedtime.hidden = false;
  document.querySelector('#bedtime-continue').focus();
});

document.querySelector('#bedtime-continue').addEventListener('click', async () => {
  const bedtime = document.querySelector('#bedtime');
  if (bedtime.hidden) return;
  bedtime.hidden = true;
  await pause(2000);
  startFarewell();
});

async function startFarewell() {
  const farewell = document.querySelector('#birthday-farewell');
  const line = document.querySelector('#farewell-line');
  document.body.dataset.stage = 'farewell';
  farewell.hidden = false;
  farewell.dataset.phase = 'wait';
  line.textContent = 'Từ từ từ từ đã';
  line.focus();
  await pause(2200);
  farewell.dataset.phase = 'speak';
  line.textContent = 'trước khi chị đi em có cái này....';
  await pause(1900);
  farewell.dataset.phase = 'reach';
  await pause(180);
  farewell.dataset.phase = 'place';
  await pause(800);
  farewell.dataset.phase = 'release';
  await pause(700);
  farewell.dataset.phase = 'done';
  await pause(160);
  line.textContent = 'ta daaaa';
  await pause(1050);
  farewell.dataset.phase = 'goodbye';
  await pause(640);
  farewell.dataset.phase = 'duck';
  line.textContent = '';
  await pause(520);
  farewell.dataset.phase = 'last-peek';
  await pause(300);
  line.textContent = 'Ngủ thiệt nha.';
  await pause(1250);
  farewell.dataset.phase = 'last-hide';
  await pause(440);
  line.textContent = '';
}

