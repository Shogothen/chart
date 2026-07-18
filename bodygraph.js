/* HD-BODYGRAPH v5 – Sternenkarte
   Dunkles Indigo, leuchtende Aktivierungen, animierter Aufbau.
   Geometrie: klassisches Rave-Layout, symmetriegeprüft. */
(function(root,factory){
  if(typeof module!=="undefined"&&module.exports)module.exports=factory();
  else root.HDBodygraph=factory();
})(typeof self!=="undefined"?self:this,function(){
"use strict";

var FARBEN={
  papier:"#FFFDF9",        /* helles Blatt, damit der Chart wie gewohnt liest */
  kontur:"#2C2A28",        /* Umrandung wie im klassischen Bodygraph */
  pers:"#1A1A1A",          /* Persönlichkeit: schwarz */
  des:"#D8453C",           /* Design: rot */
  leer:"#FFFFFF",
  zahl:"#3A3634",
  grund:"#120650",
  grundTief:"#0C0442"
};
/* klassische Zentrumsfarben */
var ZFARBEN={
  kopf:"#F6DF5B", ajna:"#8FC46B", kehle:"#B58453", g:"#F6DF5B", herz:"#E0564C",
  sakral:"#E0564C", milz:"#B58453", solarplexus:"#B58453", wurzel:"#B58453"
};

var ZFORM={
  kopf:"310,114 246,188 374,188",
  ajna:"246,220 374,220 310,294",
  kehle:"258,326 362,326 362,422 258,422",
  g:"310,458 374,522 310,586 246,522",
  herz:"356,540 406,540 381,588",
  sakral:"258,706 362,706 362,802 258,802",
  milz:"58,664 206,745 58,826",
  solarplexus:"562,664 414,745 562,826",
  wurzel:"258,860 362,860 362,956 258,956"
};

var TOR_POS={
  64:[278,188],61:[310,188],63:[342,188],
  47:[278,220],24:[310,220],4:[342,220],
  17:[280,262],43:[310,294],11:[340,262],
  62:[278,326],23:[310,326],56:[342,326],
  16:[258,350],20:[258,382],
  35:[362,350],12:[362,382],45:[362,410],
  31:[278,422],8:[310,422],33:[342,422],
  1:[310,458],7:[288,480],13:[332,480],10:[246,522],25:[374,522],
  15:[288,564],2:[310,586],46:[332,564],
  21:[381,540],51:[356,542],26:[366,564],40:[394,564],
  5:[278,706],14:[310,706],29:[342,706],
  34:[258,730],27:[258,770],59:[362,750],
  42:[278,802],3:[310,802],9:[342,802],
  48:[106,690],57:[134,705],44:[162,720],50:[202,743],
  32:[162,771],28:[134,786],18:[106,801],
  36:[514,690],22:[486,705],37:[458,720],6:[418,743],
  49:[458,771],55:[486,786],30:[514,801],
  53:[278,860],60:[310,860],52:[342,860],
  54:[258,882],38:[258,908],58:[258,934],
  19:[362,882],39:[362,908],41:[362,934]
};


/* Schwerpunkt je Zentrum – die Torziffern rücken dorthin ein */
var SCHWERPUNKT=(function(){
  var s={};
  Object.keys(ZFORM).forEach(function(z){
    var pts=ZFORM[z].split(" ").map(function(p){return p.split(",").map(Number)});
    var sx=0,sy=0;
    pts.forEach(function(p){sx+=p[0];sy+=p[1]});
    s[z]=[sx/pts.length,sy/pts.length];
  });
  return s;
})();

var TOR_ZENTRUM={};
(function(){
  var Z={kopf:[64,61,63],ajna:[47,24,4,17,43,11],
    kehle:[62,23,56,35,12,45,31,8,33,16,20],
    g:[1,7,13,10,25,15,2,46],herz:[21,51,26,40],
    sakral:[5,14,29,34,27,59,42,3,9],
    milz:[48,57,44,50,32,28,18],
    solarplexus:[36,22,37,6,49,55,30],
    wurzel:[53,60,52,54,38,58,19,39,41]};
  Object.keys(Z).forEach(function(z){Z[z].forEach(function(t){TOR_ZENTRUM[t]=z})});
})();

var BOGEN={"20-34":24,"10-34":8,"16-48":16,"20-57":11,"10-57":8,
  "26-44":16,"12-22":13,"35-36":15,"21-45":4,"34-57":5};

var KANAELE=[[1,8],[2,14],[3,60],[4,63],[5,15],[6,59],[7,31],[9,52],
  [10,20],[10,34],[10,57],[11,56],[12,22],[13,33],[16,48],[17,62],
  [18,58],[19,49],[20,34],[20,57],[21,45],[23,43],[24,61],[25,51],
  [26,44],[27,50],[28,38],[29,46],[30,41],[32,54],[34,57],[35,36],
  [37,40],[39,55],[42,53],[47,64]];

/* Torname-Kurzform für Tooltips wird von außen gereicht */
function key(a,b){return Math.min(a,b)+"-"+Math.max(a,b)}

function haelften(a,b){
  var A=TOR_POS[a],B=TOR_POS[b];
  var bogen=Math.abs(BOGEN[key(a,b)]||0);
  var mx=(A[0]+B[0])/2,my=(A[1]+B[1])/2;
  var dx=B[0]-A[0],dy=B[1]-A[1],l=Math.hypot(dx,dy)||1;
  var px=-dy/l,py=dx/l,MX=310,MY=520;
  var s1=Math.hypot(mx+px*bogen-MX,my+py*bogen-MY);
  var s2=Math.hypot(mx-px*bogen-MX,my-py*bogen-MY);
  var vz=(s1>=s2)?1:-1;
  var cx=mx+px*bogen*vz,cy=my+py*bogen*vz;
  function punkt(t){var u=1-t;return [u*u*A[0]+2*u*t*cx+t*t*B[0],u*u*A[1]+2*u*t*cy+t*t*B[1]]}
  function stueck(t0,t1){
    var N=14,d="";
    for(var i=0;i<=N;i++){var p=punkt(t0+(t1-t0)*i/N);d+=(i?" L":"M")+p[0].toFixed(1)+" "+p[1].toFixed(1)}
    return d;
  }
  return [stueck(0,0.5),stueck(0.5,1)];
}

function rundPfad(polyStr,r){
  var pts=polyStr.split(" ").map(function(p){return p.split(",").map(Number)});
  var n=pts.length,d="";
  for(var i=0;i<n;i++){
    var p0=pts[(i+n-1)%n],p1=pts[i],p2=pts[(i+1)%n];
    function richt(a,b){var dx=b[0]-a[0],dy=b[1]-a[1],l=Math.hypot(dx,dy)||1;return [dx/l,dy/l,l]}
    var e1=richt(p1,p0),e2=richt(p1,p2);
    var rr=Math.min(r,e1[2]/2.6,e2[2]/2.6);
    var a=[p1[0]+e1[0]*rr,p1[1]+e1[1]*rr];
    var b=[p1[0]+e2[0]*rr,p1[1]+e2[1]*rr];
    d+=(i?" L":"M")+a[0].toFixed(1)+" "+a[1].toFixed(1);
    d+=" Q"+p1[0]+" "+p1[1]+" "+b[0].toFixed(1)+" "+b[1].toFixed(1);
  }
  return d+" Z";
}

function torFarbe(tor,persTore,desTore){
  var p=persTore.has(tor),d=desTore.has(tor);
  if(p&&d)return "url(#hd-beide)";
  if(p)return FARBEN.pers;
  if(d)return FARBEN.des;
  return FARBEN.leer;
}

/* zufällige, aber stabile Sterne im Hintergrund */
function sterne(anzahl,samen){
  var s="",x=samen||7;
  function rnd(){x=(x*1664525+1013904223)%4294967296;return x/4294967296}
  for(var i=0;i<anzahl;i++){
    var cx=rnd()*620,cy=rnd()*990,r=0.5+rnd()*1.4,o=0.15+rnd()*0.5;
    var dauer=(2.6+rnd()*4).toFixed(1),verzug=(rnd()*5).toFixed(1);
    s+='<circle class="hd-stern" cx="'+cx.toFixed(0)+'" cy="'+cy.toFixed(0)+'" r="'+r.toFixed(2)
      +'" fill="#FFFFFF" opacity="'+o.toFixed(2)+'" style="--d:'+dauer+'s;--v:'+verzug+'s"/>';
  }
  return s;
}

function pfeilGruppe(v){
  if(!v)return "";
  var s="",e=[
    {x:250,y:44,r:v.determination.richtung,f:FARBEN.des,z:v.determination.farbe},
    {x:250,y:74,r:v.umgebung.richtung,f:FARBEN.des,z:v.umgebung.farbe},
    {x:370,y:44,r:v.motivation.richtung,f:FARBEN.pers,z:v.motivation.farbe},
    {x:370,y:74,r:v.perspektive.richtung,f:FARBEN.pers,z:v.perspektive.farbe}
  ];
  e.forEach(function(a,i){
    var w=30,h=12,d;
    if(a.r==="links")d="M"+(a.x-w/2)+" "+a.y+" L"+(a.x+w/2)+" "+(a.y-h/2)+" L"+(a.x+w/2)+" "+(a.y+h/2)+" Z";
    else d="M"+(a.x+w/2)+" "+a.y+" L"+(a.x-w/2)+" "+(a.y-h/2)+" L"+(a.x-w/2)+" "+(a.y+h/2)+" Z";
    s+='<g class="hd-pfeil" style="--i:'+i+'">';
    s+='<path d="'+d+'" fill="'+a.f+'"/>';
    var zx=a.r==="links"?a.x+27:a.x-27;
    s+='<circle cx="'+zx+'" cy="'+a.y+'" r="9.5" fill="none" stroke="'+a.f+'" stroke-width="1.2" opacity="0.8"/>';
    s+='<text x="'+zx+'" y="'+(a.y+3.4)+'" font-size="10" font-weight="600" text-anchor="middle" fill="'+a.f+'">'+a.z+"</text>";
    s+='</g>';
  });
  return s;
}

function render(chart,variablen,opt){
  opt=opt||{};
  var animiert=opt.animiert!==false;
  var persTore=new Set(),desTore=new Set(),torPlanet={};
  Object.keys(chart.personality).forEach(function(k){
    persTore.add(chart.personality[k].tor);
    (torPlanet[chart.personality[k].tor]=torPlanet[chart.personality[k].tor]||[]).push(["p",k,chart.personality[k].linie]);
  });
  Object.keys(chart.design).forEach(function(k){
    desTore.add(chart.design[k].tor);
    (torPlanet[chart.design[k].tor]=torPlanet[chart.design[k].tor]||[]).push(["d",k,chart.design[k].linie]);
  });
  var defZ=new Set(chart.definierteZentren);

  var s='<svg viewBox="0 0 620 990" xmlns="http://www.w3.org/2000/svg" class="hd-chart'+(animiert?" hd-an":"")+'" font-family="Jost,system-ui,sans-serif">';
  s+='<defs>'
    +'<pattern id="hd-beide" width="10" height="10" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">'
    +'<rect width="10" height="10" fill="'+FARBEN.pers+'"/><rect width="5" height="10" fill="'+FARBEN.des+'"/></pattern>'
    +'<linearGradient id="hd-tiefe" x1="0" y1="0" x2="0.2" y2="1">'
    +'<stop offset="0" stop-color="#FFFFFF" stop-opacity="0.40"/><stop offset="1" stop-color="#000000" stop-opacity="0.07"/></linearGradient>'
    +'<filter id="hd-blatt" x="-8%" y="-4%" width="116%" height="110%">'
    +'<feDropShadow dx="0" dy="10" stdDeviation="16" flood-color="#0A0230" flood-opacity="0.55"/></filter>'
    +'<style>'
    +'.hd-an .hd-fuellung{stroke-dasharray:var(--len,300);stroke-dashoffset:var(--len,300);'
    +'animation:hdZeichnen 1s cubic-bezier(.4,0,.2,1) forwards;animation-delay:calc(.2s + var(--i,0)*.035s)}'
    +'@keyframes hdZeichnen{to{stroke-dashoffset:0}}'
    +'.hd-an .hd-zentrum{opacity:0;animation:hdAuf .7s ease forwards;animation-delay:calc(.05s + var(--i,0)*.055s)}'
    +'@keyframes hdAuf{from{opacity:0}to{opacity:1}}'
    +'.hd-an .hd-zahl{opacity:0;animation:hdAuf .5s ease forwards;animation-delay:calc(.85s + var(--i,0)*.008s)}'
    +'.hd-tor-flaeche{cursor:help;fill:transparent}'
    +'.hd-tor-flaeche:hover{fill:rgba(0,0,0,.07)}'
    +'@media (prefers-reduced-motion: reduce){.hd-an .hd-fuellung,.hd-an .hd-zentrum,.hd-an .hd-zahl{animation:none;opacity:1;stroke-dashoffset:0}}'
    +'</style></defs>';

  /* Blatt */
  s+='<rect x="6" y="6" width="608" height="978" rx="22" fill="'+FARBEN.papier+'" filter="url(#hd-blatt)"/>';
  s+=pfeilGruppe(variablen);

  /* Kanäle als umrandete Röhren: erst alle Konturen, dann alle Füllungen */
  var konturen="",fuellungen="",idx=0;
  KANAELE.forEach(function(k){
    var h=haelften(k[0],k[1]);
    var fa=torFarbe(k[0],persTore,desTore),fb=torFarbe(k[1],persTore,desTore);
    var kn=key(k[0],k[1]);
    var voll=(fa!==FARBEN.leer&&fb!==FARBEN.leer);
    konturen+='<path d="'+h[0]+'" stroke="'+FARBEN.kontur+'" stroke-width="9.4" fill="none" stroke-linecap="round"/>'
             +'<path d="'+h[1]+'" stroke="'+FARBEN.kontur+'" stroke-width="9.4" fill="none" stroke-linecap="round"/>';
    var laenge=Math.round(Math.hypot(TOR_POS[k[0]][0]-TOR_POS[k[1]][0],TOR_POS[k[0]][1]-TOR_POS[k[1]][1])/2)+16;
    [[h[0],fa,k[0]],[h[1],fb,k[1]]].forEach(function(paar,j){
      var animiert_teil = paar[1]!==FARBEN.leer;
      fuellungen+='<path'+(j===0?' data-kanal="'+kn+'" data-status="'+(voll?"definiert":(fa!==FARBEN.leer||fb!==FARBEN.leer?"halb":"leer"))+'"':"")
        +(animiert_teil?' class="hd-fuellung" style="--len:'+laenge+';--i:'+(idx++)+'"':"")
        +' d="'+paar[0]+'" stroke="'+paar[1]+'" stroke-width="6.6" fill="none" stroke-linecap="round"/>';
    });
  });
  s+=konturen+fuellungen;

  /* Zentren */
  var zi=0;
  Object.keys(ZFORM).forEach(function(z){
    var def=defZ.has(z),d=rundPfad(ZFORM[z],6);
    s+='<g class="hd-zentrum" data-zentrum="'+z+'" data-status="'+(def?"definiert":"offen")+'" style="--i:'+(zi++)+'">';
    s+='<path d="'+d+'" fill="'+(def?ZFARBEN[z]:FARBEN.leer)+'" stroke="'+FARBEN.kontur+'" stroke-width="2"/>';
    if(def)s+='<path d="'+d+'" fill="url(#hd-tiefe)" stroke="none"/>';
    s+='</g>';
  });

  /* Torziffern – im klassischen Chart schlicht und schwarz */
  var ti=0;
  Object.keys(TOR_POS).forEach(function(t){
    var tor=+t,p=TOR_POS[tor];
    var istP=persTore.has(tor),istD=desTore.has(tor);
    var status=istP&&istD?"beides":(istP?"pers":(istD?"des":"leer"));
    var titel="Tor "+tor;
    if(torPlanet[tor])titel+=" · "+torPlanet[tor].map(function(x){
      return (x[0]==="p"?"Persönlichkeit ":"Design ")+x[1]+" "+tor+"."+x[2];
    }).join(" · ");
    /* Ziffer zum Schwerpunkt des eigenen Zentrums hin versetzt */
    var zn=TOR_ZENTRUM[tor], sp=SCHWERPUNKT[zn];
    var dx=p[0]-sp[0],dy=p[1]-sp[1],l=Math.hypot(dx,dy)||1;
    var weite=(zn==="herz")?8:11.5;
    var zx=p[0]-dx/l*weite, zy=p[1]-dy/l*weite;
    s+='<g class="hd-zahl" data-tor="'+tor+'" data-status="'+status+'" style="--i:'+(ti++)+'">';
    s+='<circle class="hd-tor-flaeche" cx="'+p[0]+'" cy="'+p[1]+'" r="13"/>';
    s+='<text x="'+zx.toFixed(1)+'" y="'+(zy+3).toFixed(1)+'" font-size="9.4" font-weight="'+(status==="leer"?"400":"600")
      +'" text-anchor="middle" fill="'+FARBEN.zahl+'" pointer-events="none">'+tor+"</text>";
    s+='<title>'+titel+'</title></g>';
  });

  s+="</svg>";
  return s;
}

/* ---------- Poster: Sternenblatt A4 ---------- */
function poster(chart,variablen,name,inhalte){
  var B=1240,H=1754;
  var inner=render(chart,variablen,{animiert:false}).replace(/^<svg[^>]*>/,"").replace(/<\/svg>$/,"");
  var profilName=inhalte&&inhalte.PROFILE&&inhalte.PROFILE[chart.profil]?inhalte.PROFILE[chart.profil][0]:"";
  var k=chart.kreuzTore;
  var zeilen=[["Typ",chart.typ],["Strategie",chart.strategie],["Autorität",chart.autoritaet],
    ["Profil",chart.profil+(profilName?" – "+profilName:"")],["Definition",chart.definition],
    ["Inkarnationskreuz",chart.winkel.replace("-Kreuz","")+" "+k.persSonne+"/"+k.persErde+" | "+k.desSonne+"/"+k.desErde]];
  if(variablen){
    zeilen.push(["Determination",variablen.determination.eintrag.name+" · "+variablen.determination.richtung]);
    zeilen.push(["Umgebung",variablen.umgebung.eintrag.name+" · "+variablen.umgebung.richtung]);
    zeilen.push(["Motivation",variablen.motivation.eintrag.name+" · "+variablen.motivation.richtung]);
    zeilen.push(["Perspektive",variablen.perspektive.eintrag.name+" · "+variablen.perspektive.richtung]);
  }
  var s='<svg viewBox="0 0 '+B+' '+H+'" width="'+B+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg">';
  s+='<defs><radialGradient id="pg" cx="50%" cy="26%" r="86%">'
    +'<stop offset="0" stop-color="#241263"/><stop offset="55%" stop-color="#130648"/><stop offset="100%" stop-color="#08012C"/></radialGradient></defs>';
  s+='<rect width="'+B+'" height="'+H+'" fill="url(#pg)"/>';
  /* Sterne über das ganze Blatt */
  var x=99;
  function rnd(){x=(x*1664525+1013904223)%4294967296;return x/4294967296}
  for(var i=0;i<260;i++){
    s+='<circle cx="'+(rnd()*B).toFixed(0)+'" cy="'+(rnd()*H).toFixed(0)+'" r="'+(0.6+rnd()*1.6).toFixed(2)
      +'" fill="#FFFFFF" opacity="'+(0.12+rnd()*0.5).toFixed(2)+'"/>';
  }
  s+='<text x="'+(B/2)+'" y="122" font-family="Fraunces,Georgia,serif" font-size="62" text-anchor="middle" fill="#FFFFFF">'
    +((name||"").trim()||"Dein Design")+"</text>";
  s+='<text x="'+(B/2)+'" y="166" font-family="Jost,system-ui,sans-serif" font-size="15" letter-spacing="7" text-anchor="middle" fill="rgba(255,255,255,0.62)">HUMAN DESIGN CHART</text>';
  var skala=0.88,chartH=990*skala;
  s+='<g transform="translate('+((B-620*skala)/2)+',206) scale('+skala+')">'+inner+"</g>";
  var y=206+chartH+64;
  zeilen.forEach(function(z){
    s+='<text x="150" y="'+y+'" font-family="Jost,system-ui,sans-serif" font-size="13.5" letter-spacing="3" fill="rgba(255,255,255,0.5)">'+z[0].toUpperCase()+"</text>";
    s+='<text x="430" y="'+y+'" font-family="Fraunces,Georgia,serif" font-size="25" fill="#FFFFFF">'+z[1]+"</text>";
    s+='<line x1="150" y1="'+(y+17)+'" x2="'+(B-150)+'" y2="'+(y+17)+'" stroke="rgba(255,255,255,0.14)" stroke-width="1"/>';
    y+=44;
  });
  s+='<text x="'+(B/2)+'" y="'+(H-52)+'" font-family="Jost,system-ui,sans-serif" font-size="13" letter-spacing="5" text-anchor="middle" fill="rgba(255,255,255,0.55)">FLOWYOURDESIGN.COM</text>';
  s+="</svg>";
  return s;
}

/* ---------- Mandala-Ring für den Kopfbereich ---------- */
function mandala(){
  var s='<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" class="hd-mandala">';
  s+='<g class="hd-ring">';
  for(var i=0;i<64;i++){
    var w=i/64*Math.PI*2-Math.PI/2;
    var r1=178,r2=i%8===0?162:170;
    s+='<line x1="'+(200+Math.cos(w)*r1).toFixed(1)+'" y1="'+(200+Math.sin(w)*r1).toFixed(1)
      +'" x2="'+(200+Math.cos(w)*r2).toFixed(1)+'" y2="'+(200+Math.sin(w)*r2).toFixed(1)
      +'" stroke="rgba(255,255,255,'+(i%8===0?0.55:0.28)+')" stroke-width="'+(i%8===0?1.4:1)+'"/>';
  }
  s+='<circle cx="200" cy="200" r="178" fill="none" stroke="rgba(255,255,255,0.22)" stroke-width="1"/>';
  s+='<circle cx="200" cy="200" r="150" fill="none" stroke="rgba(255,255,255,0.13)" stroke-width="1"/>';
  s+='</g>';
  s+='<circle cx="200" cy="200" r="118" fill="none" stroke="rgba(255,180,137,0.4)" stroke-width="1" class="hd-ring-gegen"/>';
  s+="</svg>";
  return s;
}

return {render:render,SCHWERPUNKT:SCHWERPUNKT,TOR_ZENTRUM:TOR_ZENTRUM,poster:poster,mandala:mandala,pfeilGruppe:pfeilGruppe,haelften:haelften,
  TOR_POS:TOR_POS,ZFORM:ZFORM,BOGEN:BOGEN,FARBEN:FARBEN,ZFARBEN:ZFARBEN,KANAELE:KANAELE,sterne:sterne};
});
