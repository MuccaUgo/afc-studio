'use strict';
const main=document.querySelector('main'), modal=document.getElementById('modal');
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const number=n=>Number(n).toLocaleString('en-GB',{maximumFractionDigits:8});
const percent=n=>n===null?'—':n+'%';
const plural=(n,singular,pluralForm)=>n+' '+(n===1?singular:pluralForm);
const entered=s=>plural(s.keys.filter(k=>validDraft(bank.get(k),s.drafts[k])).length,'answer entered','answers entered');
const href=path=>'#'+path;
const ti=id=>displayTopics[id];
const metaIcon=(name,text)=>'<span class="meta-item">'+icon(name,15)+esc(text)+'</span>';
const symbol=(id,large=false)=>'<span class="subject-icon '+ti(id).color+(large?' large':'')+'">'+icon(ti(id).icon,large?31:24)+'</span>';
const pageTitle=(kicker,title,desc)=>'<header class="page-heading"><div class="eyebrow">'+esc(kicker)+'</div><h1>'+esc(title)+'</h1><p>'+esc(desc)+'</p></header>';
const linkBtn=(route,label,ic,style='primary')=>'<a class="btn '+style+'" href="'+href(route)+'">'+icon(ic,17)+esc(label)+'</a>';
const button=(action,label,ic,style='primary',data='')=>'<button type="button" class="btn '+style+'" data-action="'+action+'" '+data+'>'+icon(ic,17)+esc(label)+'</button>';
const blank=(ic,title,desc)=>'<div class="empty"><span>'+icon(ic,27)+'</span><h3>'+esc(title)+'</h3><p>'+esc(desc)+'</p></div>';
const errorKeys=()=>allQuestions.filter(q=>state.stats[q.key]?.latest===false).map(q=>q.key);
const route=()=>{try{return decodeURIComponent(location.hash.slice(1))||'dashboard';}catch{return 'dashboard';}};
const go=to=>{if(route()===to)render();else location.hash=to;};
let homeFilter='All areas',exerciseFilters={topic:'all',type:'all',level:'all',count:'10'},formulaFilters={topic:'all',text:''};
let pendingStart=null,toastTimer;
function notify(message){
  const el=document.getElementById('toast');el.textContent=message;el.classList.add('visible');
  clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('visible'),2200);
}
function nav(page){
  let active=page==='module'?'dashboard':page==='session'?'exercises':page==='result'?'progress':page;
  document.getElementById('nav').innerHTML=[['dashboard','grid','Dashboard'],['exercises','practice','Exercises'],['formulas','book','Formulas'],['progress','activity','Progress']].map(([id,ic,label])=>'<a href="#'+id+'" '+(id===active?'class="active" aria-current="page"':'')+'>'+icon(ic,17)+'<span>'+label+'</span></a>').join('');
  const saved=document.querySelector('.saved-nav');saved.classList.toggle('active',page==='saved');if(page==='saved')saved.setAttribute('aria-current','page');else saved.removeAttribute('aria-current');
  document.getElementById('saved-count').textContent=state.saved.length;
}
function selectOptions(items,chosen){return items.map(([value,label])=>'<option value="'+esc(value)+'" '+(value===chosen?'selected':'')+'>'+esc(label)+'</option>').join('');}
function topicOptions(){return [['all','All topics'],...topics.map(t=>[t.id,t.title])];}
function card(t){
  const m=metrics(allQuestions.filter(q=>q.topic===t.id));
  return '<a class="topic-card '+ti(t.id).color+'" href="#module/'+t.id+'"><div class="card-heading">'+symbol(t.id)+'<span class="area">'+esc(ti(t.id).group)+'</span></div><h3>'+esc(t.title)+'</h3><p>'+esc(ti(t.id).summary)+'</p><div class="card-meta">'+metaIcon('list',plural(t.questions.length,'exercise','exercises'))+metaIcon('book',plural(t.notes.length,'note','notes'))+(m.done?'<span class="card-count">'+m.done+'/'+m.total+'</span>':'')+'</div></a>';
}
function ring(m){
  return '<div class="ring" style="--degree:'+m.percent+'%"><div><b>'+m.percent+'<small>%</small></b></div></div>';
}
function home(){
  const m=metrics();
  const hero='<section class="hero"><div class="hero-lines"></div><canvas id="cover-art" aria-hidden="true"></canvas><div class="hero-content"><div class="course-tag"><span class="course-rule"></span> POLIMI <i></i> COURSE REVIEW</div><h1>Accounting, Finance <br>and Control<span>.</span></h1><p>Quizzes, calculations and practical cases to get you ready for the exam.</p><div class="button-row">'+(state.session?linkBtn('session','Resume session','play','lime'):button('mixed','Mixed review','play','lime'))+button('exam-info','Mock exam','timer','on-dark')+'</div></div></section>';
  const overview='<aside class="overview panel"><div class="section-kicker"><span class="small-icon">'+icon('activity',17)+'</span> COURSE COVERAGE</div><h2>Your progress</h2><div class="ring-row">'+ring(m)+'<div><b>'+m.done+' <em>/ '+m.total+'</em></b><span>Exercises done</span></div></div><div class="overview-bottom"><span>Accuracy <strong>'+percent(m.accuracy)+'</strong></span><a href="#progress">Details</a></div></aside>';
  return '<div class="home"><div class="hero-grid">'+hero+overview+'</div><section class="catalog"><div class="section-head"><div><div class="eyebrow"><span class="kicker-dash"></span> '+topics.length+' MODULES · '+allQuestions.length+' EXERCISES</div><h2>Topics</h2><p>Pick a module to review the theory and practise.</p></div><label class="select-wrap compact"><span class="sr-only">Filter topics by area</span><select id="home-filter">'+selectOptions(['All areas',...new Set(topics.map(t=>ti(t.id).group))].map(x=>[x,x]),homeFilter)+'</select>'+icon('down',15)+'</label></div><div class="card-grid" id="topic-cards">'+topics.filter(t=>homeFilter==='All areas'||ti(t.id).group===homeFilter).map(card).join('')+'</div></section></div>';
}
function accordionNote(note){return '<details class="note"><summary>'+esc(note.title)+icon('down',18)+'</summary><p>'+esc(note.body)+'</p></details>';}
function formulaCard(f,t){return '<article class="formula-card '+ti(t.id).color+'"><div class="chip plain">'+icon(ti(t.id).icon,14)+esc(t.title)+'</div><h3>'+esc(f.name)+'</h3><div class="expression">'+esc(f.expression)+'</div><p>'+esc(f.detail)+'</p></article>';}
function modulePage(t){
  const qs=allQuestions.filter(q=>q.topic===t.id),m=metrics(qs);
  return '<a class="back" href="#dashboard">'+icon('back',16)+'Dashboard</a><div class="module-banner '+ti(t.id).color+'"><div>'+symbol(t.id,true)+'<div class="eyebrow">'+esc(ti(t.id).group)+'</div><h1>'+esc(t.title)+'</h1><p>'+esc(t.description)+'</p><div class="module-meta">'+metaIcon('list',plural(qs.length,'exercise','exercises'))+metaIcon('book',plural(t.notes.length,'note','notes'))+metaIcon('activity',m.done+' done')+'</div></div><div class="module-actions">'+button('topic-practice','Practise this module','play','primary','data-topic="'+t.id+'"')+button('custom-topic','Customise exercises','list','secondary','data-topic="'+t.id+'"')+'</div></div><div class="study-layout"><section class="panel notes"><h2>Theory notes</h2>'+t.notes.map(accordionNote).join('')+'</section><aside class="panel source"><div class="section-kicker">'+icon('book',18)+' COURSE MATERIALS</div><p>'+esc(t.source)+'</p><h3>Exercise types</h3><div class="tags">'+[...new Set(qs.map(q=>q.type))].map(f=>'<span class="tag">'+esc(types[f])+'</span>').join('')+'</div></aside></div>'+(t.formulas.length?'<section class="below"><h2>Formulas and references</h2><div class="form-grid">'+t.formulas.map(f=>formulaCard(f,t)).join('')+'</div></section>':'');
}
function selectField(id,label,items,value){return '<label class="field"><span>'+esc(label)+'</span><span class="select-wrap"><select id="'+id+'">'+selectOptions(items,value)+'</select>'+icon('down',16)+'</span></label>';}
function filteredExercises(){
  return allQuestions.filter(q=>(exerciseFilters.topic==='all'||q.topic===exerciseFilters.topic)&&(exerciseFilters.type==='all'||q.type===exerciseFilters.type)&&(exerciseFilters.level==='all'||q.level===Number(exerciseFilters.level)));
}
function configure(){
  const f=exerciseFilters, pool=filteredExercises();
  const b=(k)=>'<button class="btn primary" type="button" data-action="filtered" '+(!k?'disabled':'')+'>'+icon('play',17)+'Start practice</button>';
  return pageTitle('PRACTICE','Exercises','Build a session by choosing topic, format and difficulty.')+'<div class="builder-layout"><section class="panel builder"><div class="panel-heading"><span class="small-icon">'+icon('list')+'</span><h2>Custom session</h2></div><div class="fields">'+selectField('ex-topic','Topic',topicOptions(),f.topic)+selectField('ex-type','Exercise type',[['all','All types'],...Object.entries(types)],f.type)+selectField('ex-level','Difficulty',[['all','All levels'],...Object.entries(levels)],f.level)+selectField('ex-count','Number of exercises',[['5','5 exercises'],['10','10 exercises'],['15','15 exercises'],['all','All available']],f.count)+'</div><div class="builder-bottom"><div><strong>'+plural(pool.length,'exercise','exercises')+' available</strong><p>'+(pool.length?'The session includes '+plural(Math.min(pool.length,f.count==='all'?pool.length:Number(f.count)),'question','questions')+'.':'Try a different combination of filters.')+'</p></div>'+b(pool.length)+'</div></section><aside class="side-stack"><div class="panel side-action"><span class="small-icon mint">'+icon('timer')+'</span><h3>Timed mock exam</h3><p>12 questions spread across the six modules. Full corrections when you submit.</p>'+button('exam-info','Set up the exam','timer','secondary')+'</div></aside></div>'+targeted();
}
function targeted(){
  const errors=errorKeys();
  return '<section class="below"><h2>Targeted review</h2><div class="target-grid">'+[['saved','bookmark','Saved exercises',state.saved.length+' in your list'],['mistakes','rotate','Review mistakes',errors.length+' to retry']].map(([page,ic,title,meta])=>'<a class="panel target-row" href="#'+page+'"><span class="small-icon">'+icon(ic)+'</span><span><strong>'+title+'</strong><small>'+meta+'</small></span>'+icon('chev',16)+'</a>').join('')+'</div></section>';
}
function referenceResults(){
  const terms=formulaFilters.text.trim().toLocaleLowerCase('en');
  let cards=[];
  for(const t of topics){
    if(formulaFilters.topic!=='all'&&formulaFilters.topic!==t.id)continue;
    for(const f of t.formulas)if([t.title,f.name,f.expression,f.detail].join(' ').toLocaleLowerCase('en').includes(terms))cards.push(formulaCard(f,t));
  }
  return cards.length?'<div class="result-count">'+plural(cards.length,'reference','references')+'</div><div class="form-grid">'+cards.join('')+'</div>':blank('search','No matches','Try another term or pick another topic.');
}
function reference(){
  return pageTitle('REFERENCE','Formula sheet','Find a formula, its variables and the conditions for applying it.')+'<div class="filter-line"><label class="search">'+icon('search',19)+'<input id="formula-search" type="search" aria-label="Search the formula sheet" placeholder="Search for a formula or a ratio…" value="'+esc(formulaFilters.text)+'"></label>'+selectField('formula-topic','Topic',topicOptions(),formulaFilters.topic)+'</div><div id="formula-results">'+referenceResults()+'</div>';
}
function progress(){
  const m=metrics();
  const stats=[['list','Exercises done',m.done+' / '+m.total],['target','Accuracy',percent(m.accuracy)],['checkList','Correct answers',m.hits+' / '+m.attempts],['timer','Sessions completed',state.history.length]];
  return pageTitle('YOUR STUDY','Progress','Track how much of the syllabus you have covered and how accurate your answers are over time.')+'<div class="stats-grid">'+stats.map(([ic,title,value])=>'<div class="panel metric"><span>'+icon(ic,18)+title+'</span><strong>'+value+'</strong></div>').join('')+'</div><div class="study-layout"><section class="panel progress-list"><h2>Coverage by module</h2>'+topics.map(t=>{const s=metrics(allQuestions.filter(q=>q.topic===t.id));return '<a class="progress-entry" href="#module/'+t.id+'">'+symbol(t.id)+'<div><div><strong>'+esc(t.title)+'</strong><small>'+s.done+' / '+s.total+'</small></div><div class="bar"><i style="width:'+s.percent+'%"></i></div></div></a>';}).join('')+'</section><aside class="panel progress-side"><span class="small-icon">'+icon('rotate')+'</span><h2>Review mistakes</h2><p>'+plural(errorKeys().length,'exercise','exercises')+' with a wrong latest answer. A correct answer removes an exercise from this list.</p>'+linkBtn('mistakes','Open the review','rotate','secondary')+'</aside></div><section class="below"><h2>Recent sessions</h2>'+(state.history.length?'<div class="panel history">'+state.history.map(s=>'<a href="#result/'+s.id+'"><span class="small-icon">'+icon(s.mode==='exam'?'timer':'practice')+'</span><div><strong>'+esc(s.title)+'</strong><small>'+esc(new Date(s.date).toLocaleString('en-GB',{dateStyle:'medium',timeStyle:'short'}))+'</small></div><b>'+Object.values(s.answers).filter(a=>a.correct).length+' / '+s.keys.length+'</b>'+icon('chev',15)+'</a>').join('')+'</div>':blank('clock','Your sessions will appear here','Finish a practice session or a mock exam to see your score and review the solutions.'))+'</section>';
}
function collection(kind){
  const saved=kind==='saved',keys=saved?state.saved:errorKeys();
  return pageTitle('TARGETED REVIEW',saved?'Saved exercises':'Review mistakes',saved?'Find the questions you bookmarked.':'Retry the exercises where your latest answer was wrong.')+(keys.length?'<section class="panel collection"><div class="collection-head"><strong>'+plural(keys.length,'exercise','exercises')+'</strong>'+button('collection','Practise these exercises','play','primary','data-kind="'+kind+'"')+'</div>'+keys.map(k=>{const q=bank.get(k);return '<div class="collection-row">'+symbol(q.topic)+'<div><small>'+esc(topicById.get(q.topic).title)+' · '+types[q.type]+'</small><strong>'+esc(q.prompt)+'</strong></div>'+button('single','Open','pen','text-btn','data-key="'+esc(k)+'"')+(saved?'<button class="icon-button is-saved" data-action="save" data-key="'+esc(k)+'" aria-label="Remove from saved">'+icon('bookmark',18)+'</button>':'')+'</div>';}).join('')+'</section>':blank(saved?'bookmark':'check',saved?'Your list is empty':'No mistakes to retry',saved?'During an exercise, tap the bookmark to find it here later.':'Exercises to review will appear here after your first wrong answers.'))+linkBtn('exercises','Go to exercises','practice','secondary bottom-link');
}
function answerText(q,value){
  if(value==null)return 'No answer';
  if(q.type==='number')return (typeof value==='number'?number(value):String(value).replace(/%$/,'').trim())+(q.unit?' '+q.unit:'');
  if(q.type==='choice')return q.options[value]??'No answer';
  return value.map(i=>q.options[i]).join(q.type==='order'?' → ':' · ');
}
function questionHeader(q){
  return '<div class="question-meta"><span class="chip '+ti(q.topic).color+'">'+icon(ti(q.topic).icon,14)+esc(topicById.get(q.topic).title)+'</span><span>'+icon(typeIcons[q.type],15)+types[q.type]+'</span><span>'+icon('activity',15)+levels[q.level]+'</span></div>';
}
function bookmarkButton(key){
  const marked=state.saved.includes(key);
  return '<button class="icon-button '+(marked?'is-saved':'')+'" data-action="save" data-key="'+esc(key)+'" aria-pressed="'+marked+'" title="'+(marked?'Remove from saved':'Save exercise')+'" aria-label="'+(marked?'Remove from saved':'Save exercise')+'">'+icon('bookmark',20)+'</button>';
}
function feedback(q,answer){
  return '<div class="feedback '+(answer.correct?'success':'mistake')+'" role="status"><div class="feedback-title">'+icon(answer.correct?'check':'info',20)+'<strong>'+(answer.correct?'Correct':'Not quite')+'</strong></div>'+(!answer.correct?'<p><b>Solution</b> · '+esc(answerText(q,q.answer))+'</p>':'')+'<p>'+esc(q.explanation)+'</p></div>';
}
function answersHTML(q,s,locked){
  const draft=s.drafts[q.key],order=s.orders[q.key]||[];
  if(q.type==='number'){
    const tol=q.tolerance?'Tolerance ±'+number(q.tolerance)+(q.unit?' '+esc(q.unit):'')+'.':'Enter the exact value.';
    return '<label class="field numeric"><span>Your answer</span><span class="number-wrap"><input type="text" id="numeric-answer" inputmode="decimal" autocomplete="off" placeholder="Enter a number" value="'+esc(draft??'')+'" '+(locked?'readonly':'')+'>'+esc(q.unit)+'</span></label><p class="hint">Type thousands without separators, e.g. 11200. Use a point for decimals, e.g. 11.2. '+tol+'</p>';
  }
  if(q.type==='order'){
    const chosen=Array.isArray(draft)?draft:[];
    const row=(i,index,isChosen)=>'<button data-action="order-option" data-option="'+i+'" class="option order-option" '+(locked?'disabled':'')+'><span class="option-marker">'+(isChosen?index+1:'+')+'</span><span>'+esc(q.options[i])+'</span>'+(isChosen&&!locked?icon('x',14):'')+'</button>';
    return '<p class="answer-instruction">Select the steps in order. Tap a chosen step to remove it.</p><div class="order-wrap"><div><div class="field-label">Your sequence</div><div class="answers ordered">'+(chosen.length?chosen.map((i,n)=>row(i,n,true)).join(''):'<div class="empty-slot">Choose the first step.</div>')+'</div></div>'+(!locked?'<div><div class="field-label">Available steps</div><div class="answers">'+order.filter(i=>!chosen.includes(i)).map((i,n)=>row(i,n,false)).join('')+'</div></div>':'')+'</div>';
  }
  const multi=q.type==='multi',selected=multi?(draft||[]):[draft];
  return '<p class="answer-instruction">'+(multi?'Select all correct answers.':'Select one answer.')+'</p><div class="answers" role="group" aria-label="Answer options">'+order.map((i,n)=>{
    const on=selected.includes(i);
    const right=locked&&(multi?q.answer.includes(i):q.answer===i);
    return '<button type="button" class="option '+(on?'selected ':'')+(right?'right':locked&&on?'wrong':'')+'" data-action="option" data-option="'+i+'" aria-pressed="'+on+'" '+(locked?'disabled':'')+'><span class="option-marker '+(multi?'square':'')+'">'+(right?icon('check',14):locked&&on?icon('x',14):multi?(on?icon('check',14):''):String.fromCharCode(65+n))+'</span><span>'+esc(q.options[i])+'</span></button>';
  }).join('')+'</div>';
}
function sessionPage(){
  const s=state.session;
  if(!s)return pageTitle('PRACTICE','No open session','Choose a practice session to get started.')+linkBtn('exercises','Choose exercises','practice');
  const q=bank.get(s.keys[s.index]),a=s.answers[q.key],exam=s.mode==='exam',locked=!exam&&!!a;
  const last=s.index===s.keys.length-1;
  const status=exam?'<span class="timer" id="timer"></span>':'<span class="chip neutral">'+icon('pen',14)+'Practice</span>';
  return '<div class="session-wrap"><a class="back" href="#dashboard">'+icon('back',16)+'Back to dashboard</a><div class="session-title"><h1>'+esc(s.title)+'</h1>'+status+'</div><div class="question-progress"><span>Question <strong>'+(s.index+1)+'</strong> of '+s.keys.length+'</span>'+(exam?'<span>'+entered(s)+'</span>':'')+'</div><div class="bar session-bar"><i style="width:'+((s.index+1)/s.keys.length*100)+'%"></i></div><article class="panel question"><div class="question-top">'+questionHeader(q)+bookmarkButton(q.key)+'</div>'+(q.context?'<div class="context"><div class="field-label">Case data</div>'+esc(q.context)+'</div>':'')+'<h2>'+esc(q.prompt)+'</h2>'+answersHTML(q,s,locked)+(locked?feedback(q,a):'')+'<div class="question-controls">'+(exam?'<button class="btn secondary" data-action="previous" '+(!s.index?'disabled':'')+'>'+icon('back',16)+'Previous</button><button class="btn primary" data-action="'+(last?'submit-exam':'next')+'">'+(last?'Review and submit':'Next')+'</button>':locked?'<button class="btn primary" data-action="next">'+(last?'See results':'Next question')+'</button>':'<button class="btn primary" data-action="check" '+(!validDraft(q,s.drafts[q.key])?'disabled':'')+'>'+icon('check',17)+'Check answer</button>')+'</div></article>'+(exam?'<div class="exam-map"><span>Go to question</span><div>'+s.keys.map((k,i)=>'<button data-action="jump" data-index="'+i+'" aria-label="Question '+(i+1)+(validDraft(bank.get(k),s.drafts[k])?', answered':'')+'" '+(i===s.index?'aria-current="step"':'')+' class="'+(i===s.index?'current ': '')+(validDraft(bank.get(k),s.drafts[k])?'answered':'')+'">'+(i+1)+'</button>').join('')+'</div></div>':'')+'</div>';
}
function resultPage(s){
  const total=s.keys.length,hits=Object.values(s.answers).filter(a=>a.correct).length;
  const unanswered=total-Object.keys(s.answers).length;
  return '<a class="back" href="#progress">'+icon('back',16)+'Progress</a><div class="result-hero"><div class="section-kicker">'+icon('checkList',17)+' SESSION COMPLETE</div><h1>'+esc(s.title)+'</h1><p>'+(s.timedOut?'Time is up. ':'')+plural(hits,'correct answer','correct answers')+' out of '+total+(unanswered?' · '+unanswered+' unanswered':'')+'</p><div class="button-row">'+linkBtn('exercises','New practice','practice','lime')+(hits<total?button('result-retry','Retry the questions to review','rotate','on-dark','data-id="'+esc(s.id)+'"'):'')+'</div></div><section class="below solutions"><h2>Session review</h2>'+s.keys.map((k,i)=>{const q=bank.get(k),a=s.answers[k];return '<details class="panel result-item"><summary><span class="result-mark '+(a?.correct?'correct':'incorrect')+'">'+icon(a?.correct?'check':a?'x':'clock',17)+'</span><span><small>QUESTION '+(i+1)+' · '+esc(topicById.get(q.topic).title)+'</small><strong>'+esc(q.prompt)+'</strong></span>'+icon('down',16)+'</summary><div class="result-detail">'+(q.context?'<p class="context">'+esc(q.context)+'</p>':'')+'<p><b>Your answer</b> · '+esc(answerText(q,a?.value))+'</p><p><b>Solution</b> · '+esc(answerText(q,q.answer))+'</p><p>'+esc(q.explanation)+'</p>'+bookmarkButton(q.key)+'</div></details>';}).join('')+'</section>';
}
function confirmDialog(title,body,controls,ic='info'){
  modal.innerHTML='<div class="dialog-top"><span class="small-icon">'+icon(ic)+'</span><button class="icon-button" data-action="close" aria-label="Close">'+icon('x',18)+'</button></div><h2>'+esc(title)+'</h2><p>'+esc(body)+'</p><div class="dialog-controls">'+controls+'</div>';
  if(!modal.open)modal.showModal();
}
function start(list,count,mode,title){
  if(!list.length)return;
  const keys=buildPool(list,count);
  const launch=()=>{state.session=makeSession(keys,mode,title);save();modal.close();window.scrollTo(0,0);go('session');};
  if(state.session){
    pendingStart=launch;
    confirmDialog('You have a session in progress','Starting a new session will close the open one. Answers you have already checked in practice stay in your progress.',button('resume','Resume session','play','secondary')+button('replace','Start the new session','practice'));
  }else launch();
}
function tick(){
  const s=state.session;if(!s?.deadline)return;
  const sec=Math.ceil((s.deadline-Date.now())/1000);
  if(sec<=0){
    const id=String(s.start);finishSession(true);modal.close();
    if(route()==='session')go('result/'+id);else{render();notify('Time is up. Your corrections are in Progress.');}
    return;
  }
  const timer=document.getElementById('timer');
  if(timer){timer.innerHTML=icon('timer',17)+Math.floor(sec/60)+':'+String(sec%60).padStart(2,'0');timer.classList.toggle('urgent',sec<=60);}
}
function render(){
  const [page,param]=route().split('/');nav(page);
  let content;
  switch(page){
    case 'exercises':content=configure();break;
    case 'progress':content=progress();break;
    case 'formulas':content=reference();break;
    case 'saved':case 'mistakes':content=collection(page);break;
    case 'module':content=topicById.has(param)?modulePage(topicById.get(param)):home();break;
    case 'session':content=sessionPage();break;
    case 'result':{const s=state.history.find(x=>x.id===param);content=s?resultPage(s):progress();break;}
    default:content=home();
  }
  main.innerHTML=content;
  document.title=(main.querySelector('h1')?.textContent||'Dashboard')+' · AFC Studio';
  drawCover();tick();
  if(!storageOK)document.querySelector('.foot-inner > span:last-child').textContent='Saving is not available in this browser';
}
function updateQuizView(selector){
  const y=window.scrollY;
  render();
  if(selector)main.querySelector(selector)?.focus({preventScroll:true});
  window.scrollTo(0,y);
}
function refreshBookmark(key){
  const on=state.saved.includes(key);
  state.saved=on?state.saved.filter(k=>k!==key):[...state.saved,key];save();
  if(route()==='saved')render();
  else{for(const el of document.querySelectorAll('[data-action="save"]'))if(el.dataset.key===key)el.outerHTML=bookmarkButton(key);document.getElementById('saved-count').textContent=state.saved.length;}
  notify(on?'Exercise removed from saved':'Exercise saved');
}
document.addEventListener('click',event=>{
  const el=event.target.closest('[data-action]');if(!el||el.disabled)return;
  if(state.session?.deadline && Date.now()>=state.session.deadline){tick();return;}
  const {action,topic,key,id,kind}=el.dataset;
  const s=state.session,q=s?bank.get(s.keys[s.index]):null;
  switch(action){
    case 'mixed':start(allQuestions,10,'practice','Mixed review');break;
    case 'exam-info':
      confirmDialog('Timed mock exam','12 exercises, two per topic, in 24 minutes. You can change your answers until you submit. When you submit or time runs out, you get your score and all the solutions.',button('close','Cancel','x','secondary')+button('start-exam','Start the mock exam','timer'),'timer');break;
    case 'start-exam':start(allQuestions,12,'exam','Timed mock exam');break;
    case 'close':modal.close();break;
    case 'resume':modal.close();go('session');break;
    case 'replace':if(pendingStart){const launch=pendingStart;pendingStart=null;launch();}break;
    case 'topic-practice':start(allQuestions.filter(q=>q.topic===topic),10,'practice',topicById.get(topic).title);break;
    case 'custom-topic':exerciseFilters={topic,type:'all',level:'all',count:'10'};go('exercises');break;
    case 'filtered':{const pool=filteredExercises();start(pool,exerciseFilters.count==='all'?pool.length:Number(exerciseFilters.count),'practice',exerciseFilters.topic==='all'?'Custom practice':topicById.get(exerciseFilters.topic).title);break;}
    case 'collection':{const keys=kind==='saved'?state.saved:errorKeys();start(keys.map(k=>bank.get(k)),keys.length,'practice',kind==='saved'?'Saved exercises':'Mistake review');break;}
    case 'single':start([bank.get(key)],1,'practice','Single exercise');break;
    case 'result-retry':{const old=state.history.find(h=>h.id===id);if(old){const repeat=old.keys.filter(k=>!old.answers[k]?.correct);start(repeat.map(k=>bank.get(k)),repeat.length,'practice','Targeted retry');}break;}
    case 'save':refreshBookmark(key);break;
    case 'option':case 'order-option':{
      if(!q||s.answers[q.key])break;
      const i=Number(el.dataset.option);
      if(q.type==='choice')s.drafts[q.key]=i;
      else {const selected=s.drafts[q.key]||[];s.drafts[q.key]=selected.includes(i)?selected.filter(n=>n!==i):[...selected,i];}
      save();updateQuizView('[data-option="'+i+'"]');break;
    }
    case 'check':
      if(!q||s.mode==='exam'||!validDraft(q,s.drafts[q.key]))break;
      commitAnswer(s,q.key);save();updateQuizView('[data-action="next"]');break;
    case 'next':
      if(!s||(!s.answers[q.key]&&s.mode!=='exam'))break;
      if(s.index<s.keys.length-1){s.index++;save();render();window.scrollTo(0,0);main.focus({preventScroll:true});}
      else if(s.mode!=='exam'){finishSession();go('result/'+s.start);}break;
    case 'previous':case 'jump':
      if(!s||s.mode!=='exam')break;
      s.index=action==='previous'?Math.max(0,s.index-1):Math.max(0,Math.min(s.keys.length-1,Number(el.dataset.index)));save();render();window.scrollTo(0,0);main.focus({preventScroll:true});break;
    case 'submit-exam':{
      if(!s||s.mode!=='exam')break;
      const missed=s.keys.filter(k=>!validDraft(bank.get(k),s.drafts[k])).length;
      confirmDialog('Submit the mock exam',missed?(missed===1?'One question still has no valid answer. It will score zero when you submit.':missed+' questions still have no valid answer. They will score zero when you submit.'):'You have answered every question. Submit to see your score and the solutions.',button('close','Back to the exam','back','secondary')+button('finish-exam','Submit','check'));break;
    }
    case 'finish-exam':if(s?.mode==='exam'){finishSession();modal.close();go('result/'+s.start);}break;
  }
});
document.addEventListener('input',e=>{
  if(e.target.id==='numeric-answer'){
    if(state.session?.deadline && Date.now()>=state.session.deadline){tick();return;}
    const s=state.session;if(!s)return;const q=bank.get(s.keys[s.index]);if(s.answers[q.key])return;
    s.drafts[q.key]=e.target.value;save();
    const check=main.querySelector('[data-action="check"]');if(check)check.disabled=!validDraft(q,e.target.value);
    if(s.mode==='exam'){const label=document.querySelector('.question-progress span:last-child');if(label)label.textContent=entered(s);const jump=main.querySelector('[aria-current="step"]');if(jump)jump.classList.toggle('answered',validDraft(q,e.target.value));}
  }
  if(e.target.id==='formula-search'){formulaFilters.text=e.target.value;document.getElementById('formula-results').innerHTML=referenceResults();}
});
document.addEventListener('change',e=>{
  const id=e.target.id;
  if(id==='home-filter'){homeFilter=e.target.value;document.getElementById('topic-cards').innerHTML=topics.filter(t=>homeFilter==='All areas'||ti(t.id).group===homeFilter).map(card).join('');}
  if(id.startsWith('ex-')){exerciseFilters[id.slice(3)]=e.target.value;render();document.getElementById(id)?.focus({preventScroll:true});}
  if(id==='formula-topic'){formulaFilters.topic=e.target.value;document.getElementById('formula-results').innerHTML=referenceResults();}
});
// preventDefault stops the same Enter press from also activating the "Next question" button that receives focus.
document.addEventListener('keydown',e=>{if(e.target.id==='numeric-answer'&&e.key==='Enter'){e.preventDefault();main.querySelector('[data-action="check"]:not(:disabled)')?.click();}});
modal.addEventListener('click',e=>{if(e.target!==modal)return;const r=modal.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)modal.close();});
window.addEventListener('hashchange',()=>{if(modal.open)modal.close();render();window.scrollTo(0,0);main.focus({preventScroll:true});});
document.querySelector('.skip').addEventListener('click',e=>{e.preventDefault();main.focus();});
document.querySelectorAll('[data-icon]').forEach(el=>el.innerHTML=icon(el.dataset.icon,17));
window.addEventListener('storage',e=>{if(e.key===storageKey||e.key===null){state=readState();render();}});
render();setInterval(tick,1000);
