"use strict"

//just using globals - sorry
let GOOP = {};

document.addEventListener("DOMContentLoaded", (event)=>{ init(event) } );

function init(event) {

  console.log('in init:',event);

  GOOP.mainDiv = document.getElementById('main');
  GOOP.mainDiv.addEventListener("click", (event)=>{selectField(event)});
  GOOP.mainDiv.addEventListener("mouseover", (event)=>{selectField(event)});
  window.addEventListener("resize", ev=>{adjustInfo(ev)});

  GOOP.main = document.getElementById('mainForm');

  const gm = GOOP.main;

  GOOP.numTabs = 5;  //we would need some ajax to automatically get images sensibly
  GOOP.maxTab = GOOP.numTabs-1; //tired of typing it
  GOOP.divs = []; GOOP.info = [];
  GOOP.zIndices = [];
  GOOP.map = {};

  GOOP.colors = []  
 
  const colors = [ [250,240,250,1 ] ,  [ 240,230,240,1  ]   ]
  for (let i=0; i<GOOP.numTabs; i++) {

    const j = i % 2
    GOOP.colors.push( colors[j])
  }

  for (let i=0; i<GOOP.numTabs; i++) {

    let newDiv = document.createElement('div');
  
    const cc = GOOP.colors[i];
  
    newDiv.style.transform = `translate(0,${60*i}px)`;
    newDiv.className = 'overlap';
    newDiv.id = 'tab' + i;
    gm.appendChild(newDiv);
    newDiv.style.backgroundColor = `rgba(${cc[0]},${cc[1]},${cc[2]},${cc[3]} )`;
    newDiv.style.zIndex = i;
  
    newDiv.innerHTML = `<a target=_blank href="images/${i}.png">  <img id="tab${i}" src="images/${i}.png" /></a>`

    const span = document.createElement('span');

    span.className = 'info2';

    span.style.backgroundColor = `rgba(${cc[0]},${cc[1]},${cc[2]},${cc[3]} )`;
    span.innerText = `images/${i}.png`
    span.id = 'tab' + i;  //give it the same tab id so onhover registers

    newDiv.appendChild(span);
  
    GOOP.divs.push(newDiv);
    GOOP.info.push(span);
    GOOP.zIndices.push(i);
    GOOP.map[newDiv.id] = i; //map from div name to array index

  }

  GOOP.maxZindex = GOOP.numTabs - 1;

  adjustInfo(null);
}

function adjustInfo(ev) {
  let className = "info2"
  if (window.innerWidth > 900) {
    className = "info"
  }

  GOOP.info.forEach(info=>info.className=className);
}

function selectField(ev) {

  // console.log('selected div is:',ev);

   //take everything between the current array index and the previous max
   //index and make the z index descending to there
   const p2 = GOOP.maxZindex;
   const p1 = GOOP.map[ev.target.id];
   const maxZindex =  GOOP.maxZindex;

   const info = GOOP.info[p1];
 
   //console.log('max z:',GOOP.maxZindex);

   const diff = p2 - p1;
   //console.log('diff:',diff);
   const sgn = Math.sign(diff);

   if ( sgn === 0 || isNaN(sgn)) {
     //no need to do anything we clicked  on the current tab
     return
   }
   
   //this logic was hard to figure out
   let zdir, zIndexStart=0, start, end ;
   if ( p1 < p2 ) { start = p1; end = p2; zIndexStart=GOOP.numTabs-1; zdir=-1;}
   else           { start = p2; end = p1; zIndexStart=GOOP.numTabs+diff-1; zdir=1;}

   if ( p1 === 0 ) { end = GOOP.numTabs - 1; zIndexStart=GOOP.maxTab; zdir=-1 }
   else if ( p1 === (GOOP.numTabs-1) ) 
     { start = 0; zIndexStart=0; zdir=1}
   else if (zdir === -1 )  end = GOOP.maxTab;
   else if ( zdir === 1 )  start = 0;

   //console.log("start,end",start,end,sgn);
   let currentZ = zIndexStart;

   for (let i=start; i<=end; i++) {
     //console.log(i,currentZ);
     GOOP.divs[i].style.zIndex = currentZ;
     currentZ += zdir;
   }

   GOOP.maxZindex = p1;


}
