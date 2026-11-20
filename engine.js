// Stable keys let a learner resume an exercise after an update.
const displayTopics = {
  statements:{group:'Accounting', icon:'bank', color:'blue', short:'Statements', summary:'Financial statements, period-end adjustments and group consolidation.'},
  analysis:{group:'Accounting', icon:'chart', color:'mint', short:'Analysis', summary:'Reclassifications, cash flows and ratios to compare companies.'},
  dcf:{group:'Finance', icon:'coins', color:'violet', short:'DCF', summary:'Forecast cash flows, cost of capital and enterprise value.'},
  multiples:{group:'Finance', icon:'scales', color:'amber', short:'Multiples', summary:'Market multiples, choice of comparables and equity value estimates.'},
  budget:{group:'Control', icon:'budget', color:'rose', short:'Budget', summary:'Operating and financial budgets, costs and planning decisions.'},
  ai:{group:'Tools', icon:'ai', color:'aqua', short:'AI for AFC', summary:'Prompts, source checks and verification of results in business analysis.'}
};
const types = {choice:'Single choice',multi:'Multi-select',number:'Calculation',order:'Ordering'};
const typeIcons = {choice:'list',multi:'checkList',number:'calc',order:'steps'};
const levels = {1:'Basic',2:'Intermediate',3:'Advanced'};
const topics = Object.keys(displayTopics).map(id=>window.AFC_TOPICS.find(t=>t.id===id)).filter(Boolean);
const topicById = new Map(topics.map(t=>[t.id,t]));
const bank = new Map();
for(const t of topics) for(const q of t.questions) {
  const key=t.id+'/'+q.id;
  bank.set(key,{...q,key,topic:t.id});
}
const allQuestions=[...bank.values()];
const storageKey='afc-studio-en-v1';
function freshState(){return {stats:{},saved:[],history:[],session:null};}
function readState(){
  try {
    const value=JSON.parse(localStorage.getItem(storageKey))||{};
    const state={...freshState(),...value};
    state.saved=(Array.isArray(state.saved)?state.saved:[]).filter(k=>bank.has(k));
    if(!state.stats||typeof state.stats!=='object')state.stats={};
    if(!Array.isArray(state.history))state.history=[];
    if(state.session&&!state.session.keys?.every(k=>bank.has(k)))state.session=null;
    return state;
  } catch{return freshState();}
}
let state=readState();
let storageOK=true;
function save(){try{localStorage.setItem(storageKey,JSON.stringify(state));}catch{storageOK=false;}}
function shuffle(items){
  const result=[...items];
  for(let i=result.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[result[i],result[j]]=[result[j],result[i]];}
  return result;
}
function freshFirst(list){
  return shuffle(list).sort((a,b)=>{
    const priority=q=>{const s=state.stats[q.key];return !s?1:s.latest?2:0;};
    return priority(a)-priority(b);
  });
}
function buildPool(list,count){
  const groups=shuffle(topics).map(t=>freshFirst(list.filter(q=>q.topic===t.id))).filter(g=>g.length);
  const result=[];
  while(result.length<Math.min(count,list.length)){
    for(const group of groups) if(group.length&&result.length<count)result.push(group.shift().key);
  }
  return result;
}
// Accepts 11200, 11,200, 11 200, 11.2 and 11,2; ambiguous single groups are resolved in isCorrect.
function parseNumber(input){
  let s=String(input??'').trim().replace(/−/g,'-');
  if(s.endsWith('%'))s=s.slice(0,-1).trim();
  if(/\s/.test(s)){
    if(!/^[+-]?\d{1,3}(?:[   ]\d{3})+(?:[.,]\d+)?$/.test(s))return NaN;
    s=s.replace(/\s/g,'');
  }
  if(s.includes(',')&&s.includes('.')){
    if(/^[+-]?\d{1,3}(?:\.\d{3})+,\d+$/.test(s))s=s.replace(/\./g,'').replace(',','.');
    else if(/^[+-]?\d{1,3}(?:,\d{3})+\.\d+$/.test(s))s=s.replace(/,/g,'');
    else return NaN;
  }else if(/^[+-]?\d{1,3}(?:\.\d{3}){2,}$/.test(s))s=s.replace(/\./g,'');
  else if(/^[+-]?\d{1,3}(?:,\d{3}){2,}$/.test(s))s=s.replace(/,/g,'');
  else s=s.replace(',','.');
  return /^[+-]?(?:\d+(?:\.\d+)?|\.\d+)$/.test(s)?Number(s):NaN;
}
function validDraft(q,v){
  if(q.type==='choice')return Number.isInteger(v)&&v>=0&&v<q.options.length;
  if(q.type==='number')return Number.isFinite(parseNumber(v));
  return Array.isArray(v)&&(q.type==='order'?v.length===q.options.length:v.length>0);
}
function isCorrect(q,v){
  if(!validDraft(q,v))return false;
  if(q.type==='number'){
    const withinTolerance=n=>Math.abs(n-q.answer)<=(q.tolerance??0.001)+1e-9;
    if(withinTolerance(parseNumber(v)))return true;
    const raw=String(v).trim().replace(/−/g,'-').replace(/%$/,'').trim();
    if(/^[+-]?\d{1,3}(?:,\d{3})+$/.test(raw)&&withinTolerance(Number(raw.replace(/,/g,''))))return true;
    return /^[+-]?\d{1,3}(?:\.\d{3})+$/.test(raw)&&withinTolerance(Number(raw.replace(/\./g,'')));
  }
  if(q.type==='choice')return v===q.answer;
  if(q.type==='order')return v.every((option,i)=>option===q.answer[i]);
  return v.length===q.answer.length&&q.answer.every(n=>v.includes(n));
}
function record(key,ok){
  const s=state.stats[key]||{attempts:0,hits:0};
  state.stats[key]={attempts:s.attempts+1,hits:s.hits+Number(ok),latest:ok};
}
function metrics(list=allQuestions){
  const tried=list.map(q=>state.stats[q.key]).filter(Boolean);
  const attempts=tried.reduce((n,s)=>n+s.attempts,0);
  const hits=tried.reduce((n,s)=>n+s.hits,0);
  return {done:tried.length,total:list.length,attempts,hits,percent:list.length?Math.round(100*tried.length/list.length):0,accuracy:attempts?Math.round(100*hits/attempts):null};
}
function makeSession(keys,mode,title){
  const orders={}; for(const k of keys){const q=bank.get(k);if(q.options)orders[k]=shuffle(q.options.map((_,i)=>i));}
  return {keys,mode,title,index:0,orders,answers:{},drafts:{},start:Date.now(),deadline:mode==='exam'?Date.now()+keys.length*120000:null};
}
function commitAnswer(session,key){
  if(Object.hasOwn(session.answers,key))return;
  const q=bank.get(key),draft=session.drafts[key];
  if(!validDraft(q,draft))return;
  const correct=isCorrect(q,draft);
  session.answers[key]={value:Array.isArray(draft)?[...draft]:draft,correct};
  if(session.mode!=='exam')record(key,correct);
}
function finishSession(timedOut=false){
  const s=state.session;if(!s)return;
  if(s.mode==='exam'){
    for(const k of s.keys){
      commitAnswer(s,k);
      if(s.answers[k])record(k,s.answers[k].correct);
    }
  }
  state.history.unshift({id:String(s.start),title:s.title,keys:s.keys,mode:s.mode,answers:s.answers,date:Date.now(),timedOut});
  state.session=null;save();
}
