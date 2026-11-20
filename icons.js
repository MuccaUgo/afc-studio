const iconPaths = {
  grid:'<rect x="3" y="3" width="7" height="7" rx="1.6"/><rect x="14" y="3" width="7" height="7" rx="1.6"/><rect x="3" y="14" width="7" height="7" rx="1.6"/><rect x="14" y="14" width="7" height="7" rx="1.6"/>',
  practice:'<path d="m3 9 9-5 9 5-9 5-9-5Zm0 5 9 5 9-5"/>',
  book:'<path d="M12 6c-3-2.1-6-2.7-10-2v14c4-.6 7 .1 10 2 3-2 6-2.6 10-2V4c-4-.7-7 .1-10 2Zm0 0v14"/>',
  activity:'<path d="M4 20h16M6.5 16v-5m5.5 5V4m5.5 12V8"/>',
  bookmark:'<path d="M6 4.5A1.5 1.5 0 0 1 7.5 3h9A1.5 1.5 0 0 1 18 4.5V21l-6-4-6 4z"/>',
  play:'<path d="m7 4 13 8-13 8z" fill="currentColor" stroke="none"/>',
  timer:'<circle cx="12" cy="14" r="8"/><path d="M12 10v4l2 1M9 2h6m2.8 4.2 1.6-1.6"/>',
  bank:'<path d="m2 9 10-6 10 6H2Zm2 11h16M6 12v5m6-5v5m6-5v5"/>',
  chart:'<path d="M3 3v17h18M7 15l4-5 3 2 6-7"/><path d="M16 5h4v4"/>',
  coins:'<ellipse cx="9" cy="7" rx="6" ry="3"/><path d="M3 7v4c0 1.7 2.7 3 6 3 1 0 2-.1 2.8-.3M3 11v4c0 1.8 2.7 3 6 3 .8 0 1.6-.1 2.2-.2M15 7v2"/><ellipse cx="17" cy="13" rx="4.5" ry="2.5"/><path d="M12.5 13v4c0 1.4 2 2.5 4.5 2.5s4.5-1.1 4.5-2.5v-4"/>',
  scales:'<path d="M12 3v17m-5 1h10M3 7l9-2 9 2M5 7l-3 7h6L5 7Zm14 0-3 7h6l-3-7Z"/><path d="M2 14a3 3 0 0 0 6 0m8 0a3 3 0 0 0 6 0"/>',
  budget:'<rect x="4" y="4.5" width="16" height="16" rx="2"/><path d="M8 2.5v4m8-4v4M4 10h16m-12 4h2m3 0h3m-8 3h2"/>',
  ai:'<rect x="5" y="5" width="14" height="14" rx="3"/><rect x="9" y="9" width="6" height="6" rx="1"/><path d="M9 2v3m6-3v3m-6 14v3m6-3v3M2 9h3m-3 6h3m14-6h3m-3 6h3"/>',
  list:'<rect x="3" y="4" width="5" height="6" rx="1"/><rect x="3" y="14" width="5" height="6" rx="1"/><path d="M12 6h9m-9 2h6m-6 8h9m-9 2h6"/>',
  pen:'<path d="m5 15-1 5 5-1L21 7l-4-4-12 12zm9-9 4 4"/>',
  steps:'<path d="M3 18h5v-5h5V8h7M16 4l4 4-4 4"/>',
  target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  back:'<path d="m14 6-6 6 6 6"/>',chev:'<path d="m8 5 7 7-7 7"/>',down:'<path d="m6 9 6 6 6-6"/>',
  check:'<path d="m4 12 5 5L20 6"/>',x:'<path d="m6 6 12 12M18 6 6 18"/>',
  search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
  layers:'<path d="m3 7 9-5 9 5-9 5-9-5Zm0 5 9 5 9-5m-18 5 9 5 9-5"/>',
  copy:'<rect x="7" y="6" width="12" height="15" rx="2"/><path d="M15 3H5a1 1 0 0 0-1 1v13"/>',
  rotate:'<path d="M3 4v6h6M3.5 10A8.5 8.5 0 1 1 5 18"/>',harddrive:'<rect x="3" y="5" width="18" height="13" rx="2"/><path d="M8 21h8m-4-3v3"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',calc:'<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M8 6h8M8 11h1m5 0h1m-7 4h1m5 0h1m-7 3h1m5 0h1"/>',
  checkList:'<path d="m2 6 2 2 4-5m-6 13 2 2 4-5m4-7h9m-9 10h9"/>',
  mixed:'<path d="M3 6h3c4 0 6 12 10 12h4m-3-3 3 3-3 3M3 18h3c1.5 0 2.5-1.4 3.5-3.2M14 7.5c.8-1 1.4-1.5 2.5-1.5H20m-3-3 3 3-3 3"/>',
  info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10v.2"/>',
  cap:'<path d="m2 9 10-5 10 5-10 5L2 9Zm4 3v4c3 4 9 4 12 0v-4m4-3v6"/>'
};
function icon(name, size=20) {
  return '<svg aria-hidden="true" focusable="false" width="'+size+'" height="'+size+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">'+(iconPaths[name]||'')+'</svg>';
}
function drawCover() {
  const canvas = document.getElementById('cover-art');
  if (!canvas) return;
  const g = canvas.getContext('2d');
  if (!g) return;
  const w=370, h=296, ratio=Math.min(window.devicePixelRatio||1,3);
  canvas.width=w*ratio;canvas.height=h*ratio;g.scale(ratio,ratio);
  const project=(x,y,z=0)=>[75+x*.9+y*.53,244-x*.34+y*.4-z];
  function path(points,fill,stroke,width=1) {
    g.beginPath();points.forEach(([x,y],i)=>i?g.lineTo(x,y):g.moveTo(x,y));
    if(fill){g.closePath();g.fillStyle=fill;g.fill();}
    if(stroke){g.strokeStyle=stroke;g.lineWidth=width;g.stroke();}
  }
  for(let i=-140;i<=420;i+=22){
    path([project(i,-170),project(i,240)],null,'rgba(177,192,255,.115)',.7);
    path([project(-140,i),project(420,i)],null,'rgba(177,192,255,.115)',.7);
  }
  const heights=[36,62,89,120,153], width=26, depth=37;
  heights.forEach((height,i)=>{
    const x=i*44,y=9, lime=i===4;
    const P=(dx,dy,z)=>project(x+dx,y+dy,z);
    const front=g.createLinearGradient(0,82,0,233);front.addColorStop(0,lime?'#d6f58c':'#939eff');front.addColorStop(1,lime?'#b1d56f':'#5865b9');
    const side=g.createLinearGradient(0,70,0,230);side.addColorStop(0,lime?'#9cc86b':'#747fd5');side.addColorStop(1,lime?'#82a45d':'#4854a1');
    const edge=lime?'rgba(233,255,191,.8)':'rgba(209,216,255,.75)';
    path([P(0,0,0),P(0,depth,0),P(0,depth,height),P(0,0,height)],side,edge,.9);
    path([P(0,depth,0),P(width,depth,0),P(width,depth,height),P(0,depth,height)],front,edge,.9);
    path([P(0,0,height),P(width,0,height),P(width,depth,height),P(0,depth,height)],lime?'#e2ffae':'#b2bbff',edge,1);
    for(let k=12;k<height;k+=12){path([P(0,0,k),P(0,depth,k),P(width,depth,k)],null,lime?'rgba(67,97,38,.17)':'rgba(43,48,113,.24)',.7);}
    for(let k=9;k<depth;k+=9)path([P(0,k,0),P(0,k,height)],null,'rgba(255,255,255,.16)',.6);
  });
  const trace=heights.map((v,i)=>project(i*44+8,-12,v+22));
  path(trace,null,'#d6f991',2.1);
  trace.forEach(([x,y])=>{g.beginPath();g.arc(x,y,3.4,0,2*Math.PI);g.fillStyle='#d6f991';g.fill();g.strokeStyle='#3b477e';g.lineWidth=1.1;g.stroke();});
}
