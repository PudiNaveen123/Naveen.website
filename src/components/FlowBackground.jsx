import { useEffect, useRef } from 'react';
import './FlowBackground.css';

// Independent liquid-gradient renderer in the Harbour Navy palette.
const vertex = `attribute vec2 position; void main(){gl_Position=vec4(position,0.,1.);}`;
// A moving, domain-warped colour field, rather than fixed stripes or edge masks.
const fragment = `
precision highp float;
uniform vec2 resolution;
uniform float time;
uniform float darkMode;
float grain(vec2 p){return fract(52.9829189*fract(dot(p,vec2(.06711056,.00583715))));}
vec2 deform(vec2 p,float t){
  for(int i=0;i<5;i++){
    float n=float(i)+1.;
    vec2 drift=vec2(sin(t*.61+n*1.7),cos(t*.47+n*2.3));
    p+=.22/n*sin(p.yx*(1.3+n*.35)+drift+t*vec2(.31,-.27));
  }
  return p;
}
void main(){
  vec2 uv=gl_FragCoord.xy/resolution;
  // Aspect-correct coordinates prevent the fluid stretching on narrow screens.
  vec2 p=(gl_FragCoord.xy-.5*resolution)/max(resolution.x,resolution.y)*2.;
  p=mat2(.82,-.57,.57,.82)*p;
  float t=time*.195;
  vec2 q=deform(p*.78+vec2(.2,-.4),t);
  vec2 r=deform(q+vec2(.34*sin(t*.3),.3*cos(t*.23)),t*.73+2.);
  float field=.5+.25*sin(r.x*3.4+r.y*1.8+t*.7)
                    +.25*cos(q.y*2.6-q.x*1.7-t*.53);
  // Alternating wide colour stops form shifting folds and open, quiet areas.
  float fold=smoothstep(.16,.38,field)*(1.-smoothstep(.52,.72,field));
  float broad=smoothstep(.68,.94,field);
  float amount=clamp(fold*.92+broad*.65,0.,1.);
  vec3 paper=vec3(238.,244.,237.)/255.;
  vec3 navy=vec3(11.,37.,69.)/255.;
  vec3 blue=vec3(19.,64.,116.)/255.;
  vec3 base=mix(paper,navy,darkMode);
  vec3 ink=mix(mix(paper,blue,.37),blue,darkMode);
  // The same vertical fade as the reference, with an accessible light variant.
  float fade=mix(.32,1.,smoothstep(0.,.9,uv.y));
  vec3 color=mix(base,ink,amount*fade);
  color+=(grain(gl_FragCoord.xy)-.5)*.015;
  gl_FragColor=vec4(color,1.);
}`;

export default function FlowBackground({ variant = 'hero' }) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const gl = canvas.getContext('webgl', { alpha: false, antialias: false, powerPreference: 'low-power' });
    if (!gl) return;
    const shaders = [];
    const compile = (type, source) => {
      const shader = gl.createShader(type);
      shaders.push(shader);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
    };
    const vs = compile(gl.VERTEX_SHADER, vertex);
    const fs = compile(gl.FRAGMENT_SHADER, fragment);
    const program = gl.createProgram();
    if (!vs || !fs) { shaders.forEach(s => gl.deleteShader(s)); gl.deleteProgram(program); return; }
    gl.attachShader(program, vs); gl.attachShader(program, fs); gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) { shaders.forEach(s => gl.deleteShader(s)); gl.deleteProgram(program); return; }
    gl.useProgram(program);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(position); gl.vertexAttribPointer(position,2,gl.FLOAT,false,0,0);
    const size = gl.getUniformLocation(program,'resolution');
    const clock = gl.getUniformLocation(program,'time');
    gl.uniform1f(gl.getUniformLocation(program,'darkMode'), variant === 'footer' ? 1 : 0);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0, visible = true, elapsed = variant === 'footer' ? 17 : 6, last = 0;
    let contextLost = false;
    const draw = () => {
      if (contextLost) return;
      gl.viewport(0,0,canvas.width,canvas.height);
      gl.uniform2f(size,canvas.width,canvas.height); gl.uniform1f(clock,elapsed);
      gl.drawArrays(gl.TRIANGLES,0,6);
      canvas.dataset.ready = 'true';
    };
    const tick = now => {
      if (contextLost || !visible || document.hidden || reduced.matches) return;
      if (last) elapsed += (now-last)/1000;
      last=now; draw(); frame=requestAnimationFrame(tick);
    };
    const sync = () => {
      cancelAnimationFrame(frame); last=0; draw();
      if (!contextLost && visible && !document.hidden && !reduced.matches) frame=requestAnimationFrame(tick);
    };
    const resize = new ResizeObserver(() => {
      // Cap shader resolution independently of high-density screens.
      const scale=Math.min(window.devicePixelRatio || 1,1.5,1440/Math.max(canvas.clientWidth,1));
      canvas.width=Math.max(1,Math.round(canvas.clientWidth*scale));
      canvas.height=Math.max(1,Math.round(canvas.clientHeight*scale));
      draw();
    });
    resize.observe(canvas);
    const observer=new IntersectionObserver(entries => { visible=entries[0].isIntersecting; sync(); });
    observer.observe(canvas);
    reduced.addEventListener('change',sync);
    document.addEventListener('visibilitychange',sync);
    const lost = event => { event.preventDefault(); contextLost = true; cancelAnimationFrame(frame); delete canvas.dataset.ready; };
    canvas.addEventListener('webglcontextlost',lost);
    sync();
    return () => {
      cancelAnimationFrame(frame); resize.disconnect(); observer.disconnect();
      reduced.removeEventListener('change',sync); document.removeEventListener('visibilitychange',sync);
      canvas.removeEventListener('webglcontextlost',lost);
      gl.deleteBuffer(buffer); gl.deleteProgram(program); shaders.forEach(s => gl.deleteShader(s));
    };
  }, [variant]);
  return <div className={`flow-background flow-background--${variant}`} aria-hidden="true"><canvas ref={ref} /></div>;
}
