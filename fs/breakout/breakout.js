"use strict"
function toCSS( rgba )  {
    //we may have rgb or rgba
    let prefix = '';
    if ( rgba.length === 3 ) prefix='rgb';
    else if (rgba.length === 4 ) prefix='rgba';
    else return 'rgba(0,0,0,1)';
  
    let cssColor = prefix + '(' ;
    for (const color of rgba) {
      cssColor += color + ',';
    } 
    cssColor = cssColor.slice(0,-1);
    cssColor += ')';
  
    return cssColor;
  }

function startGame() {

    console.log('starting');
    //center of paddle tracks mouse x coordinate

    window.GO = {} ; //main game object

    GO.audioInit = false;

    GO.mousePixelPos = [100,0];
    GO.messages = document.getElementById('messages');
    GO.mainScreen = document.getElementById('mainScreen');
    GO.mainScreen.div = document.getElementById('screen1'); //keep ref to div that contains table

    GO.colorEffects = document.getElementById('colorEffects');

    //GO.effectsScreen = document.getElementById('effects');
    //GO.effectsScreen.div = document.getElementById('screen2');

    GO.bricksTable = document.getElementById('bricks');
    GO.bricksTable.div = document.getElementById('screen3');

    GO.backgroundRGBA = [200,180,0,.3];
    GO.backgroundColor =  toCSS(GO.backgroundRGBA);  //make a function to do this

    GO.mainDim = {width:300, height:200}; //c64 display
    GO.mainGrid = new makeGrid(GO.mainScreen, GO.mainDim, { addEventListener:true, initColor:GO.backgroundColor });

    //GO.effectsDim = {width:1, height:100};  //let mainDim drive pixel height
    //GO.effectsGrid = new makeGrid(GO.effectsScreen, GO.effectsDim, 
    //    {initColor:'rgba(0,0,200,.4)', useMainPxSize:true, ColsRows:[1,100], pxMult:[300,2]});

    GO.bricksGrid = new makeGrid(GO.bricksTable, GO.effectsDim, 
        {initColor:[200,200,0,.8], useMainPxSize:true, ColsRows:[10,7], pxMult:[30,8], varyColors:brickColors } );

    GO.brickCount = GO.bricksGrid.count;

    //need to map bricks from bricksGrid to mainGrid coordinates
    //need to keep track of the real coordinate of the bottom row of the wall so
    //we can reduce the number of collision checks

    GO.paddle = new Paddle();
    GO.ball   = new Ball();

    //GO.level = {brickDim:[30,10],colorFunc:b1,numRows:5};
    //GO.bricks = new Bricks(GO.level);

    GO.allSprites = [];
    GO.allSprites.push(GO.paddle);
    GO.allSprites.push(GO.ball);

    GO.fps = 60;  //let's try 60 frames per second

    GO.initWindowSize = [window.innerWidth,window.innerHeight];
    GO.resized = false;
    GO.playing = false;

    window.addEventListener('resize', adjustStuff );

    //updateGame();

    //finally the game loop - probably should use requestAnimationFrame
    //setInterval( updateGame, 1000/GO.fps );

}

function play(button) {
    //console.dir(button);
    if (!GO.playing) {
        //make sure we don't do it multiple times
        GO.gameTimer = setInterval( updateGame, 1000/GO.fps );
        button.innerText = "PAUSE";
        GO.playing = true;
        //if this is the first time initialize audio context and oscillators
        if ( !GO.audioInit ) {
            console.log('starting audio');
            audioStart();
        }
    }
    else { 
        clearInterval(GO.gameTimer);
        GO.playing = false;
        button.innerText = "PLAY";   
        

    }
   
}

function audioStart() {
    GO.synth = {};

    const GS = GO.synth;
    window.GS = GS;

    //GS.freqTable = [ 110, 138.59, 164.81, 195.99, 246.94 , 293.66 ]
    GS.freqTable = [ 146.83, 220, 277.18, 329.63, 391.99, 493.88 ]
    GS.freqs = [230,660,440,700];
    GS.waveTypes = ['sine','sawtooth','square','triangle'];
    
    GS.ac = new AudioContext();
    GS.osc = [];
    GS.gainNode = [];
    GS.numOsc = 4;

    GS.gainNode.push( GS.ac.createGain());
    GS.gainNode.push( GS.ac.createGain());
    GS.gainNode[0].connect(GS.ac.destination);
    GS.gainNode[1].connect(GS.ac.destination);

    for (let i=0; i<GS.numOsc; i++) {
        GS.osc.push (GS.ac.createOscillator());
        const ii = Math.trunc(i/2); //
        GS.osc[i].connect(GS.gainNode[ii]);
        GS.osc[i].frequency.value = GS.freqs[i];
        GS.osc[i].type = GS.waveTypes[i];
    }

    GO.audioInit=true;

    for (let i=0; i<GS.numOsc; i++) {
        GS.osc[i].start();
    }

    //start off muted
    GS.gainNode[0].gain.value = 0;
    GS.gainNode[1].gain.value = 0;
    GS.toggle = 0;
}


function bounceSound(soundIndex) {

    //audio "double buffering" so we can let the previous
    //sound finish when we are bouncing very fast
    const ii = GS.toggle;

    for (let i=0; i<GS.numOsc; i++) {
        GS.osc[i].frequency.value = GS.freqTable[soundIndex] + i*50;
    }

    //gainNodes 0,1 control oscillators [0,1] and [2,3]
    //we flip which gain node every time
    GS.gainNode[ii].gain.value  = 1;
    GS.gainNode[ii].gain.setValueAtTime(0,GS.ac.currentTime+.1,.1) 
    
    GS.toggle ^= 1;
}


function adjustStuff() {

    const ratio = [window.innerWidth/GO.initWindowSize[0], window.innerHeight/GO.initWindowSize[1] ];
    //const ratio = [ GO.initWindowSize[0]/window.innerWidth, GO.initWindowSize[1]/window.innerHeight ];
    GO.mainGrid.PixelDimXY = ivecMul(GO.mainGrid.PixelDimXY,ratio,false); //false means don't truncate
    console.log('ratio of windows',ratio);
    //window.alert('we need to start over if you resize, sorry');
    GO.messages.style.visibility = 'visible';
    GO.messages.innerText = "Resizing Screws Everything Up, Need to Resart, Sorry\nRestarting in 5 seconds";
 

    if ( !GO.resized) {  //only do it once because dragging window calls this many times
        setTimeout( ()=>{location.reload()}, 5000 ) ;
    }

    GO.resized = true;

}

function updateGame() {
    //each moving sprite knows how to update its own position in its class
    for ( const currentSprite of GO.allSprites  ) {
        currentSprite.newPosition();
    }
}

function cssNum(ss) {
    //removes px or % and returns a pure number 
    return parseFloat(String(ss).replace(/px|%/g,'')) ;
}

function ivecAdd( a1, num) {  //integer vector (of 2) addition
    let vec2 = [...a1];  //make copy of incoming array
    if (Array.isArray(num)) { 
        vec2[0] += num[0];
        vec2[1] += num[1];
    }
    else {
        vec2[0] += num;
        vec2[1] += num;
    }
    return [ Math.trunc(vec2[0]), Math.trunc(vec2[1])  ];
}

function ivecMul( a1, num, trunc=true) {  //integer vector (of 2) multiplication
    let vec2 = [...a1];  //make copy of incoming array
    if (Array.isArray(num)) { 
        vec2[0] *= num[0];
        vec2[1] *= num[1];
    }
    else {
        vec2[0] *= num;
        vec2[1] *= num;
    }
    if (trunc) {
        return [ Math.trunc(vec2[0]), Math.trunc(vec2[1])  ];
    } else {
        return [ vec2[0], vec2[1] ];
    }
}

function ABSdistance(v1,v2) {
    return Math.abs(v1[0]-v2[0]) + Math.abs(v1[1]-v2[1]);
}

function distance( v1, v2 ) {
    //regular old euclidean distance
    let xx = v1[0] - v2[0];  xx*=xx;
    let yy = v1[1] - v2[1];  yy*=yy; 
    return Math.sqrt(xx + yy);
}

function length( v1 ) {
    return Math.sqrt(v1[0]*v1[0] + v1[1]*v1[1]);
}
 
function isBackgroundColor(c1) {
    //checking if the c1 array is same as backgroundRGBA
    let diff = 0;
    for (let i=0; i<4; i++) {
        diff += c1[i] - GO.backgroundRGBA[i];
    }
    return diff === 0 ? true : false;
}

class Sprite {
    //tired of constantly using .width and .height
    //just using an array that is always [x,y] - ok?
    PixelMap = [];     //an array of all pixels in object
    maxDim = [];       //maximum width and height
    centerXY = [];  
    posXY = [];

    updatePosition(newPosXY) {
        //update old position to background color
        //update new position to PixelMap

        let oldPixels = [];
        let newPixels = {};

        //for (let i=0; i<this.maxDim[0])

        for (let y=0; y<this.maxDim[1]; y++) {

            for (let x=0; x<this.maxDim[0]; x++) {

                const newPos = [ x+newPosXY[0], y+newPosXY[1] ];
                
                //create a compound key of the coordinate so we can lookup later
                newPixels[newPos.join()] = isBackgroundColor(this.PixelMap[y][x]);

                let Pixel = GO.mainGrid.tdByXY[newPos[1]][newPos[0]];
                let oldPixel = GO.mainGrid.tdByXY[y+this.posXY[1]][x+this.posXY[0]];
                oldPixels.push(oldPixel);
                //console.log(Pixel);
                const [RED,GREEN,BLUE,ALPHA]=this.PixelMap[y][x];

                //these are stepping on each other
                //we have no choice but to check if old and new pixels overlap
                //see below
                Pixel.style.backgroundColor = `rgba(${RED},${GREEN},${BLUE},${ALPHA})`;

                //Pixel.style.zIndex = '300';
            }
        }
        this.posXY = [...newPosXY];
        
        for ( const pixel of oldPixels) {
            //we need to check if our Sprite overlaps itself after being displaced
            //by game mechanics
            //this is complicated but the only way to get nice solid display
            //in the face of changing positions and colors
            const coord = pixel.mousePixelPos.join();  //compound coordinate key works nicely
            const oldAndNewOverlap = typeof newPixels[coord];
            const NewPxIsBgColor = oldAndNewOverlap != 'undefined' && newPixels[coord];
            //if newPixels[coord] is set to true it means this should be background color
            if  ( NewPxIsBgColor || oldAndNewOverlap === 'undefined') {
                //finally set the darn thing
                pixel.style.backgroundColor = GO.backgroundColor;
            }
    
        }
    }
}

function cssRGBA( styleText ) {
    const s1 = styleText.split('(');
    let rgba = [0,0,0,0];
    if ( !s1[0].match(/^rgb/g) ) return rgba;  //we may have rgb OR rgba
    rgba = s1[1].replace(')','').split(',');
    return rgba;
}

function RGBAcss( rgba ) {

}

class Ball extends Sprite {
    //we could vary colors by using more numbers 
    //and then mapping those numbers to rgba vectors
    bitmap = [ 0,0,1,1,1,0,0,
               0,1,2,2,2,1,0,
               1,2,2,3,2,2,1,
               1,2,3,3,3,2,1,
               1,2,2,3,2,2,1,
               0,1,2,2,2,1,0,
               0,0,1,1,1,0,0 ];

    colorMap = [ [200,250,200,.7],[255,100,200,.9], [255,200,255,1]  ];

    dim = [ 7, 7 ];
    initColor = [255,255,255,1];
    dv = [2,3];
    speed;

    constructor() {
        super();
        for (let y=0; y<this.dim[1]; y++) {
            let row = [];
            for (let x=0; x<this.dim[0]; x++) {
                let color;
                const ii = this.bitmap[y*this.dim[1]+x];
                if ( ii === 0) {
                    color = GO.backgroundRGBA;
                }
                else {
                    color = this.colorMap[ ii-1  ];
                }
                row.push( color );    
            }
            this.PixelMap.push(row);
        }

        this.maxDim = [...this.dim];
        this.centerXY = ivecMul(this.maxDim,.5);
        //trunc of 7*.5 = 3 which is the middle

        this.posXY = [ 150 ,80];
        this.speed = length(this.dv);
        this.updatePosition( [151+Math.trunc( (Math.random()-.5)*120 ),80] );
    }

    hitPaddle(pos) {
        if (  pos[1] + this.maxDim[1] >= GO.paddle.posXY[1] ) {
            if (pos[0] > GO.paddle.posXY[0] && pos[0] < GO.paddle.posXY[0]+GO.paddle.maxDim[0]) {
                //get distance from center
                return GO.paddle.posXY[0]+GO.paddle.centerXY[0] - (pos[0]+this.centerXY[0]) ;
            }
        }
        return -1e6;
    }

    hitWall(pos) {

        //if we changed screen size then we have to multiply PixelDimXY by the ratio of new to old
  
        let actualPos = ivecAdd(pos,this.centerXY);
        actualPos[1] += 2*this.centerXY[1];
        actualPos = ivecMul(actualPos,GO.mainGrid.PixelDimXY,false);
        //console.log(actualPos, pos, GO.mainGrid.PixelDimXY);
        const objects = document.elementsFromPoint(actualPos[0],actualPos[1]);

        for (let i=0; i<objects.length; i++) {
            if (objects[i].tagName === 'TD' && objects[i].offsetParent.id==='bricks') {
                //console.log(objects[i].id);
                const cmpStyle = getComputedStyle(objects[i]);
                const currentColor = cssRGBA(cmpStyle.backgroundColor);
                if (currentColor[3] == 0 ) return false;
                objects[i].style.backgroundColor = 'rgba(0,0,0,0)';
                return true;
                break;                
            }
        }

        return false;
    }

    newPosition() {

        let soundIndex = -1;

        const newPos = ivecAdd(this.posXY,this.dv,false);

        if ( newPos[1] + this.maxDim[1] >= GO.mainDim.height  || newPos[1] <= 0) {
            this.dv[1] = -this.dv[1];
            soundIndex = 0;
        }
        if ( newPos[0] + this.maxDim[0] >= GO.mainDim.width || newPos[0] <= 0 ) {
            this.dv[0] = -this.dv[0];
            soundIndex = 1;
        } 

        if (this.hitWall( newPos )) {  //wall meaning the wall of bricks
            this.dv[1] = -this.dv[1];
            GO.brickCount --;
            console.log('num bricks left',GO.brickCount);
            if (GO.brickCount === 0) {
                console.log('no more bricks');
                clearInterval(GO.gameTimer);
            }
            soundIndex = 2;
        }

        const paddleOffset = this.hitPaddle(newPos);

        if ( paddleOffset != -1e6 ) { 
            this.dv[1] = -this.dv[1]; 
            this.speed = length(this.dv); 
            this.dv[0] = this.dv[0] - Math.trunc(paddleOffset/5);  //make it scale non linearly from center
 
            //this.dv[0] = this.dv[0] - paddleOffset/5;
            const newSpeed = length(this.dv);

            // console.log(this.speed, newSpeed);

            //const ratio = newSpeed/this.speed;  //we want to preserve the length of dv (speed)
            //this.dv = ivecMul(this.dv,ratio);
            //this.speed = length(this.dv);  //may change slightly due to integer truncation

            const sgn = Math.sign(this.dv[0]);
            this.dv[0] = Math.min(Math.abs(this.dv[0]),10) * sgn;
            soundIndex = 3;

        }

        if ( newPos[1] > GO.paddle.posXY[1] ) {
            if (  GO.mainDim.height -  (newPos[1] + this.maxDim[1]) < 2  ) {
                console.log('should be dead');
                GO.colorEffects.style.backgroundColor = 'rgba(0,0,255,.5)';
                setTimeout( ()=>{ GO.colorEffects.style.backgroundColor='rgba(0,0,0,0)';},100);
                //increase speed of ball as penalty
                //this.speed *= 1.01;
                const currentSpeed = length(this.speed);
                if (this.speed < 15) {
                    this.dv = ivecMul(this.dv,[1.5,1.5 ]);
                    this.speed = length(this.dv);
                }
                soundIndex = 4;
            }
        }

        if ( newPos[1] < 1  ) {
            GO.colorEffects.style.backgroundColor = 'rgba(255,0,255,.5)';
            setTimeout( ()=>{ GO.colorEffects.style.backgroundColor='rgba(0,0,0,0)';},100);
            soundIndex = 5;
        }

        //pos.XY is still the left top corner like a div
        //still need to clamp it because we want to increase dv
        newPos[0] = Math.min(GO.mainDim.width-this.maxDim[0],Math.max(0, newPos[0]));
        newPos[1] = Math.min(GO.mainDim.height-this.maxDim[1],Math.max(0, newPos[1]));

        this.updatePosition( newPos );

        if (soundIndex > -1) bounceSound(soundIndex);

    }


}

class Paddle extends Sprite {

    pctDim = [.17,.03];
    dim = [];

    constructor() {

        super();  //all of the "rendering" gets done in the parent class
      
        //figure out dimensions of paddle as fraction of total Pixel Width of Screen
        //this.dim.width = Math.trunc(GO.mainDim.width*this.pctDim.width);
        //this.dim.height = Math.trunc(GO.mainDim.height*this.pctDim.height);

        this.dim = ivecMul( [GO.mainDim.width,GO.mainDim.height], this.pctDim);
        //console.log('paddle',this.dim);

        const rgba = [255,0,255,1];  //we can get fancier later
        for (let y=0; y<this.dim[1]; y++) {
            let row=[];
            for (let x=0; x<this.dim[0]; x++) {
                row.push(rgba);
            }
            this.PixelMap.push(row);
        }

        this.maxDim = [...this.dim]; 
        this.centerXY = ivecMul(this.maxDim,.5);

        //set initial position
        this.posXY = [100,184];
        this.updatePosition( [101,184] );  //make sure the updatePosition is not same so it renders the first

        //console.log(this.dim, this.centerXY);
    }

    newPosition() {
        //each object needs to update it's own position when updateGame is called

        //console.log(GO.mousePixelPos[0], this.posXY[1]);
        //in the case of the paddle keep the initial Y position
        //have to bound the position

        if (  GO.mousePixelPos[0] != this.posXY[0]  ) {

            GO.mousePixelPos + this.centerXY[0]
            let newX = GO.mousePixelPos[0]-this.centerXY[0];
            newX = Math.min( newX, GO.mainDim.width-this.maxDim[0] );
            newX = Math.max( newX, 0);
            this.updatePosition(  [newX, this.posXY[1]] );
        }
    }
}

function rgbaToCSS(rgba) {
    const [RED,GREEN,BLUE,ALPHA] = rgba;
    return `rgba(${RED},${GREEN},${BLUE},${ALPHA})`;
}

function brickColors(row,col,color,gridName) {
    color[0] = (color[0]+row*7)%255;
    color[1] = (color[1]+col*5)%255;
    color[2] = (color[2]+row*col)%255;
    let alpha = color[3];
    if (row < 3) { 
        alpha = 0;  //setting alpha to 0 makes it transparent, this is how we will remove bricks too
        gridName.count --;
    }
    return `rgba(${color[0]},${color[1]},${color[2]},${alpha})`
}

class makeGrid {

    dim;
    PixelDimXY = [];   //need to adjust this if window gets resized
    tdByXY = [];   //to reference each td by Pixel Coordinate (not normalized)
    parentTable;
    initRGBA;
    varyRGBA;
    count=0;

    constructor(table, dim, options={initColor:'rgba(100,100,100,.8)'}) {  
        //a "screen" for graphics display is a <table> with a lot of "pixels" <td> elements
    
        this.initRGBA = options.initColor;
        
        if (Array.isArray(options.initColor)) {    
            //we can send a numeric array of [r,g,b,a] or the string 'rgba(r,g,b,a)'   
            options.initColor = rgbaToCSS(options.initColor);
            this.varyRGBA = [...this.initRGBA];
        }
        this.parentTable = table;

        if (options.useMainPxSize) {
            
            //in this case we do not want to truncate because it is the raw pixel value
            //for the table td element
            this.PixelDimXY = ivecMul(GO.mainGrid.PixelDimXY,options.pxMult,false);  
            this.dim = {width:options.ColsRows[0],height:options.ColsRows[1]};
        }
        else {

            const divCSS = getComputedStyle(table.div);  //after applying ALL stylesheets
            const [divWidth,divHeight] = [ Math.trunc(cssNum(divCSS.width)), Math.trunc(cssNum(divCSS.height))];
    
            this.dim = dim;
            this.PixelDimXY = [ divWidth/dim.width, divHeight/dim.height ];
        }

        //console.log(this.dim);
        for (let row=0; row<this.dim.height; row++) {
            const tr = document.createElement('tr');
            let rowOfPixels = [];
            for (let col=0; col<this.dim.width; col++) { 
                const td = document.createElement('td');
                this.count ++;  //need a counter for bricks so we know when all have been hit
                if (options.varyColors) {
                    td.style.backgroundColor = options.varyColors(row,col,this.varyRGBA,this);
                }
                else {
                    td.style.backgroundColor = options.initColor;
                }
                [td.style.width,td.style.height] = [this.PixelDimXY[0]+'px',this.PixelDimXY[1]+'px'];
                td.id = [col,row]; //this gets converted to a string automatically
                td.mousePixelPos = [col,row];
                //this.count ++;
                tr.appendChild(td);
                rowOfPixels.push(td);  //I think we are saving a reference
            }
            this.tdByXY.push(rowOfPixels);
            table.appendChild(tr);
        }

        if ( options.addEventListener ) {
            //whenever we move the mouse over the main "table" which is our pseudo canvas
            //move the paddle left and right
            table.addEventListener('mousemove', function(event){
                //this takes care of paddle position whenever we decide to 
                //update the display for the paddle we can simple reference
                //mousePixelPos[0] which is the X coordinate of the actual td element
                //console.log(event.target.mousePixelPos);
                GO.mousePixelPos = [...event.target.mousePixelPos];
            } );
        }
    
    }

}