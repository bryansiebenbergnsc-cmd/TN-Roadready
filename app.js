
const DATA=window.APP_DATA;
const KEY='tn-roadready-v1';
let state=loadState(), currentProfile=null, quiz=null, deferredPrompt=null, sessionStart=null, sessionTimer=null;

function loadState(){try{return JSON.parse(localStorage.getItem(KEY))||{profiles:{}}}catch(e){return {profiles:{}}}}
function save(){localStorage.setItem(KEY,JSON.stringify(state))}
function blankProfile(name){return {name,seconds:0,answered:0,correct:0,sectionStats:{},tests:[],missed:[],lastSeen:Date.now(),dailyGoal:15,dailyLog:{},lessonsViewed:[]}}
function ensureDefaults(){['Jace','Regan','Carly'].forEach(n=>{if(!state.profiles[n])state.profiles[n]=blankProfile(n)});save()}
ensureDefaults();Object.values(state.profiles).forEach(p=>{if(!p.dailyGoal)p.dailyGoal=15;if(!p.dailyLog)p.dailyLog={};if(!p.lessonsViewed)p.lessonsViewed=[]});save();

function showProfiles(){
 stopSession(); currentProfile=null;
 document.querySelector('#profileScreen').classList.add('active');
 document.querySelector('#appScreen').classList.remove('active');
 const grid=document.querySelector('#profileGrid'); grid.innerHTML='';
 Object.values(state.profiles).forEach(p=>{
   const b=document.createElement('button');b.className='profile-btn';b.textContent=p.name;
   b.onclick=()=>selectProfile(p.name);grid.appendChild(b)
 })
}
function selectProfile(name){
 currentProfile=state.profiles[name]; currentProfile.lastSeen=Date.now(); save();
 document.querySelector('#profileScreen').classList.remove('active');
 document.querySelector('#appScreen').classList.add('active');
 document.querySelector('#studentName').textContent=name;
 startSession(); renderAll(); switchTab('dashboard');
}
function startSession(){sessionStart=Date.now(); clearInterval(sessionTimer); sessionTimer=setInterval(()=>{if(currentProfile){currentProfile.seconds++;const day=new Date().toISOString().slice(0,10);currentProfile.dailyLog[day]=(currentProfile.dailyLog[day]||0)+1;if(currentProfile.seconds%10===0)save(); if(document.querySelector('#dashboard').classList.contains('active')){renderMetrics();renderGoalAndReadiness()}}},1000)}
function stopSession(){clearInterval(sessionTimer);if(currentProfile)save()}
window.addEventListener('beforeunload',stopSession);
document.addEventListener('visibilitychange',()=>{if(document.hidden)stopSession();else if(currentProfile)startSession()});

function pct(a,b){return b?Math.round(a/b*100):0}
function formatTime(sec){const h=Math.floor(sec/3600),m=Math.floor((sec%3600)/60);return h?`${h}h ${m}m`:`${m} min`}
function sectionInfo(s){const x=currentProfile.sectionStats[s]||{answered:0,correct:0,attempts:0,best:0};return {...x,score:pct(x.correct,x.answered),passed:(x.best||0)>=80}}
function renderMetrics(){
 if(!currentProfile)return;
 const avg=currentProfile.tests.length?Math.round(currentProfile.tests.reduce((a,t)=>a+t.score,0)/currentProfile.tests.length):0;
 const passed=DATA.sections.filter(s=>sectionInfo(s).passed).length;
 const vals=[
  [formatTime(currentProfile.seconds),'Study time'],
  [currentProfile.answered,'Questions answered'],
  [currentProfile.correct,'Correct answers'],
  [pct(currentProfile.correct,currentProfile.answered)+'%','Overall accuracy'],
  [avg+'%','Average test score'],
  [`${passed}/${DATA.sections.length}`,'Sections passed'],
  [currentProfile.tests.length,'Tests completed'],
  [currentProfile.missed.length,'Questions to review']
 ];
 document.querySelector('#metrics').innerHTML=vals.map(v=>`<div class="metric"><b>${v[0]}</b><span>${v[1]}</span></div>`).join('');
 document.querySelector('#passedCount').textContent=`${passed} of ${DATA.sections.length} passed`;
}
function renderSections(){
 const wrap=document.querySelector('#sectionProgress'), btns=document.querySelector('#sectionButtons');wrap.innerHTML='';btns.innerHTML='';
 DATA.sections.forEach(s=>{
  const x=sectionInfo(s);
  wrap.insertAdjacentHTML('beforeend',`<div class="progress-row"><div class="progress-label"><span>${s}</span><span class="${x.passed?'passed':''}">${x.passed?'Passed • ':''}${x.best||x.score}%</span></div><div class="bar"><i style="width:${Math.min(100,x.best||x.score)}%"></i></div></div>`);
  const b=document.createElement('button');b.innerHTML=`${s}<br><small>${x.passed?'Passed':(x.answered?`${x.score}% practice accuracy`:'Not started')}</small>`;
  b.onclick=()=>startSection(s);btns.appendChild(b)
 })
}
function renderHistory(){
 const h=document.querySelector('#history');
 if(!currentProfile.tests.length){h.innerHTML='<p class="empty">No completed tests yet.</p>';return}
 h.innerHTML=currentProfile.tests.slice(-8).reverse().map(t=>`<div class="history-item"><span>${new Date(t.date).toLocaleDateString()} • ${t.type}</span><b>${t.score}%</b></div>`).join('')
}
function readiness(){const acc=pct(currentProfile.correct,currentProfile.answered),passed=DATA.sections.filter(s=>sectionInfo(s).passed).length,best=currentProfile.tests.length?Math.max(...currentProfile.tests.map(t=>t.score)):0;return Math.min(100,Math.round(passed/DATA.sections.length*55)+Math.round(acc*.30)+Math.round(best*.15))}
function renderGoalAndReadiness(){const day=new Date().toISOString().slice(0,10),studied=currentProfile.dailyLog[day]||0,goal=(currentProfile.dailyGoal||15)*60,gp=Math.min(100,Math.round(studied/goal*100));document.querySelector('#goalRing').style.background=`conic-gradient(var(--blue) ${gp}%,#dfe7ed ${gp}%)`;document.querySelector('#goalValue').textContent=gp+'%';document.querySelector('#goalText').textContent=`${formatTime(studied)} of ${currentProfile.dailyGoal} minutes today`;const r=readiness();document.querySelector('#readinessScore').textContent=r+'%';document.querySelector('#readinessMessage').textContent=r>=90?'Permit ready—maintain knowledge with mixed tests.':r>=75?'Almost ready—focus on weak sections.':r>=50?'Good progress—continue passing sections.':'Complete guided lessons and section quizzes.'}
function renderBadges(){const passed=DATA.sections.filter(s=>sectionInfo(s).passed).length,best=currentProfile.tests.length?Math.max(...currentProfile.tests.map(t=>t.score)):0,b=[['🚦','First Steps','Answer 10 questions',currentProfile.answered>=10],['📘','Manual Explorer','Open 5 lessons',currentProfile.lessonsViewed.length>=5],['🎯','Accurate Driver','Reach 85% accuracy',currentProfile.answered>=20&&pct(currentProfile.correct,currentProfile.answered)>=85],['🏁','Section Champion','Pass 3 sections',passed>=3],['🏆','Course Master','Pass all sections',passed===DATA.sections.length],['🧠','Perfect Test','Score 100%',best===100],['🔁','Comeback Driver','Clear missed questions',currentProfile.correct>=25&&currentProfile.missed.length===0],['⏱️','Study Habit','Study 2 hours',currentProfile.seconds>=7200]];document.querySelector('#badgeCount').textContent=`${b.filter(x=>x[3]).length} of ${b.length} earned`;document.querySelector('#badges').innerHTML=b.map(x=>`<div class="badge ${x[3]?'':'locked'}"><span class="badge-icon">${x[0]}</span><b>${x[1]}</b><small>${x[2]}</small></div>`).join('')}
function renderLessons(){const w=document.querySelector('#lessonCards');w.innerHTML='';DATA.sections.forEach(s=>{const l=DATA.lessons[s],x=sectionInfo(s),d=document.createElement('div');d.className='lesson-card';d.innerHTML=`<span class="eyebrow">PAGES ${l.manualPages}</span><h3>${l.title}</h3><p>${l.objective}</p><p><b>Status:</b> ${x.passed?'Passed':x.answered?x.score+'% practice accuracy':'Not started'}</p><button>Open lesson</button>`;d.querySelector('button').onclick=()=>openLesson(s);w.appendChild(d)})}
function openLesson(s){const l=DATA.lessons[s],v=document.querySelector('#lessonViewer');if(!currentProfile.lessonsViewed.includes(s)){currentProfile.lessonsViewed.push(s);save()}document.querySelector('#lessonListCard').hidden=true;v.hidden=false;v.innerHTML=`<div class="card"><span class="eyebrow">${s} • PAGES ${l.manualPages}</span><h2>${l.title}</h2><div class="lesson-objective"><b>Objective:</b> ${l.objective}</div><h3>Key ideas</h3><ul class="lesson-points">${l.points.map(p=>`<li>${p}</li>`).join('')}</ul><div class="scenario-box"><b>Apply it:</b><p>${l.scenario}</p></div><div class="lesson-actions"><button id="lessonQuiz">Take section quiz</button><button class="secondary" id="lessonManual">Open manual</button><button class="secondary" id="lessonBack">Back</button></div></div>`;v.querySelector('#lessonQuiz').onclick=()=>{document.querySelector('#lessonListCard').hidden=false;v.hidden=true;startSection(s);switchTab('test')};v.querySelector('#lessonManual').onclick=()=>openManual(parseInt(l.manualPages)||1);v.querySelector('#lessonBack').onclick=()=>{v.hidden=true;document.querySelector('#lessonListCard').hidden=false;renderLessons()};renderBadges()}
function renderAll(){renderMetrics();renderSections();renderHistory();renderGoalAndReadiness();renderBadges();renderLessons()}

function switchTab(id){
 document.querySelectorAll('.tabs button').forEach(b=>b.classList.toggle('active',b.dataset.tab===id));
 document.querySelectorAll('.tab-panel').forEach(p=>p.classList.toggle('active',p.id===id))
}
document.querySelectorAll('.tabs button').forEach(b=>b.onclick=()=>switchTab(b.dataset.tab));
document.querySelector('#switchProfile').onclick=showProfiles;document.querySelector('#goalSettings').onclick=()=>{const n=Number(prompt('Daily study goal in minutes:',currentProfile.dailyGoal||15));if(Number.isFinite(n)&&n>=5&&n<=120){currentProfile.dailyGoal=Math.round(n);save();renderGoalAndReadiness()}};
document.querySelector('#addProfileBtn').onclick=()=>{
 const name=prompt('Student name:')?.trim();if(!name)return;
 if(state.profiles[name])return alert('That profile already exists.');
 state.profiles[name]=blankProfile(name);save();showProfiles()
};

function shuffled(a){return [...a].sort(()=>Math.random()-.5)}
function startSection(section){
 const qs=shuffled(DATA.questions.filter(q=>q.section===section));
 beginQuiz(qs,`${section} Quiz`,section);switchTab('test')
}
document.querySelectorAll('[data-count]').forEach(b=>b.onclick=()=>{
 const count=Number(b.dataset.count);beginQuiz(shuffled(DATA.questions).slice(0,count),`${count}-Question Practice Test`,null)
});
document.querySelector('#missedBtn').onclick=()=>{
 const ids=[...new Set(currentProfile.missed)];
 if(!ids.length)return alert('There are no missed questions to review.');
 beginQuiz(shuffled(DATA.questions.filter(q=>ids.includes(q.id))),`Missed Question Review`,null,true)
};

function beginQuiz(questions,type,section=null,review=false){
 quiz={questions,index:0,correct:0,type,section,review,answers:[],started:Date.now()};
 document.querySelector('#testSetup').hidden=true;document.querySelector('#quizArea').hidden=false;renderQuestion()
}
function renderQuestion(){
 const area=document.querySelector('#quizArea'),q=quiz.questions[quiz.index];
 area.innerHTML=`<div class="card question-card">
 <div class="quiz-head"><span>${quiz.type}</span><b>${quiz.index+1} / ${quiz.questions.length}</b></div>
 <span class="eyebrow">${q.section} • MANUAL PAGE ${q.page}</span>
 <h2>${q.q}</h2><div class="choice-list">${q.choices.map((c,i)=>`<button class="choice" data-i="${i}">${String.fromCharCode(65+i)}. ${c}</button>`).join('')}</div>
 <div id="feedback"></div><div class="quiz-actions"><button class="secondary" id="quitQuiz">Exit test</button><button id="submitAnswer" disabled>Check answer</button></div></div>`;
 let selected=null;
 area.querySelectorAll('.choice').forEach(b=>b.onclick=()=>{if(area.dataset.locked)return;selected=Number(b.dataset.i);area.querySelectorAll('.choice').forEach(x=>x.classList.remove('selected'));b.classList.add('selected');area.querySelector('#submitAnswer').disabled=false});
 area.querySelector('#quitQuiz').onclick=()=>finishQuiz(true);
 area.querySelector('#submitAnswer').onclick=()=>{
  if(selected===null)return;area.dataset.locked='1';
  const correct=selected===q.answer;if(correct){quiz.correct++;currentProfile.correct++}else if(!currentProfile.missed.includes(q.id))currentProfile.missed.push(q.id);
  if(correct&&quiz.review)currentProfile.missed=currentProfile.missed.filter(id=>id!==q.id);
  currentProfile.answered++;
  const st=currentProfile.sectionStats[q.section]||{answered:0,correct:0,attempts:0,best:0};st.answered++;if(correct)st.correct++;currentProfile.sectionStats[q.section]=st;
  area.querySelectorAll('.choice').forEach(b=>{const i=Number(b.dataset.i);if(i===q.answer)b.classList.add('correct');if(i===selected&&!correct)b.classList.add('wrong');b.disabled=true});
  area.querySelector('#feedback').innerHTML=`<div class="feedback ${correct?'good':''}"><h3>${correct?'Correct':'Not quite'}</h3>${!correct?`<p><b>Correct answer:</b> ${q.choices[q.answer]}</p>`:''}<p>${q.explain}</p><p><a href="#" id="manualRef">View manual page ${q.page}</a></p></div>`;
  area.querySelector('#manualRef').onclick=e=>{e.preventDefault();openManual(q.page)};
  quiz.answers.push({id:q.id,selected,correct});save();
  const submit=area.querySelector('#submitAnswer');submit.disabled=false;submit.textContent=quiz.index===quiz.questions.length-1?'See results':'Next question';submit.onclick=()=>{delete area.dataset.locked;if(++quiz.index>=quiz.questions.length)finishQuiz(false);else renderQuestion()}
 }
}
function finishQuiz(abandoned){
 const area=document.querySelector('#quizArea');
 if(abandoned){area.hidden=true;document.querySelector('#testSetup').hidden=false;quiz=null;return}
 const score=Math.round(quiz.correct/quiz.questions.length*100),passed=score>=80;
 currentProfile.tests.push({date:Date.now(),type:quiz.type,score,total:quiz.questions.length});
 if(quiz.section){const s=currentProfile.sectionStats[quiz.section]||{answered:0,correct:0,attempts:0,best:0};s.attempts++;s.best=Math.max(s.best||0,score);currentProfile.sectionStats[quiz.section]=s}
 save();renderAll();
 area.innerHTML=`<div class="card"><h2>${passed?'Great work!':'Keep practicing'}</h2><div class="metric"><b>${score}%</b><span>${quiz.correct} of ${quiz.questions.length} correct</span></div><p>${passed?'You passed this test.':'A passing score is 80%. Review missed questions and try again.'}</p><button id="doneQuiz">Return to dashboard</button></div>`;
 document.querySelector('#doneQuiz').onclick=()=>{area.hidden=true;document.querySelector('#testSetup').hidden=false;quiz=null;switchTab('dashboard')}
}
function openManual(page){document.querySelector('#manualPage').value=page;document.querySelector('#manualFrame').src=`DL_Manual.pdf#page=${page}`;switchTab('manual')}
document.querySelector('#goPage').onclick=()=>openManual(Math.max(1,Math.min(135,Number(document.querySelector('#manualPage').value)||1)));

document.querySelector('#exportBtn').onclick=()=>{
 const blob=new Blob([JSON.stringify({app:'TN RoadReady',version:1,exported:new Date().toISOString(),data:state},null,2)],{type:'application/json'});
 const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='TN_RoadReady_Backup.json';a.click();URL.revokeObjectURL(a.href)
};
document.querySelector('#importFile').onchange=e=>{
 const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{const obj=JSON.parse(r.result);if(!obj.data?.profiles)throw 0;if(confirm('Replace all local progress with this backup?')){state=obj.data;save();showProfiles()}}catch{alert('That file is not a valid TN RoadReady backup.')}};r.readAsText(f)
};

window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e;const b=document.querySelector('#installBtn');b.hidden=false;b.onclick=async()=>{deferredPrompt.prompt();await deferredPrompt.userChoice;b.hidden=true}});
if('serviceWorker'in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('service-worker.js'));
showProfiles();
