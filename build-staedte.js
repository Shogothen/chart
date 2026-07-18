"use strict";
const cities=require("all-the-cities");
const tz=require("tz-lookup");
const fs=require("fs");

/* Deutsche Exonyme -> GeoNames-Namen (Suche soll "München" wie "Munich" finden) */
const EXONYME={
  "münchen":"Munich","köln":"Cologne","nürnberg":"Nuremberg","wien":"Vienna",
  "zürich":"Zurich","genf":"Geneva","brüssel":"Brussels","antwerpen":"Antwerp",
  "mailand":"Milan","rom":"Rome","neapel":"Naples","turin":"Turin","genua":"Genoa",
  "venedig":"Venice","florenz":"Florence","prag":"Prague","warschau":"Warsaw",
  "krakau":"Kraków","breslau":"Wrocław","danzig":"Gdańsk","stettin":"Szczecin",
  "moskau":"Moscow","sankt petersburg":"Saint Petersburg","kiew":"Kyiv",
  "lissabon":"Lisbon","porto":"Porto","sevilla":"Seville","saragossa":"Zaragoza",
  "kopenhagen":"Copenhagen","athen":"Athens","thessaloniki":"Thessaloníki",
  "bukarest":"Bucharest","belgrad":"Belgrade","sofia":"Sofia","budapest":"Budapest",
  "nizza":"Nice","marseille":"Marseille","straßburg":"Strasbourg","lüttich":"Liège",
  "den haag":"The Hague","kapstadt":"Cape Town","kairo":"Cairo","damaskus":"Damascus",
  "peking":"Beijing","schanghai":"Shanghai","tokio":"Tokyo","neu-delhi":"New Delhi",
  "singapur":"Singapore","havanna":"Havana","mexiko-stadt":"Mexico City",
  "sankt gallen":"Sankt Gallen","hannover":"Hannover","braunschweig":"Braunschweig"
};

function norm(s){
  return s.toLowerCase()
    .replace(/ä/g,"a").replace(/ö/g,"o").replace(/ü/g,"u").replace(/ß/g,"ss")
    .normalize("NFD").replace(/[\u0300-\u036f]/g,"");
}

const DACH=new Set(["DE","AT","CH"]);
const liste=[];
for(const c of cities){
  const pop=c.population||0;
  const dach=DACH.has(c.country);
  if(!(dach&&pop>=5000)&&!(pop>=15000))continue;
  const lat=c.loc.coordinates[1],lon=c.loc.coordinates[0];
  let zone;
  try{zone=tz(lat,lon)}catch(e){continue}
  liste.push([c.name,c.country,+lat.toFixed(4),+lon.toFixed(4),zone,pop]);
}
liste.sort((a,b)=>b[5]-a[5]);

/* Exonym-Index: normalisierter deutscher Name -> normalisierter GeoNames-Name */
const exo={};
for(const [de,en] of Object.entries(EXONYME))exo[norm(de)]=norm(en);

const out="/* GeoNames-Daten (CC-BY 4.0, geonames.org) via all-the-cities · Zeitzonen via tz-lookup */\n"
 +"var HD_STAEDTE="+JSON.stringify(liste)
 +";\nvar HD_EXONYME="+JSON.stringify(exo)
 +";\nif(typeof module!=='undefined')module.exports={HD_STAEDTE:HD_STAEDTE,HD_EXONYME:HD_EXONYME};\n";
fs.writeFileSync("staedte.js",out);
console.log("Städte im Index:",liste.length,"· Dateigröße:",(out.length/1024/1024).toFixed(2),"MB");
console.log("Stichprobe Herne:",JSON.stringify(liste.find(x=>x[0]==="Herne"&&x[1]==="DE")));
console.log("Stichprobe Montréal:",JSON.stringify(liste.find(x=>x[0].startsWith("Montr")&&x[1]==="CA")));
