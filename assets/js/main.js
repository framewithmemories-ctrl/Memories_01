document.getElementById('yr') && (document.getElementById('yr').textContent=new Date().getFullYear());
const waBtn=document.getElementById('waBtn');
if(waBtn){
  const text=encodeURIComponent('Hi Memories! I have a question about: '+document.title+' – '+location.href);
  waBtn.href=`https://wa.me/918148040148?text=${text}`;
}
