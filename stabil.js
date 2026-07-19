/* WIE SICHER IST DEIN ERGEBNIS?
   Statt eines Schiebereglers zum Ausprobieren rechnen wir exakt aus, in welchem
   Zeitfenster rund um deine Geburtszeit Typ, Autorität und Profil unverändert bleiben.
   Verfahren: Schrittsuche nach vorn und hinten, dann Bisektion auf die Minute genau. */
(function(root,factory){
  if(typeof module!=="undefined"&&module.exports)module.exports=factory();
  else root.HDStabil=factory();
})(typeof self!=="undefined"?self:this,function(){
"use strict";

function kern(engine,ms){
  var c=engine.berechneChart(new Date(ms));
  return {typ:c.typ,autoritaet:c.autoritaet,profil:c.profil,
    schluessel:c.typ+"|"+c.autoritaet+"|"+c.profil};
}

/* sucht die Grenze in eine Richtung (richtung = +1 oder -1) */
function grenze(engine,startMs,basis,richtung,maxMin){
  var schritt=5*60000, weit=0, letzterGleich=startMs;
  while(weit<maxMin*60000){
    weit+=schritt;
    var t=startMs+richtung*weit;
    if(kern(engine,t).schluessel===basis.schluessel){letzterGleich=t;continue}
    /* Bisektion zwischen letzterGleich und t auf eine Minute */
    var a=letzterGleich,b=t;
    while(Math.abs(b-a)>60000){
      var m=Math.round((a+b)/2);
      if(kern(engine,m).schluessel===basis.schluessel)a=m; else b=m;
    }
    var neu=kern(engine,b);
    var was=[];
    if(neu.typ!==basis.typ)was.push("Typ");
    if(neu.autoritaet!==basis.autoritaet)was.push("Autorität");
    if(neu.profil!==basis.profil)was.push("Profil");
    return {ms:a,wechselMs:b,aendert:was,neu:neu};
  }
  return null;
}

/* utcMs: der berechnete Geburtszeitpunkt in UTC-Millisekunden
   ortsOffsetMin: Minuten, die zur UTC-Zeit addiert Ortszeit ergeben */
function berechne(engine,utcMs,ortsOffsetMin,maxMin){
  maxMin=maxMin||360;
  var basis=kern(engine,utcMs);
  var vor=grenze(engine,utcMs,basis,1,maxMin);
  var zurueck=grenze(engine,utcMs,basis,-1,maxMin);
  function ortszeit(ms){
    var d=new Date(ms+ortsOffsetMin*60000);
    return ("0"+d.getUTCHours()).slice(-2)+":"+("0"+d.getUTCMinutes()).slice(-2);
  }
  var vonMs=zurueck?zurueck.ms:utcMs-maxMin*60000;
  var bisMs=vor?vor.ms:utcMs+maxMin*60000;
  var spanneMin=Math.round((bisMs-vonMs)/60000);
  return {
    basis:basis,
    von:ortszeit(vonMs),bis:ortszeit(bisMs),
    vonOffen:!zurueck,bisOffen:!vor,
    spanneMin:spanneMin,
    naechsteAenderung:vor?{zeit:ortszeit(vor.wechselMs),aendert:vor.aendert,neu:vor.neu}:null,
    vorigeAenderung:zurueck?{zeit:ortszeit(zurueck.wechselMs),aendert:zurueck.aendert,neu:zurueck.neu}:null,
    sicherheit:spanneMin>=240?"hoch":(spanneMin>=60?"mittel":"knapp")
  };
}

function satz(s){
  if(s.vonOffen&&s.bisOffen)
    return "Typ, Autorität und Profil bleiben im gesamten geprüften Fenster gleich. Dein Ergebnis steht also sehr sicher, selbst wenn deine Geburtszeit um Stunden danebenliegt.";
  var kopf="Mit dieser Geburtszeit bleiben Typ, Autorität und Profil zwischen "+s.von+" und "+s.bis+" Uhr unverändert";
  if(s.spanneMin>=120)kopf+=", das sind "+Math.floor(s.spanneMin/60)+" Stunden. Dein Ergebnis steht sicher.";
  else kopf+=", das sind nur "+s.spanneMin+" Minuten. Hier lohnt ein Blick in die Geburtsurkunde.";
  var zusatz="";
  if(s.naechsteAenderung)
    zusatz+=" Ab "+s.naechsteAenderung.zeit+" Uhr würde sich "+aufz(s.naechsteAenderung.aendert)+" ändern.";
  if(s.vorigeAenderung)
    zusatz+=" Vor "+s.vorigeAenderung.zeit+" Uhr wäre "+aufz(s.vorigeAenderung.aendert)+" anders.";
  return kopf+zusatz;
}
function aufz(a){
  if(!a.length)return "etwas";
  if(a.length===1)return "dein "+a[0];
  return "bei dir "+a.slice(0,-1).join(", ")+" und "+a[a.length-1];
}

return {berechne:berechne,satz:satz,kern:kern};
});
