/* DEIN BERICHT ALS PDF
   Baut aus den berechneten Daten ein eigenständiges, druckfertiges Dokument:
   helles Papier in der Markenwelt (Creme, Indigo, Rosé), A4, saubere Seitenumbrüche.
   Der Export läuft über den Druckdialog des Browsers (Als PDF sichern),
   das funktioniert offline, ohne Bibliotheken und auf jedem Gerät. */
(function(root,factory){
  if(typeof module!=="undefined"&&module.exports)module.exports=factory();
  else root.HDBericht=factory();
})(typeof self!=="undefined"?self:this,function(){
"use strict";

function esc(s){return String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}

var CSS=''
+'@page{size:A4;margin:16mm 15mm 18mm}'
+':root{--tinte:#241454;--tinte-weich:#4A3D7A;--rose:#B0538A;--gold:#C0764A;--papier:#FDFAF4;--linie:#E7DECF;--karte:#F7F1E6}'
+'*{margin:0;padding:0;box-sizing:border-box}'
+'html,body{background:var(--papier);color:var(--tinte);font-family:"Jost",system-ui,sans-serif;font-weight:300;font-size:10.6pt;line-height:1.62}'
+'h1,h2,h3,.serif{font-family:"Marcellus","Radley",Georgia,serif;font-weight:400;color:var(--tinte)}'
+'.kopf{text-align:center;padding:10mm 0 7mm;border-bottom:1px solid var(--linie);margin-bottom:7mm}'
+'.eyebrow{font-size:8pt;letter-spacing:.42em;text-transform:uppercase;color:var(--rose);font-weight:500;margin-bottom:4mm}'
+'h1{font-size:26pt;line-height:1.15}'
+'.untertitel{margin-top:3mm;color:var(--tinte-weich);font-style:italic;font-family:"Radley",Georgia,serif;font-size:11pt}'
+'.abschnitt{margin:0 0 8mm;break-inside:avoid-page}'
+'.abschnitt.gross{break-inside:auto}'
+'h2{font-size:16pt;margin:0 0 1.5mm;padding-top:3mm}'
+'h2 small{display:block;font-family:"Jost",sans-serif;font-size:7.6pt;letter-spacing:.36em;text-transform:uppercase;color:var(--rose);font-weight:500;margin-bottom:2mm}'
+'.meta{color:var(--tinte-weich);font-style:italic;font-family:"Radley",Georgia,serif;margin-bottom:3.5mm}'
+'p{margin-top:2.2mm;text-align:justify;hyphens:auto}'
+'.kern{display:grid;grid-template-columns:repeat(4,1fr);gap:3mm;margin-top:5mm}'
+'.kd{border:1px solid var(--linie);border-radius:3mm;padding:3.4mm 3.6mm;background:var(--karte);break-inside:avoid}'
+'.kd-l{font-size:6.8pt;letter-spacing:.22em;text-transform:uppercase;color:var(--rose);font-weight:500}'
+'.kd-w{font-family:"Marcellus",Georgia,serif;font-size:11.6pt;margin-top:1.4mm;line-height:1.3}'
+'.karte{border:1px solid var(--linie);border-radius:3.5mm;padding:5mm 5.5mm;background:var(--karte);margin-top:3.5mm;break-inside:avoid}'
+'.karte .titel{font-family:"Marcellus",Georgia,serif;font-size:12.5pt;margin-bottom:1.6mm}'
+'.chartseite{break-before:page;text-align:center}'
+'.chartbox{background:#140749;border-radius:5mm;padding:6mm;margin-top:4mm}'
+'.chartbox svg{width:100%;height:auto;display:block}'
+'.zwei{display:grid;grid-template-columns:1fr 1fr;gap:3.5mm}'
+'.z-status{float:right;font-size:7pt;letter-spacing:.2em;text-transform:uppercase;font-weight:500;color:var(--gold)}'
+'.z-status.def{color:var(--rose)}'
+'.ebene{margin-top:2mm;padding-top:2mm;border-top:1px dashed var(--linie);font-size:9.8pt;text-align:left}'
+'.ebene b{font-weight:500;color:var(--rose)}'
+'.ebene.schatten b{color:var(--gold)}'
+'table{width:100%;border-collapse:collapse;margin-top:3mm;break-inside:avoid}'
+'th{font-size:7.4pt;letter-spacing:.2em;text-transform:uppercase;color:var(--rose);font-weight:500;text-align:left;padding:1.6mm 2mm;border-bottom:1px solid var(--linie)}'
+'td{padding:1.5mm 2mm;border-bottom:1px solid var(--linie);font-size:9.6pt}'
+'tr:last-child td{border-bottom:none}'
+'.fuss{margin-top:10mm;padding-top:4mm;border-top:1px solid var(--linie);text-align:center;color:var(--tinte-weich);font-size:8.6pt}'
+'.fuss .serif{font-size:10.5pt;color:var(--rose)}'
+'.hinweis{font-size:8.8pt;color:var(--tinte-weich);font-style:italic;font-family:"Radley",Georgia,serif}'
+'@media screen{body{padding:10mm;max-width:210mm;margin:0 auto}}';

function karte(titel,inhalt,extra){
  return '<div class="karte'+(extra?" "+extra:"")+'">'
    +(titel?'<div class="titel">'+titel+"</div>":"")+inhalt+"</div>";
}
function absaetze(a){return a.map(function(x){return "<p>"+esc(x)+"</p>"}).join("")}

/* d = {chart, variablen, inhalte, kreuz, essenz, stabilSatz, ortName, datumText, zeitText, svg} */
function erzeuge(d){
  var c=d.chart,I=d.inhalte,v=d.variablen,e=d.essenz,kx=d.kreuz;
  var s='<!doctype html><html lang="de"><head><meta charset="utf-8">'
    +'<title>Dein Human Design · flow your design</title>'
    +'<link rel="preconnect" href="https://fonts.googleapis.com">'
    +'<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
    +'<link href="https://fonts.googleapis.com/css2?family=Marcellus&family=Radley:ital@0;1&family=Jost:wght@300;400;500&display=swap" rel="stylesheet">'
    +'<style>'+CSS+'</style></head><body>';

  /* ---- Deckkopf ---- */
  s+='<div class="kopf"><div class="eyebrow">flow your design</div>'
    +'<h1>Dein Human Design</h1>'
    +'<div class="untertitel">'+esc(d.datumText)+' um '+esc(d.zeitText)+' Uhr · '+esc(d.ortName)+'</div></div>';

  /* ---- Kernwerte ---- */
  var kd=[["Typ",c.typ],["Strategie",c.strategie],["Autorität",c.autoritaet],
    ["Profil",c.profil+" · "+((I.PROFILE[c.profil]||[""])[0])],
    ["Definition",c.definition],["Signatur",c.signatur],["Nicht-Selbst",c.nichtSelbst],
    ["Inkarnationskreuz",kx?kx.name:c.winkel]];
  s+='<div class="abschnitt"><div class="kern">'+kd.map(function(x){
    return '<div class="kd"><div class="kd-l">'+esc(x[0])+'</div><div class="kd-w">'+esc(x[1])+"</div></div>";
  }).join("")+"</div>";
  if(d.stabilSatz)s+='<p class="hinweis" style="margin-top:3mm">'+esc(d.stabilSatz)+"</p>";
  s+="</div>";

  /* ---- Essenz ---- */
  if(e){
    s+='<div class="abschnitt"><h2><small>Auf einen Blick</small>Deine Essenz</h2>';
    s+=karte("Was dich einzigartig macht",absaetze(e.einzig));
    s+=karte("Deine größte Stärke",absaetze(e.staerke));
    s+=karte("Worauf du bei dir achten solltest",absaetze(e.achtung));
    s+='<p class="hinweis" style="margin-top:3mm">Wenn du deiner Bauart folgst, fühlt es sich nach '
      +esc(e.signatur)+' an. Wenn nicht, meldet sich '+esc(e.nichtSelbst)+'.</p></div>';
  }

  /* ---- Chart ---- */
  s+='<div class="abschnitt chartseite"><h2><small>Deine Karte</small>Der Bodygraph</h2>'
    +'<div class="chartbox">'+d.svg+'</div>'
    +'<p class="hinweis" style="margin-top:3mm">Weiß: Persönlichkeit (Geburt) · Rosé: Design (88 Sonnengrade zuvor). '
    +'Leuchtende Zentren sind definiert, dunkle offen.</p></div>';

  /* ---- Grundtexte ---- */
  var typ=I.TYPEN[c.typ]||{};
  s+='<div class="abschnitt"><h2><small>Dein Fundament</small>Typ, Autorität und Profil</h2>';
  s+=karte(esc(c.typ)+' <span class="z-status">'+esc(typ.anteil||"")+"</span>","<p>"+esc(typ.text||"")+"</p>");
  s+=karte("Innere Autorität: "+esc(c.autoritaet),"<p>"+esc(I.AUTORITAETEN[c.autoritaet]||"")+"</p>");
  var prof=I.PROFILE[c.profil]||["",""];
  var linienHtml="";
  if(d.linien){
    var lp=c.profil.split("/");
    var la=d.linien[+lp[0]],lb=d.linien[+lp[1]];
    if(la&&lb)linienHtml='<div class="ebene"><b>Bewusste Linie '+lp[0]+", "+esc(la.name)+"</b> "+esc(la.kern)
      +" Gabe: "+esc(la.gabe)+". Falle: "+esc(la.falle)+".</div>"
      +'<div class="ebene"><b>Unbewusste Linie '+lp[1]+", "+esc(lb.name)+"</b> "+esc(lb.kern)
      +" Gabe: "+esc(lb.gabe)+". Falle: "+esc(lb.falle)+". Diese Seite lebst du, ohne sie zu sehen.</div>";
  }
  s+=karte("Profil "+esc(c.profil)+" · "+esc(prof[0]),"<p>"+esc(prof[1])+"</p>"+linienHtml);
  s+=karte(esc(c.definition),"<p>"+esc(I.DEFINITION_TEXTE[c.definition]||"")+"</p>");
  if(kx)s+=karte(esc(kx.name)+' <span class="z-status">'+esc(kx.uebertitel)+"</span>",
    "<p>"+esc(d.kreuzText||((kx.artText||"")+" "+(I.WINKEL_TEXTE[c.winkel]||"")))+"</p>"
    +'<div class="ebene"><b>Grundthema deines Sonnentors</b> '+esc(kx.sonnenthema)+": "+esc(kx.sonnenthemaText)+"</div>");
  s+="</div>";

  /* ---- Zentren ---- */
  var defSet={};(c.definierteZentren||[]).forEach(function(z){defSet[z]=1});
  s+='<div class="abschnitt gross"><h2><small>Deine neun Zentren</small>Definiert und offen</h2>'
    +'<div class="meta">Definiert heißt: fest verdrahtet und verlässlich. Offen heißt: aufnehmend, beeinflussbar und dein größtes Wachstumsfeld.</div>'
    +'<div class="zwei">';
  ["kopf","ajna","kehle","g","herz","sakral","milz","solarplexus","wurzel"].forEach(function(z){
    var zt=I.ZENTREN_TEXTE[z];if(!zt)return;
    var def=!!defSet[z];
    var w=def?zt.defWachstum:zt.offWachstum, sch=def?zt.defSchatten:zt.offSchatten;
    s+=karte(esc(zt.name)+' <span class="z-status'+(def?" def":"")+'">'+(def?"Definiert":"Offen")+"</span>",
      "<p>"+esc(def?zt.def:zt.off)+"</p>"
      +(w?'<div class="ebene"><b>Dein Wachstum</b> '+esc(w)+"</div>":"")
      +(sch?'<div class="ebene schatten"><b>Dein Schatten</b> '+esc(sch)+"</div>":""));
  });
  s+="</div></div>";

  /* ---- Kanäle ---- */
  var kan=c.definierteKanaele||[];
  if(kan.length){
    s+='<div class="abschnitt gross"><h2><small>Deine festen Verbindungen</small>'
      +(kan.length===1?"Dein Kanal":"Deine "+kan.length+" Kanäle")+"</h2>";
    kan.forEach(function(k){
      var key=Math.min(k[0],k[1])+"-"+Math.max(k[0],k[1]);
      var name=I.KANAL_NAMEN[key]||("Kanal "+key);
      var tx=I.KANAL_TEXTE[key]||{};
      s+=karte(esc(key)+" · "+esc(name),
        (tx.kern?"<p>"+esc(tx.kern)+"</p>":"")
        +(tx.alltag?'<div class="ebene"><b>Im Alltag</b> '+esc(tx.alltag)+"</div>":"")
        +(tx.schatten?'<div class="ebene schatten"><b>Der Schatten</b> '+esc(tx.schatten)+"</div>":""));
    });
    s+="</div>";
  }

  /* ---- Tore ---- */
  if(d.torTexte){
    var herkunft={};
    ["personality","design"].forEach(function(seite){
      Object.keys(c[seite]).forEach(function(p){
        var tor=c[seite][p].tor;
        herkunft[tor]=herkunft[tor]||{p:false,d:false};
        herkunft[tor][seite==="personality"?"p":"d"]=true;
      });
    });
    var tore=Object.keys(herkunft).map(Number).sort(function(a,b){return a-b});
    s+='<div class="abschnitt gross"><h2><small>Deine Aktivierungen im Detail</small>Deine Tore</h2>'
      +'<div class="meta">'+tore.length+' Tore sind in dir fest aktiviert. P steht für die Persönlichkeit, D für das Design.</div>';
    tore.forEach(function(tor){
      var h=herkunft[tor];
      var marke=h.p&&h.d?"P + D":(h.p?"P":"D");
      s+=karte("Tor "+tor+" · "+esc(I.TOR_NAMEN[tor]||"")+' <span class="z-status">'+marke+"</span>",
        "<p>"+esc(d.torTexte[tor]||"")+"</p>");
    });
    s+="</div>";
  }

  /* ---- Planeten ---- */
  function tab(pl,titel){
    var t='<table><tr><th>'+titel+'</th><th>Tor.Linie</th><th>Bedeutung</th></tr>';
    Object.keys(I.PLANET_LABELS||{}).forEach(function(k){
      var e2=pl[k];if(!e2)return;
      var lname=d.linien&&d.linien[e2.linie]?" · "+d.linien[e2.linie].name.replace("Die ","").replace("Das ",""):"";
      t+="<tr><td>"+esc(I.PLANET_LABELS[k])+"</td><td>"+e2.tor+"."+e2.linie+"</td><td>"+esc(String(I.TOR_NAMEN[e2.tor]||"").split(" \u2013 ")[0]+lname)+"</td></tr>";
    });
    return t+"</table>";
  }
  s+='<div class="abschnitt gross"><h2><small>Deine Aktivierungen</small>Die Planeten</h2><div class="zwei">'
    +'<div>'+tab(c.personality,"Persönlichkeit · Geburt")+'</div>'
    +'<div>'+tab(c.design,"Design · 88° zuvor")+'</div></div></div>';

  /* ---- Variablen ---- */
  if(v){
    s+='<div class="abschnitt gross"><h2><small>Die vier Pfeile</small>Deine Variablen</h2>'
      +'<div class="meta">Diese Ebene ist nur so genau wie deine Geburtszeit. Wenn du sie nur ungefähr kennst, lies diese Karten als Einladung, nicht als Festlegung.</div>';
    [["determination","Determination"],["umgebung","Umgebung"],["motivation","Motivation"],["perspektive","Perspektive"]].forEach(function(pr){
      var x=v[pr[0]];if(!x)return;
      var anw=x.eintrag&&(x.eintrag.anwLinks?(x.richtung==="links"?x.eintrag.anwLinks:x.eintrag.anwRechts):x.eintrag.anw);
      s+=karte(pr[1]+": "+esc(x.eintrag?x.eintrag.name:"")+' <span class="z-status">'+(x.richtung==="links"?"aktiv":"aufnehmend")+"</span>",
        "<p>"+esc(x.eintrag?x.eintrag.text:"")+"</p>"
        +(anw?'<div class="ebene"><b>So wendest du es an</b> '+esc(anw)+"</div>":""));
    });
    s+="</div>";
  }

  /* ---- Fuß ---- */
  s+='<div class="fuss"><div class="serif">flow your design</div>'
    +'Erstellt am '+esc(d.heuteText||"")+' · Berechnung nach dem Rave-Mandala, Design exakt 88 Sonnengrade vor der Geburt · flowyourdesign.com</div>';

  s+="</body></html>";
  return s;
}

return {erzeuge:erzeuge,CSS:CSS};
});
