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

  return {
    zeitpunkt:zeit.date.toISOString(),
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
