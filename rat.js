/* HEUTIGER RAT, persönlicher Tagesimpuls aus dem echten Transit
   Aufbau: Sonnentor des Tages (Thema) + Linienton + Typ-Erinnerung + Autorität
   + Resonanzen zwischen Himmel und eigener Karte. Deterministisch je Tag. */
(function(root,factory){
  if(typeof module!=="undefined"&&module.exports)module.exports=factory();
  else root.HDRat=factory();
})(typeof self!=="undefined"?self:this,function(){
"use strict";

var TYP_RAT={
"Generator": [
"Gib deiner sakralen Antwort heute Raum, bevor der Kopf übernimmt. Ein ehrliches Mhm-hm trägt weiter als ein durchdachtes Vielleicht.",
"Heute ist ein guter Tag, um auf etwas zu warten, das dich wirklich anspringt, statt das Nächstbeste zu erledigen.",
"Frag dich bei jedem Ja heute kurz: Kommt das aus dem Bauch oder aus der Pflicht? Nur das erste erneuert deine Kraft.",
"Wenn dich heute Frustration besucht, nimm sie als Kompassnadel: Irgendwo läufst du gerade einem fremden Ziel hinterher.",
"Erledige heute eine Sache, auf die dein Körper anspringt, und beobachte, wie anders sich diese Art Müdigkeit am Abend anfühlt.",
"Lass dich heute fragen. Bitte jemanden, dir eine Ja-oder-Nein-Frage zu stellen, und hör auf den ersten Laut, der kommt."
],
"Manifestierender Generator": [
"Du darfst heute Schritte überspringen. Sag nur kurz Bescheid, wen deine Abkürzung betrifft, dann bleibt der Weg frei.",
"Wenn dich heute etwas langweilt, ist das Information: Dein System hat den nützlichen Teil schon mitgenommen. Weiterziehen ist erlaubt.",
"Starte heute ruhig zwei Dinge parallel. Deine Energie ist für Mehrgleisigkeit gebaut, nur die Bauchantwort muss zuerst kommen.",
"Ein fallengelassenes Projekt ist heute kein Scheitern, sondern Sortierung. Nicht alles Angefangene war zum Beenden gedacht.",
"Prüfe heute vor dem Lossprinten einmal kurz nach innen, und informiere dann die Menschen in deiner Flugbahn. Beides zusammen macht dich unaufhaltsam.",
"Wenn heute Ärger und Frustration gleichzeitig auftauchen, halte kurz an: Meist rennst du dann gerade schnell in die falsche Richtung."
],
"Projektor": [
"Warte heute auf eine echte Frage, bevor du deinen Blick verschenkst. Eingeladen ist dein Rat Gold, ungefragt nur Luft.",
"Drei fokussierte Stunden sind heute ein voller Erfolg. Der Rest des Tages darf Studieren, Ruhen und Beobachten sein.",
"Achte heute darauf, wer dich wirklich sieht, und gib diesen Menschen den Vorrang. Anerkennung ist dein Betriebsklima.",
"Wenn heute Bitterkeit aufsteigt, ist das kein Charakterfehler, sondern ein Zeichen: Du hast dich irgendwo ungefragt verausgabt.",
"Beobachte heute mehr, als du eingreifst. Was du dabei über die Menschen lernst, ist die Währung, mit der du morgen eingeladen wirst.",
"Sag heute einmal Nein zu einer Aufgabe, die nur Energie will und keinen Durchblick. Du bist für das Sehen da, nicht fürs Schleppen."
],
"Manifestor": [
"Wenn dich heute ein Impuls anspringt, folge ihm, und lass die Betroffenen vorher kurz wissen, was du vorhast. Das ist keine Bitte um Erlaubnis, nur Wegfreiheit.",
"Deine Energie kommt heute vielleicht in Schüben. Nutze die Welle, wenn sie da ist, und verteidige die Ruhe danach wie einen Termin.",
"Widerstand heute ist oft nur eine fehlende Information: Prüfe, wen du vergessen hast einzuweihen, bevor du härter drückst.",
"Du musst heute niemanden mitnehmen. Initiieren ist dein Job, das Vervollständigen dürfen andere übernehmen.",
"Wenn heute Wut aufsteigt, frag sie, wo man dich aufgehalten hat. Sie zeigt zuverlässig auf die Stelle.",
"Gönn dir heute eine Ankündigung statt einer Erklärung. Ich mache jetzt X ist ein vollständiger Satz."
],
"Reflektor": [
"Nimm heute als Stichprobe, nicht als Urteil: Was du fühlst, erzählt viel über deine Umgebung und wenig über deinen Wert.",
"Verschiebe heute anstehende große Entscheidungen ohne schlechtes Gewissen. Dein Verfahren heißt Mondzyklus, nicht Bauchgefühl im Moment.",
"Achte heute auf die Orte: Derselbe Tag fühlt sich in verschiedenen Räumen verschieden an, und dieser Unterschied ist Information.",
"Wenn dich heute etwas überrascht, ist das dein bestes Zeichen: Überraschung ist die Signatur eines Reflektors im Fluss.",
"Sprich heute mit einem vertrauten Menschen über das, was dich beschäftigt. Nicht für Rat, sondern um dich selbst klarer zu hören.",
"Prüfe heute einmal bewusst, wessen Stimmung du gerade trägst. Vieles, was sich wie deins anfühlt, ist nur zu Besuch."
]
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
