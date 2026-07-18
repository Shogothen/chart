/* HD-VARIABLEN – die vier Pfeile und ihre sechs Substruktur-Schichten
   Mechanik (recherchiert und gegen mehrere Quellen abgeglichen):
     Design-Sonne   Farbe -> Determination (PHS)      Ton -> Pfeil oben links
     Design-Erde    Farbe -> Kognition
     Design-Knoten  Farbe -> Umgebung                 Ton -> Pfeil unten links
     Pers.-Sonne    Farbe -> Motivation               Ton -> Pfeil oben rechts
     Pers.-Erde     Farbe -> Sinn (Transferenz)
     Pers.-Knoten   Farbe -> Perspektive              Ton -> Pfeil unten rechts
   Pfeilrichtung: Ton 1-3 = links (aktiv, fokussiert), Ton 4-6 = rechts (rezeptiv, offen)
*/
(function(root,factory){
  if(typeof module!=="undefined"&&module.exports)module.exports=factory();
  else root.HDVariablen=factory();
})(typeof self!=="undefined"?self:this,function(){
"use strict";

var DETERMINATION={
1:{name:"Appetit",seiten:["Fortlaufend","Wechselnd"],text:"Dein Körper klärt sich über das, was du isst – und zwar über Einfachheit. Wenige, klare Zutaten, ein Lebensmittel nach dem anderen. Dein Signal ist der echte Appetit: Iss, wenn dein Körper fragt, nicht wenn die Uhr es sagt.",links:"Fortlaufend: Du fährst am besten mit festen, vollständigen Mahlzeiten und weniger Zwischendurch.",rechts:"Wechselnd: Kleine Portionen über den Tag verteilt nähren dich besser als drei große Mahlzeiten."},
2:{name:"Geschmack",seiten:["Offen","Geschlossen"],text:"Nicht der Nährwert entscheidet bei dir, sondern der Geschmack. Dein Körper weiß über die Zunge, was ihm bekommt – was fad schmeckt, verdaust du schlechter, egal wie gesund es ist.",links:"Offen: Vielfalt, neue Aromen und Abwechslung halten dein System wach.",rechts:"Geschlossen: Vertraute, gleichbleibende Speisen geben dir die klarste Verdauung."},
3:{name:"Durst",seiten:["Heiß","Kalt"],text:"Deine Klarheit hängt an Flüssigkeit und Temperatur mindestens so sehr wie an fester Nahrung. Trinken ist bei dir kein Nebenschauplatz, sondern der Hauptzugang zu einem klaren Kopf.",links:"Heiß: Warme Getränke und warm zubereitete Speisen öffnen dein System.",rechts:"Kalt: Kühle Getränke und frische, kalte Speisen bringen dich in Klarheit."},
4:{name:"Berührung",seiten:["Ruhig","Nervös"],text:"Dein Körper verdaut nicht nur Essen, sondern auch die Nähe anderer Menschen. Wer bei dir am Tisch sitzt und wie berührt du wirst, wirkt unmittelbar auf deine Aufnahmefähigkeit.",links:"Ruhig: Du brauchst Stille und wenig Bewegung um dich herum, während du isst.",rechts:"Nervös: Ein wenig Betrieb und Bewegung im Raum ist für dich anregend, nicht störend."},
5:{name:"Klang",seiten:["Hoch","Tief"],text:"Klang ist dein Kanal. Was du hörst, während du isst, lernst oder denkst, entscheidet darüber, wie gut du aufnimmst – Geräuschkulisse ist für dich nie neutral.",links:"Hoch: Helle, klare Klänge und Stimmen in der Nähe unterstützen dich.",rechts:"Tief: Ruhige, tiefe Klänge und Geräusche aus der Ferne bringen dich in deinen Rhythmus."},
6:{name:"Licht",seiten:["Direkt","Indirekt"],text:"Licht steuert deinen Stoffwechsel. Wann und in welchem Licht du isst und arbeitest, verändert deine Klarheit spürbar – der Sonnenlauf ist dein natürlicher Taktgeber.",links:"Direkt: Iss und arbeite, solange die Sonne oben steht; direktes Tageslicht tut dir gut.",rechts:"Indirekt: Gedämpftes, gestreutes Licht ist für dich das nährendere – grelles Licht ermüdet dich."}
};

var KOGNITION={
1:{name:"Geruch",text:"Dein feinster Sinn ist der Geruch. Du erfasst Situationen und Menschen buchstäblich über die Nase – wenn etwas 'nicht riecht', stimmt es meistens nicht."},
2:{name:"Geschmack",text:"Du begreifst die Welt über Geschmack im weitesten Sinn: Was hat Substanz, was ist schal? Dein Urteil über Menschen und Ideen ist ein Erschmecken."},
3:{name:"Äußeres Sehen",text:"Du erkennst über das, was tatsächlich sichtbar ist. Deine Klarheit kommt vom genauen Hinsehen – Details, Bewegungen, Gesichter."},
4:{name:"Inneres Sehen",text:"Deine Erkenntnis kommt über innere Bilder. Was du im Kopf siehst, ist deine verlässlichste Information – Visualisierung ist für dich kein Tagtraum, sondern Wahrnehmung."},
5:{name:"Fühlen",text:"Du erfasst Räume und Menschen über die Atmosphäre. Dein Fühlen ist ein Messinstrument, das früher Bescheid weiß als jedes Argument."},
6:{name:"Tasten",text:"Du verstehst durch Anfassen und Tun. Was du nicht körperlich erfahren hast, bleibt bei dir Theorie – Begreifen ist bei dir wörtlich gemeint."}
};

var UMGEBUNG={
1:{name:"Höhlen",seiten:["Selektiv","Vermischend"],text:"Du brauchst geschützte, klar begrenzte Räume mit einem übersichtlichen Zugang. Rückzugsorte sind für dich keine Flucht, sondern die Bedingung dafür, dass dein Körper zur Ruhe kommt.",links:"Selektiv: Nur ausgewählte Menschen sollten deinen Raum betreten – am liebsten einzeln.",rechts:"Vermischend: Du kannst dich in belebte Räume mischen, solange du jederzeit zurück in deine Höhle kannst."},
2:{name:"Märkte",seiten:["Innen","Außen"],text:"Du blühst dort auf, wo Austausch stattfindet – wo Menschen handeln, verhandeln, sich begegnen. Zu viel Stille macht dich nicht ruhiger, sondern leer.",links:"Innen: Der Austausch sollte zu dir kommen – Arbeiten von zu Hause, Menschen im eigenen Raum empfangen.",rechts:"Außen: Du gehst hinaus in das Getümmel; das Draußen ist dein Kraftort."},
3:{name:"Küchen",seiten:["Nass","Trocken"],text:"Deine Umgebung ist die des Verwandelns: Orte, an denen aus Rohem etwas Fertiges wird – Werkstätten, Labore, Küchen im wörtlichen wie übertragenen Sinn.",links:"Nass: Orte mit Feuchtigkeit und Fluss – Wasser in der Nähe tut deinem System gut.",rechts:"Trocken: Trockene, klare Räume mit wenig Feuchtigkeit sind für dich die richtigen."},
4:{name:"Berge",seiten:["Aktiv","Passiv"],text:"Du brauchst Höhe und Überblick. Ein Ort, von dem aus du hinunterschauen kannst, bringt dich in deine Kraft – flaches Gelände ohne Perspektive macht dich unruhig.",links:"Aktiv: Du musst den Berg selbst erklimmen – Bewegung nach oben ist Teil deiner Gesundheit.",rechts:"Passiv: Es genügt, oben zu sein und zu schauen; der Aufstieg muss nicht dein Werk sein."},
5:{name:"Täler",seiten:["Eng","Weit"],text:"Du gehörst dorthin, wo Leben zusammenläuft und Klang trägt. Isolation bekommt dir schlecht – Du brauchst den Strom von Menschen und Geräuschen um dich.",links:"Eng: Enge Gassen, schmale Räume, nahe Stimmen – Nähe im Klang ist dein Element.",rechts:"Weit: Weite Täler, ferne Geräusche, offener Raum mit Horizont."},
6:{name:"Küsten",seiten:["Natürlich","Künstlich"],text:"Dein Ort ist die Grenze zwischen zwei Welten – dort, wo eines endet und etwas anderes beginnt. Übergänge sind für dich kein Zwischenzustand, sondern Zuhause.",links:"Natürlich: Echte Ufer und gewachsene Grenzen – Wasser, Waldrand, Landschaftskanten.",rechts:"Künstlich: Gebaute Übergänge – Balkone, Brücken, Fensterplätze, Schwellen zwischen Räumen."}
};

var MOTIVATION={
1:{name:"Angst",gegen:"Bedürfnis",text:"Deine gesunde Motivation ist eine wachsame Aufmerksamkeit: Du siehst, was schiefgehen könnte, bevor andere es merken. Nicht Panik – Vorsicht als Klarheit.",transfer:"Kippt sie, wird daraus zwanghaftes Reparieren: Du machst alles für alle, um die Angst nicht zu spüren."},
2:{name:"Hoffnung",gegen:"Schuld",text:"Du bist getragen von der Grundüberzeugung, dass sich fügt, was sich fügen soll. Deine Stärke ist das Loslassen der Kontrolle – nicht Naivität, sondern Vertrauen.",transfer:"Kippt sie, wird daraus Schuld: Du fühlst dich verantwortlich für alles und jeden, und rettest, wo niemand gerufen hat."},
3:{name:"Verlangen",gegen:"Unschuld",text:"Dich bewegt der Wunsch, dass sich etwas verändert – ein gerichtetes Wollen, das Dinge in Bewegung bringt und andere ansteckt.",transfer:"Kippt es, wird daraus gespielte Gleichgültigkeit: Du tust so, als wäre dir alles egal, um das Wollen nicht zu fühlen."},
4:{name:"Bedürfnis",gegen:"Angst",text:"Du siehst, was gebraucht wird – für dich und für andere – und bewegst dich darauf zu. Diese Motivation ist praktisch, direkt und außerordentlich verlässlich.",transfer:"Kippt sie, wird daraus Angst: Der Blick fürs Nötige wird zu ständiger Sorge, nicht genug zu haben."},
5:{name:"Schuld",gegen:"Hoffnung",text:"Du erkennst, was nicht funktioniert – und dass du diejenige oder derjenige bist, der es benennen kann. Deine Gabe ist die Lösung, nicht der Vorwurf.",transfer:"Kippt sie, wird daraus passive Hoffnung: Du schiebst die Verantwortung nach oben und wartest, dass es sich von allein löst."},
6:{name:"Unschuld",gegen:"Verlangen",text:"Du bewegst dich ohne Absicht durchs Leben – offen, unvoreingenommen, ohne Plan hinter dem Plan. Genau das macht dich für andere so entwaffnend.",transfer:"Kippt sie, wird daraus Verlangen: Du fängst an zu drängen und zu steuern – und verlierst genau die Leichtigkeit, die deine Kraft war."}
};

var SINN={
1:{name:"Sicherheit",text:"Dein Geist misst permanent, ob etwas sicher ist. Das ist keine Ängstlichkeit, sondern ein Radar – und es liegt selten daneben."},
2:{name:"Ungewissheit",text:"Du bist im Nichtwissen zu Hause. Wo andere schnell festlegen, hältst du die Frage offen – und genau daraus entstehen deine besten Einsichten."},
3:{name:"Handlung",text:"Dein Verstand denkt in Bewegung. Du begreifst eine Sache, indem du sie anstößt – Stillstand macht dich blind."},
4:{name:"Meditation",text:"Dein Geist braucht Leere, um zu arbeiten. In der Stille ordnet sich, was im Lärm nur Krach war."},
5:{name:"Urteil",text:"Du wägst und unterscheidest fortlaufend. Dein Urteil ist eine Gabe, solange es Beobachtung bleibt und nicht Verurteilung wird."},
6:{name:"Annahme",text:"Du nimmst die Dinge, wie sie sind. Diese Fähigkeit, nicht dagegen anzurennen, gibt dir eine Ruhe, um die dich andere beneiden."}
};

var PERSPEKTIVE={
1:{name:"Überleben",seiten:["Fokussiert","Peripher"],text:"Du siehst die Welt durch die Frage, was trägt und was nicht. Dein Blick ist praktisch und unbestechlich – Schönfärberei prallt an dir ab.",links:"Fokussiert: Du erkennst das eine entscheidende Detail und behältst es im Auge.",rechts:"Peripher: Du erfasst die Lage im Ganzen und spürst, wo es kippt, bevor du es benennen kannst."},
2:{name:"Möglichkeit",seiten:["Fokussiert","Peripher"],text:"Du siehst überall, was daraus werden könnte. Dein Blick ist ein Türöffner – wo andere Grenzen sehen, siehst du Varianten.",links:"Fokussiert: Du verfolgst eine Möglichkeit bis zum Ende, statt viele halb zu betrachten.",rechts:"Peripher: Du hältst viele Möglichkeiten gleichzeitig offen, bis sich eine von selbst zeigt."},
3:{name:"Macht",seiten:["Fokussiert","Peripher"],text:"Du siehst, wer wirklich entscheidet und wie Kräfteverhältnisse laufen. Dieser Blick macht dich in Gruppen unbestechlich klar.",links:"Fokussiert: Du erkennst die eine Stelle, an der sich der Hebel ansetzen lässt.",rechts:"Peripher: Du erfasst das ganze Gefüge und siehst Verschiebungen, bevor sie sichtbar sind."},
4:{name:"Wollen",seiten:["Fokussiert","Peripher"],text:"Dein Blick geht auf das, was du und andere wirklich wollen – unter allem Gesagten liegt für dich immer das eigentliche Motiv.",links:"Fokussiert: Du erkennst genau, was du willst, und richtest dich darauf aus.",rechts:"Peripher: Du spürst das Wollen im Raum, ohne es sofort auf eine Sache festzulegen."},
5:{name:"Wahrscheinlichkeit",seiten:["Fokussiert","Peripher"],text:"Du denkst in Wahrscheinlichkeiten statt in Gewissheiten. Dein Blick wägt ab, was wie wahrscheinlich ist – nüchtern und erstaunlich treffsicher.",links:"Fokussiert: Du rechnest einen Weg genau durch, statt viele zu überschlagen.",rechts:"Peripher: Du überblickst das Feld der Möglichkeiten und schätzt das Ganze ab."},
6:{name:"Persönlich",seiten:["Fokussiert","Peripher"],text:"Du siehst die Welt durch das, was sie mit Menschen macht – Deine Wahrnehmung ist persönlich, nie abstrakt.",links:"Fokussiert: Dein Blick geht tief auf einzelne Menschen und Beziehungen.",rechts:"Peripher: Du nimmst die menschliche Stimmung eines ganzen Raumes auf."}
};

var PFEIL_TEXTE={
links:{kurz:"Links · aktiv",text:"strategisch, fokussiert, strukturiert – Dein System arbeitet gerichtet und will Klarheit über den Weg."},
rechts:{kurz:"Rechts · rezeptiv",text:"empfangend, offen, fließend – Dein System arbeitet über Wahrnehmung statt über Plan."}
};

var PFEILE=[
  {id:"determination",titel:"Determination",untertitel:"Wie dein Körper Nahrung und Welt aufnimmt",
   quelle:"Design-Sonne",seite:"design",position:"oben links",tabelle:DETERMINATION},
  {id:"umgebung",titel:"Umgebung",untertitel:"Wo dein Körper aufblüht",
   quelle:"Design-Nordknoten",seite:"design",position:"unten links",tabelle:UMGEBUNG},
  {id:"motivation",titel:"Motivation",untertitel:"Die Grundfrequenz deines Geistes",
   quelle:"Persönlichkeits-Sonne",seite:"personality",position:"oben rechts",tabelle:MOTIVATION},
  {id:"perspektive",titel:"Perspektive",untertitel:"Wie du die Welt siehst",
   quelle:"Persönlichkeits-Nordknoten",seite:"personality",position:"unten rechts",tabelle:PERSPEKTIVE}
];

function richtung(ton){return ton<=3?"links":"rechts"}

function berechne(chart){
  var p=chart.personality,d=chart.design;
  var v={
    determination:{farbe:d.sonne.farbe,ton:d.sonne.ton,basis:d.sonne.basis,
      richtung:richtung(d.sonne.ton),eintrag:DETERMINATION[d.sonne.farbe]},
    kognition:{farbe:d.erde.farbe,ton:d.erde.ton,eintrag:KOGNITION[d.erde.farbe]},
    umgebung:{farbe:d.nordknoten.farbe,ton:d.nordknoten.ton,basis:d.nordknoten.basis,
      richtung:richtung(d.nordknoten.ton),eintrag:UMGEBUNG[d.nordknoten.farbe]},
    motivation:{farbe:p.sonne.farbe,ton:p.sonne.ton,basis:p.sonne.basis,
      richtung:richtung(p.sonne.ton),eintrag:MOTIVATION[p.sonne.farbe]},
    sinn:{farbe:p.erde.farbe,ton:p.erde.ton,eintrag:SINN[p.erde.farbe]},
    perspektive:{farbe:p.nordknoten.farbe,ton:p.nordknoten.ton,basis:p.nordknoten.basis,
      richtung:richtung(p.nordknoten.ton),eintrag:PERSPEKTIVE[p.nordknoten.farbe]}
  };
  var r=[v.determination.richtung,v.umgebung.richtung,v.motivation.richtung,v.perspektive.richtung];
  var linksAnzahl=r.filter(function(x){return x==="links"}).length;
  v.quad = linksAnzahl===4?"Quad Links (durchgehend aktiv)"
        : linksAnzahl===0?"Quad Rechts (durchgehend rezeptiv)"
        : linksAnzahl+" links / "+(4-linksAnzahl)+" rechts";
  v.pfeile=PFEILE;
  return v;
}

return {berechne:berechne,richtung:richtung,PFEILE:PFEILE,PFEIL_TEXTE:PFEIL_TEXTE,
  DETERMINATION:DETERMINATION,KOGNITION:KOGNITION,UMGEBUNG:UMGEBUNG,
  MOTIVATION:MOTIVATION,SINN:SINN,PERSPEKTIVE:PERSPEKTIVE};
});
