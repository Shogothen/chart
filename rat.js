/* HEUTIGER RAT, persönlicher Tagesimpuls aus dem echten Transit
   Aufbau: Sonnentor des Tages (Thema) + Linienton + Typ-Erinnerung + Autorität
   + Resonanzen zwischen Himmel und eigener Karte. Deterministisch je Tag. */
(function(root,factory){
  if(typeof module!=="undefined"&&module.exports)module.exports=factory();
  else root.HDRat=factory();
})(typeof self!=="undefined"?self:this,function(){
"use strict";

var TYP_RAT={
"Generator":[
 "Als Generator darfst du heute auf das warten, was dich wirklich anzieht. Reagiere auf das, was zu dir kommt, statt Dinge zu erzwingen, dein Bauch weiß längst, was ein Ja ist.",
 "Deine Energie ist heute dein Kompass: Was dich auflädt, gehört zu dir. Was dich müde macht, darfst du liebevoll liegen lassen.",
 "Gib deiner sakralen Antwort heute Raum, bevor der Kopf übernimmt. Ein ehrliches Mhm-hm trägt weiter als ein durchdachtes Vielleicht."],
"Manifestierender Generator":[
 "Als Manifestierender Generator darfst du heute deinen einzigartigen Rhythmus ehren. Erlaube dir zuerst zu reagieren, experimentiere, und verpflichte deine Energie erst dann ganz, so findest du Zufriedenheit statt Frustration.",
 "Dein Tempo ist heute dein Geschenk: Überspringe, was sich tot anfühlt, und informiere die Menschen um dich, bevor du abbiegst. Dann bleibt dein Schwung ohne Widerstand.",
 "Mehrere Dinge gleichzeitig sind für dich kein Chaos, sondern dein Design. Prüfe nur bei jedem Impuls kurz, ob dein Bauch noch antwortet."],
"Projektor":[
 "Als Projektor darfst du heute dein Sehen wertschätzen, ohne es ungefragt zu verschenken. Warte auf die echte Einladung, sie erkennt dich, nicht umgekehrt.",
 "Deine Kraft liegt heute in der Tiefe, nicht in der Menge. Ein Gespräch, das dich wirklich meint, nährt dich mehr als zehn, in denen du dich beweisen musst.",
 "Ruhe ist für dich heute kein Rückzug, sondern Arbeit an deiner Klarheit. Wer dich einladen will, findet dich auch im Liegen."],
"Manifestor":[
 "Als Manifestor darfst du heute anstoßen, was in dir drängt, und die Menschen um dich informieren, bevor du losgehst. Das ist kein Um-Erlaubnis-Fragen, sondern dein Weg zu Frieden.",
 "Dein Impuls ist heute echt. Folge ihm in deinem Takt, und lass niemanden dein Tempo verwalten.",
 "Zwischen deinen Schüben darfst du heute ganz bewusst ruhen. Deine Energie kommt in Wellen, das ist Design, kein Defekt."],
"Reflektor":[
 "Als Reflektor darfst du dir heute Zeit lassen, dein Wissen reift mit dem Mond, nicht mit der Uhr. Was heute unklar ist, darf bis übermorgen unklar bleiben.",
 "Achte heute darauf, welche Orte und Menschen sich in deinem Körper gut anfühlen. Du spiegelst deine Umgebung, wähle sie deshalb mit Liebe.",
 "Überraschung ist deine Signatur: Lass dich heute von dem verblüffen, was der Tag dir zeigt, statt ihn festzulegen."]
};

var LINIEN_TON={
1:"Der Tag trägt eine Erste-Linie-Färbung: Es geht ums Fundament. Prüfe heute lieber einmal mehr, worauf du baust.",
2:"Der Tag trägt eine Zweite-Linie-Färbung: Rückzug ist erlaubt. Was dich ruft, findet dich auch in deiner Höhle.",
3:"Der Tag trägt eine Dritte-Linie-Färbung: Versuch und Irrtum sind heute keine Fehler, sondern die Methode.",
4:"Der Tag trägt eine Vierte-Linie-Färbung: Dein Netz trägt. Pflege heute eine Verbindung, die dir wichtig ist.",
5:"Der Tag trägt eine Fünfte-Linie-Färbung: Andere projizieren heute viel. Du musst nicht jede Erwartung erfüllen, die man dir anträgt.",
6:"Der Tag trägt eine Sechste-Linie-Färbung: Geh heute innerlich aufs Dach und schau aus der Distanz. Weitblick schlägt Eile."
};

var AUTORITAET_KURZ=[
 ["Emotional","Triff heute keine wichtige Entscheidung auf dem Gipfel oder im Tal deiner Welle, schlaf einmal darüber, deine Klarheit kommt mit der Zeit."],
 ["Sakral","Hör heute auf die erste Antwort deines Bauches, sie ist da, bevor der Kopf einen Satz bilden kann."],
 ["Milz","Deine Intuition spricht heute leise und nur einmal. Nimm den ersten feinen Impuls ernst, auch wenn er unlogisch wirkt."],
 ["Ego","Frag dich heute ehrlich: Will ich das wirklich, mit dem Herzen, nicht mit dem Pflichtgefühl? Nur dann sag zu."],
 ["Selbst","Sprich heute laut aus, was ansteht, in deiner eigenen Stimme hörst du, wohin dein Selbst wirklich will."],
 ["Mental","Besprich Wichtiges heute mit Menschen, denen du vertraust, nicht für ihren Rat, sondern um dich selbst dabei zu hören."],
 ["Lunar","Gib dir für alles Große den Lauf eines Mondzyklus, heute ist ein Tag zum Wahrnehmen, nicht zum Festlegen."]
];

function autoritaetSatz(autoritaet){
  for(var i=0;i<AUTORITAET_KURZ.length;i++)
    if(autoritaet.indexOf(AUTORITAET_KURZ[i][0])>=0)return AUTORITAET_KURZ[i][1];
  return "Vertrau heute dem Entscheidungsweg, der sich in deinem Körper stimmig anfühlt.";
}

function tagIndex(datum){
  var start=Date.UTC(datum.getUTCFullYear(),0,0);
  return Math.floor((Date.UTC(datum.getUTCFullYear(),datum.getUTCMonth(),datum.getUTCDate())-start)/86400000);
}

/* erzeugt den Tagesrat; braucht Engine, Chart, Inhalte (TOR_NAMEN, KANAL_NAMEN) und Transit-Modul */
function erzeuge(engine,transitModul,chart,inhalte,datum){
  datum=datum||new Date();
  var t=transitModul.berechne(engine,chart,datum);
  var sonne=t.sonne;
  var torName=(inhalte&&inhalte.TOR_NAMEN&&inhalte.TOR_NAMEN[sonne.tor])||"";
  var idx=tagIndex(datum);

  var absaetze=[];
  absaetze.push("Die Sonne steht heute in Tor "+sonne.tor+"."+sonne.linie
    +(torName?" \u2013 \u201E"+torName+"\u201C.":".")+" "+LINIEN_TON[sonne.linie]);

  var typListe=TYP_RAT[chart.typ]||TYP_RAT["Generator"];
  absaetze.push(typListe[idx%typListe.length]);

  var persoenlich="";
  if(t.resonanz&&t.resonanz.length){
    var r=t.resonanz[0];
    var rName=(inhalte&&inhalte.TOR_NAMEN&&inhalte.TOR_NAMEN[r.tor])||"";
    persoenlich="Der Himmel ber\u00FChrt heute dein eigenes Tor "+r.tor
      +(rName?" (\u201E"+rName+"\u201C)":"")+" \u2013 dieses Thema klingt heute lauter in dir als sonst. ";
  }else if(t.neueKanaele&&t.neueKanaele.length){
    var n=t.neueKanaele[0];
    var kName=(inhalte&&inhalte.KANAL_NAMEN&&inhalte.KANAL_NAMEN[n.kanal])||"";
    persoenlich="Der Transit schlie\u00DFt heute vor\u00FCbergehend deinen Kanal "+n.kanal
      +(kName?" (\u201E"+kName+"\u201C)":"")+" \u2013 du bekommst geliehene Energie, die sich morgen wieder verabschiedet. ";
  }
  absaetze.push(persoenlich+autoritaetSatz(chart.autoritaet));

  var d=datum;
  var datumText=d.toLocaleDateString("de-DE",{day:"numeric",month:"long",year:"numeric"});
  return {
    datum:datumText,
    absaetze:absaetze,
    text:absaetze.join("\n\n"),
    sonne:sonne,
    teilen:"Mein Rat f\u00FCr heute ("+datumText+"):\n\n"+absaetze.join("\n\n")+"\n\nBerechnet mit dem Chartrechner von flowyourdesign.com"
  };
}

return {erzeuge:erzeuge,TYP_RAT:TYP_RAT,LINIEN_TON:LINIEN_TON,autoritaetSatz:autoritaetSatz};
});
