/* HD-INHALTE – deutsche Deutungstexte (Eigenformulierungen) */
(function(root,factory){
  if(typeof module!=="undefined"&&module.exports)module.exports=factory();
  else root.HDInhalte=factory();
})(typeof self!=="undefined"?self:this,function(){
"use strict";

var TYPEN={
"Generator":{anteil:"ca. 37 % der Menschen",kurz:"Die Lebenskraft der Welt",text:"Du trägst als einziger Typ (gemeinsam mit dem Manifestierenden Generator) ein definiertes Sakralzentrum – einen Motor mit nachwachsender Energie für das, was dich wirklich anspricht. Deine Kraft ist nicht zum Initiieren gebaut, sondern zum Antworten: Das Leben bringt dir Situationen, Fragen und Angebote, und dein Bauch antwortet, bevor der Kopf mitreden kann. Wenn du Dingen nachjagst, statt auf diese Antwort zu warten, landest du in Arbeit, die dich auslaugt – das ist die Wurzel der Frustration. Wenn du reagierst, worauf dein Sakral anspringt, wirst du zu dem Menschen, der abends müde und zufrieden ins Bett fällt."},
"Manifestierender Generator":{anteil:"ca. 33 % der Menschen",kurz:"Die schnelle Lebenskraft",text:"Du bist ein Generator mit direktem Draht zur Kehle: Deine sakrale Antwort kann unmittelbar in Handlung übersetzen. Das macht dich schnell, vielseitig und fähig, mehrere Dinge parallel zu bewegen – und es bringt zwei typische Reibungen: Du überspringst Schritte (und musst manchmal zurück), und dein Tempo überrollt andere. Deine Strategie bleibt das Reagieren; das Informieren der Betroffenen ist deine zweite Zutat, damit dein Tempo keinen Widerstand erzeugt. Nicht jede begonnene Sache musst du beenden – Ausprobieren und Verwerfen gehört zu deinem Design."},
"Projektor":{anteil:"ca. 21 % der Menschen",kurz:"Das Sehen, das andere führt",text:"Du hast kein definiertes Sakral – Deine Gabe ist nicht Dauerleistung, sondern Durchblick: Du erkennst, wie Energie bei anderen fließt, wo sie sich verschwendet und wie es effizienter ginge. Diese Führung wirkt aber nur, wenn sie eingeladen wird. Ungefragt verteilte Einsicht prallt ab und hinterlässt Verbitterung. Warte bei den großen Dingen – Rolle, Berufung, Beziehung – auf die echte Einladung, die deine Qualität erkennt. Und wirtschafte klug mit deiner Kraft: Du bist nicht für den Acht-Stunden-Dauerlauf gebaut, sondern für Wirkung in konzentrierten Dosen. Erfolg ist dein Signal, dass du richtig liegst."},
"Manifestor":{anteil:"ca. 9 % der Menschen",kurz:"Die Kraft, die anfängt",text:"Du bist einer der wenigen Menschen, die wirklich aus dem Nichts anstoßen können: Ein Motor ist direkt mit deiner Kehle verbunden, Impuls wird unmittelbar Handlung. Deine Aura wirkt geschlossen und kraftvoll – Menschen spüren deine Wucht, bevor du etwas gesagt hast, und wollen dich deshalb kontrollieren. Deine Strategie löst genau das: Informiere die, die dein Handeln betrifft, bevor du handelst. Nicht um Erlaubnis zu bitten, sondern um Widerstand aus dem Weg zu räumen. Ein Manifestor, der informiert, erlebt Frieden. Einer, der es nicht tut, erlebt Wut – die eigene und die der anderen."},
"Reflektor":{anteil:"ca. 1 % der Menschen",kurz:"Der Spiegel deiner Umgebung",text:"Alle neun Zentren sind bei dir offen – Du bist keine feste Energie, sondern ein präzises Messinstrument für deine Umgebung. Du nimmst Menschen und Orte tief in dich auf und spiegelst zurück, wie gesund sie sind. Deshalb ist nichts in deinem Leben so entscheidend wie die Wahl deiner Umgebung. Für große Entscheidungen brauchst du Zeit: einen vollen Mondzyklus von etwa 28 Tagen, in dem der Mond alle Tore durchläuft und du dieselbe Frage in vielen inneren Wetterlagen erlebst. Deine Belohnung ist die Fähigkeit zum Staunen – Überraschung ist das Zeichen, dass du richtig lebst."}
};

var AUTORITAETEN={
"Emotional (Solarplexus)":"Dein Solarplexus ist definiert – Klarheit entsteht bei dir nicht im Moment, sondern über die Welle. Was sich heute wie ein klares Ja anfühlt, kann morgen anders aussehen. Deine Wahrheit liegt im Durchschnitt der Welle: Schlafe über wichtige Entscheidungen, erlebe sie in einem Hoch und in einem Tief, und entscheide erst, wenn die Aufregung einer ruhigen Sicherheit gewichen ist. Es gibt für dich keine Wahrheit im Jetzt – Geduld ist keine Schwäche, sondern deine Methode.",
"Sakral":"Dein Bauch antwortet, bevor dein Kopf einen Satz bilden kann – als körperliches Ja (Anziehung, Aufsteigen, ein inneres Mhm) oder Nein (Zusammenziehen, Leere). Diese Antwort kommt im Moment und auf konkrete Fragen. Lass dir Entscheidungen als Ja/Nein-Fragen stellen und vertraue der ersten Regung. Wenn du sie zerdenkst, ist sie weg.",
"Milz (Intuition)":"Deine Autorität ist die leiseste von allen: ein spontanes, einmaliges Wissen im Moment – ein Impuls für Gesundheit, Sicherheit und das richtige Timing. Sie wiederholt sich nicht und argumentiert nicht. Dein Training besteht darin, dieses erste leise Signal ernst zu nehmen, bevor der Verstand es übertönt.",
"Ego (manifestiert)":"Dein Herzzentrum spricht direkt über die Kehle: Was du aus dem Moment heraus sagst und zusagst, zeigt dir deine Wahrheit. Achte darauf, was aus dir herauskommt, wenn du nicht überlegst – und frage dich bei jeder Verpflichtung: Will *ich* das wirklich? Habe ich dafür Herzblut? Nur Zusagen mit echtem Willen dahinter halten dich gesund.",
"Ego (projiziert)":"Dein Wille führt dich – aber als Projektor über die Einladung. Wenn eine Einladung kommt, ist deine Frage: Was springt für mich dabei heraus, und will ich mich dafür wirklich einsetzen? Das klingt egoistisch und ist genau richtig: Dein definierter Wille braucht ein ehrliches Eigeninteresse, sonst brennst du für die Ziele anderer aus.",
"Selbst-projiziert":"Deine Wahrheit liegt in deiner eigenen Stimme. Du erkennst deine Richtung nicht durch Nachdenken, sondern durch Aussprechen: Rede mit Menschen, denen du vertraust – nicht um Rat zu bekommen, sondern um dich selbst sagen zu hören. Achte darauf, ob das, was du sagst, dich deiner Identität und Richtung näherbringt: Macht mich das glücklich? Bin das ich?",
"Mental (Umgebung als Resonanzboden)":"Du hast keine innere Körperautorität – und genau darin liegt deine Freiheit: Deine Klarheit entsteht im Gespräch und über die richtige Umgebung. Sprich Entscheidungen mit mehreren vertrauten Menschen durch, an Orten, an denen du dich wohlfühlst, und höre auf den Klang deiner eigenen Worte über die Zeit. Nicht der Verstand entscheidet, sondern das, was sich über mehrere Resonanzräume hinweg als stimmig herausschält.",
"Lunar (Mondzyklus)":"Als Reflektor entscheidest du mit dem Mond: Über einen Zyklus von etwa 28 Tagen erlebst du eine Frage in vielen inneren Konstellationen. Sprich mit vertrauten Menschen, aber lass dir die Entscheidung nicht abnehmen. Nach dem Zyklus weißt du nicht durch Argumente, sondern durch gelebte Erfahrung, was stimmt."
};

var PROFILE={
"1/3":["Forscher / Märtyrer","Du brauchst ein sicheres Fundament aus Wissen – und lernst gleichzeitig unersetzbar durch Versuch und Irrtum. Was andere Scheitern nennen, ist deine Forschungsmethode: Du findest heraus, was nicht funktioniert, und genau das macht dich zur Autorität."],
"1/4":["Forscher / Opportunist","Du gehst den Dingen auf den Grund und gibst dein gesichertes Wissen über dein Netzwerk weiter. Deine Chancen kommen über Menschen, die dich kennen – Dein Fundament trägt aber nur, wenn du es dir vorher wirklich erarbeitet hast."],
"2/4":["Eremit / Opportunist","Du brauchst deinen Rückzug, um deine natürlichen Talente reifen zu lassen – und wirst immer wieder von außen gerufen, weil andere sehen, was du kannst, bevor du es selbst siehst. Der Ruf kommt über dein Netzwerk. Deine Kunst: Rückzug schützen, ohne die richtigen Rufe zu verpassen."],
"2/5":["Eremit / Häretiker","Zurückgezogenes Naturtalent mit einer Projektionsfläche: Menschen erwarten Lösungen von dir, oft mehr, als du versprochen hast. Wähle genau, für welche Rufe du deine Höhle verlässt – wo du wirklich helfen kannst, wirst du zur stillen Legende."],
"3/5":["Märtyrer / Häretiker","Du lernst durch Anecken und trägst zugleich die Projektion des Retters. Deine Fehlversuche sind kein Makel, sondern das Material deiner Weisheit: Du weißt praktisch, was nicht funktioniert – und genau dafür wird man dich rufen."],
"3/6":["Märtyrer / Vorbild","Erst Trial-and-Error mit voller Wucht, ab etwa dem 30. Lebensjahr zunehmender Rückzug aufs Dach, später gelebte Weisheit. Dein Leben verläuft in klaren Phasen – miss die zweite nicht an der ersten."],
"4/6":["Opportunist / Vorbild","Beziehungen sind dein Fundament: Chancen, Aufgaben und Sinn kommen über dein Netzwerk. Gleichzeitig trägst du den Dreiphasen-Bogen des Vorbilds – vom Erleben über die Beobachtung zur gelebten Autorität."],
"4/1":["Opportunist / Forscher","Das einzige Juxtapositions-Profil: Du fährst auf einer festen Spur. Dein erforschtes Fundament ist nicht verhandelbar, dein Netzwerk trägt es nach außen. Menschen, die dich verbiegen wollen, brechen dich – bleib auf deiner Schiene."],
"5/1":["Häretiker / Forscher","Man projiziert auf dich den Retter, den General, die Lösung. Tragfähig wird das nur durch dein tiefes Fundament: Wenn du wirklich erforscht hast, wovon du sprichst, kannst du die Projektion in praktische Führung verwandeln – und Regeln brechen, die überholt sind."],
"5/2":["Häretiker / Eremit","Die Welt ruft nach dir, während du eigentlich in Ruhe gelassen werden willst. Du wirst für Talente gerufen, die du an dir selbst kaum siehst. Folge nur den Rufen, die sich in deinem Rückzug als richtig anfühlen – dann ist deine Wirkung enorm."],
"6/2":["Vorbild / Eremit","Drei Lebensphasen: eintauchen und ausprobieren (bis ~30), aufs Dach steigen und beobachten (~30–50), dann als gelebtes Vorbild wieder herabkommen. Dein Naturtalent reift im Rückzug – Authentizität ist deine einzige Währung."],
"6/3":["Vorbild / Märtyrer","Auch auf dem Dach bleibt dein Leben in Bewegung: Anläufe, Brüche, Neuanfänge gehören zu dir bis zuletzt. Genau diese Kombination – Überblick plus nie endende Erfahrung – macht deine Weisheit unbestechlich lebensnah."]
};

var ZENTREN_TEXTE={
kopf:{name:"Kopfzentrum",def:"Du erzeugst einen konstanten eigenen Strom aus Fragen und Inspiration – Du inspirierst andere, ohne es zu versuchen.",off:"Du verstärkst die Fragen und Zweifel deiner Umgebung. Weisheit: erkennen, welche Fragen es wert sind, gedacht zu werden – und welche nur Druck von außen sind."},
ajna:{name:"Ajna (Verstand)",def:"Deine Art zu denken und zu begreifen ist beständig – Du hast eine feste Denkstruktur, auf die du dich verlassen kannst.",off:"Du kannst viele Denkweisen aufnehmen und flexibel bleiben. Weisheit: Konzepte müssen bei dir nicht endgültig sein – Nicht-fest-Wissen ist deine Stärke, kein Mangel."},
kehle:{name:"Kehlzentrum",def:"Dein Ausdruck und Handeln haben eine feste, verlässliche Art – Deine Stimme trägt ein konsistentes Thema.",off:"Deine Stimme passt sich der Umgebung an, und du spürst Druck, aufzufallen und zu reden. Weisheit: Wer im richtigen Moment spricht, dem hört man zu."},
g:{name:"G-Zentrum (Identität & Richtung)",def:"Dein Gefühl für Identität, Liebe und Richtung ist stabil – Du weißt, wer du bist, auch wenn sich alles andere ändert.",off:"Identität und Richtung sind bei dir fließend – Du nimmst sie über Orte und Menschen auf. Weisheit: Der richtige Ort und die richtigen Menschen sind für dich Lebensentscheidungen."},
herz:{name:"Herz-/Egozentrum (Wille)",def:"Du hast verlässliche Willenskraft und kannst Versprechen halten – wenn dein Ego wirklich dahintersteht.",off:"Dein Wille kommt in Wellen von außen. Weisheit: Du musst niemandem etwas beweisen – Versprechen unter Beweisdruck sind deine größte Falle."},
sakral:{name:"Sakralzentrum",def:"Deine Lebens- und Arbeitskraft erneuert sich, wenn du auf das Richtige reagierst – Dein Bauch kennt die Antwort.",off:"Du hast keinen eigenen nachwachsenden Motor und weißt oft nicht, wann genug ist. Weisheit: Grenzen setzen, bevor der geliehene Schwung dich verbrennt."},
milz:{name:"Milzzentrum",def:"Dein Immunsystem, dein Zeitgefühl und deine spontane Intuition sind stabil – Du strahlst Sicherheit aus.",off:"Du nimmst Ängste und Unwohlsein der Umgebung auf und hältst Ungesundes zu lange fest. Weisheit: Angst ist bei dir meist geliehen – prüfe, wem sie gehört."},
solarplexus:{name:"Solarplexus (Emotionen)",def:"Du erzeugst eine eigene emotionale Welle mit Hochs und Tiefs – sie ist dein Motor und deine Tiefe, kein Fehler.",off:"Du verstärkst die Gefühle anderer und tust viel, um Konflikte zu vermeiden. Weisheit: Nicht jede Emotion im Raum ist deine – gib zurück, was dir nicht gehört."},
wurzel:{name:"Wurzelzentrum",def:"Du hast einen eigenen, pulsierenden Antriebsdruck – Stress ist für dich Treibstoff mit Rhythmus.",off:"Du spürst den Druck der Welt, alles schnell erledigen zu müssen. Weisheit: Der Druck hört nie auf, egal wie viel du abarbeitest – Eile ist keine Pflicht."}
};

var KANAL_NAMEN={
"1-8":"Inspiration – Der kreative Beitrag","2-14":"Der Schlüsselträger – Richtung mit Kraft","3-60":"Mutation – Ordnung im Neuen",
"4-63":"Logik – Zweifel wird Formel","5-15":"Rhythmus – Im eigenen Fluss","6-59":"Intimität – Nähe und Fortpflanzung",
"7-31":"Der Alpha – Führung durch Wahl","9-52":"Konzentration – Fokussierte Ausdauer","10-20":"Erwachen – Gelebtes Selbst im Jetzt",
"10-34":"Erforschung – Den eigenen Überzeugungen folgen","10-57":"Perfektionierte Form – Intuitives Überleben","11-56":"Neugier – Der Suchende erzählt",
"12-22":"Offenheit – Der soziale Ausdruck","13-33":"Der verlorene Sohn – Zeuge und Erinnerung","16-48":"Talent – Tiefe wird Können",
"17-62":"Akzeptanz – Meinung wird Detail","18-58":"Urteilsvermögen – Korrektur aus Lebensfreude","19-49":"Synthese – Bedürfnisse und Prinzipien",
"20-34":"Charisma – Kraft im Jetzt","20-57":"Die Hellsicht – Intuition spricht","21-45":"Die Geldlinie – Materielle Führung",
"23-43":"Strukturierung – Genialität wird verständlich","24-61":"Bewusstheit – Der Denker im Mysterium","25-51":"Initiation – Der Sprung ins Selbst",
"26-44":"Übertragung – Der Unternehmergeist","27-50":"Bewahrung – Fürsorge und Werte","28-38":"Der Kampf – Sinn im Ringen",
"29-46":"Entdeckung – Hingabe an die Erfahrung","30-41":"Erkennen – Gefühlte Sehnsucht","32-54":"Verwandlung – Ehrgeiz trifft Instinkt",
"34-57":"Kraft – Intuitive Stärke","35-36":"Vergänglichkeit – Der Erfahrungshunger","37-40":"Gemeinschaft – Der Vertrag der Familie",
"39-55":"Emotionale Fülle – Die Stimmung des Dichters","42-53":"Reifung – Zyklen beginnen und beenden","47-64":"Abstraktion – Verwirrung wird Einsicht"};

var TOR_NAMEN={
1:"Selbstausdruck – Die schöpferische Kraft",2:"Empfänglichkeit – Richtung des Selbst",3:"Neubeginn – Ordnung im Chaos",4:"Formeln – Antworten des Verstandes",
5:"Warten – Fester Rhythmus",6:"Reibung – Emotionale Grenze",7:"Das Selbst in Interaktion – Führung",8:"Beitrag – Den eigenen Stil zeigen",
9:"Fokus – Das Kleine mit Kraft",10:"Verhalten – Liebe zum Selbst",11:"Ideen – Der Friedensstifter der Bilder",12:"Vorsicht – Ausdruck im richtigen Ton",
13:"Der Zuhörer – Geheimnisse der Gemeinschaft",14:"Machtvolle Fähigkeiten – Der Besitz",15:"Extreme – Liebe zum Rhythmus der Menschheit",16:"Begeisterung – Fähigkeiten und Experiment",
17:"Meinung – Die Organisation",18:"Korrektur – Verbessern, was verbessert werden kann",19:"Annäherung – Bedürfnis nach Zugehörigkeit",20:"Das Jetzt – Kontemplation wird Präsenz",
21:"Kontrolle – Der Jäger und die Jägerin",22:"Anmut – Offenheit im Sozialen",23:"Assimilation – Vom Genie zum Einfachen",24:"Rationalisierung – Die Rückkehr des Gedankens",
25:"Unschuld – Der Geist des Selbst",26:"Der Egoist – Kraft der Übertragung",27:"Fürsorge – Nähren und Schützen",28:"Der Spieler – Sinn durch Risiko",
29:"Das Ja – Hingabe und Ausdauer",30:"Gefühle – Das Feuer der Sehnsucht",31:"Einfluss – Die gewählte Stimme",32:"Kontinuität – Instinkt für Dauer",
33:"Rückzug – Die Kraft der Erinnerung",34:"Macht – Reine Lebenskraft",35:"Wandel – Hunger nach Erfahrung",36:"Krise – Tiefe durch Turbulenz",
37:"Freundschaft – Der familiäre Vertrag",38:"Der Kämpfer – Widerstand mit Sinn",39:"Provokation – Der Wecker der Emotionen",40:"Alleinsein – Die Kraft der Abgrenzung",
41:"Fantasie – Der Startpunkt aller Erfahrung",42:"Wachstum – Zyklen vollenden",43:"Einsicht – Das innere Wissen",44:"Wachsamkeit – Muster der Vergangenheit",
45:"Der König / Die Königin – Sammeln und Verteilen",46:"Die Liebe zum Körper – Glück des Verkörperns",47:"Bedrängnis – Sinn aus der Verwirrung",48:"Die Tiefe – Der Brunnen des Wissens",
49:"Revolution – Prinzipien und Neuordnung",50:"Werte – Der Hüter der Gesetze",51:"Erschütterung – Mut zur Initiation",52:"Stille – Der Berg der Konzentration",
53:"Anfänge – Druck, Neues zu starten",54:"Ehrgeiz – Der Aufstieg",55:"Fülle – Der Geist im Gefühl",56:"Anregung – Der Geschichtenerzähler",
57:"Sanfte Klarheit – Die intuitive Antenne",58:"Lebensfreude – Vitalität, die verbessern will",59:"Sexualität – Aufbrechen von Barrieren",60:"Begrenzung – Realismus der Mutation",
61:"Das innere Wissen – Mysterium und Inspiration",62:"Details – Die Kunst der Präzision",63:"Zweifel – Der Prüfstein der Logik",64:"Verwirrung – Der Druck, zu verstehen"};

var DEFINITION_TEXTE={
"Keine Definition (Reflektor)":"Ohne feste Verbindungen bist du vollständig offen – siehe Reflektor.",
"Einfache Definition":"Alles in dir ist miteinander verbunden: Deine Energie fließt in einem Stück. Du bist in deiner Verarbeitung eigenständig und schnell – und darfst dich daran erinnern, dass die meisten Menschen mehr Zeit brauchen als du.",
"Gespaltene Definition":"In dir gibt es zwei Bereiche, die sich nicht von selbst berühren. Andere Menschen überbrücken diese Lücke wie ein fehlendes Kabel – deshalb fühlst du dich mit bestimmten Menschen sofort vollständiger. Die Brücke ist ein Geschenk, aber wähle bewusst, wer sie sein darf.",
"Dreifach gespaltene Definition":"Drei Bereiche in dir, die getrennt voneinander schwingen: Du brauchst Bewegung durch verschiedene Auren – Begegnungen, Ortswechsel, Menschenströme –, damit deine Teile sich verbinden. Feste Routinen mit immer denselben Menschen machen dich eng.",
"Vierfach gespaltene Definition":"Vier getrennte Bereiche – das seltenste Muster überhaupt. Deine Verarbeitung braucht schlicht Zeit; Druck zu schnellen Festlegungen ist Gift. Deine Tiefe entsteht langsam und ist dafür unerschütterlich."};

var WINKEL_TEXTE={
"Rechtswinkel-Kreuz":"Dein Weg ist ganz deiner: Du bist hier, um deinen eigenen Weg zu gehen – andere Menschen sind Teil deiner Geschichte, aber der rote Faden bist du selbst.",
"Juxtapositions-Kreuz":"Das seltene fixe Schicksal: Dein Weg verläuft auf einer klaren, eigenen Spur zwischen persönlichem und transpersonalem Thema. Beständigkeit ist keine Sturheit, sondern dein Bauplan.",
"Linkswinkel-Kreuz":"Dein Weg erfüllt sich in Begegnung. Deine wichtigsten Wendepunkte tragen die Namen anderer Menschen – Dein Schicksal ist mit ihren verwoben."};

var PLANET_LABELS={sonne:"Sonne",erde:"Erde",mond:"Mond",nordknoten:"Nordknoten",
  suedknoten:"Südknoten",merkur:"Merkur",venus:"Venus",mars:"Mars",
  jupiter:"Jupiter",saturn:"Saturn",uranus:"Uranus",neptun:"Neptun",pluto:"Pluto"};
var PLANET_SYMBOL={sonne:"☉",erde:"⊕",mond:"☽",nordknoten:"☊",suedknoten:"☋",
  merkur:"☿",venus:"♀",mars:"♂",jupiter:"♃",saturn:"♄",uranus:"♅",neptun:"♆",pluto:"♇"};

return {TYPEN:TYPEN,AUTORITAETEN:AUTORITAETEN,PROFILE:PROFILE,
  ZENTREN_TEXTE:ZENTREN_TEXTE,KANAL_NAMEN:KANAL_NAMEN,TOR_NAMEN:TOR_NAMEN,
  DEFINITION_TEXTE:DEFINITION_TEXTE,WINKEL_TEXTE:WINKEL_TEXTE,
  PLANET_LABELS:PLANET_LABELS,PLANET_SYMBOL:PLANET_SYMBOL};
});
