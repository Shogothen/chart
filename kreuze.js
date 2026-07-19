/* Die 192 Inkarnationskreuze
   Quelle der Zuordnung: vollständige 192er-Liste (Personality-Sonne | Design-Sonne je Winkel).
   Struktur je Sonnentor: [Rechtswinkel-Name, Juxtapositions-Name, Linkswinkel-Name, DesignSonne_RA, DesignSonne_JC_LA]
   Die beiden letzten Werte dienen als Gegenprobe für die 88-Grad-Berechnung. */
(function(root,factory){
  if(typeof module!=="undefined"&&module.exports)module.exports=factory();
  else root.HDKreuze=factory();
})(typeof self!=="undefined"?self:this,function(){
"use strict";

var T={
1:["Sphinx","Selbstausdruck","Trotz",7,4],
2:["Sphinx","Der Antrieb","Trotz",13,49],
3:["Gesetze","Mutation","Wünsche",60,41],
4:["Erklärung","Formulierung","Revolution",23,8],
5:["Bewusstsein","Gewohnheiten","Trennung",64,47],
6:["Eden","Konflikt","Die Ebene",12,15],
7:["Sphinx","Interaktion","Masken",2,23],
8:["Ansteckung","Beitrag","Ungewissheit",30,55],
9:["Planung","Fokus","Identifikation",40,64],
10:["Gefäß der Liebe","Verhalten","Vorbeugung",46,18],
11:["Eden","Ideen","Erziehung",6,46],
12:["Eden","Artikulation","Erziehung",36,25],
13:["Sphinx","Zuhören","Masken",1,43],
14:["Ansteckung","Ermächtigung","Ungewissheit",29,59],
15:["Gefäß der Liebe","Extreme","Vorbeugung",25,17],
16:["Planung","Experimentieren","Identifikation",37,63],
17:["Dienst","Meinungen","Umbruch",58,38],
18:["Dienst","Korrektur","Umbruch",52,39],
19:["Vier Wege","Bedürfnis","Verfeinerung",44,1],
20:["Schlafender Phönix","Das Jetzt","Dualität",55,37],
21:["Spannung","Kontrolle","Bestreben",38,54],
22:["Herrschaft","Anmut","Informieren",26,11],
23:["Erklärung","Assimilation","Hingabe",49,30],
24:["Vier Wege","Rationalisierung","Inkarnation",19,13],
25:["Gefäß der Liebe","Unschuld","Heilung",10,58],
26:["Herrschaft","Der Trickser","Konfrontation",47,6],
27:["Das Unerwartete","Fürsorge","Ausrichtung",41,19],
28:["Das Unerwartete","Risiken","Ausrichtung",31,33],
29:["Ansteckung","Verpflichtung","Fleiß",8,20],
30:["Ansteckung","Schicksale","Fleiß",14,34],
31:["Das Unerwartete","Einfluss","Das Alpha",27,24],
32:["Maya","Bewahrung","Begrenzung",62,56],
33:["Vier Wege","Rückzug","Verfeinerung",24,2],
34:["Schlafender Phönix","Kraft","Dualität",59,40],
35:["Bewusstsein","Erfahrung","Trennung",63,22],
36:["Eden","Krise","Die Ebene",11,10],
37:["Planung","Handel","Migration",9,5],
38:["Spannung","Opposition","Individualismus",48,57],
39:["Spannung","Provokation","Individualismus",21,51],
40:["Planung","Verleugnung","Migration",16,35],
41:["Das Unerwartete","Fantasie","Das Alpha",28,44],
42:["Maya","Vollendung","Begrenzung",61,60],
43:["Erklärung","Einsicht","Hingabe",4,29],
44:["Vier Wege","Wachsamkeit","Inkarnation",33,7],
45:["Herrschaft","Besitz","Konfrontation",22,36],
46:["Gefäß der Liebe","Glücklicher Zufall","Heilung",15,52],
47:["Herrschaft","Unterdrückung","Informieren",45,12],
48:["Spannung","Tiefe","Bestreben",39,53],
49:["Erklärung","Prinzipien","Revolution",43,14],
50:["Gesetze","Werte","Wünsche",56,31],
51:["Durchdringung","Schock","Das Signalhorn",54,61],
52:["Dienst","Stille","Forderungen",17,21],
53:["Durchdringung","Anfänge","Zyklen",51,42],
54:["Durchdringung","Ehrgeiz","Zyklen",57,32],
55:["Schlafender Phönix","Stimmungen","Geist",34,9],
56:["Gesetze","Anregung","Ablenkung",3,27],
57:["Durchdringung","Intuition","Das Signalhorn",53,62],
58:["Dienst","Vitalität","Forderungen",18,48],
59:["Schlafender Phönix","Strategie","Geist",20,16],
60:["Gesetze","Begrenzung","Ablenkung",50,28],
61:["Maya","Denken","Verdunkelung",32,50],
62:["Maya","Detail","Verdunkelung",42,3],
63:["Bewusstsein","Zweifel","Herrschaftsbereich",5,26],
64:["Bewusstsein","Verwirrung","Herrschaftsbereich",35,45]
};

/* Übertitel je Rechtswinkel-Thema: worum es im Leben im Kern geht */
var THEMA={
"Sphinx":"Richtung geben, ohne den Weg vorzuschreiben",
"Gesetze":"Prinzipien finden, die tragen",
"Erklärung":"Verstehen und verständlich machen",
"Bewusstsein":"Im eigenen Rhythmus wach werden",
"Eden":"Das ganze Gefühlsspektrum leben",
"Ansteckung":"Andere mit dem eigenen Feuer bewegen",
"Planung":"Vorbereiten, was andere brauchen werden",
"Gefäß der Liebe":"Liebe in ihren vielen Formen halten",
"Dienst":"Verbessern, was verbessert werden kann",
"Vier Wege":"Zwischen den Möglichkeiten wählen lernen",
"Schlafender Phönix":"Aus dem Vertrauten neu erwachen",
"Spannung":"Druck in Durchbruch verwandeln",
"Herrschaft":"Verantwortung für das Ganze übernehmen",
"Das Unerwartete":"Bereit sein für das, was nicht geplant war",
"Maya":"Ordnung im scheinbaren Chaos finden",
"Durchdringung":"Bis zum Kern vordringen"
};

var WINKEL_ART={
"Rechtswinkel-Kreuz":{kurz:"Persönliches Schicksal",text:"Dein Weg ist zuerst deiner. Du lernst über eigene Erfahrung, und deine Wirkung auf andere entsteht als Nebenprodukt, wenn du echt lebst."},
"Linkswinkel-Kreuz":{kurz:"Transpersonales Schicksal",text:"Dein Weg ist mit dem Leben anderer verwoben. Begegnungen sind bei dir kein Beiwerk, sondern der Weg selbst."},
"Juxtapositions-Kreuz":{kurz:"Festes Schicksal",text:"Dein Weg ist eng und klar umrissen. Du bist eine Brücke zwischen dem Persönlichen und dem Überpersönlichen und darfst deinem festen Kurs treu bleiben."}
};

function name(sonnentor,winkel){
  var e=T[sonnentor];
  if(!e)return null;
  if(winkel==="Rechtswinkel-Kreuz")return "Rechtswinkliges Kreuz "+artikel(e[0]);
  if(winkel==="Juxtapositions-Kreuz")return "Juxtapositionskreuz "+artikel(e[1]);
  if(winkel==="Linkswinkel-Kreuz")return "Linkswinkliges Kreuz "+artikel(e[2]);
  return null;
}
/* deutscher Genitiv der Themennamen */
var DES=["Selbstausdruck","Antrieb","Trotz","Konflikt","Beitrag","Fokus","Verhalten","Zuhören","Bestreben",
  "Bedürfnis","Jetzt","Einfluss","Rückzug","Besitz","Schock","Ehrgeiz","Denken","Detail","Signalhorn",
  "Trickser","Alpha","Geist","Fleiß","Schicksale","Umbruch","Individualismus","Herrschaftsbereich",
  "Glücklicher Zufall","Experimentieren","Handel","Zweifel","Risiken","Gefäß der Liebe","Das Unerwartete",
  "Schlafender Phönix","Das Jetzt","Das Alpha","Das Signalhorn","Die Ebene","Der Trickser","Der Antrieb"];
function artikel(n){
  /* maskulin/neutrum brauchen "des", feminin und Plural "der" */
  var m={"Selbstausdruck":"des Selbstausdrucks","Der Antrieb":"des Antriebs","Trotz":"des Trotzes",
    "Konflikt":"des Konflikts","Beitrag":"des Beitrags","Fokus":"des Fokus","Verhalten":"des Verhaltens",
    "Zuhören":"des Zuhörens","Bestreben":"des Bestrebens","Bedürfnis":"des Bedürfnisses",
    "Das Jetzt":"des Jetzt","Einfluss":"des Einflusses","Rückzug":"des Rückzugs","Besitz":"des Besitzes",
    "Schock":"des Schocks","Ehrgeiz":"des Ehrgeizes","Denken":"des Denkens","Detail":"des Details",
    "Das Signalhorn":"des Signalhorns","Der Trickser":"des Tricksers","Das Alpha":"des Alpha",
    "Geist":"des Geistes","Fleiß":"des Fleißes","Umbruch":"des Umbruchs","Individualismus":"des Individualismus",
    "Herrschaftsbereich":"des Herrschaftsbereichs","Glücklicher Zufall":"des glücklichen Zufalls",
    "Experimentieren":"des Experimentierens","Handel":"des Handels","Gefäß der Liebe":"des Gefäßes der Liebe",
    "Das Unerwartete":"des Unerwarteten","Schlafender Phönix":"des Schlafenden Phönix","Die Ebene":"der Ebene",
    "Schicksale":"der Schicksale","Zweifel":"des Zweifels","Risiken":"der Risiken","Bewusstsein":"des Bewusstseins",
    "Eden":"von Eden","Maya":"der Maya","Sphinx":"der Sphinx","Gesetze":"der Gesetze","Erklärung":"der Erklärung",
    "Ansteckung":"der Ansteckung","Planung":"der Planung","Dienst":"des Dienstes","Vier Wege":"der Vier Wege",
    "Spannung":"der Spannung","Herrschaft":"der Herrschaft","Durchdringung":"der Durchdringung","Wünsche":"der Wünsche","Revolution":"der Revolution",
    "Trennung":"der Trennung","Masken":"der Masken","Ungewissheit":"der Ungewissheit",
    "Identifikation":"der Identifikation","Vorbeugung":"der Vorbeugung","Erziehung":"der Erziehung",
    "Verfeinerung":"der Verfeinerung","Dualität":"der Dualität","Informieren":"des Informierens",
    "Hingabe":"der Hingabe","Inkarnation":"der Inkarnation","Heilung":"der Heilung",
    "Konfrontation":"der Konfrontation","Ausrichtung":"der Ausrichtung","Begrenzung":"der Begrenzung",
    "Migration":"der Migration","Forderungen":"der Forderungen","Zyklen":"der Zyklen",
    "Ablenkung":"der Ablenkung","Verdunkelung":"der Verdunkelung","Mutation":"der Mutation",
    "Formulierung":"der Formulierung","Gewohnheiten":"der Gewohnheiten","Interaktion":"der Interaktion",
    "Ideen":"der Ideen","Artikulation":"der Artikulation","Ermächtigung":"der Ermächtigung",
    "Extreme":"der Extreme","Meinungen":"der Meinungen","Korrektur":"der Korrektur",
    "Kontrolle":"der Kontrolle","Anmut":"der Anmut","Assimilation":"der Assimilation",
    "Rationalisierung":"der Rationalisierung","Unschuld":"der Unschuld","Fürsorge":"der Fürsorge",
    "Verpflichtung":"der Verpflichtung","Bewahrung":"der Bewahrung","Kraft":"der Kraft",
    "Erfahrung":"der Erfahrung","Krise":"der Krise","Opposition":"der Opposition",
    "Provokation":"der Provokation","Verleugnung":"der Verleugnung","Fantasie":"der Fantasie",
    "Vollendung":"der Vollendung","Einsicht":"der Einsicht","Wachsamkeit":"der Wachsamkeit",
    "Unterdrückung":"der Unterdrückung","Tiefe":"der Tiefe","Prinzipien":"der Prinzipien",
    "Werte":"der Werte","Stille":"der Stille","Anfänge":"der Anfänge","Stimmungen":"der Stimmungen",
    "Anregung":"der Anregung","Intuition":"der Intuition","Vitalität":"der Vitalität",
    "Strategie":"der Strategie","Verwirrung":"der Verwirrung"};
  return m[n]||n;
}

function info(sonnentor,winkel){
  var e=T[sonnentor];
  if(!e)return null;
  var art=WINKEL_ART[winkel]||null;
  return {
    name:name(sonnentor,winkel),
    uebertitel:art?art.kurz:"",
    artText:art?art.text:"",
    sonnenthema:e[0],
    sonnenthemaText:THEMA[e[0]]||"",
    erwarteteDesignSonne:winkel==="Rechtswinkel-Kreuz"?e[3]:e[4]
  };
}

return {TABELLE:T,THEMA:THEMA,WINKEL_ART:WINKEL_ART,name:name,info:info};
});
