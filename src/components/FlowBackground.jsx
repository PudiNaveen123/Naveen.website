import { useEffect, useRef } from 'react';
import './FlowBackground.css';
import { startLiquidFallback } from './liquidFallback';

// Independent liquid-gradient renderer in the Harbour Navy palette.
const vertex = `attribute vec2 position; void main(){gl_Position=vec4(position,0.,1.);}`;
const fragment = `
precision highp float;
uniform vec2 resolution;
uniform float time;
uniform float darkMode;
float grain(vec2 p){return fract(52.9829189*fract(dot(p,vec2(.06711056,.00583715))));}
void main(){
  vec2 uv=gl_FragCoord.xy/resolution;
  vec2 p=(gl_FragCoord.xy-.5*resolution)/max(resolution.x,resolution.y)*2.;
  float angle=.65+.8*sin(time*.105);
  p=mat2(cos(angle),-sin(angle),sin(angle),cos(angle))*p;
  float t=time*.65;
  for(int i=0;i<7;i++){
    float n=float(i)+1.;
    p+=.07/n*sin(p.yx*(2.+n*.31)+t*vec2(.63,-.47)+n*1.9);
  }

  float phase=p.x*5.+.65*sin(p.y*2.2+t*.38)+t;
  float wave=.5+.5*sin(phase);
  float sheet=smoothstep(.25,.8,wave);
  float seam=exp(-pow((sin(phase+.85)-.8)*7.,2.));
  float amount=clamp(sheet-.7*seam,0.,1.);

  // A second, slower ribbon introduces real white into the flow instead of only off-white.
  float whiteWave=.5+.5*sin(phase*.72-t*.32+1.6+.35*sin(p.y*2.));
  float whiteRibbon=smoothstep(.60,.97,whiteWave);

  vec3 white=vec3(1.);
  vec3 paper=vec3(238.,244.,237.)/255.;
  vec3 navy=vec3(11.,37.,69.)/255.;
  vec3 blue=vec3(19.,64.,116.)/255.;

  vec3 lightBase=mix(white,paper,.48);
  vec3 base=mix(lightBase,navy,darkMode);
  vec3 lightInk=mix(white,blue,.50);
  vec3 darkInk=mix(blue,white,.08);
  vec3 ink=mix(lightInk,darkInk,darkMode);

  float fade=smoothstep(0.,1.,uv.y);
  float blueStrength=amount*fade*mix(.66,.88,darkMode);
  vec3 color=mix(base,ink,blueStrength);

  // White stays visibly present in both hero and footer, but remains more restrained on dark mode.
  float whiteStrength=whiteRibbon*mix(.62,.18,darkMode);
  color=mix(color,white,whiteStrength);

  color+=(grain(gl_FragCoord.xy)-.5)*.012;
  gl_FragColor=vec4(color,1.);
}`;

export default function FlowBackground({ variant = 'hero' }) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const gl = canvas.getContext('webgl', { alpha: false, antialias: false, powerPreference: 'low-power' });
    if (!gl) return startLiquidFallback(canvas, variant);
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
    let frame = 0, visible = true, elapsed = variant === 'footer' ? 9 : 0, last = 0;
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
