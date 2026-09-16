// Low-resolution CPU rendering of the same liquid field for devices without WebGL.
export function startLiquidFallback(canvas, variant) {
  const context = canvas.getContext('2d', { alpha: false });
  if (!context) return () => {};
  const dark = variant === 'footer';
  const base = dark ? [11,37,69] : [238,244,237];
  const ink = dark ? [19,64,116] : base.map((v,i) => v+([19,64,116][i]-v)*.37);
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let frame=0, last=0, elapsed=dark?17:6, visible=true, pixels;
  const smooth = (a,b,v) => { const n=Math.max(0,Math.min(1,(v-a)/(b-a))); return n*n*(3-2*n); };
  function deform(x,y,t) {
    for(let n=1;n<=5;n++) {
      const dx=.22/n*Math.sin(y*(1.3+n*.35)+Math.sin(t*.61+n*1.7)+t*.31);
      const dy=.22/n*Math.sin(x*(1.3+n*.35)+Math.cos(t*.47+n*2.3)-t*.27);
      x+=dx; y+=dy;
    }
    return [x,y];
  }
  function draw() {
    if(!pixels) return;
    const w=canvas.width,h=canvas.height,t=elapsed*.195,scale=Math.max(w,h);
    const tx=.34*Math.sin(t*.3),ty=.3*Math.cos(t*.23);
    for(let y=0;y<h;y++) {
      const py=(h-y-.5-h/2)/scale*2;
      const fade=.32+.68*smooth(0,.9,1-(y+.5)/h);
      for(let x=0;x<w;x++) {
        const px=(x+.5-w/2)/scale*2;
        const [qx,qy]=deform((.82*px+.57*py)*.78+.2,(-.57*px+.82*py)*.78-.4,t);
        const [rx,ry]=deform(qx+tx,qy+ty,t*.73+2);
        const field=.5+.25*Math.sin(rx*3.4+ry*1.8+t*.7)+.25*Math.cos(qy*2.6-qx*1.7-t*.53);
        const amount=Math.min(1,smooth(.16,.38,field)*(1-smooth(.52,.72,field))*.92+smooth(.68,.94,field)*.65)*fade;
        const i=(y*w+x)*4;
        for(let c=0;c<3;c++) pixels.data[i+c]=base[c]+(ink[c]-base[c])*amount;
        pixels.data[i+3]=255;
      }
    }
    context.putImageData(pixels,0,0); canvas.dataset.ready='true'; canvas.dataset.renderer='canvas2d';
  }
  function tick(now) {
    if(last && now-last<33) { frame=requestAnimationFrame(tick); return; }
    if(last) elapsed+=(now-last)/1000;
    last=now; draw(); frame=requestAnimationFrame(tick);
  }
  function sync() {
    cancelAnimationFrame(frame); last=0; draw();
    if(visible && !document.hidden && !reduced.matches) frame=requestAnimationFrame(tick);
  }
  const resize=new ResizeObserver(() => {
    const scale=Math.min(1,220/Math.max(1,canvas.clientWidth),Math.sqrt(28000/Math.max(1,canvas.clientWidth*canvas.clientHeight)));
    canvas.width=Math.max(1,Math.round(canvas.clientWidth*scale));
    canvas.height=Math.max(1,Math.round(canvas.clientHeight*scale));
    pixels=context.createImageData(canvas.width,canvas.height); draw();
  });
  resize.observe(canvas);
  const observer=new IntersectionObserver(entries => { visible=entries[0].isIntersecting; sync(); });
  observer.observe(canvas);
  document.addEventListener('visibilitychange',sync); reduced.addEventListener('change',sync);
  sync();
  return () => { cancelAnimationFrame(frame); resize.disconnect(); observer.disconnect(); document.removeEventListener('visibilitychange',sync); reduced.removeEventListener('change',sync); };
}
