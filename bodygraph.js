/* HD-BODYGRAPH v9 – Leucht-Chart mit Silhouette und Planetenspalten
   Vorbild: moderne HD-Apps. Persönlichkeit in Sternenblau, Design in Magenta-Rosé,
   definierte Zentren leuchten weiß, Tore als farbige Chips, Planetenspalten im Bild. */
(function(root,factory){
  if(typeof module!=="undefined"&&module.exports)module.exports=factory();
  else root.HDBodygraph=factory();
})(typeof self!=="undefined"?self:this,function(){
"use strict";

var FARBEN={
  grund:"#120650",
  grundTief:"#0C0442",
  silhouette:"#180B58",
  pers:"#FFFFFF",          /* Persönlichkeit: Sternenweiß */
  des:"#FFB489",           /* Design: warmes Gold-Rosé wie das Logo */
  zentrumAus:"#1B0E5A",
  leer:"rgba(255,255,255,0.10)",
  zahl:"#120650"
};
/* Zentrumsfarben: warme, gedämpfte Töne, die auf Indigo ruhig leuchten */
var ZFARBEN={
  kopf:"#F3E6C6", ajna:"#D9E4D4", kehle:"#EAD7BD", g:"#F6E9C8", herz:"#F2CFC4",
  sakral:"#F2CFC4", milz:"#DEE0D2", solarplexus:"#F0DCC4", wurzel:"#E4D6C4"
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

/* Schwerpunkte + Zuordnung Tor->Zentrum */
var SCHWERPUNKT=(function(){
  var s={};
  Object.keys(ZFORM).forEach(function(z){
    var pts=ZFORM[z].split(" ").map(function(p){return p.split(",").map(Number)});
    var sx=0,sy=0;pts.forEach(function(p){sx+=p[0];sy+=p[1]});
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

var PLANET_REIHE=["sonne","erde","mond","nordknoten","suedknoten","merkur","venus","mars","jupiter","saturn","uranus","neptun","pluto"];
var PLANET_ZEICHEN={sonne:"\u2609",erde:"\u2295",mond:"\u263D",nordknoten:"\u260A",suedknoten:"\u260B",
  merkur:"\u263F",venus:"\u2640",mars:"\u2642",jupiter:"\u2643",saturn:"\u2644",
  uranus:"\u2645",neptun:"\u2646",pluto:"\u2647"};

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

function sterne(anzahl,samen,W,H){
  W=W||880;H=H||1000;
  var s="",x=samen||7;
  function rnd(){x=(x*1664525+1013904223)%4294967296;return x/4294967296}
  for(var i=0;i<anzahl;i++){
    var cx=rnd()*W,cy=rnd()*H,r=0.5+rnd()*1.3,o=0.10+rnd()*0.4;
    var dauer=(2.6+rnd()*4).toFixed(1),verzug=(rnd()*5).toFixed(1);
    s+='<circle class="hd-stern" cx="'+cx.toFixed(0)+'" cy="'+cy.toFixed(0)+'" r="'+r.toFixed(2)
      +'" fill="#FFFFFF" opacity="'+o.toFixed(2)+'" style="--d:'+dauer+'s;--v:'+verzug+'s"/>';
  }
  return s;
}

/* Körper-Silhouette hinter dem Graphen */
function silhouette(){
  return '<g fill="'+FARBEN.silhouette+'" opacity="0.55">'
    +'<ellipse cx="310" cy="70" rx="64" ry="74"/>'
    +'<path d="M310 128 C 214 128 128 208 118 330 C 110 430 96 540 96 660 C 96 830 168 972 310 972 C 452 972 524 830 524 660 C 524 540 510 430 502 330 C 492 208 406 128 310 128 Z"/>'
    +'</g>';
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
    s+='<path d="'+d+'" fill="'+a.f+'" filter="url(#hd-glut)"/>';
    var zx=a.r==="links"?a.x+27:a.x-27;
    s+='<circle cx="'+zx+'" cy="'+a.y+'" r="9.5" fill="none" stroke="'+a.f+'" stroke-width="1.2" opacity="0.8"/>';
    s+='<text x="'+zx+'" y="'+(a.y+3.4)+'" font-size="10" font-weight="600" text-anchor="middle" fill="'+a.f+'">'+a.z+"</text>";
    s+='</g>';
  });
  return s;
}

/* Planetenspalte */
function spalte(akt,seite,farbe,x0){
  var s='<g font-size="15">';
  PLANET_REIHE.forEach(function(pl,i){
    var a=akt[pl];if(!a)return;
    var y=196+i*58;
    var wert=a.tor+"."+a.linie;
    var chipB=54,chipX=(seite==="links")?x0+30:x0;
    var symX=(seite==="links")?x0+12:x0+chipB+18;
    s+='<text x="'+symX+'" y="'+(y+5)+'" text-anchor="middle" fill="rgba(255,255,255,0.75)" font-size="15">'+PLANET_ZEICHEN[pl]+"</text>";
    s+='<rect x="'+chipX+'" y="'+(y-12)+'" width="'+chipB+'" height="24" rx="8" fill="rgba(255,255,255,0.05)" stroke="'+farbe+'" stroke-opacity="0.5" stroke-width="1"/>';
    s+='<text x="'+(chipX+chipB/2)+'" y="'+(y+5)+'" text-anchor="middle" fill="'+farbe+'" font-weight="600" font-size="13.5">'+wert+"</text>";
  });
  s+="</g>";
  return s;
}

function render(chart,variablen,opt){
  opt=opt||{};
  var animiert=opt.animiert!==false;
  var mitSpalten=opt.spalten!==false;
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
  var B=mitSpalten?880:640, versatz=mitSpalten?130:10;

  var s='<svg viewBox="0 0 '+B+' 1000" xmlns="http://www.w3.org/2000/svg" class="hd-chart'+(animiert?" hd-an":"")+'" font-family="Jost,system-ui,sans-serif">';
  s+='<defs>'
    +'<radialGradient id="hd-himmel" cx="50%" cy="30%" r="80%">'
    +'<stop offset="0" stop-color="#241263"/><stop offset="55%" stop-color="#140749"/><stop offset="100%" stop-color="#0A0233"/></radialGradient>'
    +'<filter id="hd-glut" x="-80%" y="-80%" width="260%" height="260%">'
    +'<feGaussianBlur stdDeviation="2.2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>'
    +'<filter id="hd-glut-weich" x="-120%" y="-120%" width="340%" height="340%">'
    +'<feGaussianBlur stdDeviation="7"/></filter>'
    +'<filter id="hd-glut-zentrum" x="-60%" y="-60%" width="220%" height="220%">'
    +'<feGaussianBlur stdDeviation="14"/></filter>'
    +'<style>'
    +'.hd-stern{animation:hdFunkeln var(--d,3s) ease-in-out infinite alternate;animation-delay:var(--v,0s)}'
    +'@keyframes hdFunkeln{from{opacity:.10}to{opacity:.7}}'
    +'.hd-an .hd-ader{stroke-dasharray:var(--len,300);stroke-dashoffset:var(--len,300);'
    +'animation:hdZeichnen 1.05s cubic-bezier(.4,0,.2,1) forwards;animation-delay:calc(.2s + var(--i,0)*.04s)}'
    +'@keyframes hdZeichnen{to{stroke-dashoffset:0}}'
    +'.hd-an .hd-zentrum{opacity:0;animation:hdAuf .8s ease forwards;animation-delay:calc(.05s + var(--i,0)*.06s)}'
    +'@keyframes hdAuf{from{opacity:0}to{opacity:1}}'
    +'.hd-an .hd-chip{opacity:0;animation:hdChip .45s ease forwards;animation-delay:calc(.85s + var(--i,0)*.012s)}'
    +'@keyframes hdChip{from{opacity:0;transform:scale(.6)}to{opacity:1;transform:scale(1)}}'
    +'.hd-chip{transform-box:fill-box;transform-origin:center;cursor:help}'
    +'@media (prefers-reduced-motion: reduce){.hd-stern,.hd-an .hd-ader,.hd-an .hd-zentrum,.hd-an .hd-chip{animation:none;opacity:1;stroke-dashoffset:0}}'
    +'</style></defs>';

  s+='<rect x="0" y="0" width="'+B+'" height="1000" rx="26" fill="url(#hd-himmel)"/>';
  s+=sterne(80,11,B,1000);

  if(mitSpalten){
    s+=spalte(chart.design,"links",FARBEN.des,16);
    s+=spalte(chart.personality,"rechts",FARBEN.pers,B-118);
  }

  s+='<g transform="translate('+versatz+',10)">';
  s+=silhouette();
  s+=pfeilGruppe(variablen);

  /* Kanäle */
  var ruhig="",gluehen="",adern="",idx=0;
  KANAELE.forEach(function(k){
    var h=haelften(k[0],k[1]);
    var pa=persTore.has(k[0]),da=desTore.has(k[0]);
    var pb=persTore.has(k[1]),db=desTore.has(k[1]);
    function farbe(p,d){return p&&d?"url(#hd-mix)":(p?FARBEN.pers:(d?FARBEN.des:null))}
    var fa=(pa||da)?(pa?FARBEN.pers:FARBEN.des):null;
    var fb=(pb||db)?(pb?FARBEN.pers:FARBEN.des):null;
    /* bei doppelter Aktivierung dominiert im Strang die Mischung: einfach beide Farben übereinander */
    var kn=key(k[0],k[1]);
    var voll=(fa&&fb);
    if(!fa&&!fb){
      ruhig+='<path data-kanal="'+kn+'" data-status="leer" d="'+h[0]+'" stroke="'+FARBEN.leer+'" stroke-width="2.6" fill="none" stroke-linecap="round"/>'
            +'<path d="'+h[1]+'" stroke="'+FARBEN.leer+'" stroke-width="2.6" fill="none" stroke-linecap="round"/>';
    }else{
      var laenge=Math.round(Math.hypot(TOR_POS[k[0]][0]-TOR_POS[k[1]][0],TOR_POS[k[0]][1]-TOR_POS[k[1]][1])/2)+16;
      [[h[0],fa,pa,da],[h[1],fb,pb,db]].forEach(function(teil,j){
        var d=teil[0];
        if(!teil[1]){
          adern+='<path'+(j===0?' data-kanal="'+kn+'" data-status="halb"':"")+' d="'+d+'" stroke="'+FARBEN.leer+'" stroke-width="2.6" fill="none" stroke-linecap="round"/>';
          return;
        }
        gluehen+='<path d="'+d+'" stroke="'+teil[1]+'" stroke-width="8" fill="none" stroke-linecap="round" opacity="0.16" filter="url(#hd-glut-weich)"/>';
        adern+='<path d="'+d+'" stroke="'+FARBEN.grundTief+'" stroke-width="6.6" fill="none" stroke-linecap="round" opacity="0.9"/>';
        adern+='<path class="hd-ader"'+(j===0?' data-kanal="'+kn+'" data-status="'+(voll?"definiert":"halb")+'"':"")
          +' style="--len:'+laenge+';--i:'+(idx++)+'" d="'+d+'" stroke="'+teil[1]+'" stroke-width="4" fill="none" stroke-linecap="round"/>';
        if(teil[2]&&teil[3]){ /* beide Seiten: zweite Farbe gestrichelt darüber */
          adern+='<path class="hd-ader" style="--len:'+laenge+';--i:'+(idx++)+'" d="'+d
            +'" stroke="'+FARBEN.des+'" stroke-width="4.6" fill="none" stroke-linecap="round" stroke-dasharray="7 7"/>';
        }
      });
    }
  });
  s+=ruhig+gluehen+adern;

  /* Zentren */
  var zi=0;
  Object.keys(ZFORM).forEach(function(z){
    var def=defZ.has(z),d=rundPfad(ZFORM[z],7);
    s+='<g class="hd-zentrum" data-zentrum="'+z+'" data-status="'+(def?"definiert":"offen")+'" style="--i:'+(zi++)+'">';
    if(def){
      s+='<path d="'+d+'" fill="'+FARBEN.des+'" opacity="0.20" filter="url(#hd-glut-zentrum)"/>';
      s+='<path d="'+d+'" fill="'+ZFARBEN[z]+'" fill-opacity="0.96" stroke="rgba(255,255,255,0.65)" stroke-width="1.2"/>';
      s+='<path d="'+d+'" fill="url(#hd-tiefe)" stroke="none"/>';
    }else{
      s+='<path d="'+d+'" fill="'+FARBEN.zentrumAus+'" fill-opacity="0.85" stroke="rgba(255,255,255,0.22)" stroke-width="1"/>';
    }
    s+='</g>';
  });

  /* Tore: aktive als Chips, inaktive als stille Ziffern */
  var ti=0;
  Object.keys(TOR_POS).forEach(function(t){
    var tor=+t,p=TOR_POS[tor];
    var istP=persTore.has(tor),istD=desTore.has(tor);
    var status=istP&&istD?"beides":(istP?"pers":(istD?"des":"leer"));
    var zDef=defZ.has(TOR_ZENTRUM[tor]);
    var titel="Tor "+tor;
    if(torPlanet[tor])titel+=" \u00B7 "+torPlanet[tor].map(function(x){
      return (x[0]==="p"?"Pers\u00F6nlichkeit ":"Design ")+x[1]+" "+tor+"."+x[2];
    }).join(" \u00B7 ");
    s+='<g class="hd-chip" data-tor="'+tor+'" data-status="'+status+'" style="--i:'+(ti++)+'">';
    if(istP||istD){
      var w=21,h=15;
      if(istP&&istD){
        s+='<path d="M'+(p[0]-w/2)+' '+(p[1]-h/2)+' h'+(w/2)+' v'+h+' h-'+(w/2)+' a4 4 0 0 1 -4 -4 v-'+(h-8)+' a4 4 0 0 1 4 -4 Z" fill="'+FARBEN.pers+'"/>';
        s+='<path d="M'+(p[0])+' '+(p[1]-h/2)+' h'+(w/2-4)+' a4 4 0 0 1 4 4 v'+(h-8)+' a4 4 0 0 1 -4 4 h-'+(w/2-4)+' Z" fill="'+FARBEN.des+'"/>';
      }else{
        s+='<rect x="'+(p[0]-w/2)+'" y="'+(p[1]-h/2)+'" width="'+w+'" height="'+h+'" rx="4.5" fill="'+(istP?FARBEN.pers:FARBEN.des)+'" stroke="'+FARBEN.grundTief+'" stroke-width="0.8"/>';
      }
      s+='<text x="'+p[0]+'" y="'+(p[1]+3.4)+'" font-size="9.4" font-weight="700" text-anchor="middle" fill="'+FARBEN.zahl+'" pointer-events="none">'+tor+"</text>";
    }else{
      s+='<text x="'+p[0]+'" y="'+(p[1]+3.2)+'" font-size="8.8" text-anchor="middle" fill="rgba(255,255,255,'+(zDef?'0.5':'0.32')+')">'+tor+"</text>";
    }
    s+='<title>'+titel+'</title></g>';
  });

  s+="</g></svg>";
  return s;
}

/* ---------- Poster ---------- */
function poster(chart,variablen,name,inhalte){
  var B=1240,H=1754;
  var inner=render(chart,variablen,{animiert:false,spalten:true}).replace(/^<svg[^>]*>/,"").replace(/<\/svg>$/,"");
  var profilName=inhalte&&inhalte.PROFILE&&inhalte.PROFILE[chart.profil]?inhalte.PROFILE[chart.profil][0]:"";
  var k=chart.kreuzTore;
  var zeilen=[["Typ",chart.typ],["Strategie",chart.strategie],["Autorit\u00E4t",chart.autoritaet],
    ["Profil",chart.profil+(profilName?" \u2013 "+profilName:"")],["Definition",chart.definition],
    ["Inkarnationskreuz",chart.winkel.replace("-Kreuz","")+" "+k.persSonne+"/"+k.persErde+" | "+k.desSonne+"/"+k.desErde]];
  if(variablen){
    zeilen.push(["Determination",variablen.determination.eintrag.name+" \u00B7 "+variablen.determination.richtung]);
    zeilen.push(["Umgebung",variablen.umgebung.eintrag.name+" \u00B7 "+variablen.umgebung.richtung]);
    zeilen.push(["Motivation",variablen.motivation.eintrag.name+" \u00B7 "+variablen.motivation.richtung]);
    zeilen.push(["Perspektive",variablen.perspektive.eintrag.name+" \u00B7 "+variablen.perspektive.richtung]);
  }
  var s='<svg viewBox="0 0 '+B+' '+H+'" width="'+B+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg">';
  s+='<defs><radialGradient id="pg" cx="50%" cy="26%" r="86%">'
    +'<stop offset="0" stop-color="#2A1875"/><stop offset="55%" stop-color="#150A4C"/><stop offset="100%" stop-color="#08012C"/></radialGradient></defs>';
  s+='<rect width="'+B+'" height="'+H+'" fill="url(#pg)"/>';
  var x=99;function rnd(){x=(x*1664525+1013904223)%4294967296;return x/4294967296}
  for(var i=0;i<240;i++)s+='<circle cx="'+(rnd()*B).toFixed(0)+'" cy="'+(rnd()*H).toFixed(0)+'" r="'+(0.6+rnd()*1.5).toFixed(2)+'" fill="#FFFFFF" opacity="'+(0.10+rnd()*0.45).toFixed(2)+'"/>';
  s+='<text x="'+(B/2)+'" y="118" font-family="Marcellus,Georgia,serif" font-size="58" text-anchor="middle" fill="#FFFFFF">'
    +((name||"").trim()||"Dein Design")+"</text>";
  s+='<text x="'+(B/2)+'" y="160" font-family="Jost,system-ui,sans-serif" font-size="15" letter-spacing="7" text-anchor="middle" fill="rgba(255,255,255,0.6)">HUMAN DESIGN CHART</text>';
  var skala=1.02,chartH=1000*skala;
  s+='<g transform="translate('+((B-880*skala)/2)+',196) scale('+skala+')">'+inner+"</g>";
  var y=196+chartH+58;
  zeilen.forEach(function(z){
    s+='<text x="150" y="'+y+'" font-family="Jost,system-ui,sans-serif" font-size="13.5" letter-spacing="3" fill="rgba(255,255,255,0.5)">'+z[0].toUpperCase()+"</text>";
    s+='<text x="430" y="'+y+'" font-family="Marcellus,Georgia,serif" font-size="24" fill="#FFFFFF">'+z[1]+"</text>";
    s+='<line x1="150" y1="'+(y+16)+'" x2="'+(B-150)+'" y2="'+(y+16)+'" stroke="rgba(255,255,255,0.14)" stroke-width="1"/>';
    y+=42;
  });
  s+='<text x="'+(B/2)+'" y="'+(H-50)+'" font-family="Jost,system-ui,sans-serif" font-size="13" letter-spacing="5" text-anchor="middle" fill="rgba(255,255,255,0.55)">FLOWYOURDESIGN.COM</text>';
  s+="</svg>";
  return s;
}

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
  s+='<circle cx="200" cy="200" r="118" fill="none" stroke="rgba(255,95,209,0.35)" stroke-width="1" class="hd-ring-gegen"/>';
  s+="</svg>";
  return s;
}

return {render:render,poster:poster,mandala:mandala,pfeilGruppe:pfeilGruppe,haelften:haelften,
  silhouette:silhouette,spalte:spalte,PLANET_REIHE:PLANET_REIHE,PLANET_ZEICHEN:PLANET_ZEICHEN,
  SCHWERPUNKT:SCHWERPUNKT,TOR_ZENTRUM:TOR_ZENTRUM,
  TOR_POS:TOR_POS,ZFORM:ZFORM,BOGEN:BOGEN,FARBEN:FARBEN,ZFARBEN:ZFARBEN,KANAELE:KANAELE,sterne:sterne};
});
