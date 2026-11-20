const test=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs'),path=require('node:path');
test('pocket sample stays happy and silent for 4.2s, then huh/look/SOS, and replays safely',async()=>{
 const nodes={},timers=[];
 const node=id=>nodes[id]??={dataset:{},hidden:false,disabled:false,classList:{add(){},remove(){}},setAttribute(){},addEventListener(t,fn){this[t]=fn}};
 const c=vm.createContext({document:{querySelector:node,querySelectorAll(){return []}},setTimeout(fn,ms){timers.push({fn,ms})}});
 vm.runInContext(fs.readFileSync(path.join(__dirname,'../pocket-preview.js'),'utf8'),c);await new Promise(setImmediate);
 assert.equal(node('.pocket-bubble').textContent,'Có cái này cho chị nèeee');
 const advance=async()=>{timers.shift().fn();await new Promise(setImmediate);};
 node('#replay-pocket').click();assert.equal(timers.length,1);
 await advance();assert.equal(node('.pocket-stage').dataset.phase,'rummaging');assert.equal(node('.pocket-bubble').hidden,true);assert.equal(timers[0].ms,4200);
 await advance();assert.equal(node('.pocket-stage').dataset.phase,'huh');assert.equal(node('.pocket-bubble').textContent,'Ủa..');assert.equal(node('#preview-sos').hidden,true);
 await advance();assert.equal(node('.pocket-stage').dataset.phase,'looking');assert.equal(node('.pocket-bubble').textContent,'ủa đâu rồi....');
 await advance();assert.equal(node('#preview-sos').hidden,false);assert.equal(node('#replay-pocket').disabled,false);
 node('#replay-pocket').click();assert.equal(node('#preview-sos').hidden,true);assert.equal(node('.pocket-stage').dataset.phase,'ready');
});
