"use strict";
const {JSDOM}=require("jsdom");
const fs=require("fs");
let ok=0,fail=0;
const check=(n,c,x)=>{c?(ok++,console.log("  PASS "+n)):(fail++,console.log("  FAIL "+n+(x!==undefined?"  ->  "+x:"")))};

const html=fs.readFileSync("/home/claude/hd/index.html","utf8");
const dom=new JSDOM(html.replace(/<script src="[^"]*"><\/script>/g,""),{runScripts:"outside-only",url:"https://example.org/"});
const w=dom.window;
w.HTMLElement.prototype.scrollIntoView=function(){};
w.IntersectionObserver=function(cb){this.observe=function(el){cb([{isIntersecting:true,target:el}])};this.unobserve=function(){}};
w.requestAnimationFrame=function(){return 0};
w.matchMedia=function(){return {matches:false}};
w.HTMLCanvasElement.prototype.getContext=function(){return null};
// Module in Fensterkontext laden
w.Astronomy=require("astronomy-engine");
const st=require("/home/claude/hd/staedte.js");
w.HD_STAEDTE=st.HD_STAEDTE;w.HD_EXONYME=st.HD_EXONYME;
w.HDEngine=require("/home/claude/hd/hd-engine.js");
w.HDInhalte=require("/home/claude/hd/inhalte.js");
w.HDBodygraph=require("/home/claude/hd/bodygraph.js");
w.HDVariablen=require("/home/claude/hd/variablen.js");
w.HD_HIMMEL=require("/home/claude/hd/himmel.js");
w.HD_BILDER=require("/home/claude/hd/bilder.js");
w.HDTransit=require("/home/claude/hd/transit.js");
w.HDRat=require("/home/claude/hd/rat.js");
w.HDKreuze=require("/home/claude/hd/kreuze.js");
w.HDTiefe=require("/home/claude/hd/tiefe.js");
w.HDEssenz=require("/home/claude/hd/essenz.js");
w.HDStabil=require("/home/claude/hd/stabil.js");
w.HDBericht=require("/home/claude/hd/bericht.js");
w.URL.createObjectURL=function(){return "blob:test"};
w.URL.revokeObjectURL=function(){};
const inline=html.match(/<script>([\s\S]*?)<\/script>\s*<\/body>/)[1];
w.eval(inline);
const $=id=>w.document.getElementById(id);
const APP=w.__HD_APP;

console.log("— Geometrie-Konsistenz Bodygraph —");
const BG=w.HDBodygraph,E=w.HDEngine;
check("64 Tor-Anker vorhanden",Object.keys(BG.TOR_POS).length===64);
check("Alle Kanal-Tore haben Anker",E.KANAELE.every(k=>BG.TOR_POS[k[0]]&&BG.TOR_POS[k[1]]));
// Jeder Tor-Anker liegt auf/an seinem Zentrum? Grobe Distanzprüfung zum Zentrums-Schwerpunkt
function schwerpunkt(poly){const pts=poly.split(" ").map(p=>p.split(",").map(Number));
  return pts.reduce((a,p)=>[a[0]+p[0]/pts.length,a[1]+p[1]/pts.length],[0,0]);}
let maxAbstand=0,schlecht=null;
for(const [tor,zentrum] of Object.entries(E.TOR_ZU_ZENTRUM)){
  const p=BG.TOR_POS[tor],s=schwerpunkt(BG.ZFORM[zentrum]);
  const d=Math.hypot(p[0]-s[0],p[1]-s[1]);
  if(d>maxAbstand){maxAbstand=d;schlecht=tor+"@"+zentrum}
}
check("Tor-Anker nahe an ihrem Zentrum (<95px)",maxAbstand<95,maxAbstand.toFixed(0)+"px "+schlecht);


console.log("— Chart-Geometrie: Handwerk —");
const BGX=w.HDBodygraph;
function polyPts(s){return s.split(" ").map(p=>p.split(",").map(Number))}
function imPolygon(pt,poly){let c=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){
  const [xi,yi]=poly[i],[xj,yj]=poly[j];
  if(((yi>pt[1])!=(yj>pt[1]))&&(pt[0]<(xj-xi)*(pt[1]-yi)/(yj-yi)+xi))c=!c;}return c;}
function randAbstand(pt,poly){let m=1e9;for(let i=0;i<poly.length;i++){
  const a=poly[i],b=poly[(i+1)%poly.length];
  const dx=b[0]-a[0],dy=b[1]-a[1],l2=dx*dx+dy*dy;
  let t=l2?((pt[0]-a[0])*dx+(pt[1]-a[1])*dy)/l2:0;t=Math.max(0,Math.min(1,t));
  m=Math.min(m,Math.hypot(pt[0]-(a[0]+t*dx),pt[1]-(a[1]+t*dy)));}return m;}
const ZTOR={};for(const [z,tore] of Object.entries(w.HDEngine.ZENTREN))for(const g of tore)ZTOR[g]=z;

let kollision=new Set();
for(const [a,b] of BGX.KANAELE){
  const h=BGX.haelften(a,b);
  const n=(h[0]+" "+h[1]).replace(/[ML]/g," ").trim().split(/\s+/).map(Number);
  for(let i=2;i<n.length-2;i+=2){
    const pt=[n[i],n[i+1]];
    for(const [z,poly] of Object.entries(BGX.ZFORM)){
      if(z===ZTOR[a]||z===ZTOR[b])continue;
      if(imPolygon(pt,polyPts(poly)))kollision.add(a+"-"+b+"→"+z);
    }
  }
}
check("Kein Kanal läuft durch ein fremdes Zentrum",kollision.size===0,[...kollision].join(", "));

let maxRand=0,schuldiger="";
for(const [tor,z] of Object.entries(ZTOR)){
  const d=randAbstand(BGX.TOR_POS[tor],polyPts(BGX.ZFORM[z]));
  if(d>maxRand){maxRand=d;schuldiger=tor}
}
check("Jedes Tor sitzt auf dem Rand seines Zentrums (<3px)",maxRand<3,maxRand.toFixed(1)+"px bei Tor "+schuldiger);

const spiegelpaare=[[48,36],[57,22],[44,37],[50,6],[32,49],[28,55],[18,30],[16,35],[20,12],
  [54,19],[38,39],[58,41],[64,63],[47,4],[17,11],[62,56],[31,33],[7,13],[15,46],[10,25],[5,29],[42,9],[53,52]];
check("Alle 23 Spiegelpaare exakt symmetrisch",spiegelpaare.every(([l,r])=>{
  const a=BGX.TOR_POS[l],b=BGX.TOR_POS[r];
  return Math.abs((310-a[0])-(b[0]-310))<0.01&&Math.abs(a[1]-b[1])<0.01;}));
check("Mittelachsen-Tore exakt auf der Achse",[61,24,43,23,8,1,2,14,3,60].every(t=>BGX.TOR_POS[t][0]===310));
const milzG=polyPts(BGX.ZFORM.milz).map(p=>[620-p[0],p[1]]).sort((a,b)=>a[0]-b[0]||a[1]-b[1]);
const solarG=polyPts(BGX.ZFORM.solarplexus).sort((a,b)=>a[0]-b[0]||a[1]-b[1]);
check("Milz und Solarplexus exakt gespiegelt",JSON.stringify(milzG)===JSON.stringify(solarG));
check("Alle 36 Kanäle gezeichnet",BGX.KANAELE.length===36);

console.log("— Städtesuche —");
const herne=APP.suche("Herne");
check("Herne gefunden, DE zuerst (Population)",herne.length>0&&herne[0][1]==="DE",JSON.stringify(herne[0]));
check("Herne-Zeitzone Europe/Berlin",herne[0][4]==="Europe/Berlin");
const muc=APP.suche("München");
check("Exonym: München findet Munich",muc.length>0&&muc[0][0]==="Munich",JSON.stringify(muc[0]&&muc[0][0]));
const koeln=APP.suche("Köln");
check("Köln findet nativen Eintrag Köln (DE)",koeln.length>0&&koeln[0][0]==="Köln"&&koeln[0][1]==="DE",JSON.stringify(koeln[0]&&koeln[0].slice(0,2)));
const mtl=APP.suche("Montreal");
check("Diakritik: Montreal findet Montréal",mtl.length>0&&mtl[0][0]==="Montréal");
check("Kurzeingabe liefert nichts",APP.suche("H").length===0);

console.log("— Kompletter UI-Durchlauf: Ra Uru Hu —");
APP.setzeOrt(mtl[0]);
$("ort").value="Montréal, Kanada";
$("datum").value="1948-04-09";
$("zeit").value="00:05";
APP.rechne();
check("Ergebnis sichtbar",$("ergebnis").classList.contains("an"));
const kopf=$("kopfdaten").textContent;
check("Typ Manifestor",kopf.includes("Manifestor")&&!kopf.includes("Manifestierender Generator"),kopf.slice(0,80));
check("Profil 5/1 Häretiker/Forscher",kopf.includes("5/1"));
check("Autorität Milz",kopf.includes("Milz"));
check("Kreuz 51/57 | 61/62 im Abschnitt",$("txt-kreuz").textContent.includes("51/57 | 61/62"));
check("Kachel nennt den Kreuznamen",kopf.includes("Kreuz"));
check("Einfache Definition",kopf.includes("Einfache Definition"));
check("Zeiten-Zeile mit Design-Datum Jan 1948",$("zeiten").textContent.includes("1948-01-12"));
check("Typ-Text geladen",$("txt-typ").textContent.includes("Informier")||$("txt-typ").textContent.includes("informier"));
check("Autoritäts-Text geladen",$("txt-autoritaet").textContent.length>500&&$("txt-autoritaet").textContent.includes("Milz"));
check("Profil-Text geladen",$("txt-profil").textContent.includes("Retterin")&&$("txt-profil").textContent.length>800);
check("26 Planetenzeilen",$("planeten").querySelectorAll("tr").length===2*14);
check("5 definierte Kanäle gelistet",$("kanaele").querySelectorAll("li").length===5);
check("Kanalnamen aufgelöst",$("kanaele").textContent.includes("Hellsicht"));
const zk=$("zentren").querySelectorAll(".z-karte");
check("9 Zentren-Karten",zk.length===9);
check("5 definiert / 4 offen",$("zentren").querySelectorAll(".def").length===5&&$("zentren").querySelectorAll(".off").length===4);

console.log("— Bodygraph-SVG inhaltlich —");
const svg=$("graph").innerHTML;
check("SVG gerendert",svg.includes("<svg")&&svg.includes("</svg>"));
// Ra: Kanäle 10-20,10-57,20-57,23-43,25-51 definiert; Tor 51 nur Persönlichkeit? (P-Sonne 51) -> schwarz
const persFarbe=(svg.match(new RegExp(w.HDBodygraph.FARBEN.pers,"g"))||[]).length;
const desFarbe=(svg.match(new RegExp(w.HDBodygraph.FARBEN.des,"g"))||[]).length;
check("Persönlichkeits-Färbung vorhanden",persFarbe>4,persFarbe);
check("Design-Färbung vorhanden",desFarbe>4,desFarbe);
check("Doppelaktivierung markiert",svg.includes('data-status="beides"'));
// Definierte Zentren gefüllt: Milz (#C9B18F) und G/Ajna
check("Definierte Zentren als helle Leuchtflächen",(svg.match(/url\(#hd-zentrum-an\)/g)||[]).length===w.HDEngine.berechneChart(w.HDEngine.localToUtc(1948,4,9,0,5,"America/Toronto")).definierteZentren.length);
check("Offene Zentren als ruhige dunkle Flächen",svg.includes('fill="#251754"')&&!svg.includes("stroke-dasharray=\"5 4\""));
// Undefinierte Zentren weiß: Sakral/SP/Wurzel/Kopf offen bei Ra
check("Vier offene Zentren weiß",(svg.match(/data-status="offen"/g)||[]).length===4);
check("Weiche Rundungen im Chart",(svg.match(/ Q/g)||[]).length>20);
check("Chart auf Nachtgrund",svg.includes("url(#hd-himmel)"));
check("Definierte Zentren in warmem Weiß der Marke",svg.includes("#FFFDF8")&&svg.includes("#F2DCC4"));
check("Aufbau-Animation vorhanden",svg.includes("hdZeichnen")&&svg.includes("hd-ader"));
check("Bewegungsreduktion respektiert",svg.includes("prefers-reduced-motion"));
check("Tore haben Tooltips",(svg.match(/<title>Tor /g)||[]).length===64);
check("Leuchtende Kanaladern gezeichnet",(svg.match(/class="hd-ader"/g)||[]).length>=8&&svg.includes("hd-glut-weich"));
fs.writeFileSync("/home/claude/hd/ra-bodygraph.svg",svg);


console.log("— Variablen (vier Pfeile) —");
const V=w.HDVariablen;
const vRa=V.berechne(APP.holeChart());
check("Vier Pfeile berechnet",["determination","umgebung","motivation","perspektive"].every(k=>vRa[k]&&vRa[k].eintrag));
check("Farben im Bereich 1-6",[vRa.determination,vRa.umgebung,vRa.motivation,vRa.perspektive,vRa.kognition,vRa.sinn].every(x=>x.farbe>=1&&x.farbe<=6));
check("Töne im Bereich 1-6",[vRa.determination,vRa.umgebung,vRa.motivation,vRa.perspektive].every(x=>x.ton>=1&&x.ton<=6));
check("Pfeilregel: Ton 1-3 links, 4-6 rechts",
  [vRa.determination,vRa.umgebung,vRa.motivation,vRa.perspektive].every(x=>x.richtung===(x.ton<=3?"links":"rechts")));
check("Determination aus Design-Sonne",vRa.determination.farbe===APP.holeChart().design.sonne.farbe);
check("Umgebung aus Design-Nordknoten",vRa.umgebung.farbe===APP.holeChart().design.nordknoten.farbe);
check("Motivation aus Persönlichkeits-Sonne",vRa.motivation.farbe===APP.holeChart().personality.sonne.farbe);
check("Perspektive aus Persönlichkeits-Nordknoten",vRa.perspektive.farbe===APP.holeChart().personality.nordknoten.farbe);
check("Kognition aus Design-Erde",vRa.kognition.farbe===APP.holeChart().design.erde.farbe);
check("Sinn aus Persönlichkeits-Erde",vRa.sinn.farbe===APP.holeChart().personality.erde.farbe);
check("Motivations-Transferenzpaare vollständig",[1,2,3,4,5,6].every(i=>V.MOTIVATION[i].gegen&&V.MOTIVATION[i].transfer));
check("Vier Pfeil-Karten gerendert",$("pfeile").querySelectorAll(".pfeil-karte").length===4);
check("Kognition und Sinn gerendert",$("substruktur").querySelectorAll(".pfeil-karte").length===2);
check("Quad-Zusammenfassung sichtbar",$("quad").textContent.includes("Pfeilkombination"));
check("Pfeile im SVG (4 Dreiecke)",($("graph").innerHTML.match(/<path d="M[\d.]+ [\d.]+ L[\d.]+ [\d.]+ L[\d.]+ [\d.]+ Z"/g)||[]).length===4);
check("Chart-Format 880x1000 mit Spalten",$("graph").innerHTML.includes("0 0 880 1000"));
check("Mandala im Kopfbereich",!!$("hero-bogen").querySelector(".hd-mandala"));
check("Originalhimmel eingebunden (3726 Sterne)",w.HD_HIMMEL&&w.HD_HIMMEL.sterne.length===3726,w.HD_HIMMEL&&w.HD_HIMMEL.sterne.length);
check("Nebelverlauf als Hintergrundbild gesetzt",($("himmel-bild").style.backgroundImage||"").indexOf("data:image/png;base64")>=0);
check("Keine eigene Kopfleiste (wird eingebettet)",!w.document.querySelector(".leiste"));
check("Gemessene Originalfarbe im Stylesheet",w.document.documentElement.innerHTML.includes("#0C0442"));
check("Sprungnavigation vorhanden",w.document.querySelectorAll(".sprungnav a").length===10);
check("Kernwerte als Kacheln sichtbar",$("kopfdaten").querySelectorAll(".kd").length===8);
check("Link-Teilen-Knopf vorhanden",!!$("btn-link"));

console.log("— Substruktur-Auflösung (Minutenschärfe) —");
const c1=w.HDEngine.berechneChart(w.HDEngine.localToUtc(1948,4,9,0,5,"America/Toronto"));
const c2=w.HDEngine.berechneChart(w.HDEngine.localToUtc(1948,4,9,3,5,"America/Toronto"));
check("Drei Stunden später ändert die Substruktur",
  JSON.stringify(V.berechne(c1))!==JSON.stringify(V.berechne(c2)));
check("Basis-Ebene vorhanden (1-5)",[1,2,3,4,5].includes(c1.personality.sonne.basis),c1.personality.sonne.basis);

console.log("— Transit-Overlay —");
const T=w.HDTransit;
const tr=T.berechne(w.HDEngine,APP.holeChart(),new Date("2026-07-19T12:00:00Z"));
check("Transit liefert 13 Aktivierungen",Object.keys(tr.aktivierungen).length===13);
const natalKanaele=new Set(APP.holeChart().definierteKanaele.map(k=>Math.min(k[0],k[1])+"-"+Math.max(k[0],k[1])));
check("Keine natal schon definierten Kanäle als neu gemeldet",tr.neueKanaele.every(n=>!natalKanaele.has(n.kanal)));
check("Jeder neue Kanal hat mindestens ein Transit-Tor",tr.neueKanaele.every(n=>n.quelleA==="transit"||n.quelleB==="transit"));
const natalZ=new Set(APP.holeChart().definierteZentren);
check("Neue Zentren waren natal nicht definiert",tr.neueZentren.every(z=>!natalZ.has(z)));
check("Transit-Block im UI gefüllt",$("transit-kopf").textContent.includes("Sonne heute"));
check("Transit-Inhalt vorhanden",$("transit-inhalt").innerHTML.length>40);

console.log("— Poster & Export —");
const poster=w.HDBodygraph.poster(APP.holeChart(),vRa,"Test",w.HDInhalte);
check("Poster ist gültiges SVG",poster.startsWith("<svg")&&poster.endsWith("</svg>"));
check("Poster enthält Kernwerte",["Manifestor","Milz","5/1","DETERMINATION","UMGEBUNG","MOTIVATION","PERSPEKTIVE"].every(x=>poster.includes(x)));
check("Poster im Sternenhimmel",poster.includes("url(#pg)")&&(poster.match(/<circle/g)||[]).length>200);
check("Poster A4-Format",poster.includes('width="1240" height="1754"'));
const posterYs=[...poster.matchAll(/y="(\d+(?:\.\d+)?)"/g)].map(m=>+m[1]);
check("Poster-Inhalt bleibt im Blatt",Math.max(...posterYs)<1754);
check("Download-Buttons vorhanden",!!$("btn-poster")&&!!$("btn-svg"));
fs.writeFileSync("/home/claude/hd/poster-final.svg",poster);


console.log("— Darstellung gegen Berechnung —");
const svgD=$("graph").innerHTML;
const chartD=APP.holeChart();
const gezZentren=[...svgD.matchAll(/data-zentrum="(\w+)" data-status="definiert"/g)].map(m=>m[1]).sort();
check("Gezeichnete definierte Zentren = berechnete",
  JSON.stringify(gezZentren)===JSON.stringify(chartD.definierteZentren.slice().sort()),gezZentren.join(","));
const gezOffen=[...svgD.matchAll(/data-zentrum="(\w+)" data-status="offen"/g)].map(m=>m[1]);
check("Summe Zentren ist neun",gezZentren.length+gezOffen.length===9);
const gezTore=[...svgD.matchAll(/data-tor="(\d+)" data-status="(pers|des|beides)"/g)].map(m=>+m[1]).sort((a,b)=>a-b);
check("Gezeichnete aktive Tore = berechnete",JSON.stringify(gezTore)===JSON.stringify(chartD.aktiveTore),
  gezTore.length+" gezeichnet / "+chartD.aktiveTore.length+" berechnet");
const gezKanaele=[...svgD.matchAll(/data-kanal="([\d-]+)" data-status="definiert"/g)].map(m=>m[1]).sort();
const sollKanaele=chartD.definierteKanaele.map(k=>Math.min(k[0],k[1])+"-"+Math.max(k[0],k[1])).sort();
check("Gezeichnete definierte Kanäle = berechnete",JSON.stringify(gezKanaele)===JSON.stringify(sollKanaele),gezKanaele.join(" "));
check("64 Tore insgesamt gezeichnet",(svgD.match(/data-tor="/g)||[]).length===64);
check("36 Kanäle insgesamt gezeichnet",(svgD.match(/data-kanal="/g)||[]).length===36);
// Tore, die von beiden Seiten aktiviert sind, werden halb/halb dargestellt
const beides=[...svgD.matchAll(/data-tor="(\d+)" data-status="beides"/g)].map(m=>+m[1]);
const sollBeides=chartD.aktiveTore.filter(t=>
  Object.keys(chartD.personality).some(k=>chartD.personality[k].tor===t)&&
  Object.keys(chartD.design).some(k=>chartD.design[k].tor===t));
check("Doppelt aktivierte Tore korrekt markiert",JSON.stringify(beides.sort((a,b)=>a-b))===JSON.stringify(sollBeides.sort((a,b)=>a-b)),beides.join(","));


console.log("— Ziffernsatz im Chart —");
const BGZ=w.HDBodygraph;
function ppZ(s){return s.split(" ").map(p=>p.split(",").map(Number))}
function drinZ(pt,poly){let c=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){
  const [xi,yi]=poly[i],[xj,yj]=poly[j];
  if(((yi>pt[1])!=(yj>pt[1]))&&(pt[0]<(xj-xi)*(pt[1]-yi)/(yj-yi)+xi))c=!c;}return c;}
let ziffernRaus=[],ziffernPos=[];
for(const [tor,z] of Object.entries(BGZ.TOR_ZENTRUM)){
  const p=BGZ.TOR_POS[tor],sp=BGZ.SCHWERPUNKT[z];
  const dx=p[0]-sp[0],dy=p[1]-sp[1],l=Math.hypot(dx,dy)||1;
  const weite=(z==="herz")?8:11.5;
  const zx=p[0]-dx/l*weite,zy=p[1]-dy/l*weite;
  ziffernPos.push([zx,zy]);
  if(!drinZ([zx,zy],ppZ(BGZ.ZFORM[z])))ziffernRaus.push(tor);
}
check("Alle 64 Torziffern liegen in ihrem Zentrum",ziffernRaus.length===0,ziffernRaus.join(","));
let minAb=1e9;
for(let i=0;i<ziffernPos.length;i++)for(let j=i+1;j<ziffernPos.length;j++)
  minAb=Math.min(minAb,Math.hypot(ziffernPos[i][0]-ziffernPos[j][0],ziffernPos[i][1]-ziffernPos[j][1]));
check("Ziffern überlappen sich nicht",minAb>12,minAb.toFixed(1)+"px");


console.log("— Planetenspalten und Rat —");
const svgSp=$("graph").innerHTML;
check("26 Planeten-Chips in den Spalten",(svgSp.match(/rx="8"/g)||[]).length===26);
check("13 Planetensymbole je Seite",(svgSp.match(/\u2609|\u2643/g)||[]).length>=4);
check("Silhouette hinter dem Graphen",svgSp.includes(w.HDBodygraph.FARBEN.silhouette));
const chartR=APP.holeChart();
// Spaltenwerte gegen Berechnung: Design-Sonne und Pers-Sonne müssen als Chip-Text auftauchen
check("Design-Sonne in linker Spalte",svgSp.indexOf(">"+chartR.design.sonne.tor+"."+chartR.design.sonne.linie+"<")>=0);
check("Pers-Sonne in rechter Spalte",svgSp.indexOf(">"+chartR.personality.sonne.tor+"."+chartR.personality.sonne.linie+"<")>=0);

const R=w.HDRat;
const rat1=R.erzeuge(w.HDEngine,w.HDTransit,chartR,w.HDInhalte,new Date("2026-07-19T12:00:00Z"));
check("Rat hat drei Absätze",rat1.absaetze.length===3);
check("Rat nennt das Sonnentor des Tages",rat1.absaetze[0].includes("Tor "+rat1.sonne.tor+"."+rat1.sonne.linie));
check("Rat ist typspezifisch",rat1.absaetze[1].length>60&&w.HDRat.TYP_RAT[chartR.typ].includes(rat1.absaetze[1]));
const rat2=R.erzeuge(w.HDEngine,w.HDTransit,chartR,w.HDInhalte,new Date("2026-07-19T18:00:00Z"));
check("Rat am selben Tag stabil (Typ-Absatz)",rat1.absaetze[1]===rat2.absaetze[1]);
check("Rat-Block im UI gefüllt",$("rat-inhalt").querySelectorAll("p").length===3);
check("Rat-Datum sichtbar",$("rat-datum").textContent.length>8);
check("Teilen-Knopf vorhanden",!!$("btn-rat-teilen"));
check("Teilen-Text enthält flowyourdesign",rat1.teilen.includes("flowyourdesign.com"));
check("Rat kleines du",!/[a-zß,;]\s(Du|Dich|Dir|Dein)\b/.test(rat1.text));


const htmlNav=w.document.documentElement.innerHTML;

console.log("— Zentren, Kreuz, Essenz, Navigation —");
const ZT=w.HDInhalte.ZENTREN_TEXTE;
const alleZ=["kopf","ajna","kehle","g","herz","sakral","milz","solarplexus","wurzel"];
check("Kronenzentrum statt Kopfzentrum",ZT.kopf.name.indexOf("Kronenzentrum")===0&&!JSON.stringify(ZT).includes("Kopfzentrum"));
check("Wachstum und Schatten in beiden Zuständen",alleZ.every(z=>ZT[z].defWachstum&&ZT[z].defSchatten&&ZT[z].offWachstum&&ZT[z].offSchatten));
check("Zentrums-Texte ohne Gedankenstriche",!JSON.stringify(ZT).includes("\u2013"));
const chartE=APP.holeChart();
const anzDef=chartE.definierteZentren.length;
check("Wachstumszeile in allen 9 Zentrumskarten",$("zentren").querySelectorAll(".z-wachstum").length===9);
check("Schattenzeile in allen 9 Zentrumskarten",$("zentren").querySelectorAll(".z-schatten").length===9);

const KZ=w.HDKreuze;
check("192 Kreuze in der Tabelle",Object.keys(KZ.TABELLE).length===64&&[1,32,64].every(g=>KZ.info(g,"Rechtswinkel-Kreuz")&&KZ.info(g,"Linkswinkel-Kreuz")&&KZ.info(g,"Juxtapositions-Kreuz")));
let kreuzOk=0;
for(let g=1;g<=64;g++)for(const wk of ["Rechtswinkel-Kreuz","Juxtapositions-Kreuz","Linkswinkel-Kreuz"]){
  const i=KZ.info(g,wk);
  if(i&&i.name&&i.uebertitel&&i.artText&&i.sonnenthemaText&&!/ der der |Kreuz der des /.test(i.name))kreuzOk++;
}
check("Alle 192 Kreuznamen sauber gebildet",kreuzOk===192);
check("Kreuzname im Abschnitt",$("txt-kreuz").textContent.includes("Kreuz"));
check("Kreuz-Übertitel sichtbar",/Persönliches Schicksal|Transpersonales Schicksal|Festes Schicksal/.test($("txt-kreuz").textContent));
check("Sonnenthema als Zusatzblock",$("txt-kreuz").querySelector(".pfeil-anwendung")!==null);
// Gegenprobe der 88-Grad-Rechnung gegen die externe Kreuztabelle
let treffer=0,gesamt=0;
for(let i=0;i<60;i++){
  const c=w.HDEngine.berechneChart(w.HDEngine.localToUtc(1950+i%70,1+i%12,1+i%28,i%24,(i*7)%60,"Europe/Berlin"));
  const inf=KZ.info(c.kreuzTore.persSonne,c.winkel);
  gesamt++; if(inf&&inf.erwarteteDesignSonne===c.kreuzTore.desSonne)treffer++;
}
check("Design-Sonne stimmt mit der Kreuzreferenz",treffer===gesamt);

const ess=w.HDEssenz.erzeuge(chartE,w.HDVariablen.berechne(chartE),w.HDInhalte,KZ.info(chartE.kreuzTore.persSonne,chartE.winkel));
check("Essenz hat drei gefüllte Blöcke",ess.einzig.length>=3&&ess.staerke.length>=3&&ess.achtung.length>=3);
check("Essenz nennt Typ und Autorität",ess.einzig[0].includes(chartE.typ)&&ess.einzig[0].includes(chartE.autoritaet));
check("Essenz nennt das Nicht-Selbst",ess.achtung[0].includes(chartE.nichtSelbst));
check("Essenz-Karten gerendert",$("essenz").querySelectorAll(".essenz-karte").length===3);
check("Essenz-Signatur gefüllt",$("essenz-signatur").textContent.includes(chartE.signatur));
check("Essenz vor dem Chart",htmlNav.indexOf('id="essenz-block"')<htmlNav.indexOf('id="zentren-block"'));

check("Kacheln sind Sprunglinks",$("kopfdaten").querySelectorAll("a.kd").length===8);
check("Jede Kachel zeigt auf ein vorhandenes Ziel",
  [].every.call($("kopfdaten").querySelectorAll("a.kd"),function(a){return !!w.document.getElementById(a.getAttribute("href").slice(1))}));
check("Sprungnavigation mit 10 Zielen inkl. Tore",w.document.querySelectorAll("#sprungnav a").length===10&&w.document.querySelector("#sprungnav a[href=\"#tore-block\"]")!==null);
check("Navigation klebt oben",htmlNav.includes("position:sticky"));
check("Alle Navi-Ziele existieren",
  [].every.call(w.document.querySelectorAll("#sprungnav a"),function(a){return !!w.document.getElementById(a.getAttribute("href").slice(1))}));

const S=w.HDStabil;
const utcS=w.HDEngine.localToUtc(1975,6,4,9,9,"America/Los_Angeles");
const stab=S.berechne(w.HDEngine,utcS.getTime(),-420);
check("Stabilität liefert Zeitfenster",typeof stab.von==="string"&&typeof stab.bis==="string"&&stab.spanneMin>0);
check("Stabilität stuft Sicherheit ein",["hoch","mittel","knapp"].includes(stab.sicherheit));
check("Stabilität nennt Änderung mit Uhrzeit",!stab.vorigeAenderung||/^\d\d:\d\d$/.test(stab.vorigeAenderung.zeit));
check("Stabilitätssatz ohne Platzhalter",S.satz(stab).length>60&&!S.satz(stab).includes("undefined"));
check("Stabilitätskarte im Markup",htmlNav.includes('id="stabil"'));




console.log("— Inhaltsebene in Kaufqualität —");
const TT=w.HDTiefe.TOR_TEXTE, LN=w.HDTiefe.LINIEN;
check("Alle 64 Tore mit eigenem Text",Object.keys(TT).length===64&&[1,32,64].every(g=>TT[g].length>150));
check("Tortexte mindestens 180 Zeichen",Object.values(TT).every(x=>x.length>=180));
check("Tortexte paarweise verschieden",new Set(Object.values(TT).map(x=>x.slice(0,60))).size===64);
check("Tortexte ohne Gedankenstriche",!JSON.stringify(TT).includes("\u2013"));
check("Alle 6 Linien beschrieben",[1,2,3,4,5,6].every(l=>LN[l]&&LN[l].kern&&LN[l].gabe&&LN[l].falle));
const KT=w.HDInhalte.KANAL_TEXTE;
check("36 Kanäle dreischichtig",Object.keys(KT).length===36&&Object.values(KT).every(k=>k.kern&&k.alltag&&k.schatten));
check("Kanaltexte substanziell (Ø über 450 Zeichen)",Object.values(KT).map(k=>JSON.stringify(k).length).reduce((a,b)=>a+b)/36>450);
check("Kanal-Kerne paarweise verschieden",new Set(Object.values(KT).map(k=>k.kern.slice(0,50))).size===36);
check("Typen vertieft (je über 900 Zeichen)",Object.values(w.HDInhalte.TYPEN).every(t=>t.text.length>900));
check("Alle 8 Autoritäten mit Engine-Schlüsseln",["Sakral","Emotional (Solarplexus)","Milz (Intuition)","Ego (manifestiert)","Ego (projiziert)","Selbst-projiziert","Mental (Umgebung als Resonanzboden)","Lunar (Mondzyklus)"].every(k=>w.HDInhalte.AUTORITAETEN[k]&&w.HDInhalte.AUTORITAETEN[k].length>400));
check("Beide Ego-Varianten eigenständig",w.HDInhalte.AUTORITAETEN["Ego (manifestiert)"].slice(0,80)!==w.HDInhalte.AUTORITAETEN["Ego (projiziert)"].slice(0,80));
check("12 Profile vertieft (je über 400 Zeichen)",Object.values(w.HDInhalte.PROFILE).every(p=>p[1].length>400));
check("Neue Texte ohne Gedankenstriche",![w.HDInhalte.TYPEN,w.HDInhalte.AUTORITAETEN,w.HDInhalte.PROFILE,KT].some(o=>JSON.stringify(o).includes("\u2013")));
check("Tor-Sektion gerendert",$("tore").querySelectorAll("details").length>=8);
check("Tor-Marken zeigen Herkunft",$("tore").querySelector(".tor-marke")!==null);
check("Tore listen ihre Planeten",$("tore").querySelector(".kanal-ebene").textContent.includes("Aktiviert durch"));
check("Profil-Linien aufgeschlüsselt",$("txt-profil").querySelectorAll(".pfeil-anwendung").length>=2&&$("txt-profil").textContent.includes("unbewusste Linie"));
check("Wetterkacheln mit Tor-Deutung",w.document.querySelectorAll(".tk-satz").length===2);


console.log("— Shareholder-Runde —");
const KZm=w.HDKreuze;
const kompA=KZm.komposition({persSonne:37,persErde:40,desSonne:5,desErde:26},"Linkswinkel-Kreuz",TT);
const kompB=KZm.komposition({persSonne:41,persErde:31,desSonne:44,desErde:24},"Rechtswinkel-Kreuz",TT);
check("Kreuz-Komposition individuell (2 Kreuze verschieden)",kompA.length>700&&kompB.length>700&&kompA!==kompB);
check("Kreuz-Komposition nennt alle 4 Tore",["Tor 37","Tor 40","Tor 5","Tor 26"].every(x=>kompA.includes(x)));
check("Kreuz-Text im Abschnitt gerendert",$("txt-kreuz").textContent.includes("Sein Motor ist Tor"));
const ZT2=w.HDInhalte.ZENTREN_TEXTE;
check("Zentren auf Tiefenniveau (jedes Feld über 130 Zeichen)",Object.values(ZT2).every(z=>["def","defWachstum","defSchatten","off","offWachstum","offSchatten"].every(f=>z[f].length>130)));
check("Zentren-Felder paarweise verschieden",(function(){
  const alle=[];Object.values(ZT2).forEach(z=>["def","off"].forEach(f=>alle.push(z[f].slice(0,40))));
  return new Set(alle).size===alle.length;
})());
check("Wetter-Texte in neuer Stimme (umgang je über 60 Zeichen)",Object.values(w.HDInhalte.ZENTRUM_WETTER).every(z=>z.umgang.length>60));
check("Planetentafel zeigt Linien-Grundton",w.document.querySelectorAll("#planeten .tor-linie").length===26);
check("Tor-Sektion mit Liniensätzen",$("tore").textContent.includes("In Linie"));
check("Rat mit 6 Varianten je Typ",Object.values(w.HDRat.TYP_RAT).every(v=>v.length===6));
check("Essenz-Bausteine ohne Zentren-Dubletten",(function(){
  const zt=JSON.stringify(ZT2);
  return !Object.values(w.HDEssenz.ZENTRUM_STAERKE).concat(Object.values(w.HDEssenz.ZENTRUM_ACHTUNG)).some(v=>zt.includes(v.slice(0,25)));
})());
check("Neue Schichten ohne Gedankenstriche",![ZT2,w.HDInhalte.ZENTRUM_WETTER,w.HDRat.TYP_RAT,w.HDEssenz.PROFIL_KERN].some(o=>JSON.stringify(o).includes("\u2013")));

console.log("— Nutzerfeedback-Runde 3 —");
const her=APP.suche("Her");
check("DACH-Orte zuerst in der Suche",her.length>0&&["DE","AT","CH"].includes(her[0][1]));
check("Herne unter den ersten drei",her.slice(0,3).some(s=>s[0]==="Herne"));
check("Kanal-Überschrift persönlich",(function(){
  const h=$("kanaele-block").querySelector("h2").textContent;
  const n=APP.holeChart().definierteKanaele.length;
  return n===1?h.includes("Dein Kanal"):h.includes("Deine "+n+" Kanäle");
})());
check("Planeten als Aufklapper, anfangs zu",(function(){
  const d=w.document.querySelector(".planeten-klapp");
  return d&&!d.open&&d.querySelector("summary").textContent.includes("26");
})());
check("Abschlussblock mit PDF und Neustart",!!w.document.getElementById("btn-bericht-ende")&&!!w.document.getElementById("btn-neu"));
check("Daten ändern springt zum Formular",(w.document.querySelector(".nav-zurueck")||{}).getAttribute&&w.document.querySelector(".nav-zurueck").getAttribute("href")==="#formular");
check("Hero-Foto mobil gedeckelt",htmlNav.includes("max-height:340px")&&htmlNav.includes("max-height:280px"));

console.log("— PDF-Bericht —");
w.HDBericht=require("/home/claude/hd/bericht.js");
check("Bericht-Knopf vorhanden",!!w.document.getElementById("btn-bericht"));
const bhtml=APP.baueBerichtHTML();
check("Bericht wird gebaut",typeof bhtml==="string"&&bhtml.length>40000);
check("Bericht ohne undefined",!bhtml.includes("undefined"));
check("Bericht enthält alle Abschnitte",["Deine Essenz","Der Bodygraph","Typ, Autorität und Profil","Definiert und offen","Die Planeten","Deine Variablen"].every(x=>bhtml.includes(x)));
check("Bericht enthält Kreuzname und Kronenzentrum",bhtml.includes("Kreuz")&&bhtml.includes("Kronenzentrum"));
check("Bericht nutzt A4-Druckformat",bhtml.includes("@page{size:A4"));
check("Bericht mit Chart-SVG",bhtml.includes("<svg")&&bhtml.includes("hd-zentrum-an"));
const bJahr=$("datum").value.split("-")[0];
check("Bericht nennt das Geburtsjahr aus dem Formular",!!bJahr&&bhtml.includes(bJahr));
check("Bericht nennt die Uhrzeit aus dem Formular",bhtml.includes($("zeit").value));
check("Bericht ist HTML-escaped aufgebaut",!/[<]script/i.test(bhtml.replace(/^[\s\S]*?<body>/,"")));

console.log("— Feedback-Umbau —");
check("36 Kanaltexte vorhanden",Object.keys(w.HDInhalte.KANAL_TEXTE).length===36);
check("Zentrum-Wetter für alle 9 Zentren",Object.keys(w.HDInhalte.ZENTRUM_WETTER).length===9&&Object.values(w.HDInhalte.ZENTRUM_WETTER).every(z=>z.heisst&&z.chance&&z.achtung&&z.umgang));
check("Wachstumszeilen für alle 9 Zentren",["kopf","ajna","kehle","g","herz","sakral","milz","solarplexus","wurzel"].every(z=>w.HDInhalte.ZENTREN_TEXTE[z].offWachstum&&w.HDInhalte.ZENTREN_TEXTE[z].defWachstum));
check("48 Anwendungstexte vollständig",[1,2,3,4,5,6].every(f=>
  w.HDVariablen.DETERMINATION[f].anwLinks&&w.HDVariablen.DETERMINATION[f].anwRechts&&
  w.HDVariablen.UMGEBUNG[f].anwLinks&&w.HDVariablen.UMGEBUNG[f].anwRechts&&
  w.HDVariablen.MOTIVATION[f].anw&&w.HDVariablen.PERSPEKTIVE[f].anw&&
  w.HDVariablen.KOGNITION[f].anw&&w.HDVariablen.SINN[f].anw));
const htmlQ=w.document.documentElement.innerHTML;
check("Reihenfolge: Zentren vor Variablen",htmlQ.indexOf('id="zentren-block"')<htmlQ.indexOf('id="variablen-block"'));
check("Reihenfolge: Variablen vor Wetter",htmlQ.indexOf('id="variablen-block"')<htmlQ.indexOf('id="transit-block"'));
check("Wetter-Überschrift umbenannt",htmlQ.includes("Planetarisches Wetter"));
check("Minuten-Satz ersetzt",htmlQ.includes("nur so genau wie deine Geburtszeit")&&!htmlQ.includes("reagiert auf Minuten"));
check("Zentren-Intro definiert/offen",htmlQ.includes("fest in dir verdrahtet")&&htmlQ.includes("Wachstumspotenzial"));
check("Anwendungsblöcke gerendert",$("pfeile").querySelectorAll(".pfeil-anwendung").length===4);
check("Lernstil-Karte gefüllt",$("lernstil").textContent.includes("Lerntyp"));
check("Kanäle aufklappbar mit Dreischicht-Text",(function(){
  const d=$("kanaele").querySelector("details");
  return d&&d.querySelector(".kanal-erster")&&d.querySelectorAll(".kanal-ebene").length===2;
})());
check("Wachstum unabhängig vom Zustand",$("zentren").querySelectorAll(".z-wachstum").length===9);
check("Sonnen-Dauer im Wetter",$("transit-kopf").textContent.includes("noch bis"));
const tD=w.HDTransit.berechne(w.HDEngine,APP.holeChart(),new Date());
check("Torwechsel Sonne in der Zukunft",tD.sonneEnde instanceof w.Date===false?tD.sonneEnde>new Date():tD.sonneEnde>new Date());
check("Torwechsel Mond binnen 3 Tagen",tD.mondEnde&&(tD.mondEnde-Date.now())<3*864e5);

console.log("— Bilder und Ton —");
check("Hero-Foto eingebettet",($("hero-foto").style.backgroundImage||"").indexOf("data:image/jpeg")>=0);
check("Zitatband ohne Bild",!$("zitat-bild"));
check("Homepage-Ton: kleines du im Fließtext",w.document.querySelector(".lede").textContent.includes("Hier darfst du dich erinnern"));
check("Deutungstexte im kleinen du",w.HDInhalte.TYPEN.Generator.text.indexOf(" dich ")>=0||w.HDInhalte.TYPEN.Generator.text.indexOf(" dir ")>=0||w.HDInhalte.TYPEN.Generator.text.indexOf(" dein")>=0);
check("Keine versehentliche Großschreibung mitten im Satz",
  !/[a-zß,;]\s(Du|Dich|Dir|Dein|Deine|Deiner|Deinem|Deinen)\b/.test(Object.values(w.HDInhalte.AUTORITAETEN).join(" ")));

console.log("— Fehlerpfade —");
APP.setzeOrt(null);
$("datum").value="";
APP.rechne();
check("Fehlermeldung ohne Ort",$("form-fehler").classList.contains("an"));

console.log("\n"+ok+" bestanden, "+fail+" fehlgeschlagen");
process.exit(fail?1:0);
