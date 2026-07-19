/* QA-Durchlauf im echten Browser */
const puppeteer=require("/home/claude/node_modules/puppeteer-core");
const path=require("path");
const DATEI="file://"+path.resolve("/home/claude/hd/hd-rechner-einzeldatei.html");

const GERAETE=[
  {name:"320px",       b:320, h:568, dpr:2, mobil:true},
  {name:"iPhone SE",   b:375, h:667, dpr:2, mobil:true},
  {name:"iPhone 14",   b:390, h:844, dpr:3, mobil:true},
  {name:"Android klein",b:360,h:800, dpr:3, mobil:true},
  {name:"iPad",        b:820, h:1180,dpr:2, mobil:false},
  {name:"Desktop",     b:1440,h:900, dpr:1, mobil:false}
];

let bestanden=0, fehler=[];
function pruefe(gerät,name,ok,detail){
  if(ok)bestanden++;
  else fehler.push(`[${gerät}] ${name}${detail!==undefined?" -> "+detail:""}`);
  console.log(`  ${ok?"PASS":"FAIL"} [${gerät}] ${name}${!ok&&detail!==undefined?" -> "+detail:""}`);
}

(async()=>{
  const browser=await puppeteer.launch({
    executablePath:"/tmp/chromium",
    headless:"new",
    args:["--no-sandbox","--disable-setuid-sandbox","--disable-dev-shm-usage","--font-render-hinting=none"]
  });

  for(const g of GERAETE){
    const page=await browser.newPage();
    const konsolenfehler=[];
    page.on("console",m=>{if(m.type()==="error"&&!/fonts\.g(oogleapis|static)/.test(m.text())&&!/403/.test(m.text()))konsolenfehler.push(m.text())});
    page.on("pageerror",e=>konsolenfehler.push("PageError: "+e.message));
    page.on("requestfailed",()=>{});
    await page.setViewport({width:g.b,height:g.h,deviceScaleFactor:1,isMobile:g.mobil,hasTouch:g.mobil});
    await page.goto(DATEI,{waitUntil:"domcontentloaded",timeout:60000});
    await new Promise(r=>setTimeout(r,900));

    pruefe(g.name,"Keine Konsolenfehler beim Laden",konsolenfehler.length===0,konsolenfehler.slice(0,2).join(" | "));

    // Horizontales Überlaufen
    let ueber=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,innen:window.innerWidth}));
    pruefe(g.name,"Kein horizontales Scrollen",ueber.scroll<=ueber.innen+1,`${ueber.scroll} > ${ueber.innen}`);

    // Elemente, die aus dem Bild ragen
    const rausragend=await page.evaluate(()=>{
      const raus=[];
      function geklippt(el){
        let p=el.parentElement;
        while(p&&p!==document.body){
          const s=getComputedStyle(p);
          if(s.overflow!=="visible"||s.overflowX!=="visible")return true;
          p=p.parentElement;
        }
        return false;
      }
      document.querySelectorAll("body *").forEach(el=>{
        const s=getComputedStyle(el);
        if(s.position==="fixed"||s.display==="none"||s.visibility==="hidden")return;
        const r=el.getBoundingClientRect();
        if(r.width===0||r.height===0)return;
        if(geklippt(el))return;
        if(r.right>window.innerWidth+1.5||r.left<-1.5){
          raus.push((el.id?"#"+el.id:el.className&&typeof el.className==="string"?"."+el.className.split(" ")[0]:el.tagName)
            +` (${Math.round(r.left)}..${Math.round(r.right)})`);
        }
      });
      return [...new Set(raus)].slice(0,6);
    });
    pruefe(g.name,"Keine Elemente außerhalb des Bildschirms",rausragend.length===0,rausragend.join(", "));

    // Tippziele
    const zuKlein=await page.evaluate(()=>{
      const klein=[];
      document.querySelectorAll("button,a,input,[role=button],.vorschlag").forEach(el=>{
        const r=el.getBoundingClientRect();
        if(r.width===0||r.height===0)return;
        if(r.height<44)klein.push((el.id?"#"+el.id:el.tagName+"."+(el.className||"").split(" ")[0])+` ${Math.round(r.width)}x${Math.round(r.height)}`);
      });
      return klein.slice(0,8);
    });
    if(g.mobil)pruefe(g.name,"Tippziele mindestens 44px",zuKlein.length===0,zuKlein.join(", "));

    // Schriftgrößen
    const kleineSchrift=await page.evaluate(()=>{
      const s=new Set();
      document.querySelectorAll("p,li,td,span,div,label,button,a").forEach(el=>{
        if(!el.textContent.trim())return;
        const r=el.getBoundingClientRect();
        if(r.height===0)return;
        const g=parseFloat(getComputedStyle(el).fontSize);
        if(g<11)s.add((el.className&&typeof el.className==="string"?"."+el.className.split(" ")[0]:el.tagName)+" "+g.toFixed(1)+"px");
      });
      return [...s].slice(0,8);
    });
    if(g.mobil)pruefe(g.name,"Keine Schrift unter 11px",kleineSchrift.length===0,kleineSchrift.join(", "));

    // Vollständiger Ablauf
    await page.click("#ort");
    await page.type("#ort","Herne",{delay:35});
    await new Promise(r=>setTimeout(r,350));
    const vorschlaege=await page.$$(".vorschlag");
    pruefe(g.name,"Ortsvorschläge erscheinen",vorschlaege.length>0,vorschlaege.length+" Treffer");
    if(vorschlaege.length){
      const box=await vorschlaege[0].boundingBox();
      pruefe(g.name,"Vorschlagsliste im sichtbaren Bereich",box&&box.y>=0&&box.y+box.height<=g.h+400,
        box?`y=${Math.round(box.y)} h=${Math.round(box.height)}`:"keine Box");
      await vorschlaege[0].click();
    }
    await page.evaluate(()=>{
      document.getElementById("datum").value="1988-03-17";
      document.getElementById("zeit").value="07:45";
    });
    await page.click("#btn-rechnen");
    await new Promise(r=>setTimeout(r,2200));

    const erg=await page.evaluate(()=>{
      const e=document.getElementById("ergebnis");
      const svg=document.querySelector("#graph svg");
      const kd=document.querySelectorAll(".kd");
      return {
        sichtbar:e.classList.contains("an"),
        chartBreite:svg?svg.getBoundingClientRect().width:0,
        chartHoehe:svg?svg.getBoundingClientRect().height:0,
        kacheln:kd.length,
        typ:(document.querySelector(".kd-gold .kd-w")||{}).textContent||"",
        pfeile:document.querySelectorAll("#pfeile .pfeil-karte").length,
        transit:(document.getElementById("transit-inhalt")||{}).innerHTML.length||0
      };
    });
    pruefe(g.name,"Ergebnis erscheint",erg.sichtbar);
    pruefe(g.name,"Chart wird gezeichnet",erg.chartBreite>100&&erg.chartHoehe>100,`${Math.round(erg.chartBreite)}x${Math.round(erg.chartHoehe)}`);
    pruefe(g.name,"Chart passt in die Breite",erg.chartBreite<=g.b,`${Math.round(erg.chartBreite)} bei ${g.b}`);
    pruefe(g.name,"Alle acht Kernwerte da",erg.kacheln===8,erg.kacheln);
    pruefe(g.name,"Vier Variablen-Pfeile",erg.pfeile===4,erg.pfeile);
    pruefe(g.name,"Transit gefüllt",erg.transit>40,erg.transit);

    // Überlauf nach dem Rechnen erneut
    ueber=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,innen:window.innerWidth}));
    pruefe(g.name,"Kein horizontales Scrollen nach der Berechnung",ueber.scroll<=ueber.innen+1,`${ueber.scroll} > ${ueber.innen}`);

    // Randsymmetrie der Inhaltsblöcke
    const raender=await page.evaluate(()=>{
      const W=window.innerWidth;let l=1e9,r=1e9;
      document.querySelectorAll(".formular,.abschnitt,.kd,.graph-karte,.zitat,footer,.pfeil-karte,.z-karte,.transit-kachel").forEach(e=>{
        const b=e.getBoundingClientRect();l=Math.min(l,b.left);r=Math.min(r,W-b.right);
      });
      return {l:Math.round(l),r:Math.round(r)};
    });
    pruefe(g.name,"Inhaltsränder symmetrisch",Math.abs(raender.l-raender.r)<=4&&raender.l>=8,`links ${raender.l} rechts ${raender.r}`);

    // Textüberlappungen
    const ueberlappung=await page.evaluate(()=>{
      const t=[...document.querySelectorAll(".abschnitt h2,.abschnitt p,.kd-w,.pfeil-wert,.transit-kachel .tk-w,.zitat-gross,.lede")]
        .map(e=>({t:(e.textContent||"").slice(0,16),b:e.getBoundingClientRect()}))
        .filter(x=>x.b.width>0&&x.b.height>0);
      const u=[];
      for(let i=0;i<t.length;i++)for(let j=i+1;j<t.length;j++){
        const a=t[i].b,c=t[j].b;
        if(Math.min(a.right,c.right)-Math.max(a.left,c.left)>4&&Math.min(a.bottom,c.bottom)-Math.max(a.top,c.top)>4)
          u.push(t[i].t+" / "+t[j].t);
      }
      return [...new Set(u)].slice(0,3);
    });
    pruefe(g.name,"Keine Textüberlappungen",ueberlappung.length===0,ueberlappung.join(" | "));

    // Foto im Kopfbereich sichtbar
    const foto=await page.evaluate(()=>{
      const f=document.getElementById("hero-foto");
      if(!f)return null;
      const b=f.getBoundingClientRect();
      return {w:Math.round(b.width),h:Math.round(b.height),bild:(getComputedStyle(f).backgroundImage||"").indexOf("data:")>=0};
    });
    pruefe(g.name,"Hero-Foto sichtbar und gefüllt",foto&&foto.w>120&&foto.h>140&&foto.bild,foto?`${foto.w}x${foto.h}`:"fehlt");

    // Klebt etwas über dem Inhalt?
    const verdeckt=await page.evaluate(()=>{
      const leiste=document.querySelector(".leiste");
      if(!leiste)return null;
      return leiste.getBoundingClientRect().height;
    });
    pruefe(g.name,"Keine eigene Kopfleiste",verdeckt===null,verdeckt+"px");

    pruefe(g.name,"Keine Konsolenfehler im Ablauf",konsolenfehler.length===0,konsolenfehler.slice(0,2).join(" | "));

    await page.screenshot({path:`/home/claude/hd/qa-${g.name.replace(/\s/g,"-")}.png`,fullPage:false});
    await page.evaluate(()=>window.scrollTo(0,document.body.scrollHeight*0.35));
    await new Promise(r=>setTimeout(r,400));
    await page.screenshot({path:`/home/claude/hd/qa-${g.name.replace(/\s/g,"-")}-ergebnis.png`,fullPage:false});
    await page.close();
  }

  await browser.close();
  console.log(`\n${bestanden} bestanden, ${fehler.length} fehlgeschlagen`);
  if(fehler.length){console.log("\nOffene Punkte:");fehler.forEach(f=>console.log("  - "+f))}
  process.exit(fehler.length?1:0);
})();
