const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./world-DqabaS9g.js","./index-CK1foCpU.js","./index-PMmFttlR.css"])))=>i.map(i=>d[i]);
import{t as wc,o as vu,_ as l_,a as u_,l as Uf}from"./index-CK1foCpU.js";var Ff="1.3.28";function Zp(r,e,t){return Math.max(r,Math.min(e,t))}function h_(r,e,t){return(1-t)*r+t*e}function f_(r,e,t,n){return h_(r,e,1-Math.exp(-t*n))}function d_(r,e){return(r%e+e)%e}var p_=class{isRunning=!1;value=0;from=0;to=0;currentTime=0;lerp;duration;easing;onUpdate;advance(r){if(!this.isRunning)return;let e=!1;if(this.duration&&this.easing){this.currentTime+=r;const t=Zp(0,this.currentTime/this.duration,1);e=t>=1;const n=e?1:this.easing(t);this.value=this.from+(this.to-this.from)*n}else this.lerp?(this.value=f_(this.value,this.to,this.lerp*60,r),Math.round(this.value)===Math.round(this.to)&&(this.value=this.to,e=!0)):(this.value=this.to,e=!0);e&&this.stop(),this.onUpdate?.(this.value,e)}stop(){this.isRunning=!1}fromTo(r,e,{lerp:t,duration:n,easing:i,onStart:s,onUpdate:a}){this.from=this.value=r,this.to=e,this.lerp=t,this.duration=n,this.easing=i,this.currentTime=0,this.isRunning=!0,s?.(),this.onUpdate=a}};function m_(r,e){let t;return function(...n){clearTimeout(t),t=setTimeout(()=>{t=void 0,r.apply(this,n)},e)}}var g_=class{wrapper;content;width=0;height=0;scrollHeight=0;scrollWidth=0;debouncedResize;wrapperResizeObserver;contentResizeObserver;constructor(r,e,{autoResize:t=!0,debounce:n=250}={}){this.wrapper=r,this.content=e,t&&(this.debouncedResize=m_(this.resize,n),this.wrapper instanceof Window?window.addEventListener("resize",this.debouncedResize):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}destroy(){this.wrapperResizeObserver?.disconnect(),this.contentResizeObserver?.disconnect(),this.wrapper===window&&this.debouncedResize&&window.removeEventListener("resize",this.debouncedResize)}resize=()=>{this.onWrapperResize(),this.onContentResize()};onWrapperResize=()=>{this.wrapper instanceof Window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)};onContentResize=()=>{this.wrapper instanceof Window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)};get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}},Qp=class{events={};emit(r,...e){const t=this.events[r]||[];for(let n=0,i=t.length;n<i;n++)t[n]?.(...e)}on(r,e){return this.events[r]?this.events[r].push(e):this.events[r]=[e],()=>{this.events[r]=this.events[r]?.filter(t=>e!==t)}}off(r,e){this.events[r]=this.events[r]?.filter(t=>e!==t)}destroy(){this.events={}}};const __=100/6,hr={passive:!1};function Of(r,e){return r===1?__:r===2?e:1}var b_=class{element;options;touchStart={x:0,y:0};lastDelta={x:0,y:0};window={width:0,height:0};emitter=new Qp;constructor(r,e={wheelMultiplier:1,touchMultiplier:1}){this.element=r,this.options=e,window.addEventListener("resize",this.onWindowResize),this.onWindowResize(),this.element.addEventListener("wheel",this.onWheel,hr),this.element.addEventListener("touchstart",this.onTouchStart,hr),this.element.addEventListener("touchmove",this.onTouchMove,hr),this.element.addEventListener("touchend",this.onTouchEnd,hr)}on(r,e){return this.emitter.on(r,e)}destroy(){this.emitter.destroy(),window.removeEventListener("resize",this.onWindowResize),this.element.removeEventListener("wheel",this.onWheel,hr),this.element.removeEventListener("touchstart",this.onTouchStart,hr),this.element.removeEventListener("touchmove",this.onTouchMove,hr),this.element.removeEventListener("touchend",this.onTouchEnd,hr)}onTouchStart=r=>{const{clientX:e,clientY:t}=r.targetTouches?r.targetTouches[0]:r;this.touchStart.x=e,this.touchStart.y=t,this.lastDelta={x:0,y:0},this.emitter.emit("scroll",{deltaX:0,deltaY:0,event:r})};onTouchMove=r=>{const{clientX:e,clientY:t}=r.targetTouches?r.targetTouches[0]:r,n=-(e-this.touchStart.x)*this.options.touchMultiplier,i=-(t-this.touchStart.y)*this.options.touchMultiplier;this.touchStart.x=e,this.touchStart.y=t,this.lastDelta={x:n,y:i},this.emitter.emit("scroll",{deltaX:n,deltaY:i,event:r})};onTouchEnd=r=>{this.emitter.emit("scroll",{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:r})};onWheel=r=>{let{deltaX:e,deltaY:t,deltaMode:n}=r;const i=Of(n,this.window.width),s=Of(n,this.window.height);e*=i,t*=s,e*=this.options.wheelMultiplier,t*=this.options.wheelMultiplier,this.emitter.emit("scroll",{deltaX:e,deltaY:t,event:r})};onWindowResize=()=>{this.window={width:window.innerWidth,height:window.innerHeight}}};const kf=r=>Math.min(1,1.001-2**(-10*r));var v_=class{_isScrolling=!1;_isStopped=!1;_isLocked=!1;_preventNextNativeScrollEvent=!1;_resetVelocityTimeout=null;_rafId=null;_isDraggingSelection=!1;reducedMotionMediaQuery=window.matchMedia("(prefers-reduced-motion: reduce)");isTouching;isIos;time=0;userData={};lastVelocity=0;velocity=0;direction=0;options;targetScroll;animatedScroll;animate=new p_;emitter=new Qp;dimensions;virtualScroll;constructor({wrapper:r=window,content:e=document.documentElement,eventsTarget:t=r,smoothWheel:n=!0,syncTouch:i=!1,syncTouchLerp:s=.075,touchInertiaExponent:a=1.7,duration:o,easing:c,lerp:l=.1,infinite:u=!1,orientation:h="vertical",gestureOrientation:f=h==="horizontal"?"both":"vertical",touchMultiplier:d=1,wheelMultiplier:g=1,autoResize:_=!0,prevent:m,virtualScroll:p,overscroll:v=!0,autoRaf:y=!1,anchors:b=!1,autoToggle:M=!1,allowNestedScroll:E=!1,__experimental__naiveDimensions:T=!1,naiveDimensions:R=T,stopInertiaOnNavigate:x=!1,respectReducedMotion:S=!0}={}){window.lenisVersion=Ff,window.lenis||(window.lenis={}),window.lenis.version=Ff,h==="horizontal"&&(window.lenis.horizontal=!0),i===!0&&(window.lenis.touch=!0),this.isIos=/(iPad|iPhone|iPod)/g.test(navigator.userAgent),(!r||r===document.documentElement)&&(r=window),typeof o=="number"&&typeof c!="function"?c=kf:typeof c=="function"&&typeof o!="number"&&(o=1),this.options={wrapper:r,content:e,eventsTarget:t,smoothWheel:n,syncTouch:i,syncTouchLerp:s,touchInertiaExponent:a,duration:o,easing:c,lerp:l,infinite:u,gestureOrientation:f,orientation:h,touchMultiplier:d,wheelMultiplier:g,autoResize:_,prevent:m,virtualScroll:p,overscroll:v,autoRaf:y,anchors:b,autoToggle:M,allowNestedScroll:E,naiveDimensions:R,stopInertiaOnNavigate:x,respectReducedMotion:S},this.dimensions=new g_(r,e,{autoResize:_}),this.updateClassName(),this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll),this.options.wrapper.addEventListener("scrollend",this.onScrollEnd,{capture:!0}),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.addEventListener("click",this.onClick),this.options.wrapper.addEventListener("pointerdown",this.onPointerDown),this.virtualScroll=new b_(t,{touchMultiplier:d,wheelMultiplier:g}),this.virtualScroll.on("scroll",this.onVirtualScroll),this.options.autoToggle&&(this.checkOverflow(),this.rootElement.addEventListener("transitionend",this.onTransitionEnd)),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))}destroy(){this.emitter.destroy(),this._resetVelocityTimeout!==null&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll),this.options.wrapper.removeEventListener("scrollend",this.onScrollEnd,{capture:!0}),this.options.wrapper.removeEventListener("pointerdown",this.onPointerDown),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.removeEventListener("click",this.onClick),this.options.autoToggle&&this.rootElement.removeEventListener("transitionend",this.onTransitionEnd),this.virtualScroll.destroy(),this.dimensions.destroy(),this.cleanUpClassName(),this._rafId&&cancelAnimationFrame(this._rafId)}on(r,e){return this.emitter.on(r,e)}off(r,e){return this.emitter.off(r,e)}onScrollEnd=r=>{r instanceof CustomEvent||(this.isScrolling==="smooth"||this.isScrolling===!1)&&r.stopPropagation()};dispatchScrollendEvent=()=>{this.options.wrapper.dispatchEvent(new CustomEvent("scrollend",{bubbles:this.options.wrapper===window,detail:{lenisScrollEnd:!0}}))};get overflow(){const r=this.isHorizontal?"overflow-x":"overflow-y";return getComputedStyle(this.rootElement)[r]}checkOverflow(){["hidden","clip"].includes(this.overflow)?this.internalStop():this.internalStart()}onTransitionEnd=r=>{r.propertyName?.includes("overflow")&&r.target===this.rootElement&&this.checkOverflow()};setScroll(r){this.isHorizontal?this.options.wrapper.scrollTo({left:r,behavior:"instant"}):this.options.wrapper.scrollTo({top:r,behavior:"instant"})}onClick=r=>{const e=r.composedPath().filter(n=>n instanceof HTMLAnchorElement&&n.href).map(n=>new URL(n.href)),t=new URL(window.location.href);if(this.options.anchors){const n=e.find(i=>t.host===i.host&&t.pathname===i.pathname&&i.hash);if(n){const i=typeof this.options.anchors=="object"&&this.options.anchors?this.options.anchors:void 0,s=decodeURIComponent(n.hash);this.scrollTo(s,i);return}}if(this.options.stopInertiaOnNavigate&&e.some(n=>t.host===n.host&&t.pathname!==n.pathname)){this.reset();return}};onPointerDown=r=>{r.button===1&&this.reset()};isTouchOnSelectionHandle(r){const e=window.getSelection();if(!e||e.isCollapsed||e.rangeCount===0)return!1;const t=r.targetTouches[0]??r.changedTouches[0];if(!t)return!1;const n=e.getRangeAt(0).getClientRects();if(n.length===0)return!1;const i=n[0],s=n[n.length-1],a=40,o=Math.hypot(t.clientX-i.left,t.clientY-i.top)<=a,c=Math.hypot(t.clientX-s.right,t.clientY-s.bottom)<=a;return o||c}onVirtualScroll=r=>{if(typeof this.options.virtualScroll=="function"&&this.options.virtualScroll(r)===!1)return;const{deltaX:e,deltaY:t,event:n}=r;if(this.emitter.emit("virtual-scroll",{deltaX:e,deltaY:t,event:n}),n.ctrlKey||n.lenisStopPropagation)return;const i=n.type.includes("touch"),s=n.type.includes("wheel");if(i&&this.isIos&&(n.type==="touchstart"&&(this._isDraggingSelection=this.isTouchOnSelectionHandle(n)),this._isDraggingSelection)){n.type==="touchend"&&(this._isDraggingSelection=!1);return}this.isTouching=n.type==="touchstart"||n.type==="touchmove";const a=e===0&&t===0;if(this.options.syncTouch&&i&&n.type==="touchstart"&&a&&!this.isStopped&&!this.isLocked){this.reset();return}const o=this.options.gestureOrientation==="vertical"&&t===0||this.options.gestureOrientation==="horizontal"&&e===0;if(a||o)return;let c=n.composedPath();c=c.slice(0,c.indexOf(this.rootElement));const l=this.options.prevent,u=Math.abs(e)>=Math.abs(t)?"horizontal":"vertical";if(c.find(g=>g instanceof HTMLElement&&(typeof l=="function"&&l?.(g)||g.hasAttribute?.("data-lenis-prevent")||u==="vertical"&&g.hasAttribute?.("data-lenis-prevent-vertical")||u==="horizontal"&&g.hasAttribute?.("data-lenis-prevent-horizontal")||i&&g.hasAttribute?.("data-lenis-prevent-touch")||s&&g.hasAttribute?.("data-lenis-prevent-wheel")||this.options.allowNestedScroll&&this.hasNestedScroll(g,{deltaX:e,deltaY:t}))))return;if(this.isStopped||this.isLocked){n.cancelable&&n.preventDefault();return}if(!(this.options.syncTouch&&i||this.options.smoothWheel&&s)){this.isScrolling="native",this.animate.stop(),n.lenisStopPropagation=!0;return}let h=t;this.options.gestureOrientation==="both"?h=Math.abs(t)>Math.abs(e)?t:e:this.options.gestureOrientation==="horizontal"&&(h=e),(!this.options.overscroll||this.options.infinite||this.options.wrapper!==window&&this.limit>0&&(this.animatedScroll>0&&this.animatedScroll<this.limit||this.animatedScroll===0&&t>0||this.animatedScroll===this.limit&&t<0))&&(n.lenisStopPropagation=!0),n.cancelable&&n.preventDefault();const f=i&&this.options.syncTouch,d=i&&n.type==="touchend";d&&(h=Math.sign(h)*Math.abs(this.velocity)**this.options.touchInertiaExponent),this.scrollTo(this.targetScroll+h,{programmatic:!1,...f?{lerp:d?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}})};resize(){this.dimensions.resize(),this.animatedScroll=this.targetScroll=this.actualScroll,this.emit()}emit(){this.emitter.emit("scroll",this)}onNativeScroll=()=>{if(this._resetVelocityTimeout!==null&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this._preventNextNativeScrollEvent){this._preventNextNativeScrollEvent=!1;return}if(this.isScrolling===!1||this.isScrolling==="native"){const r=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity,this.velocity=this.animatedScroll-r,this.direction=Math.sign(this.animatedScroll-r),this.isStopped||(this.isScrolling="native"),this.emit(),this.velocity!==0&&(this._resetVelocityTimeout=setTimeout(()=>{this.lastVelocity=this.velocity,this.velocity=0,this.isScrolling=!1,this.emit()},400))}};reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity=0,this.animate.stop()}start(){if(this.isStopped){if(this.options.autoToggle){this.rootElement.style.removeProperty("overflow");return}this.internalStart()}}internalStart(){this.isStopped&&(this.reset(),this.isStopped=!1,this.emit())}stop(){if(!this.isStopped){if(this.options.autoToggle){this.rootElement.style.setProperty("overflow","clip");return}this.internalStop()}}internalStop(){this.isStopped||(this.reset(),this.isStopped=!0,this.emit())}raf=r=>{const e=r-(this.time||r);this.time=r,this.animate.advance(e*.001),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))};scrollTo(r,{offset:e=0,immediate:t=!1,lock:n=!1,programmatic:i=!0,lerp:s=i?this.options.lerp:void 0,duration:a=i?this.options.duration:void 0,easing:o=i?this.options.easing:void 0,onStart:c,onComplete:l,force:u=!1,userData:h}={}){if(this.prefersReducedMotion&&(i?t=!0:(s=1,a=void 0,o=void 0)),(this.isStopped||this.isLocked)&&!u)return;let f=r,d=e;if(typeof f=="string"&&["top","left","start","#"].includes(f))f=0;else if(typeof f=="string"&&["bottom","right","end"].includes(f))f=this.limit;else{let g=null;if(typeof f=="string"?(g=f.startsWith("#")?document.getElementById(f.slice(1)):document.querySelector(f),g||(f==="#top"?f=0:console.warn("Lenis: Target not found",f))):f instanceof Element&&(g=f),g){if(this.options.wrapper!==window){const b=this.rootElement.getBoundingClientRect();d-=this.isHorizontal?b.left:b.top}const _=g.getBoundingClientRect(),m=getComputedStyle(g),p=this.isHorizontal?Number.parseFloat(m.scrollMarginLeft):Number.parseFloat(m.scrollMarginTop),v=getComputedStyle(this.rootElement),y=this.isHorizontal?Number.parseFloat(v.scrollPaddingLeft):Number.parseFloat(v.scrollPaddingTop);f=(this.isHorizontal?_.left:_.top)+this.animatedScroll-(Number.isNaN(p)?0:p)-(Number.isNaN(y)?0:y)}}if(typeof f=="number"){if(f+=d,this.options.infinite){if(i){this.targetScroll=this.animatedScroll=this.scroll;const g=f-this.animatedScroll;g>this.limit/2?f-=this.limit:g<-this.limit/2&&(f+=this.limit)}}else f=Zp(0,f,this.limit);if(f===this.targetScroll){c?.(this),l?.(this);return}if(this.userData=h??{},t){this.animatedScroll=this.targetScroll=f,this.setScroll(this.scroll),this.reset(),this.preventNextNativeScrollEvent(),this.emit(),l?.(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()});return}i||(this.targetScroll=f),typeof a=="number"&&typeof o!="function"?o=kf:typeof o=="function"&&typeof a!="number"&&(a=1),this.animate.fromTo(this.animatedScroll,f,{duration:a,easing:o,lerp:s,onStart:()=>{n&&(this.isLocked=!0),this.isScrolling="smooth",c?.(this)},onUpdate:(g,_)=>{this.isScrolling="smooth",this.lastVelocity=this.velocity,this.velocity=g-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=g,this.setScroll(this.scroll),i&&(this.targetScroll=g),_||this.emit(),_&&(this.reset(),this.emit(),l?.(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()}),this.preventNextNativeScrollEvent())}})}}preventNextNativeScrollEvent(){this._preventNextNativeScrollEvent=!0,requestAnimationFrame(()=>{this._preventNextNativeScrollEvent=!1})}hasNestedScroll(r,{deltaX:e,deltaY:t}){const n=Date.now();r._lenis||(r._lenis={});const i=r._lenis;let s,a,o,c,l,u,h,f,d,g;if(n-(i.time??0)>2e3){i.time=Date.now();const E=window.getComputedStyle(r);if(i.computedStyle=E,s=["auto","overlay","scroll"].includes(E.overflowX),a=["auto","overlay","scroll"].includes(E.overflowY),l=["auto"].includes(E.overscrollBehaviorX),u=["auto"].includes(E.overscrollBehaviorY),i.hasOverflowX=s,i.hasOverflowY=a,!(s||a))return!1;h=r.scrollWidth,f=r.scrollHeight,d=r.clientWidth,g=r.clientHeight,o=h>d,c=f>g,i.isScrollableX=o,i.isScrollableY=c,i.scrollWidth=h,i.scrollHeight=f,i.clientWidth=d,i.clientHeight=g,i.hasOverscrollBehaviorX=l,i.hasOverscrollBehaviorY=u}else o=i.isScrollableX,c=i.isScrollableY,s=i.hasOverflowX,a=i.hasOverflowY,h=i.scrollWidth,f=i.scrollHeight,d=i.clientWidth,g=i.clientHeight,l=i.hasOverscrollBehaviorX,u=i.hasOverscrollBehaviorY;if(!(s&&o||a&&c))return!1;const _=Math.abs(e)>=Math.abs(t)?"horizontal":"vertical";let m,p,v,y,b,M;if(_==="horizontal")m=Math.round(r.scrollLeft),p=h-d,v=e,y=s,b=o,M=l;else if(_==="vertical")m=Math.round(r.scrollTop),p=f-g,v=t,y=a,b=c,M=u;else return!1;return!M&&(m>=p||m<=0)?!0:(v>0?m<p:m>0)&&y&&b}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?"x":"y"]}get isHorizontal(){return this.options.orientation==="horizontal"}get actualScroll(){const r=this.options.wrapper;return this.isHorizontal?r.scrollX??r.scrollLeft:r.scrollY??r.scrollTop}get scroll(){return this.options.infinite?d_(this.animatedScroll,this.limit):this.animatedScroll}get progress(){return this.limit===0?1:this.scroll/this.limit}get isScrolling(){return this._isScrolling}set isScrolling(r){this._isScrolling!==r&&(this._isScrolling=r,this.updateClassName())}get isStopped(){return this._isStopped}set isStopped(r){this._isStopped!==r&&(this._isStopped=r,this.updateClassName())}get isLocked(){return this._isLocked}set isLocked(r){this._isLocked!==r&&(this._isLocked=r,this.updateClassName())}get isSmooth(){return this.isScrolling==="smooth"}get prefersReducedMotion(){return this.options.respectReducedMotion&&this.reducedMotionMediaQuery.matches}get className(){let r="lenis";return this.options.autoToggle&&(r+=" lenis-autoToggle"),this.isStopped&&(r+=" lenis-stopped"),this.isLocked&&(r+=" lenis-locked"),this.isScrolling&&(r+=" lenis-scrolling"),this.isScrolling==="smooth"&&(r+=" lenis-smooth"),r}updateClassName(){this.cleanUpClassName(),this.className.split(" ").forEach(r=>{this.rootElement.classList.add(r)})}cleanUpClassName(){for(const r of Array.from(this.rootElement.classList))(r==="lenis"||r.startsWith("lenis-"))&&this.rootElement.classList.remove(r)}};function $i(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function em(r,e){r.prototype=Object.create(e.prototype),r.prototype.constructor=r,r.__proto__=e}var ii={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},lo={duration:.5,overwrite:!1,delay:0},Bh,hn,Lt,mi=1e8,Mt=1/mi,xu=Math.PI*2,x_=xu/4,y_=0,tm=Math.sqrt,S_=Math.cos,M_=Math.sin,on=function(e){return typeof e=="string"},zt=function(e){return typeof e=="function"},ar=function(e){return typeof e=="number"},zh=function(e){return typeof e>"u"},Bi=function(e){return typeof e=="object"},On=function(e){return e!==!1},Hh=function(){return typeof window<"u"},No=function(e){return zt(e)||on(e)},nm=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},bn=Array.isArray,T_=/random\([^)]+\)/g,E_=/,\s*/g,Bf=/(?:-?\.?\d|\.)+/gi,im=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,Vs=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,vl=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,rm=/[+-]=-?[.\d]+/,w_=/[^,'"\[\]\s]+/gi,A_=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,Ft,Pi,yu,Gh,ri={},Wc={},sm,am=function(e){return(Wc=ra(e,ri))&&Gn},Vh=function(e,t){return console.warn("Invalid property",e,"set to",t,"Missing plugin? gsap.registerPlugin()")},uo=function(e,t){return!t&&console.warn(e)},om=function(e,t){return e&&(ri[e]=t)&&Wc&&(Wc[e]=t)||ri},ho=function(){return 0},R_={suppressEvents:!0,isStart:!0,kill:!1},Ac={suppressEvents:!0,kill:!1},C_={suppressEvents:!0},Wh={},Ar=[],Su={},cm,$n={},xl={},zf=30,Rc=[],Xh="",jh=function(e){var t=e[0],n,i;if(Bi(t)||zt(t)||(e=[e]),!(n=(t._gsap||{}).harness)){for(i=Rc.length;i--&&!Rc[i].targetTest(t););n=Rc[i]}for(i=e.length;i--;)e[i]&&(e[i]._gsap||(e[i]._gsap=new Pm(e[i],n)))||e.splice(i,1);return e},as=function(e){return e._gsap||jh(gi(e))[0]._gsap},lm=function(e,t,n){return(n=e[t])&&zt(n)?e[t]():zh(n)&&e.getAttribute&&e.getAttribute(t)||n},kn=function(e,t){return(e=e.split(",")).forEach(t)||e},Vt=function(e){return Math.round(e*1e5)/1e5||0},Ut=function(e){return Math.round(e*1e7)/1e7||0},qs=function(e,t){var n=t.charAt(0),i=parseFloat(t.substr(2));return e=parseFloat(e),n==="+"?e+i:n==="-"?e-i:n==="*"?e*i:e/i},P_=function(e,t){for(var n=t.length,i=0;e.indexOf(t[i])<0&&++i<n;);return i<n},Xc=function(){var e=Ar.length,t=Ar.slice(0),n,i;for(Su={},Ar.length=0,n=0;n<e;n++)i=t[n],i&&i._lazy&&(i.render(i._lazy[0],i._lazy[1],!0)._lazy=0)},qh=function(e){return!!(e._initted||e._startAt||e.add)},um=function(e,t,n,i){Ar.length&&!hn&&Xc(),e.render(t,n,!!(hn&&t<0&&qh(e))),Ar.length&&!hn&&Xc()},hm=function(e){var t=parseFloat(e);return(t||t===0)&&(e+"").match(w_).length<2?t:on(e)?e.trim():e},fm=function(e){return e},si=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},D_=function(e){return function(t,n){for(var i in n)i in t||i==="duration"&&e||i==="ease"||(t[i]=n[i])}},ra=function(e,t){for(var n in t)e[n]=t[n];return e},Hf=function r(e,t){for(var n in t)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(e[n]=Bi(t[n])?r(e[n]||(e[n]={}),t[n]):t[n]);return e},jc=function(e,t){var n={},i;for(i in e)i in t||(n[i]=e[i]);return n},$a=function(e){var t=e.parent||Ft,n=e.keyframes?D_(bn(e.keyframes)):si;if(On(e.inherit))for(;t;)n(e,t.vars.defaults),t=t.parent||t._dp;return e},L_=function(e,t){for(var n=e.length,i=n===t.length;i&&n--&&e[n]===t[n];);return n<0},dm=function(e,t,n,i,s){var a=e[i],o;if(s)for(o=t[s];a&&a[s]>o;)a=a._prev;return a?(t._next=a._next,a._next=t):(t._next=e[n],e[n]=t),t._next?t._next._prev=t:e[i]=t,t._prev=a,t.parent=t._dp=e,t},ul=function(e,t,n,i){n===void 0&&(n="_first"),i===void 0&&(i="_last");var s=t._prev,a=t._next;s?s._next=a:e[n]===t&&(e[n]=a),a?a._prev=s:e[i]===t&&(e[i]=s),t._next=t._prev=t.parent=null},Ir=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},os=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var n=e;n;)n._dirty=1,n=n.parent;return e},I_=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},Mu=function(e,t,n,i){return e._startAt&&(hn?e._startAt.revert(Ac):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,i))},N_=function r(e){return!e||e._ts&&r(e.parent)},Gf=function(e){return e._repeat?sa(e._tTime,e=e.duration()+e._rDelay)*e:0},sa=function(e,t){var n=Math.floor(e=Ut(e/t));return e&&n===e?n-1:n},qc=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},hl=function(e){return e._end=Ut(e._start+(e._tDur/Math.abs(e._ts||e._rts||Mt)||0))},fl=function(e,t){var n=e._dp;return n&&n.smoothChildTiming&&e._ts&&(e._start=Ut(n._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),hl(e),n._dirty||os(n,e)),e},pm=function(e,t){var n;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(n=qc(e.rawTime(),t),(!t._dur||Po(0,t.totalDuration(),n)-t._tTime>Mt)&&t.render(n,!0)),os(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(n=e;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;e._zTime=-Mt}},Ii=function(e,t,n,i){return t.parent&&Ir(t),t._start=Ut((ar(n)?n:!n&&Yc(t)&&(!e._last||e._last._start>=e._time)?e._last?e._last._start:e._time:n||e!==Ft?ui(e,n,t):e._time)+t._delay),t._end=Ut(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),dm(e,t,"_first","_last",e._sort?"_start":0),Yc(t)||(e._recent=t),i||pm(e,t),e._ts<0&&fl(e,e._tTime),e},mm=function(e,t){return(ri.ScrollTrigger||Vh("scrollTrigger",t))&&ri.ScrollTrigger.create(t,e)},gm=function(e,t,n,i,s){if(Kh(e,t,s),!e._initted)return 1;if(!n&&e._pt&&!hn&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&cm!==Qn.frame)return Ar.push(e),e._lazy=[s,i],1},U_=function r(e){var t=e.parent;return t&&t._ts&&t._initted&&!t._lock&&(t.rawTime()<0||r(t))},Yc=function(e){var t=e.data;return t==="isFromStart"||t==="isStart"},F_=function(e,t,n,i){var s=e.ratio,a=t<0||!t&&(!e._start&&U_(e)&&!(!e._initted&&Yc(e))||(e._ts<0||e._dp._ts<0)&&!Yc(e))?0:1,o=e._rDelay,c=0,l,u,h;if(o&&e._repeat&&(c=Po(0,e._tDur,t),u=sa(c,o),e._yoyo&&u&1&&(a=1-a),u!==sa(e._tTime,o)&&(s=1-a,e.vars.repeatRefresh&&e._initted&&e.invalidate())),a!==s||hn||i||e._zTime===Mt||!t&&e._zTime){if(!e._initted&&gm(e,t,i,n,c))return;for(h=e._zTime,e._zTime=t||(n?Mt:0),n||(n=t&&!h),e.ratio=a,e._from&&(a=1-a),e._time=0,e._tTime=c,l=e._pt;l;)l.r(a,l.d),l=l._next;t<0&&Mu(e,t,n,!0),e._onUpdate&&!n&&ei(e,"onUpdate"),c&&e._repeat&&!n&&e.parent&&ei(e,"onRepeat"),(t>=e._tDur||t<0)&&e.ratio===a&&(a&&Ir(e,1),!n&&!hn&&(ei(e,a?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=t)},O_=function(e,t,n){var i;if(n>t)for(i=e._first;i&&i._start<=n;){if(i.data==="isPause"&&i._start>t)return i;i=i._next}else for(i=e._last;i&&i._start>=n;){if(i.data==="isPause"&&i._start<t)return i;i=i._prev}},aa=function(e,t,n,i){var s=e._repeat,a=Ut(t)||0,o=e._tTime/e._tDur;return o&&!i&&(e._time*=a/e._dur),e._dur=a,e._tDur=s?s<0?1e10:Ut(a*(s+1)+e._rDelay*s):a,o>0&&!i&&fl(e,e._tTime=e._tDur*o),e.parent&&hl(e),n||os(e.parent,e),e},Vf=function(e){return e instanceof Nn?os(e):aa(e,e._dur)},k_={_start:0,endTime:ho,totalDuration:ho},ui=function r(e,t,n){var i=e.labels,s=e._recent||k_,a=e.duration()>=mi?s.endTime(!1):e._dur,o,c,l;return on(t)&&(isNaN(t)||t in i)?(c=t.charAt(0),l=t.substr(-1)==="%",o=t.indexOf("="),c==="<"||c===">"?(o>=0&&(t=t.replace(/=/,"")),(c==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(t.substr(1))||0)*(l?(o<0?s:n).totalDuration()/100:1)):o<0?(t in i||(i[t]=a),i[t]):(c=parseFloat(t.charAt(o-1)+t.substr(o+1)),l&&n&&(c=c/100*(bn(n)?n[0]:n).totalDuration()),o>1?r(e,t.substr(0,o-1),n)+c:a+c)):t==null?a:+t},Ja=function(e,t,n){var i=ar(t[1]),s=(i?2:1)+(e<2?0:1),a=t[s],o,c;if(i&&(a.duration=t[1]),a.parent=n,e){for(o=a,c=n;c&&!("immediateRender"in o);)o=c.vars.defaults||{},c=On(c.vars.inherit)&&c.parent;a.immediateRender=On(o.immediateRender),e<2?a.runBackwards=1:a.startAt=t[s-1]}return new qt(t[0],a,t[s+1])},Or=function(e,t){return e||e===0?t(e):t},Po=function(e,t,n){return n<e?e:n>t?t:n},gn=function(e,t){return!on(e)||!(t=A_.exec(e))?"":t[1]},B_=function(e,t,n){return Or(n,function(i){return Po(e,t,i)})},Tu=[].slice,_m=function(e,t){return e&&Bi(e)&&"length"in e&&(!t&&!e.length||e.length-1 in e&&Bi(e[0]))&&!e.nodeType&&e!==Pi},z_=function(e,t,n){return n===void 0&&(n=[]),e.forEach(function(i){var s;return on(i)&&!t||_m(i,1)?(s=n).push.apply(s,gi(i)):n.push(i)})||n},gi=function(e,t,n){return Lt&&!t&&Lt.selector?Lt.selector(e):on(e)&&!n&&(yu||!oa())?Tu.call((t||Gh).querySelectorAll(e),0):bn(e)?z_(e,n):_m(e)?Tu.call(e,0):e?[e]:[]},Eu=function(e){return e=gi(e)[0]||uo("Invalid scope")||{},function(t){var n=e.current||e.nativeElement||e;return gi(t,n.querySelectorAll?n:n===e?uo("Invalid scope")||Gh.createElement("div"):e)}},bm=function(e){return e.sort(function(){return .5-Math.random()})},vm=function(e){if(zt(e))return e;var t=Bi(e)?e:{each:e},n=cs(t.ease),i=t.from||0,s=parseFloat(t.base)||0,a={},o=i>0&&i<1,c=isNaN(i)||o,l=t.axis,u=i,h=i;return on(i)?u=h={center:.5,edges:.5,end:1}[i]||0:!o&&c&&(u=i[0],h=i[1]),function(f,d,g){var _=(g||t).length,m=a[_],p,v,y,b,M,E,T,R,x;if(!m){if(x=t.grid==="auto"?0:(t.grid||[1,mi])[1],!x){for(T=-mi;T<(T=g[x++].getBoundingClientRect().left)&&x<_;);x<_&&x--}for(m=a[_]=[],p=c?Math.min(x,_)*u-.5:i%x,v=x===mi?0:c?_*h/x-.5:i/x|0,T=0,R=mi,E=0;E<_;E++)y=E%x-p,b=v-(E/x|0),m[E]=M=l?Math.abs(l==="y"?b:y):tm(y*y+b*b),M>T&&(T=M),M<R&&(R=M);i==="random"&&bm(m),m.max=T-R,m.min=R,m.v=_=(parseFloat(t.amount)||parseFloat(t.each)*(x>_?_-1:l?l==="y"?_/x:x:Math.max(x,_/x))||0)*(i==="edges"?-1:1),m.b=_<0?s-_:s,m.u=gn(t.amount||t.each)||0,n=n&&_<0?Q_(n):n}return _=(m[f]-m.min)/m.max||0,Ut(m.b+(n?n(_):_)*m.v)+m.u}},wu=function(e){var t=Math.pow(10,((e+"").split(".")[1]||"").length);return function(n){var i=Ut(Math.round(parseFloat(n)/e)*e*t);return(i-i%1)/t+(ar(n)?0:gn(n))}},xm=function(e,t){var n=bn(e),i,s;return!n&&Bi(e)&&(i=n=e.radius||mi,e.values?(e=gi(e.values),(s=!ar(e[0]))&&(i*=i)):e=wu(e.increment)),Or(t,n?zt(e)?function(a){return s=e(a),Math.abs(s-a)<=i?s:a}:function(a){for(var o=parseFloat(s?a.x:a),c=parseFloat(s?a.y:0),l=mi,u=0,h=e.length,f,d;h--;)s?(f=e[h].x-o,d=e[h].y-c,f=f*f+d*d):f=Math.abs(e[h]-o),f<l&&(l=f,u=h);return u=!i||l<=i?e[u]:a,s||u===a||ar(a)?u:u+gn(a)}:wu(e))},ym=function(e,t,n,i){return Or(bn(e)?!t:n===!0?!!(n=0):!i,function(){return bn(e)?e[~~(Math.random()*e.length)]:(n=n||1e-5)&&(i=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((e-n/2+Math.random()*(t-e+n*.99))/n)*n*i)/i})},H_=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(i){return t.reduce(function(s,a){return a(s)},i)}},G_=function(e,t){return function(n){return e(parseFloat(n))+(t||gn(n))}},V_=function(e,t,n){return Mm(e,t,0,1,n)},Sm=function(e,t,n){return Or(n,function(i){return e[~~t(i)]})},W_=function r(e,t,n){var i=t-e;return bn(e)?Sm(e,r(0,e.length),t):Or(n,function(s){return(i+(s-e)%i)%i+e})},X_=function r(e,t,n){var i=t-e,s=i*2;return bn(e)?Sm(e,r(0,e.length-1),t):Or(n,function(a){return a=(s+(a-e)%s)%s||0,e+(a>i?s-a:a)})},fo=function(e){return e.replace(T_,function(t){var n=t.indexOf("[")+1,i=t.substring(n||7,n?t.indexOf("]"):t.length-1).split(E_);return ym(n?i:+i[0],n?0:+i[1],+i[2]||1e-5)})},Mm=function(e,t,n,i,s){var a=t-e,o=i-n;return Or(s,function(c){return n+((c-e)/a*o||0)})},j_=function r(e,t,n,i){var s=isNaN(e+t)?0:function(d){return(1-d)*e+d*t};if(!s){var a=on(e),o={},c,l,u,h,f;if(n===!0&&(i=1)&&(n=null),a)e={p:e},t={p:t};else if(bn(e)&&!bn(t)){for(u=[],h=e.length,f=h-2,l=1;l<h;l++)u.push(r(e[l-1],e[l]));h--,s=function(g){g*=h;var _=Math.min(f,~~g);return u[_](g-_)},n=t}else i||(e=ra(bn(e)?[]:{},e));if(!u){for(c in t)Yh.call(o,e,c,"get",t[c]);s=function(g){return Zh(g,o)||(a?e.p:e)}}}return Or(n,s)},Wf=function(e,t,n){var i=e.labels,s=mi,a,o,c;for(a in i)o=i[a]-t,o<0==!!n&&o&&s>(o=Math.abs(o))&&(c=a,s=o);return c},ei=function(e,t,n){var i=e.vars,s=i[t],a=Lt,o=e._ctx,c,l,u;if(s)return c=i[t+"Params"],l=i.callbackScope||e,n&&Ar.length&&Xc(),o&&(Lt=o),u=c?s.apply(l,c):s.call(l),Lt=a,u},Ha=function(e){return Ir(e),e.scrollTrigger&&e.scrollTrigger.kill(!!hn),e.progress()<1&&ei(e,"onInterrupt"),e},Ws,Tm=[],Em=function(e){if(e)if(e=!e.name&&e.default||e,Hh()||e.headless){var t=e.name,n=zt(e),i=t&&!n&&e.init?function(){this._props=[]}:e,s={init:ho,render:Zh,add:Yh,kill:lb,modifier:cb,rawVars:0},a={targetTest:0,get:0,getSetter:Jh,aliases:{},register:0};if(oa(),e!==i){if($n[t])return;si(i,si(jc(e,s),a)),ra(i.prototype,ra(s,jc(e,a))),$n[i.prop=t]=i,e.targetTest&&(Rc.push(i),Wh[t]=1),t=(t==="css"?"CSS":t.charAt(0).toUpperCase()+t.substr(1))+"Plugin"}om(t,i),e.register&&e.register(Gn,i,Bn)}else Tm.push(e)},wt=255,Ga={aqua:[0,wt,wt],lime:[0,wt,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,wt],navy:[0,0,128],white:[wt,wt,wt],olive:[128,128,0],yellow:[wt,wt,0],orange:[wt,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[wt,0,0],pink:[wt,192,203],cyan:[0,wt,wt],transparent:[wt,wt,wt,0]},yl=function(e,t,n){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(n-t)*e*6:e<.5?n:e*3<2?t+(n-t)*(2/3-e)*6:t)*wt+.5|0},wm=function(e,t,n){var i=e?ar(e)?[e>>16,e>>8&wt,e&wt]:0:Ga.black,s,a,o,c,l,u,h,f,d,g;if(!i){if(e.substr(-1)===","&&(e=e.substr(0,e.length-1)),Ga[e])i=Ga[e];else if(e.charAt(0)==="#"){if(e.length<6&&(s=e.charAt(1),a=e.charAt(2),o=e.charAt(3),e="#"+s+s+a+a+o+o+(e.length===5?e.charAt(4)+e.charAt(4):"")),e.length===9)return i=parseInt(e.substr(1,6),16),[i>>16,i>>8&wt,i&wt,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),i=[e>>16,e>>8&wt,e&wt]}else if(e.substr(0,3)==="hsl"){if(i=g=e.match(Bf),!t)c=+i[0]%360/360,l=+i[1]/100,u=+i[2]/100,a=u<=.5?u*(l+1):u+l-u*l,s=u*2-a,i.length>3&&(i[3]*=1),i[0]=yl(c+1/3,s,a),i[1]=yl(c,s,a),i[2]=yl(c-1/3,s,a);else if(~e.indexOf("="))return i=e.match(im),n&&i.length<4&&(i[3]=1),i}else i=e.match(Bf)||Ga.transparent;i=i.map(Number)}return t&&!g&&(s=i[0]/wt,a=i[1]/wt,o=i[2]/wt,h=Math.max(s,a,o),f=Math.min(s,a,o),u=(h+f)/2,h===f?c=l=0:(d=h-f,l=u>.5?d/(2-h-f):d/(h+f),c=h===s?(a-o)/d+(a<o?6:0):h===a?(o-s)/d+2:(s-a)/d+4,c*=60),i[0]=~~(c+.5),i[1]=~~(l*100+.5),i[2]=~~(u*100+.5)),n&&i.length<4&&(i[3]=1),i},Am=function(e){var t=[],n=[],i=-1;return e.split(Rr).forEach(function(s){var a=s.match(Vs)||[];t.push.apply(t,a),n.push(i+=a.length+1)}),t.c=n,t},Xf=function(e,t,n){var i="",s=(e+i).match(Rr),a=t?"hsla(":"rgba(",o=0,c,l,u,h;if(!s)return e;if(s=s.map(function(f){return(f=wm(f,t,1))&&a+(t?f[0]+","+f[1]+"%,"+f[2]+"%,"+f[3]:f.join(","))+")"}),n&&(u=Am(e),c=n.c,c.join(i)!==u.c.join(i)))for(l=e.replace(Rr,"1").split(Vs),h=l.length-1;o<h;o++)i+=l[o]+(~c.indexOf(o)?s.shift()||a+"0,0,0,0)":(u.length?u:s.length?s:n).shift());if(!l)for(l=e.split(Rr),h=l.length-1;o<h;o++)i+=l[o]+s[o];return i+l[h]},Rr=(function(){var r="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",e;for(e in Ga)r+="|"+e+"\\b";return new RegExp(r+")","gi")})(),q_=/hsl[a]?\(/,Rm=function(e){var t=e.join(" "),n;if(Rr.lastIndex=0,Rr.test(t))return n=q_.test(t),e[1]=Xf(e[1],n),e[0]=Xf(e[0],n,Am(e[1])),!0},po,Qn=(function(){var r=Date.now,e=500,t=33,n=r(),i=n,s=1e3/240,a=s,o=[],c,l,u,h,f,d,g=function _(m){var p=r()-i,v=m===!0,y,b,M,E;if((p>e||p<0)&&(n+=p-t),i+=p,M=i-n,y=M-a,(y>0||v)&&(E=++h.frame,f=M-h.time*1e3,h.time=M=M/1e3,a+=y+(y>=s?0:s-y),b=1),v||(c=l(_)),b)for(d=0;d<o.length;d++)o[d](M,f,E,m)};return h={time:0,frame:0,tick:function(){g(!0)},deltaRatio:function(m){return f/(1e3/(m||60))},wake:function(){sm&&(!yu&&Hh()&&(Pi=yu=window,Gh=Pi.document||{},ri.gsap=Gn,(Pi.gsapVersions||(Pi.gsapVersions=[])).push(Gn.version),am(Wc||Pi.GreenSockGlobals||!Pi.gsap&&Pi||{}),Tm.forEach(Em)),u=typeof requestAnimationFrame<"u"&&requestAnimationFrame,c&&h.sleep(),l=u||function(m){return setTimeout(m,a-h.time*1e3+1|0)},po=1,g(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(c),po=0,l=ho},lagSmoothing:function(m,p){e=m||1/0,t=Math.min(p||33,e)},fps:function(m){s=1e3/(m||240),a=h.time*1e3+s},add:function(m,p,v){var y=p?function(b,M,E,T){m(b,M,E,T),h.remove(y)}:m;return h.remove(m),o[v?"unshift":"push"](y),oa(),y},remove:function(m,p){~(p=o.indexOf(m))&&o.splice(p,1)&&d>=p&&d--},_listeners:o},h})(),oa=function(){return!po&&Qn.wake()},ht={},Y_=/^[\d.\-M][\d.\-,\s]/,K_=/["']/g,$_=function(e){for(var t={},n=e.substr(1,e.length-3).split(":"),i=n[0],s=1,a=n.length,o,c,l;s<a;s++)c=n[s],o=s!==a-1?c.lastIndexOf(","):c.length,l=c.substr(0,o),t[i]=isNaN(l)?l.replace(K_,"").trim():+l,i=c.substr(o+1).trim();return t},J_=function(e){var t=e.indexOf("(")+1,n=e.indexOf(")"),i=e.indexOf("(",t);return e.substring(t,~i&&i<n?e.indexOf(")",n+1):n)},Z_=function(e){var t=(e+"").split("("),n=ht[t[0]];return n&&t.length>1&&n.config?n.config.apply(null,~e.indexOf("{")?[$_(t[1])]:J_(e).split(",").map(hm)):ht._CE&&Y_.test(e)?ht._CE("",e):n},Q_=function(e){return function(t){return 1-e(1-t)}},cs=function(e,t){return e&&(zt(e)?e:ht[e]||Z_(e))||t},bs=function(e,t,n,i){n===void 0&&(n=function(c){return 1-t(1-c)}),i===void 0&&(i=function(c){return c<.5?t(c*2)/2:1-t((1-c)*2)/2});var s={easeIn:t,easeOut:n,easeInOut:i},a;return kn(e,function(o){ht[o]=ri[o]=s,ht[a=o.toLowerCase()]=n;for(var c in s)ht[a+(c==="easeIn"?".in":c==="easeOut"?".out":".inOut")]=ht[o+"."+c]=s[c]}),s},Cm=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},Sl=function r(e,t,n){var i=t>=1?t:1,s=(n||(e?.3:.45))/(t<1?t:1),a=s/xu*(Math.asin(1/i)||0),o=function(u){return u===1?1:i*Math.pow(2,-10*u)*M_((u-a)*s)+1},c=e==="out"?o:e==="in"?function(l){return 1-o(1-l)}:Cm(o);return s=xu/s,c.config=function(l,u){return r(e,l,u)},c},Ml=function r(e,t){t===void 0&&(t=1.70158);var n=function(a){return a?--a*a*((t+1)*a+t)+1:0},i=e==="out"?n:e==="in"?function(s){return 1-n(1-s)}:Cm(n);return i.config=function(s){return r(e,s)},i};kn("Linear,Quad,Cubic,Quart,Quint,Strong",function(r,e){var t=e<5?e+1:e;bs(r+",Power"+(t-1),e?function(n){return Math.pow(n,t)}:function(n){return n},function(n){return 1-Math.pow(1-n,t)},function(n){return n<.5?Math.pow(n*2,t)/2:1-Math.pow((1-n)*2,t)/2})});ht.Linear.easeNone=ht.none=ht.Linear.easeIn;bs("Elastic",Sl("in"),Sl("out"),Sl());(function(r,e){var t=1/e,n=2*t,i=2.5*t,s=function(o){return o<t?r*o*o:o<n?r*Math.pow(o-1.5/e,2)+.75:o<i?r*(o-=2.25/e)*o+.9375:r*Math.pow(o-2.625/e,2)+.984375};bs("Bounce",function(a){return 1-s(1-a)},s)})(7.5625,2.75);bs("Expo",function(r){return Math.pow(2,10*(r-1))*r+r*r*r*r*r*r*(1-r)});bs("Circ",function(r){return-(tm(1-r*r)-1)});bs("Sine",function(r){return r===1?1:-S_(r*x_)+1});bs("Back",Ml("in"),Ml("out"),Ml());ht.SteppedEase=ht.steps=ri.SteppedEase={config:function(e,t){e===void 0&&(e=1);var n=1/e,i=e+(t?0:1),s=t?1:0,a=1-Mt;return function(o){return((i*Po(0,a,o)|0)+s)*n}}};lo.ease=ht["quad.out"];kn("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(r){return Xh+=r+","+r+"Params,"});var Pm=function(e,t){this.id=y_++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:lm,this.set=t?t.getSetter:Jh},mo=(function(){function r(t){this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat===1/0?-2:t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,aa(this,+t.duration,1,1),this.data=t.data,Lt&&(this._ctx=Lt,Lt.data.push(this)),po||Qn.wake()}var e=r.prototype;return e.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},e.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},e.totalDuration=function(n){return arguments.length?(this._dirty=0,aa(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},e.totalTime=function(n,i){if(oa(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(fl(this,n),!s._dp||s.parent||pm(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&Ii(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!i||this._initted&&Math.abs(this._zTime)===Mt||!this._initted&&this._dur&&n||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),um(this,n,i)),this},e.time=function(n,i){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+Gf(this))%(this._dur+this._rDelay)||(n?this._dur:0),i):this._time},e.totalProgress=function(n,i){return arguments.length?this.totalTime(this.totalDuration()*n,i):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},e.progress=function(n,i){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+Gf(this),i):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},e.iteration=function(n,i){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*s,i):this._repeat?sa(this._tTime,s)+1:1},e.timeScale=function(n,i){if(!arguments.length)return this._rts===-Mt?0:this._rts;if(this._rts===n)return this;var s=this.parent&&this._ts?qc(this.parent._time,this):this._tTime,a=this._rts<0;this._rts=+n||0,this._ts=this._ps||n===-Mt?0:this._rts;var o=this.totalDuration();return(a!==this._rts<0||s>0&&s<o)&&this.totalTime(Po(-Math.abs(this._delay),o,s),i!==!1),hl(this),I_(this)},e.paused=function(n){if(!arguments.length)return this._ps;if(this._ps!==n)if(this._ps=n,n)this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0;else{oa(),this._ts=this._rts;var i=this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,s=this.progress()===1&&Math.abs(this._zTime)!==Mt,a;if(s)for(this._tTime-=Mt,a=this._first;a;){if(!a._dur&&a._zTime<0&&a._ts&&a._start<=i+Mt){s=!1;break}a=a._next}this.totalTime(i,s)}return this},e.startTime=function(n){if(arguments.length){this._start=Ut(n);var i=this.parent||this._dp;return i&&(i._sort||!this.parent)&&Ii(i,this,this._start-this._delay),this}return this._start},e.endTime=function(n){return this._start+(On(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},e.rawTime=function(n){var i=this.parent||this._dp;return i?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?qc(i.rawTime(n),this):this._tTime:this._tTime},e.revert=function(n){n===void 0&&(n=C_);var i=hn;return hn=n,qh(this)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),hn=i,this},e.globalTime=function(n){for(var i=this,s=arguments.length?n:i.rawTime();i;)s=i._start+s/(Math.abs(i._ts)||1),i=i._dp;return!this.parent&&this._sat?this._sat.globalTime(n):s},e.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,Vf(this)):this._repeat===-2?1/0:this._repeat},e.repeatDelay=function(n){if(arguments.length){var i=this._time;return this._rDelay=n,Vf(this),i?this.time(i):this}return this._rDelay},e.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},e.seek=function(n,i){return this.totalTime(ui(this,n),On(i))},e.restart=function(n,i){return this.play().totalTime(n?-this._delay:0,On(i)),this._dur||(this._zTime=-Mt),this},e.play=function(n,i){return n!=null&&this.seek(n,i),this.reversed(!1).paused(!1)},e.reverse=function(n,i){return n!=null&&this.seek(n||this.totalDuration(),i),this.reversed(!0).paused(!1)},e.pause=function(n,i){return n!=null&&this.seek(n,i),this.paused(!0)},e.resume=function(){return this.paused(!1)},e.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-Mt:0)),this):this._rts<0},e.invalidate=function(){return this._initted=this._act=0,this._zTime=-Mt,this},e.isActive=function(){var n=this.parent||this._dp,i=this._start,s;return!!(!n||this._ts&&this._initted&&n.isActive()&&(s=n.rawTime(!0))>=i&&s<this.endTime(!0)-Mt)},e.eventCallback=function(n,i,s){var a=this.vars;return arguments.length>1?(i?(a[n]=i,s&&(a[n+"Params"]=s),n==="onUpdate"&&(this._onUpdate=i)):delete a[n],this):a[n]},e.then=function(n){var i=this,s=i._prom;return new Promise(function(a){var o=zt(n)?n:fm,c=function(){var u=i.then;i.then=null,s&&s(),zt(o)&&(o=o(i))&&(o.then||o===i)&&(i.then=u),a(o),i.then=u};i._initted&&i.totalProgress()===1&&i._ts>=0||!i._tTime&&i._ts<0?c():i._prom=c})},e.kill=function(){Ha(this)},r})();si(mo.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-Mt,_prom:0,_ps:!1,_rts:1});var Nn=(function(r){em(e,r);function e(n,i){var s;return n===void 0&&(n={}),s=r.call(this,n)||this,s.labels={},s.smoothChildTiming=!!n.smoothChildTiming,s.autoRemoveChildren=!!n.autoRemoveChildren,s._sort=On(n.sortChildren),Ft&&Ii(n.parent||Ft,$i(s),i),n.reversed&&s.reverse(),n.paused&&s.paused(!0),n.scrollTrigger&&mm($i(s),n.scrollTrigger),s}var t=e.prototype;return t.to=function(i,s,a){return Ja(0,arguments,this),this},t.from=function(i,s,a){return Ja(1,arguments,this),this},t.fromTo=function(i,s,a,o){return Ja(2,arguments,this),this},t.set=function(i,s,a){return s.duration=0,s.parent=this,$a(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new qt(i,s,ui(this,a),1),this},t.call=function(i,s,a){return Ii(this,qt.delayedCall(0,i,s),a)},t.staggerTo=function(i,s,a,o,c,l,u){return a.duration=s,a.stagger=a.stagger||o,a.onComplete=l,a.onCompleteParams=u,a.parent=this,new qt(i,a,ui(this,c)),this},t.staggerFrom=function(i,s,a,o,c,l,u){return a.runBackwards=1,$a(a).immediateRender=On(a.immediateRender),this.staggerTo(i,s,a,o,c,l,u)},t.staggerFromTo=function(i,s,a,o,c,l,u,h){return o.startAt=a,$a(o).immediateRender=On(o.immediateRender),this.staggerTo(i,s,o,c,l,u,h)},t.render=function(i,s,a){var o=this._time,c=this._dirty?this.totalDuration():this._tDur,l=this._dur,u=i<=0?0:Ut(i),h=this._zTime<0!=i<0&&(this._initted||!l),f,d,g,_,m,p,v,y,b,M,E,T;if(this!==Ft&&u>c&&i>=0&&(u=c),u!==this._tTime||a||h){if(o!==this._time&&l&&(u+=this._time-o,i+=this._time-o),f=u,b=this._start,y=this._ts,p=!y,h&&(l||(o=this._zTime),(i||!s)&&(this._zTime=i)),this._repeat){if(E=this._yoyo,m=l+this._rDelay,this._repeat<-1&&i<0)return this.totalTime(m*100+i,s,a);if(f=Ut(u%m),u===c?(_=this._repeat,f=l):(M=Ut(u/m),_=~~M,_&&_===M&&(f=l,_--),f>l&&(f=l)),M=sa(this._tTime,m),!o&&this._tTime&&M!==_&&this._tTime-M*m-this._dur<=0&&(M=_),E&&_&1&&(f=l-f,T=1),_!==M&&!this._lock){var R=E&&M&1,x=R===(E&&_&1);if(_<M&&(R=!R),o=R?0:u%l?l:u,this._lock=1,this.render(o||(T?0:Ut(_*m)),s,!l)._lock=0,this._tTime=u,!s&&this.parent&&ei(this,"onRepeat"),this.vars.repeatRefresh&&!T&&(this.invalidate()._lock=1,M=_),o&&o!==this._time||p!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(l=this._dur,c=this._tDur,x&&(this._lock=2,o=R?l:-1e-4,this.render(o,!0),this.vars.repeatRefresh&&!T&&this.invalidate()),this._lock=0,!this._ts&&!p)return this}}if(this._hasPause&&!this._forcing&&this._lock<2&&(v=O_(this,Ut(o),Ut(f)),v&&(u-=f-(f=v._start))),this._tTime=u,this._time=f,this._act=!!y,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=i,o=0),!o&&u&&l&&!s&&!M&&(ei(this,"onStart"),this._tTime!==u))return this;if(f>=o&&i>=0)for(d=this._first;d;){if(g=d._next,(d._act||f>=d._start)&&d._ts&&v!==d){if(d.parent!==this)return this.render(i,s,a);if(d.render(d._ts>0?(f-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(f-d._start)*d._ts,s,a),f!==this._time||!this._ts&&!p){v=0,g&&(u+=this._zTime=-Mt);break}}d=g}else{d=this._last;for(var S=i<0?i:f;d;){if(g=d._prev,(d._act||S<=d._end)&&d._ts&&v!==d){if(d.parent!==this)return this.render(i,s,a);if(d.render(d._ts>0?(S-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(S-d._start)*d._ts,s,a||hn&&qh(d)),f!==this._time||!this._ts&&!p){v=0,g&&(u+=this._zTime=S?-Mt:Mt);break}}d=g}}if(v&&!s&&(this.pause(),v.render(f>=o?0:-Mt)._zTime=f>=o?1:-1,this._ts))return this._start=b,hl(this),this.render(i,s,a);this._onUpdate&&!s&&ei(this,"onUpdate",!0),(u===c&&this._tTime>=this.totalDuration()||!u&&o)&&(b===this._start||Math.abs(y)!==Math.abs(this._ts))&&(this._lock||((i||!l)&&(u===c&&this._ts>0||!u&&this._ts<0)&&Ir(this,1),!s&&!(i<0&&!o)&&(u||o||!c)&&(ei(this,u===c&&i>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(u<c&&this.timeScale()>0)&&this._prom())))}return this},t.add=function(i,s){var a=this;if(ar(s)||(s=ui(this,s,i)),!(i instanceof mo)){if(bn(i))return i.forEach(function(o){return a.add(o,s)}),this;if(on(i))return this.addLabel(i,s);if(zt(i))i=qt.delayedCall(0,i);else return this}return this!==i?Ii(this,i,s):this},t.getChildren=function(i,s,a,o){i===void 0&&(i=!0),s===void 0&&(s=!0),a===void 0&&(a=!0),o===void 0&&(o=-mi);for(var c=[],l=this._first;l;)l._start>=o&&(l instanceof qt?s&&c.push(l):(a&&c.push(l),i&&c.push.apply(c,l.getChildren(!0,s,a)))),l=l._next;return c},t.getById=function(i){for(var s=this.getChildren(1,1,1),a=s.length;a--;)if(s[a].vars.id===i)return s[a]},t.remove=function(i){return on(i)?this.removeLabel(i):zt(i)?this.killTweensOf(i):(i.parent===this&&ul(this,i),i===this._recent&&(this._recent=this._last),os(this))},t.totalTime=function(i,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=Ut(Qn.time-(this._ts>0?i/this._ts:(this.totalDuration()-i)/-this._ts))),r.prototype.totalTime.call(this,i,s),this._forcing=0,this):this._tTime},t.addLabel=function(i,s){return this.labels[i]=ui(this,s),this},t.removeLabel=function(i){return delete this.labels[i],this},t.addPause=function(i,s,a){var o=qt.delayedCall(0,s||ho,a);return o.data="isPause",this._hasPause=1,Ii(this,o,ui(this,i))},t.removePause=function(i){var s=this._first;for(i=ui(this,i);s;)s._start===i&&s.data==="isPause"&&Ir(s),s=s._next},t.killTweensOf=function(i,s,a){for(var o=this.getTweensOf(i,a),c=o.length;c--;)yr!==o[c]&&o[c].kill(i,s);return this},t.getTweensOf=function(i,s){for(var a=[],o=gi(i),c=this._first,l=ar(s),u;c;)c instanceof qt?P_(c._targets,o)&&(l?(!yr||c._initted&&c._ts)&&c.globalTime(0)<=s&&c.globalTime(c.totalDuration())>s:!s||c.isActive())&&a.push(c):(u=c.getTweensOf(o,s)).length&&a.push.apply(a,u),c=c._next;return a},t.tweenTo=function(i,s){s=s||{};var a=this,o=ui(a,i),c=s,l=c.startAt,u=c.onStart,h=c.onStartParams,f=c.immediateRender,d,g=qt.to(a,si({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:o,overwrite:"auto",duration:s.duration||Math.abs((o-(l&&"time"in l?l.time:a._time))/a.timeScale())||Mt,onStart:function(){if(a.pause(),!d){var m=s.duration||Math.abs((o-(l&&"time"in l?l.time:a._time))/a.timeScale());g._dur!==m&&aa(g,m,0,1).render(g._time,!0,!0),d=1}u&&u.apply(g,h||[])}},s));return f?g.render(0):g},t.tweenFromTo=function(i,s,a){return this.tweenTo(s,si({startAt:{time:ui(this,i)}},a))},t.recent=function(){return this._recent},t.nextLabel=function(i){return i===void 0&&(i=this._time),Wf(this,ui(this,i))},t.previousLabel=function(i){return i===void 0&&(i=this._time),Wf(this,ui(this,i),1)},t.currentLabel=function(i){return arguments.length?this.seek(i,!0):this.previousLabel(this._time+Mt)},t.shiftChildren=function(i,s,a){a===void 0&&(a=0);var o=this._first,c=this.labels,l;for(i=Ut(i);o;)o._start>=a&&(o._start+=i,o._end+=i),o=o._next;if(s)for(l in c)c[l]>=a&&(c[l]+=i);return os(this)},t.invalidate=function(i){var s=this._first;for(this._lock=0;s;)s.invalidate(i),s=s._next;return r.prototype.invalidate.call(this,i)},t.clear=function(i){i===void 0&&(i=!0);for(var s=this._first,a;s;)a=s._next,this.remove(s),s=a;return this._dp&&(this._time=this._tTime=this._pTime=0),i&&(this.labels={}),os(this)},t.totalDuration=function(i){var s=0,a=this,o=a._last,c=mi,l,u,h;if(arguments.length)return a.timeScale((a._repeat<0?a.duration():a.totalDuration())/(a.reversed()?-i:i));if(a._dirty){for(h=a.parent;o;)l=o._prev,o._dirty&&o.totalDuration(),u=o._start,u>c&&a._sort&&o._ts&&!a._lock?(a._lock=1,Ii(a,o,u-o._delay,1)._lock=0):c=u,u<0&&o._ts&&(s-=u,(!h&&!a._dp||h&&h.smoothChildTiming)&&(a._start+=Ut(u/a._ts),a._time-=u,a._tTime-=u),a.shiftChildren(-u,!1,-1/0),c=0),o._end>s&&o._ts&&(s=o._end),o=l;aa(a,a===Ft&&a._time>s?a._time:s,1,1),a._dirty=0}return a._tDur},e.updateRoot=function(i){if(Ft._ts&&(um(Ft,qc(i,Ft)),cm=Qn.frame),Qn.frame>=zf){zf+=ii.autoSleep||120;var s=Ft._first;if((!s||!s._ts)&&ii.autoSleep&&Qn._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||Qn.sleep()}}},e})(mo);si(Nn.prototype,{_lock:0,_hasPause:0,_forcing:0});var eb=function(e,t,n,i,s,a,o){var c=new Bn(this._pt,e,t,0,1,Um,null,s),l=0,u=0,h,f,d,g,_,m,p,v;for(c.b=n,c.e=i,n+="",i+="",(p=~i.indexOf("random("))&&(i=fo(i)),a&&(v=[n,i],a(v,e,t),n=v[0],i=v[1]),f=n.match(vl)||[];h=vl.exec(i);)g=h[0],_=i.substring(l,h.index),d?d=(d+1)%5:_.substr(-5)==="rgba("&&(d=1),g!==f[u++]&&(m=parseFloat(f[u-1])||0,c._pt={_next:c._pt,p:_||u===1?_:",",s:m,c:g.charAt(1)==="="?qs(m,g)-m:parseFloat(g)-m,m:d&&d<4?Math.round:0},l=vl.lastIndex);return c.c=l<i.length?i.substring(l,i.length):"",c.fp=o,(rm.test(i)||p)&&(c.e=0),this._pt=c,c},Yh=function(e,t,n,i,s,a,o,c,l,u){zt(i)&&(i=i(s||0,e,a));var h=e[t],f=n!=="get"?n:zt(h)?l?e[t.indexOf("set")||!zt(e["get"+t.substr(3)])?t:"get"+t.substr(3)](l):e[t]():h,d=zt(h)?l?sb:Im:$h,g;if(on(i)&&(~i.indexOf("random(")&&(i=fo(i)),i.charAt(1)==="="&&(g=qs(f,i)+(gn(f)||0),(g||g===0)&&(i=g))),!u||f!==i||Au)return!isNaN(f*i)&&i!==""?(g=new Bn(this._pt,e,t,+f||0,i-(f||0),typeof h=="boolean"?ob:Nm,0,d),l&&(g.fp=l),o&&g.modifier(o,this,e),this._pt=g):(!h&&!(t in e)&&Vh(t,i),eb.call(this,e,t,f,i,d,c||ii.stringFilter,l))},tb=function(e,t,n,i,s){if(zt(e)&&(e=Za(e,s,t,n,i)),!Bi(e)||e.style&&e.nodeType||bn(e)||nm(e))return on(e)?Za(e,s,t,n,i):e;var a={},o;for(o in e)a[o]=Za(e[o],s,t,n,i);return a},Dm=function(e,t,n,i,s,a){var o,c,l,u;if($n[e]&&(o=new $n[e]).init(s,o.rawVars?t[e]:tb(t[e],i,s,a,n),n,i,a)!==!1&&(n._pt=c=new Bn(n._pt,s,e,0,1,o.render,o,0,o.priority),n!==Ws))for(l=n._ptLookup[n._targets.indexOf(s)],u=o._props.length;u--;)l[o._props[u]]=c;return o},yr,Au,Kh=function r(e,t,n){var i=e.vars,s=i.ease,a=i.startAt,o=i.immediateRender,c=i.lazy,l=i.onUpdate,u=i.runBackwards,h=i.yoyoEase,f=i.keyframes,d=i.autoRevert,g=e._dur,_=e._startAt,m=e._targets,p=e.parent,v=p&&p.data==="nested"?p.vars.targets:m,y=e._overwrite==="auto"&&!Bh,b=e.timeline,M=i.easeReverse||h,E,T,R,x,S,C,I,U,z,W,V,j,H;if(b&&(!f||!s)&&(s="none"),e._ease=cs(s,lo.ease),e._rEase=M&&(cs(M)||e._ease),e._from=!b&&!!i.runBackwards,e._from&&(e.ratio=1),!b||f&&!i.stagger){if(U=m[0]?as(m[0]).harness:0,j=U&&i[U.prop],E=jc(i,Wh),_&&(_._zTime<0&&_.progress(1),t<0&&u&&o&&!d?_.render(-1,!0):_.revert(u&&g?Ac:R_),_._lazy=0),a){if(Ir(e._startAt=qt.set(m,si({data:"isStart",overwrite:!1,parent:p,immediateRender:!0,lazy:!_&&On(c),startAt:null,delay:0,onUpdate:l&&function(){return ei(e,"onUpdate")},stagger:0},a))),e._startAt._dp=0,e._startAt._sat=e,t<0&&(hn||!o&&!d)&&e._startAt.revert(Ac),o&&g&&t<=0&&n<=0){t&&(e._zTime=t);return}}else if(u&&g&&!_){if(t&&(o=!1),R=si({overwrite:!1,data:"isFromStart",lazy:o&&!_&&On(c),immediateRender:o,stagger:0,parent:p},E),j&&(R[U.prop]=j),Ir(e._startAt=qt.set(m,R)),e._startAt._dp=0,e._startAt._sat=e,t<0&&(hn?e._startAt.revert(Ac):e._startAt.render(-1,!0)),e._zTime=t,!o)r(e._startAt,Mt,Mt);else if(!t)return}for(e._pt=e._ptCache=0,c=g&&On(c)||c&&!g,T=0;T<m.length;T++){if(S=m[T],I=S._gsap||jh(m)[T]._gsap,e._ptLookup[T]=W={},Su[I.id]&&Ar.length&&Xc(),V=v===m?T:v.indexOf(S),U&&(z=new U).init(S,j||E,e,V,v)!==!1&&(e._pt=x=new Bn(e._pt,S,z.name,0,1,z.render,z,0,z.priority),z._props.forEach(function(te){W[te]=x}),z.priority&&(C=1)),!U||j)for(R in E)$n[R]&&(z=Dm(R,E,e,V,S,v))?z.priority&&(C=1):W[R]=x=Yh.call(e,S,R,"get",E[R],V,v,0,i.stringFilter);e._op&&e._op[T]&&e.kill(S,e._op[T]),y&&e._pt&&(yr=e,Ft.killTweensOf(S,W,e.globalTime(t)),H=!e.parent,yr=0),e._pt&&c&&(Su[I.id]=1)}C&&Fm(e),e._onInit&&e._onInit(e)}e._onUpdate=l,e._initted=(!e._op||e._pt)&&!H,f&&t<=0&&b.render(mi,!0,!0)},nb=function(e,t,n,i,s,a,o,c){var l=(e._pt&&e._ptCache||(e._ptCache={}))[t],u,h,f,d;if(!l)for(l=e._ptCache[t]=[],f=e._ptLookup,d=e._targets.length;d--;){if(u=f[d][t],u&&u.d&&u.d._pt)for(u=u.d._pt;u&&u.p!==t&&u.fp!==t;)u=u._next;if(!u)return Au=1,e.vars[t]="+=0",Kh(e,o),Au=0,c?uo(t+" not eligible for reset. Try splitting into individual properties"):1;l.push(u)}for(d=l.length;d--;)h=l[d],u=h._pt||h,u.s=(i||i===0)&&!s?i:u.s+(i||0)+a*u.c,u.c=n-u.s,h.e&&(h.e=Vt(n)+gn(h.e)),h.b&&(h.b=u.s+gn(h.b))},ib=function(e,t){var n=e[0]?as(e[0]).harness:0,i=n&&n.aliases,s,a,o,c;if(!i)return t;s=ra({},t);for(a in i)if(a in s)for(c=i[a].split(","),o=c.length;o--;)s[c[o]]=s[a];return s},rb=function(e,t,n,i){var s=t.ease||i||"power1.inOut",a,o;if(bn(t))o=n[e]||(n[e]=[]),t.forEach(function(c,l){return o.push({t:l/(t.length-1)*100,v:c,e:s})});else for(a in t)o=n[a]||(n[a]=[]),a==="ease"||o.push({t:parseFloat(e),v:t[a],e:s})},Za=function(e,t,n,i,s){return zt(e)?e.call(t,n,i,s):on(e)&&~e.indexOf("random(")?fo(e):e},Kc=Xh+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert",Lm={};kn(Kc+",id,stagger,delay,duration,paused,scrollTrigger",function(r){return Lm[r]=1});Kc=Kc.split(",");var qt=(function(r){em(e,r);function e(n,i,s,a){var o;typeof i=="number"&&(s.duration=i,i=s,s=null),o=r.call(this,a?i:$a(i))||this;var c=o.vars,l=c.duration,u=c.delay,h=c.immediateRender,f=c.stagger,d=c.overwrite,g=c.keyframes,_=c.defaults,m=c.scrollTrigger,p=i.parent||Ft,v=(bn(n)||nm(n)?ar(n[0]):"length"in i)?[n]:gi(n),y,b,M,E,T,R,x,S;if(o._targets=v.length?jh(v):uo("GSAP target "+n+" not found. https://gsap.com",!ii.nullTargetWarn)||[],o._ptLookup=[],o._overwrite=d,g||f||No(l)||No(u)){i=o.vars;var C=i.easeReverse||i.yoyoEase;if(y=o.timeline=new Nn({data:"nested",defaults:_||{},targets:p&&p.data==="nested"?p.vars.targets:v}),y.kill(),y.parent=y._dp=$i(o),y._start=0,f||No(l)||No(u)){if(E=v.length,x=f&&vm(f),Bi(f))for(T in f)~Kc.indexOf(T)&&(S||(S={}),S[T]=f[T]);for(b=0;b<E;b++)M=jc(i,Lm),M.stagger=0,C&&(M.easeReverse=C),S&&ra(M,S),R=v[b],M.duration=+Za(l,$i(o),b,R,v),M.delay=(+Za(u,$i(o),b,R,v)||0)-o._delay,!f&&E===1&&M.delay&&(o._delay=u=M.delay,o._start+=u,M.delay=0),y.to(R,M,x?x(b,R,v):0),y._ease=ht.none;y.duration()?l=u=0:o.timeline=0}else if(g){$a(si(y.vars.defaults,{ease:"none"})),y._ease=cs(g.ease||i.ease||"none");var I=0,U,z,W;if(bn(g))g.forEach(function(V){return y.to(v,V,">")}),y.duration();else{M={};for(T in g)T==="ease"||T==="easeEach"||rb(T,g[T],M,g.easeEach);for(T in M)for(U=M[T].sort(function(V,j){return V.t-j.t}),I=0,b=0;b<U.length;b++)z=U[b],W={ease:z.e,duration:(z.t-(b?U[b-1].t:0))/100*l},W[T]=z.v,y.to(v,W,I),I+=W.duration;y.duration()<l&&y.to({},{duration:l-y.duration()})}}l||o.duration(l=y.duration())}else o.timeline=0;return d===!0&&!Bh&&(yr=$i(o),Ft.killTweensOf(v),yr=0),Ii(p,$i(o),s),i.reversed&&o.reverse(),i.paused&&o.paused(!0),(h||!l&&!g&&o._start===Ut(p._time)&&On(h)&&N_($i(o))&&p.data!=="nested")&&(o._tTime=-Mt,o.render(Math.max(0,-u)||0)),m&&mm($i(o),m),o}var t=e.prototype;return t.render=function(i,s,a){var o=this._time,c=this._tDur,l=this._dur,u=i<0,h=i>c-Mt&&!u?c:i<Mt?0:i,f,d,g,_,m,p,v,y;if(!l)F_(this,i,s,a);else if(h!==this._tTime||!i||a||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==u||this._lazy){if(f=h,y=this.timeline,this._repeat){if(_=l+this._rDelay,this._repeat<-1&&u)return this.totalTime(_*100+i,s,a);if(f=Ut(h%_),h===c?(g=this._repeat,f=l):(m=Ut(h/_),g=~~m,g&&g===m?(f=l,g--):f>l&&(f=l)),p=this._yoyo&&g&1,p&&(f=l-f),m=sa(this._tTime,_),f===o&&!a&&this._initted&&g===m)return this._tTime=h,this;g!==m&&this.vars.repeatRefresh&&!p&&!this._lock&&f!==_&&this._initted&&(this._lock=a=1,this.render(Ut(_*g),!0).invalidate()._lock=0)}if(!this._initted){if(gm(this,u?i:f,a,s,h))return this._tTime=0,this;if(o!==this._time&&!(a&&this.vars.repeatRefresh&&g!==m))return this;if(l!==this._dur)return this.render(i,s,a)}if(this._rEase){var b=f<o;if(b!==this._inv){var M=b?o:l-o;this._inv=b,this._from&&(this.ratio=1-this.ratio),this._invRatio=this.ratio,this._invTime=o,this._invRecip=M?(b?-1:1)/M:0,this._invScale=b?-this.ratio:1-this.ratio,this._invEase=b?this._rEase:this._ease}this.ratio=v=this._invRatio+this._invScale*this._invEase((f-this._invTime)*this._invRecip)}else this.ratio=v=this._ease(f/l);if(this._from&&(this.ratio=v=1-v),this._tTime=h,this._time=f,!this._act&&this._ts&&(this._act=1,this._lazy=0),!o&&h&&!s&&!m&&(ei(this,"onStart"),this._tTime!==h))return this;for(d=this._pt;d;)d.r(v,d.d),d=d._next;y&&y.render(i<0?i:y._dur*y._ease(f/this._dur),s,a)||this._startAt&&(this._zTime=i),this._onUpdate&&!s&&(u&&Mu(this,i,s,a),ei(this,"onUpdate")),this._repeat&&g!==m&&this.vars.onRepeat&&!s&&this.parent&&ei(this,"onRepeat"),(h===this._tDur||!h)&&this._tTime===h&&(u&&!this._onUpdate&&Mu(this,i,!0,!0),(i||!l)&&(h===this._tDur&&this._ts>0||!h&&this._ts<0)&&Ir(this,1),!s&&!(u&&!o)&&(h||o||p)&&(ei(this,h===c?"onComplete":"onReverseComplete",!0),this._prom&&!(h<c&&this.timeScale()>0)&&this._prom()))}return this},t.targets=function(){return this._targets},t.invalidate=function(i){return(!i||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(i),r.prototype.invalidate.call(this,i)},t.resetTo=function(i,s,a,o,c){po||Qn.wake(),this._ts||this.play();var l=Math.min(this._dur,(this._dp._time-this._start)*this._ts),u;return this._initted||Kh(this,l),u=this._ease(l/this._dur),nb(this,i,s,a,o,u,l,c)?this.resetTo(i,s,a,o,1):(fl(this,0),this.parent||dm(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},t.kill=function(i,s){if(s===void 0&&(s="all"),!i&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?Ha(this):this.scrollTrigger&&this.scrollTrigger.kill(!!hn),this;if(this.timeline){var a=this.timeline.totalDuration();return this.timeline.killTweensOf(i,s,yr&&yr.vars.overwrite!==!0)._first||Ha(this),this.parent&&a!==this.timeline.totalDuration()&&aa(this,this._dur*this.timeline._tDur/a,0,1),this}var o=this._targets,c=i?gi(i):o,l=this._ptLookup,u=this._pt,h,f,d,g,_,m,p;if((!s||s==="all")&&L_(o,c))return s==="all"&&(this._pt=0),Ha(this);for(h=this._op=this._op||[],s!=="all"&&(on(s)&&(_={},kn(s,function(v){return _[v]=1}),s=_),s=ib(o,s)),p=o.length;p--;)if(~c.indexOf(o[p])){f=l[p],s==="all"?(h[p]=s,g=f,d={}):(d=h[p]=h[p]||{},g=s);for(_ in g)m=f&&f[_],m&&((!("kill"in m.d)||m.d.kill(_)===!0)&&ul(this,m,"_pt"),delete f[_]),d!=="all"&&(d[_]=1)}return this._initted&&!this._pt&&u&&Ha(this),this},e.to=function(i,s){return new e(i,s,arguments[2])},e.from=function(i,s){return Ja(1,arguments)},e.delayedCall=function(i,s,a,o){return new e(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:i,onComplete:s,onReverseComplete:s,onCompleteParams:a,onReverseCompleteParams:a,callbackScope:o})},e.fromTo=function(i,s,a){return Ja(2,arguments)},e.set=function(i,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new e(i,s)},e.killTweensOf=function(i,s,a){return Ft.killTweensOf(i,s,a)},e})(mo);si(qt.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});kn("staggerTo,staggerFrom,staggerFromTo",function(r){qt[r]=function(){var e=new Nn,t=Tu.call(arguments,0);return t.splice(r==="staggerFromTo"?5:4,0,0),e[r].apply(e,t)}});var $h=function(e,t,n){return e[t]=n},Im=function(e,t,n){return e[t](n)},sb=function(e,t,n,i){return e[t](i.fp,n)},ab=function(e,t,n){return e.setAttribute(t,n)},Jh=function(e,t){return zt(e[t])?Im:zh(e[t])&&e.setAttribute?ab:$h},Nm=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},ob=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},Um=function(e,t){var n=t._pt,i="";if(!e&&t.b)i=t.b;else if(e===1&&t.e)i=t.e;else{for(;n;)i=n.p+(n.m?n.m(n.s+n.c*e):Math.round((n.s+n.c*e)*1e4)/1e4)+i,n=n._next;i+=t.c}t.set(t.t,t.p,i,t)},Zh=function(e,t){for(var n=t._pt;n;)n.r(e,n.d),n=n._next},cb=function(e,t,n,i){for(var s=this._pt,a;s;)a=s._next,s.p===i&&s.modifier(e,t,n),s=a},lb=function(e){for(var t=this._pt,n,i;t;)i=t._next,t.p===e&&!t.op||t.op===e?ul(this,t,"_pt"):t.dep||(n=1),t=i;return!n},ub=function(e,t,n,i){i.mSet(e,t,i.m.call(i.tween,n,i.mt),i)},Fm=function(e){for(var t=e._pt,n,i,s,a;t;){for(n=t._next,i=s;i&&i.pr>t.pr;)i=i._next;(t._prev=i?i._prev:a)?t._prev._next=t:s=t,(t._next=i)?i._prev=t:a=t,t=n}e._pt=s},Bn=(function(){function r(t,n,i,s,a,o,c,l,u){this.t=n,this.s=s,this.c=a,this.p=i,this.r=o||Nm,this.d=c||this,this.set=l||$h,this.pr=u||0,this._next=t,t&&(t._prev=this)}var e=r.prototype;return e.modifier=function(n,i,s){this.mSet=this.mSet||this.set,this.set=ub,this.m=n,this.mt=s,this.tween=i},r})();kn(Xh+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse",function(r){return Wh[r]=1});ri.TweenMax=ri.TweenLite=qt;ri.TimelineLite=ri.TimelineMax=Nn;Ft=new Nn({sortChildren:!1,defaults:lo,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});ii.stringFilter=Rm;var ls=[],Cc={},hb=[],jf=0,fb=0,Tl=function(e){return(Cc[e]||hb).map(function(t){return t()})},go=function(){var e=Date.now(),t=[];e-jf>2&&(Tl("matchMediaInit"),ls.forEach(function(n){var i=n.queries,s=n.conditions,a,o,c,l;for(o in i)a=Pi.matchMedia(i[o]).matches,a&&(c=1),a!==s[o]&&(s[o]=a,l=1);l&&(n.revert(),c&&t.push(n))}),Tl("matchMediaRevert"),t.forEach(function(n){return n.onMatch(n,function(i){return n.add(null,i)})}),jf=e,Tl("matchMedia"))},Om=(function(){function r(t,n){this.selector=n&&Eu(n),this.data=[],this._r=[],this.isReverted=!1,this.id=fb++,t&&this.add(t)}var e=r.prototype;return e.add=function(n,i,s){zt(n)&&(s=i,i=n,n=zt);var a=this,o=function(){var l=Lt,u=a.selector,h;return l&&l!==a&&l.data.push(a),s&&(a.selector=Eu(s)),Lt=a,h=i.apply(a,arguments),zt(h)&&a._r.push(h),Lt=l,a.selector=u,a.isReverted=!1,h};return a.last=o,n===zt?o(a,function(c){return a.add(null,c)}):n?a[n]=o:o},e.ignore=function(n){var i=Lt;Lt=null,n(this),Lt=i},e.getTweens=function(){var n=[];return this.data.forEach(function(i){return i instanceof r?n.push.apply(n,i.getTweens()):i instanceof qt&&!(i.parent&&i.parent.data==="nested")&&n.push(i)}),n},e.clear=function(){this._r.length=this.data.length=0},e.kill=function(n,i){var s=this;if(n?(function(){for(var o=s.getTweens(),c=s.data.length,l;c--;)l=s.data[c],l.data==="isFlip"&&(l.revert(),l.getChildren(!0,!0,!1).forEach(function(u){return o.splice(o.indexOf(u),1)}));for(o.map(function(u){return{g:u._dur||u._delay||u._sat&&!u._sat.vars.immediateRender?u.globalTime(0):-1/0,t:u}}).sort(function(u,h){return h.g-u.g||-1/0}).forEach(function(u){return u.t.revert(n)}),c=s.data.length;c--;)l=s.data[c],l instanceof Nn?l.data!=="nested"&&(l.scrollTrigger&&l.scrollTrigger.revert(),l.kill()):!(l instanceof qt)&&l.revert&&l.revert(n);s._r.forEach(function(u){return u(n,s)}),s.isReverted=!0})():this.data.forEach(function(o){return o.kill&&o.kill()}),this.clear(),i){for(var a=ls.length;a--;)ls[a].id===this.id&&ls.splice(a,1);this._mqs&&this._mqs.forEach(function(o){return o.removeListener?o.removeListener(go):o.removeEventListener("change",go)}),this._mqs=null}},e.revert=function(n){this.kill(n||{})},r})(),db=(function(){function r(t){this.contexts=[],this.scope=t,Lt&&Lt.data.push(this)}var e=r.prototype;return e.add=function(n,i,s){Bi(n)||(n={matches:n});var a=new Om(0,s||this.scope),o=a.conditions={},c,l,u;Lt&&!a.selector&&(a.selector=Lt.selector),this.contexts.push(a),i=a.add("onMatch",i),a.queries=n;for(l in n)l==="all"?u=1:(c=Pi.matchMedia(n[l]),c&&(ls.indexOf(a)<0&&ls.push(a),(o[l]=c.matches)&&(u=1),c.addListener?c.addListener(go):c.addEventListener("change",go),(a._mqs||(a._mqs=[])).push(c)));return u&&i(a,function(h){return a.add(null,h)}),this},e.revert=function(n){this.kill(n||{})},e.kill=function(n){this.contexts.forEach(function(i){return i.kill(n,!0)})},r})(),$c={registerPlugin:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];t.forEach(function(i){return Em(i)})},timeline:function(e){return new Nn(e)},getTweensOf:function(e,t){return Ft.getTweensOf(e,t)},getProperty:function(e,t,n,i){on(e)&&(e=gi(e)[0]);var s=as(e||{}).get,a=n?fm:hm;return n==="native"&&(n=""),e&&(t?a(($n[t]&&$n[t].get||s)(e,t,n,i)):function(o,c,l){return a(($n[o]&&$n[o].get||s)(e,o,c,l))})},quickSetter:function(e,t,n){if(e=gi(e),e.length>1){var i=e.map(function(u){return Gn.quickSetter(u,t,n)}),s=i.length;return function(u){for(var h=s;h--;)i[h](u)}}e=e[0]||{};var a=$n[t],o=as(e),c=o.harness&&(o.harness.aliases||{})[t]||t,l=a?function(u){var h=new a;Ws._pt=0,h.init(e,n?u+n:u,Ws,0,[e]),h.render(1,h),Ws._pt&&Zh(1,Ws)}:o.set(e,c);return a?l:function(u){return l(e,c,n?u+n:u,o,1)}},quickTo:function(e,t,n){var i,s=Gn.to(e,si((i={},i[t]="+=0.1",i.paused=!0,i.stagger=0,i),n||{})),a=function(c,l,u){return s.resetTo(t,c,l,u)};return a.tween=s,a},isTweening:function(e){return Ft.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=cs(e.ease,lo.ease)),Hf(lo,e||{})},config:function(e){return Hf(ii,e||{})},registerEffect:function(e){var t=e.name,n=e.effect,i=e.plugins,s=e.defaults,a=e.extendTimeline;(i||"").split(",").forEach(function(o){return o&&!$n[o]&&!ri[o]&&uo(t+" effect requires "+o+" plugin.")}),xl[t]=function(o,c,l){return n(gi(o),si(c||{},s),l)},a&&(Nn.prototype[t]=function(o,c,l){return this.add(xl[t](o,Bi(c)?c:(l=c)&&{},this),l)})},registerEase:function(e,t){ht[e]=cs(t)},parseEase:function(e,t){return arguments.length?cs(e,t):ht},getById:function(e){return Ft.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var n=new Nn(e),i,s;for(n.smoothChildTiming=On(e.smoothChildTiming),Ft.remove(n),n._dp=0,n._time=n._tTime=Ft._time,i=Ft._first;i;)s=i._next,(t||!(!i._dur&&i instanceof qt&&i.vars.onComplete===i._targets[0]))&&Ii(n,i,i._start-i._delay),i=s;return Ii(Ft,n,0),n},context:function(e,t){return e?new Om(e,t):Lt},matchMedia:function(e){return new db(e)},matchMediaRefresh:function(){return ls.forEach(function(e){var t=e.conditions,n,i;for(i in t)t[i]&&(t[i]=!1,n=1);n&&e.revert()})||go()},addEventListener:function(e,t){var n=Cc[e]||(Cc[e]=[]);~n.indexOf(t)||n.push(t)},removeEventListener:function(e,t){var n=Cc[e],i=n&&n.indexOf(t);i>=0&&n.splice(i,1)},utils:{wrap:W_,wrapYoyo:X_,distribute:vm,random:ym,snap:xm,normalize:V_,getUnit:gn,clamp:B_,splitColor:wm,toArray:gi,selector:Eu,mapRange:Mm,pipe:H_,unitize:G_,interpolate:j_,shuffle:bm},install:am,effects:xl,ticker:Qn,updateRoot:Nn.updateRoot,plugins:$n,globalTimeline:Ft,core:{PropTween:Bn,globals:om,Tween:qt,Timeline:Nn,Animation:mo,getCache:as,_removeLinkedListItem:ul,reverting:function(){return hn},context:function(e){return e&&Lt&&(Lt.data.push(e),e._ctx=Lt),Lt},suppressOverwrites:function(e){return Bh=e}}};kn("to,from,fromTo,delayedCall,set,killTweensOf",function(r){return $c[r]=qt[r]});Qn.add(Nn.updateRoot);Ws=$c.to({},{duration:0});var pb=function(e,t){for(var n=e._pt;n&&n.p!==t&&n.op!==t&&n.fp!==t;)n=n._next;return n},mb=function(e,t){var n=e._targets,i,s,a;for(i in t)for(s=n.length;s--;)a=e._ptLookup[s][i],a&&(a=a.d)&&(a._pt&&(a=pb(a,i)),a&&a.modifier&&a.modifier(t[i],e,n[s],i))},El=function(e,t){return{name:e,headless:1,rawVars:1,init:function(i,s,a){a._onInit=function(o){var c,l;if(on(s)&&(c={},kn(s,function(u){return c[u]=1}),s=c),t){c={};for(l in s)c[l]=t(s[l]);s=c}mb(o,s)}}}},Gn=$c.registerPlugin({name:"attr",init:function(e,t,n,i,s){var a,o,c;this.tween=n;for(a in t)c=e.getAttribute(a)||"",o=this.add(e,"setAttribute",(c||0)+"",t[a],i,s,0,0,a),o.op=a,o.b=c,this._props.push(a)},render:function(e,t){for(var n=t._pt;n;)hn?n.set(n.t,n.p,n.b,n):n.r(e,n.d),n=n._next}},{name:"endArray",headless:1,init:function(e,t){for(var n=t.length;n--;)this.add(e,n,e[n]||0,t[n],0,0,0,0,0,1)}},El("roundProps",wu),El("modifiers"),El("snap",xm))||$c;qt.version=Nn.version=Gn.version="3.15.1";sm=1;Hh()&&oa();ht.Power0;ht.Power1;ht.Power2;ht.Power3;ht.Power4;ht.Linear;ht.Quad;ht.Cubic;ht.Quart;ht.Quint;ht.Strong;ht.Elastic;ht.Back;ht.SteppedEase;ht.Bounce;ht.Sine;ht.Expo;ht.Circ;var qf,Sr,Ys,Qh,rs,Yf,ef,gb=function(){return typeof window<"u"},or={},Kr=180/Math.PI,Ks=Math.PI/180,xs=Math.atan2,Kf=1e8,tf=/([A-Z])/g,_b=/(left|right|width|margin|padding|x)/i,bb=/[\s,\(]\S/,Ni={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},Ru=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},vb=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},xb=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},yb=function(e,t){return t.set(t.t,t.p,e===1?t.e:e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},Sb=function(e,t){var n=t.s+t.c*e;t.set(t.t,t.p,~~(n+(n<0?-.5:.5))+t.u,t)},km=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},Bm=function(e,t){return t.set(t.t,t.p,e!==1?t.b:t.e,t)},Mb=function(e,t,n){return e.style[t]=n},Tb=function(e,t,n){return e.style.setProperty(t,n)},Eb=function(e,t,n){return e._gsap[t]=n},wb=function(e,t,n){return e._gsap.scaleX=e._gsap.scaleY=n},Ab=function(e,t,n,i,s){var a=e._gsap;a.scaleX=a.scaleY=n,a.renderTransform(s,a)},Rb=function(e,t,n,i,s){var a=e._gsap;a[t]=n,a.renderTransform(s,a)},Ot="transform",zn=Ot+"Origin",Cb=function r(e,t){var n=this,i=this.target,s=i.style,a=i._gsap;if(e in or&&s){if(this.tfm=this.tfm||{},e!=="transform")e=Ni[e]||e,~e.indexOf(",")?e.split(",").forEach(function(o){return n.tfm[o]=Ji(i,o)}):this.tfm[e]=a.x?a[e]:Ji(i,e),e===zn&&(this.tfm.zOrigin=a.zOrigin);else return Ni.transform.split(",").forEach(function(o){return r.call(n,o,t)});if(this.props.indexOf(Ot)>=0)return;a.svg&&(this.svgo=i.getAttribute("data-svg-origin"),this.props.push(zn,t,"")),e=Ot}(s||t)&&this.props.push(e,t,s[e])},zm=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},Pb=function(){var e=this.props,t=this.target,n=t.style,i=t._gsap,s,a;for(s=0;s<e.length;s+=3)e[s+1]?e[s+1]===2?t[e[s]](e[s+2]):t[e[s]]=e[s+2]:e[s+2]?n[e[s]]=e[s+2]:n.removeProperty(e[s].substr(0,2)==="--"?e[s]:e[s].replace(tf,"-$1").toLowerCase());if(this.tfm){for(a in this.tfm)i[a]=this.tfm[a];i.svg&&(i.renderTransform(),t.setAttribute("data-svg-origin",this.svgo||"")),s=ef(),(!s||!s.isStart)&&!n[Ot]&&(zm(n),i.zOrigin&&n[zn]&&(n[zn]+=" "+i.zOrigin+"px",i.zOrigin=0,i.renderTransform()),i.uncache=1)}},Hm=function(e,t){var n={target:e,props:[],revert:Pb,save:Cb};return e._gsap||Gn.core.getCache(e),t&&e.style&&e.nodeType&&t.split(",").forEach(function(i){return n.save(i)}),n},Gm,Cu=function(e,t){var n=Sr.createElementNS?Sr.createElementNS((t||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):Sr.createElement(e);return n&&n.style?n:Sr.createElement(e)},ti=function r(e,t,n){var i=getComputedStyle(e);return i[t]||i.getPropertyValue(t.replace(tf,"-$1").toLowerCase())||i.getPropertyValue(t)||!n&&r(e,ca(t)||t,1)||""},$f="O,Moz,ms,Ms,Webkit".split(","),ca=function(e,t,n){var i=t||rs,s=i.style,a=5;if(e in s&&!n)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);a--&&!($f[a]+e in s););return a<0?null:(a===3?"ms":a>=0?$f[a]:"")+e},Pu=function(){gb()&&window.document&&(qf=window,Sr=qf.document,Ys=Sr.documentElement,rs=Cu("div")||{style:{}},Cu("div"),Ot=ca(Ot),zn=Ot+"Origin",rs.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",Gm=!!ca("perspective"),ef=Gn.core.reverting,Qh=1)},Jf=function(e){var t=e.ownerSVGElement,n=Cu("svg",t&&t.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),i=e.cloneNode(!0),s;i.style.display="block",n.appendChild(i),Ys.appendChild(n);try{s=i.getBBox()}catch{}return n.removeChild(i),Ys.removeChild(n),s},Zf=function(e,t){for(var n=t.length;n--;)if(e.hasAttribute(t[n]))return e.getAttribute(t[n])},Vm=function(e){var t,n;try{t=e.getBBox()}catch{t=Jf(e),n=1}return t&&(t.width||t.height)||n||(t=Jf(e)),t&&!t.width&&!t.x&&!t.y?{x:+Zf(e,["x","cx","x1"])||0,y:+Zf(e,["y","cy","y1"])||0,width:0,height:0}:t},Wm=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&Vm(e))},Nr=function(e,t){if(t){var n=e.style,i;t in or&&t!==zn&&(t=Ot),n.removeProperty?(i=t.substr(0,2),(i==="ms"||t.substr(0,6)==="webkit")&&(t="-"+t),n.removeProperty(i==="--"?t:t.replace(tf,"-$1").toLowerCase())):n.removeAttribute(t)}},Mr=function(e,t,n,i,s,a){var o=new Bn(e._pt,t,n,0,1,a?Bm:km);return e._pt=o,o.b=i,o.e=s,e._props.push(n),o},Qf={deg:1,rad:1,turn:1},Db={grid:1,flex:1},Ur=function r(e,t,n,i){var s=parseFloat(n)||0,a=(n+"").trim().substr((s+"").length)||"px",o=rs.style,c=_b.test(t),l=e.tagName.toLowerCase()==="svg",u=(l?"client":"offset")+(c?"Width":"Height"),h=100,f=i==="px",d=i==="%",g,_,m,p;if(i===a||!s||Qf[i]||Qf[a])return s;if(a!=="px"&&!f&&(s=r(e,t,n,"px")),p=e.getCTM&&Wm(e),(d||a==="%")&&(or[t]||~t.indexOf("adius")))return g=p?e.getBBox()[c?"width":"height"]:e[u],Vt(d?s/g*h:s/100*g);if(o[c?"width":"height"]=h+(f?a:i),_=i!=="rem"&&~t.indexOf("adius")||i==="em"&&e.appendChild&&!l?e:e.parentNode,p&&(_=(e.ownerSVGElement||{}).parentNode),(!_||_===Sr||!_.appendChild)&&(_=Sr.body),m=_._gsap,m&&d&&m.width&&c&&m.time===Qn.time&&!m.uncache)return Vt(s/m.width*h);if(d&&(t==="height"||t==="width")){var v=e.style[t];e.style[t]=h+i,g=e[u],v?e.style[t]=v:Nr(e,t)}else(d||a==="%")&&!Db[ti(_,"display")]&&(o.position=ti(e,"position")),_===e&&(o.position="static"),_.appendChild(rs),g=rs[u],_.removeChild(rs),o.position="absolute";return c&&d&&(m=as(_),m.time=Qn.time,m.width=_[u]),Vt(f?g*s/h:g&&s?h/g*s:0)},Ji=function(e,t,n,i){var s;return Qh||Pu(),t in Ni&&t!=="transform"&&(t=Ni[t],~t.indexOf(",")&&(t=t.split(",")[0])),or[t]&&t!=="transform"?(s=bo(e,i),s=t!=="transformOrigin"?s[t]:s.svg?s.origin:Zc(ti(e,zn))+" "+s.zOrigin+"px"):(s=e.style[t],(!s||s==="auto"||i||~(s+"").indexOf("calc("))&&(s=Jc[t]&&Jc[t](e,t,n)||ti(e,t)||lm(e,t)||(t==="opacity"?1:0))),n&&!~(s+"").trim().indexOf(" ")?Ur(e,t,s,n)+n:s},Lb=function(e,t,n,i){if(!n||n==="none"){var s=ca(t,e,1),a=s&&ti(e,s,1);a&&a!==n?(t=s,n=a):t==="borderColor"&&(n=ti(e,"borderTopColor"))}var o=new Bn(this._pt,e.style,t,0,1,Um),c=0,l=0,u,h,f,d,g,_,m,p,v,y,b,M;if(o.b=n,o.e=i,n+="",i+="",i.substring(0,6)==="var(--"&&(i=ti(e,i.substring(4,i.indexOf(")")))),i==="auto"&&(_=e.style[t],e.style[t]=i,i=ti(e,t)||i,_?e.style[t]=_:Nr(e,t)),u=[n,i],Rm(u),n=u[0],i=u[1],f=n.match(Vs)||[],M=i.match(Vs)||[],M.length){for(;h=Vs.exec(i);)m=h[0],v=i.substring(c,h.index),g?g=(g+1)%5:(v.substr(-5)==="rgba("||v.substr(-5)==="hsla(")&&(g=1),m!==(_=f[l++]||"")&&(d=parseFloat(_)||0,b=_.substr((d+"").length),m.charAt(1)==="="&&(m=qs(d,m)+b),p=parseFloat(m),y=m.substr((p+"").length),c=Vs.lastIndex-y.length,y||(y=y||ii.units[t]||b,c===i.length&&(i+=y,o.e+=y)),b!==y&&(d=Ur(e,t,_,y)||0),o._pt={_next:o._pt,p:v||l===1?v:",",s:d,c:p-d,m:g&&g<4||t==="zIndex"?Math.round:0});o.c=c<i.length?i.substring(c,i.length):""}else o.r=t==="display"&&i==="none"?Bm:km;return rm.test(i)&&(o.e=0),this._pt=o,o},ed={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},Ib=function(e){var t=e.split(" "),n=t[0],i=t[1]||"50%";return(n==="top"||n==="bottom"||i==="left"||i==="right")&&(e=n,n=i,i=e),t[0]=ed[n]||n,t[1]=ed[i]||i,t.join(" ")},Nb=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var n=t.t,i=n.style,s=t.u,a=n._gsap,o,c,l;if(s==="all"||s===!0)i.cssText="",c=1;else for(s=s.split(","),l=s.length;--l>-1;)o=s[l],or[o]&&(c=1,o=o==="transformOrigin"?zn:Ot),Nr(n,o);c&&(Nr(n,Ot),a&&(a.svg&&n.removeAttribute("transform"),i.scale=i.rotate=i.translate="none",bo(n,1),a.uncache=1,zm(i)))}},Jc={clearProps:function(e,t,n,i,s){if(s.data!=="isFromStart"){var a=e._pt=new Bn(e._pt,t,n,0,0,Nb);return a.u=i,a.pr=-10,a.tween=s,e._props.push(n),1}}},_o=[1,0,0,1,0,0],Xm={},jm=function(e){return e==="matrix(1, 0, 0, 1, 0, 0)"||e==="none"||!e},td=function(e){var t=ti(e,Ot);return jm(t)?_o:t.substr(7).match(im).map(Vt)},nf=function(e,t){var n=e._gsap||as(e),i=e.style,s=td(e),a,o,c,l;return n.svg&&e.getAttribute("transform")?(c=e.transform.baseVal.consolidate().matrix,s=[c.a,c.b,c.c,c.d,c.e,c.f],s.join(",")==="1,0,0,1,0,0"?_o:s):(s===_o&&!e.offsetParent&&e!==Ys&&!n.svg&&(c=i.display,i.display="block",a=e.parentNode,(!a||!e.offsetParent&&!e.getBoundingClientRect().width)&&(l=1,o=e.nextElementSibling,Ys.appendChild(e)),s=td(e),c?i.display=c:Nr(e,"display"),l&&(o?a.insertBefore(e,o):a?a.appendChild(e):Ys.removeChild(e))),t&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},Du=function(e,t,n,i,s,a){var o=e._gsap,c=s||nf(e,!0),l=o.xOrigin||0,u=o.yOrigin||0,h=o.xOffset||0,f=o.yOffset||0,d=c[0],g=c[1],_=c[2],m=c[3],p=c[4],v=c[5],y=t.split(" "),b=parseFloat(y[0])||0,M=parseFloat(y[1])||0,E,T,R,x;n?c!==_o&&(T=d*m-g*_)&&(R=b*(m/T)+M*(-_/T)+(_*v-m*p)/T,x=b*(-g/T)+M*(d/T)-(d*v-g*p)/T,b=R,M=x):(E=Vm(e),b=E.x+(~y[0].indexOf("%")?b/100*E.width:b),M=E.y+(~(y[1]||y[0]).indexOf("%")?M/100*E.height:M)),i||i!==!1&&o.smooth?(p=b-l,v=M-u,o.xOffset=h+(p*d+v*_)-p,o.yOffset=f+(p*g+v*m)-v):o.xOffset=o.yOffset=0,o.xOrigin=b,o.yOrigin=M,o.smooth=!!i,o.origin=t,o.originIsAbsolute=!!n,e.style[zn]="0px 0px",a&&(Mr(a,o,"xOrigin",l,b),Mr(a,o,"yOrigin",u,M),Mr(a,o,"xOffset",h,o.xOffset),Mr(a,o,"yOffset",f,o.yOffset)),e.setAttribute("data-svg-origin",b+" "+M)},bo=function(e,t){var n=e._gsap||new Pm(e);if("x"in n&&!t&&!n.uncache)return n;var i=e.style,s=n.scaleX<0,a="px",o="deg",c=getComputedStyle(e),l=ti(e,zn)||"0",u,h,f,d,g,_,m,p,v,y,b,M,E,T,R,x,S,C,I,U,z,W,V,j,H,te,L,K,le,_e,de,ye;return u=h=f=_=m=p=v=y=b=0,d=g=1,n.svg=!!(e.getCTM&&Wm(e)),c.translate&&((c.translate!=="none"||c.scale!=="none"||c.rotate!=="none")&&(i[Ot]=(c.translate!=="none"?"translate3d("+(c.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(c.rotate!=="none"?"rotate("+c.rotate+") ":"")+(c.scale!=="none"?"scale("+c.scale.split(" ").join(",")+") ":"")+(c[Ot]!=="none"?c[Ot]:"")),i.scale=i.rotate=i.translate="none"),T=nf(e,n.svg),n.svg&&(n.uncache?(H=e.getBBox(),l=n.xOrigin-H.x+"px "+(n.yOrigin-H.y)+"px",j=""):j=!t&&e.getAttribute("data-svg-origin"),Du(e,j||l,!!j||n.originIsAbsolute,n.smooth!==!1,T)),M=n.xOrigin||0,E=n.yOrigin||0,T!==_o&&(C=T[0],I=T[1],U=T[2],z=T[3],u=W=T[4],h=V=T[5],T.length===6?(d=Math.sqrt(C*C+I*I),g=Math.sqrt(z*z+U*U),_=C||I?xs(I,C)*Kr:0,v=U||z?xs(U,z)*Kr+_:0,v&&(g*=Math.abs(Math.cos(v*Ks))),n.svg&&(u-=M-(M*C+E*U),h-=E-(M*I+E*z))):(ye=T[6],_e=T[7],L=T[8],K=T[9],le=T[10],de=T[11],u=T[12],h=T[13],f=T[14],R=xs(ye,le),m=R*Kr,R&&(x=Math.cos(-R),S=Math.sin(-R),j=W*x+L*S,H=V*x+K*S,te=ye*x+le*S,L=W*-S+L*x,K=V*-S+K*x,le=ye*-S+le*x,de=_e*-S+de*x,W=j,V=H,ye=te),R=xs(-U,le),p=R*Kr,R&&(x=Math.cos(-R),S=Math.sin(-R),j=C*x-L*S,H=I*x-K*S,te=U*x-le*S,de=z*S+de*x,C=j,I=H,U=te),R=xs(I,C),_=R*Kr,R&&(x=Math.cos(R),S=Math.sin(R),j=C*x+I*S,H=W*x+V*S,I=I*x-C*S,V=V*x-W*S,C=j,W=H),m&&Math.abs(m)+Math.abs(_)>359.9&&(m=_=0,p=180-p),d=Vt(Math.sqrt(C*C+I*I+U*U)),g=Vt(Math.sqrt(V*V+ye*ye)),R=xs(W,V),v=Math.abs(R)>2e-4?R*Kr:0,b=de?1/(de<0?-de:de):0),n.svg&&(j=e.getAttribute("transform"),n.forceCSS=e.setAttribute("transform","")||!jm(ti(e,Ot)),j&&e.setAttribute("transform",j))),Math.abs(v)>90&&Math.abs(v)<270&&(s?(d*=-1,v+=_<=0?180:-180,_+=_<=0?180:-180):(g*=-1,v+=v<=0?180:-180)),t=t||n.uncache,n.x=u-((n.xPercent=u&&(!t&&n.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-u)?-50:0)))?e.offsetWidth*n.xPercent/100:0)+a,n.y=h-((n.yPercent=h&&(!t&&n.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-h)?-50:0)))?e.offsetHeight*n.yPercent/100:0)+a,n.z=f+a,n.scaleX=Vt(d),n.scaleY=Vt(g),n.rotation=Vt(_)+o,n.rotationX=Vt(m)+o,n.rotationY=Vt(p)+o,n.skewX=v+o,n.skewY=y+o,n.transformPerspective=b+a,(n.zOrigin=parseFloat(l.split(" ")[2])||!t&&n.zOrigin||0)&&(i[zn]=Zc(l)),n.xOffset=n.yOffset=0,n.force3D=ii.force3D,n.renderTransform=n.svg?Fb:Gm?qm:Ub,n.uncache=0,n},Zc=function(e){return(e=e.split(" "))[0]+" "+e[1]},wl=function(e,t,n){var i=gn(t);return Vt(parseFloat(t)+parseFloat(Ur(e,"x",n+"px",i)))+i},Ub=function(e,t){t.z="0px",t.rotationY=t.rotationX="0deg",t.force3D=0,qm(e,t)},zr="0deg",wa="0px",Hr=") ",qm=function(e,t){var n=t||this,i=n.xPercent,s=n.yPercent,a=n.x,o=n.y,c=n.z,l=n.rotation,u=n.rotationY,h=n.rotationX,f=n.skewX,d=n.skewY,g=n.scaleX,_=n.scaleY,m=n.transformPerspective,p=n.force3D,v=n.target,y=n.zOrigin,b="",M=p==="auto"&&e&&e!==1||p===!0;if(y&&(h!==zr||u!==zr)){var E=parseFloat(u)*Ks,T=Math.sin(E),R=Math.cos(E),x;E=parseFloat(h)*Ks,x=Math.cos(E),a=wl(v,a,T*x*-y),o=wl(v,o,-Math.sin(E)*-y),c=wl(v,c,R*x*-y+y)}m!==wa&&(b+="perspective("+m+Hr),(i||s)&&(b+="translate("+i+"%, "+s+"%) "),(M||a!==wa||o!==wa||c!==wa)&&(b+=c!==wa||M?"translate3d("+a+", "+o+", "+c+") ":"translate("+a+", "+o+Hr),l!==zr&&(b+="rotate("+l+Hr),u!==zr&&(b+="rotateY("+u+Hr),h!==zr&&(b+="rotateX("+h+Hr),(f!==zr||d!==zr)&&(b+="skew("+f+", "+d+Hr),(g!==1||_!==1)&&(b+="scale("+g+", "+_+Hr),v.style[Ot]=b||"translate(0, 0)"},Fb=function(e,t){var n=t||this,i=n.xPercent,s=n.yPercent,a=n.x,o=n.y,c=n.rotation,l=n.skewX,u=n.skewY,h=n.scaleX,f=n.scaleY,d=n.target,g=n.xOrigin,_=n.yOrigin,m=n.xOffset,p=n.yOffset,v=n.forceCSS,y=parseFloat(a),b=parseFloat(o),M,E,T,R,x;c=parseFloat(c),l=parseFloat(l),u=parseFloat(u),u&&(u=parseFloat(u),l+=u,c+=u),c||l?(c*=Ks,l*=Ks,M=Math.cos(c)*h,E=Math.sin(c)*h,T=Math.sin(c-l)*-f,R=Math.cos(c-l)*f,l&&(u*=Ks,x=Math.tan(l-u),x=Math.sqrt(1+x*x),T*=x,R*=x,u&&(x=Math.tan(u),x=Math.sqrt(1+x*x),M*=x,E*=x)),M=Vt(M),E=Vt(E),T=Vt(T),R=Vt(R)):(M=h,R=f,E=T=0),(y&&!~(a+"").indexOf("px")||b&&!~(o+"").indexOf("px"))&&(y=Ur(d,"x",a,"px"),b=Ur(d,"y",o,"px")),(g||_||m||p)&&(y=Vt(y+g-(g*M+_*T)+m),b=Vt(b+_-(g*E+_*R)+p)),(i||s)&&(x=d.getBBox(),y=Vt(y+i/100*x.width),b=Vt(b+s/100*x.height)),x="matrix("+M+","+E+","+T+","+R+","+y+","+b+")",d.setAttribute("transform",x),v&&(d.style[Ot]=x)},Ob=function(e,t,n,i,s){var a=360,o=on(s),c=parseFloat(s)*(o&&~s.indexOf("rad")?Kr:1),l=c-i,u=i+l+"deg",h,f;return o&&(h=s.split("_")[1],h==="short"&&(l%=a,l!==l%(a/2)&&(l+=l<0?a:-a)),h==="cw"&&l<0?l=(l+a*Kf)%a-~~(l/a)*a:h==="ccw"&&l>0&&(l=(l-a*Kf)%a-~~(l/a)*a)),e._pt=f=new Bn(e._pt,t,n,i,l,vb),f.e=u,f.u="deg",e._props.push(n),f},nd=function(e,t){for(var n in t)e[n]=t[n];return e},kb=function(e,t,n){var i=nd({},n._gsap),s="perspective,force3D,transformOrigin,svgOrigin",a=n.style,o,c,l,u,h,f,d,g;i.svg?(l=n.getAttribute("transform"),n.setAttribute("transform",""),a[Ot]=t,o=bo(n,1),Nr(n,Ot),n.setAttribute("transform",l)):(l=getComputedStyle(n)[Ot],a[Ot]=t,o=bo(n,1),a[Ot]=l);for(c in or)l=i[c],u=o[c],l!==u&&s.indexOf(c)<0&&(d=gn(l),g=gn(u),h=d!==g?Ur(n,c,l,g):parseFloat(l),f=parseFloat(u),e._pt=new Bn(e._pt,o,c,h,f-h,Ru),e._pt.u=g||0,e._props.push(c));nd(o,i)};kn("padding,margin,Width,Radius",function(r,e){var t="Top",n="Right",i="Bottom",s="Left",a=(e<3?[t,n,i,s]:[t+s,t+n,i+n,i+s]).map(function(o){return e<2?r+o:"border"+o+r});Jc[e>1?"border"+r:r]=function(o,c,l,u,h){var f,d;if(arguments.length<4)return f=a.map(function(g){return Ji(o,g,l)}),d=f.join(" "),d.split(f[0]).length===5?f[0]:d;f=(u+"").split(" "),d={},a.forEach(function(g,_){return d[g]=f[_]=f[_]||f[(_-1)/2|0]}),o.init(c,d,h)}});var Ym={name:"css",register:Pu,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,n,i,s){var a=this._props,o=e.style,c=n.vars.startAt,l,u,h,f,d,g,_,m,p,v,y,b,M,E,T,R,x;Qh||Pu(),this.styles=this.styles||Hm(e),R=this.styles.props,this.tween=n;for(_ in t)if(_!=="autoRound"&&(u=t[_],!($n[_]&&Dm(_,t,n,i,e,s)))){if(d=typeof u,g=Jc[_],d==="function"&&(u=u.call(n,i,e,s),d=typeof u),d==="string"&&~u.indexOf("random(")&&(u=fo(u)),g)g(this,e,_,u,n)&&(T=1);else if(_.substr(0,2)==="--")l=(getComputedStyle(e).getPropertyValue(_)+"").trim(),u+="",Rr.lastIndex=0,Rr.test(l)||(m=gn(l),p=gn(u),p?m!==p&&(l=Ur(e,_,l,p)+p):m&&(u+=m)),this.add(o,"setProperty",l,u,i,s,0,0,_),a.push(_),R.push(_,0,o[_]);else if(d!=="undefined"){if(c&&_ in c?(l=typeof c[_]=="function"?c[_].call(n,i,e,s):c[_],on(l)&&~l.indexOf("random(")&&(l=fo(l)),gn(l+"")||l==="auto"||(l+=ii.units[_]||gn(Ji(e,_))||""),(l+"").charAt(1)==="="&&(l=Ji(e,_))):l=Ji(e,_),f=parseFloat(l),v=d==="string"&&u.charAt(1)==="="&&u.substr(0,2),v&&(u=u.substr(2)),h=parseFloat(u),_ in Ni&&(_==="autoAlpha"&&(f===1&&Ji(e,"visibility")==="hidden"&&h&&(f=0),R.push("visibility",0,o.visibility),Mr(this,o,"visibility",f?"inherit":"hidden",h?"inherit":"hidden",!h)),_!=="scale"&&_!=="transform"&&(_=Ni[_],~_.indexOf(",")&&(_=_.split(",")[0]))),y=_ in or,y){if(this.styles.save(_),x=u,d==="string"&&u.substring(0,6)==="var(--"){if(u=ti(e,u.substring(4,u.indexOf(")"))),u.substring(0,5)==="calc("){var S=e.style.perspective;e.style.perspective=u,u=ti(e,"perspective"),S?e.style.perspective=S:Nr(e,"perspective")}h=parseFloat(u)}if(b||(M=e._gsap,M.renderTransform&&!t.parseTransform||bo(e,t.parseTransform),E=t.smoothOrigin!==!1&&M.smooth,b=this._pt=new Bn(this._pt,o,Ot,0,1,M.renderTransform,M,0,-1),b.dep=1),_==="scale")this._pt=new Bn(this._pt,M,"scaleY",M.scaleY,(v?qs(M.scaleY,v+h):h)-M.scaleY||0,Ru),this._pt.u=0,a.push("scaleY",_),_+="X";else if(_==="transformOrigin"){R.push(zn,0,o[zn]),u=Ib(u),M.svg?Du(e,u,0,E,0,this):(p=parseFloat(u.split(" ")[2])||0,p!==M.zOrigin&&Mr(this,M,"zOrigin",M.zOrigin,p),Mr(this,o,_,Zc(l),Zc(u)));continue}else if(_==="svgOrigin"){Du(e,u,1,E,0,this);continue}else if(_ in Xm){Ob(this,M,_,f,v?qs(f,v+u):u);continue}else if(_==="smoothOrigin"){Mr(this,M,"smooth",M.smooth,u);continue}else if(_==="force3D"){M[_]=u;continue}else if(_==="transform"){kb(this,u,e);continue}}else _ in o||(_=ca(_)||_);if(y||(h||h===0)&&(f||f===0)&&!bb.test(u)&&_ in o)m=(l+"").substr((f+"").length),h||(h=0),p=gn(u)||(_ in ii.units?ii.units[_]:m),m!==p&&(f=Ur(e,_,l,p)),this._pt=new Bn(this._pt,y?M:o,_,f,(v?qs(f,v+h):h)-f,!y&&(p==="px"||_==="zIndex")&&t.autoRound!==!1?Sb:Ru),this._pt.u=p||0,y&&x!==u?(this._pt.b=l,this._pt.e=x,this._pt.r=yb):m!==p&&p!=="%"&&(this._pt.b=l,this._pt.r=xb);else if(_ in o)Lb.call(this,e,_,l,v?v+u:u);else if(_ in e)this.add(e,_,l||e[_],v?v+u:u,i,s);else if(_!=="parseTransform"){Vh(_,u);continue}y||(_ in o?R.push(_,0,o[_]):typeof e[_]=="function"?R.push(_,2,e[_]()):R.push(_,1,l||e[_])),a.push(_)}}T&&Fm(this)},render:function(e,t){if(t.tween._time||!ef())for(var n=t._pt;n;)n.r(e,n.d),n=n._next;else t.styles.revert()},get:Ji,aliases:Ni,getSetter:function(e,t,n){var i=Ni[t];return i&&i.indexOf(",")<0&&(t=i),t in or&&t!==zn&&(e._gsap.x||Ji(e,"x"))?n&&Yf===n?t==="scale"?wb:Eb:(Yf=n||{})&&(t==="scale"?Ab:Rb):e.style&&!zh(e.style[t])?Mb:~t.indexOf("-")?Tb:Jh(e,t)},core:{_removeProperty:Nr,_getMatrix:nf}};Gn.utils.checkPrefix=ca;Gn.core.getStyleSaver=Hm;(function(r,e,t,n){var i=kn(r+","+e+","+t,function(s){or[s]=1});kn(e,function(s){ii.units[s]="deg",Xm[s]=1}),Ni[i[13]]=r+","+e,kn(n,function(s){var a=s.split(":");Ni[a[1]]=i[a[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");kn("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(r){ii.units[r]="px"});Gn.registerPlugin(Ym);var Dt=Gn.registerPlugin(Ym)||Gn;Dt.core.Tween;function Bb(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function zb(r,e,t){return e&&Bb(r.prototype,e),r}var ln,Pc,Un,Tr,Er,$s,Km,$r,Js,$m,Qi,Mi,Jm,Zm=function(){return ln||typeof window<"u"&&(ln=window.gsap)&&ln.registerPlugin&&ln},Qm=1,Xs=[],rt=[],Oi=[],Qa=Date.now,Lu=function(e,t){return t},Hb=function(){var e=Js.core,t=e.bridge||{},n=e._scrollers,i=e._proxies;n.push.apply(n,rt),i.push.apply(i,Oi),rt=n,Oi=i,Lu=function(a,o){return t[a](o)}},Cr=function(e,t){return~Oi.indexOf(e)&&Oi[Oi.indexOf(e)+1][t]},eo=function(e){return!!~$m.indexOf(e)},Mn=function(e,t,n,i,s){return e.addEventListener(t,n,{passive:i!==!1,capture:!!s})},yn=function(e,t,n,i){return e.removeEventListener(t,n,!!i)},Uo="scrollLeft",Fo="scrollTop",Iu=function(){return Qi&&Qi.isPressed||rt.cache++},Qc=function(e,t){var n=function i(s){if(s||s===0){Qm&&Un.history.scrollRestoration!=="manual"&&(Un.history.scrollRestoration="manual");var a=Qi&&Qi.isPressed;s=i.v=Math.round(s)||(Qi&&Qi.iOS?1:0),e(s),i.cacheID=rt.cache,a&&Lu("ss",s)}else(t||rt.cache!==i.cacheID||Lu("ref"))&&(i.cacheID=rt.cache,i.v=e());return i.v+i.offset};return n.offset=0,e&&n},Rn={s:Uo,p:"left",p2:"Left",os:"right",os2:"Right",d:"width",d2:"Width",a:"x",sc:Qc(function(r){return arguments.length?Un.scrollTo(r,Jt.sc()):Un.pageXOffset||Tr[Uo]||Er[Uo]||$s[Uo]||0})},Jt={s:Fo,p:"top",p2:"Top",os:"bottom",os2:"Bottom",d:"height",d2:"Height",a:"y",op:Rn,sc:Qc(function(r){return arguments.length?Un.scrollTo(Rn.sc(),r):Un.pageYOffset||Tr[Fo]||Er[Fo]||$s[Fo]||0})},Ln=function(e,t){return(t&&t._ctx&&t._ctx.selector||ln.utils.toArray)(e)[0]||(typeof e=="string"&&ln.config().nullTargetWarn!==!1?console.warn("Element not found:",e):null)},Gb=function(e,t){for(var n=t.length;n--;)if(t[n]===e||t[n].contains(e))return!0;return!1},Fr=function(e,t){var n=t.s,i=t.sc;eo(e)&&(e=Tr.scrollingElement||Er);var s=rt.indexOf(e),a=i===Jt.sc?1:2;!~s&&(s=rt.push(e)-1),rt[s+a]||Mn(e,"scroll",Iu);var o=rt[s+a],c=o||(rt[s+a]=Qc(Cr(e,n),!0)||(eo(e)?i:Qc(function(l){return arguments.length?e[n]=l:e[n]})));return c.target=e,o||(c.smooth=ln.getProperty(e,"scrollBehavior")==="smooth"),c},Nu=function(e,t,n){var i=e,s=e,a=Qa(),o=a,c=t||50,l=Math.max(500,c*3),u=function(g,_){var m=Qa();_||m-a>c?(s=i,i=g,o=a,a=m):n?i+=g:i=s+(g-s)/(m-o)*(a-o)},h=function(){s=i=n?0:i,o=a=0},f=function(g){var _=o,m=s,p=Qa();return(g||g===0)&&g!==i&&u(g),a===o||p-o>l?0:(i+(n?m:-m))/((n?p:a)-_)*1e3};return{update:u,reset:h,getVelocity:f}},Aa=function(e,t){return t&&!e._gsapAllow&&e.cancelable!==!1&&e.preventDefault(),e.changedTouches?e.changedTouches[0]:e},id=function(e){var t=Math.max.apply(Math,e),n=Math.min.apply(Math,e);return Math.abs(t)>=Math.abs(n)?t:n},eg=function(){Js=ln.core.globals().ScrollTrigger,Js&&Js.core&&Hb()},tg=function(e){return ln=e||Zm(),!Pc&&ln&&typeof document<"u"&&document.body&&(Un=window,Tr=document,Er=Tr.documentElement,$s=Tr.body,$m=[Un,Tr,Er,$s],ln.utils.clamp,Jm=ln.core.context||function(){},$r="onpointerenter"in $s?"pointer":"mouse",Km=Wt.isTouch=Un.matchMedia&&Un.matchMedia("(hover: none), (pointer: coarse)").matches?1:"ontouchstart"in Un||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?2:0,Mi=Wt.eventTypes=("ontouchstart"in Er?"touchstart,touchmove,touchcancel,touchend":"onpointerdown"in Er?"pointerdown,pointermove,pointercancel,pointerup":"mousedown,mousemove,mouseup,mouseup").split(","),setTimeout(function(){return Qm=0},500),Pc=1),Js||eg(),Pc};Rn.op=Jt;rt.cache=0;var Wt=(function(){function r(t){this.init(t)}var e=r.prototype;return e.init=function(n){Pc||tg(ln)||console.warn("Please gsap.registerPlugin(Observer)"),Js||eg();var i=n.tolerance,s=n.dragMinimum,a=n.type,o=n.target,c=n.lineHeight,l=n.debounce,u=n.preventDefault,h=n.onStop,f=n.onStopDelay,d=n.ignore,g=n.wheelSpeed,_=n.event,m=n.onDragStart,p=n.onDragEnd,v=n.onDrag,y=n.onPress,b=n.onRelease,M=n.onRight,E=n.onLeft,T=n.onUp,R=n.onDown,x=n.onChangeX,S=n.onChangeY,C=n.onChange,I=n.onToggleX,U=n.onToggleY,z=n.onHover,W=n.onHoverEnd,V=n.onMove,j=n.ignoreCheck,H=n.isNormalizer,te=n.onGestureStart,L=n.onGestureEnd,K=n.onWheel,le=n.onEnable,_e=n.onDisable,de=n.onClick,ye=n.scrollSpeed,q=n.capture,J=n.allowClicks,ce=n.lockAxis,Te=n.onLockAxis;this.target=o=Ln(o)||Er,this.vars=n,d&&(d=ln.utils.toArray(d)),i=i||1e-9,s=s||0,g=g||1,ye=ye||1,a=a||"wheel,touch,pointer",l=l!==!1,c||(c=parseFloat(Un.getComputedStyle($s).lineHeight)||22);var pe,Be,ut,D,Xe,Ue,De,F=this,st=0,Se=0,Ve=n.passive||!u&&n.passive!==!1,$e=Fr(o,Rn),mt=Fr(o,Jt),P=$e(),w=mt(),G=~a.indexOf("touch")&&!~a.indexOf("pointer")&&Mi[0]==="pointerdown",Z=eo(o),Q=o.ownerDocument||Tr,$=[0,0,0],Me=[0,0,0],ae=0,Ce=function(){return ae=Qa()},me=function(Le,Ke){return(F.event=Le)&&d&&Gb(Le.target,d)||Ke&&G&&Le.pointerType!=="touch"||j&&j(Le,Ke)},se=function(){F._vx.reset(),F._vy.reset(),Be.pause(),h&&h(F)},fe=function(){var Le=F.deltaX=id($),Ke=F.deltaY=id(Me),ge=Math.abs(Le)>=i,He=Math.abs(Ke)>=i;C&&(ge||He)&&C(F,Le,Ke,$,Me),ge&&(M&&F.deltaX>0&&M(F),E&&F.deltaX<0&&E(F),x&&x(F),I&&F.deltaX<0!=st<0&&I(F),st=F.deltaX,$[0]=$[1]=$[2]=0),He&&(R&&F.deltaY>0&&R(F),T&&F.deltaY<0&&T(F),S&&S(F),U&&F.deltaY<0!=Se<0&&U(F),Se=F.deltaY,Me[0]=Me[1]=Me[2]=0),(D||ut)&&(V&&V(F),ut&&(m&&ut===1&&m(F),v&&v(F),ut=0),D=!1),Ue&&!(Ue=!1)&&Te&&Te(F),Xe&&(K(F),Xe=!1),pe=0},Oe=function(Le,Ke,ge){$[ge]+=Le,Me[ge]+=Ke,F._vx.update(Le),F._vy.update(Ke),l?pe||(pe=requestAnimationFrame(fe)):fe()},Pe=function(Le,Ke){ce&&!De&&(F.axis=De=Math.abs(Le)>Math.abs(Ke)?"x":"y",Ue=!0),De!=="y"&&($[2]+=Le,F._vx.update(Le,!0)),De!=="x"&&(Me[2]+=Ke,F._vy.update(Ke,!0)),l?pe||(pe=requestAnimationFrame(fe)):fe()},he=function(Le){if(!me(Le,1)){Le=Aa(Le,u);var Ke=Le.clientX,ge=Le.clientY,He=Ke-F.x,Fe=ge-F.y,je=F.isDragging;F.x=Ke,F.y=ge,(je||(He||Fe)&&(Math.abs(F.startX-Ke)>=s||Math.abs(F.startY-ge)>=s))&&(ut||(ut=je?2:1),je||(F.isDragging=!0),Pe(He,Fe))}},We=F.onPress=function(xe){me(xe,1)||xe&&xe.button||(F.axis=De=null,Be.pause(),F.isPressed=!0,xe=Aa(xe),st=Se=0,F.startX=F.x=xe.clientX,F.startY=F.y=xe.clientY,F._vx.reset(),F._vy.reset(),Mn(H?o:Q,Mi[1],he,Ve,!0),F.deltaX=F.deltaY=0,y&&y(F))},N=F.onRelease=function(xe){if(!me(xe,1)){yn(H?o:Q,Mi[1],he,!0);var Le=!isNaN(F.y-F.startY),Ke=F.isDragging,ge=Ke&&(Math.abs(F.x-F.startX)>3||Math.abs(F.y-F.startY)>3),He=Aa(xe);!ge&&Le&&(F._vx.reset(),F._vy.reset(),u&&J&&ln.delayedCall(.08,function(){if(Qa()-ae>300&&!xe.defaultPrevented){if(xe.target.click)xe.target.click();else if(Q.createEvent){var Fe=Q.createEvent("MouseEvents");Fe.initMouseEvent("click",!0,!0,Un,1,He.screenX,He.screenY,He.clientX,He.clientY,!1,!1,!1,!1,0,null),xe.target.dispatchEvent(Fe)}}})),F.isDragging=F.isGesturing=F.isPressed=!1,h&&Ke&&!H&&Be.restart(!0),ut&&fe(),p&&Ke&&p(F),b&&b(F,ge)}},re=function(Le){return Le.touches&&Le.touches.length>1&&(F.isGesturing=!0)&&te(Le,F.isDragging)},oe=function(){return(F.isGesturing=!1)||L(F)},be=function(Le){if(!me(Le)){var Ke=$e(),ge=mt();Oe((Ke-P)*ye,(ge-w)*ye,1),P=Ke,w=ge,h&&Be.restart(!0)}},ie=function(Le){if(!me(Le)){Le=Aa(Le,u),K&&(Xe=!0);var Ke=(Le.deltaMode===1?c:Le.deltaMode===2?Un.innerHeight:1)*g;Oe(Le.deltaX*Ke,Le.deltaY*Ke,0),h&&!H&&Be.restart(!0)}},ee=function(Le){if(!me(Le)){var Ke=Le.clientX,ge=Le.clientY,He=Ke-F.x,Fe=ge-F.y;F.x=Ke,F.y=ge,D=!0,h&&Be.restart(!0),(He||Fe)&&Pe(He,Fe)}},we=function(Le){F.event=Le,z(F)},ze=function(Le){F.event=Le,W(F)},dt=function(Le){return me(Le)||Aa(Le,u)&&de(F)};Be=F._dc=ln.delayedCall(f||.25,se).pause(),F.deltaX=F.deltaY=0,F._vx=Nu(0,50,!0),F._vy=Nu(0,50,!0),F.scrollX=$e,F.scrollY=mt,F.isDragging=F.isGesturing=F.isPressed=!1,Jm(this),F.enable=function(xe){return F.isEnabled||(Mn(Z?Q:o,"scroll",Iu),a.indexOf("scroll")>=0&&Mn(Z?Q:o,"scroll",be,Ve,q),a.indexOf("wheel")>=0&&Mn(o,"wheel",ie,Ve,q),(a.indexOf("touch")>=0&&Km||a.indexOf("pointer")>=0)&&(Mn(o,Mi[0],We,Ve,q),Mn(Q,Mi[2],N),Mn(Q,Mi[3],N),J&&Mn(o,"click",Ce,!0,!0),de&&Mn(o,"click",dt),te&&Mn(Q,"gesturestart",re),L&&Mn(Q,"gestureend",oe),z&&Mn(o,$r+"enter",we),W&&Mn(o,$r+"leave",ze),V&&Mn(o,$r+"move",ee)),F.isEnabled=!0,F.isDragging=F.isGesturing=F.isPressed=D=ut=!1,F._vx.reset(),F._vy.reset(),P=$e(),w=mt(),xe&&xe.type&&We(xe),le&&le(F)),F},F.disable=function(){F.isEnabled&&(Xs.filter(function(xe){return xe!==F&&eo(xe.target)}).length||yn(Z?Q:o,"scroll",Iu),F.isPressed&&(F._vx.reset(),F._vy.reset(),yn(H?o:Q,Mi[1],he,!0)),yn(Z?Q:o,"scroll",be,q),yn(o,"wheel",ie,q),yn(o,Mi[0],We,q),yn(Q,Mi[2],N),yn(Q,Mi[3],N),yn(o,"click",Ce,!0),yn(o,"click",dt),yn(Q,"gesturestart",re),yn(Q,"gestureend",oe),yn(o,$r+"enter",we),yn(o,$r+"leave",ze),yn(o,$r+"move",ee),F.isEnabled=F.isPressed=F.isDragging=!1,_e&&_e(F))},F.kill=F.revert=function(){F.disable();var xe=Xs.indexOf(F);xe>=0&&Xs.splice(xe,1),Qi===F&&(Qi=0)},Xs.push(F),H&&eo(o)&&(Qi=F),F.enable(_)},zb(r,[{key:"velocityX",get:function(){return this._vx.getVelocity()}},{key:"velocityY",get:function(){return this._vy.getVelocity()}}]),r})();Wt.version="3.15.1";Wt.create=function(r){return new Wt(r)};Wt.register=tg;Wt.getAll=function(){return Xs.slice()};Wt.getById=function(r){return Xs.filter(function(e){return e.vars.id===r})[0]};Zm()&&ln.registerPlugin(Wt);var Re,Hs,it,vt,Jn,_t,rf,el,vo,to,Va,Oo,pn,dl,Uu,wn,rd,sd,Gs,ng,Al,ig,En,Fu,rg,sg,vr,Ou,sf,Zs,af,Pr,ku,Rl,ko=1,mn=Date.now,Cl=mn(),bi=0,Wa=0,ad=function(e,t,n){var i=Kn(e)&&(e.substr(0,6)==="clamp("||e.indexOf("max")>-1);return n["_"+t+"Clamp"]=i,i?e.substr(6,e.length-7):e},od=function(e,t){return t&&(!Kn(e)||e.substr(0,6)!=="clamp(")?"clamp("+e+")":e},Vb=function r(){return Wa&&requestAnimationFrame(r)},cd=function(){return dl=1},ld=function(){return dl=0},Di=function(e){return e},Xa=function(e){return Math.round(e*1e5)/1e5||0},ag=function(){return typeof window<"u"},og=function(){return Re||ag()&&(Re=window.gsap)&&Re.registerPlugin&&Re},ds=function(e){return!!~rf.indexOf(e)},cg=function(e){return(e==="Height"?af:it["inner"+e])||Jn["client"+e]||_t["client"+e]},lg=function(e){return Cr(e,"getBoundingClientRect")||(ds(e)?function(){return Uc.width=it.innerWidth,Uc.height=af,Uc}:function(){return Zi(e)})},Wb=function(e,t,n){var i=n.d,s=n.d2,a=n.a;return(a=Cr(e,"getBoundingClientRect"))?function(){return a()[i]}:function(){return(t?cg(s):e["client"+s])||0}},Xb=function(e,t){return!t||~Oi.indexOf(e)?lg(e):function(){return Uc}},Ui=function(e,t){var n=t.s,i=t.d2,s=t.d,a=t.a;return Math.max(0,(n="scroll"+i)&&(a=Cr(e,n))?a()-lg(e)()[s]:ds(e)?(Jn[n]||_t[n])-cg(i):e[n]-e["offset"+i])},Bo=function(e,t){for(var n=0;n<Gs.length;n+=3)(!t||~t.indexOf(Gs[n+1]))&&e(Gs[n],Gs[n+1],Gs[n+2])},Kn=function(e){return typeof e=="string"},_n=function(e){return typeof e=="function"},ja=function(e){return typeof e=="number"},Jr=function(e){return typeof e=="object"},Ra=function(e,t,n){return e&&e.progress(t?0:1)&&n&&e.pause()},ys=function(e,t,n){if(e.enabled){var i=e._ctx?e._ctx.add(function(){return t(e,n)}):t(e,n);i&&i.totalTime&&(e.callbackAnimation=i)}},Ss=Math.abs,ug="left",hg="top",of="right",cf="bottom",us="width",hs="height",no="Right",io="Left",ro="Top",so="Bottom",jt="padding",fi="margin",la="Width",lf="Height",$t="px",di=function(e){return it.getComputedStyle(e.nodeType===Node.DOCUMENT_NODE?e.scrollingElement:e)},jb=function(e){var t=di(e).position;e.style.position=t==="absolute"||t==="fixed"?t:"relative"},ud=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},Zi=function(e,t){var n=t&&di(e)[Uu]!=="matrix(1, 0, 0, 1, 0, 0)"&&Re.to(e,{x:0,y:0,xPercent:0,yPercent:0,rotation:0,rotationX:0,rotationY:0,scale:1,skewX:0,skewY:0}).progress(1),i=e.getBoundingClientRect?e.getBoundingClientRect():e.scrollingElement.getBoundingClientRect();return n&&n.progress(0).kill(),i},tl=function(e,t){var n=t.d2;return e["offset"+n]||e["client"+n]||0},fg=function(e){var t=[],n=e.labels,i=e.duration(),s;for(s in n)t.push(n[s]/i);return t},qb=function(e){return function(t){return Re.utils.snap(fg(e),t)}},uf=function(e){var t=Re.utils.snap(e),n=Array.isArray(e)&&e.slice(0).sort(function(i,s){return i-s});return n?function(i,s,a){a===void 0&&(a=.001);var o;if(!s)return t(i);if(s>0){for(i-=a,o=0;o<n.length;o++)if(n[o]>=i)return n[o];return n[o-1]}else for(o=n.length,i+=a;o--;)if(n[o]<=i)return n[o];return n[0]}:function(i,s,a){a===void 0&&(a=.001);var o=t(i);return!s||Math.abs(o-i)<a||o-i<0==s<0?o:t(s<0?i-e:i+e)}},Yb=function(e){return function(t,n){return uf(fg(e))(t,n.direction)}},zo=function(e,t,n,i){return n.split(",").forEach(function(s){return e(t,s,i)})},an=function(e,t,n,i,s){return e.addEventListener(t,n,{passive:!i,capture:!!s})},sn=function(e,t,n,i){return e.removeEventListener(t,n,!!i)},Ho=function(e,t,n){n=n&&n.wheelHandler,n&&(e(t,"wheel",n),e(t,"touchmove",n))},hd={startColor:"green",endColor:"red",indent:0,fontSize:"16px",fontWeight:"normal"},Go={toggleActions:"play",anticipatePin:0},nl={top:0,left:0,center:.5,bottom:1,right:1},Dc=function(e,t){if(Kn(e)){var n=e.indexOf("="),i=~n?+(e.charAt(n-1)+1)*parseFloat(e.substr(n+1)):0;~n&&(e.indexOf("%")>n&&(i*=t/100),e=e.substr(0,n-1)),e=i+(e in nl?nl[e]*t:~e.indexOf("%")?parseFloat(e)*t/100:parseFloat(e)||0)}return e},Vo=function(e,t,n,i,s,a,o,c){var l=s.startColor,u=s.endColor,h=s.fontSize,f=s.indent,d=s.fontWeight,g=vt.createElement("div"),_=ds(n)||Cr(n,"pinType")==="fixed",m=e.indexOf("scroller")!==-1,p=_?_t:n.tagName==="IFRAME"?n.contentDocument.body:n,v=e.indexOf("start")!==-1,y=v?l:u,b="border-color:"+y+";font-size:"+h+";color:"+y+";font-weight:"+d+";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";return b+="position:"+((m||c)&&_?"fixed;":"absolute;"),(m||c||!_)&&(b+=(i===Jt?of:cf)+":"+(a+parseFloat(f))+"px;"),o&&(b+="box-sizing:border-box;text-align:left;width:"+o.offsetWidth+"px;"),g._isStart=v,g.setAttribute("class","gsap-marker-"+e+(t?" marker-"+t:"")),g.style.cssText=b,g.innerText=t||t===0?e+"-"+t:e,p.children[0]?p.insertBefore(g,p.children[0]):p.appendChild(g),g._offset=g["offset"+i.op.d2],Lc(g,0,i,v),g},Lc=function(e,t,n,i){var s={display:"block"},a=n[i?"os2":"p2"],o=n[i?"p2":"os2"];e._isFlipped=i,s[n.a+"Percent"]=i?-100:0,s[n.a]=i?"1px":0,s["border"+a+la]=1,s["border"+o+la]=0,s[n.p]=t+"px",Re.set(e,s)},nt=[],Bu={},xo,fd=function(){return mn()-bi>34&&(xo||(xo=requestAnimationFrame(rr)))},Ms=function(){(!En||!En.isPressed||En.startX>_t.clientWidth)&&(rt.cache++,En?xo||(xo=requestAnimationFrame(rr)):rr(),bi||ms("scrollStart"),bi=mn())},Pl=function(){sg=it.innerWidth,rg=it.innerHeight},qa=function(e){rt.cache++,(e===!0||!pn&&!ig&&!vt.fullscreenElement&&!vt.webkitFullscreenElement&&(!Fu||sg!==it.innerWidth||Math.abs(it.innerHeight-rg)>it.innerHeight*.25))&&el.restart(!0)},ps={},Kb=[],dg=function r(){return sn(Ye,"scrollEnd",r)||ss(!0)},ms=function(e){return ps[e]&&ps[e].map(function(t){return t()})||Kb},Yn=[],pg=function(e){for(var t=0;t<Yn.length;t+=5)(!e||Yn[t+4]&&Yn[t+4].query===e)&&(Yn[t].style.cssText=Yn[t+1],Yn[t].getBBox&&Yn[t].setAttribute("transform",Yn[t+2]||""),Yn[t+3].uncache=1)},mg=function(){rt.cache++,rt.forEach(function(e){return _n(e)&&(e.rec=e())})},hf=function(e,t){var n;for(wn=0;wn<nt.length;wn++)n=nt[wn],n&&(!t||n._ctx===t)&&(e?n.kill(1):n.revert(!0,!0));Pr=!0,t&&pg(t),t||ms("revert")},gg=function(e,t){rt.cache++,(t||!An)&&rt.forEach(function(n){return _n(n)&&n.cacheID++&&(n.rec=0)}),Kn(e)&&(sf=e,it.history.scrollRestoration!==e&&(it.history.scrollRestoration=e))},An,fs=0,dd,$b=function(){if(dd!==fs){var e=dd=fs;requestAnimationFrame(function(){return e===fs&&ss(!0)})}},_g=function(){_t.appendChild(Zs),af=!En&&Zs.offsetHeight||it.innerHeight,_t.removeChild(Zs)},pd=function(e){return vo(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(t){return t.style.display=e?"none":"block"})},ss=function(e,t){if(Jn=vt.documentElement,_t=vt.body,rf=[it,vt,Jn,_t],bi&&!e&&!Pr){an(Ye,"scrollEnd",dg);return}_g(),An=Ye.isRefreshing=!0,Pr||mg();var n=ms("refreshInit");ng&&Ye.sort(),t||hf(),rt.forEach(function(i){_n(i)&&(i.smooth&&(i.target.style.scrollBehavior="auto"),i(0))}),nt.slice(0).forEach(function(i){return i.refresh()}),Pr=!1,nt.forEach(function(i){if(i._subPinOffset&&i.pin){var s=i.vars.horizontal?"offsetWidth":"offsetHeight",a=i.pin[s];i.revert(!0,1),i.adjustPinSpacing(i.pin[s]-a),i.refresh()}}),ku=1,pd(!0),nt.forEach(function(i){var s=Ui(i.scroller,i._dir),a=i.vars.end==="max"||i._endClamp&&i.end>s,o=i._startClamp&&i.start>=s;(a||o)&&i.setPositions(o?s-1:i.start,a?Math.max(o?s:i.start+1,s):i.end,!0)}),pd(!1),ku=0,n.forEach(function(i){return i&&i.render&&i.render(-1)}),rt.forEach(function(i){_n(i)&&(i.smooth&&requestAnimationFrame(function(){return i.target.style.scrollBehavior="smooth"}),i.rec&&i(i.rec))}),gg(sf,1),el.pause(),fs++,An=2,rr(2),nt.forEach(function(i){return _n(i.vars.onRefresh)&&i.vars.onRefresh(i)}),An=Ye.isRefreshing=!1,ms("refresh")},zu=0,Ic=1,ao,rr=function(e){if(e===2||!An&&!Pr){Ye.isUpdating=!0,ao&&ao.update(0);var t=nt.length,n=mn(),i=n-Cl>=50,s=t&&nt[0].scroll();if(Ic=zu>s?-1:1,An||(zu=s),i&&(bi&&!dl&&n-bi>200&&(bi=0,ms("scrollEnd")),Va=Cl,Cl=n),Ic<0){for(wn=t;wn-- >0;)nt[wn]&&nt[wn].update(0,i);Ic=1}else for(wn=0;wn<t;wn++)nt[wn]&&nt[wn].update(0,i);Ye.isUpdating=!1}xo=0},Hu=[ug,hg,cf,of,fi+so,fi+no,fi+ro,fi+io,"display","flexShrink","float","zIndex","gridColumnStart","gridColumnEnd","gridRowStart","gridRowEnd","gridArea","justifySelf","alignSelf","placeSelf","order"],Nc=Hu.concat([us,hs,"boxSizing","max"+la,"max"+lf,"position",fi,jt,jt+ro,jt+no,jt+so,jt+io]),Jb=function(e,t,n){Qs(n);var i=e._gsap;if(i.spacerIsNative)Qs(i.spacerState);else if(e._gsap.swappedIn){var s=t.parentNode;s&&(s.insertBefore(e,t),s.removeChild(t))}e._gsap.swappedIn=!1},Dl=function(e,t,n,i){if(!e._gsap.swappedIn){for(var s=Hu.length,a=t.style,o=e.style,c;s--;)c=Hu[s],a[c]=n[c];a.position=n.position==="absolute"?"absolute":"relative",n.display==="inline"&&(a.display="inline-block"),o[cf]=o[of]="auto",a.flexBasis=n.flexBasis||"auto",a.overflow="visible",a.boxSizing="border-box",a[us]=tl(e,Rn)+$t,a[hs]=tl(e,Jt)+$t,a[jt]=o[fi]=o[hg]=o[ug]="0",Qs(i),o[us]=o["max"+la]=n[us],o[hs]=o["max"+lf]=n[hs],o[jt]=n[jt],e.parentNode!==t&&(e.parentNode.insertBefore(t,e),t.appendChild(e)),e._gsap.swappedIn=!0}},Zb=/([A-Z])/g,Qs=function(e){if(e){var t=e.t.style,n=e.length,i=0,s,a;for((e.t._gsap||Re.core.getCache(e.t)).uncache=1;i<n;i+=2)a=e[i+1],s=e[i],a?t[s]=a:t[s]&&t.removeProperty(s.replace(Zb,"-$1").toLowerCase())}},Wo=function(e){for(var t=Nc.length,n=e.style,i=[],s=0;s<t;s++)i.push(Nc[s],n[Nc[s]]);return i.t=e,i},Qb=function(e,t,n){for(var i=[],s=e.length,a=n?8:0,o;a<s;a+=2)o=e[a],i.push(o,o in t?t[o]:e[a+1]);return i.t=e.t,i},Uc={left:0,top:0},md=function(e,t,n,i,s,a,o,c,l,u,h,f,d,g){_n(e)&&(e=e(c)),Kn(e)&&e.substr(0,3)==="max"&&(e=f+(e.charAt(4)==="="?Dc("0"+e.substr(3),n):0));var _=d?d.time():0,m,p,v;if(d&&d.seek(0),isNaN(e)||(e=+e),ja(e))d&&(e=Re.utils.mapRange(d.scrollTrigger.start,d.scrollTrigger.end,0,f,e)),o&&Lc(o,n,i,!0);else{_n(t)&&(t=t(c));var y=(e||"0").split(" "),b,M,E,T;v=Ln(t,c)||_t,b=Zi(v)||{},(!b||!b.left&&!b.top)&&di(v).display==="none"&&(T=v.style.display,v.style.display="block",b=Zi(v),T?v.style.display=T:v.style.removeProperty("display")),M=Dc(y[0],b[i.d]),E=Dc(y[1]||"0",n),e=b[i.p]-l[i.p]-u+M+s-E,o&&Lc(o,E,i,n-E<20||o._isStart&&E>20),n-=n-E}if(g&&(c[g]=e||-.001,e<0&&(e=0)),a){var R=e+n,x=a._isStart;m="scroll"+i.d2,Lc(a,R,i,x&&R>20||!x&&(h?Math.max(_t[m],Jn[m]):a.parentNode[m])<=R+1),h&&(l=Zi(o),h&&(a.style[i.op.p]=l[i.op.p]-i.op.m-a._offset+$t))}return d&&v&&(m=Zi(v),d.seek(f),p=Zi(v),d._caScrollDist=m[i.p]-p[i.p],e=e/d._caScrollDist*f),d&&d.seek(_),d?e:Math.round(e)},e0=/(webkit|moz|length|cssText|inset)/i,gd=function(e,t,n,i){if(e.parentNode!==t){var s=e.style,a,o;if(t===_t){e._stOrig=s.cssText,o=di(e);for(a in o)!+a&&!e0.test(a)&&o[a]&&typeof s[a]=="string"&&a!=="0"&&(s[a]=o[a]);s.top=n,s.left=i}else s.cssText=e._stOrig;Re.core.getCache(e).uncache=1,t.appendChild(e)}},bg=function(e,t,n){var i=t,s=i;return function(a){var o=Math.round(e());return o!==i&&o!==s&&Math.abs(o-i)>3&&Math.abs(o-s)>3&&(a=o,n&&n()),s=i,i=Math.round(a),i}},Xo=function(e,t,n){var i={};i[t.p]="+="+n,Re.set(e,i)},_d=function(e,t){var n=Fr(e,t),i="_scroll"+t.p2,s=function a(o,c,l,u,h){var f=a.tween,d=c.onComplete,g={};l=l||n();var _=bg(n,l,function(){f.kill(),a.tween=0});return h=u&&h||0,u=u||o-l,f&&f.kill(),c[i]=o,c.inherit=!1,c.modifiers=g,g[i]=function(){return _(l+u*f.ratio+h*f.ratio*f.ratio)},c.onUpdate=function(){rt.cache++,a.tween&&rr()},c.onComplete=function(){a.tween=0,d&&d.call(f)},f=a.tween=Re.to(e,c),f};return e[i]=n,n.wheelHandler=function(){return s.tween&&s.tween.kill()&&(s.tween=0)},an(e,"wheel",n.wheelHandler),Ye.isTouch&&an(e,"touchmove",n.wheelHandler),s},Ye=(function(){function r(t,n){Hs||r.register(Re)||console.warn("Please gsap.registerPlugin(ScrollTrigger)"),Ou(this),this.init(t,n)}var e=r.prototype;return e.init=function(n,i){if(this.progress=this.start=0,this.vars&&this.kill(!0,!0),!Wa){this.update=this.refresh=this.kill=Di;return}n=ud(Kn(n)||ja(n)||n.nodeType?{trigger:n}:n,Go);var s=n,a=s.onUpdate,o=s.toggleClass,c=s.id,l=s.onToggle,u=s.onRefresh,h=s.scrub,f=s.trigger,d=s.pin,g=s.pinSpacing,_=s.invalidateOnRefresh,m=s.anticipatePin,p=s.onScrubComplete,v=s.onSnapComplete,y=s.once,b=s.snap,M=s.pinReparent,E=s.pinSpacer,T=s.containerAnimation,R=s.fastScrollEnd,x=s.preventOverlaps,S=n.horizontal||n.containerAnimation&&n.horizontal!==!1?Rn:Jt,C=!h&&h!==0,I=Ln(n.scroller||it),U=Re.core.getCache(I),z=ds(I),W=("pinType"in n?n.pinType:Cr(I,"pinType")||z&&"fixed")==="fixed",V=[n.onEnter,n.onLeave,n.onEnterBack,n.onLeaveBack],j=C&&n.toggleActions.split(" "),H="markers"in n?n.markers:Go.markers,te=z?0:parseFloat(di(I)["border"+S.p2+la])||0,L=this,K=n.onRefreshInit&&function(){return n.onRefreshInit(L)},le=Wb(I,z,S),_e=Xb(I,z),de=0,ye=0,q=0,J=Fr(I,S),ce,Te,pe,Be,ut,D,Xe,Ue,De,F,st,Se,Ve,$e,mt,P,w,G,Z,Q,$,Me,ae,Ce,me,se,fe,Oe,Pe,he,We,N,re,oe,be,ie,ee,we,ze;if(L._startClamp=L._endClamp=!1,L._dir=S,m*=45,L.scroller=I,L.scroll=T?T.time.bind(T):J,Be=J(),Pr&&J.rec==null&&(J.rec=Be),L.vars=n,i=i||n.animation,"refreshPriority"in n&&(ng=1,n.refreshPriority===-9999&&(ao=L)),U.tweenScroll=U.tweenScroll||{top:_d(I,Jt),left:_d(I,Rn)},L.tweenTo=ce=U.tweenScroll[S.p],L.scrubDuration=function(ge){re=ja(ge)&&ge,re?N?N.duration(ge):N=Re.to(i,{ease:"expo",totalProgress:"+=0",inherit:!1,duration:re,paused:!0,onComplete:function(){return p&&p(L)}}):(N&&N.progress(1).kill(),N=0)},i&&(i.vars.lazy=!1,i._initted&&!L.isReverted||i.vars.immediateRender!==!1&&n.immediateRender!==!1&&i.duration()&&i.render(0,!0,!0),L.animation=i.pause(),i.scrollTrigger=L,L.scrubDuration(h),he=0,c||(c=i.vars.id)),b&&((!Jr(b)||b.push)&&(b={snapTo:b}),"scrollBehavior"in _t.style&&Re.set(z?[_t,Jn]:I,{scrollBehavior:"auto"}),rt.forEach(function(ge){return _n(ge)&&ge.target===(z?vt.scrollingElement||Jn:I)&&(ge.smooth=!1)}),pe=_n(b.snapTo)?b.snapTo:b.snapTo==="labels"?qb(i):b.snapTo==="labelsDirectional"?Yb(i):b.directional!==!1?function(ge,He){return uf(b.snapTo)(ge,mn()-ye<500?0:He.direction)}:Re.utils.snap(b.snapTo),oe=b.duration||{min:.1,max:2},oe=Jr(oe)?to(oe.min,oe.max):to(oe,oe),be=Re.delayedCall(b.delay||re/2||.1,function(){var ge=J(),He=mn()-ye<500,Fe=ce.tween;if((He||Math.abs(L.getVelocity())<10)&&!Fe&&!dl&&de!==ge){var je=(ge-D)/$e,Ht=i&&!C?i.totalProgress():je,Qe=He?0:(Ht-We)/(mn()-Va)*1e3||0,Pt=Re.utils.clamp(-je,1-je,Ss(Qe/2)*Qe/.185),Gt=je+(b.inertia===!1?0:Pt),At,Tt,bt=b,Vn=bt.onStart,Rt=bt.onInterrupt,vn=bt.onComplete;if(At=pe(Gt,L),ja(At)||(At=Gt),Tt=Math.max(0,Math.round(D+At*$e)),ge<=Xe&&ge>=D&&Tt!==ge){if(Fe&&!Fe._initted&&Fe.data<=Ss(Tt-ge))return;b.inertia===!1&&(Pt=At-je),ce(Tt,{duration:oe(Ss(Math.max(Ss(Gt-Ht),Ss(At-Ht))*.185/Qe/.05||0)),ease:b.ease||"power3",data:Ss(Tt-ge),onInterrupt:function(){return be.restart(!0)&&Rt&&ys(L,Rt)},onComplete:function(){L.update(),de=J(),i&&!C&&(N?N.resetTo("totalProgress",At,i._tTime/i._tDur):i.progress(At)),he=We=i&&!C?i.totalProgress():L.progress,v&&v(L),vn&&ys(L,vn)}},ge,Pt*$e,Tt-ge-Pt*$e),Vn&&ys(L,Vn,ce.tween)}}else L.isActive&&de!==ge&&be.restart(!0)}).pause()),c&&(Bu[c]=L),f=L.trigger=Ln(f||d!==!0&&d),ze=f&&f._gsap&&f._gsap.stRevert,ze&&(ze=ze(L)),d=d===!0?f:Ln(d),Kn(o)&&(o={targets:f,className:o}),d&&(g===!1||g===fi||(g=!g&&d.parentNode&&d.parentNode.style&&di(d.parentNode).display==="flex"?!1:jt),L.pin=d,Te=Re.core.getCache(d),Te.spacer?mt=Te.pinState:(E&&(E=Ln(E),E&&!E.nodeType&&(E=E.current||E.nativeElement),Te.spacerIsNative=!!E,E&&(Te.spacerState=Wo(E))),Te.spacer=G=E||vt.createElement("div"),G.classList.add("pin-spacer"),c&&G.classList.add("pin-spacer-"+c),Te.pinState=mt=Wo(d)),n.force3D!==!1&&Re.set(d,{force3D:!0}),L.spacer=G=Te.spacer,Pe=di(d),Ce=Pe[g+S.os2],Q=Re.getProperty(d),$=Re.quickSetter(d,S.a,$t),Dl(d,G,Pe),w=Wo(d)),H){Se=Jr(H)?ud(H,hd):hd,F=Vo("scroller-start",c,I,S,Se,0),st=Vo("scroller-end",c,I,S,Se,0,F),Z=F["offset"+S.op.d2];var dt=Ln(Cr(I,"content")||I);Ue=this.markerStart=Vo("start",c,dt,S,Se,Z,0,T),De=this.markerEnd=Vo("end",c,dt,S,Se,Z,0,T),T&&(we=Re.quickSetter([Ue,De],S.a,$t)),!W&&!(Oi.length&&Cr(I,"fixedMarkers")===!0)&&(jb(z?_t:I),Re.set([F,st],{force3D:!0}),se=Re.quickSetter(F,S.a,$t),Oe=Re.quickSetter(st,S.a,$t))}if(T){var xe=T.vars.onUpdate,Le=T.vars.onUpdateParams;T.eventCallback("onUpdate",function(){L.update(0,0,1),xe&&xe.apply(T,Le||[])})}if(L.previous=function(){return nt[nt.indexOf(L)-1]},L.next=function(){return nt[nt.indexOf(L)+1]},L.revert=function(ge,He){if(!He)return L.kill(!0);var Fe=ge!==!1||!L.enabled,je=pn;Fe!==L.isReverted&&(Fe&&(ie=Math.max(J(),L.scroll.rec||0),q=L.progress,ee=i&&i.progress()),Ue&&[Ue,De,F,st].forEach(function(Ht){return Ht.style.display=Fe?"none":"block"}),Fe&&(pn=L,L.update(Fe)),d&&(!M||!L.isActive)&&(Fe?Jb(d,G,mt):Dl(d,G,di(d),me)),Fe||L.update(Fe),pn=je,L.isReverted=Fe)},L.refresh=function(ge,He,Fe,je){if(!((pn||!L.enabled)&&!He)){if(d&&ge&&bi){an(r,"scrollEnd",dg);return}!An&&K&&K(L),pn=L,ce.tween&&!Fe&&(ce.tween.kill(),ce.tween=0),N&&N.pause(),_&&i&&(i.revert({kill:!1}).invalidate(),i.getChildren?i.getChildren(!0,!0,!1).forEach(function(at){return at.vars.immediateRender&&at.render(0,!0,!0)}):i.vars.immediateRender&&i.render(0,!0,!0)),L.isReverted||L.revert(!0,!0),L._subPinOffset=!1;var Ht=le(),Qe=_e(),Pt=T?T.duration():Ui(I,S),Gt=$e<=.01||!$e,At=0,Tt=je||0,bt=Jr(Fe)?Fe.end:n.end,Vn=n.endTrigger||f,Rt=Jr(Fe)?Fe.start:n.start||(n.start===0||!f?0:d?"0 0":"0 100%"),vn=L.pinnedContainer=n.pinnedContainer&&Ln(n.pinnedContainer,L),ai=f&&Math.max(0,nt.indexOf(L))||0,Kt=ai,A,O,X,Y,B,ne,ue,Ae,Ee,ke,Ne,Ie,Je;for(H&&Jr(Fe)&&(Ie=Re.getProperty(F,S.p),Je=Re.getProperty(st,S.p));Kt-- >0;)ne=nt[Kt],ne.end||ne.refresh(0,1)||(pn=L),ue=ne.pin,ue&&(ue===f||ue===d||ue===vn)&&!ne.isReverted&&(ke||(ke=[]),ke.unshift(ne),ne.revert(!0,!0)),ne!==nt[Kt]&&(ai--,Kt--);for(_n(Rt)&&(Rt=Rt(L)),Rt=ad(Rt,"start",L),D=md(Rt,f,Ht,S,J(),Ue,F,L,Qe,te,W,Pt,T,L._startClamp&&"_startClamp")||(d?-.001:0),_n(bt)&&(bt=bt(L)),Kn(bt)&&!bt.indexOf("+=")&&(~bt.indexOf(" ")?bt=(Kn(Rt)?Rt.split(" ")[0]:"")+bt:(At=Dc(bt.substr(2),Ht),bt=Kn(Rt)?Rt:(T?Re.utils.mapRange(0,T.duration(),T.scrollTrigger.start,T.scrollTrigger.end,D):D)+At,Vn=f)),bt=ad(bt,"end",L),Xe=Math.max(D,md(bt||(Vn?"100% 0":Pt),Vn,Ht,S,J()+At,De,st,L,Qe,te,W,Pt,T,L._endClamp&&"_endClamp"))||-.001,At=0,Kt=ai;Kt--;)ne=nt[Kt]||{},ue=ne.pin,ue&&ne.start-ne._pinPush<=D&&!T&&ne.end>0&&(A=ne.end-(L._startClamp?Math.max(0,ne.start):ne.start),(ue===f&&ne.start-ne._pinPush<D||ue===vn)&&isNaN(Rt)&&(At+=A*(1-ne.progress)),ue===d&&(Tt+=A));if(D+=At,Xe+=At,L._startClamp&&(L._startClamp+=At),L._endClamp&&!An&&(L._endClamp=Xe||-.001,Xe=Math.min(Xe,Ui(I,S))),$e=Xe-D||(D-=.01)&&.001,Gt&&(q=Re.utils.clamp(0,1,Re.utils.normalize(D,Xe,ie))),L._pinPush=Tt,Ue&&At&&(A={},A[S.a]="+="+At,vn&&(A[S.p]="-="+J()),Re.set([Ue,De],A)),d&&!(ku&&L.end>=Ui(I,S)))A=di(d),Y=S===Jt,X=J(),Me=parseFloat(Q(S.a))+Tt,!Pt&&Xe>1&&(Ne=(z?vt.scrollingElement||Jn:I).style,Ne={style:Ne,value:Ne["overflow"+S.a.toUpperCase()]},z&&di(_t)["overflow"+S.a.toUpperCase()]!=="scroll"&&(Ne.style["overflow"+S.a.toUpperCase()]="scroll")),Dl(d,G,A),w=Wo(d),O=Zi(d,!0),Ae=W&&Fr(I,Y?Rn:Jt)(),g?(me=[g+S.os2,$e+Tt+$t],me.t=G,Kt=g===jt?tl(d,S)+$e+Tt:0,Kt&&(me.push(S.d,Kt+$t),G.style.flexBasis!=="auto"&&(G.style.flexBasis=Kt+$t)),Qs(me),vn&&nt.forEach(function(at){at.pin===vn&&at.vars.pinSpacing!==!1&&(at._subPinOffset=!0)}),W&&J(ie)):(Kt=tl(d,S),Kt&&G.style.flexBasis!=="auto"&&(G.style.flexBasis=Kt+$t)),W&&(B={top:O.top+(Y?X-D:Ae)+$t,left:O.left+(Y?Ae:X-D)+$t,boxSizing:"border-box",position:"fixed"},B[us]=B["max"+la]=Math.ceil(O.width)+$t,B[hs]=B["max"+lf]=Math.ceil(O.height)+$t,B[fi]=B[fi+ro]=B[fi+no]=B[fi+so]=B[fi+io]="0",B[jt]=A[jt],B[jt+ro]=A[jt+ro],B[jt+no]=A[jt+no],B[jt+so]=A[jt+so],B[jt+io]=A[jt+io],P=Qb(mt,B,M),An&&J(0)),i?(Ee=i._initted,Al(1),i.render(i.duration(),!0,!0),ae=Q(S.a)-Me+$e+Tt,fe=Math.abs($e-ae)>1,W&&fe&&P.splice(P.length-2,2),i.render(0,!0,!0),Ee||i.invalidate(!0),i.parent||i.totalTime(i.totalTime()),Al(0)):ae=$e,Ne&&(Ne.value?Ne.style["overflow"+S.a.toUpperCase()]=Ne.value:Ne.style.removeProperty("overflow-"+S.a));else if(f&&J()&&!T)for(O=f.parentNode;O&&O!==_t;)O._pinOffset&&(D-=O._pinOffset,Xe-=O._pinOffset),O=O.parentNode;ke&&ke.forEach(function(at){return at.revert(!1,!0)}),L.start=D,L.end=Xe,Be=ut=An?ie:J(),!T&&!An&&!Pr&&(Be<ie&&J(ie),L.scroll.rec=0),L.revert(!1,!0),ye=mn(),be&&(de=-1,be.restart(!0)),pn=0,i&&C&&(i._initted||ee)&&i.progress()!==ee&&i.progress(ee||0,!0).render(i.time(),!0,!0),(Gt||q!==L.progress||T||_||i&&!i._initted)&&(i&&!C&&(i._initted||q||i.vars.immediateRender!==!1)&&i.totalProgress(T&&D<-.001&&!q?Re.utils.normalize(D,Xe,0):q,!0),L.progress=Gt||(Be-D)/$e===q?0:q),d&&g&&(G._pinOffset=Math.round(L.progress*ae)),N&&N.invalidate(),isNaN(Ie)||(Ie-=Re.getProperty(F,S.p),Je-=Re.getProperty(st,S.p),Xo(F,S,Ie),Xo(Ue,S,Ie-(je||0)),Xo(st,S,Je),Xo(De,S,Je-(je||0))),Gt&&!An&&L.update(),u&&!An&&!Ve&&(Ve=!0,u(L),Ve=!1)}},L.getVelocity=function(){return(J()-ut)/(mn()-Va)*1e3||0},L.endAnimation=function(){Ra(L.callbackAnimation),i&&(N?N.progress(1):i.paused()?C||Ra(i,L.direction<0,1):Ra(i,i.reversed()))},L.labelToScroll=function(ge){return i&&i.labels&&(D||L.refresh()||D)+i.labels[ge]/i.duration()*$e||0},L.getTrailing=function(ge){var He=nt.indexOf(L),Fe=L.direction>0?nt.slice(0,He).reverse():nt.slice(He+1);return(Kn(ge)?Fe.filter(function(je){return je.vars.preventOverlaps===ge}):Fe).filter(function(je){return L.direction>0?je.end<=D:je.start>=Xe})},L.update=function(ge,He,Fe){if(!(T&&!Fe&&!ge)){var je=An===!0?ie:L.scroll(),Ht=ge?0:(je-D)/$e,Qe=Ht<0?0:Ht>1?1:Ht||0,Pt=L.progress,Gt,At,Tt,bt,Vn,Rt,vn,ai;if(He&&(ut=Be,Be=T?J():je,b&&(We=he,he=i&&!C?i.totalProgress():Qe)),m&&d&&!pn&&!ko&&bi&&(!Qe&&D<je+(je-ut)/(mn()-Va)*m?Qe=1e-4:Qe===1&&Xe>je+(je-ut)/(mn()-Va)*m&&(Qe=.9999)),Qe!==Pt&&L.enabled){if(Gt=L.isActive=!!Qe&&Qe<1,At=!!Pt&&Pt<1,Rt=Gt!==At,Vn=Rt||!!Qe!=!!Pt,L.direction=Qe>Pt?1:-1,L.progress=Qe,Vn&&!pn&&(Tt=Qe&&!Pt?0:Qe===1?1:Pt===1?2:3,C&&(bt=!Rt&&j[Tt+1]!=="none"&&j[Tt+1]||j[Tt],ai=i&&(bt==="complete"||bt==="reset"||bt in i))),x&&(Rt||ai)&&(ai||h||!i)&&(_n(x)?x(L):L.getTrailing(x).forEach(function(X){return X.endAnimation()})),C||(N&&!pn&&!ko?(N._dp._time-N._start!==N._time&&N.render(N._dp._time-N._start),N.resetTo?N.resetTo("totalProgress",Qe,i._tTime/i._tDur):(N.vars.totalProgress=Qe,N.invalidate().restart())):i&&i.totalProgress(Qe,!!(pn&&(ye||ge)))),d){if(ge&&g&&(G.style[g+S.os2]=Ce),!W)$(Xa(Me+ae*Qe));else if(Vn){if(vn=!ge&&Qe>Pt&&Xe+1>je&&je+1>=Ui(I,S),M)if(!ge&&(Gt||vn)){var Kt=Zi(d,!0),A=je-D;gd(d,_t,Kt.top+(S===Jt?A:0)+$t,Kt.left+(S===Jt?0:A)+$t)}else gd(d,G);Qs(Gt||vn?P:w),fe&&Qe<1&&Gt||$(Me+(Qe===1&&!vn?ae:0))}}b&&!ce.tween&&!pn&&!ko&&be.restart(!0),o&&(Rt||y&&Qe&&(Qe<1||!Rl))&&vo(o.targets).forEach(function(X){return X.classList[Gt||y?"add":"remove"](o.className)}),a&&!C&&!ge&&a(L),Vn&&!pn?(C&&(ai&&(bt==="complete"?i.pause().totalProgress(1):bt==="reset"?i.restart(!0).pause():bt==="restart"?i.restart(!0):i[bt]()),a&&a(L)),(Rt||!Rl)&&(l&&Rt&&ys(L,l),V[Tt]&&ys(L,V[Tt]),y&&(Qe===1?L.kill(!1,1):V[Tt]=0),Rt||(Tt=Qe===1?1:3,V[Tt]&&ys(L,V[Tt]))),R&&!Gt&&Math.abs(L.getVelocity())>(ja(R)?R:2500)&&(Ra(L.callbackAnimation),N?N.progress(1):Ra(i,bt==="reverse"?1:!Qe,1))):C&&a&&!pn&&a(L)}if(Oe){var O=T?je/T.duration()*(T._caScrollDist||0):je;se(O+(F._isFlipped?1:0)),Oe(O)}we&&we(-je/T.duration()*(T._caScrollDist||0))}},L.enable=function(ge,He){L.enabled||(L.enabled=!0,an(I,"resize",qa),z||an(I,"scroll",Ms),K&&an(r,"refreshInit",K),ge!==!1&&(L.progress=q=0,Be=ut=de=J()),He!==!1&&L.refresh())},L.getTween=function(ge){return ge&&ce?ce.tween:N},L.setPositions=function(ge,He,Fe,je){if(T){var Ht=T.scrollTrigger,Qe=T.duration(),Pt=Ht.end-Ht.start;ge=Ht.start+Pt*ge/Qe,He=Ht.start+Pt*He/Qe}L.refresh(!1,!1,{start:od(ge,Fe&&!!L._startClamp),end:od(He,Fe&&!!L._endClamp)},je),L.update()},L.adjustPinSpacing=function(ge){if(me&&ge){var He=me.indexOf(S.d)+1;me[He]=parseFloat(me[He])+ge+$t,me[1]=parseFloat(me[1])+ge+$t,Qs(me)}},L.disable=function(ge,He){if(ge!==!1&&L.revert(!0,!0),L.enabled&&(L.enabled=L.isActive=!1,He||N&&N.pause(),ie=0,Te&&(Te.uncache=1),K&&sn(r,"refreshInit",K),be&&(be.pause(),ce.tween&&ce.tween.kill()&&(ce.tween=0)),!z)){for(var Fe=nt.length;Fe--;)if(nt[Fe].scroller===I&&nt[Fe]!==L)return;sn(I,"resize",qa),z||sn(I,"scroll",Ms)}},L.kill=function(ge,He){L.disable(ge,He),N&&!He&&N.kill(),c&&delete Bu[c];var Fe=nt.indexOf(L);Fe>=0&&nt.splice(Fe,1),Fe===wn&&Ic>0&&wn--,Fe=0,nt.forEach(function(je){return je.scroller===L.scroller&&(Fe=1)}),Fe||An||Pr||(L.scroll.rec=0),i&&(i.scrollTrigger=null,ge&&i.revert({kill:!1}),He||i.kill()),Ue&&[Ue,De,F,st].forEach(function(je){return je.parentNode&&je.parentNode.removeChild(je)}),ao===L&&(ao=0),d&&(Te&&(Te.uncache=1),Fe=0,nt.forEach(function(je){return je.pin===d&&Fe++}),Fe||(Te.spacer=0)),n.onKill&&n.onKill(L)},nt.push(L),L.enable(!1,!1),ze&&ze(L),i&&i.add&&!$e){var Ke=L.update;L.update=function(){L.update=Ke,rt.cache++,D||Xe||L.refresh()},Re.delayedCall(.01,L.update),$e=.01,D=Xe=0}else L.refresh();d&&$b()},r.register=function(n){return Hs||(Re=n||og(),ag()&&window.document&&r.enable(),Hs=Wa),Hs},r.defaults=function(n){if(n)for(var i in n)Go[i]=n[i];return Go},r.disable=function(n,i){Wa=0,nt.forEach(function(a){return a[i?"kill":"disable"](n)}),sn(it,"wheel",Ms),sn(vt,"scroll",Ms),clearInterval(Oo),sn(vt,"touchcancel",Di),sn(_t,"touchstart",Di),zo(sn,vt,"pointerdown,touchstart,mousedown",cd),zo(sn,vt,"pointerup,touchend,mouseup",ld),el.kill(),Bo(sn);for(var s=0;s<rt.length;s+=3)Ho(sn,rt[s],rt[s+1]),Ho(sn,rt[s],rt[s+2])},r.enable=function(){if(it=window,vt=document,Jn=vt.documentElement,_t=vt.body,Re){if(vo=Re.utils.toArray,to=Re.utils.clamp,Ou=Re.core.context||Di,Al=Re.core.suppressOverwrites||Di,sf=it.history.scrollRestoration||"auto",zu=it.pageYOffset||0,Re.core.globals("ScrollTrigger",r),_t){Wa=1,Zs=document.createElement("div"),Zs.style.height="100vh",Zs.style.position="absolute",_g(),Vb(),Wt.register(Re),r.isTouch=Wt.isTouch,vr=Wt.isTouch&&/(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),Fu=Wt.isTouch===1,an(it,"wheel",Ms),rf=[it,vt,Jn,_t],Re.matchMedia?(r.matchMedia=function(u){var h=Re.matchMedia(),f;for(f in u)h.add(f,u[f]);return h},Re.addEventListener("matchMediaInit",function(){mg(),hf()}),Re.addEventListener("matchMediaRevert",function(){return pg()}),Re.addEventListener("matchMedia",function(){ss(0,1),ms("matchMedia")}),Re.matchMedia().add("(orientation: portrait)",function(){return Pl(),Pl})):console.warn("Requires GSAP 3.11.0 or later"),Pl(),an(vt,"scroll",Ms);var n=_t.hasAttribute("style"),i=_t.style,s=i.borderTopStyle,a=Re.core.Animation.prototype,o,c;for(a.revert||Object.defineProperty(a,"revert",{value:function(){return this.time(-.01,!0)}}),i.borderTopStyle="solid",o=Zi(_t),Jt.m=Math.round(o.top+Jt.sc())||0,Rn.m=Math.round(o.left+Rn.sc())||0,s?i.borderTopStyle=s:i.removeProperty("border-top-style"),n||(_t.setAttribute("style",""),_t.removeAttribute("style")),Oo=setInterval(fd,250),Re.delayedCall(.5,function(){return ko=0}),an(vt,"touchcancel",Di),an(_t,"touchstart",Di),zo(an,vt,"pointerdown,touchstart,mousedown",cd),zo(an,vt,"pointerup,touchend,mouseup",ld),Uu=Re.utils.checkPrefix("transform"),Nc.push(Uu),Hs=mn(),el=Re.delayedCall(.2,ss).pause(),Gs=[vt,"visibilitychange",function(){var u=it.innerWidth,h=it.innerHeight;vt.hidden?(rd=u,sd=h):(rd!==u||sd!==h)&&qa()},vt,"DOMContentLoaded",ss,it,"load",ss,it,"resize",qa],Bo(an),nt.forEach(function(u){return u.enable(0,1)}),c=0;c<rt.length;c+=3)Ho(sn,rt[c],rt[c+1]),Ho(sn,rt[c],rt[c+2])}else if(vt){var l=function u(){r.enable(),vt.removeEventListener("DOMContentLoaded",u)};vt.addEventListener("DOMContentLoaded",l)}}},r.config=function(n){"limitCallbacks"in n&&(Rl=!!n.limitCallbacks);var i=n.syncInterval;i&&clearInterval(Oo)||(Oo=i)&&setInterval(fd,i),"ignoreMobileResize"in n&&(Fu=r.isTouch===1&&n.ignoreMobileResize),"autoRefreshEvents"in n&&(Bo(sn)||Bo(an,n.autoRefreshEvents||"none"),ig=(n.autoRefreshEvents+"").indexOf("resize")===-1)},r.scrollerProxy=function(n,i){var s=Ln(n),a=rt.indexOf(s),o=ds(s);~a&&rt.splice(a,o?6:2),i&&(o?Oi.unshift(it,i,_t,i,Jn,i):Oi.unshift(s,i))},r.clearMatchMedia=function(n){nt.forEach(function(i){return i._ctx&&i._ctx.query===n&&i._ctx.kill(!0,!0)})},r.isInViewport=function(n,i,s){var a=(Kn(n)?Ln(n):n).getBoundingClientRect(),o=a[s?us:hs]*i||0;return s?a.right-o>0&&a.left+o<it.innerWidth:a.bottom-o>0&&a.top+o<it.innerHeight},r.positionInViewport=function(n,i,s){Kn(n)&&(n=Ln(n));var a=n.getBoundingClientRect(),o=a[s?us:hs],c=i==null?o/2:i in nl?nl[i]*o:~i.indexOf("%")?parseFloat(i)*o/100:parseFloat(i)||0;return s?(a.left+c)/it.innerWidth:(a.top+c)/it.innerHeight},r.killAll=function(n){if(nt.slice(0).forEach(function(s){return s.vars.id!=="ScrollSmoother"&&s.kill()}),n!==!0){var i=ps.killAll||[];ps={},i.forEach(function(s){return s()})}},r})();Ye.version="3.15.1";Ye.saveStyles=function(r){return r?vo(r).forEach(function(e){if(e&&e.style){var t=Yn.indexOf(e);t>=0&&Yn.splice(t,5),Yn.push(e,e.style.cssText,e.getBBox&&e.getAttribute("transform"),Re.core.getCache(e),Ou())}}):Yn};Ye.revert=function(r,e){return hf(!r,e)};Ye.create=function(r,e){return new Ye(r,e)};Ye.refresh=function(r){return r?qa(!0):(Hs||Ye.register())&&ss(!0)};Ye.update=function(r){return++rt.cache&&rr(r===!0?2:0)};Ye.clearScrollMemory=gg;Ye.maxScroll=function(r,e){return Ui(r,e?Rn:Jt)};Ye.getScrollFunc=function(r,e){return Fr(Ln(r),e?Rn:Jt)};Ye.getById=function(r){return Bu[r]};Ye.getAll=function(){return nt.filter(function(r){return r.vars.id!=="ScrollSmoother"})};Ye.isScrolling=function(){return!!bi};Ye.snapDirectional=uf;Ye.addEventListener=function(r,e){var t=ps[r]||(ps[r]=[]);~t.indexOf(e)||t.push(e)};Ye.removeEventListener=function(r,e){var t=ps[r],n=t&&t.indexOf(e);n>=0&&t.splice(n,1)};Ye.batch=function(r,e){var t=[],n={},i=e.interval||.016,s=e.batchMax||1e9,a=function(l,u){var h=[],f=[],d=Re.delayedCall(i,function(){u(h,f),h=[],f=[]}).pause();return function(g){h.length||d.restart(!0),h.push(g.trigger),f.push(g),s<=h.length&&d.progress(1)}},o;for(o in e)n[o]=o.substr(0,2)==="on"&&_n(e[o])&&o!=="onRefreshInit"?a(o,e[o]):e[o];return _n(s)&&(s=s(),an(Ye,"refresh",function(){return s=e.batchMax()})),vo(r).forEach(function(c){var l={};for(o in n)l[o]=n[o];l.trigger=c,t.push(Ye.create(l))}),t};var bd=function(e,t,n,i){return t>i?e(i):t<0&&e(0),n>i?(i-t)/(n-t):n<0?t/(t-n):1},Ll=function r(e,t){t===!0?e.style.removeProperty("touch-action"):e.style.touchAction=t===!0?"auto":t?"pan-"+t+(Wt.isTouch?" pinch-zoom":""):"none",e===Jn&&r(_t,t)},jo={auto:1,scroll:1},t0=function(e){var t=e.event,n=e.target,i=e.axis,s=(t.changedTouches?t.changedTouches[0]:t).target,a=s._gsap||Re.core.getCache(s),o=mn(),c;if(!a._isScrollT||o-a._isScrollT>2e3){for(;s&&s!==_t&&(s.scrollHeight<=s.clientHeight&&s.scrollWidth<=s.clientWidth||!(jo[(c=di(s)).overflowY]||jo[c.overflowX]));)s=s.parentNode;a._isScroll=s&&s!==n&&!ds(s)&&(jo[(c=di(s)).overflowY]||jo[c.overflowX]),a._isScrollT=o}(a._isScroll||i==="x")&&(t.stopPropagation(),t._gsapAllow=!0)},vg=function(e,t,n,i){return Wt.create({target:e,capture:!0,debounce:!1,lockAxis:!0,type:t,onWheel:i=i&&t0,onPress:i,onDrag:i,onScroll:i,onEnable:function(){return n&&an(vt,Wt.eventTypes[0],xd,!1,!0)},onDisable:function(){return sn(vt,Wt.eventTypes[0],xd,!0)}})},n0=/(input|label|select|textarea)/i,vd,xd=function(e){var t=n0.test(e.target.tagName);(t||vd)&&(e._gsapAllow=!0,vd=t)},i0=function(e){Jr(e)||(e={}),e.preventDefault=e.isNormalizer=e.allowClicks=!0,e.type||(e.type="wheel,touch"),e.debounce=!!e.debounce,e.id=e.id||"normalizer";var t=e,n=t.normalizeScrollX,i=t.momentum,s=t.allowNestedScroll,a=t.onRelease,o,c,l=Ln(e.target)||Jn,u=Re.core.globals().ScrollSmoother,h=u&&u.get(),f=vr&&(e.content&&Ln(e.content)||h&&e.content!==!1&&!h.smooth()&&h.content()),d=Fr(l,Jt),g=Fr(l,Rn),_=1,m=(Wt.isTouch&&it.visualViewport?it.visualViewport.scale*it.visualViewport.width:it.outerWidth)/it.innerWidth,p=0,v=_n(i)?function(){return i(o)}:function(){return i||2.8},y,b,M=vg(l,e.type,!0,s),E=function(){return b=!1},T=Di,R=Di,x=function(){c=Ui(l,Jt),R=to(vr?1:0,c),n&&(T=to(0,Ui(l,Rn))),y=fs},S=function(){f._gsap.y=Xa(parseFloat(f._gsap.y)+d.offset)+"px",f.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+parseFloat(f._gsap.y)+", 0, 1)",d.offset=d.cacheID=0},C=function(){if(b){requestAnimationFrame(E);var H=Xa(o.deltaY/2),te=R(d.v-H);if(f&&te!==d.v+d.offset){d.offset=te-d.v;var L=Xa((parseFloat(f&&f._gsap.y)||0)-d.offset);f.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+L+", 0, 1)",f._gsap.y=L+"px",d.cacheID=rt.cache,rr()}return!0}d.offset&&S(),b=!0},I,U,z,W,V=function(){x(),I.isActive()&&I.vars.scrollY>c&&(d()>c?I.progress(1)&&d(c):I.resetTo("scrollY",c))};return f&&Re.set(f,{y:"+=0"}),e.ignoreCheck=function(j){return vr&&j.type==="touchmove"&&C()||_>1.05&&j.type!=="touchstart"||o.isGesturing||j.touches&&j.touches.length>1},e.onPress=function(){b=!1;var j=_;_=Xa((it.visualViewport&&it.visualViewport.scale||1)/m),I.pause(),j!==_&&Ll(l,_>1.01?!0:n?!1:"x"),U=g(),z=d(),x(),y=fs},e.onRelease=e.onGestureStart=function(j,H){if(d.offset&&S(),!H)W.restart(!0);else{rt.cache++;var te=v(),L,K;n&&(L=g(),K=L+te*.05*-j.velocityX/.227,te*=bd(g,L,K,Ui(l,Rn)),I.vars.scrollX=T(K)),L=d(),K=L+te*.05*-j.velocityY/.227,te*=bd(d,L,K,Ui(l,Jt)),I.vars.scrollY=R(K),I.invalidate().duration(te).play(.01),(vr&&I.vars.scrollY>=c||L>=c-1)&&Re.to({},{onUpdate:V,duration:te})}a&&a(j)},e.onWheel=function(){I._ts&&I.pause(),mn()-p>1e3&&(y=0,p=mn())},e.onChange=function(j,H,te,L,K){if(fs!==y&&x(),H&&n&&g(T(L[2]===H?U+(j.startX-j.x):g()+H-L[1])),te){d.offset&&S();var le=K[2]===te,_e=le?z+j.startY-j.y:d()+te-K[1],de=R(_e);le&&_e!==de&&(z+=de-_e),d(de)}(te||H)&&rr()},e.onEnable=function(){Ll(l,n?!1:"x"),Ye.addEventListener("refresh",V),an(it,"resize",V),d.smooth&&(d.target.style.scrollBehavior="auto",d.smooth=g.smooth=!1),M.enable()},e.onDisable=function(){Ll(l,!0),sn(it,"resize",V),Ye.removeEventListener("refresh",V),M.kill()},e.lockAxis=e.lockAxis!==!1,o=new Wt(e),o.iOS=vr,vr&&!d()&&d(1),vr&&Re.ticker.add(Di),W=o._dc,I=Re.to(o,{ease:"power4",paused:!0,inherit:!1,scrollX:n?"+=0.1":"+=0",scrollY:"+=0.1",modifiers:{scrollY:bg(d,d(),function(){return I.pause()})},onUpdate:rr,onComplete:W.vars.onComplete}),o};Ye.sort=function(r){if(_n(r))return nt.sort(r);var e=it.pageYOffset||0;return Ye.getAll().forEach(function(t){return t._sortY=t.trigger?e+t.trigger.getBoundingClientRect().top:t.start+it.innerHeight}),nt.sort(r||function(t,n){return(t.vars.refreshPriority||0)*-1e6+(t.vars.containerAnimation?1e6:t._sortY)-((n.vars.containerAnimation?1e6:n._sortY)+(n.vars.refreshPriority||0)*-1e6)})};Ye.observe=function(r){return new Wt(r)};Ye.normalizeScroll=function(r){if(typeof r>"u")return En;if(r===!0&&En)return En.enable();if(r===!1){En&&En.kill(),En=r;return}var e=r instanceof Wt?r:i0(r);return En&&En.target===e.target&&En.kill(),ds(e.target)&&(En=e),e};Ye.core={_getVelocityProp:Nu,_inputObserver:vg,_scrollers:rt,_proxies:Oi,bridge:{ss:function(){bi||ms("scrollStart"),bi=mn()},ref:function(){return pn}}};og()&&Re.registerPlugin(Ye);let Ca,Pa,yd=typeof Symbol=="function"?Symbol():"_split",Gu,r0=()=>Gu||ff.register(window.gsap),Sd=typeof Intl<"u"&&"Segmenter"in Intl?new Intl.Segmenter:0,yo=r=>r?typeof r=="string"?yo(document.querySelectorAll(r)):"length"in r?Array.from(r).reduce((e,t)=>(typeof t=="string"?e.push(...yo(t)):e.push(t),e),[]):[r]:[],Md=r=>yo(r).filter(e=>e&&e.nodeType===1),Fc=[],Il=function(){},s0={add:r=>r()},a0=/\s+/g,Td=new RegExp("\\p{RI}\\p{RI}|\\p{Emoji}(\\p{EMod}|\\u{FE0F}\\u{20E3}?|[\\u{E0020}-\\u{E007E}]+\\u{E007F})?(\\u{200D}\\p{Emoji}(\\p{EMod}|\\u{FE0F}\\u{20E3}?|[\\u{E0020}-\\u{E007E}]+\\u{E007F})?)*|.","gu"),il={left:0,top:0,width:0,height:0},o0=(r,e)=>{for(;++e<r.length&&r[e]===il;);return r[e]||il},Ed=({element:r,html:e,ariaL:t,ariaH:n})=>{r.innerHTML=e,t?r.setAttribute("aria-label",t):r.removeAttribute("aria-label"),n?r.setAttribute("aria-hidden",n):r.removeAttribute("aria-hidden")},wd=(r,e)=>{if(e){let t=new Set(r.join("").match(e)||Fc),n=r.length,i,s,a,o;if(t.size)for(;--n>-1;){s=r[n];for(a of t)if(a.startsWith(s)&&a.length>s.length){for(i=0,o=s;a.startsWith(o+=r[n+ ++i])&&o.length<a.length;);if(i&&o.length===a.length){r[n]=a,r.splice(n+1,i);break}}}}return r},Ad=r=>window.getComputedStyle(r).display==="inline"&&(r.style.display="inline-block"),Ts=(r,e,t)=>e.insertBefore(typeof r=="string"?document.createTextNode(r):r,t),Vu=(r,e,t)=>{let n=e[r+"sClass"]||"",{tag:i="div",aria:s="auto",propIndex:a=!1}=e,o=r==="line"?"block":"inline-block",c=n.indexOf("++")>-1,l=u=>{let h=document.createElement(i),f=t.length+1;return n&&(h.className=n+(c?" "+n+f:"")),a&&h.style.setProperty("--"+r,f+""),s!=="none"&&h.setAttribute("aria-hidden","true"),i!=="span"&&(h.style.position="relative",h.style.display=o),h.textContent=u,t.push(h),h};return c&&(n=n.replace("++","")),l.collection=t,l},c0=(r,e,t,n)=>{let i=Vu("line",t,n),s=window.getComputedStyle(r).textAlign||"left";return(a,o)=>{let c=i("");for(c.style.textAlign=s,r.insertBefore(c,e[a]);a<o;a++)c.appendChild(e[a]);c.normalize()}},xg=(r,e,t,n,i,s,a,o,c,l)=>{var u;let h=Array.from(r.childNodes),f=0,{wordDelimiter:d,reduceWhiteSpace:g=!0,prepareText:_}=e,m=r.getBoundingClientRect(),p=m,v=!g&&window.getComputedStyle(r).whiteSpace.substring(0,3)==="pre",y=s&&l&&window.getComputedStyle(r).direction==="rtl",b=0,M=t.collection,E,T,R,x,S,C,I,U,z,W,V,j,H,te,L,K,le,_e;for(typeof d=="object"?(R=d.delimiter||d,T=d.replaceWith||""):T=d===""?"":d||" ",E=T!==" ";f<h.length;f++)if(x=h[f],x.nodeType===3){for(L=x.textContent||"",g?L=L.replace(a0," "):v&&(L=L.replace(/\n/g,T+`
`)),_&&(L=_(L,r)),x.textContent=L,S=T||R?L.split(R||T):L.match(o)||Fc,le=S[S.length-1],U=E?le.slice(-1)===" ":!le,le||S.pop(),p=m,I=E?S[0].charAt(0)===" ":!S[0],I&&Ts(" ",r,x),S[0]||S.shift(),wd(S,c),s&&l||(x.textContent=""),z=1;z<=S.length;z++)if(K=S[z-1],!g&&v&&K.charAt(0)===`
`&&((u=x.previousSibling)==null||u.remove(),Ts(document.createElement("br"),r,x),K=K.slice(1)),!g&&K==="")Ts(T,r,x);else if(K===" ")r.insertBefore(document.createTextNode(" "),x);else{if(E&&K.charAt(0)===" "&&Ts(" ",r,x),b&&z===1&&!I&&M.indexOf(b.parentNode)>-1?(C=M[M.length-1],C.appendChild(document.createTextNode(n?"":K))):(C=t(n?"":K),Ts(C,r,x),b&&z===1&&!I&&C.insertBefore(b,C.firstChild)),n){if(V=Sd?wd([...Sd.segment(K)].map(de=>de.segment),c):K.match(o)||Fc,c){let de=K.match(c);de&&de.some(ye=>V.indexOf(ye)<0)&&(V=K.match(o)||Fc)}for(_e=0;_e<V.length;_e++)C.appendChild(V[_e]===" "?document.createTextNode(" "):n(V[_e]))}if(s&&l){if(L=x.textContent=L.substring(K.length+1,L.length),W=C.getBoundingClientRect(),W.top>p.top&&(y?W.left>=p.left:W.left<=p.left)){for(j=r.cloneNode(),H=r.childNodes[0];H&&H!==C;)te=H,H=H.nextSibling,j.appendChild(te);r.parentNode.insertBefore(j,r),i&&Ad(j)}p=W}(z<S.length||U)&&Ts(z>=S.length?" ":E&&K.slice(-1)===" "?" "+T:T,r,x)}r.removeChild(x),b=0}else x.nodeType===1&&(a&&a.indexOf(x)>-1?(M.indexOf(x.previousSibling)>-1&&M[M.length-1].appendChild(x),b=x):(xg(x,e,t,n,i,s,a,o,c,!0),b=0),i&&Ad(x))};const yg=class Sg{constructor(e,t){this.isSplit=!1,r0(),this.elements=Md(e),this.chars=[],this.words=[],this.lines=[],this.masks=[],this.vars=t,this.elements.forEach(s=>{var a;t.overwrite!==!1&&((a=s[yd])==null||a._data.orig.filter(({element:o})=>o===s).forEach(Ed)),s[yd]=this}),this._split=()=>this.isSplit&&this.split(this.vars);let n=[],i=()=>{let s=n.length,a;for(;s--;){a=n[s];let o=a.element.offsetWidth;if(o!==a.width){a.width=o,this._split();return}}};this._data={orig:n,obs:typeof ResizeObserver<"u"&&new ResizeObserver(()=>{clearTimeout(this._data.t),this._data.t=setTimeout(i,200)})},Il(this),this.split(t)}split(e){return(this._ctx||s0).add(()=>{this.isSplit&&this.revert(),this.vars=e=e||this.vars||{};let{type:t="chars,words,lines",aria:n="auto",deepSlice:i=!0,smartWrap:s,onSplit:a,autoSplit:o=!1,specialChars:c,mask:l}=this.vars,u=t.indexOf("lines")>-1,h=t.indexOf("chars")>-1,f=t.indexOf("words")>-1,d=h&&!f&&!u,g=c&&("push"in c?new RegExp("(?:"+c.join("|")+")","gu"):c),_=g?new RegExp(g.source+"|"+Td.source,"gu"):Td,m=!!e.ignore&&Md(e.ignore),{orig:p,animTime:v,obs:y}=this._data,b;(h||f||u)&&(this.elements.forEach((M,E)=>{p[E]={element:M,html:M.innerHTML,ariaL:M.getAttribute("aria-label"),ariaH:M.getAttribute("aria-hidden")},n==="auto"?M.setAttribute("aria-label",(M.textContent||"").trim()):n==="hidden"&&M.setAttribute("aria-hidden","true");let T=[],R=[],x=[],S=h?Vu("char",e,T):null,C=Vu("word",e,R),I,U,z,W;if(xg(M,e,C,S,d,i&&(u||d),m,_,g,!1),u){let V=yo(M.childNodes),j=c0(M,V,e,x),H,te=[],L=0,K=window.getComputedStyle(M).direction==="rtl",le=V.map(ye=>ye.nodeType===1?ye.getBoundingClientRect():il),_e=il,de;for(I=0;I<V.length;I++)H=V[I],H.nodeType===1&&(H.nodeName==="BR"?((!I||V[I-1].nodeName!=="BR")&&(te.push(H),j(L,I+1)),L=I+1,_e=o0(le,I)):(de=le[I],I&&de.top>_e.top&&(K?de.left+de.width>_e.left+1:de.left<_e.left+_e.width-1)&&(j(L,I),L=I),_e=de));L<I&&j(L,I),te.forEach(ye=>{var q;return(q=ye.parentNode)==null?void 0:q.removeChild(ye)})}if(!f){for(I=0;I<R.length;I++)if(U=R[I],h||!U.nextSibling||U.nextSibling.nodeType!==3)if(s&&!u){for(z=document.createElement("span"),z.style.whiteSpace="nowrap";U.firstChild;)z.appendChild(U.firstChild);U.replaceWith(z)}else U.replaceWith(...U.childNodes);else W=U.nextSibling,W&&W.nodeType===3&&(W.textContent=(U.textContent||"")+(W.textContent||""),U.remove());R.length=0,M.normalize()}this.lines.push(...x),this.words.push(...R),this.chars.push(...T)}),l&&this[l]&&this.masks.push(...this[l].map(M=>{let E=M.cloneNode();return M.replaceWith(E),E.appendChild(M),M.className&&(E.className=M.className.trim().split(" ").map(T=>T+"-mask").join(" ")),E.style.overflow="clip",E.style.verticalAlign="top",E}))),this.isSplit=!0,Pa&&u&&o&&Pa.addEventListener("loadingdone",this._split),(b=a&&a(this))&&b.totalTime&&(this._data.anim=v?b.totalTime(v):b),u&&o&&this.elements.forEach((M,E)=>{p[E].width=M.offsetWidth,y&&y.observe(M)})}),this}kill(){let{obs:e,t}=this._data;e&&e.disconnect(),clearTimeout(t),Pa?.removeEventListener("loadingdone",this._split)}revert(){var e,t;if(this.isSplit){let{orig:n,anim:i}=this._data;this.kill(),n.forEach(Ed),this.chars.length=this.words.length=this.lines.length=n.length=this.masks.length=0,this.isSplit=!1,i&&(this._data.animTime=i.totalTime(),i.revert()),(t=(e=this.vars).onRevert)==null||t.call(e,this)}return this}static create(e,t){return new Sg(e,t)}static register(e){Ca=Ca||e||window.gsap,Ca&&(yo=Ca.utils.toArray,Il=Ca.core.context||Il),!Gu&&window.innerWidth>0&&(Pa=document.fonts,Gu=!0)}};yg.version="3.15.1";let ff=yg;const df="180",l0=0,Rd=1,u0=2,Mg=1,h0=2,Ki=3,cr=0,Hn=1,Fn=2,Dr=0,ea=1,ts=2,Cd=3,Pd=4,f0=5,ns=100,d0=101,p0=102,m0=103,g0=104,_0=200,b0=201,v0=202,x0=203,Wu=204,Xu=205,y0=206,S0=207,M0=208,T0=209,E0=210,w0=211,A0=212,R0=213,C0=214,ju=0,qu=1,Yu=2,ua=3,Ku=4,$u=5,Ju=6,Zu=7,Tg=0,P0=1,D0=2,Lr=0,L0=1,I0=2,N0=3,U0=4,F0=5,O0=6,k0=7,Dd="attached",B0="detached",Eg=300,ha=301,fa=302,Qu=303,eh=304,pl=306,da=1e3,wr=1001,rl=1002,Cn=1003,wg=1004,Ya=1005,ni=1006,Oc=1007,er=1008,zi=1009,Ag=1010,Rg=1011,So=1012,pf=1013,gs=1014,Ei=1015,Do=1016,mf=1017,gf=1018,Mo=1020,Cg=35902,Pg=35899,Dg=1021,Lg=1022,_i=1023,To=1026,Eo=1027,_f=1028,bf=1029,Ig=1030,vf=1031,xf=1033,kc=33776,Bc=33777,zc=33778,Hc=33779,th=35840,nh=35841,ih=35842,rh=35843,sh=36196,ah=37492,oh=37496,ch=37808,lh=37809,uh=37810,hh=37811,fh=37812,dh=37813,ph=37814,mh=37815,gh=37816,_h=37817,bh=37818,vh=37819,xh=37820,yh=37821,Sh=36492,Mh=36494,Th=36495,Eh=36283,wh=36284,Ah=36285,Rh=36286,wo=2300,Ao=2301,Nl=2302,Ld=2400,Id=2401,Nd=2402,z0=2500,H0=0,Ng=1,Ch=2,G0=3200,V0=3201,Ug=0,W0=1,xr="",cn="srgb",Pn="srgb-linear",sl="linear",St="srgb",Es=7680,Ud=519,X0=512,j0=513,q0=514,Fg=515,Y0=516,K0=517,$0=518,J0=519,Ph=35044,Fd="300 es",Fi=2e3,al=2001;class xa{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const i=n[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let s=0,a=i.length;s<a;s++)i[s].call(this,e);e.target=null}}}const fn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Od=1234567;const ta=Math.PI/180,pa=180/Math.PI;function Ai(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(fn[r&255]+fn[r>>8&255]+fn[r>>16&255]+fn[r>>24&255]+"-"+fn[e&255]+fn[e>>8&255]+"-"+fn[e>>16&15|64]+fn[e>>24&255]+"-"+fn[t&63|128]+fn[t>>8&255]+"-"+fn[t>>16&255]+fn[t>>24&255]+fn[n&255]+fn[n>>8&255]+fn[n>>16&255]+fn[n>>24&255]).toLowerCase()}function ot(r,e,t){return Math.max(e,Math.min(t,r))}function yf(r,e){return(r%e+e)%e}function Z0(r,e,t,n,i){return n+(r-e)*(i-n)/(t-e)}function Q0(r,e,t){return r!==e?(t-r)/(e-r):0}function oo(r,e,t){return(1-t)*r+t*e}function ev(r,e,t,n){return oo(r,e,1-Math.exp(-t*n))}function tv(r,e=1){return e-Math.abs(yf(r,e*2)-e)}function nv(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*(3-2*r))}function iv(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*r*(r*(r*6-15)+10))}function rv(r,e){return r+Math.floor(Math.random()*(e-r+1))}function sv(r,e){return r+Math.random()*(e-r)}function av(r){return r*(.5-Math.random())}function ov(r){r!==void 0&&(Od=r);let e=Od+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function cv(r){return r*ta}function lv(r){return r*pa}function uv(r){return(r&r-1)===0&&r!==0}function hv(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function fv(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function dv(r,e,t,n,i){const s=Math.cos,a=Math.sin,o=s(t/2),c=a(t/2),l=s((e+n)/2),u=a((e+n)/2),h=s((e-n)/2),f=a((e-n)/2),d=s((n-e)/2),g=a((n-e)/2);switch(i){case"XYX":r.set(o*u,c*h,c*f,o*l);break;case"YZY":r.set(c*f,o*u,c*h,o*l);break;case"ZXZ":r.set(c*h,c*f,o*u,o*l);break;case"XZX":r.set(o*u,c*g,c*d,o*l);break;case"YXY":r.set(c*d,o*u,c*g,o*l);break;case"ZYZ":r.set(c*g,c*d,o*u,o*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Ti(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function xt(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const pv={DEG2RAD:ta,RAD2DEG:pa,generateUUID:Ai,clamp:ot,euclideanModulo:yf,mapLinear:Z0,inverseLerp:Q0,lerp:oo,damp:ev,pingpong:tv,smoothstep:nv,smootherstep:iv,randInt:rv,randFloat:sv,randFloatSpread:av,seededRandom:ov,degToRad:cv,radToDeg:lv,isPowerOfTwo:uv,ceilPowerOfTwo:hv,floorPowerOfTwo:fv,setQuaternionFromProperEuler:dv,normalize:xt,denormalize:Ti};class lt{constructor(e=0,t=0){lt.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ot(this.x,e.x,t.x),this.y=ot(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ot(this.x,e,t),this.y=ot(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ot(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(ot(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*i+e.x,this.y=s*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class kr{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,a,o){let c=n[i+0],l=n[i+1],u=n[i+2],h=n[i+3];const f=s[a+0],d=s[a+1],g=s[a+2],_=s[a+3];if(o===0){e[t+0]=c,e[t+1]=l,e[t+2]=u,e[t+3]=h;return}if(o===1){e[t+0]=f,e[t+1]=d,e[t+2]=g,e[t+3]=_;return}if(h!==_||c!==f||l!==d||u!==g){let m=1-o;const p=c*f+l*d+u*g+h*_,v=p>=0?1:-1,y=1-p*p;if(y>Number.EPSILON){const M=Math.sqrt(y),E=Math.atan2(M,p*v);m=Math.sin(m*E)/M,o=Math.sin(o*E)/M}const b=o*v;if(c=c*m+f*b,l=l*m+d*b,u=u*m+g*b,h=h*m+_*b,m===1-o){const M=1/Math.sqrt(c*c+l*l+u*u+h*h);c*=M,l*=M,u*=M,h*=M}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,i,s,a){const o=n[i],c=n[i+1],l=n[i+2],u=n[i+3],h=s[a],f=s[a+1],d=s[a+2],g=s[a+3];return e[t]=o*g+u*h+c*d-l*f,e[t+1]=c*g+u*f+l*h-o*d,e[t+2]=l*g+u*d+o*f-c*h,e[t+3]=u*g-o*h-c*f-l*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,s=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),u=o(i/2),h=o(s/2),f=c(n/2),d=c(i/2),g=c(s/2);switch(a){case"XYZ":this._x=f*u*h+l*d*g,this._y=l*d*h-f*u*g,this._z=l*u*g+f*d*h,this._w=l*u*h-f*d*g;break;case"YXZ":this._x=f*u*h+l*d*g,this._y=l*d*h-f*u*g,this._z=l*u*g-f*d*h,this._w=l*u*h+f*d*g;break;case"ZXY":this._x=f*u*h-l*d*g,this._y=l*d*h+f*u*g,this._z=l*u*g+f*d*h,this._w=l*u*h-f*d*g;break;case"ZYX":this._x=f*u*h-l*d*g,this._y=l*d*h+f*u*g,this._z=l*u*g-f*d*h,this._w=l*u*h+f*d*g;break;case"YZX":this._x=f*u*h+l*d*g,this._y=l*d*h+f*u*g,this._z=l*u*g-f*d*h,this._w=l*u*h-f*d*g;break;case"XZY":this._x=f*u*h-l*d*g,this._y=l*d*h-f*u*g,this._z=l*u*g+f*d*h,this._w=l*u*h+f*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],s=t[8],a=t[1],o=t[5],c=t[9],l=t[2],u=t[6],h=t[10],f=n+o+h;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(u-c)*d,this._y=(s-l)*d,this._z=(a-i)*d}else if(n>o&&n>h){const d=2*Math.sqrt(1+n-o-h);this._w=(u-c)/d,this._x=.25*d,this._y=(i+a)/d,this._z=(s+l)/d}else if(o>h){const d=2*Math.sqrt(1+o-n-h);this._w=(s-l)/d,this._x=(i+a)/d,this._y=.25*d,this._z=(c+u)/d}else{const d=2*Math.sqrt(1+h-n-o);this._w=(a-i)/d,this._x=(s+l)/d,this._y=(c+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ot(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,s=e._z,a=e._w,o=t._x,c=t._y,l=t._z,u=t._w;return this._x=n*u+a*o+i*l-s*c,this._y=i*u+a*c+s*o-n*l,this._z=s*u+a*l+n*c-i*o,this._w=a*u-n*o-i*c-s*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,s=this._z,a=this._w;let o=a*e._w+n*e._x+i*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=i,this._z=s,this;const c=1-o*o;if(c<=Number.EPSILON){const d=1-t;return this._w=d*a+t*this._w,this._x=d*n+t*this._x,this._y=d*i+t*this._y,this._z=d*s+t*this._z,this.normalize(),this}const l=Math.sqrt(c),u=Math.atan2(l,o),h=Math.sin((1-t)*u)/l,f=Math.sin(t*u)/l;return this._w=a*h+this._w*f,this._x=n*h+this._x*f,this._y=i*h+this._y*f,this._z=s*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class k{constructor(e=0,t=0,n=0){k.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(kd.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(kd.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,s=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*i-o*n),u=2*(o*t-s*i),h=2*(s*n-a*t);return this.x=t+c*l+a*h-o*u,this.y=n+c*u+o*l-s*h,this.z=i+c*h+s*u-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ot(this.x,e.x,t.x),this.y=ot(this.y,e.y,t.y),this.z=ot(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ot(this.x,e,t),this.y=ot(this.y,e,t),this.z=ot(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ot(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,s=e.z,a=t.x,o=t.y,c=t.z;return this.x=i*c-s*o,this.y=s*a-n*c,this.z=n*o-i*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Ul.copy(this).projectOnVector(e),this.sub(Ul)}reflect(e){return this.sub(Ul.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(ot(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ul=new k,kd=new kr;class Ze{constructor(e,t,n,i,s,a,o,c,l){Ze.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,c,l)}set(e,t,n,i,s,a,o,c,l){const u=this.elements;return u[0]=e,u[1]=i,u[2]=o,u[3]=t,u[4]=s,u[5]=c,u[6]=n,u[7]=a,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],u=n[4],h=n[7],f=n[2],d=n[5],g=n[8],_=i[0],m=i[3],p=i[6],v=i[1],y=i[4],b=i[7],M=i[2],E=i[5],T=i[8];return s[0]=a*_+o*v+c*M,s[3]=a*m+o*y+c*E,s[6]=a*p+o*b+c*T,s[1]=l*_+u*v+h*M,s[4]=l*m+u*y+h*E,s[7]=l*p+u*b+h*T,s[2]=f*_+d*v+g*M,s[5]=f*m+d*y+g*E,s[8]=f*p+d*b+g*T,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8];return t*a*u-t*o*l-n*s*u+n*o*c+i*s*l-i*a*c}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],h=u*a-o*l,f=o*c-u*s,d=l*s-a*c,g=t*h+n*f+i*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=h*_,e[1]=(i*l-u*n)*_,e[2]=(o*n-i*a)*_,e[3]=f*_,e[4]=(u*t-i*c)*_,e[5]=(i*s-o*t)*_,e[6]=d*_,e[7]=(n*c-l*t)*_,e[8]=(a*t-n*s)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,a,o){const c=Math.cos(s),l=Math.sin(s);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-i*l,i*c,-i*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Fl.makeScale(e,t)),this}rotate(e){return this.premultiply(Fl.makeRotation(-e)),this}translate(e,t){return this.premultiply(Fl.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Fl=new Ze;function Og(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function Ro(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function mv(){const r=Ro("canvas");return r.style.display="block",r}const Bd={};function Co(r){r in Bd||(Bd[r]=!0,console.warn(r))}function gv(r,e,t){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}const zd=new Ze().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Hd=new Ze().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function _v(){const r={enabled:!0,workingColorSpace:Pn,spaces:{},convert:function(i,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===St&&(i.r=sr(i.r),i.g=sr(i.g),i.b=sr(i.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===St&&(i.r=na(i.r),i.g=na(i.g),i.b=na(i.b))),i},workingToColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},colorSpaceToWorking:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===xr?sl:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,a){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,s){return Co("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(i,s)},toWorkingColorSpace:function(i,s){return Co("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(i,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return r.define({[Pn]:{primaries:e,whitePoint:n,transfer:sl,toXYZ:zd,fromXYZ:Hd,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:cn},outputColorSpaceConfig:{drawingBufferColorSpace:cn}},[cn]:{primaries:e,whitePoint:n,transfer:St,toXYZ:zd,fromXYZ:Hd,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:cn}}}),r}const ft=_v();function sr(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function na(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let ws;class bv{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{ws===void 0&&(ws=Ro("canvas")),ws.width=e.width,ws.height=e.height;const i=ws.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=ws}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Ro("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let a=0;a<s.length;a++)s[a]=sr(s[a]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(sr(t[n]/255)*255):t[n]=sr(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let vv=0;class Sf{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:vv++}),this.uuid=Ai(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?s.push(Ol(i[a].image)):s.push(Ol(i[a]))}else s=Ol(i);n.url=s}return t||(e.images[this.uuid]=n),n}}function Ol(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?bv.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let xv=0;const kl=new k;class Qt extends xa{constructor(e=Qt.DEFAULT_IMAGE,t=Qt.DEFAULT_MAPPING,n=wr,i=wr,s=ni,a=er,o=_i,c=zi,l=Qt.DEFAULT_ANISOTROPY,u=xr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:xv++}),this.uuid=Ai(),this.name="",this.source=new Sf(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new lt(0,0),this.repeat=new lt(1,1),this.center=new lt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ze,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(kl).x}get height(){return this.source.getSize(kl).y}get depth(){return this.source.getSize(kl).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Eg)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case da:e.x=e.x-Math.floor(e.x);break;case wr:e.x=e.x<0?0:1;break;case rl:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case da:e.y=e.y-Math.floor(e.y);break;case wr:e.y=e.y<0?0:1;break;case rl:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Qt.DEFAULT_IMAGE=null;Qt.DEFAULT_MAPPING=Eg;Qt.DEFAULT_ANISOTROPY=1;class gt{constructor(e=0,t=0,n=0,i=1){gt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s;const c=e.elements,l=c[0],u=c[4],h=c[8],f=c[1],d=c[5],g=c[9],_=c[2],m=c[6],p=c[10];if(Math.abs(u-f)<.01&&Math.abs(h-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+d+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const y=(l+1)/2,b=(d+1)/2,M=(p+1)/2,E=(u+f)/4,T=(h+_)/4,R=(g+m)/4;return y>b&&y>M?y<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(y),i=E/n,s=T/n):b>M?b<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(b),n=E/i,s=R/i):M<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(M),n=T/s,i=R/s),this.set(n,i,s,t),this}let v=Math.sqrt((m-g)*(m-g)+(h-_)*(h-_)+(f-u)*(f-u));return Math.abs(v)<.001&&(v=1),this.x=(m-g)/v,this.y=(h-_)/v,this.z=(f-u)/v,this.w=Math.acos((l+d+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ot(this.x,e.x,t.x),this.y=ot(this.y,e.y,t.y),this.z=ot(this.z,e.z,t.z),this.w=ot(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ot(this.x,e,t),this.y=ot(this.y,e,t),this.z=ot(this.z,e,t),this.w=ot(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ot(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class yv extends xa{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ni,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new gt(0,0,e,t),this.scissorTest=!1,this.viewport=new gt(0,0,e,t);const i={width:e,height:t,depth:n.depth},s=new Qt(i);this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:ni,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isArrayTexture=this.textures[i].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const i=Object.assign({},e.textures[t].image);this.textures[t].source=new Sf(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class _s extends yv{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class kg extends Qt{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Cn,this.minFilter=Cn,this.wrapR=wr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Sv extends Qt{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Cn,this.minFilter=Cn,this.wrapR=wr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ur{constructor(e=new k(1/0,1/0,1/0),t=new k(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(xi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(xi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=xi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,xi):xi.fromBufferAttribute(s,a),xi.applyMatrix4(e.matrixWorld),this.expandByPoint(xi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),qo.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),qo.copy(n.boundingBox)),qo.applyMatrix4(e.matrixWorld),this.union(qo)}const i=e.children;for(let s=0,a=i.length;s<a;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,xi),xi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Da),Yo.subVectors(this.max,Da),As.subVectors(e.a,Da),Rs.subVectors(e.b,Da),Cs.subVectors(e.c,Da),fr.subVectors(Rs,As),dr.subVectors(Cs,Rs),Gr.subVectors(As,Cs);let t=[0,-fr.z,fr.y,0,-dr.z,dr.y,0,-Gr.z,Gr.y,fr.z,0,-fr.x,dr.z,0,-dr.x,Gr.z,0,-Gr.x,-fr.y,fr.x,0,-dr.y,dr.x,0,-Gr.y,Gr.x,0];return!Bl(t,As,Rs,Cs,Yo)||(t=[1,0,0,0,1,0,0,0,1],!Bl(t,As,Rs,Cs,Yo))?!1:(Ko.crossVectors(fr,dr),t=[Ko.x,Ko.y,Ko.z],Bl(t,As,Rs,Cs,Yo))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,xi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(xi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Vi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Vi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Vi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Vi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Vi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Vi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Vi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Vi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Vi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Vi=[new k,new k,new k,new k,new k,new k,new k,new k],xi=new k,qo=new ur,As=new k,Rs=new k,Cs=new k,fr=new k,dr=new k,Gr=new k,Da=new k,Yo=new k,Ko=new k,Vr=new k;function Bl(r,e,t,n,i){for(let s=0,a=r.length-3;s<=a;s+=3){Vr.fromArray(r,s);const o=i.x*Math.abs(Vr.x)+i.y*Math.abs(Vr.y)+i.z*Math.abs(Vr.z),c=e.dot(Vr),l=t.dot(Vr),u=n.dot(Vr);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>o)return!1}return!0}const Mv=new ur,La=new k,zl=new k;class Gi{constructor(e=new k,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Mv.setFromPoints(e).getCenter(n);let i=0;for(let s=0,a=e.length;s<a;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;La.subVectors(e,this.center);const t=La.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(La,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(zl.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(La.copy(e.center).add(zl)),this.expandByPoint(La.copy(e.center).sub(zl))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const Wi=new k,Hl=new k,$o=new k,pr=new k,Gl=new k,Jo=new k,Vl=new k;class ml{constructor(e=new k,t=new k(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Wi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Wi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Wi.copy(this.origin).addScaledVector(this.direction,t),Wi.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Hl.copy(e).add(t).multiplyScalar(.5),$o.copy(t).sub(e).normalize(),pr.copy(this.origin).sub(Hl);const s=e.distanceTo(t)*.5,a=-this.direction.dot($o),o=pr.dot(this.direction),c=-pr.dot($o),l=pr.lengthSq(),u=Math.abs(1-a*a);let h,f,d,g;if(u>0)if(h=a*c-o,f=a*o-c,g=s*u,h>=0)if(f>=-g)if(f<=g){const _=1/u;h*=_,f*=_,d=h*(h+a*f+2*o)+f*(a*h+f+2*c)+l}else f=s,h=Math.max(0,-(a*f+o)),d=-h*h+f*(f+2*c)+l;else f=-s,h=Math.max(0,-(a*f+o)),d=-h*h+f*(f+2*c)+l;else f<=-g?(h=Math.max(0,-(-a*s+o)),f=h>0?-s:Math.min(Math.max(-s,-c),s),d=-h*h+f*(f+2*c)+l):f<=g?(h=0,f=Math.min(Math.max(-s,-c),s),d=f*(f+2*c)+l):(h=Math.max(0,-(a*s+o)),f=h>0?s:Math.min(Math.max(-s,-c),s),d=-h*h+f*(f+2*c)+l);else f=a>0?-s:s,h=Math.max(0,-(a*f+o)),d=-h*h+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,h),i&&i.copy(Hl).addScaledVector($o,f),d}intersectSphere(e,t){Wi.subVectors(e.center,this.origin);const n=Wi.dot(this.direction),i=Wi.dot(Wi)-n*n,s=e.radius*e.radius;if(i>s)return null;const a=Math.sqrt(s-i),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,a,o,c;const l=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return l>=0?(n=(e.min.x-f.x)*l,i=(e.max.x-f.x)*l):(n=(e.max.x-f.x)*l,i=(e.min.x-f.x)*l),u>=0?(s=(e.min.y-f.y)*u,a=(e.max.y-f.y)*u):(s=(e.max.y-f.y)*u,a=(e.min.y-f.y)*u),n>a||s>i||((s>n||isNaN(n))&&(n=s),(a<i||isNaN(i))&&(i=a),h>=0?(o=(e.min.z-f.z)*h,c=(e.max.z-f.z)*h):(o=(e.max.z-f.z)*h,c=(e.min.z-f.z)*h),n>c||o>i)||((o>n||n!==n)&&(n=o),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,Wi)!==null}intersectTriangle(e,t,n,i,s){Gl.subVectors(t,e),Jo.subVectors(n,e),Vl.crossVectors(Gl,Jo);let a=this.direction.dot(Vl),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;pr.subVectors(this.origin,e);const c=o*this.direction.dot(Jo.crossVectors(pr,Jo));if(c<0)return null;const l=o*this.direction.dot(Gl.cross(pr));if(l<0||c+l>a)return null;const u=-o*pr.dot(Vl);return u<0?null:this.at(u/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class tt{constructor(e,t,n,i,s,a,o,c,l,u,h,f,d,g,_,m){tt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,c,l,u,h,f,d,g,_,m)}set(e,t,n,i,s,a,o,c,l,u,h,f,d,g,_,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=s,p[5]=a,p[9]=o,p[13]=c,p[2]=l,p[6]=u,p[10]=h,p[14]=f,p[3]=d,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new tt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/Ps.setFromMatrixColumn(e,0).length(),s=1/Ps.setFromMatrixColumn(e,1).length(),a=1/Ps.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(i),l=Math.sin(i),u=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){const f=a*u,d=a*h,g=o*u,_=o*h;t[0]=c*u,t[4]=-c*h,t[8]=l,t[1]=d+g*l,t[5]=f-_*l,t[9]=-o*c,t[2]=_-f*l,t[6]=g+d*l,t[10]=a*c}else if(e.order==="YXZ"){const f=c*u,d=c*h,g=l*u,_=l*h;t[0]=f+_*o,t[4]=g*o-d,t[8]=a*l,t[1]=a*h,t[5]=a*u,t[9]=-o,t[2]=d*o-g,t[6]=_+f*o,t[10]=a*c}else if(e.order==="ZXY"){const f=c*u,d=c*h,g=l*u,_=l*h;t[0]=f-_*o,t[4]=-a*h,t[8]=g+d*o,t[1]=d+g*o,t[5]=a*u,t[9]=_-f*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const f=a*u,d=a*h,g=o*u,_=o*h;t[0]=c*u,t[4]=g*l-d,t[8]=f*l+_,t[1]=c*h,t[5]=_*l+f,t[9]=d*l-g,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const f=a*c,d=a*l,g=o*c,_=o*l;t[0]=c*u,t[4]=_-f*h,t[8]=g*h+d,t[1]=h,t[5]=a*u,t[9]=-o*u,t[2]=-l*u,t[6]=d*h+g,t[10]=f-_*h}else if(e.order==="XZY"){const f=a*c,d=a*l,g=o*c,_=o*l;t[0]=c*u,t[4]=-h,t[8]=l*u,t[1]=f*h+_,t[5]=a*u,t[9]=d*h-g,t[2]=g*h-d,t[6]=o*u,t[10]=_*h+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Tv,e,Ev)}lookAt(e,t,n){const i=this.elements;return jn.subVectors(e,t),jn.lengthSq()===0&&(jn.z=1),jn.normalize(),mr.crossVectors(n,jn),mr.lengthSq()===0&&(Math.abs(n.z)===1?jn.x+=1e-4:jn.z+=1e-4,jn.normalize(),mr.crossVectors(n,jn)),mr.normalize(),Zo.crossVectors(jn,mr),i[0]=mr.x,i[4]=Zo.x,i[8]=jn.x,i[1]=mr.y,i[5]=Zo.y,i[9]=jn.y,i[2]=mr.z,i[6]=Zo.z,i[10]=jn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],u=n[1],h=n[5],f=n[9],d=n[13],g=n[2],_=n[6],m=n[10],p=n[14],v=n[3],y=n[7],b=n[11],M=n[15],E=i[0],T=i[4],R=i[8],x=i[12],S=i[1],C=i[5],I=i[9],U=i[13],z=i[2],W=i[6],V=i[10],j=i[14],H=i[3],te=i[7],L=i[11],K=i[15];return s[0]=a*E+o*S+c*z+l*H,s[4]=a*T+o*C+c*W+l*te,s[8]=a*R+o*I+c*V+l*L,s[12]=a*x+o*U+c*j+l*K,s[1]=u*E+h*S+f*z+d*H,s[5]=u*T+h*C+f*W+d*te,s[9]=u*R+h*I+f*V+d*L,s[13]=u*x+h*U+f*j+d*K,s[2]=g*E+_*S+m*z+p*H,s[6]=g*T+_*C+m*W+p*te,s[10]=g*R+_*I+m*V+p*L,s[14]=g*x+_*U+m*j+p*K,s[3]=v*E+y*S+b*z+M*H,s[7]=v*T+y*C+b*W+M*te,s[11]=v*R+y*I+b*V+M*L,s[15]=v*x+y*U+b*j+M*K,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],a=e[1],o=e[5],c=e[9],l=e[13],u=e[2],h=e[6],f=e[10],d=e[14],g=e[3],_=e[7],m=e[11],p=e[15];return g*(+s*c*h-i*l*h-s*o*f+n*l*f+i*o*d-n*c*d)+_*(+t*c*d-t*l*f+s*a*f-i*a*d+i*l*u-s*c*u)+m*(+t*l*h-t*o*d-s*a*h+n*a*d+s*o*u-n*l*u)+p*(-i*o*u-t*c*h+t*o*f+i*a*h-n*a*f+n*c*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],h=e[9],f=e[10],d=e[11],g=e[12],_=e[13],m=e[14],p=e[15],v=h*m*l-_*f*l+_*c*d-o*m*d-h*c*p+o*f*p,y=g*f*l-u*m*l-g*c*d+a*m*d+u*c*p-a*f*p,b=u*_*l-g*h*l+g*o*d-a*_*d-u*o*p+a*h*p,M=g*h*c-u*_*c-g*o*f+a*_*f+u*o*m-a*h*m,E=t*v+n*y+i*b+s*M;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const T=1/E;return e[0]=v*T,e[1]=(_*f*s-h*m*s-_*i*d+n*m*d+h*i*p-n*f*p)*T,e[2]=(o*m*s-_*c*s+_*i*l-n*m*l-o*i*p+n*c*p)*T,e[3]=(h*c*s-o*f*s-h*i*l+n*f*l+o*i*d-n*c*d)*T,e[4]=y*T,e[5]=(u*m*s-g*f*s+g*i*d-t*m*d-u*i*p+t*f*p)*T,e[6]=(g*c*s-a*m*s-g*i*l+t*m*l+a*i*p-t*c*p)*T,e[7]=(a*f*s-u*c*s+u*i*l-t*f*l-a*i*d+t*c*d)*T,e[8]=b*T,e[9]=(g*h*s-u*_*s-g*n*d+t*_*d+u*n*p-t*h*p)*T,e[10]=(a*_*s-g*o*s+g*n*l-t*_*l-a*n*p+t*o*p)*T,e[11]=(u*o*s-a*h*s-u*n*l+t*h*l+a*n*d-t*o*d)*T,e[12]=M*T,e[13]=(u*_*i-g*h*i+g*n*f-t*_*f-u*n*m+t*h*m)*T,e[14]=(g*o*i-a*_*i-g*n*c+t*_*c+a*n*m-t*o*m)*T,e[15]=(a*h*i-u*o*i+u*n*c-t*h*c-a*n*f+t*o*f)*T,this}scale(e){const t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),s=1-n,a=e.x,o=e.y,c=e.z,l=s*a,u=s*o;return this.set(l*a+n,l*o-i*c,l*c+i*o,0,l*o+i*c,u*o+n,u*c-i*a,0,l*c-i*o,u*c+i*a,s*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,a){return this.set(1,n,s,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,s=t._x,a=t._y,o=t._z,c=t._w,l=s+s,u=a+a,h=o+o,f=s*l,d=s*u,g=s*h,_=a*u,m=a*h,p=o*h,v=c*l,y=c*u,b=c*h,M=n.x,E=n.y,T=n.z;return i[0]=(1-(_+p))*M,i[1]=(d+b)*M,i[2]=(g-y)*M,i[3]=0,i[4]=(d-b)*E,i[5]=(1-(f+p))*E,i[6]=(m+v)*E,i[7]=0,i[8]=(g+y)*T,i[9]=(m-v)*T,i[10]=(1-(f+_))*T,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let s=Ps.set(i[0],i[1],i[2]).length();const a=Ps.set(i[4],i[5],i[6]).length(),o=Ps.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],yi.copy(this);const l=1/s,u=1/a,h=1/o;return yi.elements[0]*=l,yi.elements[1]*=l,yi.elements[2]*=l,yi.elements[4]*=u,yi.elements[5]*=u,yi.elements[6]*=u,yi.elements[8]*=h,yi.elements[9]*=h,yi.elements[10]*=h,t.setFromRotationMatrix(yi),n.x=s,n.y=a,n.z=o,this}makePerspective(e,t,n,i,s,a,o=Fi,c=!1){const l=this.elements,u=2*s/(t-e),h=2*s/(n-i),f=(t+e)/(t-e),d=(n+i)/(n-i);let g,_;if(c)g=s/(a-s),_=a*s/(a-s);else if(o===Fi)g=-(a+s)/(a-s),_=-2*a*s/(a-s);else if(o===al)g=-a/(a-s),_=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,s,a,o=Fi,c=!1){const l=this.elements,u=2/(t-e),h=2/(n-i),f=-(t+e)/(t-e),d=-(n+i)/(n-i);let g,_;if(c)g=1/(a-s),_=a/(a-s);else if(o===Fi)g=-2/(a-s),_=-(a+s)/(a-s);else if(o===al)g=-1/(a-s),_=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=0,l[12]=f,l[1]=0,l[5]=h,l[9]=0,l[13]=d,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Ps=new k,yi=new tt,Tv=new k(0,0,0),Ev=new k(1,1,1),mr=new k,Zo=new k,jn=new k,Gd=new tt,Vd=new kr;class Hi{constructor(e=0,t=0,n=0,i=Hi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,s=i[0],a=i[4],o=i[8],c=i[1],l=i[5],u=i[9],h=i[2],f=i[6],d=i[10];switch(t){case"XYZ":this._y=Math.asin(ot(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-ot(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(ot(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,d),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-ot(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(ot(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-ot(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Gd.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Gd,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Vd.setFromEuler(this),this.setFromQuaternion(Vd,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Hi.DEFAULT_ORDER="XYZ";class Bg{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let wv=0;const Wd=new k,Ds=new kr,Xi=new tt,Qo=new k,Ia=new k,Av=new k,Rv=new kr,Xd=new k(1,0,0),jd=new k(0,1,0),qd=new k(0,0,1),Yd={type:"added"},Cv={type:"removed"},Ls={type:"childadded",child:null},Wl={type:"childremoved",child:null};class kt extends xa{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:wv++}),this.uuid=Ai(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=kt.DEFAULT_UP.clone();const e=new k,t=new Hi,n=new kr,i=new k(1,1,1);function s(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new tt},normalMatrix:{value:new Ze}}),this.matrix=new tt,this.matrixWorld=new tt,this.matrixAutoUpdate=kt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=kt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Bg,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ds.setFromAxisAngle(e,t),this.quaternion.multiply(Ds),this}rotateOnWorldAxis(e,t){return Ds.setFromAxisAngle(e,t),this.quaternion.premultiply(Ds),this}rotateX(e){return this.rotateOnAxis(Xd,e)}rotateY(e){return this.rotateOnAxis(jd,e)}rotateZ(e){return this.rotateOnAxis(qd,e)}translateOnAxis(e,t){return Wd.copy(e).applyQuaternion(this.quaternion),this.position.add(Wd.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Xd,e)}translateY(e){return this.translateOnAxis(jd,e)}translateZ(e){return this.translateOnAxis(qd,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Xi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Qo.copy(e):Qo.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Ia.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Xi.lookAt(Ia,Qo,this.up):Xi.lookAt(Qo,Ia,this.up),this.quaternion.setFromRotationMatrix(Xi),i&&(Xi.extractRotation(i.matrixWorld),Ds.setFromRotationMatrix(Xi),this.quaternion.premultiply(Ds.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Yd),Ls.child=e,this.dispatchEvent(Ls),Ls.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Cv),Wl.child=e,this.dispatchEvent(Wl),Wl.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Xi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Xi.multiply(e.parent.matrixWorld)),e.applyMatrix4(Xi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Yd),Ls.child=e,this.dispatchEvent(Ls),Ls.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ia,e,Av),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ia,Rv,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const h=c[l];s(e.shapes,h)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(s(e.materials,this.material[c]));i.material=o}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];i.animations.push(s(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),u=a(e.images),h=a(e.shapes),f=a(e.skeletons),d=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=i,n;function a(o){const c=[];for(const l in o){const u=o[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}kt.DEFAULT_UP=new k(0,1,0);kt.DEFAULT_MATRIX_AUTO_UPDATE=!0;kt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Si=new k,ji=new k,Xl=new k,qi=new k,Is=new k,Ns=new k,Kd=new k,jl=new k,ql=new k,Yl=new k,Kl=new gt,$l=new gt,Jl=new gt;class pi{constructor(e=new k,t=new k,n=new k){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Si.subVectors(e,t),i.cross(Si);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){Si.subVectors(i,t),ji.subVectors(n,t),Xl.subVectors(e,t);const a=Si.dot(Si),o=Si.dot(ji),c=Si.dot(Xl),l=ji.dot(ji),u=ji.dot(Xl),h=a*l-o*o;if(h===0)return s.set(0,0,0),null;const f=1/h,d=(l*c-o*u)*f,g=(a*u-o*c)*f;return s.set(1-d-g,g,d)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,qi)===null?!1:qi.x>=0&&qi.y>=0&&qi.x+qi.y<=1}static getInterpolation(e,t,n,i,s,a,o,c){return this.getBarycoord(e,t,n,i,qi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,qi.x),c.addScaledVector(a,qi.y),c.addScaledVector(o,qi.z),c)}static getInterpolatedAttribute(e,t,n,i,s,a){return Kl.setScalar(0),$l.setScalar(0),Jl.setScalar(0),Kl.fromBufferAttribute(e,t),$l.fromBufferAttribute(e,n),Jl.fromBufferAttribute(e,i),a.setScalar(0),a.addScaledVector(Kl,s.x),a.addScaledVector($l,s.y),a.addScaledVector(Jl,s.z),a}static isFrontFacing(e,t,n,i){return Si.subVectors(n,t),ji.subVectors(e,t),Si.cross(ji).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Si.subVectors(this.c,this.b),ji.subVectors(this.a,this.b),Si.cross(ji).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return pi.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return pi.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return pi.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return pi.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return pi.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,s=this.c;let a,o;Is.subVectors(i,n),Ns.subVectors(s,n),jl.subVectors(e,n);const c=Is.dot(jl),l=Ns.dot(jl);if(c<=0&&l<=0)return t.copy(n);ql.subVectors(e,i);const u=Is.dot(ql),h=Ns.dot(ql);if(u>=0&&h<=u)return t.copy(i);const f=c*h-u*l;if(f<=0&&c>=0&&u<=0)return a=c/(c-u),t.copy(n).addScaledVector(Is,a);Yl.subVectors(e,s);const d=Is.dot(Yl),g=Ns.dot(Yl);if(g>=0&&d<=g)return t.copy(s);const _=d*l-c*g;if(_<=0&&l>=0&&g<=0)return o=l/(l-g),t.copy(n).addScaledVector(Ns,o);const m=u*g-d*h;if(m<=0&&h-u>=0&&d-g>=0)return Kd.subVectors(s,i),o=(h-u)/(h-u+(d-g)),t.copy(i).addScaledVector(Kd,o);const p=1/(m+_+f);return a=_*p,o=f*p,t.copy(n).addScaledVector(Is,a).addScaledVector(Ns,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const zg={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},gr={h:0,s:0,l:0},ec={h:0,s:0,l:0};function Zl(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}class qe{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=cn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ft.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=ft.workingColorSpace){return this.r=e,this.g=t,this.b=n,ft.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=ft.workingColorSpace){if(e=yf(e,1),t=ot(t,0,1),n=ot(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=Zl(a,s,e+1/3),this.g=Zl(a,s,e),this.b=Zl(a,s,e-1/3)}return ft.colorSpaceToWorking(this,i),this}setStyle(e,t=cn){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=i[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=cn){const n=zg[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=sr(e.r),this.g=sr(e.g),this.b=sr(e.b),this}copyLinearToSRGB(e){return this.r=na(e.r),this.g=na(e.g),this.b=na(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=cn){return ft.workingToColorSpace(dn.copy(this),e),Math.round(ot(dn.r*255,0,255))*65536+Math.round(ot(dn.g*255,0,255))*256+Math.round(ot(dn.b*255,0,255))}getHexString(e=cn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ft.workingColorSpace){ft.workingToColorSpace(dn.copy(this),t);const n=dn.r,i=dn.g,s=dn.b,a=Math.max(n,i,s),o=Math.min(n,i,s);let c,l;const u=(o+a)/2;if(o===a)c=0,l=0;else{const h=a-o;switch(l=u<=.5?h/(a+o):h/(2-a-o),a){case n:c=(i-s)/h+(i<s?6:0);break;case i:c=(s-n)/h+2;break;case s:c=(n-i)/h+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=ft.workingColorSpace){return ft.workingToColorSpace(dn.copy(this),t),e.r=dn.r,e.g=dn.g,e.b=dn.b,e}getStyle(e=cn){ft.workingToColorSpace(dn.copy(this),e);const t=dn.r,n=dn.g,i=dn.b;return e!==cn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(gr),this.setHSL(gr.h+e,gr.s+t,gr.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(gr),e.getHSL(ec);const n=oo(gr.h,ec.h,t),i=oo(gr.s,ec.s,t),s=oo(gr.l,ec.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const dn=new qe;qe.NAMES=zg;let Pv=0;class ki extends xa{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Pv++}),this.uuid=Ai(),this.name="",this.type="Material",this.blending=ea,this.side=cr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Wu,this.blendDst=Xu,this.blendEquation=ns,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new qe(0,0,0),this.blendAlpha=0,this.depthFunc=ua,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ud,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Es,this.stencilZFail=Es,this.stencilZPass=Es,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ea&&(n.blending=this.blending),this.side!==cr&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Wu&&(n.blendSrc=this.blendSrc),this.blendDst!==Xu&&(n.blendDst=this.blendDst),this.blendEquation!==ns&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ua&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ud&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Es&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Es&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Es&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const a=[];for(const o in s){const c=s[o];delete c.metadata,a.push(c)}return a}if(t){const s=i(e.textures),a=i(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class tr extends ki{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new qe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Hi,this.combine=Tg,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Xt=new k,tc=new lt;let Dv=0;class Yt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Dv++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Ph,this.updateRanges=[],this.gpuType=Ei,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)tc.fromBufferAttribute(this,t),tc.applyMatrix3(e),this.setXY(t,tc.x,tc.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Xt.fromBufferAttribute(this,t),Xt.applyMatrix3(e),this.setXYZ(t,Xt.x,Xt.y,Xt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Xt.fromBufferAttribute(this,t),Xt.applyMatrix4(e),this.setXYZ(t,Xt.x,Xt.y,Xt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Xt.fromBufferAttribute(this,t),Xt.applyNormalMatrix(e),this.setXYZ(t,Xt.x,Xt.y,Xt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Xt.fromBufferAttribute(this,t),Xt.transformDirection(e),this.setXYZ(t,Xt.x,Xt.y,Xt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Ti(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=xt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ti(t,this.array)),t}setX(e,t){return this.normalized&&(t=xt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ti(t,this.array)),t}setY(e,t){return this.normalized&&(t=xt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ti(t,this.array)),t}setZ(e,t){return this.normalized&&(t=xt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ti(t,this.array)),t}setW(e,t){return this.normalized&&(t=xt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=xt(t,this.array),n=xt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=xt(t,this.array),n=xt(n,this.array),i=xt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=xt(t,this.array),n=xt(n,this.array),i=xt(i,this.array),s=xt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Ph&&(e.usage=this.usage),e}}class Hg extends Yt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Gg extends Yt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class en extends Yt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Lv=0;const li=new tt,Ql=new kt,Us=new k,qn=new ur,Na=new ur,rn=new k;class Zt extends xa{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Lv++}),this.uuid=Ai(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Og(e)?Gg:Hg)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Ze().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return li.makeRotationFromQuaternion(e),this.applyMatrix4(li),this}rotateX(e){return li.makeRotationX(e),this.applyMatrix4(li),this}rotateY(e){return li.makeRotationY(e),this.applyMatrix4(li),this}rotateZ(e){return li.makeRotationZ(e),this.applyMatrix4(li),this}translate(e,t,n){return li.makeTranslation(e,t,n),this.applyMatrix4(li),this}scale(e,t,n){return li.makeScale(e,t,n),this.applyMatrix4(li),this}lookAt(e){return Ql.lookAt(e),Ql.updateMatrix(),this.applyMatrix4(Ql.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Us).negate(),this.translate(Us.x,Us.y,Us.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,s=e.length;i<s;i++){const a=e[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new en(n,3))}else{const n=Math.min(e.length,t.count);for(let i=0;i<n;i++){const s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ur);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new k(-1/0,-1/0,-1/0),new k(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const s=t[n];qn.setFromBufferAttribute(s),this.morphTargetsRelative?(rn.addVectors(this.boundingBox.min,qn.min),this.boundingBox.expandByPoint(rn),rn.addVectors(this.boundingBox.max,qn.max),this.boundingBox.expandByPoint(rn)):(this.boundingBox.expandByPoint(qn.min),this.boundingBox.expandByPoint(qn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Gi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new k,1/0);return}if(e){const n=this.boundingSphere.center;if(qn.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];Na.setFromBufferAttribute(o),this.morphTargetsRelative?(rn.addVectors(qn.min,Na.min),qn.expandByPoint(rn),rn.addVectors(qn.max,Na.max),qn.expandByPoint(rn)):(qn.expandByPoint(Na.min),qn.expandByPoint(Na.max))}qn.getCenter(n);let i=0;for(let s=0,a=e.count;s<a;s++)rn.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(rn));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],c=this.morphTargetsRelative;for(let l=0,u=o.count;l<u;l++)rn.fromBufferAttribute(o,l),c&&(Us.fromBufferAttribute(e,l),rn.add(Us)),i=Math.max(i,n.distanceToSquared(rn))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Yt(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let R=0;R<n.count;R++)o[R]=new k,c[R]=new k;const l=new k,u=new k,h=new k,f=new lt,d=new lt,g=new lt,_=new k,m=new k;function p(R,x,S){l.fromBufferAttribute(n,R),u.fromBufferAttribute(n,x),h.fromBufferAttribute(n,S),f.fromBufferAttribute(s,R),d.fromBufferAttribute(s,x),g.fromBufferAttribute(s,S),u.sub(l),h.sub(l),d.sub(f),g.sub(f);const C=1/(d.x*g.y-g.x*d.y);isFinite(C)&&(_.copy(u).multiplyScalar(g.y).addScaledVector(h,-d.y).multiplyScalar(C),m.copy(h).multiplyScalar(d.x).addScaledVector(u,-g.x).multiplyScalar(C),o[R].add(_),o[x].add(_),o[S].add(_),c[R].add(m),c[x].add(m),c[S].add(m))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let R=0,x=v.length;R<x;++R){const S=v[R],C=S.start,I=S.count;for(let U=C,z=C+I;U<z;U+=3)p(e.getX(U+0),e.getX(U+1),e.getX(U+2))}const y=new k,b=new k,M=new k,E=new k;function T(R){M.fromBufferAttribute(i,R),E.copy(M);const x=o[R];y.copy(x),y.sub(M.multiplyScalar(M.dot(x))).normalize(),b.crossVectors(E,x);const C=b.dot(c[R])<0?-1:1;a.setXYZW(R,y.x,y.y,y.z,C)}for(let R=0,x=v.length;R<x;++R){const S=v[R],C=S.start,I=S.count;for(let U=C,z=C+I;U<z;U+=3)T(e.getX(U+0)),T(e.getX(U+1)),T(e.getX(U+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Yt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);const i=new k,s=new k,a=new k,o=new k,c=new k,l=new k,u=new k,h=new k;if(e)for(let f=0,d=e.count;f<d;f+=3){const g=e.getX(f+0),_=e.getX(f+1),m=e.getX(f+2);i.fromBufferAttribute(t,g),s.fromBufferAttribute(t,_),a.fromBufferAttribute(t,m),u.subVectors(a,s),h.subVectors(i,s),u.cross(h),o.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,m),o.add(u),c.add(u),l.add(u),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let f=0,d=t.count;f<d;f+=3)i.fromBufferAttribute(t,f+0),s.fromBufferAttribute(t,f+1),a.fromBufferAttribute(t,f+2),u.subVectors(a,s),h.subVectors(i,s),u.cross(h),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)rn.fromBufferAttribute(e,t),rn.normalize(),e.setXYZ(t,rn.x,rn.y,rn.z)}toNonIndexed(){function e(o,c){const l=o.array,u=o.itemSize,h=o.normalized,f=new l.constructor(c.length*u);let d=0,g=0;for(let _=0,m=c.length;_<m;_++){o.isInterleavedBufferAttribute?d=c[_]*o.data.stride+o.offset:d=c[_]*u;for(let p=0;p<u;p++)f[g++]=l[d++]}return new Yt(f,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Zt,n=this.index.array,i=this.attributes;for(const o in i){const c=i[o],l=e(c,n);t.setAttribute(o,l)}const s=this.morphAttributes;for(const o in s){const c=[],l=s[o];for(let u=0,h=l.length;u<h;u++){const f=l[u],d=e(f,n);c.push(d)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const i={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let h=0,f=l.length;h<f;h++){const d=l[h];u.push(d.toJSON(e.data))}u.length>0&&(i[c]=u,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const i=e.attributes;for(const l in i){const u=i[l];this.setAttribute(l,u.clone(t))}const s=e.morphAttributes;for(const l in s){const u=[],h=s[l];for(let f=0,d=h.length;f<d;f++)u.push(h[f].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,u=a.length;l<u;l++){const h=a[l];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const $d=new tt,Wr=new ml,nc=new Gi,Jd=new k,ic=new k,rc=new k,sc=new k,eu=new k,ac=new k,Zd=new k,oc=new k;class un extends kt{constructor(e=new Zt,t=new tr){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const o=this.morphTargetInfluences;if(s&&o){ac.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const u=o[c],h=s[c];u!==0&&(eu.fromBufferAttribute(h,e),a?ac.addScaledVector(eu,u):ac.addScaledVector(eu.sub(t),u))}t.add(ac)}return t}raycast(e,t){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),nc.copy(n.boundingSphere),nc.applyMatrix4(s),Wr.copy(e.ray).recast(e.near),!(nc.containsPoint(Wr.origin)===!1&&(Wr.intersectSphere(nc,Jd)===null||Wr.origin.distanceToSquared(Jd)>(e.far-e.near)**2))&&($d.copy(s).invert(),Wr.copy(e.ray).applyMatrix4($d),!(n.boundingBox!==null&&Wr.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Wr)))}_computeIntersections(e,t,n){let i;const s=this.geometry,a=this.material,o=s.index,c=s.attributes.position,l=s.attributes.uv,u=s.attributes.uv1,h=s.attributes.normal,f=s.groups,d=s.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=f.length;g<_;g++){const m=f[g],p=a[m.materialIndex],v=Math.max(m.start,d.start),y=Math.min(o.count,Math.min(m.start+m.count,d.start+d.count));for(let b=v,M=y;b<M;b+=3){const E=o.getX(b),T=o.getX(b+1),R=o.getX(b+2);i=cc(this,p,e,n,l,u,h,E,T,R),i&&(i.faceIndex=Math.floor(b/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const g=Math.max(0,d.start),_=Math.min(o.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){const v=o.getX(m),y=o.getX(m+1),b=o.getX(m+2);i=cc(this,a,e,n,l,u,h,v,y,b),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,_=f.length;g<_;g++){const m=f[g],p=a[m.materialIndex],v=Math.max(m.start,d.start),y=Math.min(c.count,Math.min(m.start+m.count,d.start+d.count));for(let b=v,M=y;b<M;b+=3){const E=b,T=b+1,R=b+2;i=cc(this,p,e,n,l,u,h,E,T,R),i&&(i.faceIndex=Math.floor(b/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const g=Math.max(0,d.start),_=Math.min(c.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){const v=m,y=m+1,b=m+2;i=cc(this,a,e,n,l,u,h,v,y,b),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}}}function Iv(r,e,t,n,i,s,a,o){let c;if(e.side===Hn?c=n.intersectTriangle(a,s,i,!0,o):c=n.intersectTriangle(i,s,a,e.side===cr,o),c===null)return null;oc.copy(o),oc.applyMatrix4(r.matrixWorld);const l=t.ray.origin.distanceTo(oc);return l<t.near||l>t.far?null:{distance:l,point:oc.clone(),object:r}}function cc(r,e,t,n,i,s,a,o,c,l){r.getVertexPosition(o,ic),r.getVertexPosition(c,rc),r.getVertexPosition(l,sc);const u=Iv(r,e,t,n,ic,rc,sc,Zd);if(u){const h=new k;pi.getBarycoord(Zd,ic,rc,sc,h),i&&(u.uv=pi.getInterpolatedAttribute(i,o,c,l,h,new lt)),s&&(u.uv1=pi.getInterpolatedAttribute(s,o,c,l,h,new lt)),a&&(u.normal=pi.getInterpolatedAttribute(a,o,c,l,h,new k),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const f={a:o,b:c,c:l,normal:new k,materialIndex:0};pi.getNormal(ic,rc,sc,f.normal),u.face=f,u.barycoord=h}return u}class Lo extends Zt{constructor(e=1,t=1,n=1,i=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:a};const o=this;i=Math.floor(i),s=Math.floor(s),a=Math.floor(a);const c=[],l=[],u=[],h=[];let f=0,d=0;g("z","y","x",-1,-1,n,t,e,a,s,0),g("z","y","x",1,-1,n,t,-e,a,s,1),g("x","z","y",1,1,e,n,t,i,a,2),g("x","z","y",1,-1,e,n,-t,i,a,3),g("x","y","z",1,-1,e,t,n,i,s,4),g("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(c),this.setAttribute("position",new en(l,3)),this.setAttribute("normal",new en(u,3)),this.setAttribute("uv",new en(h,2));function g(_,m,p,v,y,b,M,E,T,R,x){const S=b/T,C=M/R,I=b/2,U=M/2,z=E/2,W=T+1,V=R+1;let j=0,H=0;const te=new k;for(let L=0;L<V;L++){const K=L*C-U;for(let le=0;le<W;le++){const _e=le*S-I;te[_]=_e*v,te[m]=K*y,te[p]=z,l.push(te.x,te.y,te.z),te[_]=0,te[m]=0,te[p]=E>0?1:-1,u.push(te.x,te.y,te.z),h.push(le/T),h.push(1-L/R),j+=1}}for(let L=0;L<R;L++)for(let K=0;K<T;K++){const le=f+K+W*L,_e=f+K+W*(L+1),de=f+(K+1)+W*(L+1),ye=f+(K+1)+W*L;c.push(le,_e,ye),c.push(_e,de,ye),H+=6}o.addGroup(d,H,x),d+=H,f+=j}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Lo(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function ma(r){const e={};for(const t in r){e[t]={};for(const n in r[t]){const i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function Tn(r){const e={};for(let t=0;t<r.length;t++){const n=ma(r[t]);for(const i in n)e[i]=n[i]}return e}function Nv(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function Vg(r){const e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ft.workingColorSpace}const Uv={clone:ma,merge:Tn};var Fv=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ov=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class lr extends ki{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Fv,this.fragmentShader=Ov,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ma(e.uniforms),this.uniformsGroups=Nv(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?t.uniforms[i]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[i]={type:"m4",value:a.toArray()}:t.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Wg extends kt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new tt,this.projectionMatrix=new tt,this.projectionMatrixInverse=new tt,this.coordinateSystem=Fi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const _r=new k,Qd=new lt,ep=new lt;class In extends Wg{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=pa*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ta*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return pa*2*Math.atan(Math.tan(ta*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){_r.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(_r.x,_r.y).multiplyScalar(-e/_r.z),_r.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(_r.x,_r.y).multiplyScalar(-e/_r.z)}getViewSize(e,t){return this.getViewBounds(e,Qd,ep),t.subVectors(ep,Qd)}setViewOffset(e,t,n,i,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ta*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;s+=a.offsetX*i/c,t-=a.offsetY*n/l,i*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Fs=-90,Os=1;class kv extends kt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new In(Fs,Os,e,t);i.layers=this.layers,this.add(i);const s=new In(Fs,Os,e,t);s.layers=this.layers,this.add(s);const a=new In(Fs,Os,e,t);a.layers=this.layers,this.add(a);const o=new In(Fs,Os,e,t);o.layers=this.layers,this.add(o);const c=new In(Fs,Os,e,t);c.layers=this.layers,this.add(c);const l=new In(Fs,Os,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,s,a,o,c]=t;for(const l of t)this.remove(l);if(e===Fi)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===al)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,c,l,u]=this.children,h=e.getRenderTarget(),f=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,s),e.setRenderTarget(n,1,i),e.render(t,a),e.setRenderTarget(n,2,i),e.render(t,o),e.setRenderTarget(n,3,i),e.render(t,c),e.setRenderTarget(n,4,i),e.render(t,l),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,i),e.render(t,u),e.setRenderTarget(h,f,d),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Xg extends Qt{constructor(e=[],t=ha,n,i,s,a,o,c,l,u){super(e,t,n,i,s,a,o,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Bv extends _s{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Xg(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new Lo(5,5,5),s=new lr({name:"CubemapFromEquirect",uniforms:ma(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Hn,blending:Dr});s.uniforms.tEquirect.value=t;const a=new un(i,s),o=t.minFilter;return t.minFilter===er&&(t.minFilter=ni),new kv(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(s)}}class Zn extends kt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const zv={type:"move"};class tu{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Zn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Zn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new k,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new k),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Zn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new k,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new k),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,n),p=this._getHandJoint(l,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],f=u.position.distanceTo(h.position),d=.02,g=.005;l.inputState.pinching&&f>d+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&f<=d-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(zv)))}return o!==null&&(o.visible=i!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Zn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class rw extends kt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Hi,this.environmentIntensity=1,this.environmentRotation=new Hi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Hv{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Ph,this.updateRanges=[],this.version=0,this.uuid=Ai()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ai()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ai()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Sn=new k;class Mf{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Sn.fromBufferAttribute(this,t),Sn.applyMatrix4(e),this.setXYZ(t,Sn.x,Sn.y,Sn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Sn.fromBufferAttribute(this,t),Sn.applyNormalMatrix(e),this.setXYZ(t,Sn.x,Sn.y,Sn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Sn.fromBufferAttribute(this,t),Sn.transformDirection(e),this.setXYZ(t,Sn.x,Sn.y,Sn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Ti(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=xt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=xt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=xt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=xt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=xt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Ti(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Ti(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Ti(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Ti(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=xt(t,this.array),n=xt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=xt(t,this.array),n=xt(n,this.array),i=xt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=xt(t,this.array),n=xt(n,this.array),i=xt(i,this.array),s=xt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new Yt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Mf(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const tp=new k,np=new gt,ip=new gt,Gv=new k,rp=new tt,lc=new k,nu=new Gi,sp=new tt,iu=new ml;class Vv extends un{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Dd,this.bindMatrix=new tt,this.bindMatrixInverse=new tt,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new ur),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,lc),this.boundingBox.expandByPoint(lc)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Gi),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,lc),this.boundingSphere.expandByPoint(lc)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),nu.copy(this.boundingSphere),nu.applyMatrix4(i),e.ray.intersectsSphere(nu)!==!1&&(sp.copy(i).invert(),iu.copy(e.ray).applyMatrix4(sp),!(this.boundingBox!==null&&iu.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,iu)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new gt,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Dd?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===B0?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;np.fromBufferAttribute(i.attributes.skinIndex,e),ip.fromBufferAttribute(i.attributes.skinWeight,e),tp.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){const a=ip.getComponent(s);if(a!==0){const o=np.getComponent(s);rp.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(Gv.copy(tp).applyMatrix4(rp),a)}}return t.applyMatrix4(this.bindMatrixInverse)}}class jg extends kt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class qg extends Qt{constructor(e=null,t=1,n=1,i,s,a,o,c,l=Cn,u=Cn,h,f){super(null,a,o,c,l,u,i,s,h,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const ap=new tt,Wv=new tt;class Tf{constructor(e=[],t=[]){this.uuid=Ai(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new tt)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new tt;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,a=e.length;s<a;s++){const o=e[s]?e[s].matrixWorld:Wv;ap.multiplyMatrices(o,t[s]),ap.toArray(n,s*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new Tf(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new qg(t,e,e,_i,Ei);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const s=e.bones[n];let a=t[s];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),a=new jg),this.bones.push(a),this.boneInverses.push(new tt().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){const a=t[i];e.bones.push(a.uuid);const o=n[i];e.boneInverses.push(o.toArray())}return e}}class Dh extends Yt{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const ks=new tt,op=new tt,uc=[],cp=new ur,Xv=new tt,Ua=new un,Fa=new Gi;class jv extends un{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Dh(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,Xv)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new ur),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ks),cp.copy(e.boundingBox).applyMatrix4(ks),this.boundingBox.union(cp)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Gi),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ks),Fa.copy(e.boundingSphere).applyMatrix4(ks),this.boundingSphere.union(Fa)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,s=n.length+1,a=e*s+1;for(let o=0;o<n.length;o++)n[o]=i[a+o]}raycast(e,t){const n=this.matrixWorld,i=this.count;if(Ua.geometry=this.geometry,Ua.material=this.material,Ua.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Fa.copy(this.boundingSphere),Fa.applyMatrix4(n),e.ray.intersectsSphere(Fa)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,ks),op.multiplyMatrices(n,ks),Ua.matrixWorld=op,Ua.raycast(e,uc);for(let a=0,o=uc.length;a<o;a++){const c=uc[a];c.instanceId=s,c.object=this,t.push(c)}uc.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Dh(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new qg(new Float32Array(i*this.count),i,this.count,_f,Ei));const s=this.morphTexture.source.data.data;let a=0;for(let l=0;l<n.length;l++)a+=n[l];const o=this.geometry.morphTargetsRelative?1:1-a,c=i*e;s[c]=o,s.set(n,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const ru=new k,qv=new k,Yv=new Ze;class Zr{constructor(e=new k(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=ru.subVectors(n,t).cross(qv.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(ru),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Yv.getNormalMatrix(e),i=this.coplanarPoint(ru).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Xr=new Gi,Kv=new lt(.5,.5),hc=new k;class Ef{constructor(e=new Zr,t=new Zr,n=new Zr,i=new Zr,s=new Zr,a=new Zr){this.planes=[e,t,n,i,s,a]}set(e,t,n,i,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Fi,n=!1){const i=this.planes,s=e.elements,a=s[0],o=s[1],c=s[2],l=s[3],u=s[4],h=s[5],f=s[6],d=s[7],g=s[8],_=s[9],m=s[10],p=s[11],v=s[12],y=s[13],b=s[14],M=s[15];if(i[0].setComponents(l-a,d-u,p-g,M-v).normalize(),i[1].setComponents(l+a,d+u,p+g,M+v).normalize(),i[2].setComponents(l+o,d+h,p+_,M+y).normalize(),i[3].setComponents(l-o,d-h,p-_,M-y).normalize(),n)i[4].setComponents(c,f,m,b).normalize(),i[5].setComponents(l-c,d-f,p-m,M-b).normalize();else if(i[4].setComponents(l-c,d-f,p-m,M-b).normalize(),t===Fi)i[5].setComponents(l+c,d+f,p+m,M+b).normalize();else if(t===al)i[5].setComponents(c,f,m,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Xr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Xr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Xr)}intersectsSprite(e){Xr.center.set(0,0,0);const t=Kv.distanceTo(e.center);return Xr.radius=.7071067811865476+t,Xr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Xr)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(hc.x=i.normal.x>0?e.max.x:e.min.x,hc.y=i.normal.y>0?e.max.y:e.min.y,hc.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(hc)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class ol extends ki{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new qe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const cl=new k,ll=new k,lp=new tt,Oa=new ml,fc=new Gi,su=new k,up=new k;class gl extends kt{constructor(e=new Zt,t=new ol){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)cl.fromBufferAttribute(t,i-1),ll.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=cl.distanceTo(ll);e.setAttribute("lineDistance",new en(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),fc.copy(n.boundingSphere),fc.applyMatrix4(i),fc.radius+=s,e.ray.intersectsSphere(fc)===!1)return;lp.copy(i).invert(),Oa.copy(e.ray).applyMatrix4(lp);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,u=n.index,f=n.attributes.position;if(u!==null){const d=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let _=d,m=g-1;_<m;_+=l){const p=u.getX(_),v=u.getX(_+1),y=dc(this,e,Oa,c,p,v,_);y&&t.push(y)}if(this.isLineLoop){const _=u.getX(g-1),m=u.getX(d),p=dc(this,e,Oa,c,_,m,g-1);p&&t.push(p)}}else{const d=Math.max(0,a.start),g=Math.min(f.count,a.start+a.count);for(let _=d,m=g-1;_<m;_+=l){const p=dc(this,e,Oa,c,_,_+1,_);p&&t.push(p)}if(this.isLineLoop){const _=dc(this,e,Oa,c,g-1,d,g-1);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function dc(r,e,t,n,i,s,a){const o=r.geometry.attributes.position;if(cl.fromBufferAttribute(o,i),ll.fromBufferAttribute(o,s),t.distanceSqToSegment(cl,ll,su,up)>n)return;su.applyMatrix4(r.matrixWorld);const l=e.ray.origin.distanceTo(su);if(!(l<e.near||l>e.far))return{distance:l,point:up.clone().applyMatrix4(r.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:r}}const hp=new k,fp=new k;class Lh extends gl{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)hp.fromBufferAttribute(t,i),fp.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+hp.distanceTo(fp);e.setAttribute("lineDistance",new en(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class $v extends gl{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class wf extends ki{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new qe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const dp=new tt,Ih=new ml,pc=new Gi,mc=new k;class Nh extends kt{constructor(e=new Zt,t=new wf){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),pc.copy(n.boundingSphere),pc.applyMatrix4(i),pc.radius+=s,e.ray.intersectsSphere(pc)===!1)return;dp.copy(i).invert(),Ih.copy(e.ray).applyMatrix4(dp);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,h=n.attributes.position;if(l!==null){const f=Math.max(0,a.start),d=Math.min(l.count,a.start+a.count);for(let g=f,_=d;g<_;g++){const m=l.getX(g);mc.fromBufferAttribute(h,m),pp(mc,m,c,i,e,t,this)}}else{const f=Math.max(0,a.start),d=Math.min(h.count,a.start+a.count);for(let g=f,_=d;g<_;g++)mc.fromBufferAttribute(h,g),pp(mc,g,c,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function pp(r,e,t,n,i,s,a){const o=Ih.distanceSqToPoint(r);if(o<t){const c=new k;Ih.closestPointToPoint(r,c),c.applyMatrix4(n);const l=i.ray.origin.distanceTo(c);if(l<i.near||l>i.far)return;s.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class Jv extends Qt{constructor(e,t,n,i,s,a,o,c,l){super(e,t,n,i,s,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Yg extends Qt{constructor(e,t,n=gs,i,s,a,o=Cn,c=Cn,l,u=To,h=1){if(u!==To&&u!==Eo)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:e,height:t,depth:h};super(f,i,s,a,o,c,u,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Sf(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Kg extends Qt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Af extends Zt{constructor(e=1,t=1,n=1,i=32,s=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:c};const l=this;i=Math.floor(i),s=Math.floor(s);const u=[],h=[],f=[],d=[];let g=0;const _=[],m=n/2;let p=0;v(),a===!1&&(e>0&&y(!0),t>0&&y(!1)),this.setIndex(u),this.setAttribute("position",new en(h,3)),this.setAttribute("normal",new en(f,3)),this.setAttribute("uv",new en(d,2));function v(){const b=new k,M=new k;let E=0;const T=(t-e)/n;for(let R=0;R<=s;R++){const x=[],S=R/s,C=S*(t-e)+e;for(let I=0;I<=i;I++){const U=I/i,z=U*c+o,W=Math.sin(z),V=Math.cos(z);M.x=C*W,M.y=-S*n+m,M.z=C*V,h.push(M.x,M.y,M.z),b.set(W,T,V).normalize(),f.push(b.x,b.y,b.z),d.push(U,1-S),x.push(g++)}_.push(x)}for(let R=0;R<i;R++)for(let x=0;x<s;x++){const S=_[x][R],C=_[x+1][R],I=_[x+1][R+1],U=_[x][R+1];(e>0||x!==0)&&(u.push(S,C,U),E+=3),(t>0||x!==s-1)&&(u.push(C,I,U),E+=3)}l.addGroup(p,E,0),p+=E}function y(b){const M=g,E=new lt,T=new k;let R=0;const x=b===!0?e:t,S=b===!0?1:-1;for(let I=1;I<=i;I++)h.push(0,m*S,0),f.push(0,S,0),d.push(.5,.5),g++;const C=g;for(let I=0;I<=i;I++){const z=I/i*c+o,W=Math.cos(z),V=Math.sin(z);T.x=x*V,T.y=m*S,T.z=x*W,h.push(T.x,T.y,T.z),f.push(0,S,0),E.x=W*.5+.5,E.y=V*.5*S+.5,d.push(E.x,E.y),g++}for(let I=0;I<i;I++){const U=M+I,z=C+I;b===!0?u.push(z,z+1,U):u.push(z+1,z,U),R+=3}l.addGroup(p,R,b===!0?1:2),p+=R}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Af(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class $g extends Af{constructor(e=1,t=1,n=32,i=1,s=!1,a=0,o=Math.PI*2){super(0,e,t,n,i,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new $g(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}const gc=new k,_c=new k,au=new k,bc=new pi;class Zv extends Zt{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){const i=Math.pow(10,4),s=Math.cos(ta*t),a=e.getIndex(),o=e.getAttribute("position"),c=a?a.count:o.count,l=[0,0,0],u=["a","b","c"],h=new Array(3),f={},d=[];for(let g=0;g<c;g+=3){a?(l[0]=a.getX(g),l[1]=a.getX(g+1),l[2]=a.getX(g+2)):(l[0]=g,l[1]=g+1,l[2]=g+2);const{a:_,b:m,c:p}=bc;if(_.fromBufferAttribute(o,l[0]),m.fromBufferAttribute(o,l[1]),p.fromBufferAttribute(o,l[2]),bc.getNormal(au),h[0]=`${Math.round(_.x*i)},${Math.round(_.y*i)},${Math.round(_.z*i)}`,h[1]=`${Math.round(m.x*i)},${Math.round(m.y*i)},${Math.round(m.z*i)}`,h[2]=`${Math.round(p.x*i)},${Math.round(p.y*i)},${Math.round(p.z*i)}`,!(h[0]===h[1]||h[1]===h[2]||h[2]===h[0]))for(let v=0;v<3;v++){const y=(v+1)%3,b=h[v],M=h[y],E=bc[u[v]],T=bc[u[y]],R=`${b}_${M}`,x=`${M}_${b}`;x in f&&f[x]?(au.dot(f[x].normal)<=s&&(d.push(E.x,E.y,E.z),d.push(T.x,T.y,T.z)),f[x]=null):R in f||(f[R]={index0:l[v],index1:l[y],normal:au.clone()})}}for(const g in f)if(f[g]){const{index0:_,index1:m}=f[g];gc.fromBufferAttribute(o,_),_c.fromBufferAttribute(o,m),d.push(gc.x,gc.y,gc.z),d.push(_c.x,_c.y,_c.z)}this.setAttribute("position",new en(d,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class ga extends Zt{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const s=e/2,a=t/2,o=Math.floor(n),c=Math.floor(i),l=o+1,u=c+1,h=e/o,f=t/c,d=[],g=[],_=[],m=[];for(let p=0;p<u;p++){const v=p*f-a;for(let y=0;y<l;y++){const b=y*h-s;g.push(b,-v,0),_.push(0,0,1),m.push(y/o),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let v=0;v<o;v++){const y=v+l*p,b=v+l*(p+1),M=v+1+l*(p+1),E=v+1+l*p;d.push(y,b,E),d.push(b,M,E)}this.setIndex(d),this.setAttribute("position",new en(g,3)),this.setAttribute("normal",new en(_,3)),this.setAttribute("uv",new en(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ga(e.width,e.height,e.widthSegments,e.heightSegments)}}class Jg extends Zt{constructor(e=1,t=32,n=16,i=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const c=Math.min(a+o,Math.PI);let l=0;const u=[],h=new k,f=new k,d=[],g=[],_=[],m=[];for(let p=0;p<=n;p++){const v=[],y=p/n;let b=0;p===0&&a===0?b=.5/t:p===n&&c===Math.PI&&(b=-.5/t);for(let M=0;M<=t;M++){const E=M/t;h.x=-e*Math.cos(i+E*s)*Math.sin(a+y*o),h.y=e*Math.cos(a+y*o),h.z=e*Math.sin(i+E*s)*Math.sin(a+y*o),g.push(h.x,h.y,h.z),f.copy(h).normalize(),_.push(f.x,f.y,f.z),m.push(E+b,1-y),v.push(l++)}u.push(v)}for(let p=0;p<n;p++)for(let v=0;v<t;v++){const y=u[p][v+1],b=u[p][v],M=u[p+1][v],E=u[p+1][v+1];(p!==0||a>0)&&d.push(y,b,E),(p!==n-1||c<Math.PI)&&d.push(b,M,E)}this.setIndex(d),this.setAttribute("position",new en(g,3)),this.setAttribute("normal",new en(_,3)),this.setAttribute("uv",new en(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Jg(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Rf extends ki{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new qe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new qe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ug,this.normalScale=new lt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Hi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class vi extends Rf{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new lt(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return ot(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new qe(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new qe(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new qe(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class Qv extends ki{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=G0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class ex extends ki{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}function vc(r,e){return!r||r.constructor===e?r:typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r)}function tx(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function nx(r){function e(i,s){return r[i]-r[s]}const t=r.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function mp(r,e,t){const n=r.length,i=new r.constructor(n);for(let s=0,a=0;a!==n;++s){const o=t[s]*e;for(let c=0;c!==e;++c)i[a++]=r[o+c]}return i}function Zg(r,e,t,n){let i=1,s=r[0];for(;s!==void 0&&s[n]===void 0;)s=r[i++];if(s===void 0)return;let a=s[n];if(a!==void 0)if(Array.isArray(a))do a=s[n],a!==void 0&&(e.push(s.time),t.push(...a)),s=r[i++];while(s!==void 0);else if(a.toArray!==void 0)do a=s[n],a!==void 0&&(e.push(s.time),a.toArray(t,t.length)),s=r[i++];while(s!==void 0);else do a=s[n],a!==void 0&&(e.push(s.time),t.push(a)),s=r[i++];while(s!==void 0)}class Io{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],s=t[n-1];n:{e:{let a;t:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=i,i=t[++n],e<i)break e}a=t.length;break t}if(!(e>=s)){const o=t[1];e<o&&(n=2,s=o);for(let c=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(i=s,s=t[--n-1],e>=s)break e}a=n,n=0;break t}break n}for(;n<a;){const o=n+a>>>1;e<t[o]?a=o:n=o+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let a=0;a!==i;++a)t[a]=n[s+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class ix extends Io{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Ld,endingEnd:Ld}}intervalChanged_(e,t,n){const i=this.parameterPositions;let s=e-2,a=e+1,o=i[s],c=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case Id:s=e,o=2*t-n;break;case Nd:s=i.length-2,o=t+i[s]-i[s+1];break;default:s=e,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Id:a=e,c=2*n-t;break;case Nd:a=1,c=n+i[1]-i[0];break;default:a=e-1,c=t}const l=(n-t)*.5,u=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-n),this._offsetPrev=s*u,this._offsetNext=a*u}interpolate_(e,t,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,u=this._offsetPrev,h=this._offsetNext,f=this._weightPrev,d=this._weightNext,g=(n-t)/(i-t),_=g*g,m=_*g,p=-f*m+2*f*_-f*g,v=(1+f)*m+(-1.5-2*f)*_+(-.5+f)*g+1,y=(-1-d)*m+(1.5+d)*_+.5*g,b=d*m-d*_;for(let M=0;M!==o;++M)s[M]=p*a[u+M]+v*a[l+M]+y*a[c+M]+b*a[h+M];return s}}class rx extends Io{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,u=(n-t)/(i-t),h=1-u;for(let f=0;f!==o;++f)s[f]=a[l+f]*h+a[c+f]*u;return s}}class sx extends Io{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class Ri{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=vc(t,this.TimeBufferType),this.values=vc(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:vc(e.times,Array),values:vc(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new sx(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new rx(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new ix(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case wo:t=this.InterpolantFactoryMethodDiscrete;break;case Ao:t=this.InterpolantFactoryMethodLinear;break;case Nl:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return wo;case this.InterpolantFactoryMethodLinear:return Ao;case this.InterpolantFactoryMethodSmooth:return Nl}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let s=0,a=i-1;for(;s!==i&&n[s]<e;)++s;for(;a!==-1&&n[a]>t;)--a;if(++a,s!==0||a!==i){s>=a&&(a=Math.max(a,1),s=a-1);const o=this.getValueSize();this.times=n.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==s;o++){const c=n[o];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(i!==void 0&&tx(i))for(let o=0,c=i.length;o!==c;++o){const l=i[o];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Nl,s=e.length-1;let a=1;for(let o=1;o<s;++o){let c=!1;const l=e[o],u=e[o+1];if(l!==u&&(o!==1||l!==e[0]))if(i)c=!0;else{const h=o*n,f=h-n,d=h+n;for(let g=0;g!==n;++g){const _=t[h+g];if(_!==t[f+g]||_!==t[d+g]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];const h=o*n,f=a*n;for(let d=0;d!==n;++d)t[f+d]=t[h+d]}++a}}if(s>0){e[a]=e[s];for(let o=s*n,c=a*n,l=0;l!==n;++l)t[c+l]=t[o+l];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}Ri.prototype.ValueTypeName="";Ri.prototype.TimeBufferType=Float32Array;Ri.prototype.ValueBufferType=Float32Array;Ri.prototype.DefaultInterpolation=Ao;class ya extends Ri{constructor(e,t,n){super(e,t,n)}}ya.prototype.ValueTypeName="bool";ya.prototype.ValueBufferType=Array;ya.prototype.DefaultInterpolation=wo;ya.prototype.InterpolantFactoryMethodLinear=void 0;ya.prototype.InterpolantFactoryMethodSmooth=void 0;class Qg extends Ri{constructor(e,t,n,i){super(e,t,n,i)}}Qg.prototype.ValueTypeName="color";class _a extends Ri{constructor(e,t,n,i){super(e,t,n,i)}}_a.prototype.ValueTypeName="number";class ax extends Io{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-t)/(i-t);let l=e*o;for(let u=l+o;l!==u;l+=4)kr.slerpFlat(s,0,a,l-o,a,l,c);return s}}class ba extends Ri{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new ax(this.times,this.values,this.getValueSize(),e)}}ba.prototype.ValueTypeName="quaternion";ba.prototype.InterpolantFactoryMethodSmooth=void 0;class Sa extends Ri{constructor(e,t,n){super(e,t,n)}}Sa.prototype.ValueTypeName="string";Sa.prototype.ValueBufferType=Array;Sa.prototype.DefaultInterpolation=wo;Sa.prototype.InterpolantFactoryMethodLinear=void 0;Sa.prototype.InterpolantFactoryMethodSmooth=void 0;class va extends Ri{constructor(e,t,n,i){super(e,t,n,i)}}va.prototype.ValueTypeName="vector";class ox{constructor(e="",t=-1,n=[],i=z0){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=Ai(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(lx(n[a]).scale(i));const s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s.userData=JSON.parse(e.userData||"{}"),s}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let s=0,a=n.length;s!==a;++s)t.push(Ri.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const s=t.length,a=[];for(let o=0;o<s;o++){let c=[],l=[];c.push((o+s-1)%s,o,(o+1)%s),l.push(0,1,0);const u=nx(c);c=mp(c,1,u),l=mp(l,1,u),!i&&c[0]===0&&(c.push(s),l.push(l[0])),a.push(new _a(".morphTargetInfluences["+t[o].name+"]",c,l).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},s=/^([\w-]*?)([\d]+)$/;for(let o=0,c=e.length;o<c;o++){const l=e[o],u=l.name.match(s);if(u&&u.length>1){const h=u[1];let f=i[h];f||(i[h]=f=[]),f.push(l)}}const a=[];for(const o in i)a.push(this.CreateFromMorphTargetSequence(o,i[o],t,n));return a}static parseAnimation(e,t){if(console.warn("THREE.AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(h,f,d,g,_){if(d.length!==0){const m=[],p=[];Zg(d,m,p,g),m.length!==0&&_.push(new h(f,m,p))}},i=[],s=e.name||"default",a=e.fps||30,o=e.blendMode;let c=e.length||-1;const l=e.hierarchy||[];for(let h=0;h<l.length;h++){const f=l[h].keys;if(!(!f||f.length===0))if(f[0].morphTargets){const d={};let g;for(g=0;g<f.length;g++)if(f[g].morphTargets)for(let _=0;_<f[g].morphTargets.length;_++)d[f[g].morphTargets[_]]=-1;for(const _ in d){const m=[],p=[];for(let v=0;v!==f[g].morphTargets.length;++v){const y=f[g];m.push(y.time),p.push(y.morphTarget===_?1:0)}i.push(new _a(".morphTargetInfluence["+_+"]",m,p))}c=d.length*a}else{const d=".bones["+t[h].name+"]";n(va,d+".position",f,"pos",i),n(ba,d+".quaternion",f,"rot",i),n(va,d+".scale",f,"scl",i)}}return i.length===0?null:new this(s,c,i,o)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());const t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}}function cx(r){switch(r.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return _a;case"vector":case"vector2":case"vector3":case"vector4":return va;case"color":return Qg;case"quaternion":return ba;case"bool":case"boolean":return ya;case"string":return Sa}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+r)}function lx(r){if(r.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=cx(r.type);if(r.times===void 0){const t=[],n=[];Zg(r.keys,t,n,"value"),r.times=t,r.values=n}return e.parse!==void 0?e.parse(r):new e(r.name,r.times,r.values,r.interpolation)}const nr={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(this.files[r]=e)},get:function(r){if(this.enabled!==!1)return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};class ux{constructor(e,t,n){const i=this;let s=!1,a=0,o=0,c;const l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.abortController=new AbortController,this.itemStart=function(u){o++,s===!1&&i.onStart!==void 0&&i.onStart(u,a,o),s=!0},this.itemEnd=function(u){a++,i.onProgress!==void 0&&i.onProgress(u,a,o),a===o&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(u){i.onError!==void 0&&i.onError(u)},this.resolveURL=function(u){return c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,h){return l.push(u,h),this},this.removeHandler=function(u){const h=l.indexOf(u);return h!==-1&&l.splice(h,2),this},this.getHandler=function(u){for(let h=0,f=l.length;h<f;h+=2){const d=l[h],g=l[h+1];if(d.global&&(d.lastIndex=0),d.test(u))return g}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}}const hx=new ux;class Ma{constructor(e){this.manager=e!==void 0?e:hx,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}Ma.DEFAULT_MATERIAL_NAME="__DEFAULT";const Yi={};class fx extends Error{constructor(e,t){super(e),this.response=t}}class e_ extends Ma{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=nr.get(`file:${e}`);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(Yi[e]!==void 0){Yi[e].push({onLoad:t,onProgress:n,onError:i});return}Yi[e]=[],Yi[e].push({onLoad:t,onProgress:n,onError:i});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,c=this.responseType;fetch(a).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;const u=Yi[e],h=l.body.getReader(),f=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),d=f?parseInt(f):0,g=d!==0;let _=0;const m=new ReadableStream({start(p){v();function v(){h.read().then(({done:y,value:b})=>{if(y)p.close();else{_+=b.byteLength;const M=new ProgressEvent("progress",{lengthComputable:g,loaded:_,total:d});for(let E=0,T=u.length;E<T;E++){const R=u[E];R.onProgress&&R.onProgress(M)}p.enqueue(b),v()}},y=>{p.error(y)})}}});return new Response(m)}else throw new fx(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(u=>new DOMParser().parseFromString(u,o));case"json":return l.json();default:if(o==="")return l.text();{const h=/charset="?([^;"\s]*)"?/i.exec(o),f=h&&h[1]?h[1].toLowerCase():void 0,d=new TextDecoder(f);return l.arrayBuffer().then(g=>d.decode(g))}}}).then(l=>{nr.add(`file:${e}`,l);const u=Yi[e];delete Yi[e];for(let h=0,f=u.length;h<f;h++){const d=u[h];d.onLoad&&d.onLoad(l)}}).catch(l=>{const u=Yi[e];if(u===void 0)throw this.manager.itemError(e),l;delete Yi[e];for(let h=0,f=u.length;h<f;h++){const d=u[h];d.onError&&d.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const Bs=new WeakMap;class dx extends Ma{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,a=nr.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)s.manager.itemStart(e),setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0);else{let h=Bs.get(a);h===void 0&&(h=[],Bs.set(a,h)),h.push({onLoad:t,onError:i})}return a}const o=Ro("img");function c(){u(),t&&t(this);const h=Bs.get(this)||[];for(let f=0;f<h.length;f++){const d=h[f];d.onLoad&&d.onLoad(this)}Bs.delete(this),s.manager.itemEnd(e)}function l(h){u(),i&&i(h),nr.remove(`image:${e}`);const f=Bs.get(this)||[];for(let d=0;d<f.length;d++){const g=f[d];g.onError&&g.onError(h)}Bs.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function u(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),nr.add(`image:${e}`,o),s.manager.itemStart(e),o.src=e,o}}class px extends Ma{constructor(e){super(e)}load(e,t,n,i){const s=new Qt,a=new dx(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){s.image=o,s.needsUpdate=!0,t!==void 0&&t(s)},n,i),s}}class Cf extends kt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new qe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}const ou=new tt,gp=new k,_p=new k;class Pf{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new lt(512,512),this.mapType=zi,this.map=null,this.mapPass=null,this.matrix=new tt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ef,this._frameExtents=new lt(1,1),this._viewportCount=1,this._viewports=[new gt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;gp.setFromMatrixPosition(e.matrixWorld),t.position.copy(gp),_p.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(_p),t.updateMatrixWorld(),ou.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ou,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(ou)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class mx extends Pf{constructor(){super(new In(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,n=pa*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,s=e.distance||t.far;(n!==t.fov||i!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=i,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class gx extends Cf{constructor(e,t,n=0,i=Math.PI/3,s=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(kt.DEFAULT_UP),this.updateMatrix(),this.target=new kt,this.distance=n,this.angle=i,this.penumbra=s,this.decay=a,this.map=null,this.shadow=new mx}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const bp=new tt,ka=new k,cu=new k;class _x extends Pf{constructor(){super(new In(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new lt(4,2),this._viewportCount=6,this._viewports=[new gt(2,1,1,1),new gt(0,1,1,1),new gt(3,1,1,1),new gt(1,1,1,1),new gt(3,0,1,1),new gt(1,0,1,1)],this._cubeDirections=[new k(1,0,0),new k(-1,0,0),new k(0,0,1),new k(0,0,-1),new k(0,1,0),new k(0,-1,0)],this._cubeUps=[new k(0,1,0),new k(0,1,0),new k(0,1,0),new k(0,1,0),new k(0,0,1),new k(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),ka.setFromMatrixPosition(e.matrixWorld),n.position.copy(ka),cu.copy(n.position),cu.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(cu),n.updateMatrixWorld(),i.makeTranslation(-ka.x,-ka.y,-ka.z),bp.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(bp,n.coordinateSystem,n.reversedDepth)}}class bx extends Cf{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new _x}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Df extends Wg{constructor(e=-1,t=1,n=1,i=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-e,a=n+e,o=i+t,c=i-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,a=s+l*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class vx extends Pf{constructor(){super(new Df(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class xx extends Cf{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(kt.DEFAULT_UP),this.updateMatrix(),this.target=new kt,this.shadow=new vx}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class co{static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}const lu=new WeakMap;class yx extends Ma{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,a=nr.get(`image-bitmap:${e}`);if(a!==void 0){if(s.manager.itemStart(e),a.then){a.then(l=>{if(lu.has(a)===!0)i&&i(lu.get(a)),s.manager.itemError(e),s.manager.itemEnd(e);else return t&&t(l),s.manager.itemEnd(e),l});return}return setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0),a}const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;const c=fetch(e,o).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(l){return nr.add(`image-bitmap:${e}`,l),t&&t(l),s.manager.itemEnd(e),l}).catch(function(l){i&&i(l),lu.set(c,l),nr.remove(`image-bitmap:${e}`),s.manager.itemError(e),s.manager.itemEnd(e)});nr.add(`image-bitmap:${e}`,c),s.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}class Sx extends In{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const Lf="\\[\\]\\.:\\/",Mx=new RegExp("["+Lf+"]","g"),If="[^"+Lf+"]",Tx="[^"+Lf.replace("\\.","")+"]",Ex=/((?:WC+[\/:])*)/.source.replace("WC",If),wx=/(WCOD+)?/.source.replace("WCOD",Tx),Ax=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",If),Rx=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",If),Cx=new RegExp("^"+Ex+wx+Ax+Rx+"$"),Px=["material","materials","bones","map"];class Dx{constructor(e,t,n){const i=n||yt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class yt{constructor(e,t,n){this.path=t,this.parsedPath=n||yt.parseTrackName(t),this.node=yt.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new yt.Composite(e,t,n):new yt(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Mx,"")}static parseTrackName(e){const t=Cx.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const s=n.nodeName.substring(i+1);Px.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(s){for(let a=0;a<s.length;a++){const o=s[a];if(o.name===t||o.uuid===t)return o;const c=n(o.children);if(c)return c}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let s=t.propertyIndex;if(e||(e=yt.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===l){l=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}const a=e[i];if(a===void 0){const l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+i+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}yt.Composite=Dx;yt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};yt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};yt.prototype.GetterByBindingType=[yt.prototype._getValue_direct,yt.prototype._getValue_array,yt.prototype._getValue_arrayElement,yt.prototype._getValue_toArray];yt.prototype.SetterByBindingTypeAndVersioning=[[yt.prototype._setValue_direct,yt.prototype._setValue_direct_setNeedsUpdate,yt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[yt.prototype._setValue_array,yt.prototype._setValue_array_setNeedsUpdate,yt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[yt.prototype._setValue_arrayElement,yt.prototype._setValue_arrayElement_setNeedsUpdate,yt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[yt.prototype._setValue_fromArray,yt.prototype._setValue_fromArray_setNeedsUpdate,yt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class t_{constructor(e){this.value=e}clone(){return new t_(this.value.clone===void 0?this.value:this.value.clone())}}function vp(r,e,t,n){const i=Lx(n);switch(t){case Dg:return r*e;case _f:return r*e/i.components*i.byteLength;case bf:return r*e/i.components*i.byteLength;case Ig:return r*e*2/i.components*i.byteLength;case vf:return r*e*2/i.components*i.byteLength;case Lg:return r*e*3/i.components*i.byteLength;case _i:return r*e*4/i.components*i.byteLength;case xf:return r*e*4/i.components*i.byteLength;case kc:case Bc:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case zc:case Hc:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case nh:case rh:return Math.max(r,16)*Math.max(e,8)/4;case th:case ih:return Math.max(r,8)*Math.max(e,8)/2;case sh:case ah:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case oh:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case ch:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case lh:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case uh:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case hh:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case fh:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case dh:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case ph:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case mh:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case gh:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case _h:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case bh:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case vh:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case xh:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case yh:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case Sh:case Mh:case Th:return Math.ceil(r/4)*Math.ceil(e/4)*16;case Eh:case wh:return Math.ceil(r/4)*Math.ceil(e/4)*8;case Ah:case Rh:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Lx(r){switch(r){case zi:case Ag:return{byteLength:1,components:1};case So:case Rg:case Do:return{byteLength:2,components:1};case mf:case gf:return{byteLength:2,components:4};case gs:case pf:case Ei:return{byteLength:4,components:1};case Cg:case Pg:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:df}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=df);function n_(){let r=null,e=!1,t=null,n=null;function i(s,a){t(s,a),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function Ix(r){const e=new WeakMap;function t(o,c){const l=o.array,u=o.usage,h=l.byteLength,f=r.createBuffer();r.bindBuffer(c,f),r.bufferData(c,l,u),o.onUploadCallback();let d;if(l instanceof Float32Array)d=r.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)d=r.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?d=r.HALF_FLOAT:d=r.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=r.SHORT;else if(l instanceof Uint32Array)d=r.UNSIGNED_INT;else if(l instanceof Int32Array)d=r.INT;else if(l instanceof Int8Array)d=r.BYTE;else if(l instanceof Uint8Array)d=r.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:h}}function n(o,c,l){const u=c.array,h=c.updateRanges;if(r.bindBuffer(l,o),h.length===0)r.bufferSubData(l,0,u);else{h.sort((d,g)=>d.start-g.start);let f=0;for(let d=1;d<h.length;d++){const g=h[f],_=h[d];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++f,h[f]=_)}h.length=f+1;for(let d=0,g=h.length;d<g;d++){const _=h[d];r.bufferSubData(l,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(r.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:i,remove:s,update:a}}var Nx=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Ux=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Fx=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Ox=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,kx=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Bx=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,zx=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Hx=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Gx=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Vx=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Wx=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Xx=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,jx=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,qx=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Yx=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Kx=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,$x=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Jx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Zx=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Qx=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,ey=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,ty=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,ny=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,iy=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,ry=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,sy=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,ay=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,oy=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,cy=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,ly=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,uy="gl_FragColor = linearToOutputTexel( gl_FragColor );",hy=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,fy=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,dy=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,py=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,my=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,gy=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,_y=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,by=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,vy=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,xy=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,yy=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Sy=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,My=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Ty=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Ey=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,wy=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Ay=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Ry=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Cy=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Py=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Dy=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Ly=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Iy=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Ny=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Uy=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Fy=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Oy=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ky=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,By=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,zy=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Hy=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Gy=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Vy=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Wy=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Xy=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,jy=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,qy=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Yy=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ky=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,$y=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Jy=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Zy=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Qy=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,eS=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,tS=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,nS=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,iS=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,rS=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,sS=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,aS=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,oS=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,cS=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,lS=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,uS=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,hS=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,fS=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,dS=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,pS=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,mS=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,gS=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,_S=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,bS=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,vS=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,xS=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,yS=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,SS=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,MS=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,TS=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,ES=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,wS=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,AS=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,RS=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,CS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,PS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,DS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,LS=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const IS=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,NS=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,US=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,FS=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,OS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,kS=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,BS=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,zS=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,HS=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,GS=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,VS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,WS=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,XS=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,jS=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,qS=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,YS=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,KS=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,$S=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,JS=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,ZS=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,QS=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,eM=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,tM=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,nM=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,iM=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,rM=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,sM=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,aM=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,oM=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,cM=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,lM=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,uM=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,hM=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,fM=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,et={alphahash_fragment:Nx,alphahash_pars_fragment:Ux,alphamap_fragment:Fx,alphamap_pars_fragment:Ox,alphatest_fragment:kx,alphatest_pars_fragment:Bx,aomap_fragment:zx,aomap_pars_fragment:Hx,batching_pars_vertex:Gx,batching_vertex:Vx,begin_vertex:Wx,beginnormal_vertex:Xx,bsdfs:jx,iridescence_fragment:qx,bumpmap_pars_fragment:Yx,clipping_planes_fragment:Kx,clipping_planes_pars_fragment:$x,clipping_planes_pars_vertex:Jx,clipping_planes_vertex:Zx,color_fragment:Qx,color_pars_fragment:ey,color_pars_vertex:ty,color_vertex:ny,common:iy,cube_uv_reflection_fragment:ry,defaultnormal_vertex:sy,displacementmap_pars_vertex:ay,displacementmap_vertex:oy,emissivemap_fragment:cy,emissivemap_pars_fragment:ly,colorspace_fragment:uy,colorspace_pars_fragment:hy,envmap_fragment:fy,envmap_common_pars_fragment:dy,envmap_pars_fragment:py,envmap_pars_vertex:my,envmap_physical_pars_fragment:wy,envmap_vertex:gy,fog_vertex:_y,fog_pars_vertex:by,fog_fragment:vy,fog_pars_fragment:xy,gradientmap_pars_fragment:yy,lightmap_pars_fragment:Sy,lights_lambert_fragment:My,lights_lambert_pars_fragment:Ty,lights_pars_begin:Ey,lights_toon_fragment:Ay,lights_toon_pars_fragment:Ry,lights_phong_fragment:Cy,lights_phong_pars_fragment:Py,lights_physical_fragment:Dy,lights_physical_pars_fragment:Ly,lights_fragment_begin:Iy,lights_fragment_maps:Ny,lights_fragment_end:Uy,logdepthbuf_fragment:Fy,logdepthbuf_pars_fragment:Oy,logdepthbuf_pars_vertex:ky,logdepthbuf_vertex:By,map_fragment:zy,map_pars_fragment:Hy,map_particle_fragment:Gy,map_particle_pars_fragment:Vy,metalnessmap_fragment:Wy,metalnessmap_pars_fragment:Xy,morphinstance_vertex:jy,morphcolor_vertex:qy,morphnormal_vertex:Yy,morphtarget_pars_vertex:Ky,morphtarget_vertex:$y,normal_fragment_begin:Jy,normal_fragment_maps:Zy,normal_pars_fragment:Qy,normal_pars_vertex:eS,normal_vertex:tS,normalmap_pars_fragment:nS,clearcoat_normal_fragment_begin:iS,clearcoat_normal_fragment_maps:rS,clearcoat_pars_fragment:sS,iridescence_pars_fragment:aS,opaque_fragment:oS,packing:cS,premultiplied_alpha_fragment:lS,project_vertex:uS,dithering_fragment:hS,dithering_pars_fragment:fS,roughnessmap_fragment:dS,roughnessmap_pars_fragment:pS,shadowmap_pars_fragment:mS,shadowmap_pars_vertex:gS,shadowmap_vertex:_S,shadowmask_pars_fragment:bS,skinbase_vertex:vS,skinning_pars_vertex:xS,skinning_vertex:yS,skinnormal_vertex:SS,specularmap_fragment:MS,specularmap_pars_fragment:TS,tonemapping_fragment:ES,tonemapping_pars_fragment:wS,transmission_fragment:AS,transmission_pars_fragment:RS,uv_pars_fragment:CS,uv_pars_vertex:PS,uv_vertex:DS,worldpos_vertex:LS,background_vert:IS,background_frag:NS,backgroundCube_vert:US,backgroundCube_frag:FS,cube_vert:OS,cube_frag:kS,depth_vert:BS,depth_frag:zS,distanceRGBA_vert:HS,distanceRGBA_frag:GS,equirect_vert:VS,equirect_frag:WS,linedashed_vert:XS,linedashed_frag:jS,meshbasic_vert:qS,meshbasic_frag:YS,meshlambert_vert:KS,meshlambert_frag:$S,meshmatcap_vert:JS,meshmatcap_frag:ZS,meshnormal_vert:QS,meshnormal_frag:eM,meshphong_vert:tM,meshphong_frag:nM,meshphysical_vert:iM,meshphysical_frag:rM,meshtoon_vert:sM,meshtoon_frag:aM,points_vert:oM,points_frag:cM,shadow_vert:lM,shadow_frag:uM,sprite_vert:hM,sprite_frag:fM},ve={common:{diffuse:{value:new qe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ze},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ze}},envmap:{envMap:{value:null},envMapRotation:{value:new Ze},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ze}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ze}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ze},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ze},normalScale:{value:new lt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ze},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ze}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ze}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ze}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new qe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new qe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0},uvTransform:{value:new Ze}},sprite:{diffuse:{value:new qe(16777215)},opacity:{value:1},center:{value:new lt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ze},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0}}},Li={basic:{uniforms:Tn([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.fog]),vertexShader:et.meshbasic_vert,fragmentShader:et.meshbasic_frag},lambert:{uniforms:Tn([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,ve.lights,{emissive:{value:new qe(0)}}]),vertexShader:et.meshlambert_vert,fragmentShader:et.meshlambert_frag},phong:{uniforms:Tn([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,ve.lights,{emissive:{value:new qe(0)},specular:{value:new qe(1118481)},shininess:{value:30}}]),vertexShader:et.meshphong_vert,fragmentShader:et.meshphong_frag},standard:{uniforms:Tn([ve.common,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.roughnessmap,ve.metalnessmap,ve.fog,ve.lights,{emissive:{value:new qe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:et.meshphysical_vert,fragmentShader:et.meshphysical_frag},toon:{uniforms:Tn([ve.common,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.gradientmap,ve.fog,ve.lights,{emissive:{value:new qe(0)}}]),vertexShader:et.meshtoon_vert,fragmentShader:et.meshtoon_frag},matcap:{uniforms:Tn([ve.common,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,{matcap:{value:null}}]),vertexShader:et.meshmatcap_vert,fragmentShader:et.meshmatcap_frag},points:{uniforms:Tn([ve.points,ve.fog]),vertexShader:et.points_vert,fragmentShader:et.points_frag},dashed:{uniforms:Tn([ve.common,ve.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:et.linedashed_vert,fragmentShader:et.linedashed_frag},depth:{uniforms:Tn([ve.common,ve.displacementmap]),vertexShader:et.depth_vert,fragmentShader:et.depth_frag},normal:{uniforms:Tn([ve.common,ve.bumpmap,ve.normalmap,ve.displacementmap,{opacity:{value:1}}]),vertexShader:et.meshnormal_vert,fragmentShader:et.meshnormal_frag},sprite:{uniforms:Tn([ve.sprite,ve.fog]),vertexShader:et.sprite_vert,fragmentShader:et.sprite_frag},background:{uniforms:{uvTransform:{value:new Ze},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:et.background_vert,fragmentShader:et.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ze}},vertexShader:et.backgroundCube_vert,fragmentShader:et.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:et.cube_vert,fragmentShader:et.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:et.equirect_vert,fragmentShader:et.equirect_frag},distanceRGBA:{uniforms:Tn([ve.common,ve.displacementmap,{referencePosition:{value:new k},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:et.distanceRGBA_vert,fragmentShader:et.distanceRGBA_frag},shadow:{uniforms:Tn([ve.lights,ve.fog,{color:{value:new qe(0)},opacity:{value:1}}]),vertexShader:et.shadow_vert,fragmentShader:et.shadow_frag}};Li.physical={uniforms:Tn([Li.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ze},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ze},clearcoatNormalScale:{value:new lt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ze},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ze},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ze},sheen:{value:0},sheenColor:{value:new qe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ze},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ze},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ze},transmissionSamplerSize:{value:new lt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ze},attenuationDistance:{value:0},attenuationColor:{value:new qe(0)},specularColor:{value:new qe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ze},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ze},anisotropyVector:{value:new lt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ze}}]),vertexShader:et.meshphysical_vert,fragmentShader:et.meshphysical_frag};const xc={r:0,b:0,g:0},jr=new Hi,dM=new tt;function pM(r,e,t,n,i,s,a){const o=new qe(0);let c=s===!0?0:1,l,u,h=null,f=0,d=null;function g(y){let b=y.isScene===!0?y.background:null;return b&&b.isTexture&&(b=(y.backgroundBlurriness>0?t:e).get(b)),b}function _(y){let b=!1;const M=g(y);M===null?p(o,c):M&&M.isColor&&(p(M,1),b=!0);const E=r.xr.getEnvironmentBlendMode();E==="additive"?n.buffers.color.setClear(0,0,0,1,a):E==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(r.autoClear||b)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function m(y,b){const M=g(b);M&&(M.isCubeTexture||M.mapping===pl)?(u===void 0&&(u=new un(new Lo(1,1,1),new lr({name:"BackgroundCubeMaterial",uniforms:ma(Li.backgroundCube.uniforms),vertexShader:Li.backgroundCube.vertexShader,fragmentShader:Li.backgroundCube.fragmentShader,side:Hn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(E,T,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),jr.copy(b.backgroundRotation),jr.x*=-1,jr.y*=-1,jr.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(jr.y*=-1,jr.z*=-1),u.material.uniforms.envMap.value=M,u.material.uniforms.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(dM.makeRotationFromEuler(jr)),u.material.toneMapped=ft.getTransfer(M.colorSpace)!==St,(h!==M||f!==M.version||d!==r.toneMapping)&&(u.material.needsUpdate=!0,h=M,f=M.version,d=r.toneMapping),u.layers.enableAll(),y.unshift(u,u.geometry,u.material,0,0,null)):M&&M.isTexture&&(l===void 0&&(l=new un(new ga(2,2),new lr({name:"BackgroundMaterial",uniforms:ma(Li.background.uniforms),vertexShader:Li.background.vertexShader,fragmentShader:Li.background.fragmentShader,side:cr,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=M,l.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,l.material.toneMapped=ft.getTransfer(M.colorSpace)!==St,M.matrixAutoUpdate===!0&&M.updateMatrix(),l.material.uniforms.uvTransform.value.copy(M.matrix),(h!==M||f!==M.version||d!==r.toneMapping)&&(l.material.needsUpdate=!0,h=M,f=M.version,d=r.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null))}function p(y,b){y.getRGB(xc,Vg(r)),n.buffers.color.setClear(xc.r,xc.g,xc.b,b,a)}function v(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(y,b=1){o.set(y),c=b,p(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(y){c=y,p(o,c)},render:_,addToRenderList:m,dispose:v}}function mM(r,e){const t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=f(null);let s=i,a=!1;function o(S,C,I,U,z){let W=!1;const V=h(U,I,C);s!==V&&(s=V,l(s.object)),W=d(S,U,I,z),W&&g(S,U,I,z),z!==null&&e.update(z,r.ELEMENT_ARRAY_BUFFER),(W||a)&&(a=!1,b(S,C,I,U),z!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(z).buffer))}function c(){return r.createVertexArray()}function l(S){return r.bindVertexArray(S)}function u(S){return r.deleteVertexArray(S)}function h(S,C,I){const U=I.wireframe===!0;let z=n[S.id];z===void 0&&(z={},n[S.id]=z);let W=z[C.id];W===void 0&&(W={},z[C.id]=W);let V=W[U];return V===void 0&&(V=f(c()),W[U]=V),V}function f(S){const C=[],I=[],U=[];for(let z=0;z<t;z++)C[z]=0,I[z]=0,U[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:I,attributeDivisors:U,object:S,attributes:{},index:null}}function d(S,C,I,U){const z=s.attributes,W=C.attributes;let V=0;const j=I.getAttributes();for(const H in j)if(j[H].location>=0){const L=z[H];let K=W[H];if(K===void 0&&(H==="instanceMatrix"&&S.instanceMatrix&&(K=S.instanceMatrix),H==="instanceColor"&&S.instanceColor&&(K=S.instanceColor)),L===void 0||L.attribute!==K||K&&L.data!==K.data)return!0;V++}return s.attributesNum!==V||s.index!==U}function g(S,C,I,U){const z={},W=C.attributes;let V=0;const j=I.getAttributes();for(const H in j)if(j[H].location>=0){let L=W[H];L===void 0&&(H==="instanceMatrix"&&S.instanceMatrix&&(L=S.instanceMatrix),H==="instanceColor"&&S.instanceColor&&(L=S.instanceColor));const K={};K.attribute=L,L&&L.data&&(K.data=L.data),z[H]=K,V++}s.attributes=z,s.attributesNum=V,s.index=U}function _(){const S=s.newAttributes;for(let C=0,I=S.length;C<I;C++)S[C]=0}function m(S){p(S,0)}function p(S,C){const I=s.newAttributes,U=s.enabledAttributes,z=s.attributeDivisors;I[S]=1,U[S]===0&&(r.enableVertexAttribArray(S),U[S]=1),z[S]!==C&&(r.vertexAttribDivisor(S,C),z[S]=C)}function v(){const S=s.newAttributes,C=s.enabledAttributes;for(let I=0,U=C.length;I<U;I++)C[I]!==S[I]&&(r.disableVertexAttribArray(I),C[I]=0)}function y(S,C,I,U,z,W,V){V===!0?r.vertexAttribIPointer(S,C,I,z,W):r.vertexAttribPointer(S,C,I,U,z,W)}function b(S,C,I,U){_();const z=U.attributes,W=I.getAttributes(),V=C.defaultAttributeValues;for(const j in W){const H=W[j];if(H.location>=0){let te=z[j];if(te===void 0&&(j==="instanceMatrix"&&S.instanceMatrix&&(te=S.instanceMatrix),j==="instanceColor"&&S.instanceColor&&(te=S.instanceColor)),te!==void 0){const L=te.normalized,K=te.itemSize,le=e.get(te);if(le===void 0)continue;const _e=le.buffer,de=le.type,ye=le.bytesPerElement,q=de===r.INT||de===r.UNSIGNED_INT||te.gpuType===pf;if(te.isInterleavedBufferAttribute){const J=te.data,ce=J.stride,Te=te.offset;if(J.isInstancedInterleavedBuffer){for(let pe=0;pe<H.locationSize;pe++)p(H.location+pe,J.meshPerAttribute);S.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let pe=0;pe<H.locationSize;pe++)m(H.location+pe);r.bindBuffer(r.ARRAY_BUFFER,_e);for(let pe=0;pe<H.locationSize;pe++)y(H.location+pe,K/H.locationSize,de,L,ce*ye,(Te+K/H.locationSize*pe)*ye,q)}else{if(te.isInstancedBufferAttribute){for(let J=0;J<H.locationSize;J++)p(H.location+J,te.meshPerAttribute);S.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=te.meshPerAttribute*te.count)}else for(let J=0;J<H.locationSize;J++)m(H.location+J);r.bindBuffer(r.ARRAY_BUFFER,_e);for(let J=0;J<H.locationSize;J++)y(H.location+J,K/H.locationSize,de,L,K*ye,K/H.locationSize*J*ye,q)}}else if(V!==void 0){const L=V[j];if(L!==void 0)switch(L.length){case 2:r.vertexAttrib2fv(H.location,L);break;case 3:r.vertexAttrib3fv(H.location,L);break;case 4:r.vertexAttrib4fv(H.location,L);break;default:r.vertexAttrib1fv(H.location,L)}}}}v()}function M(){R();for(const S in n){const C=n[S];for(const I in C){const U=C[I];for(const z in U)u(U[z].object),delete U[z];delete C[I]}delete n[S]}}function E(S){if(n[S.id]===void 0)return;const C=n[S.id];for(const I in C){const U=C[I];for(const z in U)u(U[z].object),delete U[z];delete C[I]}delete n[S.id]}function T(S){for(const C in n){const I=n[C];if(I[S.id]===void 0)continue;const U=I[S.id];for(const z in U)u(U[z].object),delete U[z];delete I[S.id]}}function R(){x(),a=!0,s!==i&&(s=i,l(s.object))}function x(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:R,resetDefaultState:x,dispose:M,releaseStatesOfGeometry:E,releaseStatesOfProgram:T,initAttributes:_,enableAttribute:m,disableUnusedAttributes:v}}function gM(r,e,t){let n;function i(l){n=l}function s(l,u){r.drawArrays(n,l,u),t.update(u,n,1)}function a(l,u,h){h!==0&&(r.drawArraysInstanced(n,l,u,h),t.update(u,n,h))}function o(l,u,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,u,0,h);let d=0;for(let g=0;g<h;g++)d+=u[g];t.update(d,n,1)}function c(l,u,h,f){if(h===0)return;const d=e.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<l.length;g++)a(l[g],u[g],f[g]);else{d.multiDrawArraysInstancedWEBGL(n,l,0,u,0,f,0,h);let g=0;for(let _=0;_<h;_++)g+=u[_]*f[_];t.update(g,n,1)}}this.setMode=i,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function _M(r,e,t,n){let i;function s(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const T=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(T){return!(T!==_i&&n.convert(T)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(T){const R=T===Do&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(T!==zi&&n.convert(T)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==Ei&&!R)}function c(T){if(T==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const u=c(l);u!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const h=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),d=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),g=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=r.getParameter(r.MAX_TEXTURE_SIZE),m=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),p=r.getParameter(r.MAX_VERTEX_ATTRIBS),v=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),y=r.getParameter(r.MAX_VARYING_VECTORS),b=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),M=g>0,E=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:h,reversedDepthBuffer:f,maxTextures:d,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,vertexTextures:M,maxSamples:E}}function bM(r){const e=this;let t=null,n=0,i=!1,s=!1;const a=new Zr,o=new Ze,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const d=h.length!==0||f||n!==0||i;return i=f,n=h.length,d},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,f){t=u(h,f,0)},this.setState=function(h,f,d){const g=h.clippingPlanes,_=h.clipIntersection,m=h.clipShadows,p=r.get(h);if(!i||g===null||g.length===0||s&&!m)s?u(null):l();else{const v=s?0:n,y=v*4;let b=p.clippingState||null;c.value=b,b=u(g,f,y,d);for(let M=0;M!==y;++M)b[M]=t[M];p.clippingState=b,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=v}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,f,d,g){const _=h!==null?h.length:0;let m=null;if(_!==0){if(m=c.value,g!==!0||m===null){const p=d+_*4,v=f.matrixWorldInverse;o.getNormalMatrix(v),(m===null||m.length<p)&&(m=new Float32Array(p));for(let y=0,b=d;y!==_;++y,b+=4)a.copy(h[y]).applyMatrix4(v,o),a.normal.toArray(m,b),m[b+3]=a.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function vM(r){let e=new WeakMap;function t(a,o){return o===Qu?a.mapping=ha:o===eh&&(a.mapping=fa),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===Qu||o===eh)if(e.has(a)){const c=e.get(a).texture;return t(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const l=new Bv(c.height);return l.fromEquirectangularTexture(r,a),e.set(a,l),a.addEventListener("dispose",i),t(l.texture,a.mapping)}else return null}}return a}function i(a){const o=a.target;o.removeEventListener("dispose",i);const c=e.get(o);c!==void 0&&(e.delete(o),c.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}const js=4,xp=[.125,.215,.35,.446,.526,.582],is=20,uu=new Df,yp=new qe;let hu=null,fu=0,du=0,pu=!1;const Qr=(1+Math.sqrt(5))/2,zs=1/Qr,Sp=[new k(-Qr,zs,0),new k(Qr,zs,0),new k(-zs,0,Qr),new k(zs,0,Qr),new k(0,Qr,-zs),new k(0,Qr,zs),new k(-1,1,-1),new k(1,1,-1),new k(-1,1,1),new k(1,1,1)],xM=new k;class Mp{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100,s={}){const{size:a=256,position:o=xM}=s;hu=this._renderer.getRenderTarget(),fu=this._renderer.getActiveCubeFace(),du=this._renderer.getActiveMipmapLevel(),pu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,i,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=wp(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ep(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(hu,fu,du),this._renderer.xr.enabled=pu,e.scissorTest=!1,yc(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ha||e.mapping===fa?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),hu=this._renderer.getRenderTarget(),fu=this._renderer.getActiveCubeFace(),du=this._renderer.getActiveMipmapLevel(),pu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:ni,minFilter:ni,generateMipmaps:!1,type:Do,format:_i,colorSpace:Pn,depthBuffer:!1},i=Tp(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Tp(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=yM(s)),this._blurMaterial=SM(s,e,t)}return i}_compileMaterial(e){const t=new un(this._lodPlanes[0],e);this._renderer.compile(t,uu)}_sceneToCubeUV(e,t,n,i,s){const c=new In(90,1,t,n),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],h=this._renderer,f=h.autoClear,d=h.toneMapping;h.getClearColor(yp),h.toneMapping=Lr,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(i),h.clearDepth(),h.setRenderTarget(null));const _=new tr({name:"PMREM.Background",side:Hn,depthWrite:!1,depthTest:!1}),m=new un(new Lo,_);let p=!1;const v=e.background;v?v.isColor&&(_.color.copy(v),e.background=null,p=!0):(_.color.copy(yp),p=!0);for(let y=0;y<6;y++){const b=y%3;b===0?(c.up.set(0,l[y],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x+u[y],s.y,s.z)):b===1?(c.up.set(0,0,l[y]),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y+u[y],s.z)):(c.up.set(0,l[y],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y,s.z+u[y]));const M=this._cubeSize;yc(i,b*M,y>2?M:0,M,M),h.setRenderTarget(i),p&&h.render(m,c),h.render(e,c)}m.geometry.dispose(),m.material.dispose(),h.toneMapping=d,h.autoClear=f,e.background=v}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===ha||e.mapping===fa;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=wp()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ep());const s=i?this._cubemapMaterial:this._equirectMaterial,a=new un(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=e;const c=this._cubeSize;yc(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(a,uu)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodPlanes.length;for(let s=1;s<i;s++){const a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=Sp[(i-s-1)%Sp.length];this._blur(e,s-1,s,a,o)}t.autoClear=n}_blur(e,t,n,i,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,i,"latitudinal",s),this._halfBlur(a,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new un(this._lodPlanes[i],l),f=l.uniforms,d=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*d):2*Math.PI/(2*is-1),_=s/g,m=isFinite(s)?1+Math.floor(u*_):is;m>is&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${is}`);const p=[];let v=0;for(let T=0;T<is;++T){const R=T/_,x=Math.exp(-R*R/2);p.push(x),T===0?v+=x:T<m&&(v+=2*x)}for(let T=0;T<p.length;T++)p[T]=p[T]/v;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:y}=this;f.dTheta.value=g,f.mipInt.value=y-n;const b=this._sizeLods[i],M=3*b*(i>y-js?i-y+js:0),E=4*(this._cubeSize-b);yc(t,M,E,3*b,2*b),c.setRenderTarget(t),c.render(h,uu)}}function yM(r){const e=[],t=[],n=[];let i=r;const s=r-js+1+xp.length;for(let a=0;a<s;a++){const o=Math.pow(2,i);t.push(o);let c=1/o;a>r-js?c=xp[a-r+js-1]:a===0&&(c=0),n.push(c);const l=1/(o-2),u=-l,h=1+l,f=[u,u,h,u,h,h,u,u,h,h,u,h],d=6,g=6,_=3,m=2,p=1,v=new Float32Array(_*g*d),y=new Float32Array(m*g*d),b=new Float32Array(p*g*d);for(let E=0;E<d;E++){const T=E%3*2/3-1,R=E>2?0:-1,x=[T,R,0,T+2/3,R,0,T+2/3,R+1,0,T,R,0,T+2/3,R+1,0,T,R+1,0];v.set(x,_*g*E),y.set(f,m*g*E);const S=[E,E,E,E,E,E];b.set(S,p*g*E)}const M=new Zt;M.setAttribute("position",new Yt(v,_)),M.setAttribute("uv",new Yt(y,m)),M.setAttribute("faceIndex",new Yt(b,p)),e.push(M),i>js&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Tp(r,e,t){const n=new _s(r,e,t);return n.texture.mapping=pl,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function yc(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function SM(r,e,t){const n=new Float32Array(is),i=new k(0,1,0);return new lr({name:"SphericalGaussianBlur",defines:{n:is,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Nf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Dr,depthTest:!1,depthWrite:!1})}function Ep(){return new lr({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Nf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Dr,depthTest:!1,depthWrite:!1})}function wp(){return new lr({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Nf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Dr,depthTest:!1,depthWrite:!1})}function Nf(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function MM(r){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const c=o.mapping,l=c===Qu||c===eh,u=c===ha||c===fa;if(l||u){let h=e.get(o);const f=h!==void 0?h.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==f)return t===null&&(t=new Mp(r)),h=l?t.fromEquirectangular(o,h):t.fromCubemap(o,h),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),h.texture;if(h!==void 0)return h.texture;{const d=o.image;return l&&d&&d.height>0||u&&d&&i(d)?(t===null&&(t=new Mp(r)),h=l?t.fromEquirectangular(o):t.fromCubemap(o),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),o.addEventListener("dispose",s),h.texture):null}}}return o}function i(o){let c=0;const l=6;for(let u=0;u<l;u++)o[u]!==void 0&&c++;return c===l}function s(o){const c=o.target;c.removeEventListener("dispose",s);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function TM(r){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&Co("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function EM(r,e,t,n){const i={},s=new WeakMap;function a(h){const f=h.target;f.index!==null&&e.remove(f.index);for(const g in f.attributes)e.remove(f.attributes[g]);f.removeEventListener("dispose",a),delete i[f.id];const d=s.get(f);d&&(e.remove(d),s.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function o(h,f){return i[f.id]===!0||(f.addEventListener("dispose",a),i[f.id]=!0,t.memory.geometries++),f}function c(h){const f=h.attributes;for(const d in f)e.update(f[d],r.ARRAY_BUFFER)}function l(h){const f=[],d=h.index,g=h.attributes.position;let _=0;if(d!==null){const v=d.array;_=d.version;for(let y=0,b=v.length;y<b;y+=3){const M=v[y+0],E=v[y+1],T=v[y+2];f.push(M,E,E,T,T,M)}}else if(g!==void 0){const v=g.array;_=g.version;for(let y=0,b=v.length/3-1;y<b;y+=3){const M=y+0,E=y+1,T=y+2;f.push(M,E,E,T,T,M)}}else return;const m=new(Og(f)?Gg:Hg)(f,1);m.version=_;const p=s.get(h);p&&e.remove(p),s.set(h,m)}function u(h){const f=s.get(h);if(f){const d=h.index;d!==null&&f.version<d.version&&l(h)}else l(h);return s.get(h)}return{get:o,update:c,getWireframeAttribute:u}}function wM(r,e,t){let n;function i(f){n=f}let s,a;function o(f){s=f.type,a=f.bytesPerElement}function c(f,d){r.drawElements(n,d,s,f*a),t.update(d,n,1)}function l(f,d,g){g!==0&&(r.drawElementsInstanced(n,d,s,f*a,g),t.update(d,n,g))}function u(f,d,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,s,f,0,g);let m=0;for(let p=0;p<g;p++)m+=d[p];t.update(m,n,1)}function h(f,d,g,_){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<f.length;p++)l(f[p]/a,d[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(n,d,0,s,f,0,_,0,g);let p=0;for(let v=0;v<g;v++)p+=d[v]*_[v];t.update(p,n,1)}}this.setMode=i,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function AM(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(t.calls++,a){case r.TRIANGLES:t.triangles+=o*(s/3);break;case r.LINES:t.lines+=o*(s/2);break;case r.LINE_STRIP:t.lines+=o*(s-1);break;case r.LINE_LOOP:t.lines+=o*s;break;case r.POINTS:t.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function RM(r,e,t){const n=new WeakMap,i=new gt;function s(a,o,c){const l=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=u!==void 0?u.length:0;let f=n.get(o);if(f===void 0||f.count!==h){let x=function(){T.dispose(),n.delete(o),o.removeEventListener("dispose",x)};f!==void 0&&f.texture.dispose();const d=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],v=o.morphAttributes.color||[];let y=0;d===!0&&(y=1),g===!0&&(y=2),_===!0&&(y=3);let b=o.attributes.position.count*y,M=1;b>e.maxTextureSize&&(M=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);const E=new Float32Array(b*M*4*h),T=new kg(E,b,M,h);T.type=Ei,T.needsUpdate=!0;const R=y*4;for(let S=0;S<h;S++){const C=m[S],I=p[S],U=v[S],z=b*M*4*S;for(let W=0;W<C.count;W++){const V=W*R;d===!0&&(i.fromBufferAttribute(C,W),E[z+V+0]=i.x,E[z+V+1]=i.y,E[z+V+2]=i.z,E[z+V+3]=0),g===!0&&(i.fromBufferAttribute(I,W),E[z+V+4]=i.x,E[z+V+5]=i.y,E[z+V+6]=i.z,E[z+V+7]=0),_===!0&&(i.fromBufferAttribute(U,W),E[z+V+8]=i.x,E[z+V+9]=i.y,E[z+V+10]=i.z,E[z+V+11]=U.itemSize===4?i.w:1)}}f={count:h,texture:T,size:new lt(b,M)},n.set(o,f),o.addEventListener("dispose",x)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(r,"morphTexture",a.morphTexture,t);else{let d=0;for(let _=0;_<l.length;_++)d+=l[_];const g=o.morphTargetsRelative?1:1-d;c.getUniforms().setValue(r,"morphTargetBaseInfluence",g),c.getUniforms().setValue(r,"morphTargetInfluences",l)}c.getUniforms().setValue(r,"morphTargetsTexture",f.texture,t),c.getUniforms().setValue(r,"morphTargetsTextureSize",f.size)}return{update:s}}function CM(r,e,t,n){let i=new WeakMap;function s(c){const l=n.render.frame,u=c.geometry,h=e.get(c,u);if(i.get(h)!==l&&(e.update(h),i.set(h,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),i.get(c)!==l&&(t.update(c.instanceMatrix,r.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,r.ARRAY_BUFFER),i.set(c,l))),c.isSkinnedMesh){const f=c.skeleton;i.get(f)!==l&&(f.update(),i.set(f,l))}return h}function a(){i=new WeakMap}function o(c){const l=c.target;l.removeEventListener("dispose",o),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:s,dispose:a}}const i_=new Qt,Ap=new Yg(1,1),r_=new kg,s_=new Sv,a_=new Xg,Rp=[],Cp=[],Pp=new Float32Array(16),Dp=new Float32Array(9),Lp=new Float32Array(4);function Ta(r,e,t){const n=r[0];if(n<=0||n>0)return r;const i=e*t;let s=Rp[i];if(s===void 0&&(s=new Float32Array(i),Rp[i]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,r[a].toArray(s,o)}return s}function tn(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function nn(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function _l(r,e){let t=Cp[e];t===void 0&&(t=new Int32Array(e),Cp[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function PM(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function DM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(tn(t,e))return;r.uniform2fv(this.addr,e),nn(t,e)}}function LM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(tn(t,e))return;r.uniform3fv(this.addr,e),nn(t,e)}}function IM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(tn(t,e))return;r.uniform4fv(this.addr,e),nn(t,e)}}function NM(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(tn(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),nn(t,e)}else{if(tn(t,n))return;Lp.set(n),r.uniformMatrix2fv(this.addr,!1,Lp),nn(t,n)}}function UM(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(tn(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),nn(t,e)}else{if(tn(t,n))return;Dp.set(n),r.uniformMatrix3fv(this.addr,!1,Dp),nn(t,n)}}function FM(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(tn(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),nn(t,e)}else{if(tn(t,n))return;Pp.set(n),r.uniformMatrix4fv(this.addr,!1,Pp),nn(t,n)}}function OM(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function kM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(tn(t,e))return;r.uniform2iv(this.addr,e),nn(t,e)}}function BM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(tn(t,e))return;r.uniform3iv(this.addr,e),nn(t,e)}}function zM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(tn(t,e))return;r.uniform4iv(this.addr,e),nn(t,e)}}function HM(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function GM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(tn(t,e))return;r.uniform2uiv(this.addr,e),nn(t,e)}}function VM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(tn(t,e))return;r.uniform3uiv(this.addr,e),nn(t,e)}}function WM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(tn(t,e))return;r.uniform4uiv(this.addr,e),nn(t,e)}}function XM(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?(Ap.compareFunction=Fg,s=Ap):s=i_,t.setTexture2D(e||s,i)}function jM(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||s_,i)}function qM(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||a_,i)}function YM(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||r_,i)}function KM(r){switch(r){case 5126:return PM;case 35664:return DM;case 35665:return LM;case 35666:return IM;case 35674:return NM;case 35675:return UM;case 35676:return FM;case 5124:case 35670:return OM;case 35667:case 35671:return kM;case 35668:case 35672:return BM;case 35669:case 35673:return zM;case 5125:return HM;case 36294:return GM;case 36295:return VM;case 36296:return WM;case 35678:case 36198:case 36298:case 36306:case 35682:return XM;case 35679:case 36299:case 36307:return jM;case 35680:case 36300:case 36308:case 36293:return qM;case 36289:case 36303:case 36311:case 36292:return YM}}function $M(r,e){r.uniform1fv(this.addr,e)}function JM(r,e){const t=Ta(e,this.size,2);r.uniform2fv(this.addr,t)}function ZM(r,e){const t=Ta(e,this.size,3);r.uniform3fv(this.addr,t)}function QM(r,e){const t=Ta(e,this.size,4);r.uniform4fv(this.addr,t)}function eT(r,e){const t=Ta(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function tT(r,e){const t=Ta(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function nT(r,e){const t=Ta(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function iT(r,e){r.uniform1iv(this.addr,e)}function rT(r,e){r.uniform2iv(this.addr,e)}function sT(r,e){r.uniform3iv(this.addr,e)}function aT(r,e){r.uniform4iv(this.addr,e)}function oT(r,e){r.uniform1uiv(this.addr,e)}function cT(r,e){r.uniform2uiv(this.addr,e)}function lT(r,e){r.uniform3uiv(this.addr,e)}function uT(r,e){r.uniform4uiv(this.addr,e)}function hT(r,e,t){const n=this.cache,i=e.length,s=_l(t,i);tn(n,s)||(r.uniform1iv(this.addr,s),nn(n,s));for(let a=0;a!==i;++a)t.setTexture2D(e[a]||i_,s[a])}function fT(r,e,t){const n=this.cache,i=e.length,s=_l(t,i);tn(n,s)||(r.uniform1iv(this.addr,s),nn(n,s));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||s_,s[a])}function dT(r,e,t){const n=this.cache,i=e.length,s=_l(t,i);tn(n,s)||(r.uniform1iv(this.addr,s),nn(n,s));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||a_,s[a])}function pT(r,e,t){const n=this.cache,i=e.length,s=_l(t,i);tn(n,s)||(r.uniform1iv(this.addr,s),nn(n,s));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||r_,s[a])}function mT(r){switch(r){case 5126:return $M;case 35664:return JM;case 35665:return ZM;case 35666:return QM;case 35674:return eT;case 35675:return tT;case 35676:return nT;case 5124:case 35670:return iT;case 35667:case 35671:return rT;case 35668:case 35672:return sT;case 35669:case 35673:return aT;case 5125:return oT;case 36294:return cT;case 36295:return lT;case 36296:return uT;case 35678:case 36198:case 36298:case 36306:case 35682:return hT;case 35679:case 36299:case 36307:return fT;case 35680:case 36300:case 36308:case 36293:return dT;case 36289:case 36303:case 36311:case 36292:return pT}}class gT{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=KM(t.type)}}class _T{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=mT(t.type)}}class bT{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let s=0,a=i.length;s!==a;++s){const o=i[s];o.setValue(e,t[o.id],n)}}}const mu=/(\w+)(\])?(\[|\.)?/g;function Ip(r,e){r.seq.push(e),r.map[e.id]=e}function vT(r,e,t){const n=r.name,i=n.length;for(mu.lastIndex=0;;){const s=mu.exec(n),a=mu.lastIndex;let o=s[1];const c=s[2]==="]",l=s[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===i){Ip(t,l===void 0?new gT(o,r,e):new _T(o,r,e));break}else{let h=t.map[o];h===void 0&&(h=new bT(o),Ip(t,h)),t=h}}}class Gc{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const s=e.getActiveUniform(t,i),a=e.getUniformLocation(t,s.name);vT(s,a,this)}}setValue(e,t,n,i){const s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,a=t.length;s!==a;++s){const o=t[s],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,s=e.length;i!==s;++i){const a=e[i];a.id in t&&n.push(a)}return n}}function Np(r,e,t){const n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}const xT=37297;let yT=0;function ST(r,e){const t=r.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=i;a<s;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const Up=new Ze;function MT(r){ft._getMatrix(Up,ft.workingColorSpace,r);const e=`mat3( ${Up.elements.map(t=>t.toFixed(4))} )`;switch(ft.getTransfer(r)){case sl:return[e,"LinearTransferOETF"];case St:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",r),[e,"LinearTransferOETF"]}}function Fp(r,e,t){const n=r.getShaderParameter(e,r.COMPILE_STATUS),s=(r.getShaderInfoLog(e)||"").trim();if(n&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+ST(r.getShaderSource(e),o)}else return s}function TT(r,e){const t=MT(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function ET(r,e){let t;switch(e){case L0:t="Linear";break;case I0:t="Reinhard";break;case N0:t="Cineon";break;case U0:t="ACESFilmic";break;case O0:t="AgX";break;case k0:t="Neutral";break;case F0:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Sc=new k;function wT(){ft.getLuminanceCoefficients(Sc);const r=Sc.x.toFixed(4),e=Sc.y.toFixed(4),t=Sc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function AT(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ka).join(`
`)}function RT(r){const e=[];for(const t in r){const n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function CT(r,e){const t={},n=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(e,i),a=s.name;let o=1;s.type===r.FLOAT_MAT2&&(o=2),s.type===r.FLOAT_MAT3&&(o=3),s.type===r.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:r.getAttribLocation(e,a),locationSize:o}}return t}function Ka(r){return r!==""}function Op(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function kp(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const PT=/^[ \t]*#include +<([\w\d./]+)>/gm;function Uh(r){return r.replace(PT,LT)}const DT=new Map;function LT(r,e){let t=et[e];if(t===void 0){const n=DT.get(e);if(n!==void 0)t=et[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Uh(t)}const IT=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Bp(r){return r.replace(IT,NT)}function NT(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function zp(r){let e=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?e+=`
#define HIGH_PRECISION`:r.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function UT(r){let e="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===Mg?e="SHADOWMAP_TYPE_PCF":r.shadowMapType===h0?e="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===Ki&&(e="SHADOWMAP_TYPE_VSM"),e}function FT(r){let e="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case ha:case fa:e="ENVMAP_TYPE_CUBE";break;case pl:e="ENVMAP_TYPE_CUBE_UV";break}return e}function OT(r){let e="ENVMAP_MODE_REFLECTION";return r.envMap&&r.envMapMode===fa&&(e="ENVMAP_MODE_REFRACTION"),e}function kT(r){let e="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case Tg:e="ENVMAP_BLENDING_MULTIPLY";break;case P0:e="ENVMAP_BLENDING_MIX";break;case D0:e="ENVMAP_BLENDING_ADD";break}return e}function BT(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function zT(r,e,t,n){const i=r.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=UT(t),l=FT(t),u=OT(t),h=kT(t),f=BT(t),d=AT(t),g=RT(s),_=i.createProgram();let m,p,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Ka).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Ka).join(`
`),p.length>0&&(p+=`
`)):(m=[zp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ka).join(`
`),p=[zp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Lr?"#define TONE_MAPPING":"",t.toneMapping!==Lr?et.tonemapping_pars_fragment:"",t.toneMapping!==Lr?ET("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",et.colorspace_pars_fragment,TT("linearToOutputTexel",t.outputColorSpace),wT(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ka).join(`
`)),a=Uh(a),a=Op(a,t),a=kp(a,t),o=Uh(o),o=Op(o,t),o=kp(o,t),a=Bp(a),o=Bp(o),t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===Fd?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Fd?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const y=v+m+a,b=v+p+o,M=Np(i,i.VERTEX_SHADER,y),E=Np(i,i.FRAGMENT_SHADER,b);i.attachShader(_,M),i.attachShader(_,E),t.index0AttributeName!==void 0?i.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function T(C){if(r.debug.checkShaderErrors){const I=i.getProgramInfoLog(_)||"",U=i.getShaderInfoLog(M)||"",z=i.getShaderInfoLog(E)||"",W=I.trim(),V=U.trim(),j=z.trim();let H=!0,te=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(H=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,_,M,E);else{const L=Fp(i,M,"vertex"),K=Fp(i,E,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+W+`
`+L+`
`+K)}else W!==""?console.warn("THREE.WebGLProgram: Program Info Log:",W):(V===""||j==="")&&(te=!1);te&&(C.diagnostics={runnable:H,programLog:W,vertexShader:{log:V,prefix:m},fragmentShader:{log:j,prefix:p}})}i.deleteShader(M),i.deleteShader(E),R=new Gc(i,_),x=CT(i,_)}let R;this.getUniforms=function(){return R===void 0&&T(this),R};let x;this.getAttributes=function(){return x===void 0&&T(this),x};let S=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=i.getProgramParameter(_,xT)),S},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=yT++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=M,this.fragmentShader=E,this}let HT=0;class GT{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new VT(e),t.set(e,n)),n}}class VT{constructor(e){this.id=HT++,this.code=e,this.usedTimes=0}}function WT(r,e,t,n,i,s,a){const o=new Bg,c=new GT,l=new Set,u=[],h=i.logarithmicDepthBuffer,f=i.vertexTextures;let d=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(x){return l.add(x),x===0?"uv":`uv${x}`}function m(x,S,C,I,U){const z=I.fog,W=U.geometry,V=x.isMeshStandardMaterial?I.environment:null,j=(x.isMeshStandardMaterial?t:e).get(x.envMap||V),H=j&&j.mapping===pl?j.image.height:null,te=g[x.type];x.precision!==null&&(d=i.getMaxPrecision(x.precision),d!==x.precision&&console.warn("THREE.WebGLProgram.getParameters:",x.precision,"not supported, using",d,"instead."));const L=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,K=L!==void 0?L.length:0;let le=0;W.morphAttributes.position!==void 0&&(le=1),W.morphAttributes.normal!==void 0&&(le=2),W.morphAttributes.color!==void 0&&(le=3);let _e,de,ye,q;if(te){const xe=Li[te];_e=xe.vertexShader,de=xe.fragmentShader}else _e=x.vertexShader,de=x.fragmentShader,c.update(x),ye=c.getVertexShaderID(x),q=c.getFragmentShaderID(x);const J=r.getRenderTarget(),ce=r.state.buffers.depth.getReversed(),Te=U.isInstancedMesh===!0,pe=U.isBatchedMesh===!0,Be=!!x.map,ut=!!x.matcap,D=!!j,Xe=!!x.aoMap,Ue=!!x.lightMap,De=!!x.bumpMap,F=!!x.normalMap,st=!!x.displacementMap,Se=!!x.emissiveMap,Ve=!!x.metalnessMap,$e=!!x.roughnessMap,mt=x.anisotropy>0,P=x.clearcoat>0,w=x.dispersion>0,G=x.iridescence>0,Z=x.sheen>0,Q=x.transmission>0,$=mt&&!!x.anisotropyMap,Me=P&&!!x.clearcoatMap,ae=P&&!!x.clearcoatNormalMap,Ce=P&&!!x.clearcoatRoughnessMap,me=G&&!!x.iridescenceMap,se=G&&!!x.iridescenceThicknessMap,fe=Z&&!!x.sheenColorMap,Oe=Z&&!!x.sheenRoughnessMap,Pe=!!x.specularMap,he=!!x.specularColorMap,We=!!x.specularIntensityMap,N=Q&&!!x.transmissionMap,re=Q&&!!x.thicknessMap,oe=!!x.gradientMap,be=!!x.alphaMap,ie=x.alphaTest>0,ee=!!x.alphaHash,we=!!x.extensions;let ze=Lr;x.toneMapped&&(J===null||J.isXRRenderTarget===!0)&&(ze=r.toneMapping);const dt={shaderID:te,shaderType:x.type,shaderName:x.name,vertexShader:_e,fragmentShader:de,defines:x.defines,customVertexShaderID:ye,customFragmentShaderID:q,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:d,batching:pe,batchingColor:pe&&U._colorsTexture!==null,instancing:Te,instancingColor:Te&&U.instanceColor!==null,instancingMorph:Te&&U.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:J===null?r.outputColorSpace:J.isXRRenderTarget===!0?J.texture.colorSpace:Pn,alphaToCoverage:!!x.alphaToCoverage,map:Be,matcap:ut,envMap:D,envMapMode:D&&j.mapping,envMapCubeUVHeight:H,aoMap:Xe,lightMap:Ue,bumpMap:De,normalMap:F,displacementMap:f&&st,emissiveMap:Se,normalMapObjectSpace:F&&x.normalMapType===W0,normalMapTangentSpace:F&&x.normalMapType===Ug,metalnessMap:Ve,roughnessMap:$e,anisotropy:mt,anisotropyMap:$,clearcoat:P,clearcoatMap:Me,clearcoatNormalMap:ae,clearcoatRoughnessMap:Ce,dispersion:w,iridescence:G,iridescenceMap:me,iridescenceThicknessMap:se,sheen:Z,sheenColorMap:fe,sheenRoughnessMap:Oe,specularMap:Pe,specularColorMap:he,specularIntensityMap:We,transmission:Q,transmissionMap:N,thicknessMap:re,gradientMap:oe,opaque:x.transparent===!1&&x.blending===ea&&x.alphaToCoverage===!1,alphaMap:be,alphaTest:ie,alphaHash:ee,combine:x.combine,mapUv:Be&&_(x.map.channel),aoMapUv:Xe&&_(x.aoMap.channel),lightMapUv:Ue&&_(x.lightMap.channel),bumpMapUv:De&&_(x.bumpMap.channel),normalMapUv:F&&_(x.normalMap.channel),displacementMapUv:st&&_(x.displacementMap.channel),emissiveMapUv:Se&&_(x.emissiveMap.channel),metalnessMapUv:Ve&&_(x.metalnessMap.channel),roughnessMapUv:$e&&_(x.roughnessMap.channel),anisotropyMapUv:$&&_(x.anisotropyMap.channel),clearcoatMapUv:Me&&_(x.clearcoatMap.channel),clearcoatNormalMapUv:ae&&_(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ce&&_(x.clearcoatRoughnessMap.channel),iridescenceMapUv:me&&_(x.iridescenceMap.channel),iridescenceThicknessMapUv:se&&_(x.iridescenceThicknessMap.channel),sheenColorMapUv:fe&&_(x.sheenColorMap.channel),sheenRoughnessMapUv:Oe&&_(x.sheenRoughnessMap.channel),specularMapUv:Pe&&_(x.specularMap.channel),specularColorMapUv:he&&_(x.specularColorMap.channel),specularIntensityMapUv:We&&_(x.specularIntensityMap.channel),transmissionMapUv:N&&_(x.transmissionMap.channel),thicknessMapUv:re&&_(x.thicknessMap.channel),alphaMapUv:be&&_(x.alphaMap.channel),vertexTangents:!!W.attributes.tangent&&(F||mt),vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,pointsUvs:U.isPoints===!0&&!!W.attributes.uv&&(Be||be),fog:!!z,useFog:x.fog===!0,fogExp2:!!z&&z.isFogExp2,flatShading:x.flatShading===!0&&x.wireframe===!1,sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:ce,skinning:U.isSkinnedMesh===!0,morphTargets:W.morphAttributes.position!==void 0,morphNormals:W.morphAttributes.normal!==void 0,morphColors:W.morphAttributes.color!==void 0,morphTargetsCount:K,morphTextureStride:le,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:x.dithering,shadowMapEnabled:r.shadowMap.enabled&&C.length>0,shadowMapType:r.shadowMap.type,toneMapping:ze,decodeVideoTexture:Be&&x.map.isVideoTexture===!0&&ft.getTransfer(x.map.colorSpace)===St,decodeVideoTextureEmissive:Se&&x.emissiveMap.isVideoTexture===!0&&ft.getTransfer(x.emissiveMap.colorSpace)===St,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Fn,flipSided:x.side===Hn,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:we&&x.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(we&&x.extensions.multiDraw===!0||pe)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return dt.vertexUv1s=l.has(1),dt.vertexUv2s=l.has(2),dt.vertexUv3s=l.has(3),l.clear(),dt}function p(x){const S=[];if(x.shaderID?S.push(x.shaderID):(S.push(x.customVertexShaderID),S.push(x.customFragmentShaderID)),x.defines!==void 0)for(const C in x.defines)S.push(C),S.push(x.defines[C]);return x.isRawShaderMaterial===!1&&(v(S,x),y(S,x),S.push(r.outputColorSpace)),S.push(x.customProgramCacheKey),S.join()}function v(x,S){x.push(S.precision),x.push(S.outputColorSpace),x.push(S.envMapMode),x.push(S.envMapCubeUVHeight),x.push(S.mapUv),x.push(S.alphaMapUv),x.push(S.lightMapUv),x.push(S.aoMapUv),x.push(S.bumpMapUv),x.push(S.normalMapUv),x.push(S.displacementMapUv),x.push(S.emissiveMapUv),x.push(S.metalnessMapUv),x.push(S.roughnessMapUv),x.push(S.anisotropyMapUv),x.push(S.clearcoatMapUv),x.push(S.clearcoatNormalMapUv),x.push(S.clearcoatRoughnessMapUv),x.push(S.iridescenceMapUv),x.push(S.iridescenceThicknessMapUv),x.push(S.sheenColorMapUv),x.push(S.sheenRoughnessMapUv),x.push(S.specularMapUv),x.push(S.specularColorMapUv),x.push(S.specularIntensityMapUv),x.push(S.transmissionMapUv),x.push(S.thicknessMapUv),x.push(S.combine),x.push(S.fogExp2),x.push(S.sizeAttenuation),x.push(S.morphTargetsCount),x.push(S.morphAttributeCount),x.push(S.numDirLights),x.push(S.numPointLights),x.push(S.numSpotLights),x.push(S.numSpotLightMaps),x.push(S.numHemiLights),x.push(S.numRectAreaLights),x.push(S.numDirLightShadows),x.push(S.numPointLightShadows),x.push(S.numSpotLightShadows),x.push(S.numSpotLightShadowsWithMaps),x.push(S.numLightProbes),x.push(S.shadowMapType),x.push(S.toneMapping),x.push(S.numClippingPlanes),x.push(S.numClipIntersection),x.push(S.depthPacking)}function y(x,S){o.disableAll(),S.supportsVertexTextures&&o.enable(0),S.instancing&&o.enable(1),S.instancingColor&&o.enable(2),S.instancingMorph&&o.enable(3),S.matcap&&o.enable(4),S.envMap&&o.enable(5),S.normalMapObjectSpace&&o.enable(6),S.normalMapTangentSpace&&o.enable(7),S.clearcoat&&o.enable(8),S.iridescence&&o.enable(9),S.alphaTest&&o.enable(10),S.vertexColors&&o.enable(11),S.vertexAlphas&&o.enable(12),S.vertexUv1s&&o.enable(13),S.vertexUv2s&&o.enable(14),S.vertexUv3s&&o.enable(15),S.vertexTangents&&o.enable(16),S.anisotropy&&o.enable(17),S.alphaHash&&o.enable(18),S.batching&&o.enable(19),S.dispersion&&o.enable(20),S.batchingColor&&o.enable(21),S.gradientMap&&o.enable(22),x.push(o.mask),o.disableAll(),S.fog&&o.enable(0),S.useFog&&o.enable(1),S.flatShading&&o.enable(2),S.logarithmicDepthBuffer&&o.enable(3),S.reversedDepthBuffer&&o.enable(4),S.skinning&&o.enable(5),S.morphTargets&&o.enable(6),S.morphNormals&&o.enable(7),S.morphColors&&o.enable(8),S.premultipliedAlpha&&o.enable(9),S.shadowMapEnabled&&o.enable(10),S.doubleSided&&o.enable(11),S.flipSided&&o.enable(12),S.useDepthPacking&&o.enable(13),S.dithering&&o.enable(14),S.transmission&&o.enable(15),S.sheen&&o.enable(16),S.opaque&&o.enable(17),S.pointsUvs&&o.enable(18),S.decodeVideoTexture&&o.enable(19),S.decodeVideoTextureEmissive&&o.enable(20),S.alphaToCoverage&&o.enable(21),x.push(o.mask)}function b(x){const S=g[x.type];let C;if(S){const I=Li[S];C=Uv.clone(I.uniforms)}else C=x.uniforms;return C}function M(x,S){let C;for(let I=0,U=u.length;I<U;I++){const z=u[I];if(z.cacheKey===S){C=z,++C.usedTimes;break}}return C===void 0&&(C=new zT(r,S,x,s),u.push(C)),C}function E(x){if(--x.usedTimes===0){const S=u.indexOf(x);u[S]=u[u.length-1],u.pop(),x.destroy()}}function T(x){c.remove(x)}function R(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:b,acquireProgram:M,releaseProgram:E,releaseShaderCache:T,programs:u,dispose:R}}function XT(){let r=new WeakMap;function e(a){return r.has(a)}function t(a){let o=r.get(a);return o===void 0&&(o={},r.set(a,o)),o}function n(a){r.delete(a)}function i(a,o,c){r.get(a)[o]=c}function s(){r=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:s}}function jT(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function Hp(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function Gp(){const r=[];let e=0;const t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function a(h,f,d,g,_,m){let p=r[e];return p===void 0?(p={id:h.id,object:h,geometry:f,material:d,groupOrder:g,renderOrder:h.renderOrder,z:_,group:m},r[e]=p):(p.id=h.id,p.object=h,p.geometry=f,p.material=d,p.groupOrder=g,p.renderOrder=h.renderOrder,p.z=_,p.group=m),e++,p}function o(h,f,d,g,_,m){const p=a(h,f,d,g,_,m);d.transmission>0?n.push(p):d.transparent===!0?i.push(p):t.push(p)}function c(h,f,d,g,_,m){const p=a(h,f,d,g,_,m);d.transmission>0?n.unshift(p):d.transparent===!0?i.unshift(p):t.unshift(p)}function l(h,f){t.length>1&&t.sort(h||jT),n.length>1&&n.sort(f||Hp),i.length>1&&i.sort(f||Hp)}function u(){for(let h=e,f=r.length;h<f;h++){const d=r[h];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:o,unshift:c,finish:u,sort:l}}function qT(){let r=new WeakMap;function e(n,i){const s=r.get(n);let a;return s===void 0?(a=new Gp,r.set(n,[a])):i>=s.length?(a=new Gp,s.push(a)):a=s[i],a}function t(){r=new WeakMap}return{get:e,dispose:t}}function YT(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new k,color:new qe};break;case"SpotLight":t={position:new k,direction:new k,color:new qe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new k,color:new qe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new k,skyColor:new qe,groundColor:new qe};break;case"RectAreaLight":t={color:new qe,position:new k,halfWidth:new k,halfHeight:new k};break}return r[e.id]=t,t}}}function KT(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new lt};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new lt};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new lt,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let $T=0;function JT(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function ZT(r){const e=new YT,t=KT(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new k);const i=new k,s=new tt,a=new tt;function o(l){let u=0,h=0,f=0;for(let x=0;x<9;x++)n.probe[x].set(0,0,0);let d=0,g=0,_=0,m=0,p=0,v=0,y=0,b=0,M=0,E=0,T=0;l.sort(JT);for(let x=0,S=l.length;x<S;x++){const C=l[x],I=C.color,U=C.intensity,z=C.distance,W=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)u+=I.r*U,h+=I.g*U,f+=I.b*U;else if(C.isLightProbe){for(let V=0;V<9;V++)n.probe[V].addScaledVector(C.sh.coefficients[V],U);T++}else if(C.isDirectionalLight){const V=e.get(C);if(V.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const j=C.shadow,H=t.get(C);H.shadowIntensity=j.intensity,H.shadowBias=j.bias,H.shadowNormalBias=j.normalBias,H.shadowRadius=j.radius,H.shadowMapSize=j.mapSize,n.directionalShadow[d]=H,n.directionalShadowMap[d]=W,n.directionalShadowMatrix[d]=C.shadow.matrix,v++}n.directional[d]=V,d++}else if(C.isSpotLight){const V=e.get(C);V.position.setFromMatrixPosition(C.matrixWorld),V.color.copy(I).multiplyScalar(U),V.distance=z,V.coneCos=Math.cos(C.angle),V.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),V.decay=C.decay,n.spot[_]=V;const j=C.shadow;if(C.map&&(n.spotLightMap[M]=C.map,M++,j.updateMatrices(C),C.castShadow&&E++),n.spotLightMatrix[_]=j.matrix,C.castShadow){const H=t.get(C);H.shadowIntensity=j.intensity,H.shadowBias=j.bias,H.shadowNormalBias=j.normalBias,H.shadowRadius=j.radius,H.shadowMapSize=j.mapSize,n.spotShadow[_]=H,n.spotShadowMap[_]=W,b++}_++}else if(C.isRectAreaLight){const V=e.get(C);V.color.copy(I).multiplyScalar(U),V.halfWidth.set(C.width*.5,0,0),V.halfHeight.set(0,C.height*.5,0),n.rectArea[m]=V,m++}else if(C.isPointLight){const V=e.get(C);if(V.color.copy(C.color).multiplyScalar(C.intensity),V.distance=C.distance,V.decay=C.decay,C.castShadow){const j=C.shadow,H=t.get(C);H.shadowIntensity=j.intensity,H.shadowBias=j.bias,H.shadowNormalBias=j.normalBias,H.shadowRadius=j.radius,H.shadowMapSize=j.mapSize,H.shadowCameraNear=j.camera.near,H.shadowCameraFar=j.camera.far,n.pointShadow[g]=H,n.pointShadowMap[g]=W,n.pointShadowMatrix[g]=C.shadow.matrix,y++}n.point[g]=V,g++}else if(C.isHemisphereLight){const V=e.get(C);V.skyColor.copy(C.color).multiplyScalar(U),V.groundColor.copy(C.groundColor).multiplyScalar(U),n.hemi[p]=V,p++}}m>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ve.LTC_FLOAT_1,n.rectAreaLTC2=ve.LTC_FLOAT_2):(n.rectAreaLTC1=ve.LTC_HALF_1,n.rectAreaLTC2=ve.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=f;const R=n.hash;(R.directionalLength!==d||R.pointLength!==g||R.spotLength!==_||R.rectAreaLength!==m||R.hemiLength!==p||R.numDirectionalShadows!==v||R.numPointShadows!==y||R.numSpotShadows!==b||R.numSpotMaps!==M||R.numLightProbes!==T)&&(n.directional.length=d,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=v,n.directionalShadowMap.length=v,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=b,n.spotShadowMap.length=b,n.directionalShadowMatrix.length=v,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=b+M-E,n.spotLightMap.length=M,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=T,R.directionalLength=d,R.pointLength=g,R.spotLength=_,R.rectAreaLength=m,R.hemiLength=p,R.numDirectionalShadows=v,R.numPointShadows=y,R.numSpotShadows=b,R.numSpotMaps=M,R.numLightProbes=T,n.version=$T++)}function c(l,u){let h=0,f=0,d=0,g=0,_=0;const m=u.matrixWorldInverse;for(let p=0,v=l.length;p<v;p++){const y=l[p];if(y.isDirectionalLight){const b=n.directional[h];b.direction.setFromMatrixPosition(y.matrixWorld),i.setFromMatrixPosition(y.target.matrixWorld),b.direction.sub(i),b.direction.transformDirection(m),h++}else if(y.isSpotLight){const b=n.spot[d];b.position.setFromMatrixPosition(y.matrixWorld),b.position.applyMatrix4(m),b.direction.setFromMatrixPosition(y.matrixWorld),i.setFromMatrixPosition(y.target.matrixWorld),b.direction.sub(i),b.direction.transformDirection(m),d++}else if(y.isRectAreaLight){const b=n.rectArea[g];b.position.setFromMatrixPosition(y.matrixWorld),b.position.applyMatrix4(m),a.identity(),s.copy(y.matrixWorld),s.premultiply(m),a.extractRotation(s),b.halfWidth.set(y.width*.5,0,0),b.halfHeight.set(0,y.height*.5,0),b.halfWidth.applyMatrix4(a),b.halfHeight.applyMatrix4(a),g++}else if(y.isPointLight){const b=n.point[f];b.position.setFromMatrixPosition(y.matrixWorld),b.position.applyMatrix4(m),f++}else if(y.isHemisphereLight){const b=n.hemi[_];b.direction.setFromMatrixPosition(y.matrixWorld),b.direction.transformDirection(m),_++}}}return{setup:o,setupView:c,state:n}}function Vp(r){const e=new ZT(r),t=[],n=[];function i(u){l.camera=u,t.length=0,n.length=0}function s(u){t.push(u)}function a(u){n.push(u)}function o(){e.setup(t)}function c(u){e.setupView(t,u)}const l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:l,setupLights:o,setupLightsView:c,pushLight:s,pushShadow:a}}function QT(r){let e=new WeakMap;function t(i,s=0){const a=e.get(i);let o;return a===void 0?(o=new Vp(r),e.set(i,[o])):s>=a.length?(o=new Vp(r),a.push(o)):o=a[s],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const eE=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,tE=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function nE(r,e,t){let n=new Ef;const i=new lt,s=new lt,a=new gt,o=new Qv({depthPacking:V0}),c=new ex,l={},u=t.maxTextureSize,h={[cr]:Hn,[Hn]:cr,[Fn]:Fn},f=new lr({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new lt},radius:{value:4}},vertexShader:eE,fragmentShader:tE}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const g=new Zt;g.setAttribute("position",new Yt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new un(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Mg;let p=this.type;this.render=function(E,T,R){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;const x=r.getRenderTarget(),S=r.getActiveCubeFace(),C=r.getActiveMipmapLevel(),I=r.state;I.setBlending(Dr),I.buffers.depth.getReversed()===!0?I.buffers.color.setClear(0,0,0,0):I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);const U=p!==Ki&&this.type===Ki,z=p===Ki&&this.type!==Ki;for(let W=0,V=E.length;W<V;W++){const j=E[W],H=j.shadow;if(H===void 0){console.warn("THREE.WebGLShadowMap:",j,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;i.copy(H.mapSize);const te=H.getFrameExtents();if(i.multiply(te),s.copy(H.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(s.x=Math.floor(u/te.x),i.x=s.x*te.x,H.mapSize.x=s.x),i.y>u&&(s.y=Math.floor(u/te.y),i.y=s.y*te.y,H.mapSize.y=s.y)),H.map===null||U===!0||z===!0){const K=this.type!==Ki?{minFilter:Cn,magFilter:Cn}:{};H.map!==null&&H.map.dispose(),H.map=new _s(i.x,i.y,K),H.map.texture.name=j.name+".shadowMap",H.camera.updateProjectionMatrix()}r.setRenderTarget(H.map),r.clear();const L=H.getViewportCount();for(let K=0;K<L;K++){const le=H.getViewport(K);a.set(s.x*le.x,s.y*le.y,s.x*le.z,s.y*le.w),I.viewport(a),H.updateMatrices(j,K),n=H.getFrustum(),b(T,R,H.camera,j,this.type)}H.isPointLightShadow!==!0&&this.type===Ki&&v(H,R),H.needsUpdate=!1}p=this.type,m.needsUpdate=!1,r.setRenderTarget(x,S,C)};function v(E,T){const R=e.update(_);f.defines.VSM_SAMPLES!==E.blurSamples&&(f.defines.VSM_SAMPLES=E.blurSamples,d.defines.VSM_SAMPLES=E.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new _s(i.x,i.y)),f.uniforms.shadow_pass.value=E.map.texture,f.uniforms.resolution.value=E.mapSize,f.uniforms.radius.value=E.radius,r.setRenderTarget(E.mapPass),r.clear(),r.renderBufferDirect(T,null,R,f,_,null),d.uniforms.shadow_pass.value=E.mapPass.texture,d.uniforms.resolution.value=E.mapSize,d.uniforms.radius.value=E.radius,r.setRenderTarget(E.map),r.clear(),r.renderBufferDirect(T,null,R,d,_,null)}function y(E,T,R,x){let S=null;const C=R.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(C!==void 0)S=C;else if(S=R.isPointLight===!0?c:o,r.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0||T.alphaToCoverage===!0){const I=S.uuid,U=T.uuid;let z=l[I];z===void 0&&(z={},l[I]=z);let W=z[U];W===void 0&&(W=S.clone(),z[U]=W,T.addEventListener("dispose",M)),S=W}if(S.visible=T.visible,S.wireframe=T.wireframe,x===Ki?S.side=T.shadowSide!==null?T.shadowSide:T.side:S.side=T.shadowSide!==null?T.shadowSide:h[T.side],S.alphaMap=T.alphaMap,S.alphaTest=T.alphaToCoverage===!0?.5:T.alphaTest,S.map=T.map,S.clipShadows=T.clipShadows,S.clippingPlanes=T.clippingPlanes,S.clipIntersection=T.clipIntersection,S.displacementMap=T.displacementMap,S.displacementScale=T.displacementScale,S.displacementBias=T.displacementBias,S.wireframeLinewidth=T.wireframeLinewidth,S.linewidth=T.linewidth,R.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const I=r.properties.get(S);I.light=R}return S}function b(E,T,R,x,S){if(E.visible===!1)return;if(E.layers.test(T.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&S===Ki)&&(!E.frustumCulled||n.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,E.matrixWorld);const U=e.update(E),z=E.material;if(Array.isArray(z)){const W=U.groups;for(let V=0,j=W.length;V<j;V++){const H=W[V],te=z[H.materialIndex];if(te&&te.visible){const L=y(E,te,x,S);E.onBeforeShadow(r,E,T,R,U,L,H),r.renderBufferDirect(R,null,U,L,E,H),E.onAfterShadow(r,E,T,R,U,L,H)}}}else if(z.visible){const W=y(E,z,x,S);E.onBeforeShadow(r,E,T,R,U,W,null),r.renderBufferDirect(R,null,U,W,E,null),E.onAfterShadow(r,E,T,R,U,W,null)}}const I=E.children;for(let U=0,z=I.length;U<z;U++)b(I[U],T,R,x,S)}function M(E){E.target.removeEventListener("dispose",M);for(const R in l){const x=l[R],S=E.target.uuid;S in x&&(x[S].dispose(),delete x[S])}}}const iE={[ju]:qu,[Yu]:Ju,[Ku]:Zu,[ua]:$u,[qu]:ju,[Ju]:Yu,[Zu]:Ku,[$u]:ua};function rE(r,e){function t(){let N=!1;const re=new gt;let oe=null;const be=new gt(0,0,0,0);return{setMask:function(ie){oe!==ie&&!N&&(r.colorMask(ie,ie,ie,ie),oe=ie)},setLocked:function(ie){N=ie},setClear:function(ie,ee,we,ze,dt){dt===!0&&(ie*=ze,ee*=ze,we*=ze),re.set(ie,ee,we,ze),be.equals(re)===!1&&(r.clearColor(ie,ee,we,ze),be.copy(re))},reset:function(){N=!1,oe=null,be.set(-1,0,0,0)}}}function n(){let N=!1,re=!1,oe=null,be=null,ie=null;return{setReversed:function(ee){if(re!==ee){const we=e.get("EXT_clip_control");ee?we.clipControlEXT(we.LOWER_LEFT_EXT,we.ZERO_TO_ONE_EXT):we.clipControlEXT(we.LOWER_LEFT_EXT,we.NEGATIVE_ONE_TO_ONE_EXT),re=ee;const ze=ie;ie=null,this.setClear(ze)}},getReversed:function(){return re},setTest:function(ee){ee?J(r.DEPTH_TEST):ce(r.DEPTH_TEST)},setMask:function(ee){oe!==ee&&!N&&(r.depthMask(ee),oe=ee)},setFunc:function(ee){if(re&&(ee=iE[ee]),be!==ee){switch(ee){case ju:r.depthFunc(r.NEVER);break;case qu:r.depthFunc(r.ALWAYS);break;case Yu:r.depthFunc(r.LESS);break;case ua:r.depthFunc(r.LEQUAL);break;case Ku:r.depthFunc(r.EQUAL);break;case $u:r.depthFunc(r.GEQUAL);break;case Ju:r.depthFunc(r.GREATER);break;case Zu:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}be=ee}},setLocked:function(ee){N=ee},setClear:function(ee){ie!==ee&&(re&&(ee=1-ee),r.clearDepth(ee),ie=ee)},reset:function(){N=!1,oe=null,be=null,ie=null,re=!1}}}function i(){let N=!1,re=null,oe=null,be=null,ie=null,ee=null,we=null,ze=null,dt=null;return{setTest:function(xe){N||(xe?J(r.STENCIL_TEST):ce(r.STENCIL_TEST))},setMask:function(xe){re!==xe&&!N&&(r.stencilMask(xe),re=xe)},setFunc:function(xe,Le,Ke){(oe!==xe||be!==Le||ie!==Ke)&&(r.stencilFunc(xe,Le,Ke),oe=xe,be=Le,ie=Ke)},setOp:function(xe,Le,Ke){(ee!==xe||we!==Le||ze!==Ke)&&(r.stencilOp(xe,Le,Ke),ee=xe,we=Le,ze=Ke)},setLocked:function(xe){N=xe},setClear:function(xe){dt!==xe&&(r.clearStencil(xe),dt=xe)},reset:function(){N=!1,re=null,oe=null,be=null,ie=null,ee=null,we=null,ze=null,dt=null}}}const s=new t,a=new n,o=new i,c=new WeakMap,l=new WeakMap;let u={},h={},f=new WeakMap,d=[],g=null,_=!1,m=null,p=null,v=null,y=null,b=null,M=null,E=null,T=new qe(0,0,0),R=0,x=!1,S=null,C=null,I=null,U=null,z=null;const W=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let V=!1,j=0;const H=r.getParameter(r.VERSION);H.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec(H)[1]),V=j>=1):H.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),V=j>=2);let te=null,L={};const K=r.getParameter(r.SCISSOR_BOX),le=r.getParameter(r.VIEWPORT),_e=new gt().fromArray(K),de=new gt().fromArray(le);function ye(N,re,oe,be){const ie=new Uint8Array(4),ee=r.createTexture();r.bindTexture(N,ee),r.texParameteri(N,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(N,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let we=0;we<oe;we++)N===r.TEXTURE_3D||N===r.TEXTURE_2D_ARRAY?r.texImage3D(re,0,r.RGBA,1,1,be,0,r.RGBA,r.UNSIGNED_BYTE,ie):r.texImage2D(re+we,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,ie);return ee}const q={};q[r.TEXTURE_2D]=ye(r.TEXTURE_2D,r.TEXTURE_2D,1),q[r.TEXTURE_CUBE_MAP]=ye(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),q[r.TEXTURE_2D_ARRAY]=ye(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),q[r.TEXTURE_3D]=ye(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),J(r.DEPTH_TEST),a.setFunc(ua),De(!1),F(Rd),J(r.CULL_FACE),Xe(Dr);function J(N){u[N]!==!0&&(r.enable(N),u[N]=!0)}function ce(N){u[N]!==!1&&(r.disable(N),u[N]=!1)}function Te(N,re){return h[N]!==re?(r.bindFramebuffer(N,re),h[N]=re,N===r.DRAW_FRAMEBUFFER&&(h[r.FRAMEBUFFER]=re),N===r.FRAMEBUFFER&&(h[r.DRAW_FRAMEBUFFER]=re),!0):!1}function pe(N,re){let oe=d,be=!1;if(N){oe=f.get(re),oe===void 0&&(oe=[],f.set(re,oe));const ie=N.textures;if(oe.length!==ie.length||oe[0]!==r.COLOR_ATTACHMENT0){for(let ee=0,we=ie.length;ee<we;ee++)oe[ee]=r.COLOR_ATTACHMENT0+ee;oe.length=ie.length,be=!0}}else oe[0]!==r.BACK&&(oe[0]=r.BACK,be=!0);be&&r.drawBuffers(oe)}function Be(N){return g!==N?(r.useProgram(N),g=N,!0):!1}const ut={[ns]:r.FUNC_ADD,[d0]:r.FUNC_SUBTRACT,[p0]:r.FUNC_REVERSE_SUBTRACT};ut[m0]=r.MIN,ut[g0]=r.MAX;const D={[_0]:r.ZERO,[b0]:r.ONE,[v0]:r.SRC_COLOR,[Wu]:r.SRC_ALPHA,[E0]:r.SRC_ALPHA_SATURATE,[M0]:r.DST_COLOR,[y0]:r.DST_ALPHA,[x0]:r.ONE_MINUS_SRC_COLOR,[Xu]:r.ONE_MINUS_SRC_ALPHA,[T0]:r.ONE_MINUS_DST_COLOR,[S0]:r.ONE_MINUS_DST_ALPHA,[w0]:r.CONSTANT_COLOR,[A0]:r.ONE_MINUS_CONSTANT_COLOR,[R0]:r.CONSTANT_ALPHA,[C0]:r.ONE_MINUS_CONSTANT_ALPHA};function Xe(N,re,oe,be,ie,ee,we,ze,dt,xe){if(N===Dr){_===!0&&(ce(r.BLEND),_=!1);return}if(_===!1&&(J(r.BLEND),_=!0),N!==f0){if(N!==m||xe!==x){if((p!==ns||b!==ns)&&(r.blendEquation(r.FUNC_ADD),p=ns,b=ns),xe)switch(N){case ea:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case ts:r.blendFunc(r.ONE,r.ONE);break;case Cd:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Pd:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case ea:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case ts:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case Cd:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Pd:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}v=null,y=null,M=null,E=null,T.set(0,0,0),R=0,m=N,x=xe}return}ie=ie||re,ee=ee||oe,we=we||be,(re!==p||ie!==b)&&(r.blendEquationSeparate(ut[re],ut[ie]),p=re,b=ie),(oe!==v||be!==y||ee!==M||we!==E)&&(r.blendFuncSeparate(D[oe],D[be],D[ee],D[we]),v=oe,y=be,M=ee,E=we),(ze.equals(T)===!1||dt!==R)&&(r.blendColor(ze.r,ze.g,ze.b,dt),T.copy(ze),R=dt),m=N,x=!1}function Ue(N,re){N.side===Fn?ce(r.CULL_FACE):J(r.CULL_FACE);let oe=N.side===Hn;re&&(oe=!oe),De(oe),N.blending===ea&&N.transparent===!1?Xe(Dr):Xe(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),a.setFunc(N.depthFunc),a.setTest(N.depthTest),a.setMask(N.depthWrite),s.setMask(N.colorWrite);const be=N.stencilWrite;o.setTest(be),be&&(o.setMask(N.stencilWriteMask),o.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),o.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),Se(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?J(r.SAMPLE_ALPHA_TO_COVERAGE):ce(r.SAMPLE_ALPHA_TO_COVERAGE)}function De(N){S!==N&&(N?r.frontFace(r.CW):r.frontFace(r.CCW),S=N)}function F(N){N!==l0?(J(r.CULL_FACE),N!==C&&(N===Rd?r.cullFace(r.BACK):N===u0?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):ce(r.CULL_FACE),C=N}function st(N){N!==I&&(V&&r.lineWidth(N),I=N)}function Se(N,re,oe){N?(J(r.POLYGON_OFFSET_FILL),(U!==re||z!==oe)&&(r.polygonOffset(re,oe),U=re,z=oe)):ce(r.POLYGON_OFFSET_FILL)}function Ve(N){N?J(r.SCISSOR_TEST):ce(r.SCISSOR_TEST)}function $e(N){N===void 0&&(N=r.TEXTURE0+W-1),te!==N&&(r.activeTexture(N),te=N)}function mt(N,re,oe){oe===void 0&&(te===null?oe=r.TEXTURE0+W-1:oe=te);let be=L[oe];be===void 0&&(be={type:void 0,texture:void 0},L[oe]=be),(be.type!==N||be.texture!==re)&&(te!==oe&&(r.activeTexture(oe),te=oe),r.bindTexture(N,re||q[N]),be.type=N,be.texture=re)}function P(){const N=L[te];N!==void 0&&N.type!==void 0&&(r.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function w(){try{r.compressedTexImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function G(){try{r.compressedTexImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Z(){try{r.texSubImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Q(){try{r.texSubImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function $(){try{r.compressedTexSubImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Me(){try{r.compressedTexSubImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ae(){try{r.texStorage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Ce(){try{r.texStorage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function me(){try{r.texImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function se(){try{r.texImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function fe(N){_e.equals(N)===!1&&(r.scissor(N.x,N.y,N.z,N.w),_e.copy(N))}function Oe(N){de.equals(N)===!1&&(r.viewport(N.x,N.y,N.z,N.w),de.copy(N))}function Pe(N,re){let oe=l.get(re);oe===void 0&&(oe=new WeakMap,l.set(re,oe));let be=oe.get(N);be===void 0&&(be=r.getUniformBlockIndex(re,N.name),oe.set(N,be))}function he(N,re){const be=l.get(re).get(N);c.get(re)!==be&&(r.uniformBlockBinding(re,be,N.__bindingPointIndex),c.set(re,be))}function We(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),a.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),u={},te=null,L={},h={},f=new WeakMap,d=[],g=null,_=!1,m=null,p=null,v=null,y=null,b=null,M=null,E=null,T=new qe(0,0,0),R=0,x=!1,S=null,C=null,I=null,U=null,z=null,_e.set(0,0,r.canvas.width,r.canvas.height),de.set(0,0,r.canvas.width,r.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:J,disable:ce,bindFramebuffer:Te,drawBuffers:pe,useProgram:Be,setBlending:Xe,setMaterial:Ue,setFlipSided:De,setCullFace:F,setLineWidth:st,setPolygonOffset:Se,setScissorTest:Ve,activeTexture:$e,bindTexture:mt,unbindTexture:P,compressedTexImage2D:w,compressedTexImage3D:G,texImage2D:me,texImage3D:se,updateUBOMapping:Pe,uniformBlockBinding:he,texStorage2D:ae,texStorage3D:Ce,texSubImage2D:Z,texSubImage3D:Q,compressedTexSubImage2D:$,compressedTexSubImage3D:Me,scissor:fe,viewport:Oe,reset:We}}function sE(r,e,t,n,i,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new lt,u=new WeakMap;let h;const f=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(P,w){return d?new OffscreenCanvas(P,w):Ro("canvas")}function _(P,w,G){let Z=1;const Q=mt(P);if((Q.width>G||Q.height>G)&&(Z=G/Math.max(Q.width,Q.height)),Z<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){const $=Math.floor(Z*Q.width),Me=Math.floor(Z*Q.height);h===void 0&&(h=g($,Me));const ae=w?g($,Me):h;return ae.width=$,ae.height=Me,ae.getContext("2d").drawImage(P,0,0,$,Me),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+$+"x"+Me+")."),ae}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),P;return P}function m(P){return P.generateMipmaps}function p(P){r.generateMipmap(P)}function v(P){return P.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?r.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function y(P,w,G,Z,Q=!1){if(P!==null){if(r[P]!==void 0)return r[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let $=w;if(w===r.RED&&(G===r.FLOAT&&($=r.R32F),G===r.HALF_FLOAT&&($=r.R16F),G===r.UNSIGNED_BYTE&&($=r.R8)),w===r.RED_INTEGER&&(G===r.UNSIGNED_BYTE&&($=r.R8UI),G===r.UNSIGNED_SHORT&&($=r.R16UI),G===r.UNSIGNED_INT&&($=r.R32UI),G===r.BYTE&&($=r.R8I),G===r.SHORT&&($=r.R16I),G===r.INT&&($=r.R32I)),w===r.RG&&(G===r.FLOAT&&($=r.RG32F),G===r.HALF_FLOAT&&($=r.RG16F),G===r.UNSIGNED_BYTE&&($=r.RG8)),w===r.RG_INTEGER&&(G===r.UNSIGNED_BYTE&&($=r.RG8UI),G===r.UNSIGNED_SHORT&&($=r.RG16UI),G===r.UNSIGNED_INT&&($=r.RG32UI),G===r.BYTE&&($=r.RG8I),G===r.SHORT&&($=r.RG16I),G===r.INT&&($=r.RG32I)),w===r.RGB_INTEGER&&(G===r.UNSIGNED_BYTE&&($=r.RGB8UI),G===r.UNSIGNED_SHORT&&($=r.RGB16UI),G===r.UNSIGNED_INT&&($=r.RGB32UI),G===r.BYTE&&($=r.RGB8I),G===r.SHORT&&($=r.RGB16I),G===r.INT&&($=r.RGB32I)),w===r.RGBA_INTEGER&&(G===r.UNSIGNED_BYTE&&($=r.RGBA8UI),G===r.UNSIGNED_SHORT&&($=r.RGBA16UI),G===r.UNSIGNED_INT&&($=r.RGBA32UI),G===r.BYTE&&($=r.RGBA8I),G===r.SHORT&&($=r.RGBA16I),G===r.INT&&($=r.RGBA32I)),w===r.RGB&&(G===r.UNSIGNED_INT_5_9_9_9_REV&&($=r.RGB9_E5),G===r.UNSIGNED_INT_10F_11F_11F_REV&&($=r.R11F_G11F_B10F)),w===r.RGBA){const Me=Q?sl:ft.getTransfer(Z);G===r.FLOAT&&($=r.RGBA32F),G===r.HALF_FLOAT&&($=r.RGBA16F),G===r.UNSIGNED_BYTE&&($=Me===St?r.SRGB8_ALPHA8:r.RGBA8),G===r.UNSIGNED_SHORT_4_4_4_4&&($=r.RGBA4),G===r.UNSIGNED_SHORT_5_5_5_1&&($=r.RGB5_A1)}return($===r.R16F||$===r.R32F||$===r.RG16F||$===r.RG32F||$===r.RGBA16F||$===r.RGBA32F)&&e.get("EXT_color_buffer_float"),$}function b(P,w){let G;return P?w===null||w===gs||w===Mo?G=r.DEPTH24_STENCIL8:w===Ei?G=r.DEPTH32F_STENCIL8:w===So&&(G=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===gs||w===Mo?G=r.DEPTH_COMPONENT24:w===Ei?G=r.DEPTH_COMPONENT32F:w===So&&(G=r.DEPTH_COMPONENT16),G}function M(P,w){return m(P)===!0||P.isFramebufferTexture&&P.minFilter!==Cn&&P.minFilter!==ni?Math.log2(Math.max(w.width,w.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?w.mipmaps.length:1}function E(P){const w=P.target;w.removeEventListener("dispose",E),R(w),w.isVideoTexture&&u.delete(w)}function T(P){const w=P.target;w.removeEventListener("dispose",T),S(w)}function R(P){const w=n.get(P);if(w.__webglInit===void 0)return;const G=P.source,Z=f.get(G);if(Z){const Q=Z[w.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&x(P),Object.keys(Z).length===0&&f.delete(G)}n.remove(P)}function x(P){const w=n.get(P);r.deleteTexture(w.__webglTexture);const G=P.source,Z=f.get(G);delete Z[w.__cacheKey],a.memory.textures--}function S(P){const w=n.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),n.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(w.__webglFramebuffer[Z]))for(let Q=0;Q<w.__webglFramebuffer[Z].length;Q++)r.deleteFramebuffer(w.__webglFramebuffer[Z][Q]);else r.deleteFramebuffer(w.__webglFramebuffer[Z]);w.__webglDepthbuffer&&r.deleteRenderbuffer(w.__webglDepthbuffer[Z])}else{if(Array.isArray(w.__webglFramebuffer))for(let Z=0;Z<w.__webglFramebuffer.length;Z++)r.deleteFramebuffer(w.__webglFramebuffer[Z]);else r.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&r.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&r.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let Z=0;Z<w.__webglColorRenderbuffer.length;Z++)w.__webglColorRenderbuffer[Z]&&r.deleteRenderbuffer(w.__webglColorRenderbuffer[Z]);w.__webglDepthRenderbuffer&&r.deleteRenderbuffer(w.__webglDepthRenderbuffer)}const G=P.textures;for(let Z=0,Q=G.length;Z<Q;Z++){const $=n.get(G[Z]);$.__webglTexture&&(r.deleteTexture($.__webglTexture),a.memory.textures--),n.remove(G[Z])}n.remove(P)}let C=0;function I(){C=0}function U(){const P=C;return P>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+i.maxTextures),C+=1,P}function z(P){const w=[];return w.push(P.wrapS),w.push(P.wrapT),w.push(P.wrapR||0),w.push(P.magFilter),w.push(P.minFilter),w.push(P.anisotropy),w.push(P.internalFormat),w.push(P.format),w.push(P.type),w.push(P.generateMipmaps),w.push(P.premultiplyAlpha),w.push(P.flipY),w.push(P.unpackAlignment),w.push(P.colorSpace),w.join()}function W(P,w){const G=n.get(P);if(P.isVideoTexture&&Ve(P),P.isRenderTargetTexture===!1&&P.isExternalTexture!==!0&&P.version>0&&G.__version!==P.version){const Z=P.image;if(Z===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{q(G,P,w);return}}else P.isExternalTexture&&(G.__webglTexture=P.sourceTexture?P.sourceTexture:null);t.bindTexture(r.TEXTURE_2D,G.__webglTexture,r.TEXTURE0+w)}function V(P,w){const G=n.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&G.__version!==P.version){q(G,P,w);return}t.bindTexture(r.TEXTURE_2D_ARRAY,G.__webglTexture,r.TEXTURE0+w)}function j(P,w){const G=n.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&G.__version!==P.version){q(G,P,w);return}t.bindTexture(r.TEXTURE_3D,G.__webglTexture,r.TEXTURE0+w)}function H(P,w){const G=n.get(P);if(P.version>0&&G.__version!==P.version){J(G,P,w);return}t.bindTexture(r.TEXTURE_CUBE_MAP,G.__webglTexture,r.TEXTURE0+w)}const te={[da]:r.REPEAT,[wr]:r.CLAMP_TO_EDGE,[rl]:r.MIRRORED_REPEAT},L={[Cn]:r.NEAREST,[wg]:r.NEAREST_MIPMAP_NEAREST,[Ya]:r.NEAREST_MIPMAP_LINEAR,[ni]:r.LINEAR,[Oc]:r.LINEAR_MIPMAP_NEAREST,[er]:r.LINEAR_MIPMAP_LINEAR},K={[X0]:r.NEVER,[J0]:r.ALWAYS,[j0]:r.LESS,[Fg]:r.LEQUAL,[q0]:r.EQUAL,[$0]:r.GEQUAL,[Y0]:r.GREATER,[K0]:r.NOTEQUAL};function le(P,w){if(w.type===Ei&&e.has("OES_texture_float_linear")===!1&&(w.magFilter===ni||w.magFilter===Oc||w.magFilter===Ya||w.magFilter===er||w.minFilter===ni||w.minFilter===Oc||w.minFilter===Ya||w.minFilter===er)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(P,r.TEXTURE_WRAP_S,te[w.wrapS]),r.texParameteri(P,r.TEXTURE_WRAP_T,te[w.wrapT]),(P===r.TEXTURE_3D||P===r.TEXTURE_2D_ARRAY)&&r.texParameteri(P,r.TEXTURE_WRAP_R,te[w.wrapR]),r.texParameteri(P,r.TEXTURE_MAG_FILTER,L[w.magFilter]),r.texParameteri(P,r.TEXTURE_MIN_FILTER,L[w.minFilter]),w.compareFunction&&(r.texParameteri(P,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(P,r.TEXTURE_COMPARE_FUNC,K[w.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===Cn||w.minFilter!==Ya&&w.minFilter!==er||w.type===Ei&&e.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||n.get(w).__currentAnisotropy){const G=e.get("EXT_texture_filter_anisotropic");r.texParameterf(P,G.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,i.getMaxAnisotropy())),n.get(w).__currentAnisotropy=w.anisotropy}}}function _e(P,w){let G=!1;P.__webglInit===void 0&&(P.__webglInit=!0,w.addEventListener("dispose",E));const Z=w.source;let Q=f.get(Z);Q===void 0&&(Q={},f.set(Z,Q));const $=z(w);if($!==P.__cacheKey){Q[$]===void 0&&(Q[$]={texture:r.createTexture(),usedTimes:0},a.memory.textures++,G=!0),Q[$].usedTimes++;const Me=Q[P.__cacheKey];Me!==void 0&&(Q[P.__cacheKey].usedTimes--,Me.usedTimes===0&&x(w)),P.__cacheKey=$,P.__webglTexture=Q[$].texture}return G}function de(P,w,G){return Math.floor(Math.floor(P/G)/w)}function ye(P,w,G,Z){const $=P.updateRanges;if($.length===0)t.texSubImage2D(r.TEXTURE_2D,0,0,0,w.width,w.height,G,Z,w.data);else{$.sort((se,fe)=>se.start-fe.start);let Me=0;for(let se=1;se<$.length;se++){const fe=$[Me],Oe=$[se],Pe=fe.start+fe.count,he=de(Oe.start,w.width,4),We=de(fe.start,w.width,4);Oe.start<=Pe+1&&he===We&&de(Oe.start+Oe.count-1,w.width,4)===he?fe.count=Math.max(fe.count,Oe.start+Oe.count-fe.start):(++Me,$[Me]=Oe)}$.length=Me+1;const ae=r.getParameter(r.UNPACK_ROW_LENGTH),Ce=r.getParameter(r.UNPACK_SKIP_PIXELS),me=r.getParameter(r.UNPACK_SKIP_ROWS);r.pixelStorei(r.UNPACK_ROW_LENGTH,w.width);for(let se=0,fe=$.length;se<fe;se++){const Oe=$[se],Pe=Math.floor(Oe.start/4),he=Math.ceil(Oe.count/4),We=Pe%w.width,N=Math.floor(Pe/w.width),re=he,oe=1;r.pixelStorei(r.UNPACK_SKIP_PIXELS,We),r.pixelStorei(r.UNPACK_SKIP_ROWS,N),t.texSubImage2D(r.TEXTURE_2D,0,We,N,re,oe,G,Z,w.data)}P.clearUpdateRanges(),r.pixelStorei(r.UNPACK_ROW_LENGTH,ae),r.pixelStorei(r.UNPACK_SKIP_PIXELS,Ce),r.pixelStorei(r.UNPACK_SKIP_ROWS,me)}}function q(P,w,G){let Z=r.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(Z=r.TEXTURE_2D_ARRAY),w.isData3DTexture&&(Z=r.TEXTURE_3D);const Q=_e(P,w),$=w.source;t.bindTexture(Z,P.__webglTexture,r.TEXTURE0+G);const Me=n.get($);if($.version!==Me.__version||Q===!0){t.activeTexture(r.TEXTURE0+G);const ae=ft.getPrimaries(ft.workingColorSpace),Ce=w.colorSpace===xr?null:ft.getPrimaries(w.colorSpace),me=w.colorSpace===xr||ae===Ce?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,w.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,w.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,me);let se=_(w.image,!1,i.maxTextureSize);se=$e(w,se);const fe=s.convert(w.format,w.colorSpace),Oe=s.convert(w.type);let Pe=y(w.internalFormat,fe,Oe,w.colorSpace,w.isVideoTexture);le(Z,w);let he;const We=w.mipmaps,N=w.isVideoTexture!==!0,re=Me.__version===void 0||Q===!0,oe=$.dataReady,be=M(w,se);if(w.isDepthTexture)Pe=b(w.format===Eo,w.type),re&&(N?t.texStorage2D(r.TEXTURE_2D,1,Pe,se.width,se.height):t.texImage2D(r.TEXTURE_2D,0,Pe,se.width,se.height,0,fe,Oe,null));else if(w.isDataTexture)if(We.length>0){N&&re&&t.texStorage2D(r.TEXTURE_2D,be,Pe,We[0].width,We[0].height);for(let ie=0,ee=We.length;ie<ee;ie++)he=We[ie],N?oe&&t.texSubImage2D(r.TEXTURE_2D,ie,0,0,he.width,he.height,fe,Oe,he.data):t.texImage2D(r.TEXTURE_2D,ie,Pe,he.width,he.height,0,fe,Oe,he.data);w.generateMipmaps=!1}else N?(re&&t.texStorage2D(r.TEXTURE_2D,be,Pe,se.width,se.height),oe&&ye(w,se,fe,Oe)):t.texImage2D(r.TEXTURE_2D,0,Pe,se.width,se.height,0,fe,Oe,se.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){N&&re&&t.texStorage3D(r.TEXTURE_2D_ARRAY,be,Pe,We[0].width,We[0].height,se.depth);for(let ie=0,ee=We.length;ie<ee;ie++)if(he=We[ie],w.format!==_i)if(fe!==null)if(N){if(oe)if(w.layerUpdates.size>0){const we=vp(he.width,he.height,w.format,w.type);for(const ze of w.layerUpdates){const dt=he.data.subarray(ze*we/he.data.BYTES_PER_ELEMENT,(ze+1)*we/he.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,ie,0,0,ze,he.width,he.height,1,fe,dt)}w.clearLayerUpdates()}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,ie,0,0,0,he.width,he.height,se.depth,fe,he.data)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,ie,Pe,he.width,he.height,se.depth,0,he.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else N?oe&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,ie,0,0,0,he.width,he.height,se.depth,fe,Oe,he.data):t.texImage3D(r.TEXTURE_2D_ARRAY,ie,Pe,he.width,he.height,se.depth,0,fe,Oe,he.data)}else{N&&re&&t.texStorage2D(r.TEXTURE_2D,be,Pe,We[0].width,We[0].height);for(let ie=0,ee=We.length;ie<ee;ie++)he=We[ie],w.format!==_i?fe!==null?N?oe&&t.compressedTexSubImage2D(r.TEXTURE_2D,ie,0,0,he.width,he.height,fe,he.data):t.compressedTexImage2D(r.TEXTURE_2D,ie,Pe,he.width,he.height,0,he.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):N?oe&&t.texSubImage2D(r.TEXTURE_2D,ie,0,0,he.width,he.height,fe,Oe,he.data):t.texImage2D(r.TEXTURE_2D,ie,Pe,he.width,he.height,0,fe,Oe,he.data)}else if(w.isDataArrayTexture)if(N){if(re&&t.texStorage3D(r.TEXTURE_2D_ARRAY,be,Pe,se.width,se.height,se.depth),oe)if(w.layerUpdates.size>0){const ie=vp(se.width,se.height,w.format,w.type);for(const ee of w.layerUpdates){const we=se.data.subarray(ee*ie/se.data.BYTES_PER_ELEMENT,(ee+1)*ie/se.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,ee,se.width,se.height,1,fe,Oe,we)}w.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,se.width,se.height,se.depth,fe,Oe,se.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,Pe,se.width,se.height,se.depth,0,fe,Oe,se.data);else if(w.isData3DTexture)N?(re&&t.texStorage3D(r.TEXTURE_3D,be,Pe,se.width,se.height,se.depth),oe&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,se.width,se.height,se.depth,fe,Oe,se.data)):t.texImage3D(r.TEXTURE_3D,0,Pe,se.width,se.height,se.depth,0,fe,Oe,se.data);else if(w.isFramebufferTexture){if(re)if(N)t.texStorage2D(r.TEXTURE_2D,be,Pe,se.width,se.height);else{let ie=se.width,ee=se.height;for(let we=0;we<be;we++)t.texImage2D(r.TEXTURE_2D,we,Pe,ie,ee,0,fe,Oe,null),ie>>=1,ee>>=1}}else if(We.length>0){if(N&&re){const ie=mt(We[0]);t.texStorage2D(r.TEXTURE_2D,be,Pe,ie.width,ie.height)}for(let ie=0,ee=We.length;ie<ee;ie++)he=We[ie],N?oe&&t.texSubImage2D(r.TEXTURE_2D,ie,0,0,fe,Oe,he):t.texImage2D(r.TEXTURE_2D,ie,Pe,fe,Oe,he);w.generateMipmaps=!1}else if(N){if(re){const ie=mt(se);t.texStorage2D(r.TEXTURE_2D,be,Pe,ie.width,ie.height)}oe&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,fe,Oe,se)}else t.texImage2D(r.TEXTURE_2D,0,Pe,fe,Oe,se);m(w)&&p(Z),Me.__version=$.version,w.onUpdate&&w.onUpdate(w)}P.__version=w.version}function J(P,w,G){if(w.image.length!==6)return;const Z=_e(P,w),Q=w.source;t.bindTexture(r.TEXTURE_CUBE_MAP,P.__webglTexture,r.TEXTURE0+G);const $=n.get(Q);if(Q.version!==$.__version||Z===!0){t.activeTexture(r.TEXTURE0+G);const Me=ft.getPrimaries(ft.workingColorSpace),ae=w.colorSpace===xr?null:ft.getPrimaries(w.colorSpace),Ce=w.colorSpace===xr||Me===ae?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,w.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,w.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ce);const me=w.isCompressedTexture||w.image[0].isCompressedTexture,se=w.image[0]&&w.image[0].isDataTexture,fe=[];for(let ee=0;ee<6;ee++)!me&&!se?fe[ee]=_(w.image[ee],!0,i.maxCubemapSize):fe[ee]=se?w.image[ee].image:w.image[ee],fe[ee]=$e(w,fe[ee]);const Oe=fe[0],Pe=s.convert(w.format,w.colorSpace),he=s.convert(w.type),We=y(w.internalFormat,Pe,he,w.colorSpace),N=w.isVideoTexture!==!0,re=$.__version===void 0||Z===!0,oe=Q.dataReady;let be=M(w,Oe);le(r.TEXTURE_CUBE_MAP,w);let ie;if(me){N&&re&&t.texStorage2D(r.TEXTURE_CUBE_MAP,be,We,Oe.width,Oe.height);for(let ee=0;ee<6;ee++){ie=fe[ee].mipmaps;for(let we=0;we<ie.length;we++){const ze=ie[we];w.format!==_i?Pe!==null?N?oe&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ee,we,0,0,ze.width,ze.height,Pe,ze.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ee,we,We,ze.width,ze.height,0,ze.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):N?oe&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ee,we,0,0,ze.width,ze.height,Pe,he,ze.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ee,we,We,ze.width,ze.height,0,Pe,he,ze.data)}}}else{if(ie=w.mipmaps,N&&re){ie.length>0&&be++;const ee=mt(fe[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,be,We,ee.width,ee.height)}for(let ee=0;ee<6;ee++)if(se){N?oe&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,0,0,fe[ee].width,fe[ee].height,Pe,he,fe[ee].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,We,fe[ee].width,fe[ee].height,0,Pe,he,fe[ee].data);for(let we=0;we<ie.length;we++){const dt=ie[we].image[ee].image;N?oe&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ee,we+1,0,0,dt.width,dt.height,Pe,he,dt.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ee,we+1,We,dt.width,dt.height,0,Pe,he,dt.data)}}else{N?oe&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,0,0,Pe,he,fe[ee]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,We,Pe,he,fe[ee]);for(let we=0;we<ie.length;we++){const ze=ie[we];N?oe&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ee,we+1,0,0,Pe,he,ze.image[ee]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ee,we+1,We,Pe,he,ze.image[ee])}}}m(w)&&p(r.TEXTURE_CUBE_MAP),$.__version=Q.version,w.onUpdate&&w.onUpdate(w)}P.__version=w.version}function ce(P,w,G,Z,Q,$){const Me=s.convert(G.format,G.colorSpace),ae=s.convert(G.type),Ce=y(G.internalFormat,Me,ae,G.colorSpace),me=n.get(w),se=n.get(G);if(se.__renderTarget=w,!me.__hasExternalTextures){const fe=Math.max(1,w.width>>$),Oe=Math.max(1,w.height>>$);Q===r.TEXTURE_3D||Q===r.TEXTURE_2D_ARRAY?t.texImage3D(Q,$,Ce,fe,Oe,w.depth,0,Me,ae,null):t.texImage2D(Q,$,Ce,fe,Oe,0,Me,ae,null)}t.bindFramebuffer(r.FRAMEBUFFER,P),Se(w)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,Z,Q,se.__webglTexture,0,st(w)):(Q===r.TEXTURE_2D||Q>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,Z,Q,se.__webglTexture,$),t.bindFramebuffer(r.FRAMEBUFFER,null)}function Te(P,w,G){if(r.bindRenderbuffer(r.RENDERBUFFER,P),w.depthBuffer){const Z=w.depthTexture,Q=Z&&Z.isDepthTexture?Z.type:null,$=b(w.stencilBuffer,Q),Me=w.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ae=st(w);Se(w)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ae,$,w.width,w.height):G?r.renderbufferStorageMultisample(r.RENDERBUFFER,ae,$,w.width,w.height):r.renderbufferStorage(r.RENDERBUFFER,$,w.width,w.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,Me,r.RENDERBUFFER,P)}else{const Z=w.textures;for(let Q=0;Q<Z.length;Q++){const $=Z[Q],Me=s.convert($.format,$.colorSpace),ae=s.convert($.type),Ce=y($.internalFormat,Me,ae,$.colorSpace),me=st(w);G&&Se(w)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,me,Ce,w.width,w.height):Se(w)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,me,Ce,w.width,w.height):r.renderbufferStorage(r.RENDERBUFFER,Ce,w.width,w.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function pe(P,w){if(w&&w.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,P),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Z=n.get(w.depthTexture);Z.__renderTarget=w,(!Z.__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),W(w.depthTexture,0);const Q=Z.__webglTexture,$=st(w);if(w.depthTexture.format===To)Se(w)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,Q,0,$):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,Q,0);else if(w.depthTexture.format===Eo)Se(w)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,Q,0,$):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,Q,0);else throw new Error("Unknown depthTexture format")}function Be(P){const w=n.get(P),G=P.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==P.depthTexture){const Z=P.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),Z){const Q=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,Z.removeEventListener("dispose",Q)};Z.addEventListener("dispose",Q),w.__depthDisposeCallback=Q}w.__boundDepthTexture=Z}if(P.depthTexture&&!w.__autoAllocateDepthBuffer){if(G)throw new Error("target.depthTexture not supported in Cube render targets");const Z=P.texture.mipmaps;Z&&Z.length>0?pe(w.__webglFramebuffer[0],P):pe(w.__webglFramebuffer,P)}else if(G){w.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)if(t.bindFramebuffer(r.FRAMEBUFFER,w.__webglFramebuffer[Z]),w.__webglDepthbuffer[Z]===void 0)w.__webglDepthbuffer[Z]=r.createRenderbuffer(),Te(w.__webglDepthbuffer[Z],P,!1);else{const Q=P.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,$=w.__webglDepthbuffer[Z];r.bindRenderbuffer(r.RENDERBUFFER,$),r.framebufferRenderbuffer(r.FRAMEBUFFER,Q,r.RENDERBUFFER,$)}}else{const Z=P.texture.mipmaps;if(Z&&Z.length>0?t.bindFramebuffer(r.FRAMEBUFFER,w.__webglFramebuffer[0]):t.bindFramebuffer(r.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=r.createRenderbuffer(),Te(w.__webglDepthbuffer,P,!1);else{const Q=P.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,$=w.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,$),r.framebufferRenderbuffer(r.FRAMEBUFFER,Q,r.RENDERBUFFER,$)}}t.bindFramebuffer(r.FRAMEBUFFER,null)}function ut(P,w,G){const Z=n.get(P);w!==void 0&&ce(Z.__webglFramebuffer,P,P.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),G!==void 0&&Be(P)}function D(P){const w=P.texture,G=n.get(P),Z=n.get(w);P.addEventListener("dispose",T);const Q=P.textures,$=P.isWebGLCubeRenderTarget===!0,Me=Q.length>1;if(Me||(Z.__webglTexture===void 0&&(Z.__webglTexture=r.createTexture()),Z.__version=w.version,a.memory.textures++),$){G.__webglFramebuffer=[];for(let ae=0;ae<6;ae++)if(w.mipmaps&&w.mipmaps.length>0){G.__webglFramebuffer[ae]=[];for(let Ce=0;Ce<w.mipmaps.length;Ce++)G.__webglFramebuffer[ae][Ce]=r.createFramebuffer()}else G.__webglFramebuffer[ae]=r.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){G.__webglFramebuffer=[];for(let ae=0;ae<w.mipmaps.length;ae++)G.__webglFramebuffer[ae]=r.createFramebuffer()}else G.__webglFramebuffer=r.createFramebuffer();if(Me)for(let ae=0,Ce=Q.length;ae<Ce;ae++){const me=n.get(Q[ae]);me.__webglTexture===void 0&&(me.__webglTexture=r.createTexture(),a.memory.textures++)}if(P.samples>0&&Se(P)===!1){G.__webglMultisampledFramebuffer=r.createFramebuffer(),G.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let ae=0;ae<Q.length;ae++){const Ce=Q[ae];G.__webglColorRenderbuffer[ae]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,G.__webglColorRenderbuffer[ae]);const me=s.convert(Ce.format,Ce.colorSpace),se=s.convert(Ce.type),fe=y(Ce.internalFormat,me,se,Ce.colorSpace,P.isXRRenderTarget===!0),Oe=st(P);r.renderbufferStorageMultisample(r.RENDERBUFFER,Oe,fe,P.width,P.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ae,r.RENDERBUFFER,G.__webglColorRenderbuffer[ae])}r.bindRenderbuffer(r.RENDERBUFFER,null),P.depthBuffer&&(G.__webglDepthRenderbuffer=r.createRenderbuffer(),Te(G.__webglDepthRenderbuffer,P,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if($){t.bindTexture(r.TEXTURE_CUBE_MAP,Z.__webglTexture),le(r.TEXTURE_CUBE_MAP,w);for(let ae=0;ae<6;ae++)if(w.mipmaps&&w.mipmaps.length>0)for(let Ce=0;Ce<w.mipmaps.length;Ce++)ce(G.__webglFramebuffer[ae][Ce],P,w,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ce);else ce(G.__webglFramebuffer[ae],P,w,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0);m(w)&&p(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Me){for(let ae=0,Ce=Q.length;ae<Ce;ae++){const me=Q[ae],se=n.get(me);let fe=r.TEXTURE_2D;(P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(fe=P.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(fe,se.__webglTexture),le(fe,me),ce(G.__webglFramebuffer,P,me,r.COLOR_ATTACHMENT0+ae,fe,0),m(me)&&p(fe)}t.unbindTexture()}else{let ae=r.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(ae=P.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(ae,Z.__webglTexture),le(ae,w),w.mipmaps&&w.mipmaps.length>0)for(let Ce=0;Ce<w.mipmaps.length;Ce++)ce(G.__webglFramebuffer[Ce],P,w,r.COLOR_ATTACHMENT0,ae,Ce);else ce(G.__webglFramebuffer,P,w,r.COLOR_ATTACHMENT0,ae,0);m(w)&&p(ae),t.unbindTexture()}P.depthBuffer&&Be(P)}function Xe(P){const w=P.textures;for(let G=0,Z=w.length;G<Z;G++){const Q=w[G];if(m(Q)){const $=v(P),Me=n.get(Q).__webglTexture;t.bindTexture($,Me),p($),t.unbindTexture()}}}const Ue=[],De=[];function F(P){if(P.samples>0){if(Se(P)===!1){const w=P.textures,G=P.width,Z=P.height;let Q=r.COLOR_BUFFER_BIT;const $=P.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Me=n.get(P),ae=w.length>1;if(ae)for(let me=0;me<w.length;me++)t.bindFramebuffer(r.FRAMEBUFFER,Me.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+me,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,Me.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+me,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,Me.__webglMultisampledFramebuffer);const Ce=P.texture.mipmaps;Ce&&Ce.length>0?t.bindFramebuffer(r.DRAW_FRAMEBUFFER,Me.__webglFramebuffer[0]):t.bindFramebuffer(r.DRAW_FRAMEBUFFER,Me.__webglFramebuffer);for(let me=0;me<w.length;me++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(Q|=r.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(Q|=r.STENCIL_BUFFER_BIT)),ae){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,Me.__webglColorRenderbuffer[me]);const se=n.get(w[me]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,se,0)}r.blitFramebuffer(0,0,G,Z,0,0,G,Z,Q,r.NEAREST),c===!0&&(Ue.length=0,De.length=0,Ue.push(r.COLOR_ATTACHMENT0+me),P.depthBuffer&&P.resolveDepthBuffer===!1&&(Ue.push($),De.push($),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,De)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,Ue))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),ae)for(let me=0;me<w.length;me++){t.bindFramebuffer(r.FRAMEBUFFER,Me.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+me,r.RENDERBUFFER,Me.__webglColorRenderbuffer[me]);const se=n.get(w[me]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,Me.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+me,r.TEXTURE_2D,se,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,Me.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.resolveDepthBuffer===!1&&c){const w=P.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[w])}}}function st(P){return Math.min(i.maxSamples,P.samples)}function Se(P){const w=n.get(P);return P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function Ve(P){const w=a.render.frame;u.get(P)!==w&&(u.set(P,w),P.update())}function $e(P,w){const G=P.colorSpace,Z=P.format,Q=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||G!==Pn&&G!==xr&&(ft.getTransfer(G)===St?(Z!==_i||Q!==zi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",G)),w}function mt(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(l.width=P.naturalWidth||P.width,l.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(l.width=P.displayWidth,l.height=P.displayHeight):(l.width=P.width,l.height=P.height),l}this.allocateTextureUnit=U,this.resetTextureUnits=I,this.setTexture2D=W,this.setTexture2DArray=V,this.setTexture3D=j,this.setTextureCube=H,this.rebindTextures=ut,this.setupRenderTarget=D,this.updateRenderTargetMipmap=Xe,this.updateMultisampleRenderTarget=F,this.setupDepthRenderbuffer=Be,this.setupFrameBufferTexture=ce,this.useMultisampledRTT=Se}function aE(r,e){function t(n,i=xr){let s;const a=ft.getTransfer(i);if(n===zi)return r.UNSIGNED_BYTE;if(n===mf)return r.UNSIGNED_SHORT_4_4_4_4;if(n===gf)return r.UNSIGNED_SHORT_5_5_5_1;if(n===Cg)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===Pg)return r.UNSIGNED_INT_10F_11F_11F_REV;if(n===Ag)return r.BYTE;if(n===Rg)return r.SHORT;if(n===So)return r.UNSIGNED_SHORT;if(n===pf)return r.INT;if(n===gs)return r.UNSIGNED_INT;if(n===Ei)return r.FLOAT;if(n===Do)return r.HALF_FLOAT;if(n===Dg)return r.ALPHA;if(n===Lg)return r.RGB;if(n===_i)return r.RGBA;if(n===To)return r.DEPTH_COMPONENT;if(n===Eo)return r.DEPTH_STENCIL;if(n===_f)return r.RED;if(n===bf)return r.RED_INTEGER;if(n===Ig)return r.RG;if(n===vf)return r.RG_INTEGER;if(n===xf)return r.RGBA_INTEGER;if(n===kc||n===Bc||n===zc||n===Hc)if(a===St)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===kc)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Bc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===zc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Hc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===kc)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Bc)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===zc)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Hc)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===th||n===nh||n===ih||n===rh)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===th)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===nh)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ih)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===rh)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===sh||n===ah||n===oh)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===sh||n===ah)return a===St?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===oh)return a===St?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===ch||n===lh||n===uh||n===hh||n===fh||n===dh||n===ph||n===mh||n===gh||n===_h||n===bh||n===vh||n===xh||n===yh)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===ch)return a===St?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===lh)return a===St?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===uh)return a===St?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===hh)return a===St?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===fh)return a===St?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===dh)return a===St?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===ph)return a===St?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===mh)return a===St?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===gh)return a===St?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===_h)return a===St?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===bh)return a===St?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===vh)return a===St?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===xh)return a===St?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===yh)return a===St?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Sh||n===Mh||n===Th)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===Sh)return a===St?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Mh)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Th)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Eh||n===wh||n===Ah||n===Rh)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===Eh)return s.COMPRESSED_RED_RGTC1_EXT;if(n===wh)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ah)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Rh)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Mo?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:t}}const oE=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,cE=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class lE{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new Kg(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new lr({vertexShader:oE,fragmentShader:cE,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new un(new ga(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class uE extends xa{constructor(e,t){super();const n=this;let i=null,s=1,a=null,o="local-floor",c=1,l=null,u=null,h=null,f=null,d=null,g=null;const _=typeof XRWebGLBinding<"u",m=new lE,p={},v=t.getContextAttributes();let y=null,b=null;const M=[],E=[],T=new lt;let R=null;const x=new In;x.viewport=new gt;const S=new In;S.viewport=new gt;const C=[x,S],I=new Sx;let U=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let J=M[q];return J===void 0&&(J=new tu,M[q]=J),J.getTargetRaySpace()},this.getControllerGrip=function(q){let J=M[q];return J===void 0&&(J=new tu,M[q]=J),J.getGripSpace()},this.getHand=function(q){let J=M[q];return J===void 0&&(J=new tu,M[q]=J),J.getHandSpace()};function W(q){const J=E.indexOf(q.inputSource);if(J===-1)return;const ce=M[J];ce!==void 0&&(ce.update(q.inputSource,q.frame,l||a),ce.dispatchEvent({type:q.type,data:q.inputSource}))}function V(){i.removeEventListener("select",W),i.removeEventListener("selectstart",W),i.removeEventListener("selectend",W),i.removeEventListener("squeeze",W),i.removeEventListener("squeezestart",W),i.removeEventListener("squeezeend",W),i.removeEventListener("end",V),i.removeEventListener("inputsourceschange",j);for(let q=0;q<M.length;q++){const J=E[q];J!==null&&(E[q]=null,M[q].disconnect(J))}U=null,z=null,m.reset();for(const q in p)delete p[q];e.setRenderTarget(y),d=null,f=null,h=null,i=null,b=null,ye.stop(),n.isPresenting=!1,e.setPixelRatio(R),e.setSize(T.width,T.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){s=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){o=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(q){l=q},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return h===null&&_&&(h=new XRWebGLBinding(i,t)),h},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(q){if(i=q,i!==null){if(y=e.getRenderTarget(),i.addEventListener("select",W),i.addEventListener("selectstart",W),i.addEventListener("selectend",W),i.addEventListener("squeeze",W),i.addEventListener("squeezestart",W),i.addEventListener("squeezeend",W),i.addEventListener("end",V),i.addEventListener("inputsourceschange",j),v.xrCompatible!==!0&&await t.makeXRCompatible(),R=e.getPixelRatio(),e.getSize(T),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let ce=null,Te=null,pe=null;v.depth&&(pe=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ce=v.stencil?Eo:To,Te=v.stencil?Mo:gs);const Be={colorFormat:t.RGBA8,depthFormat:pe,scaleFactor:s};h=this.getBinding(),f=h.createProjectionLayer(Be),i.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),b=new _s(f.textureWidth,f.textureHeight,{format:_i,type:zi,depthTexture:new Yg(f.textureWidth,f.textureHeight,Te,void 0,void 0,void 0,void 0,void 0,void 0,ce),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const ce={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(i,t,ce),i.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),b=new _s(d.framebufferWidth,d.framebufferHeight,{format:_i,type:zi,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await i.requestReferenceSpace(o),ye.setContext(i),ye.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function j(q){for(let J=0;J<q.removed.length;J++){const ce=q.removed[J],Te=E.indexOf(ce);Te>=0&&(E[Te]=null,M[Te].disconnect(ce))}for(let J=0;J<q.added.length;J++){const ce=q.added[J];let Te=E.indexOf(ce);if(Te===-1){for(let Be=0;Be<M.length;Be++)if(Be>=E.length){E.push(ce),Te=Be;break}else if(E[Be]===null){E[Be]=ce,Te=Be;break}if(Te===-1)break}const pe=M[Te];pe&&pe.connect(ce)}}const H=new k,te=new k;function L(q,J,ce){H.setFromMatrixPosition(J.matrixWorld),te.setFromMatrixPosition(ce.matrixWorld);const Te=H.distanceTo(te),pe=J.projectionMatrix.elements,Be=ce.projectionMatrix.elements,ut=pe[14]/(pe[10]-1),D=pe[14]/(pe[10]+1),Xe=(pe[9]+1)/pe[5],Ue=(pe[9]-1)/pe[5],De=(pe[8]-1)/pe[0],F=(Be[8]+1)/Be[0],st=ut*De,Se=ut*F,Ve=Te/(-De+F),$e=Ve*-De;if(J.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX($e),q.translateZ(Ve),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),pe[10]===-1)q.projectionMatrix.copy(J.projectionMatrix),q.projectionMatrixInverse.copy(J.projectionMatrixInverse);else{const mt=ut+Ve,P=D+Ve,w=st-$e,G=Se+(Te-$e),Z=Xe*D/P*mt,Q=Ue*D/P*mt;q.projectionMatrix.makePerspective(w,G,Z,Q,mt,P),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function K(q,J){J===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(J.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(i===null)return;let J=q.near,ce=q.far;m.texture!==null&&(m.depthNear>0&&(J=m.depthNear),m.depthFar>0&&(ce=m.depthFar)),I.near=S.near=x.near=J,I.far=S.far=x.far=ce,(U!==I.near||z!==I.far)&&(i.updateRenderState({depthNear:I.near,depthFar:I.far}),U=I.near,z=I.far),I.layers.mask=q.layers.mask|6,x.layers.mask=I.layers.mask&3,S.layers.mask=I.layers.mask&5;const Te=q.parent,pe=I.cameras;K(I,Te);for(let Be=0;Be<pe.length;Be++)K(pe[Be],Te);pe.length===2?L(I,x,S):I.projectionMatrix.copy(x.projectionMatrix),le(q,I,Te)};function le(q,J,ce){ce===null?q.matrix.copy(J.matrixWorld):(q.matrix.copy(ce.matrixWorld),q.matrix.invert(),q.matrix.multiply(J.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(J.projectionMatrix),q.projectionMatrixInverse.copy(J.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=pa*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return I},this.getFoveation=function(){if(!(f===null&&d===null))return c},this.setFoveation=function(q){c=q,f!==null&&(f.fixedFoveation=q),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=q)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(I)},this.getCameraTexture=function(q){return p[q]};let _e=null;function de(q,J){if(u=J.getViewerPose(l||a),g=J,u!==null){const ce=u.views;d!==null&&(e.setRenderTargetFramebuffer(b,d.framebuffer),e.setRenderTarget(b));let Te=!1;ce.length!==I.cameras.length&&(I.cameras.length=0,Te=!0);for(let D=0;D<ce.length;D++){const Xe=ce[D];let Ue=null;if(d!==null)Ue=d.getViewport(Xe);else{const F=h.getViewSubImage(f,Xe);Ue=F.viewport,D===0&&(e.setRenderTargetTextures(b,F.colorTexture,F.depthStencilTexture),e.setRenderTarget(b))}let De=C[D];De===void 0&&(De=new In,De.layers.enable(D),De.viewport=new gt,C[D]=De),De.matrix.fromArray(Xe.transform.matrix),De.matrix.decompose(De.position,De.quaternion,De.scale),De.projectionMatrix.fromArray(Xe.projectionMatrix),De.projectionMatrixInverse.copy(De.projectionMatrix).invert(),De.viewport.set(Ue.x,Ue.y,Ue.width,Ue.height),D===0&&(I.matrix.copy(De.matrix),I.matrix.decompose(I.position,I.quaternion,I.scale)),Te===!0&&I.cameras.push(De)}const pe=i.enabledFeatures;if(pe&&pe.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&_){h=n.getBinding();const D=h.getDepthInformation(ce[0]);D&&D.isValid&&D.texture&&m.init(D,i.renderState)}if(pe&&pe.includes("camera-access")&&_){e.state.unbindTexture(),h=n.getBinding();for(let D=0;D<ce.length;D++){const Xe=ce[D].camera;if(Xe){let Ue=p[Xe];Ue||(Ue=new Kg,p[Xe]=Ue);const De=h.getCameraImage(Xe);Ue.sourceTexture=De}}}}for(let ce=0;ce<M.length;ce++){const Te=E[ce],pe=M[ce];Te!==null&&pe!==void 0&&pe.update(Te,J,l||a)}_e&&_e(q,J),J.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:J}),g=null}const ye=new n_;ye.setAnimationLoop(de),this.setAnimationLoop=function(q){_e=q},this.dispose=function(){}}}const qr=new Hi,hE=new tt;function fE(r,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Vg(r)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,v,y,b){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(m,p):p.isMeshToonMaterial?(s(m,p),h(m,p)):p.isMeshPhongMaterial?(s(m,p),u(m,p)):p.isMeshStandardMaterial?(s(m,p),f(m,p),p.isMeshPhysicalMaterial&&d(m,p,b)):p.isMeshMatcapMaterial?(s(m,p),g(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),_(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?c(m,p,v,y):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Hn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Hn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const v=e.get(p),y=v.envMap,b=v.envMapRotation;y&&(m.envMap.value=y,qr.copy(b),qr.x*=-1,qr.y*=-1,qr.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(qr.y*=-1,qr.z*=-1),m.envMapRotation.value.setFromMatrix4(hE.makeRotationFromEuler(qr)),m.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,v,y){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*v,m.scale.value=y*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function h(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,v){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Hn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const v=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function dE(r,e,t,n){let i={},s={},a=[];const o=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function c(v,y){const b=y.program;n.uniformBlockBinding(v,b)}function l(v,y){let b=i[v.id];b===void 0&&(g(v),b=u(v),i[v.id]=b,v.addEventListener("dispose",m));const M=y.program;n.updateUBOMapping(v,M);const E=e.render.frame;s[v.id]!==E&&(f(v),s[v.id]=E)}function u(v){const y=h();v.__bindingPointIndex=y;const b=r.createBuffer(),M=v.__size,E=v.usage;return r.bindBuffer(r.UNIFORM_BUFFER,b),r.bufferData(r.UNIFORM_BUFFER,M,E),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,y,b),b}function h(){for(let v=0;v<o;v++)if(a.indexOf(v)===-1)return a.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(v){const y=i[v.id],b=v.uniforms,M=v.__cache;r.bindBuffer(r.UNIFORM_BUFFER,y);for(let E=0,T=b.length;E<T;E++){const R=Array.isArray(b[E])?b[E]:[b[E]];for(let x=0,S=R.length;x<S;x++){const C=R[x];if(d(C,E,x,M)===!0){const I=C.__offset,U=Array.isArray(C.value)?C.value:[C.value];let z=0;for(let W=0;W<U.length;W++){const V=U[W],j=_(V);typeof V=="number"||typeof V=="boolean"?(C.__data[0]=V,r.bufferSubData(r.UNIFORM_BUFFER,I+z,C.__data)):V.isMatrix3?(C.__data[0]=V.elements[0],C.__data[1]=V.elements[1],C.__data[2]=V.elements[2],C.__data[3]=0,C.__data[4]=V.elements[3],C.__data[5]=V.elements[4],C.__data[6]=V.elements[5],C.__data[7]=0,C.__data[8]=V.elements[6],C.__data[9]=V.elements[7],C.__data[10]=V.elements[8],C.__data[11]=0):(V.toArray(C.__data,z),z+=j.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,I,C.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function d(v,y,b,M){const E=v.value,T=y+"_"+b;if(M[T]===void 0)return typeof E=="number"||typeof E=="boolean"?M[T]=E:M[T]=E.clone(),!0;{const R=M[T];if(typeof E=="number"||typeof E=="boolean"){if(R!==E)return M[T]=E,!0}else if(R.equals(E)===!1)return R.copy(E),!0}return!1}function g(v){const y=v.uniforms;let b=0;const M=16;for(let T=0,R=y.length;T<R;T++){const x=Array.isArray(y[T])?y[T]:[y[T]];for(let S=0,C=x.length;S<C;S++){const I=x[S],U=Array.isArray(I.value)?I.value:[I.value];for(let z=0,W=U.length;z<W;z++){const V=U[z],j=_(V),H=b%M,te=H%j.boundary,L=H+te;b+=te,L!==0&&M-L<j.storage&&(b+=M-L),I.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),I.__offset=b,b+=j.storage}}}const E=b%M;return E>0&&(b+=M-E),v.__size=b,v.__cache={},this}function _(v){const y={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(y.boundary=4,y.storage=4):v.isVector2?(y.boundary=8,y.storage=8):v.isVector3||v.isColor?(y.boundary=16,y.storage=12):v.isVector4?(y.boundary=16,y.storage=16):v.isMatrix3?(y.boundary=48,y.storage=48):v.isMatrix4?(y.boundary=64,y.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),y}function m(v){const y=v.target;y.removeEventListener("dispose",m);const b=a.indexOf(y.__bindingPointIndex);a.splice(b,1),r.deleteBuffer(i[y.id]),delete i[y.id],delete s[y.id]}function p(){for(const v in i)r.deleteBuffer(i[v]);a=[],i={},s={}}return{bind:c,update:l,dispose:p}}class sw{constructor(e={}){const{canvas:t=mv(),context:n=null,depth:i=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=a;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,p=null;const v=[],y=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Lr,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const b=this;let M=!1;this._outputColorSpace=cn;let E=0,T=0,R=null,x=-1,S=null;const C=new gt,I=new gt;let U=null;const z=new qe(0);let W=0,V=t.width,j=t.height,H=1,te=null,L=null;const K=new gt(0,0,V,j),le=new gt(0,0,V,j);let _e=!1;const de=new Ef;let ye=!1,q=!1;const J=new tt,ce=new k,Te=new gt,pe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Be=!1;function ut(){return R===null?H:1}let D=n;function Xe(A,O){return t.getContext(A,O)}try{const A={alpha:!0,depth:i,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${df}`),t.addEventListener("webglcontextlost",oe,!1),t.addEventListener("webglcontextrestored",be,!1),t.addEventListener("webglcontextcreationerror",ie,!1),D===null){const O="webgl2";if(D=Xe(O,A),D===null)throw Xe(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}let Ue,De,F,st,Se,Ve,$e,mt,P,w,G,Z,Q,$,Me,ae,Ce,me,se,fe,Oe,Pe,he,We;function N(){Ue=new TM(D),Ue.init(),Pe=new aE(D,Ue),De=new _M(D,Ue,e,Pe),F=new rE(D,Ue),De.reversedDepthBuffer&&f&&F.buffers.depth.setReversed(!0),st=new AM(D),Se=new XT,Ve=new sE(D,Ue,F,Se,De,Pe,st),$e=new vM(b),mt=new MM(b),P=new Ix(D),he=new mM(D,P),w=new EM(D,P,st,he),G=new CM(D,w,P,st),se=new RM(D,De,Ve),ae=new bM(Se),Z=new WT(b,$e,mt,Ue,De,he,ae),Q=new fE(b,Se),$=new qT,Me=new QT(Ue),me=new pM(b,$e,mt,F,G,d,c),Ce=new nE(b,G,De),We=new dE(D,st,De,F),fe=new gM(D,Ue,st),Oe=new wM(D,Ue,st),st.programs=Z.programs,b.capabilities=De,b.extensions=Ue,b.properties=Se,b.renderLists=$,b.shadowMap=Ce,b.state=F,b.info=st}N();const re=new uE(b,D);this.xr=re,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const A=Ue.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=Ue.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return H},this.setPixelRatio=function(A){A!==void 0&&(H=A,this.setSize(V,j,!1))},this.getSize=function(A){return A.set(V,j)},this.setSize=function(A,O,X=!0){if(re.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}V=A,j=O,t.width=Math.floor(A*H),t.height=Math.floor(O*H),X===!0&&(t.style.width=A+"px",t.style.height=O+"px"),this.setViewport(0,0,A,O)},this.getDrawingBufferSize=function(A){return A.set(V*H,j*H).floor()},this.setDrawingBufferSize=function(A,O,X){V=A,j=O,H=X,t.width=Math.floor(A*X),t.height=Math.floor(O*X),this.setViewport(0,0,A,O)},this.getCurrentViewport=function(A){return A.copy(C)},this.getViewport=function(A){return A.copy(K)},this.setViewport=function(A,O,X,Y){A.isVector4?K.set(A.x,A.y,A.z,A.w):K.set(A,O,X,Y),F.viewport(C.copy(K).multiplyScalar(H).round())},this.getScissor=function(A){return A.copy(le)},this.setScissor=function(A,O,X,Y){A.isVector4?le.set(A.x,A.y,A.z,A.w):le.set(A,O,X,Y),F.scissor(I.copy(le).multiplyScalar(H).round())},this.getScissorTest=function(){return _e},this.setScissorTest=function(A){F.setScissorTest(_e=A)},this.setOpaqueSort=function(A){te=A},this.setTransparentSort=function(A){L=A},this.getClearColor=function(A){return A.copy(me.getClearColor())},this.setClearColor=function(){me.setClearColor(...arguments)},this.getClearAlpha=function(){return me.getClearAlpha()},this.setClearAlpha=function(){me.setClearAlpha(...arguments)},this.clear=function(A=!0,O=!0,X=!0){let Y=0;if(A){let B=!1;if(R!==null){const ne=R.texture.format;B=ne===xf||ne===vf||ne===bf}if(B){const ne=R.texture.type,ue=ne===zi||ne===gs||ne===So||ne===Mo||ne===mf||ne===gf,Ae=me.getClearColor(),Ee=me.getClearAlpha(),ke=Ae.r,Ne=Ae.g,Ie=Ae.b;ue?(g[0]=ke,g[1]=Ne,g[2]=Ie,g[3]=Ee,D.clearBufferuiv(D.COLOR,0,g)):(_[0]=ke,_[1]=Ne,_[2]=Ie,_[3]=Ee,D.clearBufferiv(D.COLOR,0,_))}else Y|=D.COLOR_BUFFER_BIT}O&&(Y|=D.DEPTH_BUFFER_BIT),X&&(Y|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear(Y)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",oe,!1),t.removeEventListener("webglcontextrestored",be,!1),t.removeEventListener("webglcontextcreationerror",ie,!1),me.dispose(),$.dispose(),Me.dispose(),Se.dispose(),$e.dispose(),mt.dispose(),G.dispose(),he.dispose(),We.dispose(),Z.dispose(),re.dispose(),re.removeEventListener("sessionstart",Ke),re.removeEventListener("sessionend",ge),He.stop()};function oe(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),M=!0}function be(){console.log("THREE.WebGLRenderer: Context Restored."),M=!1;const A=st.autoReset,O=Ce.enabled,X=Ce.autoUpdate,Y=Ce.needsUpdate,B=Ce.type;N(),st.autoReset=A,Ce.enabled=O,Ce.autoUpdate=X,Ce.needsUpdate=Y,Ce.type=B}function ie(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function ee(A){const O=A.target;O.removeEventListener("dispose",ee),we(O)}function we(A){ze(A),Se.remove(A)}function ze(A){const O=Se.get(A).programs;O!==void 0&&(O.forEach(function(X){Z.releaseProgram(X)}),A.isShaderMaterial&&Z.releaseShaderCache(A))}this.renderBufferDirect=function(A,O,X,Y,B,ne){O===null&&(O=pe);const ue=B.isMesh&&B.matrixWorld.determinant()<0,Ae=bt(A,O,X,Y,B);F.setMaterial(Y,ue);let Ee=X.index,ke=1;if(Y.wireframe===!0){if(Ee=w.getWireframeAttribute(X),Ee===void 0)return;ke=2}const Ne=X.drawRange,Ie=X.attributes.position;let Je=Ne.start*ke,at=(Ne.start+Ne.count)*ke;ne!==null&&(Je=Math.max(Je,ne.start*ke),at=Math.min(at,(ne.start+ne.count)*ke)),Ee!==null?(Je=Math.max(Je,0),at=Math.min(at,Ee.count)):Ie!=null&&(Je=Math.max(Je,0),at=Math.min(at,Ie.count));const Bt=at-Je;if(Bt<0||Bt===1/0)return;he.setup(B,Y,Ae,X,Ee);let Ct,Et=fe;if(Ee!==null&&(Ct=P.get(Ee),Et=Oe,Et.setIndex(Ct)),B.isMesh)Y.wireframe===!0?(F.setLineWidth(Y.wireframeLinewidth*ut()),Et.setMode(D.LINES)):Et.setMode(D.TRIANGLES);else if(B.isLine){let Ge=Y.linewidth;Ge===void 0&&(Ge=1),F.setLineWidth(Ge*ut()),B.isLineSegments?Et.setMode(D.LINES):B.isLineLoop?Et.setMode(D.LINE_LOOP):Et.setMode(D.LINE_STRIP)}else B.isPoints?Et.setMode(D.POINTS):B.isSprite&&Et.setMode(D.TRIANGLES);if(B.isBatchedMesh)if(B._multiDrawInstances!==null)Co("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Et.renderMultiDrawInstances(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount,B._multiDrawInstances);else if(Ue.get("WEBGL_multi_draw"))Et.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else{const Ge=B._multiDrawStarts,It=B._multiDrawCounts,pt=B._multiDrawCount,Wn=Ee?P.get(Ee).bytesPerElement:1,vs=Se.get(Y).currentProgram.getUniforms();for(let Xn=0;Xn<pt;Xn++)vs.setValue(D,"_gl_DrawID",Xn),Et.render(Ge[Xn]/Wn,It[Xn])}else if(B.isInstancedMesh)Et.renderInstances(Je,Bt,B.count);else if(X.isInstancedBufferGeometry){const Ge=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,It=Math.min(X.instanceCount,Ge);Et.renderInstances(Je,Bt,It)}else Et.render(Je,Bt)};function dt(A,O,X){A.transparent===!0&&A.side===Fn&&A.forceSinglePass===!1?(A.side=Hn,A.needsUpdate=!0,Gt(A,O,X),A.side=cr,A.needsUpdate=!0,Gt(A,O,X),A.side=Fn):Gt(A,O,X)}this.compile=function(A,O,X=null){X===null&&(X=A),p=Me.get(X),p.init(O),y.push(p),X.traverseVisible(function(B){B.isLight&&B.layers.test(O.layers)&&(p.pushLight(B),B.castShadow&&p.pushShadow(B))}),A!==X&&A.traverseVisible(function(B){B.isLight&&B.layers.test(O.layers)&&(p.pushLight(B),B.castShadow&&p.pushShadow(B))}),p.setupLights();const Y=new Set;return A.traverse(function(B){if(!(B.isMesh||B.isPoints||B.isLine||B.isSprite))return;const ne=B.material;if(ne)if(Array.isArray(ne))for(let ue=0;ue<ne.length;ue++){const Ae=ne[ue];dt(Ae,X,B),Y.add(Ae)}else dt(ne,X,B),Y.add(ne)}),p=y.pop(),Y},this.compileAsync=function(A,O,X=null){const Y=this.compile(A,O,X);return new Promise(B=>{function ne(){if(Y.forEach(function(ue){Se.get(ue).currentProgram.isReady()&&Y.delete(ue)}),Y.size===0){B(A);return}setTimeout(ne,10)}Ue.get("KHR_parallel_shader_compile")!==null?ne():setTimeout(ne,10)})};let xe=null;function Le(A){xe&&xe(A)}function Ke(){He.stop()}function ge(){He.start()}const He=new n_;He.setAnimationLoop(Le),typeof self<"u"&&He.setContext(self),this.setAnimationLoop=function(A){xe=A,re.setAnimationLoop(A),A===null?He.stop():He.start()},re.addEventListener("sessionstart",Ke),re.addEventListener("sessionend",ge),this.render=function(A,O){if(O!==void 0&&O.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(M===!0)return;if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),re.enabled===!0&&re.isPresenting===!0&&(re.cameraAutoUpdate===!0&&re.updateCamera(O),O=re.getCamera()),A.isScene===!0&&A.onBeforeRender(b,A,O,R),p=Me.get(A,y.length),p.init(O),y.push(p),J.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),de.setFromProjectionMatrix(J,Fi,O.reversedDepth),q=this.localClippingEnabled,ye=ae.init(this.clippingPlanes,q),m=$.get(A,v.length),m.init(),v.push(m),re.enabled===!0&&re.isPresenting===!0){const ne=b.xr.getDepthSensingMesh();ne!==null&&Fe(ne,O,-1/0,b.sortObjects)}Fe(A,O,0,b.sortObjects),m.finish(),b.sortObjects===!0&&m.sort(te,L),Be=re.enabled===!1||re.isPresenting===!1||re.hasDepthSensing()===!1,Be&&me.addToRenderList(m,A),this.info.render.frame++,ye===!0&&ae.beginShadows();const X=p.state.shadowsArray;Ce.render(X,A,O),ye===!0&&ae.endShadows(),this.info.autoReset===!0&&this.info.reset();const Y=m.opaque,B=m.transmissive;if(p.setupLights(),O.isArrayCamera){const ne=O.cameras;if(B.length>0)for(let ue=0,Ae=ne.length;ue<Ae;ue++){const Ee=ne[ue];Ht(Y,B,A,Ee)}Be&&me.render(A);for(let ue=0,Ae=ne.length;ue<Ae;ue++){const Ee=ne[ue];je(m,A,Ee,Ee.viewport)}}else B.length>0&&Ht(Y,B,A,O),Be&&me.render(A),je(m,A,O);R!==null&&T===0&&(Ve.updateMultisampleRenderTarget(R),Ve.updateRenderTargetMipmap(R)),A.isScene===!0&&A.onAfterRender(b,A,O),he.resetDefaultState(),x=-1,S=null,y.pop(),y.length>0?(p=y[y.length-1],ye===!0&&ae.setGlobalState(b.clippingPlanes,p.state.camera)):p=null,v.pop(),v.length>0?m=v[v.length-1]:m=null};function Fe(A,O,X,Y){if(A.visible===!1)return;if(A.layers.test(O.layers)){if(A.isGroup)X=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(O);else if(A.isLight)p.pushLight(A),A.castShadow&&p.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||de.intersectsSprite(A)){Y&&Te.setFromMatrixPosition(A.matrixWorld).applyMatrix4(J);const ue=G.update(A),Ae=A.material;Ae.visible&&m.push(A,ue,Ae,X,Te.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||de.intersectsObject(A))){const ue=G.update(A),Ae=A.material;if(Y&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),Te.copy(A.boundingSphere.center)):(ue.boundingSphere===null&&ue.computeBoundingSphere(),Te.copy(ue.boundingSphere.center)),Te.applyMatrix4(A.matrixWorld).applyMatrix4(J)),Array.isArray(Ae)){const Ee=ue.groups;for(let ke=0,Ne=Ee.length;ke<Ne;ke++){const Ie=Ee[ke],Je=Ae[Ie.materialIndex];Je&&Je.visible&&m.push(A,ue,Je,X,Te.z,Ie)}}else Ae.visible&&m.push(A,ue,Ae,X,Te.z,null)}}const ne=A.children;for(let ue=0,Ae=ne.length;ue<Ae;ue++)Fe(ne[ue],O,X,Y)}function je(A,O,X,Y){const B=A.opaque,ne=A.transmissive,ue=A.transparent;p.setupLightsView(X),ye===!0&&ae.setGlobalState(b.clippingPlanes,X),Y&&F.viewport(C.copy(Y)),B.length>0&&Qe(B,O,X),ne.length>0&&Qe(ne,O,X),ue.length>0&&Qe(ue,O,X),F.buffers.depth.setTest(!0),F.buffers.depth.setMask(!0),F.buffers.color.setMask(!0),F.setPolygonOffset(!1)}function Ht(A,O,X,Y){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[Y.id]===void 0&&(p.state.transmissionRenderTarget[Y.id]=new _s(1,1,{generateMipmaps:!0,type:Ue.has("EXT_color_buffer_half_float")||Ue.has("EXT_color_buffer_float")?Do:zi,minFilter:er,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ft.workingColorSpace}));const ne=p.state.transmissionRenderTarget[Y.id],ue=Y.viewport||C;ne.setSize(ue.z*b.transmissionResolutionScale,ue.w*b.transmissionResolutionScale);const Ae=b.getRenderTarget(),Ee=b.getActiveCubeFace(),ke=b.getActiveMipmapLevel();b.setRenderTarget(ne),b.getClearColor(z),W=b.getClearAlpha(),W<1&&b.setClearColor(16777215,.5),b.clear(),Be&&me.render(X);const Ne=b.toneMapping;b.toneMapping=Lr;const Ie=Y.viewport;if(Y.viewport!==void 0&&(Y.viewport=void 0),p.setupLightsView(Y),ye===!0&&ae.setGlobalState(b.clippingPlanes,Y),Qe(A,X,Y),Ve.updateMultisampleRenderTarget(ne),Ve.updateRenderTargetMipmap(ne),Ue.has("WEBGL_multisampled_render_to_texture")===!1){let Je=!1;for(let at=0,Bt=O.length;at<Bt;at++){const Ct=O[at],Et=Ct.object,Ge=Ct.geometry,It=Ct.material,pt=Ct.group;if(It.side===Fn&&Et.layers.test(Y.layers)){const Wn=It.side;It.side=Hn,It.needsUpdate=!0,Pt(Et,X,Y,Ge,It,pt),It.side=Wn,It.needsUpdate=!0,Je=!0}}Je===!0&&(Ve.updateMultisampleRenderTarget(ne),Ve.updateRenderTargetMipmap(ne))}b.setRenderTarget(Ae,Ee,ke),b.setClearColor(z,W),Ie!==void 0&&(Y.viewport=Ie),b.toneMapping=Ne}function Qe(A,O,X){const Y=O.isScene===!0?O.overrideMaterial:null;for(let B=0,ne=A.length;B<ne;B++){const ue=A[B],Ae=ue.object,Ee=ue.geometry,ke=ue.group;let Ne=ue.material;Ne.allowOverride===!0&&Y!==null&&(Ne=Y),Ae.layers.test(X.layers)&&Pt(Ae,O,X,Ee,Ne,ke)}}function Pt(A,O,X,Y,B,ne){A.onBeforeRender(b,O,X,Y,B,ne),A.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),B.onBeforeRender(b,O,X,Y,A,ne),B.transparent===!0&&B.side===Fn&&B.forceSinglePass===!1?(B.side=Hn,B.needsUpdate=!0,b.renderBufferDirect(X,O,Y,B,A,ne),B.side=cr,B.needsUpdate=!0,b.renderBufferDirect(X,O,Y,B,A,ne),B.side=Fn):b.renderBufferDirect(X,O,Y,B,A,ne),A.onAfterRender(b,O,X,Y,B,ne)}function Gt(A,O,X){O.isScene!==!0&&(O=pe);const Y=Se.get(A),B=p.state.lights,ne=p.state.shadowsArray,ue=B.state.version,Ae=Z.getParameters(A,B.state,ne,O,X),Ee=Z.getProgramCacheKey(Ae);let ke=Y.programs;Y.environment=A.isMeshStandardMaterial?O.environment:null,Y.fog=O.fog,Y.envMap=(A.isMeshStandardMaterial?mt:$e).get(A.envMap||Y.environment),Y.envMapRotation=Y.environment!==null&&A.envMap===null?O.environmentRotation:A.envMapRotation,ke===void 0&&(A.addEventListener("dispose",ee),ke=new Map,Y.programs=ke);let Ne=ke.get(Ee);if(Ne!==void 0){if(Y.currentProgram===Ne&&Y.lightsStateVersion===ue)return Tt(A,Ae),Ne}else Ae.uniforms=Z.getUniforms(A),A.onBeforeCompile(Ae,b),Ne=Z.acquireProgram(Ae,Ee),ke.set(Ee,Ne),Y.uniforms=Ae.uniforms;const Ie=Y.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Ie.clippingPlanes=ae.uniform),Tt(A,Ae),Y.needsLights=Rt(A),Y.lightsStateVersion=ue,Y.needsLights&&(Ie.ambientLightColor.value=B.state.ambient,Ie.lightProbe.value=B.state.probe,Ie.directionalLights.value=B.state.directional,Ie.directionalLightShadows.value=B.state.directionalShadow,Ie.spotLights.value=B.state.spot,Ie.spotLightShadows.value=B.state.spotShadow,Ie.rectAreaLights.value=B.state.rectArea,Ie.ltc_1.value=B.state.rectAreaLTC1,Ie.ltc_2.value=B.state.rectAreaLTC2,Ie.pointLights.value=B.state.point,Ie.pointLightShadows.value=B.state.pointShadow,Ie.hemisphereLights.value=B.state.hemi,Ie.directionalShadowMap.value=B.state.directionalShadowMap,Ie.directionalShadowMatrix.value=B.state.directionalShadowMatrix,Ie.spotShadowMap.value=B.state.spotShadowMap,Ie.spotLightMatrix.value=B.state.spotLightMatrix,Ie.spotLightMap.value=B.state.spotLightMap,Ie.pointShadowMap.value=B.state.pointShadowMap,Ie.pointShadowMatrix.value=B.state.pointShadowMatrix),Y.currentProgram=Ne,Y.uniformsList=null,Ne}function At(A){if(A.uniformsList===null){const O=A.currentProgram.getUniforms();A.uniformsList=Gc.seqWithValue(O.seq,A.uniforms)}return A.uniformsList}function Tt(A,O){const X=Se.get(A);X.outputColorSpace=O.outputColorSpace,X.batching=O.batching,X.batchingColor=O.batchingColor,X.instancing=O.instancing,X.instancingColor=O.instancingColor,X.instancingMorph=O.instancingMorph,X.skinning=O.skinning,X.morphTargets=O.morphTargets,X.morphNormals=O.morphNormals,X.morphColors=O.morphColors,X.morphTargetsCount=O.morphTargetsCount,X.numClippingPlanes=O.numClippingPlanes,X.numIntersection=O.numClipIntersection,X.vertexAlphas=O.vertexAlphas,X.vertexTangents=O.vertexTangents,X.toneMapping=O.toneMapping}function bt(A,O,X,Y,B){O.isScene!==!0&&(O=pe),Ve.resetTextureUnits();const ne=O.fog,ue=Y.isMeshStandardMaterial?O.environment:null,Ae=R===null?b.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:Pn,Ee=(Y.isMeshStandardMaterial?mt:$e).get(Y.envMap||ue),ke=Y.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,Ne=!!X.attributes.tangent&&(!!Y.normalMap||Y.anisotropy>0),Ie=!!X.morphAttributes.position,Je=!!X.morphAttributes.normal,at=!!X.morphAttributes.color;let Bt=Lr;Y.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(Bt=b.toneMapping);const Ct=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,Et=Ct!==void 0?Ct.length:0,Ge=Se.get(Y),It=p.state.lights;if(ye===!0&&(q===!0||A!==S)){const xn=A===S&&Y.id===x;ae.setState(Y,A,xn)}let pt=!1;Y.version===Ge.__version?(Ge.needsLights&&Ge.lightsStateVersion!==It.state.version||Ge.outputColorSpace!==Ae||B.isBatchedMesh&&Ge.batching===!1||!B.isBatchedMesh&&Ge.batching===!0||B.isBatchedMesh&&Ge.batchingColor===!0&&B.colorTexture===null||B.isBatchedMesh&&Ge.batchingColor===!1&&B.colorTexture!==null||B.isInstancedMesh&&Ge.instancing===!1||!B.isInstancedMesh&&Ge.instancing===!0||B.isSkinnedMesh&&Ge.skinning===!1||!B.isSkinnedMesh&&Ge.skinning===!0||B.isInstancedMesh&&Ge.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&Ge.instancingColor===!1&&B.instanceColor!==null||B.isInstancedMesh&&Ge.instancingMorph===!0&&B.morphTexture===null||B.isInstancedMesh&&Ge.instancingMorph===!1&&B.morphTexture!==null||Ge.envMap!==Ee||Y.fog===!0&&Ge.fog!==ne||Ge.numClippingPlanes!==void 0&&(Ge.numClippingPlanes!==ae.numPlanes||Ge.numIntersection!==ae.numIntersection)||Ge.vertexAlphas!==ke||Ge.vertexTangents!==Ne||Ge.morphTargets!==Ie||Ge.morphNormals!==Je||Ge.morphColors!==at||Ge.toneMapping!==Bt||Ge.morphTargetsCount!==Et)&&(pt=!0):(pt=!0,Ge.__version=Y.version);let Wn=Ge.currentProgram;pt===!0&&(Wn=Gt(Y,O,B));let vs=!1,Xn=!1,Ea=!1;const Nt=Wn.getUniforms(),oi=Ge.uniforms;if(F.useProgram(Wn.program)&&(vs=!0,Xn=!0,Ea=!0),Y.id!==x&&(x=Y.id,Xn=!0),vs||S!==A){F.buffers.depth.getReversed()&&A.reversedDepth!==!0&&(A._reversedDepth=!0,A.updateProjectionMatrix()),Nt.setValue(D,"projectionMatrix",A.projectionMatrix),Nt.setValue(D,"viewMatrix",A.matrixWorldInverse);const Dn=Nt.map.cameraPosition;Dn!==void 0&&Dn.setValue(D,ce.setFromMatrixPosition(A.matrixWorld)),De.logarithmicDepthBuffer&&Nt.setValue(D,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(Y.isMeshPhongMaterial||Y.isMeshToonMaterial||Y.isMeshLambertMaterial||Y.isMeshBasicMaterial||Y.isMeshStandardMaterial||Y.isShaderMaterial)&&Nt.setValue(D,"isOrthographic",A.isOrthographicCamera===!0),S!==A&&(S=A,Xn=!0,Ea=!0)}if(B.isSkinnedMesh){Nt.setOptional(D,B,"bindMatrix"),Nt.setOptional(D,B,"bindMatrixInverse");const xn=B.skeleton;xn&&(xn.boneTexture===null&&xn.computeBoneTexture(),Nt.setValue(D,"boneTexture",xn.boneTexture,Ve))}B.isBatchedMesh&&(Nt.setOptional(D,B,"batchingTexture"),Nt.setValue(D,"batchingTexture",B._matricesTexture,Ve),Nt.setOptional(D,B,"batchingIdTexture"),Nt.setValue(D,"batchingIdTexture",B._indirectTexture,Ve),Nt.setOptional(D,B,"batchingColorTexture"),B._colorsTexture!==null&&Nt.setValue(D,"batchingColorTexture",B._colorsTexture,Ve));const ci=X.morphAttributes;if((ci.position!==void 0||ci.normal!==void 0||ci.color!==void 0)&&se.update(B,X,Wn),(Xn||Ge.receiveShadow!==B.receiveShadow)&&(Ge.receiveShadow=B.receiveShadow,Nt.setValue(D,"receiveShadow",B.receiveShadow)),Y.isMeshGouraudMaterial&&Y.envMap!==null&&(oi.envMap.value=Ee,oi.flipEnvMap.value=Ee.isCubeTexture&&Ee.isRenderTargetTexture===!1?-1:1),Y.isMeshStandardMaterial&&Y.envMap===null&&O.environment!==null&&(oi.envMapIntensity.value=O.environmentIntensity),Xn&&(Nt.setValue(D,"toneMappingExposure",b.toneMappingExposure),Ge.needsLights&&Vn(oi,Ea),ne&&Y.fog===!0&&Q.refreshFogUniforms(oi,ne),Q.refreshMaterialUniforms(oi,Y,H,j,p.state.transmissionRenderTarget[A.id]),Gc.upload(D,At(Ge),oi,Ve)),Y.isShaderMaterial&&Y.uniformsNeedUpdate===!0&&(Gc.upload(D,At(Ge),oi,Ve),Y.uniformsNeedUpdate=!1),Y.isSpriteMaterial&&Nt.setValue(D,"center",B.center),Nt.setValue(D,"modelViewMatrix",B.modelViewMatrix),Nt.setValue(D,"normalMatrix",B.normalMatrix),Nt.setValue(D,"modelMatrix",B.matrixWorld),Y.isShaderMaterial||Y.isRawShaderMaterial){const xn=Y.uniformsGroups;for(let Dn=0,bl=xn.length;Dn<bl;Dn++){const Br=xn[Dn];We.update(Br,Wn),We.bind(Br,Wn)}}return Wn}function Vn(A,O){A.ambientLightColor.needsUpdate=O,A.lightProbe.needsUpdate=O,A.directionalLights.needsUpdate=O,A.directionalLightShadows.needsUpdate=O,A.pointLights.needsUpdate=O,A.pointLightShadows.needsUpdate=O,A.spotLights.needsUpdate=O,A.spotLightShadows.needsUpdate=O,A.rectAreaLights.needsUpdate=O,A.hemisphereLights.needsUpdate=O}function Rt(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return E},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(A,O,X){const Y=Se.get(A);Y.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,Y.__autoAllocateDepthBuffer===!1&&(Y.__useRenderToTexture=!1),Se.get(A.texture).__webglTexture=O,Se.get(A.depthTexture).__webglTexture=Y.__autoAllocateDepthBuffer?void 0:X,Y.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,O){const X=Se.get(A);X.__webglFramebuffer=O,X.__useDefaultFramebuffer=O===void 0};const vn=D.createFramebuffer();this.setRenderTarget=function(A,O=0,X=0){R=A,E=O,T=X;let Y=!0,B=null,ne=!1,ue=!1;if(A){const Ee=Se.get(A);if(Ee.__useDefaultFramebuffer!==void 0)F.bindFramebuffer(D.FRAMEBUFFER,null),Y=!1;else if(Ee.__webglFramebuffer===void 0)Ve.setupRenderTarget(A);else if(Ee.__hasExternalTextures)Ve.rebindTextures(A,Se.get(A.texture).__webglTexture,Se.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const Ie=A.depthTexture;if(Ee.__boundDepthTexture!==Ie){if(Ie!==null&&Se.has(Ie)&&(A.width!==Ie.image.width||A.height!==Ie.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Ve.setupDepthRenderbuffer(A)}}const ke=A.texture;(ke.isData3DTexture||ke.isDataArrayTexture||ke.isCompressedArrayTexture)&&(ue=!0);const Ne=Se.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Ne[O])?B=Ne[O][X]:B=Ne[O],ne=!0):A.samples>0&&Ve.useMultisampledRTT(A)===!1?B=Se.get(A).__webglMultisampledFramebuffer:Array.isArray(Ne)?B=Ne[X]:B=Ne,C.copy(A.viewport),I.copy(A.scissor),U=A.scissorTest}else C.copy(K).multiplyScalar(H).floor(),I.copy(le).multiplyScalar(H).floor(),U=_e;if(X!==0&&(B=vn),F.bindFramebuffer(D.FRAMEBUFFER,B)&&Y&&F.drawBuffers(A,B),F.viewport(C),F.scissor(I),F.setScissorTest(U),ne){const Ee=Se.get(A.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+O,Ee.__webglTexture,X)}else if(ue){const Ee=O;for(let ke=0;ke<A.textures.length;ke++){const Ne=Se.get(A.textures[ke]);D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0+ke,Ne.__webglTexture,X,Ee)}}else if(A!==null&&X!==0){const Ee=Se.get(A.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Ee.__webglTexture,X)}x=-1},this.readRenderTargetPixels=function(A,O,X,Y,B,ne,ue,Ae=0){if(!(A&&A.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ee=Se.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&ue!==void 0&&(Ee=Ee[ue]),Ee){F.bindFramebuffer(D.FRAMEBUFFER,Ee);try{const ke=A.textures[Ae],Ne=ke.format,Ie=ke.type;if(!De.textureFormatReadable(Ne)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!De.textureTypeReadable(Ie)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=A.width-Y&&X>=0&&X<=A.height-B&&(A.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+Ae),D.readPixels(O,X,Y,B,Pe.convert(Ne),Pe.convert(Ie),ne))}finally{const ke=R!==null?Se.get(R).__webglFramebuffer:null;F.bindFramebuffer(D.FRAMEBUFFER,ke)}}},this.readRenderTargetPixelsAsync=async function(A,O,X,Y,B,ne,ue,Ae=0){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ee=Se.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&ue!==void 0&&(Ee=Ee[ue]),Ee)if(O>=0&&O<=A.width-Y&&X>=0&&X<=A.height-B){F.bindFramebuffer(D.FRAMEBUFFER,Ee);const ke=A.textures[Ae],Ne=ke.format,Ie=ke.type;if(!De.textureFormatReadable(Ne))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!De.textureTypeReadable(Ie))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Je=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,Je),D.bufferData(D.PIXEL_PACK_BUFFER,ne.byteLength,D.STREAM_READ),A.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+Ae),D.readPixels(O,X,Y,B,Pe.convert(Ne),Pe.convert(Ie),0);const at=R!==null?Se.get(R).__webglFramebuffer:null;F.bindFramebuffer(D.FRAMEBUFFER,at);const Bt=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await gv(D,Bt,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,Je),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,ne),D.deleteBuffer(Je),D.deleteSync(Bt),ne}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(A,O=null,X=0){const Y=Math.pow(2,-X),B=Math.floor(A.image.width*Y),ne=Math.floor(A.image.height*Y),ue=O!==null?O.x:0,Ae=O!==null?O.y:0;Ve.setTexture2D(A,0),D.copyTexSubImage2D(D.TEXTURE_2D,X,0,0,ue,Ae,B,ne),F.unbindTexture()};const ai=D.createFramebuffer(),Kt=D.createFramebuffer();this.copyTextureToTexture=function(A,O,X=null,Y=null,B=0,ne=null){ne===null&&(B!==0?(Co("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ne=B,B=0):ne=0);let ue,Ae,Ee,ke,Ne,Ie,Je,at,Bt;const Ct=A.isCompressedTexture?A.mipmaps[ne]:A.image;if(X!==null)ue=X.max.x-X.min.x,Ae=X.max.y-X.min.y,Ee=X.isBox3?X.max.z-X.min.z:1,ke=X.min.x,Ne=X.min.y,Ie=X.isBox3?X.min.z:0;else{const ci=Math.pow(2,-B);ue=Math.floor(Ct.width*ci),Ae=Math.floor(Ct.height*ci),A.isDataArrayTexture?Ee=Ct.depth:A.isData3DTexture?Ee=Math.floor(Ct.depth*ci):Ee=1,ke=0,Ne=0,Ie=0}Y!==null?(Je=Y.x,at=Y.y,Bt=Y.z):(Je=0,at=0,Bt=0);const Et=Pe.convert(O.format),Ge=Pe.convert(O.type);let It;O.isData3DTexture?(Ve.setTexture3D(O,0),It=D.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(Ve.setTexture2DArray(O,0),It=D.TEXTURE_2D_ARRAY):(Ve.setTexture2D(O,0),It=D.TEXTURE_2D),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,O.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,O.unpackAlignment);const pt=D.getParameter(D.UNPACK_ROW_LENGTH),Wn=D.getParameter(D.UNPACK_IMAGE_HEIGHT),vs=D.getParameter(D.UNPACK_SKIP_PIXELS),Xn=D.getParameter(D.UNPACK_SKIP_ROWS),Ea=D.getParameter(D.UNPACK_SKIP_IMAGES);D.pixelStorei(D.UNPACK_ROW_LENGTH,Ct.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,Ct.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,ke),D.pixelStorei(D.UNPACK_SKIP_ROWS,Ne),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Ie);const Nt=A.isDataArrayTexture||A.isData3DTexture,oi=O.isDataArrayTexture||O.isData3DTexture;if(A.isDepthTexture){const ci=Se.get(A),xn=Se.get(O),Dn=Se.get(ci.__renderTarget),bl=Se.get(xn.__renderTarget);F.bindFramebuffer(D.READ_FRAMEBUFFER,Dn.__webglFramebuffer),F.bindFramebuffer(D.DRAW_FRAMEBUFFER,bl.__webglFramebuffer);for(let Br=0;Br<Ee;Br++)Nt&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Se.get(A).__webglTexture,B,Ie+Br),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Se.get(O).__webglTexture,ne,Bt+Br)),D.blitFramebuffer(ke,Ne,ue,Ae,Je,at,ue,Ae,D.DEPTH_BUFFER_BIT,D.NEAREST);F.bindFramebuffer(D.READ_FRAMEBUFFER,null),F.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(B!==0||A.isRenderTargetTexture||Se.has(A)){const ci=Se.get(A),xn=Se.get(O);F.bindFramebuffer(D.READ_FRAMEBUFFER,ai),F.bindFramebuffer(D.DRAW_FRAMEBUFFER,Kt);for(let Dn=0;Dn<Ee;Dn++)Nt?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,ci.__webglTexture,B,Ie+Dn):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,ci.__webglTexture,B),oi?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,xn.__webglTexture,ne,Bt+Dn):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,xn.__webglTexture,ne),B!==0?D.blitFramebuffer(ke,Ne,ue,Ae,Je,at,ue,Ae,D.COLOR_BUFFER_BIT,D.NEAREST):oi?D.copyTexSubImage3D(It,ne,Je,at,Bt+Dn,ke,Ne,ue,Ae):D.copyTexSubImage2D(It,ne,Je,at,ke,Ne,ue,Ae);F.bindFramebuffer(D.READ_FRAMEBUFFER,null),F.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else oi?A.isDataTexture||A.isData3DTexture?D.texSubImage3D(It,ne,Je,at,Bt,ue,Ae,Ee,Et,Ge,Ct.data):O.isCompressedArrayTexture?D.compressedTexSubImage3D(It,ne,Je,at,Bt,ue,Ae,Ee,Et,Ct.data):D.texSubImage3D(It,ne,Je,at,Bt,ue,Ae,Ee,Et,Ge,Ct):A.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,ne,Je,at,ue,Ae,Et,Ge,Ct.data):A.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,ne,Je,at,Ct.width,Ct.height,Et,Ct.data):D.texSubImage2D(D.TEXTURE_2D,ne,Je,at,ue,Ae,Et,Ge,Ct);D.pixelStorei(D.UNPACK_ROW_LENGTH,pt),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,Wn),D.pixelStorei(D.UNPACK_SKIP_PIXELS,vs),D.pixelStorei(D.UNPACK_SKIP_ROWS,Xn),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Ea),ne===0&&O.generateMipmaps&&D.generateMipmap(It),F.unbindTexture()},this.initRenderTarget=function(A){Se.get(A).__webglFramebuffer===void 0&&Ve.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?Ve.setTextureCube(A,0):A.isData3DTexture?Ve.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?Ve.setTexture2DArray(A,0):Ve.setTexture2D(A,0),F.unbindTexture()},this.resetState=function(){E=0,T=0,R=null,F.reset(),he.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Fi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=ft._getDrawingBufferColorSpace(e),t.unpackColorSpace=ft._getUnpackColorSpace()}}function Wp(r,e){if(e===H0)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),r;if(e===Ch||e===Ng){let t=r.getIndex();if(t===null){const a=[],o=r.getAttribute("position");if(o!==void 0){for(let c=0;c<o.count;c++)a.push(c);r.setIndex(a),t=r.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),r}const n=t.count-2,i=[];if(e===Ch)for(let a=1;a<=n;a++)i.push(t.getX(0)),i.push(t.getX(a)),i.push(t.getX(a+1));else for(let a=0;a<n;a++)a%2===0?(i.push(t.getX(a)),i.push(t.getX(a+1)),i.push(t.getX(a+2))):(i.push(t.getX(a+2)),i.push(t.getX(a+1)),i.push(t.getX(a)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const s=r.clone();return s.setIndex(i),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),r}class pE extends Ma{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new vE(t)}),this.register(function(t){return new xE(t)}),this.register(function(t){return new CE(t)}),this.register(function(t){return new PE(t)}),this.register(function(t){return new DE(t)}),this.register(function(t){return new SE(t)}),this.register(function(t){return new ME(t)}),this.register(function(t){return new TE(t)}),this.register(function(t){return new EE(t)}),this.register(function(t){return new bE(t)}),this.register(function(t){return new wE(t)}),this.register(function(t){return new yE(t)}),this.register(function(t){return new RE(t)}),this.register(function(t){return new AE(t)}),this.register(function(t){return new gE(t)}),this.register(function(t){return new LE(t)}),this.register(function(t){return new IE(t)})}load(e,t,n,i){const s=this;let a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){const l=co.extractUrlBase(e);a=co.resolveURL(l,this.path)}else a=co.extractUrlBase(e);this.manager.itemStart(e);const o=function(l){i?i(l):console.error(l),s.manager.itemError(e),s.manager.itemEnd(e)},c=new e_(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{s.parse(l,a,function(u){t(u),s.manager.itemEnd(e)},o)}catch(u){o(u)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let s;const a={},o={},c=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===o_){try{a[ct.KHR_BINARY_GLTF]=new NE(e)}catch(h){i&&i(h);return}s=JSON.parse(a[ct.KHR_BINARY_GLTF].content)}else s=JSON.parse(c.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const l=new qE(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){const h=this.pluginCallbacks[u](l);h.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[h.name]=h,a[h.name]=!0}if(s.extensionsUsed)for(let u=0;u<s.extensionsUsed.length;++u){const h=s.extensionsUsed[u],f=s.extensionsRequired||[];switch(h){case ct.KHR_MATERIALS_UNLIT:a[h]=new _E;break;case ct.KHR_DRACO_MESH_COMPRESSION:a[h]=new UE(s,this.dracoLoader);break;case ct.KHR_TEXTURE_TRANSFORM:a[h]=new FE;break;case ct.KHR_MESH_QUANTIZATION:a[h]=new OE;break;default:f.indexOf(h)>=0&&o[h]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+h+'".')}}l.setExtensions(a),l.setPlugins(o),l.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,s){n.parse(e,t,i,s)})}}function mE(){let r={};return{get:function(e){return r[e]},add:function(e,t){r[e]=t},remove:function(e){delete r[e]},removeAll:function(){r={}}}}const ct={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class gE{constructor(e){this.parser=e,this.name=ct.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const s=t[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const s=t.json,c=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e];let l;const u=new qe(16777215);c.color!==void 0&&u.setRGB(c.color[0],c.color[1],c.color[2],Pn);const h=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new xx(u),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new bx(u),l.distance=h;break;case"spot":l=new gx(u),l.distance=h,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),Ci(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),i=Promise.resolve(l),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,s=n.json.nodes[e],o=(s.extensions&&s.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(c){return n._getNodeRef(t.cache,o,c)})}}class _E{constructor(){this.name=ct.KHR_MATERIALS_UNLIT}getMaterialType(){return tr}extendParams(e,t,n){const i=[];e.color=new qe(1,1,1),e.opacity=1;const s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){const a=s.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],Pn),e.opacity=a[3]}s.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",s.baseColorTexture,cn))}return Promise.all(i)}}class bE{constructor(e){this.parser=e,this.name=ct.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name].emissiveStrength;return s!==void 0&&(t.emissiveIntensity=s),Promise.resolve()}}class vE{constructor(e){this.parser=e,this.name=ct.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:vi}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];if(a.clearcoatFactor!==void 0&&(t.clearcoat=a.clearcoatFactor),a.clearcoatTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatMap",a.clearcoatTexture)),a.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=a.clearcoatRoughnessFactor),a.clearcoatRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatRoughnessMap",a.clearcoatRoughnessTexture)),a.clearcoatNormalTexture!==void 0&&(s.push(n.assignTexture(t,"clearcoatNormalMap",a.clearcoatNormalTexture)),a.clearcoatNormalTexture.scale!==void 0)){const o=a.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new lt(o,o)}return Promise.all(s)}}class xE{constructor(e){this.parser=e,this.name=ct.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:vi}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return t.dispersion=s.dispersion!==void 0?s.dispersion:0,Promise.resolve()}}class yE{constructor(e){this.parser=e,this.name=ct.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:vi}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];return a.iridescenceFactor!==void 0&&(t.iridescence=a.iridescenceFactor),a.iridescenceTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceMap",a.iridescenceTexture)),a.iridescenceIor!==void 0&&(t.iridescenceIOR=a.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),a.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=a.iridescenceThicknessMinimum),a.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=a.iridescenceThicknessMaximum),a.iridescenceThicknessTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceThicknessMap",a.iridescenceThicknessTexture)),Promise.all(s)}}class SE{constructor(e){this.parser=e,this.name=ct.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:vi}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[];t.sheenColor=new qe(0,0,0),t.sheenRoughness=0,t.sheen=1;const a=i.extensions[this.name];if(a.sheenColorFactor!==void 0){const o=a.sheenColorFactor;t.sheenColor.setRGB(o[0],o[1],o[2],Pn)}return a.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=a.sheenRoughnessFactor),a.sheenColorTexture!==void 0&&s.push(n.assignTexture(t,"sheenColorMap",a.sheenColorTexture,cn)),a.sheenRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"sheenRoughnessMap",a.sheenRoughnessTexture)),Promise.all(s)}}class ME{constructor(e){this.parser=e,this.name=ct.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:vi}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];return a.transmissionFactor!==void 0&&(t.transmission=a.transmissionFactor),a.transmissionTexture!==void 0&&s.push(n.assignTexture(t,"transmissionMap",a.transmissionTexture)),Promise.all(s)}}class TE{constructor(e){this.parser=e,this.name=ct.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:vi}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];t.thickness=a.thicknessFactor!==void 0?a.thicknessFactor:0,a.thicknessTexture!==void 0&&s.push(n.assignTexture(t,"thicknessMap",a.thicknessTexture)),t.attenuationDistance=a.attenuationDistance||1/0;const o=a.attenuationColor||[1,1,1];return t.attenuationColor=new qe().setRGB(o[0],o[1],o[2],Pn),Promise.all(s)}}class EE{constructor(e){this.parser=e,this.name=ct.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:vi}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return t.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}}class wE{constructor(e){this.parser=e,this.name=ct.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:vi}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];t.specularIntensity=a.specularFactor!==void 0?a.specularFactor:1,a.specularTexture!==void 0&&s.push(n.assignTexture(t,"specularIntensityMap",a.specularTexture));const o=a.specularColorFactor||[1,1,1];return t.specularColor=new qe().setRGB(o[0],o[1],o[2],Pn),a.specularColorTexture!==void 0&&s.push(n.assignTexture(t,"specularColorMap",a.specularColorTexture,cn)),Promise.all(s)}}class AE{constructor(e){this.parser=e,this.name=ct.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:vi}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];return t.bumpScale=a.bumpFactor!==void 0?a.bumpFactor:1,a.bumpTexture!==void 0&&s.push(n.assignTexture(t,"bumpMap",a.bumpTexture)),Promise.all(s)}}class RE{constructor(e){this.parser=e,this.name=ct.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:vi}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];return a.anisotropyStrength!==void 0&&(t.anisotropy=a.anisotropyStrength),a.anisotropyRotation!==void 0&&(t.anisotropyRotation=a.anisotropyRotation),a.anisotropyTexture!==void 0&&s.push(n.assignTexture(t,"anisotropyMap",a.anisotropyTexture)),Promise.all(s)}}class CE{constructor(e){this.parser=e,this.name=ct.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const s=i.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,a)}}class PE{constructor(e){this.parser=e,this.name=ct.EXT_TEXTURE_WEBP}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const a=s.extensions[t],o=i.images[a.source];let c=n.textureLoader;if(o.uri){const l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return n.loadTextureImage(e,a.source,c)}}class DE{constructor(e){this.parser=e,this.name=ct.EXT_TEXTURE_AVIF}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const a=s.extensions[t],o=i.images[a.source];let c=n.textureLoader;if(o.uri){const l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return n.loadTextureImage(e,a.source,c)}}class LE{constructor(e){this.name=ct.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],s=this.parser.getDependency("buffer",i.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(o){const c=i.byteOffset||0,l=i.byteLength||0,u=i.count,h=i.byteStride,f=new Uint8Array(o,c,l);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(u,h,f,i.mode,i.filter).then(function(d){return d.buffer}):a.ready.then(function(){const d=new ArrayBuffer(u*h);return a.decodeGltfBuffer(new Uint8Array(d),u,h,f,i.mode,i.filter),d})})}else return null}}class IE{constructor(e){this.name=ct.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const l of i.primitives)if(l.mode!==hi.TRIANGLES&&l.mode!==hi.TRIANGLE_STRIP&&l.mode!==hi.TRIANGLE_FAN&&l.mode!==void 0)return null;const a=n.extensions[this.name].attributes,o=[],c={};for(const l in a)o.push(this.parser.getDependency("accessor",a[l]).then(u=>(c[l]=u,c[l])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(l=>{const u=l.pop(),h=u.isGroup?u.children:[u],f=l[0].count,d=[];for(const g of h){const _=new tt,m=new k,p=new kr,v=new k(1,1,1),y=new jv(g.geometry,g.material,f);for(let b=0;b<f;b++)c.TRANSLATION&&m.fromBufferAttribute(c.TRANSLATION,b),c.ROTATION&&p.fromBufferAttribute(c.ROTATION,b),c.SCALE&&v.fromBufferAttribute(c.SCALE,b),y.setMatrixAt(b,_.compose(m,p,v));for(const b in c)if(b==="_COLOR_0"){const M=c[b];y.instanceColor=new Dh(M.array,M.itemSize,M.normalized)}else b!=="TRANSLATION"&&b!=="ROTATION"&&b!=="SCALE"&&g.geometry.setAttribute(b,c[b]);kt.prototype.copy.call(y,g),this.parser.assignFinalMaterial(y),d.push(y)}return u.isGroup?(u.clear(),u.add(...d),u):d[0]}))}}const o_="glTF",Ba=12,Xp={JSON:1313821514,BIN:5130562};class NE{constructor(e){this.name=ct.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,Ba),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==o_)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-Ba,s=new DataView(e,Ba);let a=0;for(;a<i;){const o=s.getUint32(a,!0);a+=4;const c=s.getUint32(a,!0);if(a+=4,c===Xp.JSON){const l=new Uint8Array(e,Ba+a,o);this.content=n.decode(l)}else if(c===Xp.BIN){const l=Ba+a;this.body=e.slice(l,l+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class UE{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=ct.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,s=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},c={},l={};for(const u in a){const h=Fh[u]||u.toLowerCase();o[h]=a[u]}for(const u in e.attributes){const h=Fh[u]||u.toLowerCase();if(a[u]!==void 0){const f=n.accessors[e.attributes[u]],d=ia[f.componentType];l[h]=d.name,c[h]=f.normalized===!0}}return t.getDependency("bufferView",s).then(function(u){return new Promise(function(h,f){i.decodeDracoFile(u,function(d){for(const g in d.attributes){const _=d.attributes[g],m=c[g];m!==void 0&&(_.normalized=m)}h(d)},o,l,Pn,f)})})}}class FE{constructor(){this.name=ct.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class OE{constructor(){this.name=ct.KHR_MESH_QUANTIZATION}}class c_ extends Io{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i*3+i;for(let a=0;a!==i;a++)t[a]=n[s+a];return t}interpolate_(e,t,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=o*2,l=o*3,u=i-t,h=(n-t)/u,f=h*h,d=f*h,g=e*l,_=g-l,m=-2*d+3*f,p=d-f,v=1-m,y=p-f+h;for(let b=0;b!==o;b++){const M=a[_+b+o],E=a[_+b+c]*u,T=a[g+b+o],R=a[g+b]*u;s[b]=v*M+y*E+m*T+p*R}return s}}const kE=new kr;class BE extends c_{interpolate_(e,t,n,i){const s=super.interpolate_(e,t,n,i);return kE.fromArray(s).normalize().toArray(s),s}}const hi={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},ia={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},jp={9728:Cn,9729:ni,9984:wg,9985:Oc,9986:Ya,9987:er},qp={33071:wr,33648:rl,10497:da},gu={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Fh={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},br={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},zE={CUBICSPLINE:void 0,LINEAR:Ao,STEP:wo},_u={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function HE(r){return r.DefaultMaterial===void 0&&(r.DefaultMaterial=new Rf({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:cr})),r.DefaultMaterial}function Yr(r,e,t){for(const n in t.extensions)r[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Ci(r,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(r.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function GE(r,e,t){let n=!1,i=!1,s=!1;for(let l=0,u=e.length;l<u;l++){const h=e[l];if(h.POSITION!==void 0&&(n=!0),h.NORMAL!==void 0&&(i=!0),h.COLOR_0!==void 0&&(s=!0),n&&i&&s)break}if(!n&&!i&&!s)return Promise.resolve(r);const a=[],o=[],c=[];for(let l=0,u=e.length;l<u;l++){const h=e[l];if(n){const f=h.POSITION!==void 0?t.getDependency("accessor",h.POSITION):r.attributes.position;a.push(f)}if(i){const f=h.NORMAL!==void 0?t.getDependency("accessor",h.NORMAL):r.attributes.normal;o.push(f)}if(s){const f=h.COLOR_0!==void 0?t.getDependency("accessor",h.COLOR_0):r.attributes.color;c.push(f)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c)]).then(function(l){const u=l[0],h=l[1],f=l[2];return n&&(r.morphAttributes.position=u),i&&(r.morphAttributes.normal=h),s&&(r.morphAttributes.color=f),r.morphTargetsRelative=!0,r})}function VE(r,e){if(r.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)r.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(r.morphTargetInfluences.length===t.length){r.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)r.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function WE(r){let e;const t=r.extensions&&r.extensions[ct.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+bu(t.attributes):e=r.indices+":"+bu(r.attributes)+":"+r.mode,r.targets!==void 0)for(let n=0,i=r.targets.length;n<i;n++)e+=":"+bu(r.targets[n]);return e}function bu(r){let e="";const t=Object.keys(r).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+r[t[n]]+";";return e}function Oh(r){switch(r){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function XE(r){return r.search(/\.jpe?g($|\?)/i)>0||r.search(/^data\:image\/jpeg/)===0?"image/jpeg":r.search(/\.webp($|\?)/i)>0||r.search(/^data\:image\/webp/)===0?"image/webp":r.search(/\.ktx2($|\?)/i)>0||r.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const jE=new tt;class qE{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new mE,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,s=!1,a=-1;if(typeof navigator<"u"){const o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;const c=o.match(/Version\/(\d+)/);i=n&&c?parseInt(c[1],10):-1,s=o.indexOf("Firefox")>-1,a=s?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||s&&a<98?this.textureLoader=new px(this.options.manager):this.textureLoader=new yx(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new e_(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){const o={scene:a[0][i.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:i.asset,parser:n,userData:{}};return Yr(s,o,i),Ci(o,i),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(o)})).then(function(){for(const c of o.scenes)c.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,s=t.length;i<s;i++){const a=t[i].joints;for(let o=0,c=a.length;o<c;o++)e[a[o]].isBone=!0}for(let i=0,s=e.length;i<s;i++){const a=e[i];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),s=(a,o)=>{const c=this.associations.get(a);c!=null&&this.associations.set(o,c);for(const[l,u]of a.children.entries())s(u,o.children[l])};return s(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const s=e(t[i]);s&&n.push(s)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":i=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(s,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[ct.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(s,a){n.load(co.resolveURL(t.uri,i.path),s,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const a=gu[i.type],o=ia[i.componentType],c=i.normalized===!0,l=new o(i.count*a);return Promise.resolve(new Yt(l,a,c))}const s=[];return i.bufferView!==void 0?s.push(this.getDependency("bufferView",i.bufferView)):s.push(null),i.sparse!==void 0&&(s.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(s).then(function(a){const o=a[0],c=gu[i.type],l=ia[i.componentType],u=l.BYTES_PER_ELEMENT,h=u*c,f=i.byteOffset||0,d=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,g=i.normalized===!0;let _,m;if(d&&d!==h){const p=Math.floor(f/d),v="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+p+":"+i.count;let y=t.cache.get(v);y||(_=new l(o,p*d,i.count*d/u),y=new Hv(_,d/u),t.cache.add(v,y)),m=new Mf(y,c,f%d/u,g)}else o===null?_=new l(i.count*c):_=new l(o,f,i.count*c),m=new Yt(_,c,g);if(i.sparse!==void 0){const p=gu.SCALAR,v=ia[i.sparse.indices.componentType],y=i.sparse.indices.byteOffset||0,b=i.sparse.values.byteOffset||0,M=new v(a[1],y,i.sparse.count*p),E=new l(a[2],b,i.sparse.count*c);o!==null&&(m=new Yt(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let T=0,R=M.length;T<R;T++){const x=M[T];if(m.setX(x,E[T*c]),c>=2&&m.setY(x,E[T*c+1]),c>=3&&m.setZ(x,E[T*c+2]),c>=4&&m.setW(x,E[T*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=g}return m})}loadTexture(e){const t=this.json,n=this.options,s=t.textures[e].source,a=t.images[s];let o=this.textureLoader;if(a.uri){const c=n.manager.getHandler(a.uri);c!==null&&(o=c)}return this.loadTextureImage(e,s,o)}loadTextureImage(e,t,n){const i=this,s=this.json,a=s.textures[e],o=s.images[t],c=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[c])return this.textureCache[c];const l=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=a.name||o.name||"",u.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(u.name=o.uri);const f=(s.samplers||{})[a.sampler]||{};return u.magFilter=jp[f.magFilter]||ni,u.minFilter=jp[f.minFilter]||er,u.wrapS=qp[f.wrapS]||da,u.wrapT=qp[f.wrapT]||da,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==Cn&&u.minFilter!==ni,i.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){const n=this,i=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(h=>h.clone());const a=i.images[e],o=self.URL||self.webkitURL;let c=a.uri||"",l=!1;if(a.bufferView!==void 0)c=n.getDependency("bufferView",a.bufferView).then(function(h){l=!0;const f=new Blob([h],{type:a.mimeType});return c=o.createObjectURL(f),c});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const u=Promise.resolve(c).then(function(h){return new Promise(function(f,d){let g=f;t.isImageBitmapLoader===!0&&(g=function(_){const m=new Qt(_);m.needsUpdate=!0,f(m)}),t.load(co.resolveURL(h,s.path),g,void 0,d)})}).then(function(h){return l===!0&&o.revokeObjectURL(c),Ci(h,a),h.userData.mimeType=a.mimeType||XE(a.uri),h}).catch(function(h){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),h});return this.sourceCache[e]=u,u}assignTexture(e,t,n,i){const s=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),s.extensions[ct.KHR_TEXTURE_TRANSFORM]){const o=n.extensions!==void 0?n.extensions[ct.KHR_TEXTURE_TRANSFORM]:void 0;if(o){const c=s.associations.get(a);a=s.extensions[ct.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),s.associations.set(a,c)}}return i!==void 0&&(a.colorSpace=i),e[t]=a,a})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){const o="PointsMaterial:"+n.uuid;let c=this.cache.get(o);c||(c=new wf,ki.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(o,c)),n=c}else if(e.isLine){const o="LineBasicMaterial:"+n.uuid;let c=this.cache.get(o);c||(c=new ol,ki.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(o,c)),n=c}if(i||s||a){let o="ClonedMaterial:"+n.uuid+":";i&&(o+="derivative-tangents:"),s&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let c=this.cache.get(o);c||(c=n.clone(),s&&(c.vertexColors=!0),a&&(c.flatShading=!0),i&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(o,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return Rf}loadMaterial(e){const t=this,n=this.json,i=this.extensions,s=n.materials[e];let a;const o={},c=s.extensions||{},l=[];if(c[ct.KHR_MATERIALS_UNLIT]){const h=i[ct.KHR_MATERIALS_UNLIT];a=h.getMaterialType(),l.push(h.extendParams(o,s,t))}else{const h=s.pbrMetallicRoughness||{};if(o.color=new qe(1,1,1),o.opacity=1,Array.isArray(h.baseColorFactor)){const f=h.baseColorFactor;o.color.setRGB(f[0],f[1],f[2],Pn),o.opacity=f[3]}h.baseColorTexture!==void 0&&l.push(t.assignTexture(o,"map",h.baseColorTexture,cn)),o.metalness=h.metallicFactor!==void 0?h.metallicFactor:1,o.roughness=h.roughnessFactor!==void 0?h.roughnessFactor:1,h.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(o,"metalnessMap",h.metallicRoughnessTexture)),l.push(t.assignTexture(o,"roughnessMap",h.metallicRoughnessTexture))),a=this._invokeOne(function(f){return f.getMaterialType&&f.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(f){return f.extendMaterialParams&&f.extendMaterialParams(e,o)})))}s.doubleSided===!0&&(o.side=Fn);const u=s.alphaMode||_u.OPAQUE;if(u===_u.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,u===_u.MASK&&(o.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&a!==tr&&(l.push(t.assignTexture(o,"normalMap",s.normalTexture)),o.normalScale=new lt(1,1),s.normalTexture.scale!==void 0)){const h=s.normalTexture.scale;o.normalScale.set(h,h)}if(s.occlusionTexture!==void 0&&a!==tr&&(l.push(t.assignTexture(o,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&a!==tr){const h=s.emissiveFactor;o.emissive=new qe().setRGB(h[0],h[1],h[2],Pn)}return s.emissiveTexture!==void 0&&a!==tr&&l.push(t.assignTexture(o,"emissiveMap",s.emissiveTexture,cn)),Promise.all(l).then(function(){const h=new a(o);return s.name&&(h.name=s.name),Ci(h,s),t.associations.set(h,{materials:e}),s.extensions&&Yr(i,h,s),h})}createUniqueName(e){const t=yt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function s(o){return n[ct.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(c){return Yp(c,o,t)})}const a=[];for(let o=0,c=e.length;o<c;o++){const l=e[o],u=WE(l),h=i[u];if(h)a.push(h.promise);else{let f;l.extensions&&l.extensions[ct.KHR_DRACO_MESH_COMPRESSION]?f=s(l):f=Yp(new Zt,l,t),i[u]={primitive:l,promise:f},a.push(f)}}return Promise.all(a)}loadMesh(e){const t=this,n=this.json,i=this.extensions,s=n.meshes[e],a=s.primitives,o=[];for(let c=0,l=a.length;c<l;c++){const u=a[c].material===void 0?HE(this.cache):this.getDependency("material",a[c].material);o.push(u)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(c){const l=c.slice(0,c.length-1),u=c[c.length-1],h=[];for(let d=0,g=u.length;d<g;d++){const _=u[d],m=a[d];let p;const v=l[d];if(m.mode===hi.TRIANGLES||m.mode===hi.TRIANGLE_STRIP||m.mode===hi.TRIANGLE_FAN||m.mode===void 0)p=s.isSkinnedMesh===!0?new Vv(_,v):new un(_,v),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===hi.TRIANGLE_STRIP?p.geometry=Wp(p.geometry,Ng):m.mode===hi.TRIANGLE_FAN&&(p.geometry=Wp(p.geometry,Ch));else if(m.mode===hi.LINES)p=new Lh(_,v);else if(m.mode===hi.LINE_STRIP)p=new gl(_,v);else if(m.mode===hi.LINE_LOOP)p=new $v(_,v);else if(m.mode===hi.POINTS)p=new Nh(_,v);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&VE(p,s),p.name=t.createUniqueName(s.name||"mesh_"+e),Ci(p,s),m.extensions&&Yr(i,p,m),t.assignFinalMaterial(p),h.push(p)}for(let d=0,g=h.length;d<g;d++)t.associations.set(h[d],{meshes:e,primitives:d});if(h.length===1)return s.extensions&&Yr(i,h[0],s),h[0];const f=new Zn;s.extensions&&Yr(i,f,s),t.associations.set(f,{meshes:e});for(let d=0,g=h.length;d<g;d++)f.add(h[d]);return f})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new In(pv.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new Df(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Ci(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,s=t.joints.length;i<s;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const s=i.pop(),a=i,o=[],c=[];for(let l=0,u=a.length;l<u;l++){const h=a[l];if(h){o.push(h);const f=new tt;s!==null&&f.fromArray(s.array,l*16),c.push(f)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new Tf(o,c)})}loadAnimation(e){const t=this.json,n=this,i=t.animations[e],s=i.name?i.name:"animation_"+e,a=[],o=[],c=[],l=[],u=[];for(let h=0,f=i.channels.length;h<f;h++){const d=i.channels[h],g=i.samplers[d.sampler],_=d.target,m=_.node,p=i.parameters!==void 0?i.parameters[g.input]:g.input,v=i.parameters!==void 0?i.parameters[g.output]:g.output;_.node!==void 0&&(a.push(this.getDependency("node",m)),o.push(this.getDependency("accessor",p)),c.push(this.getDependency("accessor",v)),l.push(g),u.push(_))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c),Promise.all(l),Promise.all(u)]).then(function(h){const f=h[0],d=h[1],g=h[2],_=h[3],m=h[4],p=[];for(let y=0,b=f.length;y<b;y++){const M=f[y],E=d[y],T=g[y],R=_[y],x=m[y];if(M===void 0)continue;M.updateMatrix&&M.updateMatrix();const S=n._createAnimationTracks(M,E,T,R,x);if(S)for(let C=0;C<S.length;C++)p.push(S[C])}const v=new ox(s,void 0,p);return Ci(v,i),v})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(s){const a=n._getNodeRef(n.meshCache,i.mesh,s);return i.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let c=0,l=i.weights.length;c<l;c++)o.morphTargetInfluences[c]=i.weights[c]}),a})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],s=n._loadNodeShallow(e),a=[],o=i.children||[];for(let l=0,u=o.length;l<u;l++)a.push(n.getDependency("node",o[l]));const c=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([s,Promise.all(a),c]).then(function(l){const u=l[0],h=l[1],f=l[2];f!==null&&u.traverse(function(d){d.isSkinnedMesh&&d.bind(f,jE)});for(let d=0,g=h.length;d<g;d++)u.add(h[d]);return u})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const s=t.nodes[e],a=s.name?i.createUniqueName(s.name):"",o=[],c=i._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&o.push(c),s.camera!==void 0&&o.push(i.getDependency("camera",s.camera).then(function(l){return i._getNodeRef(i.cameraCache,s.camera,l)})),i._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){o.push(l)}),this.nodeCache[e]=Promise.all(o).then(function(l){let u;if(s.isBone===!0?u=new jg:l.length>1?u=new Zn:l.length===1?u=l[0]:u=new kt,u!==l[0])for(let h=0,f=l.length;h<f;h++)u.add(l[h]);if(s.name&&(u.userData.name=s.name,u.name=a),Ci(u,s),s.extensions&&Yr(n,u,s),s.matrix!==void 0){const h=new tt;h.fromArray(s.matrix),u.applyMatrix4(h)}else s.translation!==void 0&&u.position.fromArray(s.translation),s.rotation!==void 0&&u.quaternion.fromArray(s.rotation),s.scale!==void 0&&u.scale.fromArray(s.scale);if(!i.associations.has(u))i.associations.set(u,{});else if(s.mesh!==void 0&&i.meshCache.refs[s.mesh]>1){const h=i.associations.get(u);i.associations.set(u,{...h})}return i.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,s=new Zn;n.name&&(s.name=i.createUniqueName(n.name)),Ci(s,n),n.extensions&&Yr(t,s,n);const a=n.nodes||[],o=[];for(let c=0,l=a.length;c<l;c++)o.push(i.getDependency("node",a[c]));return Promise.all(o).then(function(c){for(let u=0,h=c.length;u<h;u++)s.add(c[u]);const l=u=>{const h=new Map;for(const[f,d]of i.associations)(f instanceof ki||f instanceof Qt)&&h.set(f,d);return u.traverse(f=>{const d=i.associations.get(f);d!=null&&h.set(f,d)}),h};return i.associations=l(s),s})}_createAnimationTracks(e,t,n,i,s){const a=[],o=e.name?e.name:e.uuid,c=[];br[s.path]===br.weights?e.traverse(function(f){f.morphTargetInfluences&&c.push(f.name?f.name:f.uuid)}):c.push(o);let l;switch(br[s.path]){case br.weights:l=_a;break;case br.rotation:l=ba;break;case br.translation:case br.scale:l=va;break;default:n.itemSize===1?l=_a:l=va;break}const u=i.interpolation!==void 0?zE[i.interpolation]:Ao,h=this._getArrayFromAccessor(n);for(let f=0,d=c.length;f<d;f++){const g=new l(c[f]+"."+br[s.path],t.array,h,u);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),a.push(g)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=Oh(t.constructor),i=new Float32Array(t.length);for(let s=0,a=t.length;s<a;s++)i[s]=t[s]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const i=this instanceof ba?BE:c_;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function YE(r,e,t){const n=e.attributes,i=new ur;if(n.POSITION!==void 0){const o=t.json.accessors[n.POSITION],c=o.min,l=o.max;if(c!==void 0&&l!==void 0){if(i.set(new k(c[0],c[1],c[2]),new k(l[0],l[1],l[2])),o.normalized){const u=Oh(ia[o.componentType]);i.min.multiplyScalar(u),i.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const s=e.targets;if(s!==void 0){const o=new k,c=new k;for(let l=0,u=s.length;l<u;l++){const h=s[l];if(h.POSITION!==void 0){const f=t.json.accessors[h.POSITION],d=f.min,g=f.max;if(d!==void 0&&g!==void 0){if(c.setX(Math.max(Math.abs(d[0]),Math.abs(g[0]))),c.setY(Math.max(Math.abs(d[1]),Math.abs(g[1]))),c.setZ(Math.max(Math.abs(d[2]),Math.abs(g[2]))),f.normalized){const _=Oh(ia[f.componentType]);c.multiplyScalar(_)}o.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(o)}r.boundingBox=i;const a=new Gi;i.getCenter(a.center),a.radius=i.min.distanceTo(i.max)/2,r.boundingSphere=a}function Yp(r,e,t){const n=e.attributes,i=[];function s(a,o){return t.getDependency("accessor",a).then(function(c){r.setAttribute(o,c)})}for(const a in n){const o=Fh[a]||a.toLowerCase();o in r.attributes||i.push(s(n[a],o))}if(e.indices!==void 0&&!r.index){const a=t.getDependency("accessor",e.indices).then(function(o){r.setIndex(o)});i.push(a)}return ft.workingColorSpace!==Pn&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${ft.workingColorSpace}" not supported.`),Ci(r,e),YE(r,e,t),Promise.all(i).then(function(){return e.targets!==void 0?GE(r,e.targets,t):r})}var KE=(function(){var r="b9H79Tebbbe8Fv9Gbb9Gvuuuuueu9Giuuub9Geueu9Giuuueuikqbeeedddillviebeoweuec:q:Odkr;leDo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbeY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVbdE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbiL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtblK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949Wbol79IV9Rbrq;w8Wqdbk;esezu8Jjjjjbcj;eb9Rgv8Kjjjjbc9:hodnadcefal0mbcuhoaiRbbc:Ge9hmbavaialfgrad9Radz1jjjbhwcj;abad9Uc;WFbGgocjdaocjd6EhDaicefhocbhqdnindndndnaeaq9nmbaDaeaq9RaqaDfae6Egkcsfglcl4cifcd4hxalc9WGgmTmecbhPawcjdfhsaohzinaraz9Rax6mvarazaxfgo9RcK6mvczhlcbhHinalgic9WfgOawcj;cbffhldndndndndnazaOco4fRbbaHcoG4ciGPlbedibkal9cb83ibalcwf9cb83ibxikalaoRblaoRbbgOco4gAaAciSgAE86bbawcj;cbfaifglcGfaoclfaAfgARbbaOcl4ciGgCaCciSgCE86bbalcVfaAaCfgARbbaOcd4ciGgCaCciSgCE86bbalc7faAaCfgARbbaOciGgOaOciSgOE86bbalctfaAaOfgARbbaoRbegOco4gCaCciSgCE86bbalc91faAaCfgARbbaOcl4ciGgCaCciSgCE86bbalc4faAaCfgARbbaOcd4ciGgCaCciSgCE86bbalc93faAaCfgARbbaOciGgOaOciSgOE86bbalc94faAaOfgARbbaoRbdgOco4gCaCciSgCE86bbalc95faAaCfgARbbaOcl4ciGgCaCciSgCE86bbalc96faAaCfgARbbaOcd4ciGgCaCciSgCE86bbalc97faAaCfgARbbaOciGgOaOciSgOE86bbalc98faAaOfgORbbaoRbigoco4gAaAciSgAE86bbalc99faOaAfgORbbaocl4ciGgAaAciSgAE86bbalc9:faOaAfgORbbaocd4ciGgAaAciSgAE86bbalcufaOaAfglRbbaociGgoaociSgoE86bbalaofhoxdkalaoRbwaoRbbgOcl4gAaAcsSgAE86bbawcj;cbfaifglcGfaocwfaAfgARbbaOcsGgOaOcsSgOE86bbalcVfaAaOfgORbbaoRbegAcl4gCaCcsSgCE86bbalc7faOaCfgORbbaAcsGgAaAcsSgAE86bbalctfaOaAfgORbbaoRbdgAcl4gCaCcsSgCE86bbalc91faOaCfgORbbaAcsGgAaAcsSgAE86bbalc4faOaAfgORbbaoRbigAcl4gCaCcsSgCE86bbalc93faOaCfgORbbaAcsGgAaAcsSgAE86bbalc94faOaAfgORbbaoRblgAcl4gCaCcsSgCE86bbalc95faOaCfgORbbaAcsGgAaAcsSgAE86bbalc96faOaAfgORbbaoRbvgAcl4gCaCcsSgCE86bbalc97faOaCfgORbbaAcsGgAaAcsSgAE86bbalc98faOaAfgORbbaoRbogAcl4gCaCcsSgCE86bbalc99faOaCfgORbbaAcsGgAaAcsSgAE86bbalc9:faOaAfgORbbaoRbrgocl4gAaAcsSgAE86bbalcufaOaAfglRbbaocsGgoaocsSgoE86bbalaofhoxekalao8Pbb83bbalcwfaocwf8Pbb83bbaoczfhokdnaiam9pmbaHcdfhHaiczfhlarao9RcL0mekkaiam6mvaoTmvdnakTmbawaPfRbbhHawcj;cbfhlashiakhOinaialRbbgzce4cbazceG9R7aHfgH86bbaiadfhialcefhlaOcufgOmbkkascefhsaohzaPcefgPad9hmbxikkcbc99arao9Radcaadca0ESEhoxlkaoaxad2fhCdnakmbadhlinaoTmlarao9Rax6mlaoaxfhoalcufglmbkaChoxekcbhmawcjdfhAinarao9Rax6miawamfRbbhHawcj;cbfhlaAhiakhOinaialRbbgzce4cbazceG9R7aHfgH86bbaiadfhialcefhlaOcufgOmbkaAcefhAaoaxfhoamcefgmad9hmbkaChokabaqad2fawcjdfakad2z1jjjb8Aawawcjdfakcufad2fadz1jjjb8Aakaqfhqaombkc9:hoxekc9:hokavcj;ebf8Kjjjjbaok;cseHu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnaeci9UgrcHfal0mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgwce0mbavc;abfcFecjez:jjjjb8AavcUf9cu83ibavc8Wf9cu83ibavcyf9cu83ibavcaf9cu83ibavcKf9cu83ibavczf9cu83ibav9cu83iwav9cu83ibaialfc9WfhDaicefgqarfhidnaeTmbcmcsawceSEhkcbhxcbhmcbhPcbhwcbhlindnaiaD9nmbc9:hoxikdndnaqRbbgoc;Ve0mbavc;abfalaocu7gscl4fcsGcitfgzydlhrazydbhzdnaocsGgHak9pmbavawasfcsGcdtfydbaxaHEhoaHThsdndnadcd9hmbabaPcetfgHaz87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHazBdbaHcwfaoBdbaHclfarBdbkaxasfhxcdhHavawcdtfaoBdbawasfhwcehsalhOxdkdndnaHcsSmbaHc987aHamffcefhoxekaicefhoai8SbbgHcFeGhsdndnaHcu9mmbaohixekaicvfhiascFbGhscrhHdninao8SbbgOcFbGaHtasVhsaOcu9kmeaocefhoaHcrfgHc8J9hmbxdkkaocefhikasce4cbasceG9R7amfhokdndnadcd9hmbabaPcetfgHaz87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHazBdbaHcwfaoBdbaHclfarBdbkcdhHavawcdtfaoBdbcehsawcefhwalhOaohmxekdnaocpe0mbaxcefgHavawaDaocsGfRbbgocl49RcsGcdtfydbaocz6gzEhravawao9RcsGcdtfydbaHazfgAaocsGgHEhoaHThCdndnadcd9hmbabaPcetfgHax87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHaxBdbaHcwfaoBdbaHclfarBdbkcdhsavawcdtfaxBdbavawcefgwcsGcdtfarBdbcihHavc;abfalcitfgOaxBdlaOarBdbavawazfgwcsGcdtfaoBdbalcefcsGhOawaCfhwaxhzaAaCfhxxekaxcbaiRbbgOEgzaoc;:eSgHfhraOcsGhCaOcl4hAdndnaOcs0mbarcefhoxekarhoavawaA9RcsGcdtfydbhrkdndnaCmbaocefhxxekaohxavawaO9RcsGcdtfydbhokdndnaHTmbaicefhHxekaicdfhHai8SbegscFeGhzdnascu9kmbaicofhXazcFbGhzcrhidninaH8SbbgscFbGaitazVhzascu9kmeaHcefhHaicrfgic8J9hmbkaXhHxekaHcefhHkazce4cbazceG9R7amfgmhzkdndnaAcsSmbaHhsxekaHcefhsaH8SbbgicFeGhrdnaicu9kmbaHcvfhXarcFbGhrcrhidninas8SbbgHcFbGaitarVhraHcu9kmeascefhsaicrfgic8J9hmbkaXhsxekascefhskarce4cbarceG9R7amfgmhrkdndnaCcsSmbashixekascefhias8SbbgocFeGhHdnaocu9kmbascvfhXaHcFbGhHcrhodninai8SbbgscFbGaotaHVhHascu9kmeaicefhiaocrfgoc8J9hmbkaXhixekaicefhikaHce4cbaHceG9R7amfgmhokdndnadcd9hmbabaPcetfgHaz87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHazBdbaHcwfaoBdbaHclfarBdbkcdhsavawcdtfazBdbavawcefgwcsGcdtfarBdbcihHavc;abfalcitfgXazBdlaXarBdbavawaOcz6aAcsSVfgwcsGcdtfaoBdbawaCTaCcsSVfhwalcefcsGhOkaqcefhqavc;abfaOcitfgOarBdlaOaoBdbavc;abfalasfcsGcitfgraoBdlarazBdbawcsGhwalaHfcsGhlaPcifgPae6mbkkcbc99aiaDSEhokavc;aef8Kjjjjbaok:flevu8Jjjjjbcz9Rhvc9:hodnaecvfal0mbcuhoaiRbbc;:eGc;qe9hmbav9cb83iwaicefhraialfc98fhwdnaeTmbdnadcdSmbcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcdtfaic8Etc8F91aicd47avcwfaiceGcdtVgoydbfglBdbaoalBdbaDcefgDae9hmbxdkkcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcetfaic8Etc8F91aicd47avcwfaiceGcdtVgoydbfgl87ebaoalBdbaDcefgDae9hmbkkcbc99arawSEhokaok:Lvoeue99dud99eud99dndnadcl9hmbaeTmeindndnabcdfgd8Sbb:Yab8Sbbgi:Ygl:l:tabcefgv8Sbbgo:Ygr:l:tgwJbb;:9cawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai86bbdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad86bbdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad86bbabclfhbaecufgembxdkkaeTmbindndnabclfgd8Ueb:Yab8Uebgi:Ygl:l:tabcdfgv8Uebgo:Ygr:l:tgwJb;:FSawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai87ebdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad87ebdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad87ebabcwfhbaecufgembkkk;oiliui99iue99dnaeTmbcbhiabhlindndnJ;Zl81Zalcof8UebgvciV:Y:vgoal8Ueb:YNgrJb;:FSNJbbbZJbbb:;arJbbbb9GEMgw:lJbbb9p9DTmbaw:OhDxekcjjjj94hDkalclf8Uebhqalcdf8UebhkabaiavcefciGfcetfaD87ebdndnaoak:YNgwJb;:FSNJbbbZJbbb:;awJbbbb9GEMgx:lJbbb9p9DTmbax:OhDxekcjjjj94hDkabaiavciGfgkcd7cetfaD87ebdndnaoaq:YNgoJb;:FSNJbbbZJbbb:;aoJbbbb9GEMgx:lJbbb9p9DTmbax:OhDxekcjjjj94hDkabaiavcufciGfcetfaD87ebdndnJbbjZararN:tawawN:taoaoN:tgrJbbbbarJbbbb9GE:rJb;:FSNJbbbZMgr:lJbbb9p9DTmbar:Ohvxekcjjjj94hvkabakcetfav87ebalcwfhlaiclfhiaecufgembkkk9mbdnadcd4ae2gdTmbinababydbgecwtcw91:Yaece91cjjj98Gcjjj;8if::NUdbabclfhbadcufgdmbkkk9teiucbcbydj1jjbgeabcifc98GfgbBdj1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik;LeeeudndnaeabVciGTmbabhixekdndnadcz9pmbabhixekabhiinaiaeydbBdbaiclfaeclfydbBdbaicwfaecwfydbBdbaicxfaecxfydbBdbaeczfheaiczfhiadc9Wfgdcs0mbkkadcl6mbinaiaeydbBdbaeclfheaiclfhiadc98fgdci0mbkkdnadTmbinaiaeRbb86bbaicefhiaecefheadcufgdmbkkabk;aeedudndnabciGTmbabhixekaecFeGc:b:c:ew2hldndnadcz9pmbabhixekabhiinaialBdbaicxfalBdbaicwfalBdbaiclfalBdbaiczfhiadc9Wfgdcs0mbkkadcl6mbinaialBdbaiclfhiadc98fgdci0mbkkdnadTmbinaiae86bbaicefhiadcufgdmbkkabkkkebcjwklzNbb",e="b9H79TebbbeKl9Gbb9Gvuuuuueu9Giuuub9Geueuikqbbebeedddilve9Weeeviebeoweuec:q:6dkr;leDo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbdY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVblE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtboK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbrL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949Wbwl79IV9RbDq:p9sqlbzik9:evu8Jjjjjbcz9Rhbcbheincbhdcbhiinabcwfadfaicjuaead4ceGglE86bbaialfhiadcefgdcw9hmbkaec:q:yjjbfai86bbaecitc:q1jjbfab8Piw83ibaecefgecjd9hmbkk:N8JlHud97euo978Jjjjjbcj;kb9Rgv8Kjjjjbc9:hodnadcefal0mbcuhoaiRbbc:Ge9hmbavaialfgrad9Rad;8qbbcj;abad9UhlaicefhodnaeTmbadTmbalc;WFbGglcjdalcjd6EhwcbhDinawaeaD9RaDawfae6Egqcsfglc9WGgkci2hxakcethmalcl4cifcd4hPabaDad2fhsakc;ab6hzcbhHincbhOaohAdndninaraA9RaP6meavcj;cbfaOak2fhCaAaPfhocbhidnazmbarao9Rc;Gb6mbcbhlinaCalfhidndndndndnaAalco4fRbbgXciGPlbedibkaipxbbbbbbbbbbbbbbbbpklbxikaiaopbblaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbaoclfaYpQbfaKc:q:yjjbfRbbfhoxdkaiaopbbwaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbaocwfaYpQbfaKc:q:yjjbfRbbfhoxekaiaopbbbpklbaoczfhokdndndndndnaXcd4ciGPlbedibkaipxbbbbbbbbbbbbbbbbpklzxikaiaopbblaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklzaoclfaYpQbfaKc:q:yjjbfRbbfhoxdkaiaopbbwaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklzaocwfaYpQbfaKc:q:yjjbfRbbfhoxekaiaopbbbpklzaoczfhokdndndndndnaXcl4ciGPlbedibkaipxbbbbbbbbbbbbbbbbpklaxikaiaopbblaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklaaoclfaYpQbfaKc:q:yjjbfRbbfhoxdkaiaopbbwaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklaaocwfaYpQbfaKc:q:yjjbfRbbfhoxekaiaopbbbpklaaoczfhokdndndndndnaXco4Plbedibkaipxbbbbbbbbbbbbbbbbpkl8WxikaiaopbblaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibaXc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkl8WaoclfaYpQbfaXc:q:yjjbfRbbfhoxdkaiaopbbwaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibaXc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkl8WaocwfaYpQbfaXc:q:yjjbfRbbfhoxekaiaopbbbpkl8Waoczfhokalc;abfhialcjefak0meaihlarao9Rc;Fb0mbkkdnaiak9pmbaici4hlinarao9RcK6miaCaifhXdndndndndnaAaico4fRbbalcoG4ciGPlbedibkaXpxbbbbbbbbbbbbbbbbpkbbxikaXaopbblaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkbbaoclfaYpQbfaKc:q:yjjbfRbbfhoxdkaXaopbbwaopbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkbbaocwfaYpQbfaKc:q:yjjbfRbbfhoxekaXaopbbbpkbbaoczfhokalcdfhlaiczfgiak6mbkkaoTmeaohAaOcefgOclSmdxbkkc9:hoxlkdnakTmbavcjdfaHfhiavaHfpbdbhYcbhXinaiavcj;cbfaXfglpblbgLcep9TaLpxeeeeeeeeeeeeeeeegQp9op9Hp9rgLalakfpblbg8Acep9Ta8AaQp9op9Hp9rg8ApmbzeHdOiAlCvXoQrLgEalamfpblbg3cep9Ta3aQp9op9Hp9rg3alaxfpblbg5cep9Ta5aQp9op9Hp9rg5pmbzeHdOiAlCvXoQrLg8EpmbezHdiOAlvCXorQLgQaQpmbedibedibedibediaYp9UgYp9AdbbaiadfglaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaladfglaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaladfglaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaladfglaYaEa8EpmwDKYqk8AExm35Ps8E8FgQaQpmbedibedibedibedip9UgYp9AdbbaladfglaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaladfglaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaladfglaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaladfglaYaLa8ApmwKDYq8AkEx3m5P8Es8FgLa3a5pmwKDYq8AkEx3m5P8Es8Fg8ApmbezHdiOAlvCXorQLgQaQpmbedibedibedibedip9UgYp9AdbbaladfglaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaladfglaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaladfglaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaladfglaYaLa8ApmwDKYqk8AExm35Ps8E8FgQaQpmbedibedibedibedip9UgYp9AdbbaladfglaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaladfglaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaladfglaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaladfhiaXczfgXak6mbkkaHclfgHad6mbkasavcjdfaqad2;8qbbavavcjdfaqcufad2fad;8qbbaqaDfgDae6mbkkcbc99arao9Radcaadca0ESEhokavcj;kbf8Kjjjjbaokwbz:bjjjbk::seHu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnaeci9UgrcHfal0mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgwce0mbavc;abfcFecje;8kbavcUf9cu83ibavc8Wf9cu83ibavcyf9cu83ibavcaf9cu83ibavcKf9cu83ibavczf9cu83ibav9cu83iwav9cu83ibaialfc9WfhDaicefgqarfhidnaeTmbcmcsawceSEhkcbhxcbhmcbhPcbhwcbhlindnaiaD9nmbc9:hoxikdndnaqRbbgoc;Ve0mbavc;abfalaocu7gscl4fcsGcitfgzydlhrazydbhzdnaocsGgHak9pmbavawasfcsGcdtfydbaxaHEhoaHThsdndnadcd9hmbabaPcetfgHaz87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHazBdbaHcwfaoBdbaHclfarBdbkaxasfhxcdhHavawcdtfaoBdbawasfhwcehsalhOxdkdndnaHcsSmbaHc987aHamffcefhoxekaicefhoai8SbbgHcFeGhsdndnaHcu9mmbaohixekaicvfhiascFbGhscrhHdninao8SbbgOcFbGaHtasVhsaOcu9kmeaocefhoaHcrfgHc8J9hmbxdkkaocefhikasce4cbasceG9R7amfhokdndnadcd9hmbabaPcetfgHaz87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHazBdbaHcwfaoBdbaHclfarBdbkcdhHavawcdtfaoBdbcehsawcefhwalhOaohmxekdnaocpe0mbaxcefgHavawaDaocsGfRbbgocl49RcsGcdtfydbaocz6gzEhravawao9RcsGcdtfydbaHazfgAaocsGgHEhoaHThCdndnadcd9hmbabaPcetfgHax87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHaxBdbaHcwfaoBdbaHclfarBdbkcdhsavawcdtfaxBdbavawcefgwcsGcdtfarBdbcihHavc;abfalcitfgOaxBdlaOarBdbavawazfgwcsGcdtfaoBdbalcefcsGhOawaCfhwaxhzaAaCfhxxekaxcbaiRbbgOEgzaoc;:eSgHfhraOcsGhCaOcl4hAdndnaOcs0mbarcefhoxekarhoavawaA9RcsGcdtfydbhrkdndnaCmbaocefhxxekaohxavawaO9RcsGcdtfydbhokdndnaHTmbaicefhHxekaicdfhHai8SbegscFeGhzdnascu9kmbaicofhXazcFbGhzcrhidninaH8SbbgscFbGaitazVhzascu9kmeaHcefhHaicrfgic8J9hmbkaXhHxekaHcefhHkazce4cbazceG9R7amfgmhzkdndnaAcsSmbaHhsxekaHcefhsaH8SbbgicFeGhrdnaicu9kmbaHcvfhXarcFbGhrcrhidninas8SbbgHcFbGaitarVhraHcu9kmeascefhsaicrfgic8J9hmbkaXhsxekascefhskarce4cbarceG9R7amfgmhrkdndnaCcsSmbashixekascefhias8SbbgocFeGhHdnaocu9kmbascvfhXaHcFbGhHcrhodninai8SbbgscFbGaotaHVhHascu9kmeaicefhiaocrfgoc8J9hmbkaXhixekaicefhikaHce4cbaHceG9R7amfgmhokdndnadcd9hmbabaPcetfgHaz87ebaHclfao87ebaHcdfar87ebxekabaPcdtfgHazBdbaHcwfaoBdbaHclfarBdbkcdhsavawcdtfazBdbavawcefgwcsGcdtfarBdbcihHavc;abfalcitfgXazBdlaXarBdbavawaOcz6aAcsSVfgwcsGcdtfaoBdbawaCTaCcsSVfhwalcefcsGhOkaqcefhqavc;abfaOcitfgOarBdlaOaoBdbavc;abfalasfcsGcitfgraoBdlarazBdbawcsGhwalaHfcsGhlaPcifgPae6mbkkcbc99aiaDSEhokavc;aef8Kjjjjbaok:flevu8Jjjjjbcz9Rhvc9:hodnaecvfal0mbcuhoaiRbbc;:eGc;qe9hmbav9cb83iwaicefhraialfc98fhwdnaeTmbdnadcdSmbcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcdtfaic8Etc8F91aicd47avcwfaiceGcdtVgoydbfglBdbaoalBdbaDcefgDae9hmbxdkkcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcetfaic8Etc8F91aicd47avcwfaiceGcdtVgoydbfgl87ebaoalBdbaDcefgDae9hmbkkcbc99arawSEhokaok:wPliuo97eue978Jjjjjbca9Rhiaec98Ghldndnadcl9hmbdnalTmbcbhvabhdinadadpbbbgocKp:RecKp:Sep;6egraocwp:RecKp:Sep;6earp;Geaoczp:RecKp:Sep;6egwp;Gep;Kep;LegDpxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgkp9op9rp;Kegrpxbb;:9cbb;:9cbb;:9cbb;:9cararp;MeaDaDp;Meawaqawakp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFbbbFbbbFbbbFbbbp9oaopxbbbFbbbFbbbFbbbFp9op9qarawp;Meaqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaDawp;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpkbbadczfhdavclfgval6mbkkalaeSmeaipxbbbbbbbbbbbbbbbbgqpklbaiabalcdtfgdaeciGglcdtgv;8qbbdnalTmbaiaipblbgocKp:RecKp:Sep;6egraocwp:RecKp:Sep;6earp;Geaoczp:RecKp:Sep;6egwp;Gep;Kep;LegDaqp:2egqarpxbbbjbbbjbbbjbbbjgkp9op9rp;Kegrpxbb;:9cbb;:9cbb;:9cbb;:9cararp;MeaDaDp;Meawaqawakp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFbbbFbbbFbbbFbbbp9oaopxbbbFbbbFbbbFbbbFp9op9qarawp;Meaqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaDawp;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpklbkadaiav;8qbbskdnalTmbcbhvabhdinadczfgxaxpbbbgopxbbbbbbFFbbbbbbFFgkp9oadpbbbgDaopmbediwDqkzHOAKY8AEgwczp:Reczp:Sep;6egraDaopmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eawczp:Sep;6egwp;Gearp;Gep;Kep;Legopxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgmp9op9rp;Kegrpxb;:FSb;:FSb;:FSb;:FSararp;Meaoaop;Meawaqawamp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFFbbFFbbFFbbFFbbp9oaoawp;Meaqp;Keczp:Rep9qgoarawp;Meaqp;KepxFFbbFFbbFFbbFFbbp9ogrpmwDKYqk8AExm35Ps8E8Fp9qpkbbadaDakp9oaoarpmbezHdiOAlvCXorQLp9qpkbbadcafhdavclfgval6mbkkalaeSmbaiaeciGgvcitgdfcbcaad9R;8kbaiabalcitfglad;8qbbdnavTmbaiaipblzgopxbbbbbbFFbbbbbbFFgkp9oaipblbgDaopmbediwDqkzHOAKY8AEgwczp:Reczp:Sep;6egraDaopmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eawczp:Sep;6egwp;Gearp;Gep;Kep;Legopxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgmp9op9rp;Kegrpxb;:FSb;:FSb;:FSb;:FSararp;Meaoaop;Meawaqawamp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFFbbFFbbFFbbFFbbp9oaoawp;Meaqp;Keczp:Rep9qgoarawp;Meaqp;KepxFFbbFFbbFFbbFFbbp9ogrpmwDKYqk8AExm35Ps8E8Fp9qpklzaiaDakp9oaoarpmbezHdiOAlvCXorQLp9qpklbkalaiad;8qbbkk;4wllue97euv978Jjjjjbc8W9Rhidnaec98GglTmbcbhvabhoinaiaopbbbgraoczfgwpbbbgDpmlvorxmPsCXQL358E8Fgqczp:Segkclp:RepklbaopxbbjZbbjZbbjZbbjZpx;Zl81Z;Zl81Z;Zl81Z;Zl81Zakpxibbbibbbibbbibbbp9qp;6ep;NegkaraDpmbediwDqkzHOAKY8AEgrczp:Reczp:Sep;6ep;MegDaDp;Meakarczp:Sep;6ep;Megxaxp;Meakaqczp:Reczp:Sep;6ep;Megqaqp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jepxb;:FSb;:FSb;:FSb;:FSgkp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbgmp9oaxakp;Mearp;Keczp:Rep9qgxaDakp;Mearp;Keamp9oaqakp;Mearp;Keczp:Rep9qgkpmbezHdiOAlvCXorQLgrp5baipblbpEb:T:j83ibaocwfarp5eaipblbpEe:T:j83ibawaxakpmwDKYqk8AExm35Ps8E8Fgkp5baipblbpEd:T:j83ibaocKfakp5eaipblbpEi:T:j83ibaocafhoavclfgval6mbkkdnalaeSmbaiaeciGgvcitgofcbcaao9R;8kbaiabalcitfgwao;8qbbdnavTmbaiaipblbgraipblzgDpmlvorxmPsCXQL358E8Fgqczp:Segkclp:RepklaaipxbbjZbbjZbbjZbbjZpx;Zl81Z;Zl81Z;Zl81Z;Zl81Zakpxibbbibbbibbbibbbp9qp;6ep;NegkaraDpmbediwDqkzHOAKY8AEgrczp:Reczp:Sep;6ep;MegDaDp;Meakarczp:Sep;6ep;Megxaxp;Meakaqczp:Reczp:Sep;6ep;Megqaqp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jepxb;:FSb;:FSb;:FSb;:FSgkp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbgmp9oaxakp;Mearp;Keczp:Rep9qgxaDakp;Mearp;Keamp9oaqakp;Mearp;Keczp:Rep9qgkpmbezHdiOAlvCXorQLgrp5baipblapEb:T:j83ibaiarp5eaipblapEe:T:j83iwaiaxakpmwDKYqk8AExm35Ps8E8Fgkp5baipblapEd:T:j83izaiakp5eaipblapEi:T:j83iKkawaiao;8qbbkk:Pddiue978Jjjjjbc;ab9Rhidnadcd4ae2glc98GgvTmbcbheabhdinadadpbbbgocwp:Recwp:Sep;6eaocep:SepxbbjFbbjFbbjFbbjFp9opxbbjZbbjZbbjZbbjZp:Uep;Mepkbbadczfhdaeclfgeav6mbkkdnavalSmbaialciGgecdtgdVcbc;abad9R;8kbaiabavcdtfgvad;8qbbdnaeTmbaiaipblbgocwp:Recwp:Sep;6eaocep:SepxbbjFbbjFbbjFbbjFp9opxbbjZbbjZbbjZbbjZp:Uep;Mepklbkavaiad;8qbbkk9teiucbcbydj1jjbgeabcifc98GfgbBdj1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaikkkebcjwklz:Dbb",t=new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,3,2,0,0,5,3,1,0,1,12,1,0,10,22,2,12,0,65,0,65,0,65,0,252,10,0,0,11,7,0,65,0,253,15,26,11]),n=new Uint8Array([32,0,65,2,1,106,34,33,3,128,11,4,13,64,6,253,10,7,15,116,127,5,8,12,40,16,19,54,20,9,27,255,113,17,42,67,24,23,146,148,18,14,22,45,70,69,56,114,101,21,25,63,75,136,108,28,118,29,73,115]);if(typeof WebAssembly!="object")return{supported:!1};var i=WebAssembly.validate(t)?o(e):o(r),s,a=WebAssembly.instantiate(i,{}).then(function(p){s=p.instance,s.exports.__wasm_call_ctors()});function o(p){for(var v=new Uint8Array(p.length),y=0;y<p.length;++y){var b=p.charCodeAt(y);v[y]=b>96?b-97:b>64?b-39:b+4}for(var M=0,y=0;y<p.length;++y)v[M++]=v[y]<60?n[v[y]]:(v[y]-60)*64+v[++y];return v.buffer.slice(0,M)}function c(p,v,y,b,M,E,T){var R=p.exports.sbrk,x=b+3&-4,S=R(x*M),C=R(E.length),I=new Uint8Array(p.exports.memory.buffer);I.set(E,C);var U=v(S,b,M,C,E.length);if(U==0&&T&&T(S,x,M),y.set(I.subarray(S,S+b*M)),R(S-R(0)),U!=0)throw new Error("Malformed buffer data: "+U)}var l={NONE:"",OCTAHEDRAL:"meshopt_decodeFilterOct",QUATERNION:"meshopt_decodeFilterQuat",EXPONENTIAL:"meshopt_decodeFilterExp"},u={ATTRIBUTES:"meshopt_decodeVertexBuffer",TRIANGLES:"meshopt_decodeIndexBuffer",INDICES:"meshopt_decodeIndexSequence"},h=[],f=0;function d(p){var v={object:new Worker(p),pending:0,requests:{}};return v.object.onmessage=function(y){var b=y.data;v.pending-=b.count,v.requests[b.id][b.action](b.value),delete v.requests[b.id]},v}function g(p){for(var v="self.ready = WebAssembly.instantiate(new Uint8Array(["+new Uint8Array(i)+"]), {}).then(function(result) { result.instance.exports.__wasm_call_ctors(); return result.instance; });self.onmessage = "+m.name+";"+c.toString()+m.toString(),y=new Blob([v],{type:"text/javascript"}),b=URL.createObjectURL(y),M=h.length;M<p;++M)h[M]=d(b);for(var M=p;M<h.length;++M)h[M].object.postMessage({});h.length=p,URL.revokeObjectURL(b)}function _(p,v,y,b,M){for(var E=h[0],T=1;T<h.length;++T)h[T].pending<E.pending&&(E=h[T]);return new Promise(function(R,x){var S=new Uint8Array(y),C=++f;E.pending+=p,E.requests[C]={resolve:R,reject:x},E.object.postMessage({id:C,count:p,size:v,source:S,mode:b,filter:M},[S.buffer])})}function m(p){var v=p.data;if(!v.id)return self.close();self.ready.then(function(y){try{var b=new Uint8Array(v.count*v.size);c(y,y.exports[v.mode],b,v.count,v.size,v.source,y.exports[v.filter]),self.postMessage({id:v.id,count:v.count,action:"resolve",value:b},[b.buffer])}catch(M){self.postMessage({id:v.id,count:v.count,action:"reject",value:M})}})}return{ready:a,supported:!0,useWorkers:function(p){g(p)},decodeVertexBuffer:function(p,v,y,b,M){c(s,s.exports.meshopt_decodeVertexBuffer,p,v,y,b,s.exports[l[M]])},decodeIndexBuffer:function(p,v,y,b){c(s,s.exports.meshopt_decodeIndexBuffer,p,v,y,b)},decodeIndexSequence:function(p,v,y,b){c(s,s.exports.meshopt_decodeIndexSequence,p,v,y,b)},decodeGltfBuffer:function(p,v,y,b,M,E){c(s,s.exports[u[M]],p,v,y,b,s.exports[l[E]])},decodeGltfBufferAsync:function(p,v,y,b,M){return h.length>0?_(p,v,y,u[b],l[M]):a.then(function(){var E=new Uint8Array(p*v);return c(s,s.exports[u[b]],E,p,v,y,s.exports[l[M]]),E})}}})();const es=3.2,Vc=new k(0,1.12,.02),$E=new k(0,1.06,.155).sub(Vc).multiplyScalar(es),kh={yaw:0,pitch:0,lift:0,solid:1,cloud:0,after:.2,scanY:1.2,laser:0,rings:0,explode:0,settle:1,silo:0,sort:0,dots:1},JE=r=>{const e=r.toLowerCase();return/rectus abdominis|linea alba/.test(e)?"rect":/oblique|transvers/.test(e)&&!/head/.test(e)?"abd":/vertebra|disk|sacrum|hip bone|rib|sternum|cartilage|coccyx|costal/.test(e)?"bone":/psoas|iliacus|quadratus|serratus anterior|pectoralis major/.test(e)?"deep":null};function Mc(r,e){const t={uDissolve:{value:0},uEdge:{value:new qe("#5fe8c8")}},n=new vi({color:r,roughness:e.rough,metalness:0,clearcoat:e.coat,clearcoatRoughness:.32,sheen:e.sheen,sheenColor:new qe(e.tint),envMapIntensity:1.15,side:Fn});return n.onBeforeCompile=i=>{i.uniforms.uDissolve=t.uDissolve,i.uniforms.uEdge=t.uEdge,i.vertexShader=i.vertexShader.replace("#include <common>",`#include <common>
varying vec3 vObj;`).replace("#include <begin_vertex>",`#include <begin_vertex>
vObj = position;`),i.fragmentShader=i.fragmentShader.replace("#include <common>",`#include <common>
        varying vec3 vObj; uniform float uDissolve; uniform vec3 uEdge;
        float anHash(vec3 p){ p = fract(p * 0.3183099 + 0.1); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }
        float anNoise(vec3 x){ vec3 i = floor(x), f = fract(x); f = f*f*(3.0-2.0*f);
          return mix(mix(mix(anHash(i), anHash(i+vec3(1,0,0)), f.x), mix(anHash(i+vec3(0,1,0)), anHash(i+vec3(1,1,0)), f.x), f.y),
                     mix(mix(anHash(i+vec3(0,0,1)), anHash(i+vec3(1,0,1)), f.x), mix(anHash(i+vec3(0,1,1)), anHash(i+vec3(1,1,1)), f.x), f.y), f.z); }`).replace("#include <clipping_planes_fragment>",`#include <clipping_planes_fragment>
        float anField = (anNoise(vObj * 5.5) * 0.5 + anNoise(vObj * 11.0) * 0.1) * 0.25 + (0.5 + vObj.y * 0.55) * 0.8;
        float anCut = uDissolve * 1.45 - 0.2;
        if (uDissolve > 0.001 && anField < anCut) discard;
        float anEdge = (uDissolve > 0.001) ? 1.0 - smoothstep(0.0, 0.03, anField - anCut) : 0.0;`).replace("#include <color_fragment>",`#include <color_fragment>
        diffuseColor.rgb *= 0.82 + 0.36 * anNoise(vObj * 24.0);`).replace("#include <normal_fragment_maps>",`#include <normal_fragment_maps>
        {
          float h = anNoise(vObj * vec3(${e.streak.toFixed(1)}, ${(e.streak*5).toFixed(1)}, ${e.streak.toFixed(1)})) * 0.6 + anNoise(vObj * 150.0) * 0.4;
          vec3 sp = -vViewPosition; vec3 sx = dFdx(sp), sy = dFdy(sp);
          vec3 r1 = cross(sy, normal), r2 = cross(normal, sx); float det = dot(sx, r1);
          vec3 g = sign(det) * (dFdx(h) * r1 + dFdy(h) * r2) * ${e.bump.toFixed(4)};
          normal = normalize(abs(det) * normal - g);
        }`).replace("#include <opaque_fragment>",`outgoingLight += uEdge * anEdge * 2.4;
#include <opaque_fragment>`)},n.customProgramCacheKey=()=>`gs-layer-${r}`,{material:n,u:t}}function ZE(){const r=document.createElement("canvas");r.width=r.height=64;const e=r.getContext("2d"),t=e.createRadialGradient(32,32,3,32,32,30);return t.addColorStop(0,"#fff"),t.addColorStop(.5,"#fff"),t.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=t,e.fillRect(0,0,64,64),new Jv(r)}class aw{root=new Zn;spin=new Zn;wall=new Zn;deep=new Zn;bones=new Zn;anchors={wall:new k,deep:new k,bone:new k,silo:new k};count=0;mats=[];cloud;cloudMat;laserBeam;laserGlow;silo=new Zn;siloLines;siloGlass;rings=[];dotsGeo;dotsMat;dots;dotPos;ready=!1;constructor(){this.spin.add(this.bones,this.deep,this.wall),this.root.add(this.spin),this.laserBeam=new un(new ga(2.6,.012),new tr({color:"#8affdf",transparent:!0,opacity:0,blending:ts,depthWrite:!1,side:Fn})),this.laserGlow=new un(new ga(2.6,.34),new tr({color:"#2fd9b0",transparent:!0,opacity:0,blending:ts,depthWrite:!1,side:Fn})),this.laserBeam.position.z=this.laserGlow.position.z=.2,this.root.add(this.laserBeam,this.laserGlow);const e=.36*es,t=.05*es,n=.025*es;this.siloGlass=new vi({color:"#ffb066",roughness:.08,metalness:0,transmission:0,transparent:!0,opacity:.2,side:Fn,depthWrite:!1,clearcoat:1,emissive:new qe("#ff7a1a"),emissiveIntensity:.25}),this.siloLines=new ol({color:"#ffa23c",transparent:!0,opacity:0,blending:ts});const i=new un(Kp(t,n,e),this.siloGlass),s=new Lh(new Zv(Kp(t,n,e),20),this.siloLines),a=[];for(let u=0;u<=8;u++){const h=u/8,f=t+(n-t)*h;for(let d=0;d<48;d++){const g=d/48*6.2832,_=(d+1)/48*6.2832;a.push(Math.cos(g)*f,Math.sin(g)*f,h*e,Math.cos(_)*f,Math.sin(_)*f,h*e)}}const o=new Zt;o.setAttribute("position",new en(a,3)),this.silo.add(i,s,new Lh(o,this.siloLines)),this.silo.position.copy($E),this.silo.quaternion.setFromUnitVectors(new k(0,0,1),new k(0,.35,.94).normalize()),this.wall.add(this.silo);for(const[u,h,f]of[[1.32,.25,.5],[1.62,-.35,.3]]){const d=[];for(let m=0;m<=128;m++){const p=m/128*6.2832;d.push(Math.cos(p)*u,0,Math.sin(p)*u)}const g=new Zt;g.setAttribute("position",new en(d,3));const _=new gl(g,new ol({color:"#cfe9e2",transparent:!0,opacity:0,blending:ts}));_.rotation.x=h,_.userData.op=f,this.rings.push(_),this.root.add(_)}this.dotPos=new Float32Array(126);const c=new Float32Array(126),l=[[.56,.6,.67],[1,.62,.24],[.2,.9,.78]];for(let u=0;u<42;u++)c.set(l[u<19?0:u<27?1:2],u*3);this.dotsGeo=new Zt,this.dotsGeo.setAttribute("position",new Yt(this.dotPos,3)),this.dotsGeo.setAttribute("color",new Yt(c,3)),this.dotsMat=new wf({map:ZE(),alphaTest:.05,size:.06,vertexColors:!0,transparent:!0,opacity:0,depthWrite:!1,sizeAttenuation:!0}),this.dots=new Nh(this.dotsGeo,this.dotsMat),this.dots.frustumCulled=!1,this.root.add(this.dots)}async load(e){const t=new pE;t.setMeshoptDecoder(KE);const n=await t.loadAsync(e);n.scene.updateMatrixWorld(!0);const i=Mc("#d8cbb2",{rough:.5,coat:.12,sheen:.5,tint:"#fff2dc",streak:60,bump:.0012}),s=Mc("#ff9a62",{rough:.4,coat:.6,sheen:.4,tint:"#ffb089",streak:14,bump:.006}),a=Mc("#d2605a",{rough:.42,coat:.55,sheen:.4,tint:"#ff8f80",streak:12,bump:.006}),o=Mc("#8f3a46",{rough:.45,coat:.45,sheen:.35,tint:"#c86478",streak:10,bump:.005});this.mats=[i,s,a,o];const c={bone:i.material,rect:s.material,abd:a.material,deep:o.material},l=[];let u=0;n.scene.traverse(g=>{const _=g;if(!_.isMesh)return;const m=_.userData.name??_.name,p=JE(m);if(!p)return;const v=_.geometry,y=v.attributes.position,b=y.count,M=new Float32Array(b*3),E=new k;for(let C=0;C<b;C++)E.set(y.getX(C),y.getY(C),y.getZ(C)).applyMatrix4(_.matrixWorld),M[C*3]=E.x,M[C*3+1]=E.y,M[C*3+2]=E.z;const T=M.reduce((C,I,U)=>U%3===0?C+M[U]:C,0)/b,R=M.reduce((C,I,U)=>U%3===1?C+M[U]:C,0)/b;if(!(R>.86&&R<1.4&&Math.abs(T)<.24))return;for(let C=0;C<b;C++)M[C*3]=(M[C*3]-Vc.x)*es,M[C*3+1]=(M[C*3+1]-Vc.y)*es,M[C*3+2]=(M[C*3+2]-Vc.z)*es;const x=new Zt;x.setAttribute("position",new Yt(M,3)),v.index&&x.setIndex(v.index.clone()),x.computeVertexNormals();const S=new un(x,c[p]);S.name=m,(p==="bone"?this.bones:p==="deep"?this.deep:this.wall).add(S);for(let C=0;C<b;C+=p==="bone"?2:1)l.push(M[C*3],M[C*3+1],M[C*3+2]),u++}),this.count=u;const h=new Float32Array(l),f=new Float32Array(u);for(let g=0;g<u;g++)f[g]=Math.random();const d=new Zt;d.setAttribute("position",new Yt(h,3)),d.setAttribute("aRnd",new Yt(f,1)),this.cloudMat=new lr({transparent:!0,depthWrite:!1,blending:ts,uniforms:{uScan:{value:1.2},uCloud:{value:0},uAfter:{value:.2},uSettle:{value:1},uScale:{value:800},uTime:{value:0}},vertexShader:`attribute float aRnd; uniform float uScan,uCloud,uAfter,uSettle,uScale,uTime; varying float vA; varying float vG;
        void main(){ vec3 p = position;
          float d = (1.0 - uSettle);
          p += (vec3(sin(aRnd*91.0+uTime*.7), cos(aRnd*57.0+uTime*.5), sin(aRnd*33.0+uTime*.9)) * .9) * d * d;
          float scanned = step(uScan, p.y);
          float near = exp(-max(0.0, p.y - uScan) * 5.0);
          vA = uCloud * scanned * mix(uAfter, 1.0, near);
          vG = exp(-pow((p.y - uScan) * 22.0, 2.0));
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_PointSize = max(1.0, (0.0105 + vG * 0.018) * uScale / -mv.z);
          gl_Position = projectionMatrix * mv; }`,fragmentShader:`varying float vA; varying float vG; void main(){ float d = length(gl_PointCoord - .5); if (d > .5 || vA < .01) discard;
        gl_FragColor = vec4(mix(vec3(.37,.91,.78), vec3(1.,1.,1.), vG), vA * (1.0 - smoothstep(.2, .5, d))); }`}),this.cloud=new Nh(d,this.cloudMat),this.cloud.frustumCulled=!1,this.spin.add(this.cloud),this.ready=!0}apply(e,t,n){this.spin.rotation.set(e.pitch,e.yaw,0),this.spin.position.y=e.lift,this.wall.position.z=.62*e.explode,this.deep.position.z=.04*e.explode,this.bones.position.z=-.55*e.explode;const i=1-e.solid;for(const o of this.mats)o.u.uDissolve.value=i;this.wall.visible=this.deep.visible=this.bones.visible=i<.999,this.anchors.wall.set(.62,.34,.74+.62*e.explode),this.anchors.deep.set(-.55,-.1,.18+.04*e.explode),this.anchors.bone.set(.35,-.55,-.35-.55*e.explode),this.anchors.silo.set(0,-.1+.2*e.silo,.8+.6*e.silo+.62*e.explode);const s=Math.max(.001,e.silo);if(this.silo.scale.set(1,1,s),this.silo.visible=e.silo>.002,this.siloLines.opacity=Math.min(1,e.silo*1.4)*(.75+.25*Math.sin(t*2.4)),this.siloGlass.opacity=.22*Math.min(1,e.silo*1.4),this.cloudMat){const o=this.cloudMat.uniforms;o.uScan.value=e.scanY,o.uCloud.value=e.cloud,o.uAfter.value=e.after,o.uSettle.value=e.settle,o.uScale.value=n,o.uTime.value=t}this.laserBeam.position.y=this.laserGlow.position.y=e.scanY,this.laserBeam.rotation.y=this.laserGlow.rotation.y=0,this.laserBeam.material.opacity=.95*e.laser,this.laserGlow.material.opacity=.16*e.laser,this.laserBeam.visible=this.laserGlow.visible=e.laser>.01,this.rings.forEach((o,c)=>{o.material.opacity=o.userData.op*e.rings,o.rotation.y=t*(.06+c*.03)*(c?-1:1)});const a=[-.2,0,.2];for(let o=0;o<42;o++){const c=o<19?0:o<27?1:2,l=c===0?o:c===1?o-19:o-27,u=this.rings[o%2],h=o%2?1.62:1.32,f=t*(.22+c*.04)*(o%2?-1:1)+o*.7,d=Math.cos(f)*h,g=Math.sin(f)*h,_=d,m=g,p=Math.cos(u.rotation.y)*_+Math.sin(u.rotation.y)*m,v=-Math.sin(u.rotation.y)*_+Math.cos(u.rotation.y)*m,y=Math.sin(u.rotation.x)*v,b=Math.cos(u.rotation.x)*v,M=e.sort*e.sort*(3-2*e.sort),E=-.95+c*.95+a[c]*0,T=-.92+l*.062*(c===0?1:1.9),R=1.25;this.dotPos[o*3]=p+(E-p)*M,this.dotPos[o*3+1]=y+(T-y)*M,this.dotPos[o*3+2]=b+(R-b)*M}this.dotsGeo.attributes.position.needsUpdate=!0,this.dotsMat.opacity=e.dots*Math.max(e.rings,e.sort),this.dotsMat.size=.055}}function Kp(r,e,t){const i=[],s=[];for(let o=0;o<=1;o++)for(let c=0;c<36;c++){const l=c/36*6.2832,u=o?e:r;i.push(Math.cos(l)*u,Math.sin(l)*u,o*t)}for(let o=0;o<36;o++){const c=(o+1)%36;s.push(o,c,36+o,c,36+c,36+o)}const a=new Zt;return a.setAttribute("position",new en(i,3)),a.setIndex(s),a.computeVertexNormals(),a}const Tc={key:1,rim:1,beam:1,bloom:.55,floor:1,pool:1,dial:1},za=(r,e,t)=>{const n=Math.max(0,Math.min(1,(t-r)/(e-r)));return n*n*(3-2*n)},ir=(r,e,t)=>r+(e-r)*t,QE=r=>Math.max(0,Math.min(1,((1-r)/2-.02)*1.15)),wi=[{id:"hero",hud:"hud.s0",cam:[0,.25,6.2],target:[0,-.25,0],fov:26,shift:.14,hero:{yaw:-.5,pitch:.03,rings:1,cloud:.5,after:.22,scanY:-1.2,settle:1},light:{floor:1}},{id:"defect",hud:"hud.s1",cam:[.6,.1,5.6],target:[0,-.05,0],fov:26,shift:.2,hero:{yaw:-.45,pitch:.04,solid:0,cloud:1,after:.95,laser:1,rings:.6},light:{bloom:.9,rim:.8,beam:1.2},drive:r=>({scanY:ir(.98,-.98,r),solid:QE(ir(.98,-.98,r)),yaw:-.45+r*.95,silo:za(.72,.98,r),laser:1-za(.94,1,r)})},{id:"layers",hud:"hud.s2",cam:[2.4,.35,6.2],target:[.05,-.05,.2],fov:27,shift:.15,hero:{yaw:-.62,pitch:.08,silo:1,rings:0},light:{bloom:.65,rim:1.2,beam:1.2},drive:r=>({explode:za(.1,.55,r),yaw:-.62+za(.45,1,r)*.5,pitch:.08-za(.5,1,r)*.06})},{id:"evidence",hud:"hud.s3",cam:[-.1,.1,6],target:[0,-.2,.3],fov:26,shift:-.2,hero:{yaw:.25,pitch:.02,silo:1,sort:1,rings:.6,cloud:.2,after:.2,scanY:-1.2},light:{bloom:.7,beam:1.1}}],$p=(r,e,t)=>[ir(r[0],e[0],t),ir(r[1],e[1],t),ir(r[2],e[2],t)],ew=r=>{const e=Math.max(0,Math.min(1,(r-.18)/.64));return e*e*e*(e*(e*6-15)+10)},Jp=(r,e)=>({...kh,...r.hero,...r.drive?r.drive(e):{}});function ow(r,e,t,n){const i=wi.length,s=x=>r[x].top+r[x].height/2,a=e+t/2;let o=0;for(let x=0;x<i-1;x++)a>=s(x)&&(o=x);const c=Math.min(i-1,o+1),l=Math.max(1,s(c)-s(o)),u=o===c?0:Math.max(0,Math.min(1,(a-s(o))/l)),h=o===c?0:ew(u),f=x=>{const S=r[x];return Math.max(0,Math.min(1,(e-S.top)/Math.max(1,S.height-t)))},d=wi[o],g=wi[c],_=Jp(d,f(o)),m=Jp(g,f(c)),p={...kh};for(const x of Object.keys(kh))p[x]=ir(_[x],m[x],h);const v={...Tc};for(const x of Object.keys(Tc))v[x]=ir(d.light[x]??Tc[x],g.light[x]??Tc[x],h);const y=n?1.5:1,b=d.cam.map((x,S)=>S===2?x*y:x),M=g.cam.map((x,S)=>S===2?x*y:x),E=$p(b,M,h);E[1]+=Math.sin(h*Math.PI)*.18,E[0]+=Math.sin(h*Math.PI)*.22*(o%2?-1:1);const T=$p(d.target,g.target,h);n&&(T[1]-=.2);const R=h>.5?c:o;return{cam:E,target:T,fov:ir(d.fov,g.fov,h)*(n?1.12:1),shift:n?0:ir(d.shift,g.shift,h),hero:p,light:v,active:R,u:o+h,sub:f(R)}}function tw(r,e){const t=matchMedia("(prefers-reduced-motion: reduce)").matches,n=matchMedia("(pointer: coarse)").matches,i=wi.length,s=document.createElement("nav");s.className="rail-nav",s.setAttribute("aria-label","Chapters"),s.innerHTML='<i class="rail-line"><i class="rail-fill"></i></i>'+wi.map((g,_)=>`<button type="button" class="rail-tick" data-i="${_}"><span class="rail-lbl">${wc(g.hud)}</span></button>`).join(""),document.body.appendChild(s);const a=[...s.querySelectorAll(".rail-tick")],o=s.querySelector(".rail-fill");a.forEach((g,_)=>g.addEventListener("click",()=>e(_))),vu(()=>a.forEach((g,_)=>{g.querySelector(".rail-lbl").textContent=wc(wi[_].hud)}));const c=r.map((g,_)=>{const m=document.createElement("div");return m.className="ghost-num"+(_%2?" left":""),m.setAttribute("aria-hidden","true"),m.textContent=String(_).padStart(2,"0"),g.appendChild(m),m}),l=document.createElement("div");l.className="sweep",l.setAttribute("aria-hidden","true"),document.body.appendChild(l);let u=-1;const h=(g,_)=>{if(t){g.textContent=_;return}const m="ABCDEFGHJKLMNPRSTUVWXYZ0123456789#/%",p={p:0};Dt.to(p,{p:1,duration:.55,ease:"none",onUpdate:()=>{const v=Math.floor(p.p*_.length);g.textContent=_.slice(0,v)+[..._.slice(v)].map(y=>y===" "?" ":m[Math.random()*m.length|0]).join("")},onComplete:()=>{g.textContent=_}})};let f=null;if(!n&&!t){f=document.createElement("div"),f.className="reticle",f.setAttribute("aria-hidden","true"),f.innerHTML="<i></i><b></b>",document.body.appendChild(f);const g=Dt.quickTo(f,"x",{duration:.35,ease:"power3"}),_=Dt.quickTo(f,"y",{duration:.35,ease:"power3"});window.addEventListener("pointermove",m=>{g(m.clientX),_(m.clientY),f.classList.add("on")},{passive:!0}),document.addEventListener("pointerover",m=>{f.classList.toggle("hot",!!m.target.closest("a, button, .tool"))}),document.addEventListener("pointerleave",()=>f.classList.remove("on")),document.querySelectorAll(".cta, .nav-cta").forEach(m=>{const p=Dt.quickTo(m,"x",{duration:.4,ease:"power3"}),v=Dt.quickTo(m,"y",{duration:.4,ease:"power3"});m.addEventListener("pointermove",y=>{const b=m.getBoundingClientRect();p((y.clientX-b.left-b.width/2)*.22),v((y.clientY-b.top-b.height/2)*.3)}),m.addEventListener("pointerleave",()=>{p(0),v(0)})})}const d=r.map(g=>g.querySelector(".copy, .hero-copy, .studio-copy"));return(g,_,m)=>{if(o.style.height=`${g/(i-1)*100}%`,a.forEach((v,y)=>v.classList.toggle("on",y===_)),_!==u){if(u>=0&&!t){const v=_>u?1:-1;Dt.fromTo(l,{yPercent:v>0?-100:100,opacity:1},{yPercent:v>0?100:-100,duration:.95,ease:"power2.inOut",onComplete:()=>{Dt.set(l,{opacity:0})}});const y=document.getElementById("hud-stage");y&&h(y,wc(wi[_].hud))}u=_}if(t)return;const p=innerHeight;r.forEach((v,y)=>{const b=v.getBoundingClientRect();if(b.bottom<-200||b.top>p+200)return;Dt.set(c[y],{y:-b.top*.18});const M=d[y];M&&Dt.set(M,{skewY:Math.max(-2.5,Math.min(2.5,m*.0016))})})}}Dt.registerPlugin(Ye,ff);const Ec=()=>matchMedia("(prefers-reduced-motion: reduce)").matches;async function nw(){const r=document.getElementById("world"),e=new URLSearchParams(location.search),{createWorld:t}=await l_(async()=>{const{createWorld:K}=await import("./world-DqabaS9g.js");return{createWorld:K}},__vite__mapDeps([0,1,2]),import.meta.url),n=t(r,e.has("capture")),i=[...document.querySelectorAll(".chapter")],s={x:0,y:0,tx:0,ty:0},a=matchMedia("(pointer: coarse)").matches;let o=[];const c=()=>{o=i.map(K=>({top:K.getBoundingClientRect().top+window.scrollY,height:K.offsetHeight})),n.setLayout(o)},l=()=>{n.resize(window.innerWidth,window.innerHeight),c(),Ye.refresh()},u=Ec()?void 0:new v_({lerp:.11,smoothWheel:!0});u?.on("scroll",Ye.update);const h=()=>u?u.scroll:window.scrollY,f=document.getElementById("tags"),d=[],g=n.hero,_=(K,le,_e,de,ye,q=!1)=>{const J=document.createElement("div");J.className="tag"+(q?" mark":""),f.appendChild(J),d.push({el:J,anchor:le,dx:de,dy:ye,chapter:K,flip:!1});const ce=()=>{J.innerHTML=`<i></i><span>${wc(_e)}</span>`};ce(),vu(ce)};_(1,g.anchors.silo,"tag.silo",-150,-50,!0),_(2,g.anchors.wall,"tag.l0",78,-6),_(2,g.anchors.deep,"tag.l1",78,0),_(2,g.anchors.bone,"tag.l2",78,6),d.slice(-3).forEach(K=>K.el.classList.add("leader"));const m=new WeakSet;let p=[],v=[];const y=()=>{const K=Ec();i.forEach((le,_e)=>{const de=le.querySelector("h1, h2"),ye=[...le.querySelectorAll(".copy p, .steps, .funnel, .legend, .hero-sub, .hero-note, .cue")];let q=[];if(de){const ce=ff.create(de,{type:"lines",mask:"lines",linesClass:"ln"});p.push(ce),q=ce.lines}const J=de?m.has(de):!0;if(K||J){Dt.set(q,{yPercent:0}),Dt.set(ye,{clearProps:"all"});return}Dt.set(q,{yPercent:115}),Dt.set(ye,{opacity:0,y:14}),_e!==0&&v.push(Ye.create({trigger:le,start:"top 58%",once:!0,onEnter:()=>{de&&m.add(de),ye.forEach(ce=>m.add(ce)),Dt.to(q,{yPercent:0,duration:1.1,ease:"expo.out",stagger:.09}),Dt.to(ye,{opacity:1,y:0,duration:.9,ease:"expo.out",stagger:.08,delay:.25})}}))})};u_(()=>{p.forEach(K=>K.revert()),p=[],v.forEach(K=>K.kill()),v=[]}),vu(()=>{y(),c(),Ye.refresh()}),await document.fonts.ready,y();const M=[...document.querySelectorAll(".steps li")],E=wi.findIndex(K=>K.id==="layers"),T=K=>{const le=o[E];if(!le)return;const _e=Math.max(0,Math.min(1,(K-le.top)/Math.max(1,le.height-window.innerHeight))),de=_e<.3?0:_e<.58?1:2;M.forEach((ye,q)=>ye.classList.toggle("on",q===de))},R=document.getElementById("funnel");R&&Ye.create({trigger:R,start:"top 80%",once:!0,onEnter:()=>{R.classList.add("in"),!Ec()&&R.querySelectorAll("b").forEach(K=>{const le=Number(K.dataset.count),_e={v:0};Dt.to(_e,{v:le,duration:1.5,ease:"power3.out",onUpdate:()=>{K.textContent=Math.round(_e.v).toLocaleString(Uf()==="id"?"id-ID":"en-US")}})})}}),Dt.to(r,{opacity:.1,ease:"none",scrollTrigger:{trigger:"#findings",start:"top bottom",end:"top 15%",scrub:!0}}),Ye.create({trigger:"#findings",start:"top 60px",end:"max",onToggle:K=>{document.body.dataset.tone=K.isActive?"bone":"night"}});const S=tw(i,K=>{const le=o[K];if(!le)return;const _e=wi[K].drive?le.top+4:le.top+le.height/2-window.innerHeight/2;u?u.scrollTo(_e,{duration:1.6}):window.scrollTo({top:_e})});let C=0,I=0,U=0;const z=K=>{const le=K-C;C=K;const _e=Math.min(.05,Math.max(.001,le));n.stage.sampleOk=le<.2&&!document.hidden,u?.raf(K*1e3);const de=h();U=U*.85+(de-I)/_e*.15,I=de,a||(s.x+=(s.tx-s.x)*.06,s.y+=(s.ty-s.y)*.06),n.update(de,U,_e,K,s),T(de),S(n.state.u,n.state.active,U);const ye=document.getElementById("hud-pct"),q=document.getElementById("hud-bar"),J=document.getElementById("hud-pts");if(ye&&q&&J){const pe=Math.round(n.hud.pct*100);ye.textContent=`${pe}%`,q.style.width=`${pe}%`,J.textContent=Math.round(n.hud.points).toLocaleString(Uf()==="id"?"id-ID":"en-US")}const ce=n.state,Te={x:0,y:0,visible:!0};for(const pe of d){const Be=Math.abs(ce.u-pe.chapter)<.42;if(pe.el.classList.toggle("on",Be),!Be)continue;n.project(pe.anchor,Te);const ut=window.innerWidth,D=Te.x+pe.dx>ut-210?!0:Te.x+pe.dx<12?!1:pe.flip;pe.flip=D;const Xe=Math.max(12,Math.min(ut-pe.el.offsetWidth-12,Te.x+(D?-pe.dx:pe.dx)));pe.el.style.transform=`translate3d(${Xe}px, ${Te.y+pe.dy}px, 0)`}};Dt.ticker.add(z),Dt.ticker.lagSmoothing(0);const W=K=>{s.tx=K.clientX/window.innerWidth*2-1,s.ty=K.clientY/window.innerHeight*2-1};a||window.addEventListener("pointermove",W,{passive:!0});let V=0;window.addEventListener("resize",()=>{cancelAnimationFrame(V),V=requestAnimationFrame(l)}),l(),document.querySelectorAll('a[href^="#"]').forEach(K=>{K.addEventListener("click",le=>{const _e=document.querySelector(K.getAttribute("href"));_e&&(le.preventDefault(),u?u.scrollTo(_e,{duration:1.6}):_e.scrollIntoView())})});const j=document.getElementById("veil"),H=i[0],te=H.querySelectorAll(".ln"),L=H.querySelectorAll(".hero-sub, .hero-note, .cue");requestAnimationFrame(()=>requestAnimationFrame(()=>{if(j?.classList.add("gone"),Ec()){n.intro.v=1;return}Dt.to(n.intro,{v:1,duration:3.8,ease:"power2.inOut"}),Dt.to(te,{yPercent:0,duration:1.3,ease:"expo.out",stagger:.1,delay:1.5}),Dt.to(L,{opacity:1,y:0,duration:1,ease:"expo.out",stagger:.12,delay:2.4});const K=H.querySelector("h1");K&&m.add(K)})),window.__go=(K,le=.5)=>{const _e=wi.findIndex(q=>q.id===K);if(_e<0)return;const de=o[_e],ye=wi[_e].drive?de.top+(de.height-window.innerHeight)*le:de.top+de.height/2-window.innerHeight/2;u?u.scrollTo(ye,{immediate:!0}):window.scrollTo(0,ye)},window.__fs={world:n,lenis:u}}const cw=Object.freeze(Object.defineProperty({__proto__:null,startLanding:nw},Symbol.toStringTag,{value:"Module"}));export{aw as $,qu as A,G0 as B,qe as C,Yg as D,xa as E,Ei as F,Zn as G,Do as H,ga as I,en as J,ts as K,ni as L,un as M,Cn as N,Df as O,In as P,Nh as Q,df as R,cn as S,Qt as T,zi as U,lt as V,_s as W,$g as X,Lo as Y,sw as Z,Lr as _,Eo as a,ow as a0,wi as a1,kh as a2,cw as a3,Mo as b,t_ as c,er as d,ux as e,rw as f,Hn as g,Fn as h,lr as i,cr as j,Pn as k,xr as l,Dr as m,ki as n,Zt as o,Yt as p,gt as q,Zr as r,k as s,tt as t,Uv as u,Jg as v,tr as w,Mp as x,gx as y,xx as z};
