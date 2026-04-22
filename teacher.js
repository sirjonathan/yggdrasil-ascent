// Teacher area — password gate + roster dashboard + question editor
// Storage: 'ygg.teacher.v1' = { overrides:{ [setId]:[...q] }, roster:[...runs] }

(function(){
  const STORAGE = 'ygg.teacher.v1';
  const PASSWORD = 'secret';

  const $ = s => document.querySelector(s);
  const $$ = s => Array.from(document.querySelectorAll(s));

  function load(){ try{ return JSON.parse(localStorage.getItem(STORAGE)||'{}') }catch(e){ return {} } }
  function save(data){ localStorage.setItem(STORAGE, JSON.stringify(data)); }
  function dispatchChange(){ window.dispatchEvent(new Event('teacher:changed')); }

  function getOverrides(){ return load().overrides || {}; }
  function setOverride(setId, questions){
    const d = load(); d.overrides = d.overrides || {}; d.overrides[setId] = questions; save(d); dispatchChange();
  }
  function clearOverride(setId){
    const d = load(); if(d.overrides) delete d.overrides[setId]; save(d); dispatchChange();
  }
  function getQuestions(setId){
    const defSet = (window.QUESTION_SETS||{})[setId];
    if(!defSet) return [];
    const ov = getOverrides()[setId];
    if(ov && ov.length) return ov;
    return defSet.questions.slice();
  }
  function hasOverride(setId){
    const ov = getOverrides()[setId];
    return !!(ov && ov.length);
  }

  // Roster
  function getRoster(){ return load().roster || []; }
  function recordRun(run){
    const d = load(); d.roster = d.roster || [];
    d.roster.push(run);
    // cap at 200
    if(d.roster.length > 200) d.roster = d.roster.slice(-200);
    save(d);
    dispatchChange();
  }
  function clearRoster(){
    const d = load(); d.roster = []; save(d); dispatchChange();
  }

  // ---- UI state ----
  let authed = false;
  let activeTab = 'roster';
  let currentSetId = null;
  let draft = [];
  let rosterFilter = 'all';   // 'all' or a setId
  let selectedRunId = null;

  function openOverlay(){
    $('#teacher-overlay').classList.add('on');
    $('#teacher-pw-err').textContent = '';
    if(authed){ showDashboard(); }
    else {
      $('#teacher-gate').style.display = '';
      $('#teacher-dashboard').style.display = 'none';
      $('#teacher-title').textContent = 'Password required';
      setTimeout(()=>$('#teacher-pw').focus(), 40);
    }
  }
  function closeOverlay(){ $('#teacher-overlay').classList.remove('on'); }

  function tryAuth(){
    const v = ($('#teacher-pw').value||'').trim();
    if(v === PASSWORD){
      authed = true;
      $('#teacher-pw').value = '';
      $('#teacher-pw-err').textContent = '';
      showDashboard();
    } else {
      $('#teacher-pw-err').textContent = 'That\'s not the password. Try again.';
      $('#teacher-pw').value = '';
      $('#teacher-pw').focus();
    }
  }

  function showDashboard(){
    $('#teacher-gate').style.display = 'none';
    $('#teacher-dashboard').style.display = 'flex';
    $('#teacher-title').textContent = 'Teacher dashboard';
    switchTab(activeTab);
  }
  function switchTab(name){
    activeTab = name;
    $$('#teacher-dashboard .tab').forEach(t=>t.classList.toggle('on', t.dataset.tab===name));
    $('#panel-roster').style.display = name==='roster' ? '' : 'none';
    $('#panel-questions').style.display = name==='questions' ? '' : 'none';
    if(name==='roster') renderRoster();
    else renderQuestionsPanel();
  }

  // ================= ROSTER =================
  function renderRoster(){
    const roster = getRoster();
    const sets = window.QUESTION_SETS||{};
    const body = $('#roster-body');

    // Filter chips — always rebuild (set list may change)
    const filters = $('#roster-filters');
    filters.innerHTML = '';
    const allBtn = mkFilter('all', `All (${roster.length})`);
    filters.appendChild(allBtn);
    Object.values(sets).forEach(s=>{
      const count = roster.filter(r=>r.setId===s.id).length;
      if(count>0) filters.appendChild(mkFilter(s.id, `${s.label} · ${count}`));
    });

    function mkFilter(id, label){
      const b = document.createElement('button');
      b.className = 'roster-filter' + (rosterFilter===id ? ' on':'');
      b.textContent = label;
      b.addEventListener('click', ()=>{ rosterFilter=id; renderRoster(); });
      return b;
    }

    const shown = rosterFilter==='all' ? roster : roster.filter(r=>r.setId===rosterFilter);
    const summary = shown.length
      ? `${shown.length} run${shown.length===1?'':'s'} · avg ${Math.round(shown.reduce((a,r)=>a+r.correct,0)/shown.length*10)/10}/9 correct`
      : 'No runs yet';
    $('#roster-summary').textContent = summary;

    if(!shown.length){
      body.innerHTML = `<div class="roster-empty">
        <div class="big">No runs yet</div>
        <div>Finished runs appear here — correct count, time, and which questions tripped players up.</div>
      </div>`;
      return;
    }

    const rows = shown.slice().reverse().map(r=>{
      const setLabel = sets[r.setId] ? sets[r.setId].label : r.setLabel || r.setId;
      const win = r.outcome==='victory';
      const accentMisses = r.misses && r.misses.length
        ? `<b>${r.misses.length}</b> missed`
        : '<span style="color:var(--green)">all correct</span>';
      const when = formatWhen(r.at);
      return `<tr data-id="${r.id}">
        <td class="roster-name">${escapeHTML(setLabel)}<div style="font-family:var(--font-mono);font-size:10px;color:var(--helper);letter-spacing:.12em;margin-top:2px">${escapeHTML(r.modeLabel||'')}</div></td>
        <td><span class="roster-result ${win?'win':'loss'}">${win?'Summited':'Wolf won'}</span></td>
        <td class="roster-score">${r.correct}/9</td>
        <td>${fmtTime(r.timeMs)}</td>
        <td class="roster-misses">${accentMisses}</td>
        <td style="font-family:var(--font-mono);font-size:11px;color:var(--helper)">${when}</td>
      </tr>`;
    }).join('');

    body.innerHTML = `
      <table class="roster-table">
        <thead><tr>
          <th>Set / mode</th><th>Result</th><th>Score</th><th>Time</th><th>Missed</th><th>When</th>
        </tr></thead>
        <tbody>${rows}</tbody>
      </table>
      <div id="roster-detail"></div>`;

    // click a row → expand misses
    body.querySelectorAll('tr[data-id]').forEach(tr=>{
      tr.addEventListener('click', ()=>{
        const id = tr.dataset.id;
        selectedRunId = selectedRunId===id ? null : id;
        renderDetail();
      });
    });
    renderDetail();

    function renderDetail(){
      const host = $('#roster-detail');
      if(!host) return;
      if(!selectedRunId){ host.innerHTML = ''; return; }
      const run = shown.find(r=>r.id===selectedRunId);
      if(!run){ host.innerHTML = ''; return; }
      if(!run.misses || !run.misses.length){
        host.innerHTML = `<div class="misses-panel"><h4>${escapeHTML(run.setLabel||'')} · no misses</h4><div class="miss-item">Clean run. Nine for nine.</div></div>`;
      } else {
        host.innerHTML = `<div class="misses-panel">
          <h4>Missed this run · ${run.misses.length} of 9</h4>
          ${run.misses.map(m=>`
            <div class="miss-item">
              <div class="miss-q">${escapeHTML(m.q)}</div>
              <div class="miss-ans"><span class="their">Chose: ${escapeHTML(m.chosen)}</span> &nbsp;·&nbsp; <span class="right">Correct: ${escapeHTML(m.correct)}</span></div>
            </div>
          `).join('')}
        </div>`;
      }
    }
  }

  function formatWhen(ts){
    if(!ts) return '';
    const d = new Date(ts);
    const now = new Date();
    const sameDay = d.toDateString() === now.toDateString();
    const mm = String(d.getMinutes()).padStart(2,'0');
    const hh = d.getHours();
    const h12 = ((hh+11)%12)+1;
    const ap = hh>=12?'pm':'am';
    if(sameDay) return `Today ${h12}:${mm}${ap}`;
    const mo = d.toLocaleString('en-US',{month:'short'});
    return `${mo} ${d.getDate()} · ${h12}:${mm}${ap}`;
  }

  // ================= QUESTIONS =================
  function renderQuestionsPanel(){
    const sel = $('#teacher-set');
    sel.innerHTML = '';
    Object.values(window.QUESTION_SETS||{}).forEach(s=>{
      const o = document.createElement('option');
      o.value = s.id; o.textContent = s.label + (hasOverride(s.id)?' · edited':'');
      sel.appendChild(o);
    });
    if(!currentSetId || !window.QUESTION_SETS[currentSetId]) currentSetId = sel.options[0].value;
    sel.value = currentSetId;
    loadDraft(currentSetId);
    renderList();
  }

  function loadDraft(setId){
    draft = getQuestions(setId).map(q=>({
      q: q.q,
      options: q.options.slice(0,4).concat(Array(Math.max(0,4-q.options.length)).fill('')).slice(0,4),
      answer: Math.max(0, Math.min(3, q.answer||0)),
      note: q.note||''
    }));
  }

  function persistDraft(){
    const cleaned = draft.map(q=>({
      q: (q.q||'').trim(),
      options: q.options.map(o=>(o||'').trim()),
      answer: Math.max(0, Math.min(3, q.answer||0)),
      note: (q.note||'').trim()
    })).filter(q => q.q && q.options.every(o=>o.length>0));
    if(cleaned.length === 0) clearOverride(currentSetId);
    else setOverride(currentSetId, cleaned);
    flashSaved();
    $$('#teacher-set option').forEach(o=>{
      const s = window.QUESTION_SETS[o.value];
      o.textContent = s.label + (hasOverride(s.id)?' · edited':'');
    });
  }

  let flashT;
  function flashSaved(){
    const el = $('#teacher-saved');
    if(!el) return;
    el.textContent = '✓ Saved';
    el.style.color = 'var(--green)';
    clearTimeout(flashT);
    flashT = setTimeout(()=>{ el.textContent = 'Changes save automatically.'; el.style.color=''; }, 1400);
  }

  function renderList(){
    const list = $('#teacher-list');
    list.innerHTML = '';
    draft.forEach((q, i) => list.appendChild(rowEl(q, i)));
    const count = draft.length;
    $('#teacher-count').textContent = `${count} question${count===1?'':'s'} · pool draws 9 per run`;
  }

  function rowEl(q, i){
    const row = document.createElement('div');
    row.className = 'q-row';
    row.innerHTML = `
      <div class="q-row-head">
        <span class="q-num">Question ${i+1}</span>
        <div class="q-actions">
          <button class="linkbtn" data-act="up" title="Move up">↑</button>
          <button class="linkbtn" data-act="down" title="Move down">↓</button>
          <button class="linkbtn danger" data-act="del" title="Delete">Delete</button>
        </div>
      </div>
      <span class="field-label">Prompt</span>
      <textarea data-f="q" rows="2"></textarea>
      <span class="field-label">Options · tick the correct answer</span>
      <div class="q-opts"></div>
      <span class="field-label">Myth note (shown after answering)</span>
      <textarea data-f="note" rows="2"></textarea>
    `;
    row.querySelector('textarea[data-f="q"]').value = q.q;
    row.querySelector('textarea[data-f="note"]').value = q.note;

    const optsEl = row.querySelector('.q-opts');
    q.options.forEach((o, k)=>{
      const optEl = document.createElement('div');
      optEl.className = 'q-opt' + (k===q.answer?' is-answer':'');
      optEl.innerHTML = `
        <input type="radio" name="ans-${i}" ${k===q.answer?'checked':''}>
        <span class="letter">${String.fromCharCode(65+k)}</span>
        <input type="text" data-k="${k}" placeholder="Option ${String.fromCharCode(65+k)}">
      `;
      optEl.querySelector('input[type=text]').value = o;
      optEl.querySelector('input[type=radio]').addEventListener('change', ()=>{
        q.answer = k;
        $$('#teacher-list .q-row')[i].querySelectorAll('.q-opt').forEach((e,idx)=>{
          e.classList.toggle('is-answer', idx===k);
        });
        persistDraft();
      });
      optEl.querySelector('input[type=text]').addEventListener('input', (e)=>{
        q.options[k] = e.target.value;
        persistDraft();
      });
      optsEl.appendChild(optEl);
    });

    row.querySelector('textarea[data-f="q"]').addEventListener('input', e=>{ q.q = e.target.value; persistDraft(); });
    row.querySelector('textarea[data-f="note"]').addEventListener('input', e=>{ q.note = e.target.value; persistDraft(); });

    row.querySelectorAll('.q-actions .linkbtn').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const act = btn.dataset.act;
        if(act==='del'){
          if(!confirm('Delete this question?')) return;
          draft.splice(i,1);
        } else if(act==='up' && i>0){
          [draft[i-1], draft[i]] = [draft[i], draft[i-1]];
        } else if(act==='down' && i<draft.length-1){
          [draft[i+1], draft[i]] = [draft[i], draft[i+1]];
        } else return;
        persistDraft();
        renderList();
      });
    });
    return row;
  }

  function addQuestion(){
    draft.push({ q: '', options: ['','','',''], answer: 0, note: '' });
    renderList();
    const list = $('#teacher-list');
    list.scrollTop = list.scrollHeight;
    const rows = list.querySelectorAll('.q-row');
    const last = rows[rows.length-1];
    if(last) last.querySelector('textarea[data-f="q"]').focus();
  }

  function resetCurrent(){
    if(!confirm('Restore the built-in questions for this set? Your edits will be lost.')) return;
    clearOverride(currentSetId);
    loadDraft(currentSetId);
    renderList();
    flashSaved();
    $$('#teacher-set option').forEach(o=>{
      const s = window.QUESTION_SETS[o.value];
      o.textContent = s.label + (hasOverride(s.id)?' · edited':'');
    });
  }

  // ---- shared ----
  function fmtTime(ms){
    const s = Math.round(ms/1000);
    const m = Math.floor(s/60);
    const r = s%60;
    return `${m}:${String(r).padStart(2,'0')}`;
  }
  function escapeHTML(s){ return String(s||'').replace(/[&<>"']/g, c=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c])); }

  // ---- Wire up ----
  document.addEventListener('DOMContentLoaded', ()=>{
    const openBtn = $('#btn-teacher');
    if(openBtn) openBtn.addEventListener('click', openOverlay);
    $('#teacher-close').addEventListener('click', closeOverlay);
    $('#teacher-done').addEventListener('click', ()=>{ closeOverlay(); });
    $('#teacher-logout').addEventListener('click', ()=>{
      authed = false;
      $('#teacher-dashboard').style.display='none';
      $('#teacher-gate').style.display='';
      $('#teacher-title').textContent = 'Password required';
    });
    $('#teacher-pw-go').addEventListener('click', tryAuth);
    $('#teacher-pw').addEventListener('keydown', e=>{ if(e.key==='Enter') tryAuth(); });

    // tabs
    $$('#teacher-dashboard .tab').forEach(t=>{
      t.addEventListener('click', ()=>switchTab(t.dataset.tab));
    });

    // roster
    const clrBtn = $('#roster-clear');
    if(clrBtn) clrBtn.addEventListener('click', ()=>{
      if(!confirm('Clear all roster entries? This cannot be undone.')) return;
      clearRoster(); renderRoster();
    });

    // questions
    $('#teacher-set').addEventListener('change', e=>{
      currentSetId = e.target.value;
      loadDraft(currentSetId);
      renderList();
    });
    $('#teacher-add').addEventListener('click', addQuestion);
    $('#teacher-reset').addEventListener('click', resetCurrent);

    $('#teacher-overlay').addEventListener('click', e=>{
      if(e.target.id==='teacher-overlay') closeOverlay();
    });
  });

  window.TEACHER = { getQuestions, hasOverride, recordRun };
})();
