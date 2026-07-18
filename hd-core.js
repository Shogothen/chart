/* ============================================================
   HD-CORE – Human-Design-Berechnungskern
   Quellenlage (recherchiert & verifiziert):
   - Rave-Mandala-Anker: Tor 41 beginnt bei 02°00'00" Wassermann
     (= 302.0° ekliptikale Länge), Tor = 5.625°, Linie = 0.9375°
   - Design: exakt 88.0° Sonnenbogen vor der Geburt
   - Tropischer Tierkreis, geozentrisch, wahre (oskulierende) Mondknoten
   - 13 Aktivierungen: Sonne, Erde, Mond, Nord-/Südknoten,
     Merkur, Venus, Mars, Jupiter, Saturn, Uranus, Neptun, Pluto
   ============================================================ */
"use strict";
const A = require("astronomy-engine");

/* ---------- Rave-Mandala: Tor-Reihenfolge ab 302.0° ---------- */
const RAD = 302.0;
const WHEEL = [
  41,19,13,49,30,55,37,63,22,36,25,17,21,51,42,3,
  27,24, 2,23, 8,20,16,35,45,12,15,52,39,53,62,56,
  31,33, 7, 4,29,59,40,64,47, 6,46,18,48,57,32,50,
  28,44, 1,43,14,34, 9, 5,26,11,10,58,38,54,61,60
];
const GRAD_PRO_TOR = 360/64;        // 5.625
const GRAD_PRO_LINIE = GRAD_PRO_TOR/6; // 0.9375

function torUndLinie(elon){
  var off=(((elon-RAD)%360)+360)%360;
  /* Ganzzahlige Zerlegung: 64 Tore x 6 Linien x 6 Farben x 6 Toene x 5 Basen = 69120 */
  var idx=Math.floor(off/360*69120);
  if(idx<0)idx=0; if(idx>69119)idx=69119;
  var torIdx=Math.floor(idx/1080), r1=idx%1080;
  var linie=Math.floor(r1/180)+1, r2=r1%180;
  var farbe=Math.floor(r2/30)+1, r3=r2%30;
  var ton=Math.floor(r3/5)+1;
  var basis=(r3%5)+1;
  return {tor:WHEEL[torIdx],linie:linie,farbe:farbe,ton:ton,basis:basis,grad:elon};
}

/* ---------- Zentren & Kanäle ---------- */
const ZENTREN = {
  kopf:      [64,61,63],
  ajna:      [47,24,4,17,43,11],
  kehle:     [62,23,56,35,12,45,33,8,31,20,16],
  g:         [1,13,25,46,2,15,10,7],
  herz:      [21,40,26,51],
  sakral:    [34,5,14,29,59,9,3,42,27],
  milz:      [48,57,44,50,32,28,18],
  solarplexus:[36,22,37,6,49,55,30],
  wurzel:    [53,60,52,19,39,41,58,38,54]
};
const KANAELE = [
  [1,8],[2,14],[3,60],[4,63],[5,15],[6,59],[7,31],[9,52],
  [10,20],[10,34],[10,57],[11,56],[12,22],[13,33],[16,48],[17,62],
  [18,58],[19,49],[20,34],[20,57],[21,45],[23,43],[24,61],[25,51],
  [26,44],[27,50],[28,38],[29,46],[30,41],[32,54],[34,57],[35,36],
  [37,40],[39,55],[42,53],[47,64]
];
const TOR_ZU_ZENTRUM = {};
for(const [z,tore] of Object.entries(ZENTREN))
  for(const t of tore) TOR_ZU_ZENTRUM[t]=z;

const MOTOREN = ["herz","sakral","solarplexus","wurzel"];

/* ---------- Ephemeriden ---------- */


function eklLaenge(body, zeit){
  if(body === "Sun") return A.SunPosition(zeit).elon;
  const v = A.GeoVector(A.Body[body], zeit, true);
  return A.Ecliptic(v).elon;
}
/* Wahrer (oskulierender) aufsteigender Mondknoten:
   Knotenlinie = Schnitt der momentanen Mondbahnebene mit der Ekliptik */
function wahrerKnoten(zeit){
  const rot = A.Rotation_EQJ_ECT(zeit); // wahre Ekliptik des Datums
  const s = A.GeoMoonState(zeit); // Position+Geschwindigkeit, EQJ
  const p = A.RotateVector(rot, new A.Vector(s.x,s.y,s.z,zeit));
  const v = A.RotateVector(rot, new A.Vector(s.vx,s.vy,s.vz,zeit));
  // Bahnnormale h = p x v (ekliptikal)
  const hx = p.y*v.z - p.z*v.y;
  const hy = p.z*v.x - p.x*v.z;
  const hz = p.x*v.y - p.y*v.x;
  // Aufsteigender Knoten: n = z x h
  const nx = -hy, ny = hx;
  let lon = Math.atan2(ny,nx) * 180/Math.PI;
  return ((lon % 360) + 360) % 360;
}

/* ---------- Design-Zeitpunkt: Sonne exakt 88° früher ---------- */
function designZeit(geburt){
  const zielLon = (((eklLaenge("Sun", geburt) - 88) % 360) + 360) % 360;
  // Startschätzung: 88° / (360°/365.2422 d) ≈ 89.26 Tage zurück
  let t = geburt.AddDays(-88 * 365.2422/360);
  for(let i=0;i<40;i++){
    let diff = eklLaenge("Sun", t) - zielLon;
    diff = ((diff+540)%360)-180;
    if(Math.abs(diff) < 1e-7) break;
    // Sonnengeschwindigkeit ~0.9856°/Tag, Newton-Schritt
    t = t.AddDays(-diff/0.9856);
  }
  return t;
}

/* ---------- Aktivierungen ---------- */
const PLANETEN = [
  ["sonne","Sun"],["erde",null],["mond","Moon"],
  ["nordknoten","NODE"],["suedknoten","NODE_S"],
  ["merkur","Mercury"],["venus","Venus"],["mars","Mars"],
  ["jupiter","Jupiter"],["saturn","Saturn"],
  ["uranus","Uranus"],["neptun","Neptune"],["pluto","Pluto"]
];

function aktivierungen(zeit){
  const sonne = eklLaenge("Sun", zeit);
  const knoten = wahrerKnoten(zeit);
  const out = {};
  for(const [name, body] of PLANETEN){
    let lon;
    if(name==="sonne") lon = sonne;
    else if(name==="erde") lon = (sonne+180)%360;
    else if(name==="nordknoten") lon = knoten;
    else if(name==="suedknoten") lon = (knoten+180)%360;
    else lon = eklLaenge(body, zeit);
    out[name] = torUndLinie(lon);
  }
  return out;
}

/* ---------- Graph-Logik: Zentren, Typ, Autorität, Definition ---------- */
function analysiere(pers, des){
  const aktiveTore = new Set();
  for(const a of Object.values(pers)) aktiveTore.add(a.tor);
  for(const a of Object.values(des))  aktiveTore.add(a.tor);

  const definierteKanaele = KANAELE.filter(([a,b])=>aktiveTore.has(a)&&aktiveTore.has(b));
  const definierteZentren = new Set();
  for(const [a,b] of definierteKanaele){
    definierteZentren.add(TOR_ZU_ZENTRUM[a]);
    definierteZentren.add(TOR_ZU_ZENTRUM[b]);
  }

  /* Zusammenhangskomponenten über definierte Zentren */
  const nachbarn = {};
  for(const z of definierteZentren) nachbarn[z]=new Set();
  for(const [a,b] of definierteKanaele){
    const za=TOR_ZU_ZENTRUM[a], zb=TOR_ZU_ZENTRUM[b];
    if(za!==zb){ nachbarn[za].add(zb); nachbarn[zb].add(za); }
  }
  const gesehen=new Set(); let komponenten=[];
  for(const start of definierteZentren){
    if(gesehen.has(start))continue;
    const stapel=[start], komp=new Set();
    while(stapel.length){
      const z=stapel.pop();
      if(gesehen.has(z))continue;
      gesehen.add(z);komp.add(z);
      for(const n of nachbarn[z])stapel.push(n);
    }
    komponenten.push(komp);
  }

  const definition = ["Keine (Reflektor)","Einfache Definition","Gespaltene Definition",
    "Dreifach gespaltene Definition","Vierfach gespaltene Definition"][komponenten.length]||"Unbekannt";

  /* Motor->Kehle innerhalb derselben Komponente */
  const motorZurKehle = komponenten.some(k =>
    k.has("kehle") && MOTOREN.some(m=>k.has(m)));

  const sakral = definierteZentren.has("sakral");
  let typ, strategie, signatur, nichtSelbst;
  if(definierteZentren.size===0){
    typ="Reflektor";strategie="Einen Mondzyklus abwarten";signatur="Überraschung";nichtSelbst="Enttäuschung";
  }else if(sakral){
    typ=motorZurKehle?"Manifestierender Generator":"Generator";
    strategie="Reagieren";signatur="Zufriedenheit";nichtSelbst="Frustration";
  }else if(motorZurKehle){
    typ="Manifestor";strategie="Informieren";signatur="Frieden";nichtSelbst="Wut";
  }else{
    typ="Projektor";strategie="Auf Einladung warten";signatur="Erfolg";nichtSelbst="Verbitterung";
  }

  /* Autorität (Hierarchie) */
  let autoritaet;
  const inKompMit = (a,b)=>komponenten.some(k=>k.has(a)&&k.has(b));
  if(definierteZentren.has("solarplexus")) autoritaet="Emotional (Solarplexus)";
  else if(definierteZentren.has("sakral")) autoritaet="Sakral";
  else if(definierteZentren.has("milz")) autoritaet="Milz (Intuition)";
  else if(definierteZentren.has("herz")&&(inKompMit("herz","kehle")||typ==="Manifestor")) autoritaet="Ego (manifestiert)";
  else if(definierteZentren.has("herz")&&inKompMit("herz","g")) autoritaet="Ego (projiziert)";
  else if(definierteZentren.has("g")) autoritaet="Selbst-projiziert";
  else if(typ==="Reflektor") autoritaet="Lunar (Mondzyklus)";
  else autoritaet="Mental (Umgebung als Resonanzboden)";

  return { aktiveTore:[...aktiveTore].sort((a,b)=>a-b),
    definierteKanaele, definierteZentren:[...definierteZentren],
    komponenten:komponenten.map(k=>[...k]), definition,
    typ, strategie, signatur, nichtSelbst, autoritaet };
}

/* ---------- Profil & Inkarnationskreuz ---------- */
const RECHTS=["1/3","1/4","2/4","2/5","3/5","3/6","4/6"];
const LINKS=["5/1","5/2","6/2","6/3"];
function profilUndKreuz(pers,des){
  const profil = pers.sonne.linie+"/"+des.sonne.linie;
  let winkel;
  if(RECHTS.includes(profil)) winkel="Rechtswinkel-Kreuz";
  else if(LINKS.includes(profil)) winkel="Linkswinkel-Kreuz";
  else if(profil==="4/1") winkel="Juxtapositions-Kreuz";
  else winkel="(ungültiges Profil)";
  return { profil, winkel,
    kreuzTore:{ persSonne:pers.sonne.tor, persErde:pers.erde.tor,
                desSonne:des.sonne.tor,  desErde:des.erde.tor } };
}

/* ---------- Hauptfunktion ---------- */
function berechneChart(utcDate){
  const geburt = new A.AstroTime(utcDate);
  const design = designZeit(geburt);
  const pers = aktivierungen(geburt);
  const des  = aktivierungen(design);
  const analyse = analysiere(pers,des);
  const pk = profilUndKreuz(pers,des);
  return {
    geburtUTC: geburt.date.toISOString(),
    designUTC: design.date.toISOString(),
    personality: pers, design: des,
    ...analyse, ...pk
  };
}

module.exports = { berechneChart, torUndLinie, designZeit, wahrerKnoten,
  eklLaenge, aktivierungen, analysiere, profilUndKreuz,
  WHEEL, ZENTREN, KANAELE, TOR_ZU_ZENTRUM, RAD };
