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
