"use strict";

function makeKeyCounts() {
  //long winded amount of code to generate lookup tables
  //for an old cell phone keypad, somewhat generalizeable though
  const aOffset = 65; //A=65
  let numP = {}; //number of presses per numeric key to get alpha key
  let invP = {}; //the numeric key pressed per alpha key
  let count = 0, count2 = 0;
  let whichKey = 2;
  for (let i = 0; i < 26; i++) {
    const letter = String.fromCharCode(i + aOffset);
    numP[letter] = (count % 3) + 1;
    count++;
    count2++;
    //only 2 special cases: S and Z
    if ("SZ".includes(letter)) {
      numP[letter] = 4;
      count = 0;
      count2--;
      whichKey--;
    }

    invP[letter] = whichKey;
    if (count2 % 3 == 0) whichKey++;
  }
  //no reason not to include the special characters
  numP[" "] = 1;
  numP["*"] = 1;
  numP["#"] = 1;

  //let's just deal with numbers as strings
  const zeroOffset = 48; //0=48
  for (let i = 0; i < 10; i++) {
    const letter = String.fromCharCode(i + zeroOffset);
    numP[letter] = 1;
  }

  let lettersByKey = {};
  const kk = Object.keys(invP);
  for (let i = 0; i < kk.length; i++) {
    const [letter, keynum] = [kk[i], invP[kk[i]]];
    if (!lettersByKey[keynum]) lettersByKey[keynum] = [];
    lettersByKey[keynum].push(letter);
  }
  lettersByKey["0"] = ["\u00A0"];
  //if we want multiple spaces in html we need the &nbsp whitespace
  //character which is \u00A0 in hex
  lettersByKey["*"] = ["*"];
  lettersByKey["#"] = ["#"];
  lettersByKey["1"] = ["1"];

  return [numP, invP, lettersByKey];
}

const presses = (strIn) => {
  let numP = 0;
  const strUC = strIn.toUpperCase();
  for (let i = 0; i < strUC.length; i++) {
    //?? nullish coalescing is superior to ||
    numP += keyP[strUC[i]] ?? 0;
  }
  return numP;
};

function checkPresses(key = "") {
  //document.getElementById("textarea").scrollTop = document.getElementById("textarea").scrollHeight

  const ln = np.presses.length - 1;
  const timeNow = Date.now();
  const clickTime = timeNow - np.mouseDownTime;

  if (np.mouseDown) np.clickTime = clickTime;

  if (clickTime > np.LONGPRESS && np.mouseDown) {
    np.showLetter.textContent = np.presses[ln];
    document.getElementById(np.keyIdPrefix+np.presses[ln]).style.backgroundColor="#00FFFF";
  }

  if (timeNow - np.timeLast > 400 && np.numPresses > 0 && !np.mouseDown) {

    if (timeNow - np.mouseDownTime > np.LONGPRESS) {
      np.textArray.push(np.presses[ln]);
    } else {
      if (np.presses[ln] !== np.BACKSPACE)
        np.textArray.push(np.latestLetter);
    }

    np.textOutput.textContent = np.textArray.join("") + "_";
    resetPresses();
    np.showLetter.textContent = "";
    checkScroll();
  }
}

function resetPresses() {
  np.numPresses = 0;
  np.presses.length = 0;
  np.presses.push(np.init); //dummy value
}

function checkScroll() {
  if (np.textArray.length > 20) {
    np.lineLength++;
    if (np.lineLength % 20 === 0) np.textOutput.scrollTop += 500;
  }
}

function addKeyPress(numpadKey, time) {
  np.textOutput.scrollTop += 500; //make sure we always scroll to bottom of textarea

  const numL = np.lettersByKey[numpadKey].length;
  let letter = np.lettersByKey[numpadKey][np.numPresses % numL];
  np.presses.push(numpadKey);
  np.numPresses++;
  const numP = np.presses.length;

  const dt = time - np.mouseDownTime;

  if (
    np.presses[np.numPresses] !== np.presses[np.numPresses - 1] &&
    np.presses[np.numPresses - 1] !== np.init
  ) {
    
    resetPresses();

    np.presses.push(numpadKey);

    np.textArray.push(np.latestLetter);
    np.textOutput.textContent = np.textArray.join("") + "_";
    letter = np.lettersByKey[numpadKey][np.numPresses % numL];
    np.numPresses = 1;

    checkScroll();
  }

  np.latestLetter = letter;
  np.timeLast = time;

  if (letter === "\u00A0") letter = "Space"; //remember it is nbsp type of space
  np.showLetter.textContent = letter;
}

function displayNumPad() {
  let np = {};  //global np - numpad object
  np.init = "666";
  np.mobileDebug = false;
  np.mobile = false;
  np.BACKSPACE = "#";
  np.LONGPRESS = 700;
  np.keyIdPrefix = "keyId";
  np.normalScreenMult = .4;
  np.screenMult = np.normalScreenMult;
  np.buttonMin = 180;
  np.buttonMax = 120;
  np.tables = makeKeyCounts();
  np.lettersByKey = np.tables[2];
  np.numPresses = 0;
  np.timeLast = Date.now();
  np.presses = [np.init];
  np.info = document.getElementById("info");
  np.showLetter = document.getElementById("showLetter");
  np.textOutput = document.getElementById("output");
  np.numpad = document.getElementById("numpad");
  np.buttons = [];
  np.textArray = [];
  np.lineLength = 0;

  np.mobile = false;
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    np.mobile = true;
    np.screenMult = 1.;  //unless landscape...
  }

  window.np = np; //make np available globally

  const numpadKeys = "123456789*0#";
  const numpad = document.getElementById("numpad");

  //generate vanilla html buttons dynamically here
  for (let i = 0; i < numpadKeys.length; i++) {
    var b = document.createElement("input");
    b.type = "button";
    b.id = np.keyIdPrefix + numpadKeys[i];
    let buttonText = numpadKeys[i];
    buttonText += "\n";
    if (np.lettersByKey[numpadKeys[i]]) {
      buttonText += np.lettersByKey[numpadKeys[i]].join("");
    } else {
      buttonText += " ";
    } //trick to get all buttons to match in size

    if (numpadKeys[i] === "0") buttonText = "0\n_"; //ugly
    if (numpadKeys[i] === "#") buttonText = "#\n<"; //uglier

    b.value = buttonText;

    if ( np.mobile ) {     
      b.addEventListener("touchstart", (e) => {
        mouseDown(e, numpadKeys[i]);
      });

      b.setAttribute("class", "buttonClass01Mobile");
    }
    else {
      b.addEventListener("mousedown", (e) => {
        mouseDown(e, numpadKeys[i]);
      });

      b.setAttribute("class", "buttonClass01");
    }
      
    numpad.appendChild(b);

  }

  //np.mobile = true;
  //np.mobileDebug = true;

  if ( np.mobile ) {
    window.addEventListener("touchend", (e) => {
      if (np.mouseDown && np.mouseDownTarget) mouseUp(np.mouseDownTarget);
      np.mouseDownTarget = null;
    });

    np.info.style.maxHeight = "240px";
    np.info.style.fontSize = "30px";
    np.info.style.width = screen.width + 'px';

    np.textOutput.style.fontSize = "80px";  //textarea resizes to fit the rows and cols based on fontSize
    np.buttonMin = 1e6;
    np.showLetter.style.fontSize = "100px";

    if (np.mobileDebug) {
      window.addEventListener("mouseup", (e) => {
        if (np.mouseDown && np.mouseDownTarget) mouseUp(np.mouseDownTarget);
        np.mouseDownTarget = null;
      });
    }

  }
  else {
    np.info.style.maxHeight = "120px";
    np.showLetter.style.fontSize = "60px";

    window.addEventListener("mouseup", (e) => {
      if (np.mouseDown && np.mouseDownTarget) mouseUp(np.mouseDownTarget);
      np.mouseDownTarget = null;
    });
  }

  //keep track of mousedown times so we can distinguish letters from numbers

  window.onresize = windowResize; //window resize listener

  windowResize(); //call at startup for consistency sake

  //we need to detect how long it has been since no keys have been pressed
  setInterval(checkPresses, 200);
}

function mouseDown(e, key) {  //really mouse or touch
  np.mouseDown = true;
  np.mouseDownTime = Date.now();
  np.mouseUpTime = Date.now();
  np.clickTime = 0;
  //console.log(e.target.id);  //e.target is the DOM object associated with the event
  addKeyPress(key, Date.now());

  np.delete = false;
  if (e.target.id === np.keyIdPrefix + np.BACKSPACE) {  //button ids are: keyId{#} to make them more unique
    np.delete = true;
    np.showLetter.textContent = "Delete";
  }

  e.target.style.backgroundColor = "#FF00FF";
  e.target.style.color = "#FFFFFF";
  e.target.style.borderRadius = "50%";

  np.mouseDownTarget = e; //we need to save it if we mouse up off the button 
  //we will need to check e.touches for the unique id associated since there can be multiple
  //touch points 

  //console.log(e);

}

function mouseUp(e) {   // really mouse or touch
  //mouse up may occur anywhere on the screen if user moves pointer away from button after pressing it
  np.mouseDown = false;
  np.mouseUpTime = Date.now();
  np.clickTime = np.mouseUpTime - np.mouseDownTime;
  //console.log(np.clickTime);

  if (np.delete && np.clickTime < np.LONGPRESS) {
    //checkPresses(np.BACKSPACE);
    np.textArray.pop();
    np.textOutput.textContent = np.textArray.join("") + "_";
    resetPresses();
    np.showLetter.textContent = "";
    checkScroll();
  }

  e.target.style.backgroundColor = "#FFFF00";
  e.target.style.color = "#000000";
  e.target.style.borderRadius = "40px";  //should be CSS global var

}

//need a function to strip 'px' from style property and return a number
function SN( str ) {
  //parseFloat ?
  return Number(str.replace('px',''));
}

function windowResize(e) {

  //using setAttribute('style',*) was really screwing things up

  //ned to detect when changing to and from landscape in mobile - font sizes need to change
  if (np.mobile && screen.width > screen.height || !np.mobile ) { np.screenMult = np.normalScreenMult; }
  else if (np.mobile) { np.screenMult = 1.;}

  let numpadDiv = np.numpad; 
  let outDiv = np.textOutput; 
  let showDiv = np.showLetter; 

  let dw = window.innerWidth * np.screenMult;
  const bw = Math.max(np.buttonMax,Math.min(np.buttonMin, Math.trunc(dw / 3.)));
  const bh = Math.trunc(bw * 0.7);
  dw = Math.trunc ( bw * 3. );

  const showWidth = dw/2;
  showDiv.style.width = showWidth + 'px';
  showDiv.style.left =  Math.trunc( (dw - showWidth)/2 ) + 'px';

  showDiv.style.top = SN(np.info.style.maxHeight) + 'px'; 

  numpad.style.top = SN(showDiv.style.top) + SN(showDiv.style.fontSize)*2 + 'px';
 
  numpad.style.width = dw + 'px';  //make sure to set it to 3x button size

  outDiv.style.left = dw + 20 + 'px';
  outDiv.style.width = dw + 'px';
  outDiv.style.top = numpad.style.top;  

  //console.log(2*dw, window.innerWidth);
  if (2 * dw > window.innerWidth) {
    outDiv.style.top = SN(numpad.style.top) + bh*4 + 20 + 'px'; 
    outDiv.style.left = '0px';	
  }


  let buttons = numpadDiv.children;
  //the only children of the div are the buttons so just loop through
  for (let i = 0; i < buttons.length; i++) {
    let button = buttons[i];
    button.style.width = bw + 'px';
    button.style.height = bh + 'px';
  }



}