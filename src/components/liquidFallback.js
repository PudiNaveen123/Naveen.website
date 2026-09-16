// Low-resolution CPU rendering of the same liquid field for devices without WebGL.
export function startLiquidFallback(canvas, variant) {
  const context = canvas.getContext('2d', { alpha: false });
  if (!context) return () => {};
  const dark = variant === 'footer';
  const white = [255,255,255];
  const paper = [238,244,237];
  const navy = [11,37,69];
  const blue = [19,64,116];
  const base = dark ? navy : white.map((v,i) => v+(paper[i]-v)*.48);
  const ink = dark
    ? blue.map((v,i) => v+(white[i]-v)*.08)
    : white.map((v,i) => v+(blue[i]-v)*.50);
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let frame=0, last=0, elapsed=dark?9:0, visible=true, pixels;
  const smooth = (a,b,v) => { const n=Math.max(0,Math.min(1,(v-a)/(b-a))); return n*n*(3-2*n); };
  function draw() {
    if(!pixels) return;
    const w=canvas.width,h=canvas.height,t=elapsed*.65,scale=Math.max(w,h);
    const angle=.65+.8*Math.sin(elapsed*.105),ca=Math.cos(angle),sa=Math.sin(angle);
    for(let y=0;y<h;y++) {
      const py=(h-y-.5-h/2)/scale*2;
      const fade=smooth(0,1,1-(y+.5)/h);
      for(let x=0;x<w;x++) {
        const px=(x+.5-w/2)/scale*2;
        let qx=ca*px+sa*py,qy=-sa*px+ca*py;
        for(let n=1;n<=7;n++) {
          const dx=.07/n*Math.sin(qy*(2+n*.31)+t*.63+n*1.9);
          const dy=.07/n*Math.sin(qx*(2+n*.31)-t*.47+n*1.9);
          qx+=dx; qy+=dy;
        }
        const phase=qx*5+.65*Math.sin(qy*2.2+t*.38)+t;
        const wave=.5+.5*Math.sin(phase);
        const seam=Math.exp(-Math.pow((Math.sin(phase+.85)-.8)*7,2));
        const amount=Math.max(0,Math.min(1,smooth(.25,.8,wave)-.7*seam))*fade*(dark?.88:.66);
        const whiteWave=.5+.5*Math.sin(phase*.72-t*.32+1.6+.35*Math.sin(qy*2));
        const whiteAmount=smooth(.60,.97,whiteWave)*(dark?.18:.62);
        const i=(y*w+x)*4;
        for(let c=0;c<3;c++) {
          const blueMixed=base[c]+(ink[c]-base[c])*amount;
          pixels.data[i+c]=blueMixed+(white[c]-blueMixed)*whiteAmount;
        }
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
