/* DEINE ESSENZ – Zusammenfassung aus dem gesamten Chart
   Drei Blöcke: was dich einzigartig macht, deine größte Stärke, worauf du achten solltest.
   Alles wird aus den berechneten Werten abgeleitet, nichts ist Zufall. */
(function(root,factory){
  if(typeof module!=="undefined"&&module.exports)module.exports=factory();
  else root.HDEssenz=factory();
})(typeof self!=="undefined"?self:this,function(){
"use strict";

var TYP_KERN={
"Generator":{aura:"einer offenen, umhüllenden Aura, die Menschen anzieht und hält",
 kraft:"nachhaltige Lebenskraft, die sich erneuert, wenn du auf das Richtige reagierst",
 falle:"Frustration, wenn du dich in Dinge stürzt, auf die dein Bauch nie geantwortet hat"},
"Manifestierender Generator":{aura:"einer offenen Aura mit einem zusätzlichen Schub nach außen",
 kraft:"Tempo und Ausdauer zugleich, du überspringst Schritte, die andere brauchen",
 falle:"Frustration und Ärger, wenn du zu schnell zusagst oder losrennst, ohne zu informieren"},
"Projektor":{aura:"einer fokussierten Aura, die direkt in andere Menschen hineinsieht",
 kraft:"ein Blick für Menschen und Systeme, der anderen fehlt",
 falle:"Bitterkeit, wenn du dich anbietest, wo du nicht eingeladen bist"},
"Manifestor":{aura:"einer geschlossenen, abstoßenden Aura, die Wirkung erzeugt, bevor du sprichst",
 kraft:"die Fähigkeit, aus dem Nichts etwas anzustoßen",
 falle:"Wut, deine und die der anderen, wenn du losgehst, ohne die Betroffenen zu informieren"},
"Reflektor":{aura:"einer durchlässigen Aura, die alles spiegelt, was um dich herum ist",
 kraft:"ein Gespür für die Gesundheit von Gruppen und Orten, das sonst niemand hat",
 falle:"Enttäuschung, wenn du dich unter Druck setzen lässt, statt dir einen Mondzyklus Zeit zu nehmen"}
};

var DEF_KERN={
"Einfache Definition":"Alles in dir hängt zusammen. Du bist innerlich rund und brauchst niemanden, um dich vollständig zu fühlen.",
"Geteilte Definition":"In dir gibt es zwei Bereiche, die sich nicht direkt berühren. Du suchst im Außen nach dem, was die Brücke schlägt, und das ist kein Mangel, sondern dein Antrieb.",
"Dreifach geteilte Definition":"Drei getrennte Bereiche machen dich vielschichtig. Du brauchst Zeit und die richtigen Menschen, bis sich alles verbindet, und dann bist du außergewöhnlich.",
"Vierfach geteilte Definition":"Vier getrennte Bereiche sind selten. Du bist in dir eine kleine Gesellschaft und brauchst vor allem Geduld mit dir selbst.",
"Keine Definition":"Nichts ist bei dir fest verdrahtet. Du bist vollständig durchlässig, das ist die seltenste Bauform überhaupt."
};

var ZENTRUM_STAERKE={
kopf:"eine eigene Quelle für Fragen und Inspiration",
ajna:"ein verlässliches Denkgerüst",
kehle:"ein Ausdruck, auf den man sich verlassen kann",
g:"ein festes Gefühl für Identität und Richtung",
herz:"echte Willenskraft, wenn dein Herz dahintersteht",
sakral:"ein Motor, der sich immer wieder erneuert",
milz:"eine Intuition im Jetzt und ein gesundes Zeitgefühl",
solarplexus:"emotionale Tiefe, die andere berührt",
wurzel:"ein eigener Antrieb, der dich in Bewegung hält"
};
var ZENTRUM_ACHTUNG={
kopf:"dich von fremden Fragen unter Druck setzen zu lassen",
ajna:"so zu tun, als wärst du dir sicher, um dazuzugehören",
kehle:"zu reden, nur um wahrgenommen zu werden",
g:"deine Identität in anderen Menschen oder Orten zu suchen",
herz:"dich zu beweisen und Versprechen zu geben, die dich kosten",
sakral:"mitzuhalten, bis nichts mehr da ist",
milz:"an Ungesundem festzuhalten, weil Loslassen sich wie Gefahr anfühlt",
solarplexus:"Konflikte zu vermeiden und Wahrheiten zu schlucken",
wurzel:"dich vom Druck hetzen zu lassen, der nie aufhört"
};

var PROFIL_KERN={
"1/3":"Du musst erst den Boden verstehen und dann selbst ausprobieren. Deine Umwege sind deine Methode.",
"1/4":"Du gräbst dich in Wissen und gibst es an dein Netzwerk weiter. Deine Chancen kommen über Menschen, die dich kennen.",
"2/4":"Du hast ein natürliches Talent, das andere in dir sehen, während du eigentlich deine Ruhe willst.",
"2/5":"Du wirst gerufen, ob du willst oder nicht. Menschen projizieren viel auf dich, weil sie in dir eine Lösung sehen.",
"3/5":"Du lernst durch Versuch und Irrtum und bist deshalb später der Mensch, dem man die praktische Lösung zutraut.",
"3/6":"Du probierst früh viel aus, ziehst dich dann zurück und wirst in der zweiten Lebenshälfte zum Vorbild.",
"4/6":"Dein Netzwerk trägt dich, und mit den Jahren wirst du zu jemandem, dem man einfach glaubt.",
"4/1":"Du hast ein festes Fundament und ein festes Netz. Dein Weg ist schmal, aber klar.",
"5/1":"Man erwartet von dir Lösungen. Du kannst liefern, solange du dein Fundament kennst und dich nicht überhöhen lässt.",
"5/2":"Du wirst aus deinem Rückzug heraus gerufen. Deine Wirkung entsteht, ohne dass du dafür arbeitest.",
"6/2":"Du lebst in drei Phasen: erst erleben, dann beobachten, dann Vorbild sein. Geduld mit dir ist die halbe Miete.",
"6/3":"Du sammelst früh viele Erfahrungen und wirst später zu jemandem, der aus echtem Erleben spricht."
};

function erzeuge(chart,variablen,inhalte,kreuzInfo){
  var defZ=chart.definierteZentren||[];
  var offZ=["kopf","ajna","kehle","g","herz","sakral","milz","solarplexus","wurzel"]
    .filter(function(z){return defZ.indexOf(z)<0});
  var typ=TYP_KERN[chart.typ]||TYP_KERN["Generator"];
  var name=function(z){return (inhalte.ZENTREN_TEXTE[z]||{}).name||z};

  /* ---- Einzigartig ---- */
  var einzig=[];
  einzig.push("Du bist "+artikelTyp(chart.typ)+", deine Entscheidungen laufen über die Autorität "
    +chart.autoritaet+", und du trägst das Profil "+chart.profil
    +". Durch die Welt bewegst du dich mit "+typ.aura+".");
  einzig.push(PROFIL_KERN[chart.profil]||"");
  einzig.push(DEF_KERN[chart.definition]||"");
  if(kreuzInfo&&kreuzInfo.name){
    einzig.push("Deine Lebensaufgabe trägt den Namen "+kreuzInfo.name+". "+kreuzInfo.artText);
  }
  var seltenheit=besonderheiten(chart,defZ,offZ,variablen);
  if(seltenheit.length)einzig.push("Was in deiner Karte auffällt: "+seltenheit.join(" ")); 

  /* ---- Größte Stärke ---- */
  var staerke=[];
  staerke.push("Deine Grundkraft ist "+typ.kraft+".");
  if(defZ.length){
    var liste=defZ.slice(0,4).map(function(z){return ZENTRUM_STAERKE[z]}).filter(Boolean);
    staerke.push("Fest in dir verdrahtet sind "+aufzaehlen(liste)+". Darauf kannst du bauen, an jedem Tag, in jedem Raum.");
  }else{
    staerke.push("Bei dir ist nichts fest verdrahtet. Deine Stärke ist gerade deshalb, dass du wahrnehmen kannst, was in einem Raum wirklich los ist.");
  }
  var k=chart.definierteKanaele||[];
  if(k.length){
    var kn=k.slice(0,2).map(function(p){
      var s=Math.min(p[0],p[1])+"-"+Math.max(p[0],p[1]);
      return (inhalte.KANAL_NAMEN[s]||("Kanal "+s));
    });
    var mehr=k.length-kn.length;
    staerke.push("Am deutlichsten zeigt sich das in "+aufzaehlen(kn)
      +(mehr===1?" und einem weiteren Kanal":(mehr>1?" und "+mehr+" weiteren Kanälen":""))+".");
  }
  staerke.push("Der Weg dorthin ist immer derselbe: "+chart.strategie
    +". Entscheidungen triffst du über deine Autorität "+chart.autoritaet+".");

  /* ---- Achtung ---- */
  var achtung=[];
  achtung.push("Dein Warnsignal heißt "+chart.nichtSelbst
    +". Wenn du das in dir spürst, bist du meist gegen deine eigene Bauart unterwegs.");
  achtung.push("Deine größte Falle: "+typ.falle+".");
  if(offZ.length){
    var oa=offZ.slice(0,3).map(function(z){return ZENTRUM_ACHTUNG[z]}).filter(Boolean);
    achtung.push("An deinen offenen Stellen passiert das am ehesten. Pass auf diese Muster auf: "+aufzaehlen(oa)+".");
    achtung.push("Offen ist nicht schwach. Genau dort wirst du mit den Jahren weise, wenn du aufhörst, dich dort zu beweisen.");
  }else{
    achtung.push("Du hast keine offenen Zentren. Das macht dich stabil, aber auch schwer beweglich, denn du nimmst kaum auf, was andere dir spiegeln.");
  }

  return {
    einzig:einzig.filter(Boolean),
    staerke:staerke.filter(Boolean),
    achtung:achtung.filter(Boolean),
    signatur:chart.signatur,
    nichtSelbst:chart.nichtSelbst
  };
}

function besonderheiten(chart,defZ,offZ,v){
  var b=[];
  if(defZ.length===1)b.push("Mit nur einem definierten Zentrum bist du außergewöhnlich durchlässig.");
  else if(defZ.length===2)b.push("Mit nur zwei definierten Zentren bist du außergewöhnlich durchlässig.");
  if(defZ.length>=7)b.push("Mit "+defZ.length+" definierten Zentren bist du ungewöhnlich fest in dir verankert.");
  if(defZ.indexOf("solarplexus")>=0&&defZ.indexOf("sakral")>=0)
    b.push("Sakral und Solarplexus sind beide definiert, dein Körper spricht doppelt deutlich mit dir.");
  if((chart.definierteKanaele||[]).length>=8)b.push("Du trägst "+chart.definierteKanaele.length+" definierte Kanäle, das ist viel und macht dich sehr prägnant.");
  var kz=(chart.definierteKanaele||[]).length;
  if(kz===1)b.push("Ein einziger definierter Kanal macht dein Design ungewöhnlich klar und fokussiert.");
  else if(kz===2)b.push("Nur zwei definierte Kanäle machen dein Design ungewöhnlich klar und fokussiert.");
  if(v&&v.determination&&v.motivation&&v.determination.richtung===v.motivation.richtung)
    b.push("Deine beiden oberen Pfeile zeigen in dieselbe Richtung, Aufnahme und Antrieb ziehen bei dir am selben Strang.");
  return b.slice(0,3);
}

function aufzaehlen(a){
  if(!a.length)return "";
  if(a.length===1)return a[0];
  return a.slice(0,-1).join(", ")+" und "+a[a.length-1];
}
function artikelTyp(t){
  return (t==="Reflektor"||t==="Projektor"||t==="Manifestor")?("ein "+t):("ein "+t);
}

return {erzeuge:erzeuge,TYP_KERN:TYP_KERN,PROFIL_KERN:PROFIL_KERN,DEF_KERN:DEF_KERN,
  ZENTRUM_STAERKE:ZENTRUM_STAERKE,ZENTRUM_ACHTUNG:ZENTRUM_ACHTUNG};
});
