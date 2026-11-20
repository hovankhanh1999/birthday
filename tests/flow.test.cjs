const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync(require('node:path').join(__dirname, '../script.js'), 'utf8');
function setup(search = '') {
  const nodes = {}, timers = [], labels = [];
  function make() {
    const classes = new Set();
    return { hidden: true, disabled: false, value: '', textContent: '', dataset: {}, children: [], attributes: {},
      classList: { add(...names) { names.forEach(n => classes.add(n)); }, remove(...names) { names.forEach(n => classes.delete(n)); } },
      setAttribute(k,v) { this.attributes[k] = v; }, removeAttribute(k) { delete this.attributes[k]; },
      focus() {}, scrollIntoView() {}, before() {}, after() {},
      addEventListener(t, fn) { this[t] = fn; }, replaceChildren() { this.children=[]; }, append(n) { this.children.push(n); },
      querySelector: node, content: { cloneNode() { return {}; } }
    };
  }
  function node(id) { return nodes[id] ??= make(); }
  const papers = [make(),make(),make()], actor = make();
  nodes['.mascot'] = actor;
  const document = { body: { dataset: {} }, createElement: make, querySelector: node,
    querySelectorAll(selector) { return selector === '[data-paper]' ? papers : []; } };
 const clock = {now: 0};
 const context = vm.createContext({
   document, location: {search}, URLSearchParams, performance: {now: () => clock.now},
   setTimeout(fn, ms) { const timer = {fn, ms}; timers.push(timer); return timer; },
   clearTimeout(timer) { const index = timers.indexOf(timer); if (index >= 0) timers.splice(index, 1); }
 });
 vm.runInContext(source, context);
 return {node, nodes, timers, papers, document, context, clock};
}
const submit = {preventDefault(){}};

test('old preview links start at the beginning', () => {
 for (const preview of ['guide', 'bedtime', 'farewell']) {
  const {node,timers} = setup('?preview=' + preview);
  assert.deepEqual(timers.map(timer => timer.ms), [3000, 7000]);
  assert.equal(node('#birthday-guide').hidden, true);
  assert.equal(node('#bedtime').hidden, true);
  assert.equal(node('#birthday-farewell').hidden, true);
 }
});
test('loading leads to password entry and wrong password and unlock are guarded', async () => {
  const {node,timers,document}=setup();
  assert.deepEqual(timers.map(timer=>timer.ms),[3000,7000]);
  timers.shift().fn();
  assert.equal(node('#loading-text').textContent,'Đợi xíu nha....');
  timers.shift().fn();
  assert.equal(node('#loading').hidden,true);
  assert.equal(node('#password-entry').hidden,false);
  assert.equal(document.body.dataset.stage,'password');
  node('#birthday').value='00000000';node('#password-form').submit(submit);
  assert.equal(node('#penguin-scene').hidden,true);
  assert.equal(node('#birthday').attributes['aria-invalid'],'true');
  node('#birthday').input();assert.equal(node('#password-error').textContent,'');
  node('#birthday').value='21111998';const unlocked=node('#password-form').submit(submit);
  assert.equal(node('#penguin-scene').hidden,true);
  const count=timers.length;node('#birthday').value='21111998';node('#password-form').submit(submit);
  assert.equal(timers.length,count);
  assert.equal(node('button[type="submit"]').textContent,'Đang tải…');
  assert.equal(timers[0].ms,1100);timers.shift().fn();
  await unlocked;
  assert.equal(node('#password-entry').hidden,true);assert.equal(node('#penguin-scene').hidden,false);
});
test('intro keeps confused dialogue then draws three selectable tickets',async()=>{
 const {node,timers,context}=setup();timers.length=0;
 const done=vm.runInContext('startPenguinIntroduction()',context);
 const advance=async()=>{timers.shift().fn();await new Promise(setImmediate);};
 assert.equal(node('.climb-stage').dataset.phase,'peek');
 await advance();assert.equal(node('#message').textContent,'Helloooooo !!');
 await advance();assert.equal(node('.climb-stage').dataset.phase,'climb');
 await advance();await advance();assert.equal(node('#message').textContent,'Có cái này cho chị nèeee');
 await advance();assert.equal(node('.climb-actor').dataset.phase,'rummaging');assert.equal(node('#message').hidden,true);
 assert.equal(timers[0].ms, 2000);
 await advance();assert.equal(node('#message').textContent,'Ủa..');
 await advance();assert.equal(node('#message').hidden,true);assert.equal(node('#message').textContent,'Ủa..');
 assert.equal(timers[0].ms,700);
 await advance();
 assert.equal(node('.climb-actor').dataset.phase,'found');
 assert.equal(node('#message').textContent,'Ah đây rồi');
 assert.equal(node('#message').hidden,false);
 assert.equal(node('#paper-game').hidden,true);
 assert.equal(timers[0].ms,700);
 await advance();
 assert.equal(node('.climb-actor').dataset.phase,'offering');
 assert.equal(node('#paper-game').hidden,false);
 assert.equal(node('#message').hidden,false);
 assert.equal(vm.runInContext('ticketsReady',context),false);
 assert.equal(timers[0].ms,900);
 assert.equal(node('#game-title').hidden,true);
 assert.equal(node('#ticket-options').hidden,true);
 await advance();
 assert.equal(node('#message').hidden,true);
 assert.equal(node('#ticket-options').hidden,false);
 assert.equal(node('#penguin-scene').dataset.view,'zooming');
 assert.equal(timers[0].ms,600);
 await advance();await done;
 assert.equal(node('#game-title').hidden,false);
 assert.equal(node('#ticket-options').hidden,false);
 assert.equal(node('.climb-stage').hidden,true);
 assert.equal(node('#penguin-scene').dataset.view,'tickets');
 assert.equal(vm.runInContext('ticketsReady',context),true);
});
test('any first ticket wins the quiz and repeated or premature picks are ignored',()=>{
 for(const first of [0,1,2]){
  const {node,papers,context,timers}=setup();
  papers[first].click();node('#open-letter').click();assert.equal(node('#age-quiz').hidden,true);
  vm.runInContext('ticketsReady = true',context);
  papers[first].click();assert.equal(papers[first].children[0].textContent,'BÀI KIỂM TRA');
  const result=node('#paper-result').textContent;
  papers.forEach(p=>p.click());assert.equal(node('#paper-result').textContent,result);
  assert(papers.every(p=>p.disabled));
  assert.equal(node('#game-title').textContent,'');
  assert.equal(node('#open-letter').hidden,true);
  node('#open-letter').click();assert.equal(node('#age-quiz').hidden,true);
  assert.equal(timers.at(-1).ms,1750);timers.at(-1).fn();
  assert.equal(node('#open-letter').hidden,false);
  assert.equal(node('#game-title').textContent,'');
  node('#open-letter').click();assert.equal(node('#age-quiz').hidden,false);
  assert.equal(node('#penguin-scene').hidden,true);
 }
});
test('27 answer combinations allow changing answers and reach the grading scene',async()=>{
 for(let path=0;path<27;path++){
  const {node,papers,document,context,timers}=setup();vm.runInContext('ticketsReady = true',context);papers[0].click();timers.at(-1).fn();node('#open-letter').click();
  for(let q=0;q<3;q++){
   node('#quiz-next').click();assert.equal(node('#quiz-progress').textContent,`Câu ${q+1} / 3`);
   const choices=node('#quiz-answers').children;assert.equal(choices.length,3);
   const selectedIndex = Math.floor(path/3**q)%3;
   choices[selectedIndex].click();
   assert(choices.every(p=>!p.disabled));
   const changedIndex = (selectedIndex + 1) % 3;
   choices[changedIndex].click();
   assert.equal(choices[selectedIndex].attributes['aria-pressed'],'false');
   assert.equal(choices[changedIndex].attributes['aria-pressed'],'true');
   if (q === 2) assert.equal(node('#quiz-next').textContent,'Nộp bài');
   assert.equal(node('#quiz-next').hidden,false);
   node('#quiz-next').click();
  }
  assert.equal(node('#quiz-result').hidden,false);
  assert.equal(node('#grading-dialogue').textContent,'Gòi đợi xíu em chấm bài he !! 🧐');
  assert.equal(node('#birthday-party').hidden,true);
 }
});

test('finale walks only while the hand is held, then counts down and reveals the letter and heart', async () => {
 const {node,timers,context,clock}=setup();
 timers.length=0;
 const advance=async(ms)=>{
  const timer=timers.shift();
  assert.equal(timer.ms,ms);
  timer.fn();
  await new Promise(setImmediate);
 };
 const grading=vm.runInContext('startBirthdayFinale()',context);
 for (const text of [
  'Gòi đợi xíu em chấm bài he !! 🧐', 'Hmm.... 🤨',
  'S--sao mà.... 🫥', 'Hmm.... 🤔',
  'Chị Nhi nghĩ mình sẽ được nhiu điểm zị ?? 😟', 'Haizz... 😥',
  'Được rồi em bảo nè....😟', 'ĐÙA Á CHỨ ĐIỂM CHÁC GÌ GIỜ NÀYYYY 🤣🤣🤣'
 ]) {
  if (text.startsWith('ĐÙA Á')) {
   assert.equal(node('#grading-dialogue').textContent,'');
   await advance(300);
  }
  assert.equal(node('#grading-dialogue').textContent,text);
  await advance(text.startsWith('Ghé sát') ? 5000 : 3000);
 }
 await grading;
 assert.equal(node('#birthday-guide').hidden,false);
 node('#birthday-guide').dataset.phase='ready';
 const hand = node('#take-hand');
 hand.setPointerCapture = () => {};
 hand.pointerdown({button: 0, pointerId: 1});
 hand.pointerdown({button: 0, pointerId: 2});
 assert.equal(node('#birthday-guide').dataset.phase,'walking');
 assert.equal(node('#birthday-party').hidden,true);
 assert.equal(timers.length,1);
 clock.now = 1400;
 hand.pointerup({pointerId: 1});
 assert.equal(node('#birthday-guide').dataset.phase,'paused');
 assert.equal(timers.length,0);
 clock.now = 10000;
 assert.equal(node('#birthday-party').hidden,true);
 hand.keydown({key: ' ', preventDefault() {}});
 assert.equal(node('#birthday-guide').dataset.phase,'walking');
 await advance(3200);
 assert.equal(node('#birthday-guide').dataset.phase,'release');
 assert.equal(node('#guide-line').textContent,'Gòi gòi, giờ buông tay ra nhe');
 assert.equal(node('#birthday-party').hidden,true);
 assert.equal(timers.length,0);
 hand.keyup({key: ' ', preventDefault() {}});
 assert.equal(node('#birthday-guide').dataset.phase,'blackout');
 await advance(1250);
 assert.notEqual(node('#cake').dataset.phase,'lit');
 assert.equal(node('#party-title').textContent,vm.runInContext('birthdayMessages[0]',context));
 assert.equal(node('#birthday-party').hidden,false);
 assert.equal(node('#birthday-guide').hidden,false);
 assert.equal(node('#birthday-guide').dataset.phase,'arrived');
 assert.equal(node('#wish-done').hidden,true);
 await advance(1600);
 assert.equal(node('#birthday-continue').hidden,false);
 assert.equal(timers.length,0);
 for (const message of vm.runInContext('birthdayMessages.slice(1)', context)) {
  node('#birthday-continue').click();
  await advance(650);
  assert.equal(node('#party-title').textContent,message);
  assert.equal(node('#cake').dataset.phase,'lit');
  assert.equal(node('#birthday-continue').hidden,false);
  assert.equal(node('#wish-done').hidden,true);
 }
 node('#birthday-continue').click();
 node('#birthday-continue').click();
 await advance(1100);
 await advance(350);
 assert.equal(node('#party-title').textContent,'Giờ mình nhắm mắt lại và ước nhá 😌');
 assert.equal(node('#wish-done').hidden,true);
 await advance(8000);
 assert.equal(node('#wish-done').hidden,false);
 node('#wish-done').click();node('#wish-done').click();
 await advance(1800);
 for(let count=1;count<=3;count++){
  assert.equal(node('#party-title').textContent,String(count));
  assert.equal(node('#cake').dataset.phase,'lit');
  await advance(1000);
 }
 assert.equal(node('#cake').dataset.phase,'out');
 assert.equal(node('#birthday-guide').hidden,true);
 assert.equal(node('#birthday-farewell').hidden,true);
 assert.equal(context.document.body.dataset.stage,'blackout');
 assert.equal(node('#bedtime').hidden,true);
 await advance(5000);
 assert.equal(node('#bedtime').hidden,false);
 assert.equal(timers.length,0);
 node('#bedtime-continue').click();
 assert.equal(node('#bedtime').hidden,true);
 assert.equal(node('#birthday-farewell').hidden,true);
 await advance(2000);
 assert.equal(node('#birthday-farewell').hidden,false);
 assert.equal(node('#birthday-farewell').dataset.phase,'wait');
 assert.equal(node('#farewell-line').textContent,'Từ từ từ từ đã');
 await advance(2200);assert.equal(node('#birthday-farewell').dataset.phase,'speak');
 assert.equal(node('#farewell-line').textContent,'trước khi chị đi em có cái này....');
 await advance(1900);assert.equal(node('#birthday-farewell').dataset.phase,'reach');
 await advance(180);assert.equal(node('#birthday-farewell').dataset.phase,'place');
 assert.equal(node('#farewell-line').textContent,'trước khi chị đi em có cái này....');
 await advance(800);assert.equal(node('#birthday-farewell').dataset.phase,'release');
 await advance(700);assert.equal(node('#birthday-farewell').dataset.phase,'done');
 assert.equal(node('#farewell-line').textContent,'trước khi chị đi em có cái này....');
 await advance(160);assert.equal(node('#birthday-farewell').dataset.phase,'done');
 assert.equal(node('#farewell-line').textContent,'ta daaaa');
 await advance(1050);assert.equal(node('#birthday-farewell').dataset.phase,'goodbye');
 await advance(640);assert.equal(node('#birthday-farewell').dataset.phase,'duck');
 await advance(520);assert.equal(node('#birthday-farewell').dataset.phase,'last-peek');
 await advance(300);assert.equal(node('#farewell-line').textContent,'Ngủ thiệt nha.');
 await advance(1250);assert.equal(node('#birthday-farewell').dataset.phase,'last-hide');
 await advance(440);assert.equal(node('#farewell-line').textContent,'');
 assert.equal(timers.length,0);
});
