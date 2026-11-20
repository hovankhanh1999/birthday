const test=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs'),path=require('node:path');
test('climb preview greets, crosses wall, waves, then allows replay without overlap',async()=>{
 const nodes={},timers=[];
 const node=id=>nodes[id]??={dataset:{},hidden:false,disabled:false,classList:{add(){},remove(){}},addEventListener(t,fn){this[t]=fn}};
 const c=vm.createContext({document:{querySelector:node,querySelectorAll(){return []}},setTimeout(fn,ms){timers.push({fn,ms})}});
 vm.runInContext(fs.readFileSync(path.join(__dirname,'../climb-preview.js'),'utf8'),c);
 await new Promise(setImmediate);
 assert.equal(node('.climb-stage').dataset.phase,'peek');assert.equal(node('#replay-climb').disabled,true);
 node('#replay-climb').click();assert.equal(timers.length,1);
 const advance=async()=>{timers.shift().fn();await new Promise(setImmediate);};
 await advance();assert.equal(node('.climb-bubble').textContent,'Hellooo');
 await advance();assert.equal(node('.climb-stage').dataset.phase,'climb');assert.equal(node('.climb-bubble').hidden,true);
 await advance();assert.equal(node('.climb-stage').dataset.phase,'climb');
 await advance();assert.equal(node('.climb-stage').dataset.phase,'landed');assert.equal(node('.climb-bubble').textContent,'Có cái này cho chị nèeee');
 await advance();assert.equal(node('#replay-climb').disabled,false);
 node('#replay-climb').click();assert.equal(node('.climb-stage').dataset.phase,'peek');
});
