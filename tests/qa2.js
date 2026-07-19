/* Produkt-QA: Tiefenprüfung im echten Browser */
const puppeteer=require("/home/claude/node_modules/puppeteer-core");
const DATEI="file:///home/claude/hd/hd-rechner-einzeldatei.html";
let ok=0,fehler=[];
function p(name,gut,detail){
  gut?ok++:fehler.push(name+(detail!==undefined?" -> "+detail:""));
  console.log(`  ${gut?"PASS":"FAIL"} ${name}${detail!==undefined&&!gut?" -> "+detail:(detail!==undefined?" ("+detail+")":"")}`);
}
async function neueSeite(browser,b,h,mobil){
  const page=await browser.newPage();
  page.on("pageerror",e=>fehler.push("PageError: "+e.message));
  await page.setViewport({width:b,height:h,isMobile:!!mobil,hasTouch:!!mobil});
  await page.goto(DATEI,{waitUntil:"domcontentloaded"});
  await new Promise(r=>setTimeout(r,700));
  return page;
}
async function rechnen(page,ort,datum,zeit){
  await page.click("#ort");
  await page.evaluate(()=>document.getElementById("ort").value="");
  await page.type("#ort",ort,{delay:25});
  await new Promise(r=>setTimeout(r,320));
  const v=await page.$$(".vorschlag");
  if(v.length)await v[0].click();
  await page.evaluate((d,z)=>{document.getElementById("datum").value=d;document.getElementById("zeit").value=z},datum,zeit);
  await page.click("#btn-rechnen");
  await new Promise(r=>setTimeout(r,1800));
}

(async()=>{
const browser=await puppeteer.launch({executablePath:"/tmp/chromium",headless:"new",
  args:["--no-sandbox","--disable-dev-shm-usage"]});

console.log("— Lesbarkeit —");
{
  const page=await neueSeite(browser,390,844,true);
  await rechnen(page,"Herne","1988-03-17","07:45");
  const klein=await page.evaluate(()=>{
    const svg=document.querySelector("#graph svg");
    const skal=svg.getBoundingClientRect().width/620;
    return {skal:skal, ziffer:9.4*skal, breite:svg.getBoundingClientRect().width};
  });
  p("Hinweis auf Vollbild sichtbar",await page.evaluate(()=>getComputedStyle(document.querySelector(".chart-hinweis")).display!=="none"));
  await page.click("#btn-gross");
  await new Promise(r=>setTimeout(r,500));
  const voll=await page.evaluate(()=>{
    const svg=document.querySelector("#chart-voll svg");
    if(!svg)return null;
    const b=svg.getBoundingClientRect().width;
    return {breite:b, ziffer:9.4*b/620, offen:document.getElementById("chart-voll").classList.contains("an")};
  });
  p("Vollbild öffnet sich",!!voll&&voll.offen);
  p("Torziffern im Vollbild lesbar (>=10px)",voll&&voll.ziffer>=10,voll?voll.ziffer.toFixed(1)+"px":"kein SVG");
  p("Vollbild lässt sich schließen",await page.evaluate(()=>{
    document.getElementById("chart-voll-zu").click();
    return !document.getElementById("chart-voll").classList.contains("an");
  }));
  await page.close();
}

console.log("— Kontrast (WCAG) —");
{
  const page=await neueSeite(browser,1440,900,false);
  await rechnen(page,"Herne","1988-03-17","07:45");
  const kontraste=await page.evaluate(()=>{
    function lum(c){
      const [r,g,b]=c.match(/\d+/g).slice(0,3).map(v=>{
        v=v/255; return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4);
      });
      return 0.2126*r+0.7152*g+0.0722*b;
    }
    function grund(el){
      let e=el;
      while(e&&e!==document.documentElement){
        const bg=getComputedStyle(e).backgroundColor;
        if(bg&&!/rgba\(0, 0, 0, 0\)|transparent/.test(bg)){
          const a=(bg.match(/[\d.]+/g)||[])[3];
          if(a===undefined||parseFloat(a)>0.55)return bg;
        }
        e=e.parentElement;
      }
      return "rgb(12,4,66)";
    }
    const proben=[".lede",".abschnitt p",".kd .kd-w",".pfeil-karte p",".transit-liste li","footer",".hinweis",".tabelle td"];
    return proben.map(s=>{
      const el=document.querySelector(s);
      if(!el)return {s,v:null};
      const f=getComputedStyle(el).color, b=grund(el);
      const l1=lum(f),l2=lum(b);
      const v=(Math.max(l1,l2)+0.05)/(Math.min(l1,l2)+0.05);
      return {s,v:Math.round(v*10)/10,groesse:parseFloat(getComputedStyle(el).fontSize)};
    });
  });
  kontraste.forEach(k=>{
    if(k.v===null)return;
    const grenze=k.groesse>=18.66?3:4.5;
    p("Kontrast "+k.s,k.v>=grenze,k.v+":1 (nötig "+grenze+")");
  });
  await page.close();
}

console.log("— Downloads —");
{
  const page=await neueSeite(browser,1440,900,false);
  await rechnen(page,"Herne","1988-03-17","07:45");
  const poster=await page.evaluate(async()=>{
    const svg=window.HDBodygraph.poster(window.__HD_APP.holeChart(),window.__HD_APP.holeVariablen(),"",window.HDInhalte);
    const blob=new Blob([svg],{type:"image/svg+xml;charset=utf-8"});
    const url=URL.createObjectURL(blob);
    return await new Promise(res=>{
      const img=new Image();
      img.onload=function(){
        const c=document.createElement("canvas");c.width=620;c.height=877;
        c.getContext("2d").drawImage(img,0,0,620,877);
        c.toBlob(b=>res({ok:!!b,groesse:b?b.size:0}),"image/png");
      };
      img.onerror=()=>res({ok:false,groesse:0});
      img.src=url;
    });
  });
  p("Poster lässt sich als PNG erzeugen",poster.ok&&poster.groesse>20000,Math.round(poster.groesse/1024)+" KB");
  const svgD=await page.evaluate(()=>{
    const s=window.HDBodygraph.render(window.__HD_APP.holeChart(),window.__HD_APP.holeVariablen(),{animiert:false});
    return {laenge:s.length,gueltig:s.startsWith("<svg")&&s.endsWith("</svg>")};
  });
  p("Chart-SVG-Export gültig",svgD.gueltig&&svgD.laenge>10000,Math.round(svgD.laenge/1024)+" KB");
  await page.close();
}

console.log("— Link teilen —");
{
  const page=await neueSeite(browser,1440,900,false);
  await rechnen(page,"Herne","1988-03-17","07:45");
  const werte1=await page.evaluate(()=>{
    document.getElementById("btn-link").click();
    const c=window.__HD_APP.holeChart();
    return {hash:location.hash,typ:c.typ,profil:c.profil,tore:c.aktiveTore.join(",")};
  });
  p("Geburtsdaten landen im Link",werte1.hash.indexOf("#c=")===0,werte1.hash.slice(0,40));
  const page2=await browser.newPage();
  await page2.setViewport({width:1440,height:900});
  await page2.goto(DATEI+werte1.hash,{waitUntil:"domcontentloaded"});
  await new Promise(r=>setTimeout(r,2200));
  const werte2=await page2.evaluate(()=>{
    const c=window.__HD_APP.holeChart();
    return c?{typ:c.typ,profil:c.profil,tore:c.aktiveTore.join(",")}:null;
  });
  p("Geteilter Link rechnet dieselbe Chart",!!werte2&&werte2.typ===werte1.typ&&werte2.profil===werte1.profil&&werte2.tore===werte1.tore,
    werte2?werte2.typ+" "+werte2.profil:"nichts berechnet");
  await page.close();await page2.close();
}

console.log("— Grenzfälle —");
{
  const page=await neueSeite(browser,1440,900,false);
  const faelle=[
    ["Sydney","1935-11-02","23:58","Südhalbkugel, spätes Datum"],
    ["Reykjavik","1902-01-01","00:01","sehr früh, hoher Norden"],
    ["Berlin","1980-04-06","02:30","Umstellung auf Sommerzeit"],
    ["Quito","2001-06-21","12:00","Äquator, Sonnenwende"],
    ["Anchorage","1975-12-24","18:30","hohe Breite, Winter"]
  ];
  for(const [ort,d,z,was] of faelle){
    await rechnen(page,ort,d,z);
    const r=await page.evaluate(()=>{
      const c=window.__HD_APP.holeChart();
      if(!c)return null;
      const fehl=document.getElementById("form-fehler");
      return {typ:c.typ,profil:c.profil,tore:c.aktiveTore.length,
        bogen:((c.personality.sonne.grad-c.design.sonne.grad)%360+360)%360,
        fehler:fehl.classList.contains("an")?fehl.textContent:null};
    });
    p("Grenzfall "+was,!!r&&!r.fehler&&/^[1-6]\/[1-6]$/.test(r.profil)&&Math.abs(r.bogen-88)<1e-4,
      r?`${r.typ} ${r.profil}, ${r.tore} Tore, Bogen ${r.bogen.toFixed(4)}°`:"keine Berechnung");
  }
  await page.close();
}

console.log("— Fehlbedienung —");
{
  const page=await neueSeite(browser,390,844,true);
  await page.click("#btn-rechnen");
  await new Promise(r=>setTimeout(r,300));
  p("Hinweis ohne Eingaben",await page.evaluate(()=>document.getElementById("form-fehler").classList.contains("an")));
  await page.type("#ort","Xyzabc",{delay:20});
  await new Promise(r=>setTimeout(r,300));
  p("Keine Vorschläge bei Unsinn",await page.evaluate(()=>!document.getElementById("vorschlaege").classList.contains("an")));
  await page.evaluate(()=>{document.getElementById("ort").value="";document.getElementById("datum").value="1988-03-17"});
  await page.click("#btn-rechnen");
  await new Promise(r=>setTimeout(r,300));
  p("Hinweis bei fehlendem Ort",await page.evaluate(()=>document.getElementById("form-fehler").textContent.toLowerCase().includes("geburtsort")));
  await page.close();
}

console.log("— Tempo —");
{
  const page=await neueSeite(browser,390,844,true);
  const t0=Date.now();
  await rechnen(page,"Herne","1988-03-17","07:45");
  const dauer=Date.now()-t0;
  const rein=await page.evaluate(()=>{
    const t=performance.now();
    window.HDEngine.berechneChart(window.HDEngine.localToUtc(1988,3,17,7,45,"Europe/Berlin"));
    return performance.now()-t;
  });
  p("Berechnung unter 400 ms",rein<400,rein.toFixed(0)+" ms");
  p("Gesamter Ablauf unter 5 s",dauer<5000,dauer+" ms");
  const speicher=await page.evaluate(()=>performance.memory?Math.round(performance.memory.usedJSHeapSize/1048576):0);
  p("Speicherbedarf unter 220 MB",speicher===0||speicher<220,speicher+" MB");
  await page.close();
}

await browser.close();
console.log(`\n${ok} bestanden, ${fehler.length} fehlgeschlagen`);
if(fehler.length){console.log("\nOffene Punkte:");fehler.forEach(f=>console.log("  - "+f))}
process.exit(fehler.length?1:0);
})();
