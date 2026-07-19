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
