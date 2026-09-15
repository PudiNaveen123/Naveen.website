import { useEffect, useRef } from 'react';
import './FlowBackground.css';

// Original shader recreating the reference's flowing diagonal light bands.
const vertex = `attribute vec2 position; void main(){gl_Position=vec4(position,0.,1.);}`;
const fragment = `
precision mediump float;
uniform vec2 resolution;
uniform float time;
uniform float darkMode;
float grain(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
void main(){
  vec2 uv=gl_FragCoord.xy/resolution;
  uv.y=1.-uv.y;
  float t=time*.22;
  // Large flowing fields frame BOTH edges, leaving the content centre quiet.
  float bend=.055*sin(uv.y*4.2+t*.7)+.035*sin(uv.x*5.-uv.y*3.+t*.4);
  float leftField=exp(-pow((uv.x+.035+.045*sin(t*.5))*3.4,2.));
  float rightField=exp(-pow((uv.x-1.035+.045*cos(t*.45))*3.4,2.));
  float leftDiagonal=uv.x*.65+uv.y*.52+bend;
  float rightDiagonal=(1.-uv.x)*.65+uv.y*.52-bend;
  float leftRibbons=pow(.5+.5*sin(leftDiagonal*19.-t),1.65);
  float rightRibbons=pow(.5+.5*sin(rightDiagonal*20.+t*.85+1.8),1.65);
  float leftWash=.5+.5*sin(uv.y*3.8-t*.65);
  float rightWash=.5+.5*cos(uv.y*4.2+t*.55);
  float flow=leftField*(.32+.34*leftWash+.52*leftRibbons)
            +rightField*(.28+.30*rightWash+.60*rightRibbons);
  float fade=1.-smoothstep(.68,1.12,uv.y);
  vec3 paper=vec3(.9333,.9569,.9294);
  vec3 navy=vec3(.0431,.1451,.2706);
  vec3 blue=vec3(.0745,.2510,.4549);
  vec3 deep=mix(paper,navy,darkMode);
  // A pale blue tint on the light hero; richer harbour blue on the navy footer.
  vec3 accent=mix(mix(paper,blue,.42),blue,darkMode);
  vec3 col=mix(deep,accent,clamp(flow*fade,0.,1.));
  col+=(grain(gl_FragCoord.xy)-.5)*mix(.012,.022,darkMode);
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
    gl.uniform1f(gl.getUniformLocation(program,'darkMode'), variant === 'footer' ? 1 : 0);
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
