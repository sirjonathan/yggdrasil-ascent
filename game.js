// Yggdrasil Ascent — game logic
(function(){
  const WORLDS = [
    {n:'I',   name:'Niflheim'},
    {n:'II',  name:'Muspellheim'},
    {n:'III', name:'Jötunheim'},
    {n:'IV',  name:'Svartálfheim'},
    {n:'V',   name:'Midgard'},
    {n:'VI',  name:'Álfheim'},
    {n:'VII', name:'Vanaheim'},
    {n:'VIII',name:'Helheim'},
    {n:'IX',  name:'Asgard'},
  ];
  const RUNES = ['ᚠ','ᚢ','ᚦ','ᚨ','ᚱ','ᚲ','ᚷ','ᚹ','ᚺ'];
  const MODES = {
    apprentice:{time:36, lives:3, hints:1, shuffle:false, label:'Apprentice'},
    ranger:    {time:30, lives:3, hints:0, shuffle:false, label:'Thane'},
    einherjar: {time:20, lives:2, hints:0, shuffle:true,  label:'Einherjar'}
  };
  const RANKS = [
    {min:0, name:'Einherji initiate'},
    {min:5, name:'Bridge runner'},
    {min:7, name:'Bifröst-watcher'},
    {min:9, name:"Odin's chosen"},
  ];
  const STORAGE = 'ygg.v1';

  const $ = s => document.querySelector(s);
  const $$ = s => Array.from(document.querySelectorAll(s));

  // ---- State ----
  let state;
  function freshState(mode, setId){
    const cfg = MODES[mode];
    const setMeta = (window.QUESTION_SETS && window.QUESTION_SETS[setId]) || (window.QUESTION_SETS && window.QUESTION_SETS.norse_mythology);
    const effectiveId = setMeta ? setMeta.id : (setId||'norse_mythology');
    const effectiveLabel = setMeta ? setMeta.label : 'Questions';
    const effectiveQuestions = (window.TEACHER && window.TEACHER.getQuestions)
      ? window.TEACHER.getQuestions(effectiveId)
      : (setMeta ? setMeta.questions.slice() : []);
    const pool = effectiveQuestions.slice();
    // Shuffle pool
    for(let i=pool.length-1;i>0;i--){ const j=(Math.random()*(i+1))|0; [pool[i],pool[j]]=[pool[j],pool[i]] }
    const picked = pool.slice(0, 9).map((q,i)=>{
      let options = q.options.slice();
      let answer = q.answer;
      if(cfg.shuffle){
        const correct = options[answer];
        const idxs = options.map((_,k)=>k);
        for(let x=idxs.length-1;x>0;x--){ const j=(Math.random()*(x+1))|0; [idxs[x],idxs[j]]=[idxs[j],idxs[x]] }
        options = idxs.map(k=>q.options[k]);
        answer = options.indexOf(correct);
      }
      return {...q, options, answer, world:WORLDS[i], rune:RUNES[i]};
    });
    return {
      mode, cfg, setId: effectiveId, setLabel: effectiveLabel,
      qs: picked,
      idx: 0,
      lives: cfg.lives,
      maxLives: cfg.lives,
      hintsLeft: cfg.hints,
      correct: 0,
      misses: [], // {q, chosen, correct}
      bankedMs: 0,
      startAt: Date.now(),
      timerRemainingMs: cfg.time*1000,
      timerStart: 0,
      timerRaf: 0,
      answered: false,
      name: 'Climber'
    };
  }

  // ---- Screen router ----
  function show(id){
    $$('.screen').forEach(s=>s.classList.toggle('on', s.id===id));
    const home = $('#btn-home');
    if(home) home.style.display = (id==='play') ? 'grid' : 'none';
    // HUD prog — only meaningful during the climb; thematic placeholder otherwise
    const prog = $('#prog');
    if(prog && id !== 'play') prog.textContent = '9 worlds';
  }

  // ---- Quiz picker ----
  function currentSetId(){
    const saved = load();
    const id = saved.setId;
    return (id && window.QUESTION_SETS[id]) ? id : 'norse_mythology';
  }
  function buildPicker(){
    const menu = $('#picker-menu');
    const sets = Object.values(window.QUESTION_SETS||{});
    // Group: Norse mythology first, then Magnus Chase
    const norse = sets.filter(s=>s.id==='norse_mythology');
    const magnus = sets.filter(s=>s.id!=='norse_mythology');
    menu.innerHTML = '';
    if(norse.length){
      const g = document.createElement('div'); g.className='picker-group'; g.textContent='Mythology'; menu.appendChild(g);
      norse.forEach(s=>menu.appendChild(optEl(s)));
    }
    if(magnus.length){
      const g = document.createElement('div'); g.className='picker-group'; g.textContent='Magnus Chase'; menu.appendChild(g);
      magnus.forEach(s=>menu.appendChild(optEl(s)));
    }
    function optEl(s){
      const b = document.createElement('button');
      b.className='picker-opt'; b.type='button'; b.dataset.set=s.id;
      const n = (window.TEACHER && window.TEACHER.getQuestions(s.id).length) || s.questions.length;
      b.innerHTML = `<span class="nm">${escapeHTML(s.label)}</span><span class="meta">${n} questions${window.TEACHER && window.TEACHER.hasOverride(s.id) ? ' · edited':''}</span>`;
      b.addEventListener('click', e=>{
        e.stopPropagation();
        save({setId: s.id});
        refreshPicker();
        menu.classList.remove('on');
        updateBestHint();
      });
      return b;
    }
    refreshPicker();
  }
  function refreshPicker(){
    const id = currentSetId();
    const s = window.QUESTION_SETS[id];
    // parse the label for main + chapter piece on " · "
    const parts = s.label.split(' · ');
    const mainEl = document.querySelector('#quizselect .qz-main');
    const subEl  = document.querySelector('#quizselect .qz-meta');
    if(mainEl) mainEl.textContent = parts[0];
    if(subEl)  subEl.textContent  = s.sublabel || (parts[1] || `${s.questions.length} questions`);
    $$('#picker-menu .picker-opt').forEach(b=>b.classList.toggle('on', b.dataset.set===id));
  }

  // ---- Intro ----
  function initIntro(){
    buildPicker();
    const trigger = $('#quizselect');
    if(trigger){
      trigger.addEventListener('click', e=>{
        e.stopPropagation();
        $('#picker-menu').classList.toggle('on');
      });
      document.addEventListener('click', e=>{
        if(!e.target.closest('#quizselect')) $('#picker-menu').classList.remove('on');
      });
    }

    $('#modes').addEventListener('click', e=>{
      const c = e.target.closest('.mode-card'); if(!c) return;
      $$('#modes .mode-card').forEach(m=>m.classList.toggle('on', m===c));
    });
    $('#btn-begin').addEventListener('click', begin);
    $('#btn-help-intro').addEventListener('click', ()=>$('#help-overlay').classList.add('on'));
    $('#btn-help').addEventListener('click', ()=>$('#help-overlay').classList.add('on'));
    $('#help-close').addEventListener('click', ()=>$('#help-overlay').classList.remove('on'));

    SFX.init();
    updateSoundIcon();
    $('#btn-sound').addEventListener('click', ()=>{ SFX.enable(!SFX.enabled()); updateSoundIcon(); });

    updateBestHint();
  }
  function updateSoundIcon(){
    $('#btn-sound').style.opacity = SFX.enabled()? '1':'.4';
    $('#btn-sound').title = SFX.enabled()? 'Sound on' : 'Sound off';
  }
  function updateBestHint(){
    const data = load();
    const setId = currentSetId();
    const setLabel = window.QUESTION_SETS[setId].label;
    const bestBySet = data.bestBySet || {};
    const best = bestBySet[setId];
    // legacy text hint
    const el = $('#besthint');
    if(el){
      if(best){
        el.textContent = `Best on ${setLabel}: ${best.correct}/9 in ${fmtTime(best.timeMs)} · ${best.rank}`;
      } else {
        el.textContent = `${setLabel} · no runs yet on this device`;
      }
    }
    // stat line — single quiet sentence before first run, 3-part metric line after
    const runs = (data.runs || []).filter(r => r.setId === setId);
    const elEmpty = $('#sl-empty');
    const elFull  = $('#sl-full');
    const elBest  = $('#ss-best');
    const elAcc   = $('#ss-acc');
    const elRuns  = $('#ss-runs');
    const elLine  = $('#statstrip');
    const hasRun  = runs.length > 0;
    if(elEmpty) elEmpty.style.display = hasRun ? 'none' : '';
    if(elFull)  elFull.style.display  = hasRun ? '' : 'none';
    if(elLine)  elLine.classList.toggle('is-empty', !hasRun);
    if(hasRun){
      if(elBest) elBest.textContent = best ? fmtTime(best.timeMs) : '—';
      if(elRuns) elRuns.textContent = runs.length.toString();
      if(elAcc){
        let c=0,t=0;
        runs.forEach(r=>{ c += (r.correct||0); t += (r.total||0); });
        elAcc.textContent = t ? Math.round(100*c/t) + '%' : '—';
      }
    }
  }

  // ---- Start run ----
  function begin(){
    const mode = $('#modes .mode-card.on').dataset.mode;
    const setId = currentSetId();
    state = freshState(mode, setId);
    save({setId});
    SFX.horn();
    show('play');
    buildBranches();
    loadQuestion();
  }

  function buildBranches(){
    const c = $('#branches');
    c.innerHTML = '<span class="label">Branches</span>';
    for(let i=0;i<9;i++){
      const d = document.createElement('div');
      d.className='node'; d.textContent = i+1;
      c.appendChild(d);
    }
    updateBranchesUI();
    renderLives();
    $('#prog').textContent = `0 / 9`;
  }
  function updateBranchesUI(){
    $$('.node').forEach((n,i)=>{
      n.classList.remove('cur','done','fail');
      if(i<state.idx) n.classList.add('done');
      else if(i===state.idx) n.classList.add('cur');
    });
  }
  function renderLives(){
    const el = $('#lives'); el.innerHTML='';
    for(let i=0;i<state.maxLives;i++){
      const r = document.createElement('div');
      r.className = 'raven' + (i<(state.maxLives-state.lives)?' gone':'');
      el.appendChild(r);
    }
  }

  function loadQuestion(){
    cancelAnimationFrame(state.timerRaf);
    state.answered = false;
    state.timerRemainingMs = state.cfg.time*1000 + state.bankedMs;
    state.timerStart = performance.now();

    const q = state.qs[state.idx];
    $('#world-n').textContent = 'World '+q.world.n;
    $('#world-name').textContent = q.world.name;
    $('#chapter-chip').textContent = `Riddle ${q.world.n}`;
    $('#runeline').innerHTML = RUNES.map((r,i)=>{
      if(i<state.idx) return `<span style="color:var(--green)">${r}</span>`;
      if(i===state.idx) return `<b style="color:var(--gold-dark)">${r}</b>`;
      return `<span style="opacity:.35">${r}</span>`;
    }).join(' · ');

    $('#q-text').textContent = q.q;
    const optsEl = $('#opts'); optsEl.innerHTML = '';
    q.options.forEach((o,i)=>{
      const b = document.createElement('button');
      b.className='opt'; b.type='button';
      b.innerHTML = `<span class="k">${String.fromCharCode(65+i)}</span><span>${escapeHTML(o)}</span>`;
      b.addEventListener('click', ()=>answer(i, b));
      optsEl.appendChild(b);
    });
    $('#feedback').style.display = 'none';
    $('#prog').textContent = `${state.idx+1} / 9`;
    updateBranchesUI();
    tickTimer();
  }

  function tickTimer(){
    const loop = () => {
      const now = performance.now();
      const elapsed = now - state.timerStart;
      const remaining = Math.max(0, state.timerRemainingMs - elapsed);
      renderTimer(remaining);
      if(remaining<=0){ timeOut(); return; }
      state.timerRaf = requestAnimationFrame(loop);
    };
    state.timerRaf = requestAnimationFrame(loop);
  }
  function renderTimer(remaining){
    const ringLen = 2*Math.PI*52;
    const base = state.cfg.time*1000;
    const visible = Math.min(remaining, base);
    const pct = visible/base;
    const fg = $('#timer-fg');
    fg.setAttribute('stroke-dasharray', ringLen);
    fg.setAttribute('stroke-dashoffset', (1-pct)*ringLen);
    fg.classList.remove('safe','warn','crit');
    if(pct>0.5) fg.classList.add('safe');
    else if(pct>0.25) fg.classList.add('warn');
    else fg.classList.add('crit');
    $('#timer-n').textContent = Math.ceil(remaining/1000);
    $('#timer').classList.toggle('pulse', remaining<3000);
    if(remaining<3000 && remaining>2950) SFX.tick();
    if(remaining<2000 && remaining>1950) SFX.tick();
    if(remaining<1000 && remaining>950) SFX.tick();
  }

  function answer(picked, btn){
    if(state.answered) return;
    state.answered = true;
    cancelAnimationFrame(state.timerRaf);
    const q = state.qs[state.idx];
    const elapsed = performance.now() - state.timerStart;
    const leftover = Math.max(0, state.timerRemainingMs - elapsed);

    const correct = picked === q.answer;
    if(correct){
      btn.classList.add('correct');
      SFX.ding();
      state.correct++;
      state.bankedMs = leftover;
      showFeedback(true, q.note);
    } else {
      btn.classList.add('wrong');
      $$('#opts .opt')[q.answer].classList.add('correct');
      SFX.snap();
      state.lives--;
      state.bankedMs = 0;
      state.misses.push({ q:q.q, chosen:q.options[picked], correct:q.options[q.answer] });
      renderLives();
      showFeedback(false, q.note);
    }
    $$('#opts .opt').forEach(b=>b.disabled=true);
  }
  function timeOut(){
    if(state.answered) return;
    state.answered = true;
    const q = state.qs[state.idx];
    $$('#opts .opt')[q.answer].classList.add('correct');
    $$('#opts .opt').forEach(b=>b.disabled=true);
    SFX.snap();
    state.lives--;
    state.bankedMs = 0;
    state.misses.push({ q:q.q, chosen:'(no answer · time out)', correct:q.options[q.answer] });
    renderLives();
    showFeedback(false, `Time ran out. The answer: ${q.options[q.answer]}.`);
  }

  function showFeedback(ok, note){
    const fb = $('#feedback');
    fb.style.display='flex';
    fb.className = 'feedback ' + (ok?'good':'bad');
    $('#fb-label').textContent = ok ? '✓ Branch held' : '✗ Branch snapped';
    $('#fb-note').textContent = note || '';

    const node = $$('.node')[state.idx];
    node.classList.remove('cur');
    node.classList.add(ok?'done':'fail');

    const btn = $('#fb-next');
    if(state.lives<=0){
      btn.textContent = 'See your fate →';
      btn.onclick = endGameOver;
    } else if(state.idx>=8){
      btn.textContent = 'Climb to Asgard →';
      btn.onclick = endVictory;
    } else {
      btn.textContent = 'Next world →';
      btn.onclick = nextQuestion;
    }
  }

  function nextQuestion(){
    state.idx++;
    loadQuestion();
  }

  function endVictory(){
    SFX.ding();
    const timeMs = Date.now() - state.startAt;
    const lost = state.maxLives - state.lives;
    const rank = rankFor(state.correct);
    $('#v-climbed').innerHTML = `${state.correct}<small>/9</small>`;
    $('#v-ravens').textContent = lost;
    $('#v-time').textContent = fmtTime(timeMs);
    $('#v-banked').innerHTML = `${Math.round(state.bankedMs/1000)}<small>s</small>`;
    $('#v-rank').textContent = `⚡ ${rank}`;
    $('#v-sub').textContent = state.correct===9 && lost===0
      ? `Nine for nine, no scars. Odin is reassigning his ravens — you're scouting now.`
      : state.correct===9
      ? `Nine for nine. A couple of scars. They'll look good in the songs.`
      : `${state.correct} of 9 climbed. Close enough to matter.`;
    finalize({ outcome:'victory', timeMs, lost, rank });
    show('victory');
  }
  function endGameOver(){
    SFX.growl();
    const timeMs = Date.now() - state.startAt;
    $('#go-reached').textContent = `World ${Math.min(state.idx+1,9)}`;
    $('#go-ravens').textContent = Math.max(state.lives,0);
    $('#go-time').textContent = fmtTime(timeMs);
    $('#go-correct').textContent = state.correct;
    finalize({ outcome:'gameover', timeMs, lost:state.maxLives - state.lives, rank:rankFor(state.correct) });
    show('gameover');
  }

  function finalize({ outcome, timeMs, lost, rank }){
    const run = {
      id: Date.now()+'-'+Math.random().toString(36).slice(2,7),
      name: state.name,
      setId: state.setId,
      setLabel: state.setLabel,
      mode: state.mode,
      modeLabel: MODES[state.mode].label,
      outcome, correct: state.correct, ravensLost: lost, timeMs, rank,
      misses: state.misses,
      at: Date.now()
    };
    persistBest(run);
    if(window.TEACHER && window.TEACHER.recordRun) window.TEACHER.recordRun(run);
  }

  function rankFor(correct){
    let r = RANKS[0].name;
    RANKS.forEach(x=>{ if(correct>=x.min) r = x.name; });
    return r;
  }

  function load(){ try{ return JSON.parse(localStorage.getItem(STORAGE)||'{}') }catch(e){ return {} } }
  function save(patch){
    const cur = load();
    localStorage.setItem(STORAGE, JSON.stringify({...cur, ...patch}));
  }
  function persistBest(run){
    const cur = load();
    const bestBySet = cur.bestBySet || {};
    const prev = bestBySet[run.setId];
    const better = !prev || run.correct>prev.correct || (run.correct===prev.correct && run.timeMs<prev.timeMs);
    if(better) bestBySet[run.setId] = { correct:run.correct, timeMs:run.timeMs, rank:run.rank };
    save({setId:run.setId, last:run, bestBySet});
  }

  function fmtTime(ms){
    const s = Math.round(ms/1000);
    const m = Math.floor(s/60);
    const r = s%60;
    return `${m}:${String(r).padStart(2,'0')}`;
  }
  function escapeHTML(s){ return String(s||'').replace(/[&<>"']/g, c=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c])); }

  function goHome(){
    cancelAnimationFrame(state && state.timerRaf);
    show('intro');
    // refresh picker (in case teacher added/edited sets)
    buildPicker();
    updateBestHint();
  }
  function confirmHomeDuringPlay(){
    if(state && !state.answered && state.idx < 9){
      if(!confirm('Leave this run? Your progress will be lost.')) return;
    }
    goHome();
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    initIntro();
    $('#v-again').addEventListener('click', begin);
    $('#v-home').addEventListener('click', goHome);
    $('#go-again').addEventListener('click', begin);
    $('#go-home').addEventListener('click', goHome);
    const homeBtn = $('#btn-home');
    if(homeBtn) homeBtn.addEventListener('click', confirmHomeDuringPlay);

    // Listen for teacher-modified events so the picker + best hint refresh
    window.addEventListener('teacher:changed', ()=>{ buildPicker(); updateBestHint(); });
  });
})();
