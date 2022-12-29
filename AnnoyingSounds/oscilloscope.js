
context = new (window.AudioContext || window.webkitAudioContext)();

// do we need this anymore???
window.requestAnimFrame = (function(){
return  window.requestAnimationFrame       || 
  window.webkitRequestAnimationFrame || 
  window.mozRequestAnimationFrame    || 
  window.oRequestAnimationFrame      || 
  window.msRequestAnimationFrame     || 
  function( callback ){
  window.setTimeout(callback, 1000 / 60);
};
})();

function OSC() {
  this.isPlaying = false;
  this.clamp = false;
  this.canvas = document.querySelector('canvas');

  window.addEventListener('resize',handleResize.bind(this))

  this.initialized = false

  handleResize.call(this)
}

function handleResize() {
  console.log('in resize')
  this.WIDTH = window.innerWidth;
  this.HEIGHT = window.innerHeight;
}

OSC.prototype.play = function() {

  console.log('at top of play')

  this.oscillator = context.createOscillator();
  this.oscillator2 = context.createOscillator();

  this.gainNode = context.createGain();

  this.oscillator2.frequency.value = 525;

  if ( window.previous ) {
    this.oscillator.frequency.value = previous.o1.freq; 
    this.oscillator.type = previous.o1.type;
    this.oscillator.detune.value = previous.o1.detune;

    this.oscillator2.frequency.value = previous.o2.freq;
    this.oscillator2.type = previous.o2.type;
    
    console.log('previous exists'); 
  }

  this.analyser = context.createAnalyser();
  this.analyser.fftSize = 8192;

  this.oscillator.connect(this.gainNode)
  this.oscillator2.connect(this.gainNode)

  this.gainNode.connect(this.analyser)

  this.gainNode.gain.value = .5   //reduce total level or else we get clipped sin waves, nasty looking
  this.analyser.connect(context.destination);

  if (!this.initialized) {
    this.adjust = 1;
    this.changeAdjust2(-94)
    this.changeDetune(66.97)
    this.clampp()
    this.initialized = true
  }

  this.oscillator.start(0)
  this.oscillator2.start(0)

  requestAnimFrame(this.visualize.bind(this));
};

OSC.prototype.stop = function() {
  this.oscillator.stop(0);
  this.oscillator2.stop(0);
};

OSC.prototype.clampp = function() {
  this.clamp = !this.clamp;
  console.log(this.clamp);
}

OSC.prototype.toggle = function() {

  (this.isPlaying ? this.stop() : this.play());
  this.isPlaying = !this.isPlaying;

  if (!this.isPlaying ) {
    console.log('in toggle',this.oscillator.frequency.value);
    let previous = {};
    previous.o1 = {};
    previous.o1.freq = this.oscillator.frequency.value;
    previous.o1.type = this.oscillator.type;
    previous.o1.detune = this.oscillator.detune.value;

    previous.o2 = {};
    previous.o2.freq = this.oscillator2.frequency.value;
    previous.o2.type = this.oscillator2.type;
    previous.o2.detune = this.oscillator2.detune.value;

    window.previous = previous;
  }

};

OSC.prototype.changeFrequency = function(val) {
  this.oscillator.frequency.value = val;
  this.oscillator2.frequency.value = val;
};

OSC.prototype.changeDetune = function(val) {
  const sgn = Math.sign(val);

  let detune = Math.abs(val)/100;
  detune = Math.exp(detune * Math.log(this.oscillator.frequency.value) );
  detune = detune * detune ;
  detune = Math.min(20000, detune);
  this.oscillator.detune.value = sgn * detune ;
  this.oscillator2.detune.value = 0; //sgn * detune;

  //console.log(detune);
};

OSC.prototype.changeAdjust = function(val) {
  this.adjust = (val<0) ? (1 + val/220) : (1 + val/50);
}


OSC.prototype.changeAdjust2 = function(val) {
  this.adjust2 = Number(val)+200;
  this.adjust2 /= 4;
}


OSC.prototype.changeType = function(type) {
  this.oscillator.type = type;
};

OSC.prototype.changeType2 = function(type) {
  this.oscillator2.type = type;
};

OSC.prototype.visualize = function() {

  this.canvas.width = this.WIDTH;
  this.canvas.height = this.HEIGHT;

  const canvasCtx = this.canvas.getContext('2d');
  const WIDTH = this.WIDTH;
  const HEIGHT = this.HEIGHT;

  const analyser = this.analyser;

  const bufferLength = analyser.frequencyBinCount;

  let dataArray;

  if (this.isPlaying) {
    dataArray = new Uint8Array(bufferLength) 
    analyser.getByteTimeDomainData(dataArray);

  } else {
    dataArray = window.data;
  }

  canvasCtx.fillStyle = "rgb(255, 255, 255)";
  canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

  canvasCtx.lineWidth = 4;
  canvasCtx.strokeStyle = "rgb(255, 100, 0, .5)";

  canvasCtx.beginPath();

  const sliceWidth = (WIDTH * 1.0) / bufferLength * 4 * this.adjust;
  let xx = 0;
  let start = 0;
  let found = false;

  if ( ( dataArray[10] + dataArray[20] ) !== 256 )  //default value when no sound is 128
    window.data = [...dataArray];

  if (this.clamp) {
    for (let i = 0; i < 500; i++) {
      if (
        dataArray[i + 20] > dataArray[i] &&
        Math.abs((dataArray[i + 10] + dataArray[i]) / 2 - 127) < 20
      ) {
        start = i;
        found = true;
      }
    }
  } 

  const adj = Math.trunc(this.adjust2);

  for (let i = start; i < bufferLength-adj; i+=1) {

    const x = dataArray[i] / 128;
    const x2 = dataArray[i+1] / 128;

    const y = dataArray[i+adj] / 128;
    const y2 = dataArray[i+adj+1] / 128

    canvasCtx.lineTo(xx, .5*this.HEIGHT*(1-.5*x) );

    xx += sliceWidth;

    const width = 10;
    const ar = this.WIDTH/this.HEIGHT
    let cc = Math.cos(i/10)*10;  cc*=cc;
    canvasCtx.fillStyle = `rgba(${cc%255},${cc*cc%255},${cc%255},.3)`
    canvasCtx.fillRect( x*this.WIDTH/4/ar+100,y*this.HEIGHT/4, width, width) 
     
    //go back to zero after some multiples of wavelength that fit on screen

  }

  canvasCtx.stroke();
 
  if (!this.isPlaying ) {
    return;
  }

  requestAnimFrame(this.visualize.bind(this));


}