(()=>{"use strict";let n=Float32Array;function t(t,o,e){e=e||new n(16);var r=o[0],i=o[1],a=o[2],c=o[3],u=o[4],s=o[5],l=o[6],f=o[7],d=o[8],h=o[9],m=o[10],p=o[11],v=o[12],M=o[13],E=o[14],g=o[15],w=t[0],x=t[1],_=t[2],b=t[3],y=t[4],A=t[5],C=t[6],I=t[7],T=t[8],L=t[9],R=t[10],P=t[11],O=t[12],S=t[13],U=t[14],F=t[15];return e[0]=r*w+i*y+a*T+c*O,e[1]=r*x+i*A+a*L+c*S,e[2]=r*_+i*C+a*R+c*U,e[3]=r*b+i*I+a*P+c*F,e[4]=u*w+s*y+l*T+f*O,e[5]=u*x+s*A+l*L+f*S,e[6]=u*_+s*C+l*R+f*U,e[7]=u*b+s*I+l*P+f*F,e[8]=d*w+h*y+m*T+p*O,e[9]=d*x+h*A+m*L+p*S,e[10]=d*_+h*C+m*R+p*U,e[11]=d*b+h*I+m*P+p*F,e[12]=v*w+M*y+E*T+g*O,e[13]=v*x+M*A+E*L+g*S,e[14]=v*_+M*C+E*R+g*U,e[15]=v*b+M*I+E*P+g*F,e}function o(t,o,e){return(e=e||new n(3))[0]=t[0]*o,e[1]=t[1]*o,e[2]=t[2]*o,e}function e(t,o){o=o||new n(3);var e=Math.sqrt(t[0]*t[0]+t[1]*t[1]+t[2]*t[2]);return e>1e-5&&(o[0]=t[0]/e,o[1]=t[1]/e,o[2]=t[2]/e),o}function r(t){return(t=t||new n(16))[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}function i(t,o,e,r){return(r=r||new n(16))[0]=1,r[1]=0,r[2]=0,r[3]=0,r[4]=0,r[5]=1,r[6]=0,r[7]=0,r[8]=0,r[9]=0,r[10]=1,r[11]=0,r[12]=t,r[13]=o,r[14]=e,r[15]=1,r}function a(t,o){o=o||new n(16);var e=Math.cos(t),r=Math.sin(t);return o[0]=1,o[1]=0,o[2]=0,o[3]=0,o[4]=0,o[5]=e,o[6]=r,o[7]=0,o[8]=0,o[9]=-r,o[10]=e,o[11]=0,o[12]=0,o[13]=0,o[14]=0,o[15]=1,o}function c(t,o){o=o||new n(16);var e=Math.cos(t),r=Math.sin(t);return o[0]=e,o[1]=0,o[2]=-r,o[3]=0,o[4]=0,o[5]=1,o[6]=0,o[7]=0,o[8]=r,o[9]=0,o[10]=e,o[11]=0,o[12]=0,o[13]=0,o[14]=0,o[15]=1,o}function u(t,o){o=o||new n(16);var e=Math.cos(t),r=Math.sin(t);return o[0]=e,o[1]=r,o[2]=0,o[3]=0,o[4]=-r,o[5]=e,o[6]=0,o[7]=0,o[8]=0,o[9]=0,o[10]=1,o[11]=0,o[12]=0,o[13]=0,o[14]=0,o[15]=1,o}function s(t,o,e){e=e||new n(16);var r=t[0],i=t[1],a=t[2],c=Math.sqrt(r*r+i*i+a*a),u=(r/=c)*r,s=(i/=c)*i,l=(a/=c)*a,f=Math.cos(o),d=Math.sin(o),h=1-f;return e[0]=u+(1-u)*f,e[1]=r*i*h+a*d,e[2]=r*a*h-i*d,e[3]=0,e[4]=r*i*h-a*d,e[5]=s+(1-s)*f,e[6]=i*a*h+r*d,e[7]=0,e[8]=r*a*h+i*d,e[9]=i*a*h-r*d,e[10]=l+(1-l)*f,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e}function l(t,o,e,r){return(r=r||new n(16))[0]=t,r[1]=0,r[2]=0,r[3]=0,r[4]=0,r[5]=o,r[6]=0,r[7]=0,r[8]=0,r[9]=0,r[10]=e,r[11]=0,r[12]=0,r[13]=0,r[14]=0,r[15]=1,r}function f(t,o){o=o||new n(16);var e=t[0],r=t[1],i=t[2],a=t[3],c=t[4],u=t[5],s=t[6],l=t[7],f=t[8],d=t[9],h=t[10],m=t[11],p=t[12],v=t[13],M=t[14],E=t[15],g=h*E,w=M*m,x=s*E,_=M*l,b=s*m,y=h*l,A=i*E,C=M*a,I=i*m,T=h*a,L=i*l,R=s*a,P=f*v,O=p*d,S=c*v,U=p*u,F=c*d,B=f*u,N=e*v,D=p*r,V=e*d,k=f*r,z=e*u,Y=c*r,H=g*u+_*d+b*v-(w*u+x*d+y*v),X=w*r+A*d+T*v-(g*r+C*d+I*v),j=x*r+C*u+L*v-(_*r+A*u+R*v),W=y*r+I*u+R*d-(b*r+T*u+L*d),$=1/(e*H+c*X+f*j+p*W);return o[0]=$*H,o[1]=$*X,o[2]=$*j,o[3]=$*W,o[4]=$*(w*c+x*f+y*p-(g*c+_*f+b*p)),o[5]=$*(g*e+C*f+I*p-(w*e+A*f+T*p)),o[6]=$*(_*e+A*c+R*p-(x*e+C*c+L*p)),o[7]=$*(b*e+T*c+L*f-(y*e+I*c+R*f)),o[8]=$*(P*l+U*m+F*E-(O*l+S*m+B*E)),o[9]=$*(O*a+N*m+k*E-(P*a+D*m+V*E)),o[10]=$*(S*a+D*l+z*E-(U*a+N*l+Y*E)),o[11]=$*(B*a+V*l+Y*m-(F*a+k*l+z*m)),o[12]=$*(S*h+B*M+O*s-(F*M+P*s+U*h)),o[13]=$*(V*M+P*i+D*h-(N*h+k*M+O*i)),o[14]=$*(N*s+Y*M+U*i-(z*M+S*i+D*s)),o[15]=$*(z*h+F*i+k*s-(V*s+Y*h+B*i)),o}function d(t,o,e){e=e||new n(3);var r=o[0],i=o[1],a=o[2],c=r*t[3]+i*t[7]+a*t[11]+t[15];return e[0]=(r*t[0]+i*t[4]+a*t[8]+t[12])/c,e[1]=(r*t[1]+i*t[5]+a*t[9]+t[13])/c,e[2]=(r*t[2]+i*t[6]+a*t[10]+t[14])/c,e}function h(t,o,e){e=e||new n(3);var r=o[0],i=o[1],a=o[2];return e[0]=r*t[0]+i*t[4]+a*t[8],e[1]=r*t[1]+i*t[5]+a*t[9],e[2]=r*t[2]+i*t[6]+a*t[10],e}const m=window;function p(n){m.console&&(m.console.error?m.console.error(n):m.console.log&&m.console.log(n))}function v(n,t,o,e){const r=e||p,i=n.createShader(o);return n.shaderSource(i,t),n.compileShader(i),n.getShaderParameter(i,n.COMPILE_STATUS)?i:(r("*** Error compiling shader '"+i+"':"+n.getShaderInfoLog(i)+"\n"+t.split("\n").map(((n,t)=>`${t+1}: ${n}`)).join("\n")),n.deleteShader(i),null)}const M=["VERTEX_SHADER","FRAGMENT_SHADER"];function E(n,t){return t===n.SAMPLER_2D?n.TEXTURE_2D:t===n.SAMPLER_CUBE?n.TEXTURE_CUBE_MAP:void 0}function g(n,t,o){(function(n,t){n=n.attribSetters||n,Object.keys(t).forEach((function(o){const e=n[o];e&&e(t[o])}))})(t,o.attribs),o.indices&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,o.indices)}function w(n,t,o){return function(n,t){let o=0;return n.push=function(){for(let t=0;t<arguments.length;++t){const e=arguments[t];if(e instanceof Array||e.buffer&&e.buffer instanceof ArrayBuffer)for(let t=0;t<e.length;++t)n[o++]=e[t];else n[o++]=e}},n.reset=function(n){o=n||0},n.numComponents=t,Object.defineProperty(n,"numElements",{get:function(){return this.length/this.numComponents|0}}),n}(new(o||Float32Array)(n*t),n)}function x(n,t,o,e){o=o||n.ARRAY_BUFFER;const r=n.createBuffer();return n.bindBuffer(o,r),n.bufferData(o,t,e||n.STATIC_DRAW),r}function _(n){return"indices"!==n}function b(n,t){if(t instanceof Int8Array)return n.BYTE;if(t instanceof Uint8Array)return n.UNSIGNED_BYTE;if(t instanceof Int16Array)return n.SHORT;if(t instanceof Uint16Array)return n.UNSIGNED_SHORT;if(t instanceof Int32Array)return n.INT;if(t instanceof Uint32Array)return n.UNSIGNED_INT;if(t instanceof Float32Array)return n.FLOAT;throw"unsupported typed array type"}function y(n){return n.buffer&&n.buffer instanceof ArrayBuffer}function A(n,t){if(y(n))return n;if(n.data&&y(n.data))return n.data;Array.isArray(n)&&(n={data:n}),n.numComponents||(n.numComponents=R(t,n.length));let o=n.type;o||"indices"===t&&(o=Uint16Array);const e=w(n.numComponents,n.data.length/n.numComponents|0,o);return e.push(n.data),e}function C(n,t,o){const e=o||function(n){const t={};return Object.keys(n).filter(_).forEach((function(n){t["a_"+n]=n})),t}(t),r={};return Object.keys(e).forEach((function(o){const i=e[o],a=t[i];if(a.value)r[o]={value:a.value};else{const t=A(a,i);r[o]={buffer:x(n,t),numComponents:a.numComponents||t.numComponents||R(i),type:b(n,t),normalize:(c=t,c instanceof Int8Array||c instanceof Uint8Array)}}var c})),r}function I(n){return n.length?n:n.data}const T=/coord|texture/i,L=/color|colour/i;function R(n,t){let o;if(o=T.test(n)?2:L.test(n)?4:3,t%o>0)throw new Error(`Can not guess numComponents for attribute '${n}'. Tried ${o} but ${t} values is not evenly divisible by ${o}. You should specify it.`);return o}const P=["position","positions","a_position"];function O(n,t,o){const e={attribs:C(n,t,o)};let r=t.indices;return r?(r=A(r,"indices"),e.indices=x(n,r,n.ELEMENT_ARRAY_BUFFER),e.numElements=r.length):e.numElements=function(n){let t;for(const o of P)if(o in n){t=o;break}t=t||Object.keys(n)[0];const o=n[t],e=I(o).length,r=function(n,t){return n.numComponents||n.size||R(t,I(n).length)}(o,t),i=e/r;if(e%r>0)throw new Error(`numComponents ${r} not correct for length ${e}`);return i}(t),e}var S;function U(n,t,o,e,r){n.addEventListener("mousedown",(function(t){if(!h){h=!0,document.addEventListener("mousemove",p,!1),document.addEventListener("mouseup",v,!1);var o=n.getBoundingClientRect();a=t.clientX-o.left,c=t.clientY-o.top}}),!1),n.addEventListener("touchstart",(function(t){if(1==t.touches.length){t.preventDefault();var o=n.getBoundingClientRect();a=t.touches[0].clientX-o.left,c=t.touches[0].clientY-o.top,n.addEventListener("touchmove",M,!1),n.addEventListener("touchend",E,!1),n.addEventListener("touchcancel",g,!1),m=!0}else g()}),!1),n.addEventListener("mousewheel",(function(n){const t=n.deltaY<0?-1:1;o*=1+t/30}),!1);var i,a,c,u=void 0===r?0:r,s=void 0===e?0:e,l=85,f=90/n.height,d=180/n.width;this.getXLimit=function(){return l},this.setXLimit=function(n){l=Math.min(85,Math.max(0,n))},this.getRotationCenter=function(){return void 0===i?[0,0,0]:i},this.setRotationCenter=function(n){i=n},this.setAngles=function(n,o){u=Math.max(-l,Math.min(l,o)),s=n,t&&t()},this.getAngles=function(){return[u,s]},this.setViewDistance=function(n){o=n},this.getViewDistance=function(){return void 0===o?0:o},this.getViewMatrix=function(){var n=Math.cos(u/180*Math.PI),t=Math.sin(u/180*Math.PI),e=Math.cos(s/180*Math.PI),r=Math.sin(s/180*Math.PI),a=[e,t*r,-n*r,0,0,n,t,0,r,-t*e,n*e,0,0,0,0,1];if(void 0!==i){var c=i[0]-a[0]*i[0]-a[4]*i[1]-a[8]*i[2],l=i[1]-a[1]*i[0]-a[5]*i[1]-a[9]*i[2],f=i[2]-a[2]*i[0]-a[6]*i[1]-a[10]*i[2];a[12]=c,a[13]=l,a[14]=f}return void 0!==o&&(a[14]-=o),a};var h=!1,m=!1;function p(o){if(h){var e=n.getBoundingClientRect(),r=o.clientX-e.left,i=o.clientY-e.top,m=u+f*(i-c),p=s+d*(r-a);m=Math.max(-l,Math.min(l,m)),a=r,c=i,m==u&&p==s||(u=m,s=p,t&&t())}}function v(n){h&&(h=!1,document.removeEventListener("mousemove",p,!1),document.removeEventListener("mouseup",v,!1))}function M(o){if(1==o.touches.length&&m){o.preventDefault();var e=n.getBoundingClientRect(),r=o.touches[0].clientX-e.left,i=o.touches[0].clientY-e.top,h=u+f*(i-c),p=s+d*(r-a);h=Math.max(-l,Math.min(l,h)),a=r,c=i,h==u&&p==s||(u=h,s=p,t&&t())}else g()}function E(n){g()}function g(){m&&(m=!1,n.removeEventListener("touchmove",M,!1),n.removeEventListener("touchend",E,!1),n.removeEventListener("touchcancel",g,!1))}}!document.documentMode&&window.StyleMedia&&(HTMLCanvasElement.prototype.getContext=(S=HTMLCanvasElement.prototype.getContext,function(){let n=arguments;return"webgl"===n[0]&&(n=[].slice.call(arguments),n[0]="experimental-webgl"),S.apply(this,n)}));const F=Node=function(n,t=0){this.name=n,this.children=[],this.parents=[],this.localMatrix=r(),this.worldMatrix=r(),this.parentCount=0,this.type=t};function B(n){return"indices"!==n}function N(n,t,o){const e=n.length,r=new Float32Array(3);for(let i=0;i<e;i+=3)o(t,[n[i],n[i+1],n[i+2]],r),n[i]=r[0],n[i+1]=r[1],n[i+2]=r[2]}function D(n,t,o){o=o||new Float32Array(3);const e=t[0],r=t[1],i=t[2];return o[0]=e*n[0]+r*n[1]+i*n[2],o[1]=e*n[4]+r*n[5]+i*n[6],o[2]=e*n[8]+r*n[9]+i*n[10],o}function V(n){return function(t){return function(n,t){const o={};return Object.keys(t).forEach((function(e){const r="indices"===e?n.ELEMENT_ARRAY_BUFFER:n.ARRAY_BUFFER,i=A(t[e],name);o[e]=x(n,i,r)})),t.indices?o.numElements=t.indices.length:t.position&&(o.numElements=t.position.length/3),o}(t,n.apply(this,Array.prototype.slice.call(arguments,1)))}}function k(n){return function(t){return O(t,n.apply(null,Array.prototype.slice.call(arguments,1)))}}function z(n,t,o,e,i){n=n||1,t=t||1,o=o||1,e=e||1,i=i||r();const a=(o+1)*(e+1),c=w(3,a),u=w(3,a),s=w(2,a);for(let r=0;r<=e;r++)for(let i=0;i<=o;i++){const a=i/o,l=r/e;c.push(n*a-.5*n,0,t*l-.5*t),u.push(0,1,0),s.push(a,l)}const l=o+1,m=w(3,o*e*2,Uint16Array);for(let n=0;n<e;n++)for(let t=0;t<o;t++)m.push((n+0)*l+t,(n+1)*l+t,(n+0)*l+t+1),m.push((n+1)*l+t,(n+1)*l+t+1,(n+0)*l+t+1);return function(n,t){return Object.keys(n).forEach((function(o){const e=n[o];o.indexOf("pos")>=0?function(n,t){N(n,t,d)}(e,t):o.indexOf("tan")>=0||o.indexOf("binorm")>=0?function(n,t){N(n,t,h)}(e,t):o.indexOf("norm")>=0&&function(n,t){N(n,f(t),D)}(e,t)})),n}({position:c,normal:u,texcoord:s,indices:m},i)}function Y(n,t,o){return n=n||2,{position:{numComponents:2,data:[(t=t||0)+-1*(n*=.5),(o=o||0)+-1*n,t+1*n,o+-1*n,t+-1*n,o+1*n,t+1*n,o+1*n]},normal:[0,0,1,0,0,1,0,0,1,0,0,1],texcoord:[0,0,1,0,0,1,1,1],indices:[0,1,2,2,1,3]}}function H(n,t,o,e,r,i,a){if(t<=0||o<=0)throw Error("subdivisionAxis and subdivisionHeight must be > 0");e=e||0,i=i||0;const c=(r=r||Math.PI)-e,u=(a=a||2*Math.PI)-i,s=(t+1)*(o+1),l=w(3,s),f=w(3,s),d=w(2,s);for(let r=0;r<=o;r++)for(let a=0;a<=t;a++){const s=a/t,h=r/o,m=u*s+i,p=c*h+e,v=Math.sin(m),M=Math.cos(m),E=Math.sin(p),g=M*E,w=Math.cos(p),x=v*E;l.push(n*g,n*w,n*x),f.push(g,w,x),d.push(1-s,h)}const h=t+1,m=w(3,t*o*2,Uint16Array);for(let n=0;n<t;n++)for(let t=0;t<o;t++)m.push((t+0)*h+n,(t+0)*h+n+1,(t+1)*h+n),m.push((t+1)*h+n,(t+0)*h+n+1,(t+1)*h+n+1);return{position:l,normal:f,texcoord:d,indices:m}}Node.prototype.addChild=function(n){this.children.push(n)},Node.prototype.copy=function(n){const t=new Node(n.name+"-copy");return t.localMatrix=n.localMatrix,t.worldMatrix=n.worldMatrix,n.drawInfo&&(t.drawInfo={},t.drawInfo.bufferInfo=this.drawInfo.bufferInfo,t.drawInfo.programInfo=this.drawInfo.programInfo,t.drawInfo.uniforms=n.drawInfo.uniforms),t},Node.prototype.updateWorldMatrix=function(o){var e,r;0===this.type&&(o?t(o,this.localMatrix,this.worldMatrix):(e=this.localMatrix,(r=(r=this.worldMatrix)||new n(16))[0]=e[0],r[1]=e[1],r[2]=e[2],r[3]=e[3],r[4]=e[4],r[5]=e[5],r[6]=e[6],r[7]=e[7],r[8]=e[8],r[9]=e[9],r[10]=e[10],r[11]=e[11],r[12]=e[12],r[13]=e[13],r[14]=e[14],r[15]=e[15]));var i=this.worldMatrix;this.children.forEach((function(n){n.updateWorldMatrix(i)}))};const X=[[3,7,5,1],[6,2,0,4],[6,7,3,2],[0,1,5,4],[7,6,4,5],[2,3,1,0]];function j(n){const t=n/2,o=[[-t,-t,-t],[+t,-t,-t],[-t,+t,-t],[+t,+t,-t],[-t,-t,+t],[+t,-t,+t],[-t,+t,+t],[+t,+t,+t]],e=[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]],r=[[1,0],[0,0],[0,1],[1,1]],i=w(3,24),a=w(3,24),c=w(2,24),u=w(3,12,Uint16Array);for(let n=0;n<6;++n){const t=X[n];for(let u=0;u<4;++u){const s=o[t[u]],l=e[n],f=r[u];i.push(s),a.push(l),c.push(f)}const s=4*n;u.push(s+0,s+1,s+2),u.push(s+0,s+2,s+3)}return{position:i,normal:a,texcoord:c,indices:u}}function W(n,t,o,e,r,i,a){if(e<3)throw Error("radialSubdivisions must be 3 or greater");if(r<1)throw Error("verticalSubdivisions must be 1 or greater");const c=void 0===i||i,u=void 0===a||a,s=(c?2:0)+(u?2:0),l=(e+1)*(r+1+s),f=w(3,l),d=w(3,l),h=w(2,l),m=w(3,e*(r+s)*2,Uint16Array),p=e+1,v=Math.atan2(n-t,o),M=Math.cos(v),E=Math.sin(v),g=r+(u?2:0);for(let i=c?-2:0;i<=g;++i){let a,c=i/r,u=o*c;i<0?(u=0,c=1,a=n):i>r?(u=o,c=1,a=t):a=n+i/r*(t-n),-2!==i&&i!==r+2||(a=0,c=0),u-=o/2;for(let n=0;n<p;++n){const t=Math.sin(n*Math.PI*2/e),o=Math.cos(n*Math.PI*2/e);f.push(t*a,u,o*a),d.push(i<0||i>r?0:t*M,i<0?-1:i>r?1:E,i<0||i>r?0:o*M),h.push(n/e,1-c)}}for(let n=0;n<r+s;++n)for(let t=0;t<e;++t)m.push(p*(n+0)+0+t,p*(n+0)+1+t,p*(n+1)+1+t),m.push(p*(n+0)+0+t,p*(n+1)+1+t,p*(n+1)+0+t);return{position:f,normal:d,texcoord:h,indices:m}}function $(n,t){t=t||[];const o=[];for(let e=0;e<n.length;e+=4){const r=n[e],i=n.slice(e+1,e+4);i.push.apply(i,t);for(let n=0;n<r;++n)o.push.apply(o,i)}return o}function G(){const n=[0,0,0,0,150,0,30,0,0,0,150,0,30,150,0,30,0,0,30,0,0,30,30,0,100,0,0,30,30,0,100,30,0,100,0,0,30,60,0,30,90,0,67,60,0,30,90,0,67,90,0,67,60,0,0,0,30,30,0,30,0,150,30,0,150,30,30,0,30,30,150,30,30,0,30,100,0,30,30,30,30,30,30,30,100,0,30,100,30,30,30,60,30,67,60,30,30,90,30,30,90,30,67,60,30,67,90,30,0,0,0,100,0,0,100,0,30,0,0,0,100,0,30,0,0,30,100,0,0,100,30,0,100,30,30,100,0,0,100,30,30,100,0,30,30,30,0,30,30,30,100,30,30,30,30,0,100,30,30,100,30,0,30,30,0,30,60,30,30,30,30,30,30,0,30,60,0,30,60,30,30,60,0,67,60,30,30,60,30,30,60,0,67,60,0,67,60,30,67,60,0,67,90,30,67,60,30,67,60,0,67,90,0,67,90,30,30,90,0,30,90,30,67,90,30,30,90,0,67,90,30,67,90,0,30,90,0,30,150,30,30,90,30,30,90,0,30,150,0,30,150,30,0,150,0,0,150,30,30,150,30,0,150,0,30,150,30,30,150,0,0,0,0,0,0,30,0,150,30,0,0,0,0,150,30,0,150,0],t=$([18,0,0,1,18,0,0,-1,6,0,1,0,6,1,0,0,6,0,-1,0,6,1,0,0,6,0,1,0,6,1,0,0,6,0,-1,0,6,1,0,0,6,0,-1,0,6,-1,0,0]),o=$([18,200,70,120,18,80,70,200,6,70,200,210,6,200,200,70,6,210,100,70,6,210,160,70,6,70,180,210,6,100,70,210,6,76,210,100,6,140,210,80,6,90,130,110,6,160,160,220],[255]),e=n.length/3,r={position:w(3,e),texcoord:w(2,e),normal:w(3,e),color:w(4,e,Uint8Array),indices:w(3,e/3,Uint16Array)};r.position.push(n),r.texcoord.push([.22,.19,.22,.79,.34,.19,.22,.79,.34,.79,.34,.19,.34,.19,.34,.31,.62,.19,.34,.31,.62,.31,.62,.19,.34,.43,.34,.55,.49,.43,.34,.55,.49,.55,.49,.43,0,0,1,0,0,1,0,1,1,0,1,1,0,0,1,0,0,1,0,1,1,0,1,1,0,0,1,0,0,1,0,1,1,0,1,1,0,0,1,0,1,1,0,0,1,1,0,1,0,0,1,0,1,1,0,0,1,1,0,1,0,0,0,1,1,1,0,0,1,1,1,0,0,0,1,1,0,1,0,0,1,0,1,1,0,0,1,1,0,1,0,0,1,0,1,1,0,0,1,1,0,1,0,0,1,0,1,1,0,0,0,1,1,1,0,0,1,1,1,0,0,0,1,1,0,1,0,0,1,0,1,1,0,0,0,1,1,1,0,0,1,1,1,0,0,0,0,1,1,1,0,0,1,1,1,0]),r.normal.push(t),r.color.push(o);for(let n=0;n<e;++n)r.indices.push(n);return r}function q(n){return function(t,...o){let e=n(...o);return e=function(n){const t=n.indices,o={},e=t.length;return Object.keys(n).filter(B).forEach((function(r){const i=n[r],a=i.numComponents,c=w(a,e,i.constructor);for(let n=0;n<e;++n){const o=t[n]*a;for(let n=0;n<a;++n)c.push(i[o+n])}o[r]=c})),o}(e),e=function(n,t){t=t||{};const o=n.position.numElements,e=w(4,o,Uint8Array),r=t.rand||function(n,t){return t<3?256*Math.random()|0:255};if(n.color=e,n.indices)for(let n=0;n<o;++n)e.push(r(n,0),r(n,1),r(n,2),r(n,3));else{const n=t.vertsPerColor||3,i=o/n;for(let t=0;t<i;++t){const o=[r(t,0),r(t,1),r(t,2),r(t,3)];for(let t=0;t<n;++t)e.push(o)}}return n}(e,{vertsPerColor:6,rand:function(n,t){return t<3?60*Math.random():255}}),O(t,e)}}k(G),V(G),q(G),k(j),V(j);const K=q(j),J=(k(z),V(z),q(z),k(Y),V(Y),q(Y),k(H),V(H),q(H)),Q=(k(W),V(W),q(W),document.querySelector("#canvas")),Z=Q.getContext("webgl2",{antialias:!0,alpha:!1});let nn=0;const tn=[],on=[];on.push("#version 300 es\nin vec4 a_position;\nin vec4 a_color;\nin vec3 a_normal;\nout vec3 v_normal;\nout vec3 v_eyeCoords;\nout vec3 v_pos;\n\nout vec4 v_color;\nuniform mat4 u_P, u_VW; //projection, view-world\n\nvoid main() {\n  // Multiply the position by the matrix.\n\n  vec4  eyeCoords = u_VW * a_position;\n\n  gl_Position = u_P * eyeCoords;\n\n  // Pass the color to the fragment shader.\n  v_color = a_color;\n  v_normal = normalize(a_normal); //in case it is not??\n  v_eyeCoords = eyeCoords.xyz;// / eyeCoords.w;\n  v_pos = a_position.xyz;\n\n}\n"),on.push("#version 300 es\nprecision mediump float;\n    \n// Passed in from the vertex shader.\nin vec4 v_color;\nin vec3 v_normal;\nin vec3 v_eyeCoords;\nin vec3 v_pos;\n\nuniform vec4 u_colorMult;\nuniform vec4 u_colorOffset;\nuniform mat3 u_N;  //matrix for transforming normals\nuniform float u_camDist;\n\nout vec4 finalColor;\n\nvoid main() {\n\n  vec3 newNormal = normalize( u_N * v_normal );\n\n  //this creates a point light source at 0,0,0\n  vec3 L = normalize( - (v_eyeCoords + vec3(0.,0., u_camDist) )  );\n  \n  float ii = max(0., dot(L,newNormal) );\n  finalColor = v_color * u_colorMult + u_colorOffset;\n  finalColor *= .6;\n\n  finalColor *= (1. + ii*3.);\n\n  finalColor.xyz *= finalColor.xyz;  //more dramatic lighting\n}\n");const en=function(n,t,o,e,r){const i=function(n,t,o,e,r){const i=[];for(let o=0;o<t.length;++o)i.push(v(n,t[o],n[M[o]],r));return function(n,t,o,e,r){const i=r||p,a=n.createProgram();return t.forEach((function(t){n.attachShader(a,t)})),o&&o.forEach((function(t,o){n.bindAttribLocation(a,e?e[o]:o,t)})),n.linkProgram(a),n.getProgramParameter(a,n.LINK_STATUS)?a:(i("Error in program linking:"+n.getProgramInfoLog(a)),n.deleteProgram(a),null)}(n,i,undefined,undefined,r)}(n,t=t.map((function(n){const t=document.getElementById(n);return t?t.text:n})),0,0,void 0);if(!i)return null;const a=function(n,t){let o=0;function e(t,e){const r=n.getUniformLocation(t,e.name),i=e.type,a=e.size>1&&"[0]"===e.name.substr(-3);if(i===n.FLOAT&&a)return function(t){n.uniform1fv(r,t)};if(i===n.FLOAT)return function(t){n.uniform1f(r,t)};if(i===n.FLOAT_VEC2)return function(t){n.uniform2fv(r,t)};if(i===n.FLOAT_VEC3)return function(t){n.uniform3fv(r,t)};if(i===n.FLOAT_VEC4)return function(t){n.uniform4fv(r,t)};if(i===n.INT&&a)return function(t){n.uniform1iv(r,t)};if(i===n.INT)return function(t){n.uniform1i(r,t)};if(i===n.INT_VEC2)return function(t){n.uniform2iv(r,t)};if(i===n.INT_VEC3)return function(t){n.uniform3iv(r,t)};if(i===n.INT_VEC4)return function(t){n.uniform4iv(r,t)};if(i===n.BOOL)return function(t){n.uniform1iv(r,t)};if(i===n.BOOL_VEC2)return function(t){n.uniform2iv(r,t)};if(i===n.BOOL_VEC3)return function(t){n.uniform3iv(r,t)};if(i===n.BOOL_VEC4)return function(t){n.uniform4iv(r,t)};if(i===n.FLOAT_MAT2)return function(t){n.uniformMatrix2fv(r,!1,t)};if(i===n.FLOAT_MAT3)return function(t){n.uniformMatrix3fv(r,!1,t)};if(i===n.FLOAT_MAT4)return function(t){n.uniformMatrix4fv(r,!1,t)};if((i===n.SAMPLER_2D||i===n.SAMPLER_CUBE)&&a){const t=[];for(let n=0;n<info.size;++n)t.push(o++);return function(t,o){return function(e){n.uniform1iv(r,o),e.forEach((function(e,r){n.activeTexture(n.TEXTURE0+o[r]),n.bindTexture(t,e)}))}}(E(n,i),t)}if(i===n.SAMPLER_2D||i===n.SAMPLER_CUBE)return c=E(n,i),u=o++,function(t){n.uniform1i(r,u),n.activeTexture(n.TEXTURE0+u),n.bindTexture(c,t)};var c,u;throw"unknown type: 0x"+i.toString(16)}const r={},i=n.getProgramParameter(t,n.ACTIVE_UNIFORMS);for(let o=0;o<i;++o){const i=n.getActiveUniform(t,o);if(!i)break;let a=i.name;"[0]"===a.substr(-3)&&(a=a.substr(0,a.length-3));const c=e(t,i);r[a]=c}return r}(n,i),c=function(n,t){const o={};function e(t){return function(o){if(o.value)switch(n.disableVertexAttribArray(t),o.value.length){case 4:n.vertexAttrib4fv(t,o.value);break;case 3:n.vertexAttrib3fv(t,o.value);break;case 2:n.vertexAttrib2fv(t,o.value);break;case 1:n.vertexAttrib1fv(t,o.value);break;default:throw new Error("the length of a float constant value must be between 1 and 4!")}else n.bindBuffer(n.ARRAY_BUFFER,o.buffer),n.enableVertexAttribArray(t),n.vertexAttribPointer(t,o.numComponents||o.size,o.type||n.FLOAT,o.normalize||!1,o.stride||0,o.offset||0)}}const r=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let i=0;i<r;++i){const r=n.getActiveAttrib(t,i);if(!r)break;const a=n.getAttribLocation(t,r.name);o[r.name]=e(a)}return o}(n,i);return{program:i,uniformSetters:a,attribSetters:c}}(Z,on),rn=J(Z,7,35,21),an=K(Z,1),cn=new F("solar system"),un=new F("sun");un.localMatrix=l(6,6,6),un.drawInfo={uniforms:{u_colorOffset:[1.5,1.5,.7,1],u_colorMult:[1,1,0,1]}};const sn=new F("earth orbit");sn.localMatrix=i(110,0,0);const ln=new F("earth");ln.localMatrix=l(3,3,3),ln.drawInfo={uniforms:{u_colorOffset:[.1,.4,.7,1],u_colorMult:[.8,.6,.3,1]}};const fn=e([1,.3,0]),dn=d(u(Math.PI/2),fn),hn=new F("moon orbit"),mn=o(fn,30);hn.localMatrix=i(mn[0],mn[1],mn[2]);const pn=new F("moon");pn.localMatrix=l(1.2,1.2,1.2),pn.drawInfo={uniforms:{u_colorOffset:[.4,.4,.4,1],u_colorMult:[.3,.3,.3,1]}};const vn=new F("moon2 orbit");vn.localMatrix=i(40,0,0),t(c(Math.PI),vn.localMatrix,vn.localMatrix);const Mn=new F("moon2");Mn.localMatrix=l(.5,.6,.5),Mn.drawInfo={uniforms:{u_colorOffset:[.5,.3,.2,1],u_colorMult:[.3,.3,.3,1]}};const En=new F("binary planetoids");En.localMatrix=i(0,105,0),t(En.localMatrix,a(Math.PI/2),En.localMatrix);const gn=new F("b1 orbit"),wn=new F("b2 orbit");gn.localMatrix=i(20,0,0),wn.localMatrix=i(-20,0,0);const xn=new F("b1"),_n=new F("b2");xn.localMatrix=l(1.5,1.5,2.5),_n.localMatrix=l(1.5,1.5,2.5),xn.drawInfo={uniforms:{u_colorOffset:[.3,.2,0,1],u_colorMult:[.4,.6,0,1]}},_n.drawInfo={uniforms:{u_colorOffset:[0,.2,.3,1],u_colorMult:[0,.6,.4,1]}};const bn=new F("sphere",1);bn.drawInfo={programInfo:en,bufferInfo:rn},new F("cube",1).drawInfo={programInfo:en,bufferInfo:an},cn.addChild(un),cn.addChild(sn),cn.addChild(En),sn.addChild(ln),sn.addChild(hn),hn.addChild(pn),sn.addChild(vn),vn.addChild(Mn),En.addChild(gn),En.addChild(wn),gn.addChild(xn),wn.addChild(_n),un.addChild(bn),ln.addChild(bn),pn.addChild(bn),Mn.addChild(bn),xn.addChild(bn),_n.addChild(bn);const yn=[];function An(n){if(1===n.type&&n.parents.length>0){const t=n.copy(n.parents[n.parentCount]);yn.push(t)}n.parentCount++,n.children.forEach((t=>{t.parents.push(n),An(t)}))}An(cn);let Cn=!1,In=30,Tn={x:0,y:0};!function(){if(!Z)return;const r=40*Math.PI/180;let h=new U(Q);h.setViewDistance(350),h.setRotationCenter([0,0,0]),document.addEventListener("mousemove",(n=>{Tn.x=n.clientX,Tn.y=n.clientY})),document.getElementById("animCheckbox").onchange=function(){Cn=this.checked},document.getElementById("fps").onchange=function(){In=Math.min(240,this.valueAsNumber),document.getElementById("fps").valueAsNumber=In},document.getElementById("addPlanet").onsubmit=function(n){n.preventDefault();const r=["dxSun","size","orbitRotation","planetRotation","orbitTheta","orbitPhi","red","green","blue"],a={};let u=!0;for(const n of r)a[n]=parseFloat(this.elements[n].value),isNaN(a[n])&&(alert(`You have a problem in: ${n}`),u=!1);u&&function(n){console.log(n),nn++;const{orbitTheta:r,orbitPhi:a,dxSun:u,red:f,green:d,blue:h}=n;let m=[u,0,0],p=[0,1,0];if(0!=r){console.log("tilting orbit out of ecliptic"),p=[Math.sin(r)*Math.cos(a),Math.cos(r),Math.sin(r)*Math.sin(a)];const n=r+Math.PI/2;m=o(e([Math.sin(n)*Math.cos(a),Math.cos(n),Math.sin(n)*Math.sin(a)]),u)}const v=new F("new Orbit "+nn),M=new F("new Planet "+nn);v.localMatrix=i(m[0],m[1],m[2]),M.localMatrix=l(n.size,n.size,n.size),M.drawInfo={uniforms:{u_colorOffset:[f/2,d/2,h/2,1],u_colorMult:[f,d,h,1]}},cn.addChild(v),v.addChild(M),M.addChild(bn);const E=(g=v,w=p,x=n.orbitRotation,function(n){t(s(w,n*x),g.localMatrix,g.localMatrix)});var g,w,x;const _=function(n,o){return function(e){t(c(e*o),n.localMatrix,n.localMatrix)}}(M,n.planetRotation);tn.push(E),tn.push(_),yn.length=0,An(cn)}(a)},function(){let o=Date.now(),e=0;requestAnimationFrame((function i(l){requestAnimationFrame(i);const m=240/In,p=1e3/In,v=Date.now(),M=v-o;if(M<p)return;o=v-M%p,e++,function(n,t){t=t||1;const o=n.clientWidth*t|0,e=n.clientHeight*t|0;(n.width!==o||n.height!==e)&&(n.width=o,n.height=e)}(Z.canvas),Z.viewport(0,0,Z.canvas.width,Z.canvas.height),Z.enable(Z.CULL_FACE),Z.enable(Z.DEPTH_TEST),Z.clearColor(0,0,0,1),Z.clear(Z.COLOR_BUFFER_BIT|Z.DEPTH_BUFFER_BIT);const E=Z.canvas.clientWidth/Z.canvas.clientHeight,w=function(t,o,e,r,i){i=i||new n(16);var a=Math.tan(.5*Math.PI-.5*t);return i[0]=a/o,i[1]=0,i[2]=0,i[3]=0,i[4]=0,i[5]=a,i[6]=0,i[7]=0,i[8]=0,i[9]=0,i[10]=-1.000002000002,i[11]=-1,i[12]=0,i[13]=0,i[14]=-2.000002000002,i[15]=0,i}(r,E),x=h.getViewMatrix();Cn||function(n){const o=.003*n;t(c(o),sn.localMatrix,sn.localMatrix),t(s(dn,6*o),ln.localMatrix,ln.localMatrix),t(s(dn,2*o),hn.localMatrix,hn.localMatrix),t(c(6*o),vn.localMatrix,vn.localMatrix),t(s(dn,2*o),pn.localMatrix,pn.localMatrix),t(c(2*o),un.localMatrix,un.localMatrix),t(a(o),En.localMatrix,En.localMatrix);const e=u(3*o);t(e,gn.localMatrix,gn.localMatrix),t(e,wn.localMatrix,wn.localMatrix),t(e,xn.localMatrix,xn.localMatrix),t(e,_n.localMatrix,_n.localMatrix),tn.forEach((n=>{n(o)}))}(m),cn.updateWorldMatrix(),yn.forEach((function(n){n.drawInfo.uniforms.u_P=w,n.drawInfo.uniforms.u_VW=t(x,n.worldMatrix),n.drawInfo.uniforms.u_N=function(n){let t=new Array(9).fill(0),o=n[0],e=n[1],r=n[2],i=n[3],a=n[4],c=n[5],u=n[6],s=n[7],l=n[8],f=n[9],d=n[10],h=n[11],m=n[12],p=n[13],v=n[14],M=n[15],E=o*c-e*a,g=o*u-r*a,w=o*s-i*a,x=e*u-r*c,_=e*s-i*c,b=r*s-i*u,y=l*p-f*m,A=l*v-d*m,C=l*M-h*m,I=f*v-d*p,T=f*M-h*p,L=d*M-h*v,R=E*L-g*T+w*I+x*C-_*A+b*y;return R?(R=1/R,t[0]=(c*L-u*T+s*I)*R,t[1]=(u*C-a*L-s*A)*R,t[2]=(a*T-c*C+s*y)*R,t[3]=(r*T-e*L-i*I)*R,t[4]=(o*L-r*C+i*A)*R,t[5]=(e*C-o*T-i*y)*R,t[6]=(p*b-v*_+M*x)*R,t[7]=(v*w-m*b-M*g)*R,t[8]=(m*_-p*w+M*E)*R,t):null}(n.drawInfo.uniforms.u_VW)}));const _=Tn.x/Q.width*2-1,b=-Tn.y/Q.height*2+1,y=[_,b,-1,1],A=[_,b,.999,1],C=f(w),I=f(x),T=d(C,y),L=d(C,A),R=d(I,T),P=d(I,L);function O(n){return Math.trunc(1e3*n)/1e3}e%30==0&&(console.log("start eye",O(T[0]),O(T[1]),O(T[2])),console.log("start:",O(R[0]),O(R[1]),O(R[2])),console.log("end:",O(P[0]),O(P[1]),O(P[2])));let S=null,U=null;yn.forEach((function(n){const t=n.drawInfo,o=t.programInfo,e=t.bufferInfo;let r=!1;o!==S&&(S=o,Z.useProgram(o.program),r=!0),(r||e!==U)&&(U=e,g(Z,o,e)),t.uniforms.u_camDist=h.getViewDistance(),function(n,...t){n=n.uniformSetters||n;for(const o of t)Object.keys(o).forEach((function(t){const e=n[t];e&&e(o[t])}))}(o,t.uniforms),function(n,t,o,e,r){const i=t.indices;o=void 0===o?n.TRIANGLES:o;const a=void 0===e?t.numElements:e;r=void 0===r?0:r,i?n.drawElements(o,a,n.UNSIGNED_SHORT,r):n.drawArrays(o,r,a)}(Z,e)}))}))}()}()})();