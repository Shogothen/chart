/* HD-TRANSIT – was gerade am Himmel steht und was es in deiner Karte berührt */
(function(root,factory){
  if(typeof module!=="undefined"&&module.exports)module.exports=factory();
  else root.HDTransit=factory();
})(typeof self!=="undefined"?self:this,function(){
"use strict";

function berechne(engine, chart, datum){
  var A=(typeof Astronomy!=="undefined")?Astronomy:require("astronomy-engine");
  /* realm-sicher: aus beliebigem Datumsobjekt einen echten Zeitstempel bauen */
  var ms=(datum==null)?Date.now():(typeof datum==="number"?datum:+datum);
  if(!isFinite(ms))ms=Date.now();
  var zeit=new A.AstroTime(new Date(ms));
  var jetzt=engine.aktivierungen(zeit);

  var natalTore=new Set(chart.aktiveTore);
  var transitTore=new Set();
  Object.keys(jetzt).forEach(function(k){transitTore.add(jetzt[k].tor)});

  var natalKanaele=new Set(chart.definierteKanaele.map(function(k){
    return Math.min(k[0],k[1])+"-"+Math.max(k[0],k[1]);
  }));

  /* Kanäle, die erst durch den Transit vollständig werden */
  var neueKanaele=[];
  engine.KANAELE.forEach(function(k){
    var a=k[0],b=k[1];
    var schluessel=Math.min(a,b)+"-"+Math.max(a,b);
    if(natalKanaele.has(schluessel))return;
    var aDa=natalTore.has(a)||transitTore.has(a);
    var bDa=natalTore.has(b)||transitTore.has(b);
    if(!aDa||!bDa)return;
    /* mindestens ein Tor muss vom Transit kommen, sonst wäre er schon natal */
    if(!transitTore.has(a)&&!transitTore.has(b))return;
    neueKanaele.push({
      kanal:schluessel,
      torA:a,torB:b,
      quelleA:natalTore.has(a)?"du":"transit",
      quelleB:natalTore.has(b)?"du":"transit"
    });
  });

  /* Zentren, die dadurch vorübergehend definiert werden */
  var natalZentren=new Set(chart.definierteZentren);
  var neueZentren=new Set();
  neueKanaele.forEach(function(n){
    [n.torA,n.torB].forEach(function(t){
      var z=engine.TOR_ZU_ZENTRUM[t];
      if(!natalZentren.has(z))neueZentren.add(z);
    });
  });

  /* Tore, die dich heute doppelt treffen (Transit auf deinem eigenen Tor) */
  var resonanz=[];
  Object.keys(jetzt).forEach(function(k){
    if(natalTore.has(jetzt[k].tor))
      resonanz.push({planet:k,tor:jetzt[k].tor,linie:jetzt[k].linie});
  });

  /* Exakte Dauer: wann verlässt ein Planet sein aktuelles Tor? */
  function torwechsel(planet){
    var schritt={mond:1.8e6,sonne:2.16e7,merkur:2.16e7,venus:2.16e7,mars:4.32e7,
      jupiter:8.64e7,saturn:1.728e8,nordknoten:8.64e7,suedknoten:8.64e7,
      uranus:4.32e8,neptun:4.32e8,pluto:4.32e8}[planet]||8.64e7;
    var horizont={mond:3*8.64e7,sonne:8*8.64e7,merkur:60*8.64e7,venus:60*8.64e7,
      mars:150*8.64e7,jupiter:500*8.64e7,saturn:900*8.64e7,nordknoten:600*8.64e7,
      suedknoten:600*8.64e7}[planet]||1500*8.64e7;
    var start=ms, startTor=jetzt[planet].tor;
    function torBei(t){return engine.aktivierungen(new A.AstroTime(new Date(t)))[planet].tor}
    var t1=start+schritt;
    while(t1<start+horizont&&torBei(t1)===startTor)t1+=schritt;
    if(t1>=start+horizont)return null;
    var a=t1-schritt,b=t1;
    while(b-a>60000){var m=(a+b)/2;if(torBei(m)===startTor)a=m;else b=m}
    return new Date(b);
  }

  var sonneEnde=torwechsel("sonne");
  var mondEnde=torwechsel("mond");

  /* Ende je Transit-Tor: solange irgendein Planet darauf steht */
  var torEnde={};
  Object.keys(jetzt).forEach(function(pl){
    var g=jetzt[pl].tor;
    if(!transitTore.has(g))return;
    var e=torwechsel(pl);
    if(!(g in torEnde))torEnde[g]=e;
    else if(torEnde[g]!==null&&(e===null||e>torEnde[g]))torEnde[g]=e;
  });
  neueKanaele.forEach(function(n){
    var enden=[];
    [n.torA,n.torB].forEach(function(g,i){
      var quelle=i===0?n.quelleA:n.quelleB;
      if(quelle==="transit")enden.push(torEnde[g]!==undefined?torEnde[g]:null);
    });
    if(!enden.length){n.endet=null;return}
    if(enden.some(function(e){return e===null})){
      var konkret=enden.filter(function(e){return e!==null});
      n.endet=konkret.length?konkret.reduce(function(a,b){return a<b?a:b}):null;
    }else{
      n.endet=enden.reduce(function(a,b){return a<b?a:b});
    }
  });
  resonanz.forEach(function(r){r.endet=torwechsel(r.planet)});

  return {
    zeitpunkt:zeit.date.toISOString(),
    sonneEnde:sonneEnde,mondEnde:mondEnde,torwechsel:torwechsel,
    aktivierungen:jetzt,
    sonne:jetzt.sonne,
    mond:jetzt.mond,
    neueKanaele:neueKanaele,
    neueZentren:Array.from(neueZentren),
    resonanz:resonanz,
    transitTore:Array.from(transitTore).sort(function(a,b){return a-b})
  };
}

return {berechne:berechne};
});
