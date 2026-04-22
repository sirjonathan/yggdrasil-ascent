// Tiny WebAudio SFX — no asset loading, synthesized on demand.
// Horn = low brass pulse. Branch snap = noise crack. Wolf growl = detuned saw.
(function(){
  let ctx;
  function C(){ if(!ctx) ctx = new (window.AudioContext||window.webkitAudioContext)(); return ctx; }
  let enabled = true;
  window.SFX = {
    enable(on){ enabled = on; localStorage.setItem('ragnarok.sfx', on?'1':'0'); },
    enabled(){ return enabled; },
    init(){
      const saved = localStorage.getItem('ragnarok.sfx');
      if(saved!==null) enabled = saved==='1';
    },
    horn(){
      if(!enabled) return;
      const a = C(); const t = a.currentTime;
      const o = a.createOscillator(), g = a.createGain();
      o.type='sawtooth'; o.frequency.setValueAtTime(80,t);
      o.frequency.exponentialRampToValueAtTime(160,t+.6);
      g.gain.setValueAtTime(.0001,t);
      g.gain.exponentialRampToValueAtTime(.35,t+.05);
      g.gain.exponentialRampToValueAtTime(.0001,t+1.1);
      const lp = a.createBiquadFilter(); lp.type='lowpass'; lp.frequency.value=900;
      o.connect(lp); lp.connect(g); g.connect(a.destination);
      o.start(t); o.stop(t+1.2);
    },
    ding(){
      if(!enabled) return;
      const a = C(); const t=a.currentTime;
      [660, 990].forEach((f,i)=>{
        const o=a.createOscillator(), g=a.createGain();
        o.type='sine'; o.frequency.value=f;
        g.gain.setValueAtTime(.0001,t+i*.02);
        g.gain.exponentialRampToValueAtTime(.22,t+i*.02+.01);
        g.gain.exponentialRampToValueAtTime(.0001,t+i*.02+.45);
        o.connect(g); g.connect(a.destination);
        o.start(t+i*.02); o.stop(t+i*.02+.5);
      });
    },
    snap(){
      if(!enabled) return;
      const a = C(); const t=a.currentTime;
      const buf = a.createBuffer(1, a.sampleRate*.25, a.sampleRate);
      const d = buf.getChannelData(0);
      for(let i=0;i<d.length;i++){
        const env = Math.pow(1-i/d.length, 3);
        d[i] = (Math.random()*2-1)*env;
      }
      const src = a.createBufferSource(); src.buffer=buf;
      const hp = a.createBiquadFilter(); hp.type='highpass'; hp.frequency.value=1200;
      const g = a.createGain(); g.gain.value=.45;
      src.connect(hp); hp.connect(g); g.connect(a.destination);
      src.start(t);
    },
    growl(){
      if(!enabled) return;
      const a = C(); const t=a.currentTime;
      const o = a.createOscillator(), o2 = a.createOscillator(), g = a.createGain();
      o.type='sawtooth'; o2.type='sawtooth';
      o.frequency.setValueAtTime(55,t);
      o2.frequency.setValueAtTime(58,t);
      o.frequency.linearRampToValueAtTime(75,t+.8);
      o2.frequency.linearRampToValueAtTime(78,t+.8);
      const lp = a.createBiquadFilter(); lp.type='lowpass'; lp.frequency.value=300;
      g.gain.setValueAtTime(.0001,t);
      g.gain.exponentialRampToValueAtTime(.35,t+.1);
      g.gain.exponentialRampToValueAtTime(.0001,t+.95);
      // tremolo
      const lfo = a.createOscillator(), lfoG = a.createGain();
      lfo.frequency.value=18; lfoG.gain.value=.15;
      lfo.connect(lfoG); lfoG.connect(g.gain);
      o.connect(lp); o2.connect(lp); lp.connect(g); g.connect(a.destination);
      o.start(t); o2.start(t); lfo.start(t);
      o.stop(t+1); o2.stop(t+1); lfo.stop(t+1);
    },
    tick(){
      if(!enabled) return;
      const a = C(); const t=a.currentTime;
      const o = a.createOscillator(), g = a.createGain();
      o.type='square'; o.frequency.value=1400;
      g.gain.setValueAtTime(.0001,t);
      g.gain.exponentialRampToValueAtTime(.12,t+.005);
      g.gain.exponentialRampToValueAtTime(.0001,t+.06);
      o.connect(g); g.connect(a.destination);
      o.start(t); o.stop(t+.08);
    }
  };
})();
