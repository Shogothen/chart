# QA-Bericht – Chartrechner Flow your Design

Geprüft im echten Browser (Chromium 149, Puppeteer) auf fünf Gerätegrößen:
320 px, iPhone SE 375, iPhone 14 390, Android 360, iPad 820, Desktop 1440.

## Ergebnis
| Suite | Umfang | Status |
|---|---|---|
| qa.js – Oberfläche auf 6 Gerätegrößen | 110 Prüfungen | alle bestanden |
| qa2.js – Produkttiefe | 27 Prüfungen | alle bestanden |
| test-app.js – Anwendung | 96 Prüfungen | alle bestanden |
| test-core.js – Ephemeriden und Referenzcharts | 42 Prüfungen | alle bestanden |
| test-gegenpruefung.js – Rechenkette | 11 plus 1000 Zufallscharts | alle bestanden |

## Gefundene und behobene Fehler
1. **Hero-Foto auf dem Handy unsichtbar.** `margin:0 auto` auf einem Grid-Element ließ den
   Bogen auf Inhaltsbreite schrumpfen; da alle Kinder absolut positioniert sind, blieben
   2 Pixel Breite. Behoben durch feste Breite und `justify-self:center`.
2. **Kacheln ragten über den rechten Rand** (Android 360 px). Lange deutsche Wörter wie
   „Manifestierender Generator" erzwingen im Raster eine größere Mindestbreite.
   Behoben durch `min-width:0`, `overflow-wrap:anywhere` und Silbentrennung.
3. **Tippziele unter 44 px.** Fußzeilenlinks, Sprungnavigation und die leisen Knöpfe waren
   zu klein für den Daumen. Alle auf mindestens 46 px gebracht.
4. **Schriftgrößen unter 11 px** an neun Stellen (Etiketten, Kennwerte, Tabellenköpfe).
   Auf 10,5 bis 11,5 px angehoben.
5. **Torziffern auf dem Handy unlesbar** (5,4 px effektiv). Neu: Vollbildansicht mit
   Zoom und Schwenken, Chart öffnet sich auf Tippen, Ziffern dort 11,5 px.
6. **Kein Weg zurück zur Website auf dem Handy**, weil die Navigation dort ausgeblendet ist.
   Knopf „Zur Website" in der Kopfleiste ergänzt.
7. **Formular lag 1,3 Bildschirme tief.** Knopf „Meine Chart entdecken" im Kopfbereich ergänzt.
8. **Download auf älteren iOS-Browsern.** Rückfall eingebaut: Fehlt die Download-Eigenschaft,
   öffnet sich die Datei in einem neuen Tab.

## Einbindung in die bestehende Seite
Der Rechner bringt keine eigene Kopfleiste und keine Navigation mit – Logo, Menü und
Fusszeile kommen von der umgebenden Seite. Beim Einbetten per iframe empfiehlt sich
`width:100%` und eine Höhe von mindestens 900 px, oder eine dynamische Höhenanpassung.

## Was laufend geprüft wird
- Kein horizontales Scrollen, keine Elemente außerhalb des Bildschirms, symmetrische Ränder
- Keine Textüberlappungen, keine Konsolenfehler
- Kontrast nach WCAG: schlechtester Wert 10,9:1 bei einer Mindestanforderung von 3:1
- Vollständiger Ablauf: Ortssuche, Auswahl, Berechnung, Chart, Variablen, Transit
- Poster als PNG erzeugbar (546 KB), Chart-SVG gültig (64 KB)
- Geteilter Link erzeugt exakt dieselbe Chart
- Grenzfälle: Südhalbkugel, Jahr 1902, Sommerzeitumstellung, Äquator, hohe Breite –
  überall 88,0000 Grad Sonnenbogen und gültiges Profil
- Tempo: Berechnung 16 ms, kompletter Ablauf 2,8 s, Speicher 10 MB

## Umbau nach Nutzerfeedback (19.07.2026)

Alle fünf Prüfsuiten grün: 316 Prüfungen (test-core 42, test-app 126, test-gegenpruefung 11+1000 Zufallscharts, qa 110 auf sechs Gerätegrößen, qa2 27).

**1. Minuten-Satz ersetzt.** Der schiefe Satz "reagiert auf Minuten" ist raus. Neu: Die Ebene ist nur so genau wie die Geburtszeit, mit Einordnung für ungefähre Zeiten.

**2. Gedankenstriche reduziert.** Redaktionsdurchlauf über inhalte.js, variablen.js und rat.js. In Typ- und Autoritätstexten null verbleibende Gedankenstriche. Tor- und Kanalnamen bewusst geschützt und unverändert.

**3. Anwendung in den Variablen.** 48 neue Anwendungstexte: Determination und Umgebung je 6 Farben mal 2 Seiten, Motivation, Perspektive, Kognition und Sinn je 6. Jede Pfeilkarte zeigt einen Block "So wendest du es an" mit konkreten Alltagshandlungen. Playlists rein beschreibend, ohne Links.

**4. Planetarisches Wetter.** Block umbenannt. Dauern werden exakt berechnet statt geschätzt: Schrittsuche plus Bisektion auf Minutengenauigkeit, planetenspezifische Schrittweiten. Beispiel gemessen: Sonne verlässt Tor 56 am 24.07.2026 um 21:29 Uhr. Je temporär definiertem Zentrum eine Karte mit vier Ebenen (Was das heißt, Deine Chance, Wo es schwierig wird, So gehst du damit um) und dem voraussichtlichen Ende. Alle 9 Zentren hinterlegt. Temporäre Kanäle und die stärkste Resonanz mit eigenem Enddatum.

**5. Kanaltexte.** Alle 36 Kanäle ausgeschrieben (Bedeutung, Alltag, Schatten). Darstellung als Aufklapper: erster Satz sichtbar, Rest auf Tippen.

**6. Offen und definiert erklärt.** Einleitungskasten über den Zentren. Jede offene Zentrumskarte trägt zusätzlich eine Zeile "Dein Wachstum".

**7. Reihenfolge.** Kernwerte, Rat, Chart mit Grundtexten, Zentren, Kanäle, Planeten, Variablen, Planetarisches Wetter. Im DOM verifiziert.

**8. Lernstil.** Eigene Karte: rechter oberer Pfeil bestimmt aktiver oder aufnehmender Lerntyp, linker oberer Pfeil ergänzt Fokus oder mehrere Quellen parallel.

**Behobener Darstellungsfehler.** Chromium rendert Inhalte geschlossener details-Elemente mit Layoutbox weiter, wodurch Text des ersten Kanal-Aufklappers rechnerisch in die nächste Überschrift ragte. Behoben per CSS (Inhalt geschlossener Aufklapper wird sicher ausgeblendet); die QA-Überlappungsprüfung überspringt zusätzlich unsichtbare Elemente.

## Zweiter Umbau nach Nutzerfeedback (19.07.2026)

344 Prüfungen grün: test-core 42, test-app 154, test-gegenpruefung 11 plus 1000 Zufallscharts, qa 110 auf sechs Gerätegrößen, qa2 27.

**Zentren.** Wachstum und Schatten gibt es jetzt in beiden Zuständen, definiert wie offen. Alle neun Zentren wurden neu geschrieben und inhaltlich geprüft: 36 neue Texte, keine Gedankenstriche, jeder Zustand mit vier Ebenen (Was es heißt, Dein Wachstum, Dein Schatten). Der Fehler ist korrigiert: es heißt Kronenzentrum, nicht Kopfzentrum. Ebenso Ajna-Zentrum und G-Zentrum sauber benannt.

**Inkarnationskreuz.** Vorher stand dort nur die Winkelart. Jetzt trägt jedes Kreuz seinen echten Namen aus der vollständigen 192er-Tabelle, dazu den Übertitel der Schicksalsart und das Grundthema des Sonnentors. Zur Quellenlage: die erste recherchierte Quelle (dailyhumandesign.com) lieferte für Juxtapositions- und Linkswinkelkreuze dieselben vier Tore wie für Rechtswinkelkreuze, was fachlich falsch ist. Verwendet wurde stattdessen die vollständige Liste von humandesign4all, gegengeprüft an Jovian-Archive-Belegen.

Diese Tabelle dient zugleich als unabhängige Gegenprobe der Berechnung: für jedes Sonnentor und jede Winkelart ist bekannt, in welchem Tor die Design-Sonne stehen muss. Bei 600 Zufallscharts stimmte das berechnete Design-Sonnentor in 600 Fällen mit der Referenz überein. Die 88-Grad-Rechnung ist damit gegen eine externe Quelle bestätigt.

**Chart-Kontrast.** Definierte Zentren sind jetzt kräftige Farbflächen mit weißem Rand und Innenschein, offene sind deutlich dunkler mit gestricheltem Rand. Gemessen an den Zentrumsmitten: definiert Ø 197 Helligkeit, offen Ø 22, Abstand zwischen dem dunkelsten definierten und dem hellsten offenen Zentrum 165 Stufen.

**Zusammenfassung.** Neuer Abschnitt Deine Essenz direkt nach dem Tagesrat, mit drei Karten: Was dich einzigartig macht, Deine größte Stärke, Worauf du bei dir achten solltest. Alles wird aus Typ, Autorität, Profil, Definition, Kreuz, definierten und offenen Zentren, Kanalanzahl und Pfeilrichtungen abgeleitet, nichts ist generisch. Abschließend eine Signaturzeile.

**Navigation.** Die acht Kernwert-Kacheln sind Sprunglinks mit Pfeilsymbol und springen zum passenden Abschnitt. Darüber liegt eine klebende Sprungnavigation mit acht Zielen, deren aktiver Punkt beim Scrollen mitwandert. Im Browser belegt: Kachelklick landet 64 Pixel unter der Oberkante, Navigation bleibt bei y gleich 0 stehen.

**Wettbewerbsvorteil aus der Recherche.** Sichtung von sieben deutschsprachigen Rechnern. Verbreitet sind PDF-Export, Videos und clientseitige Berechnung. Am nächsten kam der Rechner von Daniel Bayer mit einem Schieberegler für die Geburtszeit zum Ausprobieren. Statt Ausprobieren rechnen wir das Ergebnis aus: eine neue Karte zeigt per Bisektion auf die Minute genau, in welchem Zeitfenster Typ, Autorität und Profil unverändert bleiben, wann die nächste Änderung eintritt und was sich dann ändern würde. Kein gesichteter Wettbewerber bietet das.

**Behobener Darstellungsfehler.** Die neuen Rasterspalten mit fester Mindestbreite von 300 Pixeln sprengten bei 320 Pixeln Fensterbreite den Inhaltsrahmen und verschoben die Ränder um 17 Pixel. Behoben durch Begrenzung der Mindestbreite auf die Containerbreite.

## Chart-Nachbesserung (19.07.2026, zweiter Durchgang)

Die Buntfarben je Zentrum sind wieder raus. Neue Darstellung nach dem Vorbild etablierter Rechner, aber in der Markenpalette: definierte Zentren sind warm-weiße Leuchtflächen (Verlauf #FFFDF8 bis #F2DCC4) mit zweistufigem Leuchthof, offene Zentren ruhige dunkle Flächen (#251754) ohne Strichelung. Nicht aktivierte Tornummern stehen dunkel auf hellen und gedämpft hell auf dunklen Zentren.

Gemessen am gerenderten Chart: definierte Zentren Ø 248 Helligkeit, offene Ø 47, Abstand 200 Stufen. Alle Leuchtflächen im Warmton (R größer G größer B, Ø 253/248/240). Neon-Cyan/Magenta-Anteil 0,00 Prozent. Alle fünf Suiten grün: 345 Prüfungen (test-core 42, test-app 155, gegen 11, qa 110, qa2 27).

## PDF-Bericht (19.07.2026)

Neuer Knopf "Bericht als PDF" in der Aktionsleiste unter dem Chart. Er baut den gesamten Report als eigenständiges, druckfertiges Dokument und öffnet den Druckdialog des Browsers (dort "Als PDF sichern"). Das funktioniert ohne Bibliotheken, offline und auf jedem Gerät; der Druck startet erst, wenn die Schriften geladen sind, mit Rückfall nach 1,6 Sekunden. Bei blockierten Pop-ups erscheint ein Hinweis.

Gestaltung: helles Papier in der Markenwelt (Creme, Indigo-Tinte, Rosé- und Gold-Akzente, Marcellus/Radley/Jost), A4 mit sauberen Seitenrändern, Karten brechen nicht über Seiten. Der Bodygraph liegt als dunkles Panel mit den Leuchtzentren auf eigener Seite.

Inhalt in dieser Reihenfolge: Deckkopf mit Geburtsdaten und Ort, die acht Kernwerte samt Stabilitätssatz, Deine Essenz (drei Karten plus Signaturzeile), der Bodygraph, Typ/Autorität/Profil/Definition/Inkarnationskreuz mit Übertitel und Sonnenthema, alle neun Zentren mit Wachstum und Schatten, alle definierten Kanäle mit Volltext, beide Planetentafeln, die vier Variablen mit Anwendungsblock. Tagesrat und Planetarisches Wetter bleiben bewusst draußen, der Bericht ist die zeitlose Fassung. Fußzeile mit Erstellungsdatum und flowyourdesign.com.

Verifiziert: Bericht aus der laufenden Seite gebaut (93 KB), als A4-PDF gerendert: 10 Seiten (Vergleichschart mit 9 Kanälen: 11 Seiten), kein "undefined", alle Kernabschnitte im extrahierten PDF-Text nachgewiesen, Chartseite mit 56 Prozent dunkler Panelfläche und hellen Leuchtzentren darin. Alle fünf Suiten grün: 355 Prüfungen (test-core 42, test-app 165, gegen 11, qa 110, qa2 27).

## Nutzer-Screening und Umsetzung (19.07.2026)

Vollständiger Durchlauf aus Nutzersicht auf dem Handy, alles gemessen. Stärken bestätigt: Ergebnis nach rund einer Sekunde, automatischer Sprung zu den Kernwerten, freundliche Fehlermeldung, Ladezustand am Knopf, Großansicht, teilbarer Link, Planetentafel ohne Querscrollen.

**Behobener Fehler.** Die Sprungnavigation war mobil dreizeilig (145 Pixel, auf 320er-Geräten 189) und jeder Ankersprung landete mit der Überschrift dahinter, weil der Versatz fest auf 64 Pixel stand. Jetzt: einzeilig wischbar (59 Pixel), der aktive Punkt wischt sich selbst in Sicht, der Ankerversatz ist per CSS-Variable an die gemessene Navigationshöhe gekoppelt. Auf 390 und 320 Pixeln verifiziert: alle Sprünge landen frei unter der Leiste.

**Sechs Verbesserungen umgesetzt und im Browser belegt:**
1. Einstieg gestrafft: Hero-Foto mobil gedeckelt, Formular rückt näher; der Hero-Knopf war bereits im ersten Bildschirm sichtbar.
2. "Daten ändern" als erster Punkt der Sprungnavigation, springt frei sichtbar zum Formular (gemessen: Formular bei 24 Pixel unter der Oberkante).
3. Abschlussblock am Seitenende mit "Bericht als PDF sichern" und "Neue Berechnung"; beide Wege öffnen verifiziert das Berichtsfenster beziehungsweise das Formular.
4. Ortssuche bevorzugt DACH: "Her" liefert jetzt Herne, Herten, Herford, Herzogenrath statt Hermosillo und Matamoros.
5. Die beiden Planetentafeln stecken in einem anfangs geschlossenen Aufklapper ("Alle 26 Aktivierungen anzeigen"), nach Tipp 28 Zeilen sichtbar.
6. Kanal-Überschrift zählt mit: "Dein Kanal" bei einem, sonst "Deine N Kanäle".

Alle fünf Suiten grün: 362 Prüfungen (test-core 42, test-app 172, gegen 11, qa 110, qa2 27).

## iOS-Formularfelder (19.07.2026)

Auf dem iPhone (Safari) waren Geburtsdatum und Geburtszeit als überhohe, komplett leere Balken zu sehen: iOS gibt Datums- und Zeitfeldern eine eigene innere Höhe, und leere Felder zeigen dort keinerlei Platzhalter. Behoben: alle drei Eingabefelder haben jetzt eine feste Höhe von 56 Pixeln (box-sizing, appearance zurückgesetzt, Wert im Feld linksbündig und vertikal mittig über die WebKit-Innenelemente). Solange Datum oder Zeit leer sind, zeigt das Feld einen sanften Hinweis (TT.MM.JJJJ beziehungsweise HH:MM), der bei Eingabe verschwindet; die Logik hängt an input- und change-Ereignissen.

Verifiziert: alle drei Felder exakt 56 Pixel, Hinweis erscheint und verschwindet korrekt, Berechnungsablauf unverändert. Die Gleichhöhe ist als dauerhafte QA-Prüfung auf allen sechs Gerätegrößen verankert. Alle fünf Suiten grün: 368 Prüfungen (test-core 42, test-app 172, gegen 11, qa 116, qa2 27).

## Die Tiefenrunde: Inhalte in Kaufqualität (19.07.2026)

Der komplette Textbestand wurde neu geschrieben, mit dem Anspruch, dass kein Text gegen einen anderen austauschbar ist.

**Neu: alle 64 Tore.** Bisher existierten nur die Tornamen. Jetzt trägt jedes Tor einen eigenen Text mit dem Bogen Kern, wie es sich zeigt, wo der Schatten liegt. Mindestlänge 180 Zeichen, paarweise verschieden, per Test verankert. Die Tore erscheinen an drei Orten: in der neuen Sektion "Deine Tore" (alle aktivierten Tore mit Herkunftsmarken P, D oder P + D und der Liste der aktivierenden Planeten), in den Wetterkacheln (Sonnen- und Mondtor erhalten ihre Deutungszeile) und im PDF-Bericht als eigene Sektion.

**36 Kanäle dreischichtig.** Jeder Kanal hat jetzt Kern, Im Alltag und Der Schatten als eigene Ebenen, im Durchschnitt 550 statt 233 Zeichen, alle Kerne paarweise verschieden.

**Typen, Autoritäten, Profile vertieft.** Typen im Schnitt 1286 statt 668 Zeichen, jetzt mit Beziehungs- und Arbeitsebene. Acht Autoritäten (beide Ego-Varianten eigenständig ausgeführt) mit konkretem Entscheidungsprotokoll, im Schnitt 723 statt 358 Zeichen. Zwölf Profile als echte Porträts, im Schnitt 653 statt 259 Zeichen, ergänzt um die Aufschlüsselung der bewussten und unbewussten Linie (sechs Linien-Grundtöne mit Name, Kern, Gabe und Falle), sichtbar im Profil-Abschnitt und im PDF.

**Dubletten geprüft.** Essenz-Bausteine, Zentrumstexte und Wettertexte wurden gegeneinander auf wortgleiche Formulierungen geprüft: keine gefunden.

**Handwerkliche Regeln, per Test erzwungen:** kleines du, keine Gedankenstriche in allen neuen Texten, weibliche Rollenbilder passend zum Publikum der Seite. Die Sprungnavigation führt jetzt zehn Ziele (neu: Tore).

Alle fünf Suiten grün: 386 Prüfungen (test-core 42, test-app 190, gegen 11, qa 116, qa2 27). Der Beispielbericht umfasst 14 Seiten inklusive Tor-Sektion und Linienaufschlüsselung.

## Shareholder-Runde: die letzten generischen Schichten (19.07.2026)

**Individuelle Inkarnationskreuz-Texte.** Bisher teilten sich 192 Kreuze drei Winkel-Texte. Jetzt komponiert das Modul für jedes Kreuz einen eigenen Text aus seinen vier tatsächlichen Toren: Winkel-Rahmung (persönlich, fixiert oder transpersonal), das Sonnentor als bewusster Motor, das Erdtor als Erdung, die Design-Seite als unbewusstes Körperwissen samt Gegengewicht, plus Schlusssatz je Winkel. Deterministisch, ehrlich, individuell: Zwei verschiedene Kreuze ergeben nachweislich verschiedene Texte von über 900 Zeichen. Sichtbar im Kreuz-Abschnitt und im PDF.

**Neun Zentren auf Tiefenniveau.** Alle 54 Felder (definiert und offen, je mit Wachstum und Schatten) neu geschrieben: durchschnittlich 217 statt 120 Zeichen pro Feld, kürzestes Feld 138, paarweise verschieden, gleiche Stimme wie Tore und Kanäle.

**Linien an jeder Aktivierung.** Die Planetentafeln zeigen unter jeder der 26 Aktivierungen den Linien-Grundton (36.5 Retterin), auch im PDF. Die Tor-Sektion erhält je vorkommender Linie einen komponierten Satz (In Linie 5 gelebt, als Retterin: ...). Damit ist erstmals die Linienebene der Aktivierungen erklärt.

**Tagesrat verdoppelt.** Sechs statt drei Varianten je Typ, 30 Bausteine, alle in der neuen Stimme; Wiederholung beginnt erst nach Tag sechs statt Tag drei.

**Stimmangleichung.** Zentrums-Wetter (36 Felder) und Essenz-Bausteine (12 Profil-Kerne, 18 Stärke- und Achtungszeilen) neu geschrieben; maschinelle Dublettenprüfung gegen die Zentrumstexte: null Treffer.

Alle fünf Suiten grün: 397 Prüfungen (test-core 42, test-app 201, gegen 11, qa 116, qa2 27). Beispielbericht jetzt 17 Seiten.
