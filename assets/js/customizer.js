const canvas=document.getElementById('preview');
const ctx=canvas.getContext('2d');
const wall=document.getElementById('wall');
const file=document.getElementById('file');
const zoom=document.getElementById('zoom');
const moveX=document.getElementById('moveX');
const moveY=document.getElementById('moveY');
const frameSel=document.getElementById('frame');

let img=null;
let imgBitmap=null;

function draw(){
  // wall background
  ctx.fillStyle=wall.value;
  ctx.fillRect(0,0,canvas.width,canvas.height);

  // frame opening area
  const opening={x:60,y:40,w:480,h:360};

  // photo
  if(imgBitmap){
    const z=parseFloat(zoom.value);
    const ox=parseFloat(moveX.value);
    const oy=parseFloat(moveY.value);
    const iw=imgBitmap.width, ih=imgBitmap.height;
    // cover opening
    const scale=Math.max(opening.w/iw, opening.h/ih)*z;
    const dw=iw*scale, dh=ih*scale;
    const dx=opening.x + (opening.w-dw)/2 + ox;
    const dy=opening.y + (opening.h-dh)/2 + oy;
    ctx.save();
    ctx.beginPath();
    ctx.rect(opening.x,opening.y,opening.w,opening.h);
    ctx.clip();
    ctx.drawImage(imgBitmap, dx, dy, dw, dh);
    ctx.restore();
  } else {
    ctx.fillStyle="#d1d5db";
    ctx.fillRect(opening.x,opening.y,opening.w,opening.h);
    ctx.fillStyle="#6b7280";
    ctx.fillText("Upload your photo", opening.x+opening.w/2-60, opening.y+opening.h/2);
  }

  // frame overlay
  ctx.lineWidth=18;
  ctx.strokeStyle = frameSel.value==='acrylic' ? 'rgba(255,255,255,0.85)' :
                    frameSel.value==='black' ? '#111827' : '#734b33';
  ctx.strokeRect(opening.x-12, opening.y-12, opening.w+24, opening.h+24);

  // shadow
  ctx.shadowColor='rgba(0,0,0,.15)';
  ctx.shadowBlur=20;
  ctx.strokeRect(opening.x-12, opening.y-12, opening.w+24, opening.h+24);
  ctx.shadowBlur=0;
}

file.addEventListener('change', async (e)=>{
  const f=e.target.files[0];
  if(!f) return;
  const url=URL.createObjectURL(f);
  img=new Image(); img.src=url;
  await img.decode();
  imgBitmap=await createImageBitmap(img);
  draw();
});
[zoom,moveX,moveY,wall,frameSel].forEach(el=>el.addEventListener('input',draw));
draw();
