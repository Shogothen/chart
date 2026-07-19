/* HD-INHALTE, deutsche Deutungstexte (Eigenformulierungen) */
(function(root,factory){
  if(typeof module!=="undefined"&&module.exports)module.exports=factory();
  else root.HDInhalte=factory();
})(typeof self!=="undefined"?self:this,function(){
"use strict";

var TYPEN={
"Generator":{anteil:"ca. 37 % der Menschen",kurz:"Die Lebenskraft der Welt",
 text:"Du trägst einen Motor in dir, der sich jede Nacht neu auflädt, aber nur, wenn er tagsüber für das Richtige lief. Das ist der Kern deines Lebens: Nicht was du tust entscheidet über deine Kraft, sondern ob dein Bauch Ja dazu gesagt hat. Das Leben bringt dir ständig Angebote, Fragen, Situationen, und dein Sakral antwortet körperlich, bevor der Kopf einen Satz bilden kann. Wenn du auf diese Antwort wartest, statt Dingen hinterherzulaufen, verwandelt sich Arbeit in Befriedigung: Du wirst zu dem Menschen, der abends müde und zufrieden ins Bett fällt und morgens Lust auf den Tag hat. Wenn du dagegen initiierst, aus Kopf, Pflicht oder Ungeduld, landest du in Aufgaben, die dich aussaugen, und die Frustration, die dann kommt, ist kein Charakterfehler, sondern eine Kompassnadel. In Beziehungen heißt das: Lass dich fragen, und antworte ehrlich, dein Mhm und dein Mhm-mh sind vollständige Sätze. In der Arbeit heißt es: Der richtige Job fühlt sich im Körper an wie Appetit, der falsche wie Kaugummi ohne Geschmack. Deine Aura ist offen und umarmend, Menschen und Gelegenheiten kommen von selbst zu dir. Du musst nichts jagen. Du musst nur da sein und wahrhaftig antworten."},
"Manifestierender Generator":{anteil:"ca. 33 % der Menschen",kurz:"Die Schnellste im Raum",
 text:"In dir arbeiten zwei Systeme zugleich: der nachwachsende Motor des Generators und ein direkter Draht zur Umsetzung. Deshalb bist du schneller als fast alle, du überspringst Schritte, die andere brauchen, machst drei Dinge parallel und langweilst dich in jedem Prozess, der auf Vollständigkeit besteht. Das ist keine Sprunghaftigkeit, das ist deine Bauart: Du bist gebaut, den kürzesten Weg zu finden, und dafür musst du Dinge anfangen und wieder fallen lassen dürfen. Was du brauchst, sind zwei Disziplinen. Erstens: Auch deine Schnelligkeit braucht die Bauchantwort zuerst, sonst rennst du mit Höchstgeschwindigkeit in Sackgassen. Zweitens: Informiere die Menschen, die dein Tempo betrifft, bevor du abbiegst, nicht um Erlaubnis zu fragen, sondern damit niemand unter deinen Kurswechseln leidet. Wer beides beherzigt, erlebt dich als Naturgewalt im besten Sinn. In Beziehungen bist du lebendig, vielseitig, nie langweilig, und brauchst ein Gegenüber, das Tempo nicht mit Flucht verwechselt. In der Arbeit gehören mehrere Projekte gleichzeitig zu deiner Gesundheit, Ein-Themen-Jobs machen dich krank. Frustration und Ärger zugleich sind dein Signal: Irgendwo läufst du gerade einen fremden Weg."},
"Projektor":{anteil:"ca. 21 % der Menschen",kurz:"Der Blick, der führt",
 text:"Du hast keinen eigenen nachwachsenden Motor, und genau das ist deine Begabung: Weil deine Aura nicht mit Eigenenergie beschäftigt ist, dringt sie in andere Menschen ein und sieht, was dort los ist. Du erkennst, wie jemand tickt, wo Energie versickert, wie ein System effizienter liefe, oft nach Minuten, wofür andere Jahre brauchen. Aber diese Gabe hat eine Bedienungsanleitung: Sie wirkt nur auf Einladung. Ungebetener Rat, und sei er noch so richtig, prallt ab und kostet dich doppelt, die Energie des Gebens und den Schmerz des Abgewiesenwerdens. Warte auf die echte Einladung, die Frage, das Mandat, dann bist du die wertvollste Stimme im Raum. Dein Arbeitsleben folgt anderen Regeln: Drei, vier Stunden fokussierte Wirkung sind dein voller Tag, der Rest ist Studieren, Ruhen, Beobachten, und das ist kein Faulsein, sondern die Pflege deines Instruments. Erfolg heißt für dich Anerkennung: erkannt werden für das, was du wirklich siehst, von den richtigen Menschen. In Beziehungen brauchst du jemanden, der dich sieht, nicht jemanden, den du reparieren darfst. Bitterkeit ist dein Warnsignal, sie sagt nie, dass du falsch bist, sondern nur, dass du dich gerade ungefragt verausgabst."},
"Manifestor":{anteil:"ca. 8 % der Menschen",kurz:"Der erste Funke",
 text:"Du bist einer der wenigen Menschen, die wirklich initiieren können: aus dem Nichts etwas anstoßen, ohne auf ein Angebot, eine Einladung oder eine Antwort warten zu müssen. Dein Impuls kommt von innen, und wenn er kommt, bist du gebaut, ihm zu folgen. Deine Aura ist geschlossen und wirkt auf andere unnahbar bis mächtig, Menschen spüren dich, bevor du sprichst, und reagieren oft mit einem diffusen Kontrollbedürfnis: Was hat sie vor, was macht er da. Genau daraus entsteht die eine Regel, die dein Leben verwandelt: Informiere. Nicht fragen, nicht rechtfertigen, nur die Betroffenen wissen lassen, was du vorhast, bevor du es tust. Es fühlt sich für dich wie eine lästige Fessel an, aber es ist das Öl, das den Widerstand aus deinem Leben nimmt: Informierte Menschen lassen dich machen, uninformierte stellen sich dir in den Weg. Dein Energiemuster arbeitet in Schüben, gewaltige Phasen des Erschaffens, dann echte Ruhe, beides gehört zu dir. In Beziehungen brauchst du Freiheit wie Luft, und ein Gegenüber, das Ankündigungen nicht mit Bittstellerei verwechselt. Wut ist dein Signal: Sie zeigt, wo man dich aufgehalten hat oder wo du vergessen hast zu informieren. Frieden ist dein Lohn, das stille Gefühl, ungehindert wirken zu dürfen."},
"Reflektor":{anteil:"ca. 1 % der Menschen",kurz:"Der Spiegel der Gemeinschaft",
 text:"Du bist der seltenste Typ: Kein einziges Zentrum ist bei dir fest verdrahtet, alles an dir ist offen, durchlässig, empfangend. Das macht dich nicht instabil, es macht dich zum genauesten Messinstrument, das eine Gemeinschaft haben kann. Du spiegelst, was um dich herum ist: die Gesundheit eines Teams, die Stimmung einer Familie, die Wahrheit eines Ortes. Wenn es dir irgendwo dauerhaft schlecht geht, sagt das selten etwas über dich und fast immer etwas über den Ort. Deshalb ist die wichtigste Entscheidung deines Lebens die Umgebung: die richtigen Menschen, die richtigen Räume, die richtige Gemeinde. Dein zweiter Schlüssel ist der Mond: Während andere in sich hineinhorchen, wanderst du mit dem Mondzyklus durch alle Facetten deiner Offenheit, und erst nach etwa 28 Tagen hast du eine große Entscheidung von allen Seiten gefühlt. Nimm dir diese Zeit, sie ist keine Schwäche, sondern dein Verfahren. In Beziehungen bist du ein Wunder an Einfühlung und brauchst ein Gegenüber, das versteht, dass deine Verfassung Tageswetter ist, nicht Charakter. Enttäuschung ist dein Signal: Sie zeigt an, dass du am falschen Ort oder unter Druck entscheidest. Überraschung ist dein Lohn, das Staunen darüber, was das Leben zeigt, wenn man es durch sich hindurchscheinen lässt."}
};

var AUTORITAETEN={
"Sakral":"Dein Bauch antwortet, bevor dein Kopf einen Satz bilden kann: als Anziehung oder Zusammenziehen, als aufsteigendes Mhm oder absackendes Mh-mh, als Appetit oder Würgen im Kleinen. Diese Antwort ist da, körperlich, jetzt, und sie reagiert auf Konkretes, nicht auf Konzepte. Deshalb der wichtigste Trick deines Lebens: Lass dich fragen. Ja-oder-Nein-Fragen, laut gestellt, am besten von jemand anderem, holen die Antwort zuverlässig heraus, wo Grübeln sie zudeckt. Willst du diesen Auftrag? Ziehst du um? Bleibt der Termin? Dein Körper hat schon geantwortet, während der Kopf noch Vor- und Nachteile sortiert. Der Kopf darf danach planen, aber nie zuerst entscheiden. Jedes große Unglück im Leben von Sakralwesen beginnt mit einem Ja, das der Kopf gegeben hat, während der Bauch längst Nein gesagt hatte.",
"Emotional (Solarplexus)":"Deine Wahrheit hat Gezeiten. Was sich im Hoch wie eine glasklare Entscheidung anfühlt, sieht im Tief anders aus, und beides sind ehrliche Momentaufnahmen, keine davon die ganze Wahrheit. Deine Klarheit entsteht über Zeit: Wenn dieselbe Entscheidung im Hoch, im Tief und im Dazwischen immer noch stimmig ist, dann trägt sie. Deshalb dein Satz für alle wichtigen Momente: Ich schlafe darüber, du hörst morgen von mir. Wer dich zu Sofortentscheidungen drängt, drängt dich in Fehler, das darfst du wissen und aussprechen. Es gibt für dich keine spontane Wahrheit bei großen Dingen, und das ist kein Defizit, sondern Tiefgang: Deine Entscheidungen sind, einmal gereift, von einer Qualität, die schnelle Entscheider nie erreichen. Die Wartezeit ist der Preis, die Tiefe ist der Gewinn.",
"Milz (Intuition)":"Deine Autorität spricht genau einmal, leise, im Moment, und wiederholt sich nicht. Ein feines Ziehen, ein Wissen ohne Begründung, ein Ja oder Weg-hier, das schneller da ist als jeder Gedanke. Sie ist der älteste Teil deines Bewusstseins, zuständig für dein Wohl und dein Überleben, und sie irrt fast nie. Ihr Problem ist ihre Lautstärke: Der Verstand übertönt sie mühelos, mit Argumenten, mit Höflichkeit, mit später. Dein Training ist deshalb Stille im Entscheidungsmoment: kurz innehalten, den ersten Impuls registrieren, bevor die Diskussion im Kopf beginnt. Und dann ihm folgen, auch wenn du ihn nicht erklären kannst. Jedes Mal, wenn du das leise Signal übergehst und hinterher lernst, dass es recht hatte, zahlst du Lehrgeld. Irgendwann hörst du beim ersten Mal hin.",
"Ego (manifestiert)":"Deine Wahrheit sitzt im Willen und spricht durch deinen Mund: Was du aus dem Herzen heraus ankündigst, hat Kraft, was du dir abringen lässt, wird zur Last. Die Frage vor jeder Entscheidung lautet: Will ich das wirklich, mit Herz und Brust, oder will es jemand für mich? Sprich deine Entscheidungen laut aus, dein Ich will oder Ich will nicht ist die Autorität selbst, unverhandelbar und oft überraschend direkt. Menschen mögen das fordernd finden, aber verkleidete Wünsche machen dich krank. Verhandle offen um deinen Gegenwert, das ist Systempflege, kein Egoismus: Dein Wille arbeitet nur nachhaltig, wenn Einsatz und Belohnung im Gleichgewicht stehen und Erholung fest zum Deal gehört.",
"Ego (projiziert)":"Deine Wahrheit sitzt im Willen, aber sie zeigt sich dir über die Identität: Du erkennst, was du wirklich willst, wenn du dich sprechen hörst und dabei spürst, ob ein Ich will darin wohnt oder nur ein Ich sollte. Warte auf Einladungen zu den großen Dingen und prüfe dann am eigenen Klang, ob dein Herz mitgeht. Wo es mitgeht, kannst du Zusagen halten wie ein Fels, wo nicht, wird jedes Versprechen zur Hypothek auf deine Substanz. Verhandle offen, was du für deinen Einsatz bekommst, dein Wille braucht Gegenwert und Erholung wie ein Muskel Training und Pause, und beides einzufordern ist Selbstachtung, keine Gier.",
"Selbst-projiziert":"Deine Wahrheit wohnt in der Identität und zeigt sich beim Sprechen: Du hörst dich selbst reden und erkennst am Klang, ob eine Entscheidung zu deinem Weg gehört. Deshalb brauchst du Resonanzräume, Menschen, denen du laut denken darfst, ohne dass sie Ratschläge geben, Spaziergänge mit Selbstgesprächen, Sprachnotizen an dich selbst. Die Frage ist nie, was klug ist, sondern: Bringt mich das in die richtige Richtung, macht mich das mehr zu mir? Dein G-Zentrum kennt deinen Kurs, auch wenn es ihn nicht begründen kann. Achte auf Orte und Menschen: In der falschen Umgebung klingt sogar deine eigene Stimme fremd, in der richtigen weißt du nach drei Sätzen, was zu tun ist.",
"Mental (Umgebung als Resonanzboden)":"Du gehörst zu den wenigen Menschen ohne innere Entscheidungsinstanz unterhalb des Kopfes, und das heißt nicht, dass du nicht entscheiden kannst, sondern dass deine Klarheit außen entsteht. Du brauchst Gespräche, nicht als Ratschlag, sondern als Spiegel: Indem du dieselbe Frage mit verschiedenen vertrauten Menschen besprichst und dir dabei zuhörst, kristallisiert sich heraus, was stimmt. Auch Orte sind Instrumente: Dieselbe Entscheidung fühlt sich in verschiedenen Umgebungen verschieden an, und diese Unterschiede sind Information. Gib dir Zeit und Durchläufe. Deine Umgebung ist dein Entscheidungsorgan, wähle sie so sorgfältig, wie andere ihre Worte wählen.",
"Lunar (Mondzyklus)":"Deine Autorität ist der Mond selbst: Etwa 28 Tage braucht er, um dich durch alle Facetten deiner Offenheit zu tragen, und erst dann hast du eine große Entscheidung von allen Seiten gefühlt. Was sich an Tag 3 dringend anfühlt, ist an Tag 17 vielleicht bedeutungslos, und was an Tag 3 leise war, ist an Tag 25 zur Gewissheit gereift. Sprich über anstehende Entscheidungen mit vertrauten Menschen, nicht für deren Meinung, sondern um dich selbst in Klarheit zu reden. Und lass dich von niemandem hetzen: Ein Mondzyklus Bedenkzeit für Lebensfragen ist bei dir keine Marotte, sondern Präzisionsarbeit. Die Welt, die schnelle Antworten verlangt, bekommt von dir dafür Antworten, die stimmen."
};

var PROFILE={
"1/3":["Forscherin / Entdeckerin","Dein Leben ruht auf zwei Beinen: dem Bedürfnis, Dinge von Grund auf zu verstehen, und der Unvermeidbarkeit, sie trotzdem erst durch Ausprobieren wirklich zu lernen. Du studierst, recherchierst, willst Sicherheit durch Wissen, und dann wirft dich das Leben doch in den Versuch, und der Versuch geht schief, und genau das war die Lektion. Nichts an deinen Umwegen ist Versagen, sie sind deine Methode: Du bist die Person, die am Ende sagen kann, ich habe es gelesen UND erlebt, und diese Kombination macht dein Wissen unbezahlbar. Erlaube dir beides ohne Scham: die lange Vorbereitung und den Bruch danach."],
"1/4":["Forscherin / Netzwerkerin","Du gräbst dich in Themen ein, bis das Fundament sitzt, und dann trägst du dein Wissen dorthin, wo es bei dir am besten wirkt: zu den Menschen, die dich kennen. Deine Chancen kommen nicht über Bewerbungsportale, sie kommen über Beziehungen, über die Freundin, die dich empfiehlt, den Ex-Kollegen, der an dich denkt. Deshalb ist Netzwerkpflege bei dir keine Taktik, sondern Lebensader, und die wichtigste Regel deines Weges lautet: Verlasse nichts Altes, bevor das Neue steht, keinen Job, keine Stadt, keine Beziehung. Dein Fundament plus dein Netz ergibt einen schmalen, aber sehr sicheren Weg."],
"2/4":["Einsiedlerin / Netzwerkerin","In dir wohnt ein Talent, das keine Anstrengung braucht, und deshalb hältst du es für nichts Besonderes. Andere sehen es klarer als du: Sie rufen dich heraus, empfehlen dich, schieben dir Gelegenheiten zu, während du eigentlich nur deine Ruhe wolltest. Dieses Wechselspiel ist dein Leben: Rückzug, in dem die Gabe reift, und ein Netz von Menschen, das dich immer wieder ans Licht holt. Beides braucht Pflege: den geschützten Raum, in dem du niemandem etwas beweisen musst, und die wenigen echten Verbindungen, über die deine Berufungen kommen. Lerne, die richtigen Rufe von den falschen zu unterscheiden, am Körpergefühl, nicht an der Schmeichelei."],
"2/5":["Einsiedlerin / Retterin","Du willst deine Ruhe, und die Welt will dich: Diese Spannung ist dein Profil. In deinem Rückzug reift ein natürliches Talent, und gleichzeitig projizieren Menschen Lösungen auf dich, oft für Probleme, von denen du nichts wusstest. Man ruft dich heraus, verehrt dich, wenn du lieferst, und wendet sich enttäuscht ab, wenn nicht, obwohl du nie etwas versprochen hast. Deine Kunst ist die Auswahl: Nicht jeder Ruf verdient eine Antwort. Prüfe, ob die Projektion zu deinem tatsächlichen Talent passt, und antworte nur dann. Dann wirst du zu dem seltenen Menschen, der aus der Stille kommt, das Richtige tut und wieder verschwindet, und genau dafür geliebt wird."],
"3/5":["Entdeckerin / Retterin","Dein Leben ist eine Werkstatt: Du probierst, es bricht, du lernst, und aus tausend solcher Brüche ist eine Praxiskompetenz gewachsen, die kein Studium ersetzt. Gleichzeitig sehen Menschen in dir die Retterin, die Frau für die schwierigen Fälle, und das Schöne ist: Die Projektion stimmt, denn du hast wirklich fast alles schon einmal repariert, verloren, wiedergefunden. Deine Reibung: Man erwartet Perfektion von jemandem, dessen Methode das produktive Scheitern ist. Steh zu deinen Brüchen, erzähl von ihnen, sie sind deine Referenzen. Die glaubwürdigste Hilfe kommt von der, die selbst im Graben lag und herausgeklettert ist."],
"3/6":["Entdeckerin / Vorbild","Dein Leben hat Kapitel wie kaum ein anderes: In den ersten etwa dreißig Jahren wirfst du dich ins Ausprobieren, sammelst Brüche, Beziehungen, Berufe, Erfahrungen, und es fühlt sich oft chaotisch an. Dann steigst du aufs Dach: eine lange Phase des Beobachtens, in der du weniger springst und mehr verstehst. Und irgendwann steigst du wieder herab, als Mensch, dem man glaubt, weil alles an dir gelebt ist. Nichts aus deiner wilden Zeit war umsonst, sie ist das Rohmaterial deiner späteren Autorität. Sei geduldig mit der Dramaturgie deines Lebens: Es ist auf Reife angelegt, nicht auf Frühstart."],
"4/6":["Netzwerkerin / Vorbild","Deine Chancen kommen über Menschen, die dich kennen, und dein Ansehen wächst mit den Jahren wie ein Baum: erst Erfahrungen, dann Überblick, dann Vertrauen. Du bist auf Freundschaft gebaut, echte, lange, belastbare Verbindungen sind dein Kapital und dein Zuhause. In der ersten Lebenshälfte sammelst du auch schmerzhafte Beziehungslektionen, ab der Lebensmitte wirst du zunehmend zu der Person, die man um Rat fragt, nicht wegen Titeln, sondern weil dein Leben selbst das Argument ist. Pflege dein Netz wie einen Garten und wechsle nie ins Leere: Das Neue muss stehen, bevor du das Alte verlässt."],
"4/1":["Netzwerkerin / Forscherin","Dein Profil ist das seltenste und das festeste: ein unverrückbares Fundament aus dem, was du gründlich verstanden hast, getragen von einem Netz aus Menschen, die dir vertrauen. Dein Weg ist schmal, du bist nicht gebaut, dich ständig neu zu erfinden, sondern deine eine Sache zu vertiefen und über deine Verbindungen in die Welt zu tragen. Das kann sich anfühlen wie mangelnde Flexibilität, in Wahrheit ist es Verlässlichkeit in Person: Auf dich und dein Wissen kann man Häuser bauen. Schütze dein Fundament vor Menschen, die dich verbiegen wollen, und dein Netz vor Oberflächlichkeit, dann trägt dein Weg ein Leben lang."],
"5/1":["Retterin / Forscherin","Man projiziert auf dich die Lösung: die Retterin, die Generalin, die Frau, die es richten wird, oft bevor du ein Wort gesagt hast. Diese Projektion ist Bürde und Bühne zugleich. Tragfähig wird sie durch dein Fundament: Wenn du wirklich erforscht hast, wovon du sprichst, verwandelst du Erwartung in praktische Führung und darfst sogar Regeln brechen, die überholt sind, man wird dir folgen. Ohne Fundament aber verbrennt dich dieselbe Projektion: Wer als Retterin scheitert, wird doppelt verurteilt. Deine Lebenskunst: Nimm nur Rufe an, die dein Wissen decken kann, liefere, und zieh dich zurück, bevor die Verehrung in Anspruchsdenken kippt."],
"5/2":["Retterin / Einsiedlerin","Du wirst gerufen, ob du willst oder nicht: Menschen sehen in dir Lösungen, während du eigentlich im Rückzug wärst, wo dein natürliches Talent zuhause ist. Das Paradox deines Lebens: Deine Wirkung entsteht ohne dein Zutun, dein Ruf eilt dir voraus, und du erfährst manchmal als Letzte, was man dir alles zutraut. Deine Aufgabe ist Unterscheidung: Welcher Ruf trifft wirklich dein Talent, und welcher nur die Projektion? Den richtigen folgst du, und es fühlt sich mühelos an. Den falschen gegenüber darfst du unsichtbar bleiben, ohne Schuld. Wer dich zwingen will, ständig verfügbar zu sein, hat dein Design nicht verstanden."],
"6/2":["Vorbild / Einsiedlerin","Dein Leben ist eine Dreiaktstruktur mit eingebautem Rückzugsort: Erst springst du hinein und eckst an, dann steigst du aufs Dach und beobachtest, und in der reifen Phase wirst du zum gelebten Beispiel, zu dem Menschen aufschauen, gerade weil du nie danach gestrebt hast. Dazwischen zieht es dich immer wieder in die Einsiedelei, wo dein natürliches Talent ohne Publikum atmen kann. Vertraue dieser Dramaturgie: Die Anecker-Jahre waren Forschung, die Dach-Jahre sind Reifung, und was danach kommt, ist Autorität ohne Anstrengung. Deine Währung ist Vertrauen, verspiele es nie für kurzfristige Vorteile, es ist das Einzige, was du wirklich besitzt."],
"6/3":["Vorbild / Entdeckerin","In dir verbinden sich das Vorbild und die Entdeckerin: Auch nach der wilden ersten Lebensphase hört bei dir das Ausprobieren nie ganz auf, das Leben zieht dich immer wieder vom Beobachtungsdach herunter in den nächsten Versuch. Das kann sich anfühlen wie ein Widerspruch, du sollst doch weise sein und brichst schon wieder etwas, aber genau das ist deine Art von Weisheit: gelebte, geerdete, ständig aktualisierte Erfahrung. Menschen glauben dir, weil du nicht aus der Theorie sprichst, sondern aus letzter Woche. Verzeih dir die späten Brüche, sie halten dein Vorbild lebendig, ein Vorbild, das nie mehr stolpert, wird zur Statue."]
};

var ZENTREN_TEXTE={
"kopf":{
  name:"Kronenzentrum",
  def:"In dir entsteht Inspiration aus eigener Quelle: Fragen steigen auf, Bilder, ein Druck zu verstehen, der von innen kommt und nicht von der Welt gemacht wird. Du bist einer der seltenen Menschen, die andere zum Denken anstiften, dein Kopfdruck ist ansteckend im besten Sinn.",
  defWachstum:"Behandle deine Fragen wie Gäste: Sie dürfen bleiben, ohne sofort beantwortet zu werden. Die wertvollsten deiner Inspirationen reifen über Tage, und du darfst sie laut mit anderen teilen, genau dafür sind sie da.",
  defSchatten:"Der Druck zu verstehen kann zur Dauerbeschallung werden: Du hältst jede aufsteigende Frage für einen Arbeitsauftrag und zerdenkst Nächte für Rätsel, die nie deine Aufgabe waren.",
  off:"Deine Krone ist offen: Du denkst die Fragen der Menschen um dich herum mit, und in stiller Umgebung wird dein Kopf wunderbar klar. Du kannst Inspiration von überall aufnehmen und bist frei zu wählen, worüber du wirklich nachdenken willst.",
  offWachstum:"Deine Freiheit liegt in der Auswahl: Nicht jede Frage, die in deinem Kopf laut wird, gehört dir. Frag dich bei Gedankendruck zuerst, mit wem du gerade zusammen warst, oft löst sich das Drängen in dem Moment, in dem du es zuordnest.",
  offSchatten:"Fremder Denkdruck fühlt sich an wie eigener: Du beschäftigst dich mit Dingen, die dich nichts angehen, und hältst die Unruhe im Kopf für deine Unfähigkeit, endlich alles zu klären."
 },
"ajna":{
  name:"Ajna",
  def:"Dein Verstand arbeitet in festen Bahnen: Du verarbeitest Eindrücke auf deine charakteristische Weise, formst Konzepte, Meinungen, Gewissheiten. Auf deine Art zu denken ist Verlass, sie ist Teil deiner Identität, Menschen kennen dich an deinen Gedanken.",
  defWachstum:"Deine Denkweise ist ein Werkzeug, kein Gericht: Sie darf sortieren und deuten, aber die Lebensentscheidungen gehören deiner Autorität. Wenn Kopf und Bauchgefühl streiten, hat der Kopf ein Rederecht und der Körper das letzte Wort.",
  defSchatten:"Gewissheit kann zur Festung werden: Du verwechselst deine Deutung mit der Wirklichkeit und verteidigst Standpunkte, längst nachdem sie dir selbst nicht mehr dienen.",
  off:"Dein Denken hat keine feste Bahn, und das ist eine Begabung: Du kannst jede Sichtweise von innen nachvollziehen, Konzepte wechseln wie Brillen und in Diskussionen alle Seiten verstehen. Aus dir kann tiefe Weisheit über das Denken selbst werden.",
  offWachstum:"Du musst dir nicht sicher sein, das ist deine Stärke: Erlaube dir, heute anders zu denken als gestern. Schreib wichtige Einsichten auf, bevor sie weiterziehen, dein Geist ist ein Durchgangsort für Erkenntnisse, kein Lagerhaus.",
  offSchatten:"Die Angst, dumm zu wirken, lässt dich Gewissheit spielen: Du klammerst dich an geliehene Meinungen und vertrittst sie härter als ihre Urheber, damit niemand dein Schwanken bemerkt."
 },
"kehle":{
  name:"Kehle",
  def:"Deine Stimme hat einen festen Kanal: Auf deine Art zu sprechen und zu handeln ist Verlass, sie hat Wiedererkennungswert und Wirkung. Was durch deine Kehle in die Welt kommt, trägt deine Signatur, Worte und Taten mit klarer Handschrift.",
  defWachstum:"Deine Stimme wirkt am stärksten, wenn sie an deine Strategie gekoppelt ist: gefragt, eingeladen, als Antwort. Dann bewegt ein Satz von dir mehr als anderswo eine Rede.",
  defSchatten:"Verlässliche Wirkung verführt zum Dauersenden: Du redest, um den Raum zu füllen, und die Signatur, die dich besonders macht, nutzt sich ab wie eine zu oft gespielte Single.",
  off:"Deine Stimme ist ein Verwandlungskünstler: Sie passt sich dem Raum an, spricht mal so, mal so, und kann für Menschen sprechen, die selbst keine Worte finden. Der Drang, dich durch Reden bemerkbar zu machen, ist ihr bekanntester Nebeneffekt.",
  offWachstum:"Du musst dich nicht ins Gespräch drängen, du wirst gehört, wenn man dich anspricht, und dann oft mit erstaunlicher Treffsicherheit. Warte auf die Lücke, die sich dir öffnet, statt eine zu erzwingen, das schont dich und erhöht deine Wirkung.",
  offSchatten:"Der Druck, endlich gesehen zu werden, spricht aus dir: Du redest zu früh, zu viel, zu laut, und erlebst genau die Übergehung, die du fürchtest, weil erzwungene Worte kein Gewicht haben."
 },
"g":{
  name:"G-Zentrum",
  def:"Deine Identität steht: Du weißt, wer du bist, auch wenn du es nicht erklären kannst, und deine Richtung im Leben hat einen festen inneren Kompass. Liebe und Selbstgefühl kommen bei dir von innen, du bist für andere ein Orientierungspunkt, oft ohne es zu merken.",
  defWachstum:"Vertraue deinem Kurs auch dort, wo er von außen unlogisch aussieht: Dein G-Zentrum navigiert in größeren Bögen, als der Verstand überblickt. Menschen, die dich verbiegen wollen, verwechseln deine Festigkeit mit Sturheit, das ist ihr Irrtum, nicht deiner.",
  defSchatten:"Ein fester Kompass kann taub machen für Kurskorrekturen: Du hältst an einer Richtung fest, weil sie deine ist, nicht weil sie noch stimmt.",
  off:"Deine Identität ist fließend, und das ist keine Schwäche, sondern eine seltene Beweglichkeit: Du wirst ein Stück weit zu dem Ort und den Menschen, mit denen du dich umgibst, und spürst dadurch wie kein anderer, ob eine Umgebung gesund ist.",
  offWachstum:"Deine wichtigste Lebensentscheidung ist die Umgebung: die richtigen Orte, die richtigen Menschen. Wähle sie so sorgfältig wie andere ihren Beruf, denn in der richtigen Umgebung fühlst du dich richtig, und dann stimmt auch der Rest.",
  offSchatten:"Auf der Suche nach dir selbst probierst du Identitäten wie Mäntel und erschrickst, dass keiner ganz passt: Die Frage, wer du wirklich bist, war nie zum Beantworten gedacht, sondern zum Wandern."
 },
"herz":{
  name:"Herz",
  def:"Dein Wille ist echt: Du kannst dir etwas vornehmen und es halten, Versprechen geben und einlösen, dich behaupten, ohne dich zu entschuldigen. Dieses kleine Zentrum macht dich durchsetzungsfähig und gibt deinem Wort Gewicht.",
  defWachstum:"Dein Wille ist ein Muskel mit Vertrag: Er arbeitet verlässlich, wenn Einsatz und Gegenwert stimmen und Erholung fest eingeplant ist. Verhandle offen, was du für deinen Einsatz bekommst, das ist Selbstachtung, kein Egoismus.",
  defSchatten:"Wer immer liefern kann, verspricht leicht zu viel: Du überziehst das Konto deines Willens, und aus der Kraft, die dich auszeichnet, wird Verschleiß mit Ansage.",
  off:"Dein Selbstwert hängt an keinem inneren Motor, und genau deshalb kannst du Wert erkennen wie kein anderer: bei Menschen, bei Dingen, bei Leistungen. Du musst niemandem etwas beweisen, das ist keine Floskel, sondern deine Bauart.",
  offWachstum:"Der Satz, der dich frei macht: Ich habe nichts zu beweisen. Versprich klein und halte groß, lass andere die Wetten abschließen. Dein Gespür für den Wert der Dinge ist deine stille Währung, setz sie ein, statt dich zu verausgaben.",
  offSchatten:"Der Beweisdrang flüstert: noch ein Versprechen, noch eine Schippe, dann bist du genug. Aber das Konto, auf das du einzahlst, gehört nicht dir, und genug wird es auf diesem Weg nie."
 },
"sakral":{
  name:"Sakral",
  def:"In dir arbeitet der stärkste Motor des Systems: Lebens- und Arbeitskraft, die sich über Nacht erneuert, wenn sie tagsüber für das Richtige lief. Dein Bauch antwortet auf das Leben, bevor der Kopf mitreden kann, und diese Antwort ist deine verlässlichste Wahrheit.",
  defWachstum:"Pflege deinen Motor wie ein Instrument: Erschöpft ins Bett zu fallen ist gesund, wenn es die richtige Erschöpfung war. Lass dich fragen, hör auf dein Mhm und dein Mh-mh, und gönn dir den Luxus, auf Dinge zu warten, die eine echte Antwort auslösen.",
  defSchatten:"Ein Motor, der immer läuft, wird gern eingespannt: Du sagst Ja aus Gewohnheit, arbeitest für fremde Ziele und wunderst dich über eine Müdigkeit, die kein Schlaf repariert.",
  off:"Du hast keinen eigenen nachwachsenden Motor, du läufst mit geliehener Energie, und in Gesellschaft von Sakralwesen sogar mit verstärkter. Deshalb kannst du zeitweise mehr leisten als alle anderen, und deshalb ist Ruhe für dich keine Belohnung, sondern Betriebsstoff.",
  offWachstum:"Deine Kunst ist das Aufhören: vor der Erschöpfung, nicht nach ihr. Plane Arbeitsphasen wie Sprints mit festem Ende, und geh vor dem Schlafen zur Ruhe, bevor du müde bist, dein System braucht Auslaufzeit, um fremde Energie abzugeben.",
  offSchatten:"Geliehene Energie fühlt sich an wie eigene, bis sie weg ist: Du weißt nicht, wann genug ist, überarbeitest dich im Takt der anderen und hältst deinen Zusammenbruch für Charakterschwäche."
 },
"milz":{
  name:"Milz",
  def:"Dein Immunsystem im weitesten Sinn ist wach: ein Instinkt für das, was dir guttut und was nicht, ein leises Ja und Weg-hier, das im Moment spricht. Diese Intuition ist der älteste Teil deiner Intelligenz, und sie hat ein erstaunlich gutes Gedächtnis für Gefahr.",
  defWachstum:"Übe die Kunst des ersten Impulses: innehalten, registrieren, folgen, bevor der Verstand die Diskussion eröffnet. Deine Intuition wiederholt sich nicht, aber sie wird deutlicher, je öfter du ihr recht gibst.",
  defSchatten:"Wer sich sicher fühlt, überhört das leise Signal am leichtesten: Ausgerechnet deine Stärke macht dich nachlässig, und die Warnung, die nur einmal spricht, verhallt im Lärm der Argumente.",
  off:"Deine Milz ist offen: Du nimmst die Ängste und das Unwohlsein anderer wahr, als wären es deine, und weißt dadurch mehr über das Befinden eines Raumes als jeder darin. Mit der Zeit kannst du daraus Weisheit machen: zu wissen, welche Angst wessen ist.",
  offWachstum:"Frag bei plötzlichem Unbehagen zuerst: Gehört das mir? Oft bist du das Echo eines anderen. Und lass Dinge los, Menschen, Gewohnheiten, Besitz, das Festhalten aus diffuser Angst ist das Muster der offenen Milz, nicht deine Wahrheit.",
  offSchatten:"Diffuse Angst sucht sich Gründe: Du bleibst in Jobs, Beziehungen und Routinen, die dir nicht guttun, weil das Bekannte sich sicherer anfühlt als das Bessere."
 },
"solarplexus":{
  name:"Solarplexus",
  def:"Deine Gefühlswelt läuft in Wellen: Hoch, Tief und alles dazwischen, ohne dass es dafür Gründe braucht. Diese Welle ist keine Störung, sie ist ein Wahrnehmungsorgan, das die Welt in Tiefenschärfe fühlt, wo andere nur Momentaufnahmen machen.",
  defWachstum:"Lerne deine Welle wie eine Gezeitentafel: Im Hoch nichts versprechen, im Tief nichts beenden, und große Entscheidungen erst, wenn dieselbe Antwort durch alle Wetterlagen getragen hat. Sag den Menschen um dich, wie deine Welle funktioniert, das nimmt allen die Schuld.",
  defSchatten:"Wer die Welle bekämpft, macht aus Wetter ein Drama: Du suchst im Tief den Schuldigen, triffst im Hoch die Entscheidungen und wunderst dich, dass beides bereut wird.",
  off:"Dein Gefühlsraum ist offen: Du empfängst die Emotionen der Menschen um dich, verstärkt, ungefiltert, echt. Du weißt vor allen anderen, wie es jemandem wirklich geht, Empathie ist bei dir keine Fähigkeit, sondern ein Dauerzustand.",
  offWachstum:"Unterscheide Empfangen von Besitzen: Nicht jedes Gefühl in deinem Körper ist deins. Bei starken Emotionen hilft ein Schritt aus dem Raum, im Wortsinn, wenn das Gefühl draußen leiser wird, war es geliehen. Und: Konflikte aushalten lernen lohnt sich, Wahrheit ist wichtiger als Harmonie.",
  offSchatten:"Die Angst vor Konfrontation regiert leise mit: Du sagst Ja, um Frieden zu halten, weichst Wahrheiten aus, die wehtun könnten, und zahlst mit einem Leben, das anderen gefällt."
 },
"wurzel":{
  name:"Wurzel",
  def:"In dir arbeitet ein Druckwerk: Stress als Treibstoff, der Dinge in Bewegung bringt. Dein Druck hat einen eigenen Puls, mal an, mal aus, und wenn er an ist, erledigst du in Stunden, wofür andere Wochen brauchen.",
  defWachstum:"Reite deine Druckwellen, statt sie zu glätten: Wenn der Puls an ist, gib ihm Großes zu tun. Wenn er aus ist, ist Pause keine Faulheit, sondern die andere Hälfte deines Systems. Dein Rhythmus ist unregelmäßig und trotzdem verlässlich.",
  defSchatten:"Dauerdruck ohne Ventil wird zur Getriebenheit: Du erledigst hektisch Nebensächliches, um den Druck loszuwerden, und das Wichtige wartet, bis es selbst zum Druck wird.",
  off:"Deine Wurzel ist offen: Du spürst den Druck der Welt, Deadlines, Erwartungen, Unruhe, verstärkt und ungefiltert. Deshalb erledigst du Dinge oft schnell, nur damit der Druck aufhört, und deshalb bist du in ruhiger Umgebung ein anderer Mensch.",
  offWachstum:"Deine Befreiung ist die Einsicht, dass der Druck nie fertig wird: Es gibt immer noch eine Mail, noch eine Aufgabe. Erledige Dinge, wenn sie dran sind, nicht, wenn der Druck drängt, und prüfe bei Eile immer, wessen Eile das eigentlich ist.",
  offSchatten:"Fremder Druck diktiert deinen Takt: Du hetzt durch Aufgaben, um endlich Ruhe zu haben, aber die Ruhe kommt nie, weil der nächste Druck schon ansteht, und deine Hast produziert die Fehler, die neuen Druck erzeugen."
 }
};



/* Ausführliche Kanaltexte: Bedeutung, Alltag, Schatten */
var KANAL_TEXTE={
"1-8":{kern:"Der Kanal der Inspiration verbindet den schöpferischen Kern mit dem Beitrag: Du lebst so unverwechselbar du selbst, dass allein dein Beispiel andere ermutigt, echter zu werden. Du inspirierst nicht durch Predigen, sondern durch Vormachen.",
 alltag:"Menschen kopieren deine Art, Dinge zu tun, deine Formulierungen, deinen Stil, oft ohne es zu merken. Nimm das als Kompliment und als Verantwortung.",
 schatten:"Wenn du dich verbiegst, um zu gefallen, verlierst du genau die Eigenart, die dein Geschenk ist, und inspirierst niemanden mehr, am wenigsten dich."},
"2-14":{kern:"Der Schlüssel und das Schloss: Deine Richtung trifft auf einen Motor, der Ressourcen mehren kann. Du bist gebaut, um Fülle in eine Richtung zu lenken, die größer ist als Kontostand, eine Art Lebenskurs mit Rückenwind.",
 alltag:"Geld und Mittel finden dich leichter als andere, wenn du der eigenen Richtung treu bleibst statt fremden Zielen hinterherzuarbeiten.",
 schatten:"Auf fremdem Kurs arbeitet dein Motor genauso hart, aber die Fülle bleibt aus, und du verstehst nicht warum, bis du merkst, wessen Ziel du gerade finanzierst."},
"3-60":{kern:"Der Kanal der Mutation: In dir will sich etwas grundlegend erneuern, und es tut das in Schüben. Zwischen den Schüben liegt Stille, die sich wie Melancholie anfühlt und in Wahrheit Reifezeit ist. Aus deiner Begrenzung wird das wirklich Neue geboren.",
 alltag:"Du erlebst Phasen, in denen scheinbar nichts vorangeht, und dann verändert sich in Wochen mehr als sonst in Jahren. Plane mit diesem Puls statt gegen ihn.",
 schatten:"Wenn du die stillen Phasen als Stillstand bekämpfst, brichst du die Mutation ab, kurz bevor sie springen wollte."},
"4-63":{kern:"Die Logik in Person: Dein Zweifel stellt die Frage, dein Kopf liefert die Formel. Du prüfst die Zukunft auf Tragfähigkeit und gibst anderen Muster, auf die man bauen kann. Das ist ein Dienst, kein Charakterfehler.",
 alltag:"Du erkennst in Plänen sofort das Loch, das allen anderen erst in drei Monaten auffällt. Sag es früh und freundlich, dann bist du unbezahlbar.",
 schatten:"Ungefragt wird aus deiner Prüfung Besserwisserei, und gegen dich selbst gerichtet wird der Zweifel zur Schlaflosigkeit über Fragen, die keine Antwort schulden."},
"5-15":{kern:"Der Kanal des Rhythmus: Du bist eingebunden in einen Takt, der größer ist als Terminkalender, und wenn du in deinem Fluss bist, ordnet sich das Leben um dich herum wie von selbst. Deine Extreme und deine Rituale gehören zusammen.",
 alltag:"Es gibt richtige und falsche Zeiten für dich, spürbar körperlich. Ein Umzug, ein Jobwechsel, sogar ein Gespräch gelingt anders, je nachdem, ob es in deinem Takt liegt.",
 schatten:"Wenn du dich in fremde Taktung pressen lässt, gerät nicht nur dein Tag durcheinander, sondern dein ganzes Timing, und du bist ständig knapp daneben."},
"6-59":{kern:"Der Kanal der Intimität: Deine Aura löst Barrieren auf. Menschen lassen dich näher, als sie es sich vorgenommen hatten, und in dieser Nähe entsteht, was das Leben weiterträgt, Vertrauen, Bindung, Fruchtbarkeit in jedem Sinn.",
 alltag:"Fremde erzählen dir im Zug ihr halbes Leben. Kollegen vertrauen dir Dinge an, die sonst niemand weiß. Deine Nähe ist eine Ressource, geh bewusst mit ihr um.",
 schatten:"Nähe ohne Auswahl zieht auch die Falschen an, und Nähe als Werkzeug eingesetzt hinterlässt bei anderen das Gefühl, benutzt worden zu sein."},
"7-31":{kern:"Der Kanal des Alpha: die Verbindung von innerer Richtung und gewählter Stimme. Du bist zum Führen gebaut, aber demokratisch, deine Führung funktioniert nur, wenn die Gruppe dich ruft. Dann sprichst du aus, wohin es gehen muss.",
 alltag:"In Meetings drehen sich am Ende die Köpfe zu dir, auch wenn du nicht die Chefin bist. Warte auf diesen Moment, er ist dein Mandat.",
 schatten:"Selbsternannte Führung ist deine Sackgasse: Dieselben Worte, die gerufen Berge versetzen, prallen ungerufen ab und machen dich zur Belehrenden."},
"9-52":{kern:"Der Kanal der Konzentration: die Kraft des Berges, gebündelt auf ein Detail. Du kannst dich in eine Sache versenken, bis sie durchdrungen ist, eine Fähigkeit, die in einer zerstreuten Welt selten und kostbar geworden ist.",
 alltag:"Wenn dich etwas gepackt hat, vergisst du Zeit, Essen und Handy. Schaffe dir Bedingungen, unter denen dieser Zustand erlaubt ist, er ist deine Produktivform.",
 schatten:"Auf das falsche Detail fokussiert bohrst du mit derselben Hingabe ein Loch ins Nichts, und die Unruhe, wenn kein Fokus da ist, macht dich rastlos statt ruhig."},
"10-20":{kern:"Der Kanal des Erwachens: Selbstliebe, die im Jetzt ausgesprochen wird. Deine Kraft liegt darin, in diesem Moment ganz zu dir zu stehen, hörbar und sichtbar. Das ist gelebtes Erwachen, keine Esoterik, sondern Haltung.",
 alltag:"Deine stärksten Sätze beginnen mit Ich und stehen im Präsens. Wenn du so sprichst, spüren Menschen sofort, dass hier jemand bei sich ist.",
 schatten:"Von anderen abgeschaut klingt Selbstliebe hohl, und die Sorge, wie dein Verhalten ankommt, zieht dich genau aus dem Moment, der deine Bühne ist."},
"10-34":{kern:"Der Kanal der Entdeckung: Selbstliebe mit Motor. Du folgst deinen eigenen Überzeugungen mit einer Kraft, die keine Erlaubnis braucht, und entdeckst dabei Wege, die es vor dir nicht gab. Dein Leben ist das Experiment.",
 alltag:"Du machst am Ende doch dein Ding, egal wie viele es dir ausreden wollten, und meistens stellt sich später heraus, dass es richtig war.",
 schatten:"Ohne die Antwort deines Bauches wird aus Eigenständigkeit Eigensinn, und du verteidigst Wege, die du nur gehst, weil man dir abgeraten hat."},
"10-57":{kern:"Der Kanal der perfektionierten Form: Selbstliebe, geführt von Intuition. Dein Überleben und dein Gedeihen hängen daran, dass du dem leisen Signal folgst, das dich durch jeden Moment lotst. Du bist gebaut, um heil durchs Leben zu kommen.",
 alltag:"Du weißt oft eine Sekunde vorher, dass etwas kippt: das Gespräch, das Wetter, die Stimmung im Raum. Dieses Vorwissen ist verlässlicher als jede Analyse.",
 schatten:"Jedes Mal, wenn du das leise Signal mit Logik überstimmst, lernst du hinterher, warum es recht hatte, manche Lektionen davon sind teuer."},
"11-56":{kern:"Der Kanal der Neugier: Ideen werden zu Geschichten, Geschichten werden zu Anregung. Du bist eine Sucherin, die nicht finden muss, das Suchen selbst, das Erzählen selbst ist der Sinn. Deine Bilder bringen andere zum Denken.",
 alltag:"Du bist die Person, deren Anekdoten hängenbleiben. Aus einem Einkauf machst du eine Erzählung, aus einer Doku ein Gesprächsthema für Wochen.",
 schatten:"Wenn du glaubst, jede deiner Ideen selbst leben zu müssen, erdrückt dich der eigene Reichtum, die meisten Ideen sind Saatgut für andere."},
"12-22":{kern:"Der Kanal der Offenheit: Anmut trifft Vorsicht, und heraus kommt eine Stimme, die in den richtigen Momenten Herzen öffnet. Du bist ein soziales Instrument, das nach Stimmung gestimmt ist, wenn die Welle stimmt, veränderst du mit einem Satz den Raum.",
 alltag:"An guten Tagen kannst du Fremde für dich gewinnen, verhandeln, versöhnen. An anderen Tagen ist Rückzug kein Versagen, sondern Pflege des Instruments.",
 schatten:"Gegen die eigene Stimmung gesprochen klingt selbst Wahres falsch, und du wunderst dich, warum derselbe Satz gestern zauberte und heute verletzt."},
"13-33":{kern:"Der Kanal des verlorenen Sohnes: Du hörst die Geschichten der Menschen, ziehst dich zurück und kehrst mit Weisheit wieder. Zeugin und Chronistin in einem, du verwandelst Erlebtes, eigenes wie fremdes, in Lehren, die bleiben.",
 alltag:"Nach intensiven Phasen brauchst du Rückzug, um zu verarbeiten. Danach kannst du erzählen, was wirklich geschehen ist, und alle hören zu.",
 schatten:"Geheimnisse, die du hütest, können zur Last werden, und Rückzug ohne Wiederkehr macht aus der Chronistin eine Verschollene."},
"16-48":{kern:"Der Kanal des Talents: Begeisterung schöpft aus der Tiefe. Wiederholung ist dein Geheimnis, aus tausendmal Üben wird bei dir Meisterschaft, die mühelos aussieht. Die Tiefe liefert, die Begeisterung formt.",
 alltag:"Was du wirklich kannst, hast du dir erarbeitet: das Instrument, das Handwerk, die Sprache, den Beruf. Zeig es, du hast das Recht dazu erworben.",
 schatten:"Der ewige Zweifel, noch nicht bereit zu sein, hält ausgerechnet die Talentierteste im Übungsraum, während draußen Stümper die Bühne füllen."},
"17-62":{kern:"Der Kanal der Akzeptanz: Meinung wird mit Fakten unterlegt, bis eine Struktur entsteht, der man folgen kann. Du bist die Organisatorin des Denkens, deine Konzepte geben Gruppen Halt und Zukunftspläne ein Gerüst.",
 alltag:"Du bist die, die aus dem Brainstorm eine Gliederung macht, aus dem Chaos einen Plan, aus der Ahnung ein Argument mit Belegen.",
 schatten:"Details können zum Panzer werden: Wer jede Zahl parat hat, kann sich hinter Zahlen verstecken, und aus begründeter Meinung wird Rechthaberei mit Fußnoten."},
"18-58":{kern:"Der Kanal des Urteilsvermögens: Lebensfreude, die verbessern will. Dein Blick findet den Fehler im Muster, und deine Vitalität liefert die Energie, ihn zu beheben, im Dienst der Freude, nicht der Kritik. Korrigiert wird, damit es wieder tanzt.",
 alltag:"Du siehst in jedem Prozess, jedem Text, jedem Zuhause sofort, was besser ginge. Warte auf die Einladung, dann ist dein Blick Gold wert.",
 schatten:"Ungebetene Korrektur macht aus der Verbesserin eine Nörglerin, und auf dich selbst gerichtet wird das Urteil zum Dauergericht ohne Verteidigung."},
"19-49":{kern:"Der Kanal der Synthese: Du spürst die Bedürfnisse der Menschen und kennst die Prinzipien, nach denen Gemeinschaft funktioniert. Sensibilität mit Rückgrat, du hältst Beziehungen zusammen und weißt zugleich, wann ein Bund neu verhandelt werden muss.",
 alltag:"Du merkst als Erste, wenn in der Familie, im Team, im Freundeskreis etwas kippt, lange bevor es jemand ausspricht. Sprich es an, das ist deine Rolle.",
 schatten:"Wer ständig fremde Bedürfnisse spürt, übergeht leicht die eigenen, bis der Körper streikt oder die Revolution ausbricht, die vorher niemand kommen sah."},
"20-34":{kern:"Der Kanal des Charisma: Kraft, sichtbar im Jetzt. Wenn du beschäftigt bist mit dem, was dich wirklich ruft, geht eine Wirkung von dir aus, die niemand ignorieren kann, keine Show, sondern pure Präsenz in Bewegung.",
 alltag:"Menschen schauen dir gern beim Machen zu, deine Vertieftheit hat Sog. Multitasking dagegen zerstäubt genau diese Wirkung.",
 schatten:"Dieselbe Kraft im falschen Einsatz wirkt wie ein Laubbläser im Wohnzimmer: laut, ständig an, und alle fragen sich, wofür eigentlich."},
"20-57":{kern:"Der Kanal der Gehirnwelle: Intuition mit direktem Draht zur Stimme. Du sprichst Einsichten aus, im selben Moment, in dem sie entstehen, ungefiltert, treffend, manchmal unheimlich präzise. Dein Jetzt weiß mehr als dein Plan.",
 alltag:"Deine besten Antworten sind die spontanen. Vorbereiten kannst du Fakten, aber deine eigentliche Klugheit entsteht live im Gespräch.",
 schatten:"Zwischen Eingebung und Aussprechen liegt bei dir kein Filter, das trifft manchmal Menschen, die für so viel Wahrheit keinen Termin hatten."},
"21-45":{kern:"Der Kanal des Geldes: Kontrolle trifft Herrschaft, und gemeinsam verwalten sie das Materielle. Du bist gebaut, um Ressourcen zu führen, ein Revier zu leiten, Verantwortung für Besitz und Belegschaft zu tragen. Jemand muss den Laden führen, und du kannst es.",
 alltag:"Ob Haushaltskasse, Team oder Firma: In deinen Händen werden Mittel geordnet und gemehrt. Kläre nur immer sauber, wer wofür zuständig ist.",
 schatten:"Zwei Hände am selben Steuer geben Kampf: Wenn Zuständigkeiten unklar sind, wird aus Führung Machtprobe, und die kostet mehr als jede Fehlentscheidung."},
"23-43":{kern:"Der Kanal der Strukturierung: Geniale Einsicht findet einfache Worte. In dir springt Wissen zusammen, das es so noch nicht gab, und du kannst es in Sätze fassen, die jeder versteht, wenn man dich lässt. Genie und Spinner trennt nur das Timing.",
 alltag:"Du erklärst Komplexes in einem Bild, das sitzt. Warte, bis man dich fragt, dann bist du die Klarste im Raum.",
 schatten:"Ungefragt geteilt klingt dieselbe Einsicht schräg, und du sammelst Stirnrunzeln für Gedanken, die zwei Jahre später alle selbstverständlich finden."},
"24-61":{kern:"Der Kanal des Denkers: Das Mysterium fragt, und dein Denken kreist, bis aus der Frage Erkenntnis reift. Du bist gebaut, um über das Unbeantwortbare nachzudenken, nicht als Qual, sondern als Berufung. Inspiration ist dein Rohstoff.",
 alltag:"Nachts um drei hast du Gedanken, die tagsüber niemand denkt. Schreib sie auf, sie sind der Grund, warum Menschen dich tiefsinnig nennen.",
 schatten:"Dieselbe Schleife ohne Mündung wird zum Gedankenkarussell, und der Druck, die letzte Antwort zu finden, raubt den Schlaf, den Erkenntnis gebraucht hätte."},
"25-51":{kern:"Der Kanal der Initiation: Schock trifft Unschuld, und aus beidem wird geistige Kraft. Du bist gebaut, um durch Erschütterungen zu gehen und geläutert herauszukommen, und andere durch ihre hindurchzubegleiten. Ein schamanischer Kanal im Alltagsgewand.",
 alltag:"Krisen, die andere zerlegen, ordnen dich neu. Menschen suchen deine Nähe, wenn ihr Boden wankt, weil deiner schon öfter gewankt hat und hielt.",
 schatten:"Wer Initiation gewohnt ist, provoziert manchmal den nächsten Sprung, bevor der letzte verheilt ist, Mut und Selbstverschleiß liegen hier nah beieinander."},
"26-44":{kern:"Der Kanal der Übergabe: Instinkt für Menschen trifft Geschick im Übermitteln. Du erkennst, was jemand kann und braucht, und verkaufst genau das, Produkte, Ideen, Erinnerungen an die Zukunft. Die geborene Unternehmerin im weitesten Sinn.",
 alltag:"Du besetzt Rollen richtig: das passende Projekt zum passenden Menschen, das passende Argument zur passenden Kundin. Dein Riecher spart allen Monate.",
 schatten:"Dieselbe Gabe kann manipulieren: Wer weiß, wie Menschen ticken, kann sie ticken lassen, und der kurzfristige Deal kostet das langfristige Vertrauen."},
"27-50":{kern:"Der Kanal der Bewahrung: Fürsorge mit Wertekompass. Du nährst und schützt, was dir anvertraut ist, und du spürst genau, welche Fürsorge stärkt und welche schwächt. Der Stamm überlebt durch Menschen wie dich.",
 alltag:"Bei dir werden Menschen versorgt, körperlich, seelisch, praktisch. Du bist die, die merkt, wer durchhängt, und das Richtige hinstellt, bevor gefragt wird.",
 schatten:"Fürsorge ohne Grenze macht Empfänger schwach und Geberin leer, und Verantwortung für Menschen, die nie darum baten, ist Übergriff in Schürze."},
"28-38":{kern:"Der Kanal des Kampfes: Der Sinn des Lebens wird bei dir erkämpft, nicht gefunden. Widerstand zeigt dir, was es wert ist, und der Einsatz dafür gibt deinem Leben Gewicht. Du bist gebaut für die Kämpfe, die zählen.",
 alltag:"Du gibst nicht auf, wo andere längst weich werden, für Menschen, Überzeugungen, Projekte, die es verdienen. Diese Zähigkeit ist dein Adel.",
 schatten:"Ohne würdigen Kampf sucht sich die Kampfkraft Ersatzgegner, und du verschleißt dich an Fronten, die keinem Sinn dienen außer dem Kämpfen selbst."},
"29-46":{kern:"Der Kanal des Gelingens: Dein Ja verpflichtet den ganzen Körper, und dein Körper trägt dich durch bis zum Durchbruch. Hingabe plus Ausdauer, wo du dich wirklich verpflichtest, gelingt, was anderen als Glück erscheint und in Wahrheit Vollendung ist.",
 alltag:"Wenn du dich einer Sache verschrieben hast, geschehen die berühmten glücklichen Zufälle: richtige Orte, richtige Menschen, richtige Momente.",
 schatten:"Dasselbe Ja an die falsche Sache vergeben bindet dieselbe Ausdauer, und du gehst mit voller Hingabe einen Weg zu Ende, der nie deiner war."},
"30-41":{kern:"Der Kanal des Erkennens: Fantasie entzündet Sehnsucht, und aus der Spannung zwischen Traum und Erfahrung entsteht dein Lebensgefühl. Du bist eine Träumerin mit Feuer, deine Bilder von dem, was sein könnte, wärmen ganze Umgebungen.",
 alltag:"Deine Vorfreude ist ansteckend: Reisen, Projekte, Feste leben schon Wochen vorher von den Bildern, die du malst.",
 schatten:"Wenn das Erlebnis dem Bild nicht standhält, wird aus Sehnsucht Enttäuschung, und wer nur noch träumt, um das Fühlen zu füttern, verpasst das Leben dazwischen."},
"32-54":{kern:"Der Kanal der Verwandlung: Ehrgeiz, geprüft vom Instinkt für Dauer. Du willst aufsteigen, materiell, gesellschaftlich, geistig, und du erkennst, welche Ambition trägt und welche Fassade bleibt. Aufstieg mit Bodenhaftung.",
 alltag:"Du arbeitest an deinem Aufstieg, still und beharrlich, und dein Gespür sagt dir verlässlich, in welches Vorhaben sich Jahre zu investieren lohnen.",
 schatten:"Anerkennung von oben kann zur Droge werden, und die Angst, es nie zu schaffen, treibt in Betriebsamkeit, die aufsteigt, ohne anzukommen."},
"34-57":{kern:"Der Kanal der Macht: reine Kraft, geführt vom feinsten Ohr. Du handelst im richtigen Moment richtig, ohne erklären zu können warum, der Archetyp des intakten Überlebens. Wo andere überlegen, hast du schon gehandelt, und es stimmt.",
 alltag:"In brenzligen Situationen bist du die Ruhigste im Raum: Der Körper weiß den Weg, bevor die Diskussion beginnt.",
 schatten:"Kraft, die das leise Signal überhört, wird zur bloßen Wucht, und Wucht richtet an, was das Ohr verhindern wollte."},
"35-36":{kern:"Der Kanal der Vergänglichkeit: Hunger auf Erfahrung trifft die Fähigkeit, Krisen zu durchleben. Du bist die Tausendsasserin, die alles einmal gemacht hat und aus jedem Durchgang emotionale Reife zieht. Dein Erfahrungsschatz ist deine Weisheit.",
 alltag:"Es gibt kaum ein Thema, zu dem du keine eigene Geschichte hast. Menschen holen sich bei dir das Gefühl, dass alles durchlebbar ist.",
 schatten:"Wenn nichts beim zweiten Mal schmeckt, wird das Leben zur Jagd nach dem nächsten Kick, und zwischen den Erfahrungen wohnt eine Leere, die keine neue füllt."},
"37-40":{kern:"Der Kanal der Gemeinschaft: Wärme trifft Arbeitskraft, verbunden durch den Handschlag. Du hältst Familien, Teams und Freundeskreise zusammen, über klare Abmachungen: Wer gibt was, wer bekommt was. Gemeinschaft ist bei dir Vertrag und Umarmung zugleich.",
 alltag:"Du bist die, bei der man sich trifft, die den Kitt liefert, die merkt, wenn einer mehr gibt als bekommt, und es ansprechen kann.",
 schatten:"Ungeklärte Abmachungen sind dein Gift: Wer gibt, ohne den Deal zu benennen, führt heimlich Buch, und heimliche Bücher sprengen irgendwann jede Gemeinschaft."},
"39-55":{kern:"Der Kanal der Ausdrucksstärke: Provokation trifft Stimmung, und heraus kommt emotionale Kunst. Du stichelst Geist wach, in dir und anderen, und deine Stimmungslagen sind keine Störung, sondern das Farbspektrum, aus dem du schöpfst.",
 alltag:"An manchen Tagen bist du Melancholie, an anderen Übermut, und beides macht etwas mit jedem Raum, den du betrittst. Kreative Arbeit gibt dem ein Zuhause.",
 schatten:"Wer für jedes Tief einen Schuldigen sucht, provoziert Dramen statt Geist, und die Umgebung lernt Angst vor Stimmungen, die eigentlich Musik sein wollten."},
"42-53":{kern:"Der Kanal der Reifung: Anfangen und Vollenden in einem Strom. Du bist gebaut, um durch ganze Zyklen zu gehen, beginnen, durchleben, abschließen, und in jedem vollendeten Zyklus reifst du spürbar. Dein Leben wächst in Kapiteln.",
 alltag:"Dinge, die du zu Ende gebracht hast, tragen dich: der abgeschlossene Umzug, das fertige Projekt, die ausgesprochene Trennung. Danach bist du jedes Mal wer anderes.",
 schatten:"Zyklen, die du mittendrin verlässt oder nie beginnst, hängen als offene Enden an dir und ziehen leise Kraft, bis du sie schließt oder bewusst verabschiedest."},
"47-64":{kern:"Der Kanal der Abstraktion: Bilderflut sucht Sinn. Dein Kopf spielt Vergangenes durch, in Schleifen, in Fragmenten, bis sich eines Tages das Muster zeigt und alles einen Platz hat. Du verstehst rückwärts und lebst vorwärts.",
 alltag:"Deine besten Einsichten über eine Situation kommen Monate später, unter der Dusche, beim Gehen, und sie sind es wert, dass man auf sie wartet.",
 schatten:"Wer die Bilderflut mit Gewalt sortieren will, macht aus dem Verarbeiten ein Verhör, und der Druck im Kopf wird zum Dauerzustand, der nie liefert."}
};

/* Planetarisches Wetter: was ein temporär definiertes Zentrum bedeutet */
var ZENTRUM_WETTER={
"kopf":{
  heisst:"Der Himmel legt gerade zusätzlichen Denkdruck auf alle: Fragen werden lauter, Köpfe voller.",
  chance:"Inspiration ist billig zu haben in diesen Tagen, notiere, was aufsteigt.",
  achtung:"Nicht jede drängende Frage dieser Tage ist deine, und kaum eine muss sofort beantwortet werden.",
  umgang:"Schreib Gedanken auf statt sie zu lösen. Papier ist geduldiger als dein Schlaf."
 },
"ajna":{
  heisst:"Meinungen verfestigen sich gerade schneller als sonst, in dir und um dich.",
  chance:"Gute Tage, um ein Konzept zu durchdenken oder eine Struktur zu bauen.",
  achtung:"Debatten eskalieren leichter, wenn alle sicherer sind als sie sein können.",
  umgang:"Vertritt deine Sicht mit einem Vielleicht im Gepäck, es kostet nichts und schützt viel."
 },
"kehle":{
  heisst:"Der Ausdrucksdruck steigt: Alles will gerade gesagt, gepostet, verkündet werden.",
  chance:"Gespräche, die lange anstanden, finden jetzt leichter Worte.",
  achtung:"Auch Unausgegorenes drängt zur Tür hinaus, nicht jedes Wort dieser Tage altert gut.",
  umgang:"Sprich, wenn du gefragt wirst, das Timing macht gerade den Unterschied zwischen Wirkung und Lärm."
 },
"g":{
  heisst:"Identitäts- und Richtungsfragen liegen in der Luft: Wer bin ich, wohin will ich.",
  chance:"Ein guter Moment, um Kurs und Umfeld ehrlich anzuschauen.",
  achtung:"Aus einer Stimmung heraus das Leben umzuwerfen fühlt sich gerade verlockender an als es ist.",
  umgang:"Stell die großen Fragen und beantworte sie langsam, Richtung braucht keine Eile."
 },
"herz":{
  heisst:"Wille und Ego bekommen Rückenwind: Beweisen, versprechen, durchsetzen liegt im Trend.",
  chance:"Verhandlungen und mutige Zusagen haben gerade Kraft hinter sich.",
  achtung:"Zu viel versprochen ist schnell passiert, wenn der Wind so steht.",
  umgang:"Gib nur dort dein Wort, wo du es auch bei Flaute halten willst, alles andere darf ein Vielleicht bleiben."
 },
"sakral":{
  heisst:"Die Arbeitsenergie im Kollektiv ist hoch: Alles will schaffen, machen, antworten.",
  chance:"Ideale Tage für Projekte, die echte Ausdauer brauchen.",
  achtung:"Der allgemeine Tatendrang verführt zu Ja-Sagen ohne Bauchbeteiligung.",
  umgang:"Nutze den Schwung für das, worauf dein eigenes System anspringt, nicht für die Liste der anderen."
 },
"milz":{
  heisst:"Die Instinkte sind geschärft: Warnsignale und Körpergefühl sprechen deutlicher.",
  chance:"Gesundheitsentscheidungen und Bauchurteile gelingen jetzt besonders klar.",
  achtung:"Auch diffuse Ängste sind lauter und verkleiden sich gern als Intuition.",
  umgang:"Echte Intuition ist ruhig und konkret, Angst ist laut und vage, unterscheide am Ton."
 },
"solarplexus":{
  heisst:"Die emotionale See ist bewegt: Stimmungen schwappen stärker zwischen Menschen hin und her.",
  chance:"Tiefe Gespräche und echte Begegnungen sind jetzt leichter zu haben.",
  achtung:"Konflikte zünden schneller, und geliehene Gefühle fühlen sich täuschend echt an.",
  umgang:"Nichts Wichtiges im Wellental entscheiden, nichts Großes auf dem Wellenkamm versprechen."
 },
"wurzel":{
  heisst:"Der Grunddruck ist erhöht: Dringlichkeit liegt in der Luft, alles scheint sofort zu müssen.",
  chance:"Liegengebliebenes lässt sich mit diesem Rückenwind wunderbar abräumen.",
  achtung:"Hektik erzeugt gerade mehr Fehler als sonst, und fremde Eile steckt an.",
  umgang:"Frag bei jedem Es-muss-sofort einmal: Sagt das die Sache oder nur der Druck?"
 }
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
"Keine Definition (Reflektor)":"Ohne feste Verbindungen bist du vollständig offen, siehe Reflektor.",
"Einfache Definition":"Alles in dir ist miteinander verbunden: Deine Energie fließt in einem Stück. Du bist in deiner Verarbeitung eigenständig und schnell, und darfst dich daran erinnern, dass die meisten Menschen mehr Zeit brauchen als du.",
"Gespaltene Definition":"In dir gibt es zwei Bereiche, die sich nicht von selbst berühren. Andere Menschen überbrücken diese Lücke wie ein fehlendes Kabel, deshalb fühlst du dich mit bestimmten Menschen sofort vollständiger. Die Brücke ist ein Geschenk, aber wähle bewusst, wer sie sein darf.",
"Dreifach gespaltene Definition":"Drei Bereiche in dir, die getrennt voneinander schwingen: Du brauchst Bewegung durch verschiedene Auren. Begegnungen, Ortswechsel, Menschenströme –, damit deine Teile sich verbinden. Feste Routinen mit immer denselben Menschen machen dich eng.",
"Vierfach gespaltene Definition":"Vier getrennte Bereiche, das seltenste Muster überhaupt. Deine Verarbeitung braucht schlicht Zeit; Druck zu schnellen Festlegungen ist Gift. Deine Tiefe entsteht langsam und ist dafür unerschütterlich."};

var WINKEL_TEXTE={
"Rechtswinkel-Kreuz":"Dein Weg ist ganz deiner: Du bist hier, um deinen eigenen Weg zu gehen, andere Menschen sind Teil deiner Geschichte, aber der rote Faden bist du selbst.",
"Juxtapositions-Kreuz":"Das seltene fixe Schicksal: Dein Weg verläuft auf einer klaren, eigenen Spur zwischen persönlichem und transpersonalem Thema. Beständigkeit ist keine Sturheit, sondern dein Bauplan.",
"Linkswinkel-Kreuz":"Dein Weg erfüllt sich in Begegnung. Deine wichtigsten Wendepunkte tragen die Namen anderer Menschen. Dein Schicksal ist mit ihren verwoben."};

var PLANET_LABELS={sonne:"Sonne",erde:"Erde",mond:"Mond",nordknoten:"Nordknoten",
  suedknoten:"Südknoten",merkur:"Merkur",venus:"Venus",mars:"Mars",
  jupiter:"Jupiter",saturn:"Saturn",uranus:"Uranus",neptun:"Neptun",pluto:"Pluto"};
var PLANET_SYMBOL={sonne:"☉",erde:"⊕",mond:"☽",nordknoten:"☊",suedknoten:"☋",
  merkur:"☿",venus:"♀",mars:"♂",jupiter:"♃",saturn:"♄",uranus:"♅",neptun:"♆",pluto:"♇"};

return {TYPEN:TYPEN,AUTORITAETEN:AUTORITAETEN,PROFILE:PROFILE,
  ZENTREN_TEXTE:ZENTREN_TEXTE,KANAL_NAMEN:KANAL_NAMEN,KANAL_TEXTE:KANAL_TEXTE,ZENTRUM_WETTER:ZENTRUM_WETTER,TOR_NAMEN:TOR_NAMEN,
  DEFINITION_TEXTE:DEFINITION_TEXTE,WINKEL_TEXTE:WINKEL_TEXTE,
  PLANET_LABELS:PLANET_LABELS,PLANET_SYMBOL:PLANET_SYMBOL};
});
