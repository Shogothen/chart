"use strict";
const HD = require("./hd-core.js");
const A = require("astronomy-engine");
let ok=0,fail=0;
const check=(n,c,x)=>{c?(ok++,console.log("  PASS "+n)):(fail++,console.log("  FAIL "+n+(x!==undefined?"  ->  "+x:"")))};

console.log("— Systemtabellen: interne Konsistenz —");
check("64 Tore im Rad, keine Duplikate",new Set(HD.WHEEL).size===64&&HD.WHEEL.length===64);
const alleZentrenTore=Object.values(HD.ZENTREN).flat();
check("64 Tore in Zentren, jedes genau einmal",new Set(alleZentrenTore).size===64&&alleZentrenTore.length===64);
check("36 Kanäle",HD.KANAELE.length===36&&new Set(HD.KANAELE.map(k=>k.slice().sort((a,b)=>a-b).join("-"))).size===36);
check("Jeder Kanal verbindet zwei verschiedene Zentren",
  HD.KANAELE.every(([a,b])=>HD.TOR_ZU_ZENTRUM[a]&&HD.TOR_ZU_ZENTRUM[b]&&HD.TOR_ZU_ZENTRUM[a]!==HD.TOR_ZU_ZENTRUM[b]));
check("Jedes Tor liegt in mindestens einem Kanal",
  HD.WHEEL.every(t=>HD.KANAELE.some(([a,b])=>a===t||b===t)));

console.log("— Mandala gegen publizierte Gradtabellen —");
// Quelle barneyandflow/bonniesorsby: Tor 41 = 2°00 Wassermann, Tor 13 = 13°15–18°52'30 Wassermann,
// Tor 55 = 0°07'30–5°45 Fische, Tor 36 = 22°37'30–28°15 Fische, Tor 60 endet 2°00 Wassermann
const beisp=[
  [302.0+0.001,41,1],        // 2°00'00" Aq -> 41.1
  [300+13.25+0.001,13,1],    // 13°15' Aq -> Tor 13 Linie 1
  [300+18.874,13,6],         // kurz vor 18°52'30" -> 13.6
  [330+0.126,55,1],          // 0°07'30" Fische -> 55.1
  [330+22.626,36,1],         // 22°37'30" Fische -> 36.1
  [301.999,60,6],            // kurz vor 2° Aq -> 60.6
  [0.0,25,4]                 // 0° Widder liegt in Tor 25 (28°15 Fi–3°52'30 Wi), Linie 4? prüfen unten
];
for(const [lon,tor,linie] of beisp.slice(0,6)){
  const r=HD.torUndLinie(lon);
  check(`Mandala ${lon.toFixed(3)}° -> Tor ${tor}.${linie}`,r.tor===tor&&r.linie===linie,r.tor+"."+r.linie);
}
// 0° Widder: Tor 25 beginnt 358.25°, 0° = 1.75° in Tor 25 -> Linie floor(1.75/0.9375)+1 = 2
const r0=HD.torUndLinie(0);
check("0° Widder -> Tor 25 Linie 2",r0.tor===25&&r0.linie===2,r0.tor+"."+r0.linie);
// Sonne-Erde-Opposition: Tor 51 gegenüber muss Tor 57 sein (Kreuz des Rufers 51/57)
const g51=HD.torUndLinie(15.2);  // 15°07'30–20°45 Widder = Tor 51
const g57=HD.torUndLinie((15.2+180)%360);
check("Tor 51 aktiv bei 15.2° Widder",g51.tor===51,g51.tor);
check("Gegenüber von Tor 51 liegt Tor 57 (Kreuz-Selbstvalidierung)",g57.tor===57,g57.tor);
const g61=HD.torUndLinie(291.0), g62=HD.torUndLinie(111.0);
check("61/62 liegen einander gegenüber",g61.tor===61&&g62.tor===62,g61.tor+"/"+g62.tor);

console.log("— Wahrer Mondknoten gegen Meeus-Mittelwert —");
function meeusMittlererKnoten(jd){
  const T=(jd-2451545.0)/36525;
  let o=125.0445479-1934.1362891*T+0.0020754*T*T+T*T*T/467441-T*T*T*T/60616000;
  return ((o%360)+360)%360;
}
for(const iso of ["1948-04-09T05:05Z","1990-06-15T12:00Z","2020-01-01T00:00Z"]){
  const t=new A.AstroTime(new Date(iso));
  const wahr=HD.wahrerKnoten(t);
  const mittel=meeusMittlererKnoten(t.tt+2451545.0);
  const d=Math.abs(((wahr-mittel+540)%360)-180);
  check(`Knoten ${iso}: wahr nahe Mittelwert (±1.9°)`,d<1.9,`wahr ${wahr.toFixed(2)} mittel ${mittel.toFixed(2)} Δ${d.toFixed(2)}`);
}

console.log("— 88°-Sonnenbogen —");
const geb=new A.AstroTime(new Date(Date.UTC(1990,5,15,12,0)));
const des=HD.designZeit(geb);
let bogen=HD.eklLaenge("Sun",geb)-HD.eklLaenge("Sun",des);
bogen=((bogen%360)+360)%360;
check("Sonnenbogen exakt 88° (±0.0001°)",Math.abs(bogen-88)<1e-4,bogen.toFixed(6));
const tage=(geb.ut-des.ut);
check("Design ~88–92 Tage vor Geburt",tage>85&&tage<95,tage.toFixed(2)+" Tage");

console.log("— ENDE-ZU-ENDE: Ra Uru Hu (9.4.1948, 00:05 EST Montreal = 05:05 UTC) —");
// Dokumentiert (Jovian/IHDS/Astro-Databank): 5/1 Manifestor, Milz-Autorität,
// Einfache Definition, Linkswinkel-Kreuz des Rufers (51/57 | 61/62)
const ra=HD.berechneChart(new Date(Date.UTC(1948,3,9,5,5)));
check("Persönlichkeits-Sonne Tor 51",ra.personality.sonne.tor===51,ra.personality.sonne.tor+"."+ra.personality.sonne.linie);
check("Persönlichkeits-Sonne Linie 5",ra.personality.sonne.linie===5,ra.personality.sonne.linie);
check("Persönlichkeits-Erde Tor 57",ra.personality.erde.tor===57,ra.personality.erde.tor);
check("Design-Sonne Tor 61",ra.design.sonne.tor===61,ra.design.sonne.tor+"."+ra.design.sonne.linie);
check("Design-Sonne Linie 1",ra.design.sonne.linie===1,ra.design.sonne.linie);
check("Design-Erde Tor 62",ra.design.erde.tor===62,ra.design.erde.tor);
check("Profil 5/1",ra.profil==="5/1",ra.profil);
check("Linkswinkel-Kreuz",ra.winkel==="Linkswinkel-Kreuz",ra.winkel);
check("Typ Manifestor",ra.typ==="Manifestor",ra.typ);
check("Autorität Milz",ra.autoritaet.startsWith("Milz"),ra.autoritaet);
check("Einfache Definition",ra.definition==="Einfache Definition",ra.definition);
console.log("      Ra definierte Zentren:",ra.definierteZentren.join(", "));
console.log("      Ra definierte Kanäle:",ra.definierteKanaele.map(k=>k.join("-")).join(", "));
console.log("      Design-Datum:",ra.designUTC.slice(0,10),"(dokumentiert: ~Anfang Januar 1948)");



console.log("— ENDE-ZU-ENDE 2: Angelina Jolie (4.6.1975, 09:09 PDT Los Angeles = 16:09 UTC) —");
// Dokumentiert (mehrere unabhängige Quellen): 3/5 Manifestierende Generatorin,
// Emotionale Autorität, Gespaltene Definition, RAX des Bewusstseins (35/5 | 63/64), Kanal 34-20
const HD2=require("./hd-engine.js");
const aj=HD2.berechneChart(HD2.localToUtc(1975,6,4,9,9,"America/Los_Angeles"));
check("AJ Profil 3/5",aj.profil==="3/5",aj.profil);
check("AJ Typ Manifestierender Generator",aj.typ==="Manifestierender Generator",aj.typ);
check("AJ Autorität Emotional",aj.autoritaet.startsWith("Emotional"),aj.autoritaet);
check("AJ Gespaltene Definition",aj.definition==="Gespaltene Definition",aj.definition);
check("AJ Kreuz 35/5 | 63/64",aj.kreuzTore.persSonne===35&&aj.kreuzTore.persErde===5&&aj.kreuzTore.desSonne===63&&aj.kreuzTore.desErde===64,JSON.stringify(aj.kreuzTore));
check("AJ Rechtswinkel",aj.winkel==="Rechtswinkel-Kreuz");
check("AJ Kanal 34-20 definiert",aj.definierteKanaele.some(k=>(k[0]===20&&k[1]===34)||(k[0]===34&&k[1]===20)));
// Hinweis: Eine Referenzseite listet zusätzlich Tor 3+42 – das widerspräche ihrer
// eigenen Angabe "Split Definition" (42-53 würde Wurzel+Sakral verbinden -> Single).
// Konsistente Torliste (20) validiert gegen die dokumentierte Spaltung:
const ajSoll=[5,9,13,18,20,21,28,34,35,36,39,41,45,50,51,53,56,58,63,64];
check("AJ konsistente 20 Tore exakt",aj.aktiveTore.length===20&&ajSoll.every((t,i)=>aj.aktiveTore[i]===t),aj.aktiveTore.join(","));
check("AJ Tor 3/42 korrekt NICHT aktiv (sonst keine Spaltung möglich)",!aj.aktiveTore.includes(3)&&!aj.aktiveTore.includes(42));
check("AJ Kanal 42-53 undefiniert (Spaltungs-Konsistenz)",!aj.definierteKanaele.some(k=>k.includes(42)));
check("AJ genau 2 Komponenten",aj.komponenten.length===2,JSON.stringify(aj.komponenten));

console.log("\n"+ok+" bestanden, "+fail+" fehlgeschlagen");
process.exit(fail?1:0);
