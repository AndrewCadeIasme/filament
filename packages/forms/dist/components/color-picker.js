var l=(o,t=0,r=1)=>o>r?r:o<t?t:o,a=(o,t=0,r=Math.pow(10,t))=>Math.round(r*o)/r;var it={grad:360/400,turn:360,rad:360/(Math.PI*2)},O=o=>B(x(o)),x=o=>(o[0]==="#"&&(o=o.substr(1)),o.length<6?{r:parseInt(o[0]+o[0],16),g:parseInt(o[1]+o[1],16),b:parseInt(o[2]+o[2],16),a:1}:{r:parseInt(o.substr(0,2),16),g:parseInt(o.substr(2,2),16),b:parseInt(o.substr(4,2),16),a:1}),lt=(o,t="deg")=>Number(o)*(it[t]||1),pt=o=>{let r=/hsla?\(?\s*(-?\d*\.?\d+)(deg|rad|grad|turn)?[,\s]+(-?\d*\.?\d+)%?[,\s]+(-?\d*\.?\d+)%?,?\s*[/\s]*(-?\d*\.?\d+)?(%)?\s*\)?/i.exec(o);return r?ct({h:lt(r[1],r[2]),s:Number(r[3]),l:Number(r[4]),a:r[5]===void 0?1:Number(r[5])/(r[6]?100:1)}):{h:0,s:0,v:0,a:1}},z=pt,ct=({h:o,s:t,l:r,a:e})=>(t*=(r<50?r:100-r)/100,{h:o,s:t>0?2*t/(r+t)*100:0,v:r+t,a:e}),V=o=>ut(y(o)),D=({h:o,s:t,v:r,a:e})=>{let s=(200-t)*r/100;return{h:a(o),s:a(s>0&&s<200?t*r/100/(s<=100?s:200-s)*100:0),l:a(s/2),a:a(e,2)}};var p=o=>{let{h:t,s:r,l:e}=D(o);return`hsl(${t}, ${r}%, ${e}%)`},b=o=>{let{h:t,s:r,l:e,a:s}=D(o);return`hsla(${t}, ${r}%, ${e}%, ${s})`},y=({h:o,s:t,v:r,a:e})=>{o=o/360*6,t=t/100,r=r/100;let s=Math.floor(o),n=r*(1-t),i=r*(1-(o-s)*t),H=r*(1-(1-o+s)*t),S=s%6;return{r:a([r,i,n,n,H,r][S]*255),g:a([H,r,r,i,n,n][S]*255),b:a([n,n,H,r,r,i][S]*255),a:a(e,2)}},F=o=>{let{r:t,g:r,b:e}=y(o);return`rgb(${t}, ${r}, ${e})`},X=o=>{let{r:t,g:r,b:e,a:s}=y(o);return`rgba(${t}, ${r}, ${e}, ${s})`};var k=o=>{let r=/rgba?\(?\s*(-?\d*\.?\d+)(%)?[,\s]+(-?\d*\.?\d+)(%)?[,\s]+(-?\d*\.?\d+)(%)?,?\s*[/\s]*(-?\d*\.?\d+)?(%)?\s*\)?/i.exec(o);return r?B({r:Number(r[1])/(r[2]?100/255:1),g:Number(r[3])/(r[4]?100/255:1),b:Number(r[5])/(r[6]?100/255:1),a:r[7]===void 0?1:Number(r[7])/(r[8]?100:1)}):{h:0,s:0,v:0,a:1}},Y=k,j=o=>{let t=o.toString(16);return t.length<2?"0"+t:t},ut=({r:o,g:t,b:r})=>"#"+j(o)+j(t)+j(r),B=({r:o,g:t,b:r,a:e})=>{let s=Math.max(o,t,r),n=s-Math.min(o,t,r),i=n?s===o?(t-r)/n:s===t?2+(r-o)/n:4+(o-t)/n:0;return{h:a(60*(i<0?i+6:i)),s:a(s?n/s*100:0),v:a(s/255*100),a:e}};var T=(o,t)=>{if(o===t)return!0;for(let r in o)if(o[r]!==t[r])return!1;return!0},d=(o,t)=>o.replace(/\s/g,"")===t.replace(/\s/g,""),_=(o,t)=>o.toLowerCase()===t.toLowerCase()?!0:T(x(o),x(t));var U={},v=o=>{let t=U[o];return t||(t=document.createElement("template"),t.innerHTML=o,U[o]=t),t},m=(o,t,r)=>{o.dispatchEvent(new CustomEvent(t,{bubbles:!0,detail:r}))};var h=!1,w=o=>"touches"in o,dt=o=>h&&!w(o)?!1:(h||(h=w(o)),!0),G=(o,t)=>{let r=w(t)?t.touches[0]:t,e=o.el.getBoundingClientRect();m(o.el,"move",o.getMove({x:l((r.pageX-(e.left+window.pageXOffset))/e.width),y:l((r.pageY-(e.top+window.pageYOffset))/e.height)}))},ht=(o,t)=>{let r=t.keyCode;r>40||o.xy&&r<37||r<33||(t.preventDefault(),m(o.el,"move",o.getMove({x:r===39?.01:r===37?-.01:r===34?.05:r===33?-.05:r===35?1:r===36?-1:0,y:r===40?.01:r===38?-.01:0},!0)))},u=class{constructor(t,r,e,s){let n=v(`<div role="slider" tabindex="0" part="${r}" ${e}><div part="${r}-pointer"></div></div>`);t.appendChild(n.content.cloneNode(!0));let i=t.querySelector(`[part=${r}]`);i.addEventListener("mousedown",this),i.addEventListener("touchstart",this),i.addEventListener("keydown",this),this.el=i,this.xy=s,this.nodes=[i.firstChild,i]}set dragging(t){let r=t?document.addEventListener:document.removeEventListener;r(h?"touchmove":"mousemove",this),r(h?"touchend":"mouseup",this)}handleEvent(t){switch(t.type){case"mousedown":case"touchstart":if(t.preventDefault(),!dt(t)||!h&&t.button!=0)return;this.el.focus(),G(this,t),this.dragging=!0;break;case"mousemove":case"touchmove":t.preventDefault(),G(this,t);break;case"mouseup":case"touchend":this.dragging=!1;break;case"keydown":ht(this,t);break}}style(t){t.forEach((r,e)=>{for(let s in r)this.nodes[e].style.setProperty(s,r[s])})}};var C=class extends u{constructor(t){super(t,"hue",'aria-label="Hue" aria-valuemin="0" aria-valuemax="360"',!1)}update({h:t}){this.h=t,this.style([{left:`${t/360*100}%`,color:p({h:t,s:100,v:100,a:1})}]),this.el.setAttribute("aria-valuenow",`${a(t)}`)}getMove(t,r){return{h:r?l(this.h+t.x*360,0,360):360*t.x}}};var M=class extends u{constructor(t){super(t,"saturation",'aria-label="Color"',!0)}update(t){this.hsva=t,this.style([{top:`${100-t.v}%`,left:`${t.s}%`,color:p(t)},{"background-color":p({h:t.h,s:100,v:100,a:1})}]),this.el.setAttribute("aria-valuetext",`Saturation ${a(t.s)}%, Brightness ${a(t.v)}%`)}getMove(t,r){return{s:r?l(this.hsva.s+t.x*100,0,100):t.x*100,v:r?l(this.hsva.v-t.y*100,0,100):Math.round(100-t.y*100)}}};var J=":host{display:flex;flex-direction:column;position:relative;width:200px;height:200px;user-select:none;-webkit-user-select:none;cursor:default}:host([hidden]){display:none!important}[role=slider]{position:relative;touch-action:none;user-select:none;-webkit-user-select:none;outline:0}[role=slider]:last-child{border-radius:0 0 8px 8px}[part$=pointer]{position:absolute;z-index:1;box-sizing:border-box;width:28px;height:28px;transform:translate(-50%,-50%);background-color:#fff;border:2px solid #fff;border-radius:50%;box-shadow:0 2px 4px rgba(0,0,0,.2)}[part$=pointer]::after{display:block;content:'';position:absolute;left:0;top:0;right:0;bottom:0;border-radius:inherit;background-color:currentColor}[role=slider]:focus [part$=pointer]{transform:translate(-50%,-50%) scale(1.1)}";var K="[part=hue]{flex:0 0 24px;background:linear-gradient(to right,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red 100%)}[part=hue-pointer]{top:50%;z-index:2}";var Q="[part=saturation]{flex-grow:1;border-color:transparent;border-bottom:12px solid #000;border-radius:8px 8px 0 0;background-image:linear-gradient(to top,#000,transparent),linear-gradient(to right,#fff,rgba(255,255,255,0));box-shadow:inset 0 0 0 1px rgba(0,0,0,.05)}[part=saturation-pointer]{z-index:3}";var $=Symbol("same"),W=Symbol("color"),Z=Symbol("hsva"),E=Symbol("change"),q=Symbol("update"),tt=Symbol("parts"),g=Symbol("css"),f=Symbol("sliders"),c=class extends HTMLElement{static get observedAttributes(){return["color"]}get[g](){return[J,K,Q]}get[f](){return[M,C]}get color(){return this[W]}set color(t){if(!this[$](t)){let r=this.colorModel.toHsva(t);this[q](r),this[E](t)}}constructor(){super();let t=v(`<style>${this[g].join("")}</style>`),r=this.attachShadow({mode:"open"});r.appendChild(t.content.cloneNode(!0)),r.addEventListener("move",this),this[tt]=this[f].map(e=>new e(r))}connectedCallback(){if(this.hasOwnProperty("color")){let t=this.color;delete this.color,this.color=t}else this.color||(this.color=this.colorModel.defaultColor)}attributeChangedCallback(t,r,e){let s=this.colorModel.fromAttr(e);this[$](s)||(this.color=s)}handleEvent(t){let r=this[Z],e={...r,...t.detail};this[q](e);let s;!T(e,r)&&!this[$](s=this.colorModel.fromHsva(e))&&this[E](s)}[$](t){return this.color&&this.colorModel.equal(t,this.color)}[q](t){this[Z]=t,this[tt].forEach(r=>r.update(t))}[E](t){this[W]=t,m(this,"color-changed",{value:t})}};var mt={defaultColor:"#000",toHsva:O,fromHsva:V,equal:_,fromAttr:o=>o},A=class extends c{get colorModel(){return mt}};var rt=class extends A{};customElements.define("hex-color-picker",rt);var gt={defaultColor:"hsl(0, 0%, 0%)",toHsva:z,fromHsva:p,equal:d,fromAttr:o=>o},N=class extends c{get colorModel(){return gt}};var ot=class extends N{};customElements.define("hsl-string-color-picker",ot);var ft={defaultColor:"rgb(0, 0, 0)",toHsva:Y,fromHsva:F,equal:d,fromAttr:o=>o},L=class extends c{get colorModel(){return ft}};var et=class extends L{};customElements.define("rgb-string-color-picker",et);var P=class extends u{constructor(t){super(t,"alpha",'aria-label="Alpha" aria-valuemin="0" aria-valuemax="1"',!1)}update(t){this.hsva=t;let r=b({...t,a:0}),e=b({...t,a:1}),s=t.a*100;this.style([{left:`${s}%`,color:b(t)},{"--gradient":`linear-gradient(90deg, ${r}, ${e}`}]);let n=a(s);this.el.setAttribute("aria-valuenow",`${n}`),this.el.setAttribute("aria-valuetext",`${n}%`)}getMove(t,r){return{a:r?l(this.hsva.a+t.x):t.x}}};var st=`[part=alpha]{flex:0 0 24px}[part=alpha]::after{display:block;content:'';position:absolute;top:0;left:0;right:0;bottom:0;border-radius:inherit;background-image:var(--gradient);box-shadow:inset 0 0 0 1px rgba(0,0,0,.05)}[part^=alpha]{background-color:#fff;background-image:url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill-opacity=".05"><rect x="8" width="8" height="8"/><rect y="8" width="8" height="8"/></svg>')}[part=alpha-pointer]{top:50%}`;var R=class extends c{get[g](){return[...super[g],st]}get[f](){return[...super[f],P]}};var xt={defaultColor:"rgba(0, 0, 0, 1)",toHsva:k,fromHsva:X,equal:d,fromAttr:o=>o},I=class extends R{get colorModel(){return xt}};var at=class extends I{};customElements.define("rgba-string-color-picker",at);function nt({isAutofocused:o,isDisabled:t,state:r}){return{state:r,init:function(){this.state===null||this.state===""||this.setState(this.state),o&&this.togglePanelVisibility(this.$refs.input),this.$refs.input.addEventListener("change",e=>{this.setState(e.target.value)}),this.$refs.panel.addEventListener("color-changed",e=>{this.setState(e.detail.value)})},togglePanelVisibility:function(){t||this.$refs.panel.toggle(this.$refs.input)},setState:function(e){this.state=e,this.$refs.input.value=e,this.$refs.panel.color=e},isOpen:function(){return this.$refs.panel.style.display==="block"}}}export{nt as default};