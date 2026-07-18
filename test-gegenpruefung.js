/* Unabhängige Gegenprüfung der Rechenkette */
const E=require('./hd-engine.js'),V=require('./variablen.js');
let ok=0,fail=0;
const p=(n,c,x)=>{c?(ok++,console.log('  PASS '+n)):(fail++,console.log('  FAIL '+n+(x!==undefined?' -> '+x:'')))};
/* korrekt normalisierter Winkelabstand */
const dist=(a,b)=>Math.abs(((a-b+540)%360)-180);

console.log('— Rechenkette —');
const c=E.berechneChart(E.localToUtc(1988,3,17,7,45,'Europe/Berlin'));
p('Erde steht exakt gegenüber der Sonne',Math.abs(180-dist(c.personality.erde.grad,c.personality.sonne.grad))<1e-9);
p('Design-Erde ebenso',Math.abs(180-dist(c.design.erde.grad,c.design.sonne.grad))<1e-9);
p('Südknoten exakt gegenüber Nordknoten',Math.abs(180-dist(c.personality.suedknoten.grad,c.personality.nordknoten.grad))<1e-9);
let bogen=((c.personality.sonne.grad-c.design.sonne.grad)%360+360)%360;
p('Sonnenbogen exakt 88°',Math.abs(bogen-88)<1e-4,bogen.toFixed(7));
p('Profil folgt den Sonnenlinien',c.profil===c.personality.sonne.linie+'/'+c.design.sonne.linie);
p('Kanäle nur bei zwei aktiven Toren',c.definierteKanaele.every(k=>c.aktiveTore.includes(k[0])&&c.aktiveTore.includes(k[1])));
const ausK=new Set();c.definierteKanaele.forEach(k=>{ausK.add(E.TOR_ZU_ZENTRUM[k[0]]);ausK.add(E.TOR_ZU_ZENTRUM[k[1]])});
p('Zentren = Zentren der definierten Kanäle',JSON.stringify([...ausK].sort())===JSON.stringify(c.definierteZentren.slice().sort()));
p('Typlogik konsistent',c.definierteZentren.includes('sakral')?c.typ.includes('Generator'):!c.typ.includes('Generator'));
const v=V.berechne(c);
p('Determination = Farbe der Design-Sonne',v.determination.farbe===c.design.sonne.farbe);
p('Pfeilrichtung folgt dem Ton',['determination','umgebung','motivation','perspektive'].every(k=>v[k].richtung===(v[k].ton<=3?'links':'rechts')));

console.log('— Stichprobe über 1000 zufällige Geburten —');
let fehler=0,typen={};
for(let i=0;i<1000;i++){
  const j=new Date(Date.UTC(1930+Math.floor(Math.random()*95),Math.floor(Math.random()*12),1+Math.floor(Math.random()*28),Math.floor(Math.random()*24),Math.floor(Math.random()*60)));
  const ch=E.berechneChart(j);
  typen[ch.typ]=(typen[ch.typ]||0)+1;
  let b=((ch.personality.sonne.grad-ch.design.sonne.grad)%360+360)%360;
  if(Math.abs(b-88)>1e-4)fehler++;
  if(Math.abs(180-dist(ch.personality.erde.grad,ch.personality.sonne.grad))>1e-9)fehler++;
  if(ch.aktiveTore.some(t=>t<1||t>64))fehler++;
  if(!/^[1-6]\/[1-6]$/.test(ch.profil))fehler++;
  if(ch.definierteKanaele.some(k=>!ch.aktiveTore.includes(k[0])||!ch.aktiveTore.includes(k[1])))fehler++;
  const vv=V.berechne(ch);
  if([vv.determination,vv.umgebung,vv.motivation,vv.perspektive].some(x=>x.farbe<1||x.farbe>6||x.ton<1||x.ton>6))fehler++;
}
p('1000 Charts ohne Regelverstoß',fehler===0,fehler+' Verstöße');
console.log('  Typverteilung:',Object.entries(typen).sort((a,b)=>b[1]-a[1]).map(([k,n])=>k+' '+(100*n/1000).toFixed(1)+'%').join(', '));
console.log('\n'+ok+' bestanden, '+fail+' fehlgeschlagen');
process.exit(fail?1:0);
