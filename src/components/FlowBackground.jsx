import { useEffect, useRef } from 'react';
import './FlowBackground.css';

// Original shader recreating the reference's flowing diagonal light bands.
const vertex = `attribute vec2 position; void main(){gl_Position=vec4(position,0.,1.);}`;
const fragment = `
precision mediump float;
uniform vec2 resolution;
uniform float time;
float grain(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
void main(){
  vec2 uv=gl_FragCoord.xy/resolution;
  uv.y=1.-uv.y;
  float t=time*.14;
  vec2 p=uv;
  // Broad, gently bending ribbons travel diagonally across the upper field.
  float warp=.055*sin(p.x*3.8+p.y*2.2+t)+.024*sin(p.y*7.-p.x*2.8-t*.7);
  float diagonal=p.x*.85+p.y*.68+warp+.085*sin(t*.42);
  float bands=.5+.5*cos(diagonal*29.-t);
  bands=pow(bands,2.4);
  float envelope=1.-smoothstep(.12,.98,diagonal);
  float glow=exp(-pow((diagonal-.12)*2.5,2.));
  vec3 deep=vec3(.0314,.1098,.0824);
  vec3 emerald=vec3(.106,.263,.196);
  vec3 teal=vec3(.012,.525,.40);
  vec3 col=mix(deep,emerald,glow*.3);
  col=mix(col,teal,clamp((bands*.82+glow*.20)*envelope,0.,1.));
  col+=(grain(gl_FragCoord.xy)-.5)*.024;
  // Fade down through the section, keeping the content contrast steady.
  col=mix(deep,col,(1.-smoothstep(.05,1.,uv.y))*.86);
  gl_FragColor=vec4(col,1.);
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
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0, visible = true, elapsed = variant === 'footer' ? 17 : 0, last = 0;
    const draw = () => {
      gl.viewport(0,0,canvas.width,canvas.height);
      gl.uniform2f(size,canvas.width,canvas.height); gl.uniform1f(clock,elapsed);
      gl.drawArrays(gl.TRIANGLES,0,6);
      canvas.dataset.ready = 'true';
    };
    const tick = now => {
      if (last && now-last < 32) { frame=requestAnimationFrame(tick); return; }
      if (last) elapsed += Math.min((now-last)/1000,.1);
      last=now; draw(); frame=requestAnimationFrame(tick);
    };
    const sync = () => {
      cancelAnimationFrame(frame); last=0; draw();
      if (visible && !document.hidden && !reduced.matches) frame=requestAnimationFrame(tick);
    };
    const resize = new ResizeObserver(() => {
      // Cap shader resolution independently of high-density screens.
      const scale=Math.min(1,1000/Math.max(canvas.clientWidth,1));
      canvas.width=Math.max(1,Math.round(canvas.clientWidth*scale));
      canvas.height=Math.max(1,Math.round(canvas.clientHeight*scale));
      draw();
    });
    resize.observe(canvas);
    const observer=new IntersectionObserver(entries => { visible=entries[0].isIntersecting; sync(); });
    observer.observe(canvas);
    reduced.addEventListener('change',sync);
    document.addEventListener('visibilitychange',sync);
    const lost = event => { event.preventDefault(); cancelAnimationFrame(frame); delete canvas.dataset.ready; };
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
