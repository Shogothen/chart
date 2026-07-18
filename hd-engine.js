/* HD-ENGINE – isomorph (Browser: window.HDEngine, Node: module.exports)
   Logik identisch mit dem gegen Ra Uru Hu validierten hd-core. */
(function(root,factory){
  if(typeof module!=="undefined"&&module.exports)
    module.exports=factory(require("astronomy-engine"));
  else root.HDEngine=factory(root.Astronomy);
})(typeof self!=="undefined"?self:this,function(A){
"use strict";

/* ---------- Rave-Mandala ---------- */
var RAD=302.0;
var WHEEL=[41,19,13,49,30,55,37,63,22,36,25,17,21,51,42,3,
  27,24,2,23,8,20,16,35,45,12,15,52,39,53,62,56,
  31,33,7,4,29,59,40,64,47,6,46,18,48,57,32,50,
  28,44,1,43,14,34,9,5,26,11,10,58,38,54,61,60];
var GPT=360/64, GPL=GPT/6;

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
var ZENTREN={
  kopf:[64,61,63],
  ajna:[47,24,4,17,43,11],
  kehle:[62,23,56,35,12,45,33,8,31,20,16],
  g:[1,13,25,46,2,15,10,7],
  herz:[21,40,26,51],
  sakral:[34,5,14,29,59,9,3,42,27],
  milz:[48,57,44,50,32,28,18],
  solarplexus:[36,22,37,6,49,55,30],
  wurzel:[53,60,52,19,39,41,58,38,54]
};
var KANAELE=[[1,8],[2,14],[3,60],[4,63],[5,15],[6,59],[7,31],[9,52],
  [10,20],[10,34],[10,57],[11,56],[12,22],[13,33],[16,48],[17,62],
  [18,58],[19,49],[20,34],[20,57],[21,45],[23,43],[24,61],[25,51],
  [26,44],[27,50],[28,38],[29,46],[30,41],[32,54],[34,57],[35,36],
  [37,40],[39,55],[42,53],[47,64]];
var TOR_ZU_ZENTRUM={};
Object.keys(ZENTREN).forEach(function(z){ZENTREN[z].forEach(function(t){TOR_ZU_ZENTRUM[t]=z})});
var MOTOREN=["herz","sakral","solarplexus","wurzel"];

/* ---------- Ephemeriden ---------- */

function eklLaenge(body,zeit){
  if(body==="Sun")return A.SunPosition(zeit).elon;
  var v=A.GeoVector(A.Body[body],zeit,true);
  return A.Ecliptic(v).elon;
}
function wahrerKnoten(zeit){
  var rot=A.Rotation_EQJ_ECT(zeit); /* wahre Ekliptik des Datums */
  var s=A.GeoMoonState(zeit);
  var p=A.RotateVector(rot,new A.Vector(s.x,s.y,s.z,zeit));
  var v=A.RotateVector(rot,new A.Vector(s.vx,s.vy,s.vz,zeit));
  var hx=p.y*v.z-p.z*v.y, hy=p.z*v.x-p.x*v.z;
  var lon=Math.atan2(hx,-hy)*180/Math.PI;
  return ((lon%360)+360)%360;
}
function designZeit(geburt){
  var ziel=(((eklLaenge("Sun",geburt)-88)%360)+360)%360;
  var t=geburt.AddDays(-88*365.2422/360);
  for(var i=0;i<40;i++){
    var diff=eklLaenge("Sun",t)-ziel;
    diff=((diff+540)%360)-180;
    if(Math.abs(diff)<1e-7)break;
    t=t.AddDays(-diff/0.9856);
  }
  return t;
}

var PLANETEN=[["sonne","Sun"],["erde",null],["mond","Moon"],
  ["nordknoten",null],["suedknoten",null],
  ["merkur","Mercury"],["venus","Venus"],["mars","Mars"],
  ["jupiter","Jupiter"],["saturn","Saturn"],
  ["uranus","Uranus"],["neptun","Neptune"],["pluto","Pluto"]];

function aktivierungen(zeit){
  var sonne=eklLaenge("Sun",zeit);
  var knoten=wahrerKnoten(zeit);
  var out={};
  PLANETEN.forEach(function(pl){
    var name=pl[0],body=pl[1],lon;
    if(name==="sonne")lon=sonne;
    else if(name==="erde")lon=(sonne+180)%360;
    else if(name==="nordknoten")lon=knoten;
    else if(name==="suedknoten")lon=(knoten+180)%360;
    else lon=eklLaenge(body,zeit);
    out[name]=torUndLinie(lon);
  });
  return out;
}

/* ---------- Analyse ---------- */
function analysiere(pers,des){
  var aktiveTore=new Set();
  Object.keys(pers).forEach(function(k){aktiveTore.add(pers[k].tor)});
  Object.keys(des).forEach(function(k){aktiveTore.add(des[k].tor)});

  var defKanaele=KANAELE.filter(function(k){return aktiveTore.has(k[0])&&aktiveTore.has(k[1])});
  var defZentren=new Set();
  defKanaele.forEach(function(k){
    defZentren.add(TOR_ZU_ZENTRUM[k[0]]);defZentren.add(TOR_ZU_ZENTRUM[k[1]]);
  });

  var nachbarn={};
  defZentren.forEach(function(z){nachbarn[z]=new Set()});
  defKanaele.forEach(function(k){
    var a=TOR_ZU_ZENTRUM[k[0]],b=TOR_ZU_ZENTRUM[k[1]];
    if(a!==b){nachbarn[a].add(b);nachbarn[b].add(a)}
  });
  var gesehen=new Set(),komponenten=[];
  defZentren.forEach(function(start){
    if(gesehen.has(start))return;
    var stapel=[start],komp=new Set();
    while(stapel.length){
      var z=stapel.pop();
      if(gesehen.has(z))continue;
      gesehen.add(z);komp.add(z);
      nachbarn[z].forEach(function(n){stapel.push(n)});
    }
    komponenten.push(komp);
  });

  var definition=["Keine Definition (Reflektor)","Einfache Definition","Gespaltene Definition",
    "Dreifach gespaltene Definition","Vierfach gespaltene Definition"][komponenten.length]||"Unbekannt";

  var motorZurKehle=komponenten.some(function(k){
    return k.has("kehle")&&MOTOREN.some(function(m){return k.has(m)});
  });
  var sakral=defZentren.has("sakral");
  var typ,strategie,signatur,nichtSelbst;
  if(defZentren.size===0){typ="Reflektor";strategie="Einen Mondzyklus (ca. 28 Tage) abwarten";signatur="Überraschung";nichtSelbst="Enttäuschung"}
  else if(sakral){typ=motorZurKehle?"Manifestierender Generator":"Generator";strategie="Auf das Leben reagieren";signatur="Zufriedenheit";nichtSelbst="Frustration"}
  else if(motorZurKehle){typ="Manifestor";strategie="Informieren, bevor du handelst";signatur="Frieden";nichtSelbst="Wut"}
  else{typ="Projektor";strategie="Auf die Einladung warten";signatur="Erfolg";nichtSelbst="Verbitterung"}

  function inKompMit(a,b){return komponenten.some(function(k){return k.has(a)&&k.has(b)})}
  var autoritaet;
  if(defZentren.has("solarplexus"))autoritaet="Emotional (Solarplexus)";
  else if(defZentren.has("sakral"))autoritaet="Sakral";
  else if(defZentren.has("milz"))autoritaet="Milz (Intuition)";
  else if(defZentren.has("herz")&&(inKompMit("herz","kehle")||typ==="Manifestor"))autoritaet="Ego (manifestiert)";
  else if(defZentren.has("herz")&&inKompMit("herz","g"))autoritaet="Ego (projiziert)";
  else if(defZentren.has("g"))autoritaet="Selbst-projiziert";
  else if(typ==="Reflektor")autoritaet="Lunar (Mondzyklus)";
  else autoritaet="Mental (Umgebung als Resonanzboden)";

  return {aktiveTore:Array.from(aktiveTore).sort(function(a,b){return a-b}),
    definierteKanaele:defKanaele,
    definierteZentren:Array.from(defZentren),
    komponenten:komponenten.map(function(k){return Array.from(k)}),
    definition:definition,typ:typ,strategie:strategie,
    signatur:signatur,nichtSelbst:nichtSelbst,autoritaet:autoritaet};
}

var RECHTS=["1/3","1/4","2/4","2/5","3/5","3/6","4/6"];
var LINKS=["5/1","5/2","6/2","6/3"];
function profilUndKreuz(pers,des){
  var profil=pers.sonne.linie+"/"+des.sonne.linie;
  var winkel;
  if(RECHTS.indexOf(profil)>=0)winkel="Rechtswinkel-Kreuz";
  else if(LINKS.indexOf(profil)>=0)winkel="Linkswinkel-Kreuz";
  else if(profil==="4/1")winkel="Juxtapositions-Kreuz";
  else winkel="(ungültiges Profil)";
  return {profil:profil,winkel:winkel,
    kreuzTore:{persSonne:pers.sonne.tor,persErde:pers.erde.tor,
      desSonne:des.sonne.tor,desErde:des.erde.tor}};
}

/* ---------- Historische Zeitumrechnung (IANA via Intl) ---------- */
function offsetMin(utcMs,zone){
  var f=new Intl.DateTimeFormat("en-US",{timeZone:zone,year:"numeric",month:"2-digit",
    day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:false});
  var p={};f.formatToParts(new Date(utcMs)).forEach(function(x){p[x.type]=x.value});
  var loc=Date.UTC(+p.year,+p.month-1,+p.day,(+p.hour)%24,+p.minute,+p.second);
  return (loc-utcMs)/60000;
}
function localToUtc(y,mo,d,h,mi,zone){
  var g=Date.UTC(y,mo-1,d,h,mi);
  for(var i=0;i<3;i++)g=Date.UTC(y,mo-1,d,h,mi)-offsetMin(g,zone)*60000;
  return new Date(g);
}

/* ---------- Hauptfunktion ---------- */
function berechneChart(utcDate){
  var geburt=new A.AstroTime(utcDate);
  var design=designZeit(geburt);
  var pers=aktivierungen(geburt);
  var des=aktivierungen(design);
  var analyse=analysiere(pers,des);
  var pk=profilUndKreuz(pers,des);
  var out={geburtUTC:geburt.date.toISOString(),designUTC:design.date.toISOString(),
    personality:pers,design:des};
  Object.keys(analyse).forEach(function(k){out[k]=analyse[k]});
  Object.keys(pk).forEach(function(k){out[k]=pk[k]});
  return out;
}

return {berechneChart:berechneChart,torUndLinie:torUndLinie,designZeit:designZeit,
  wahrerKnoten:wahrerKnoten,eklLaenge:eklLaenge,aktivierungen:aktivierungen,
  analysiere:analysiere,profilUndKreuz:profilUndKreuz,localToUtc:localToUtc,
  offsetMin:offsetMin,WHEEL:WHEEL,ZENTREN:ZENTREN,KANAELE:KANAELE,
  TOR_ZU_ZENTRUM:TOR_ZU_ZENTRUM,PLANETEN:PLANETEN};
});
