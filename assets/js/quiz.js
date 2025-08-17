const form=document.getElementById('quizForm');
const results=document.getElementById('results');

const catalog=[
  {sku:'classic-wood-10x12', name:'Classic Wood Frame', price:'₹1,299', tags:['Anniversary','Wedding','Partner','Mom','Dad'], budget:'₹1000–2000'},
  {sku:'acrylic-led-8x10', name:'Acrylic LED Frame', price:'₹1,899', tags:['Birthday','Housewarming','Friend','Colleague'], budget:'₹1000–2000'},
  {sku:'collage-12x18', name:'Collage Frame 12x18', price:'₹2,499', tags:['Birthday','Anniversary','Family'], budget:'₹2000–4000'}
];

function budgetBand(sel){
  if(sel.includes('Under')) return 'Under ₹1000';
  if(sel.includes('₹1000')) return '₹1000–2000';
  if(sel.includes('₹2000')) return '₹2000–4000';
  return '₹4000+';
}

form.addEventListener('submit', (e)=>{
  e.preventDefault();
  const data=Object.fromEntries(new FormData(form).entries());
  const b=budgetBand(data.budget);
  const picks=catalog.filter(p => p.tags.includes(data.occasion) || p.tags.includes(data.recipient) || p.budget===b).slice(0,4);
  results.innerHTML = picks.map(p=>`
    <a class="card" href="/product/?sku=${encodeURIComponent(p.sku)}">
      <div class="card-img placeholder"></div>
      <div class="card-body">
        <h3>${p.name}</h3>
        <div class="price">${p.price}</div>
        <div class="row mt">
          <a class="btn btn-sm" href="/customizer/?template=${encodeURIComponent(p.sku)}">Preview</a>
          <a class="btn btn-sm btn-primary" href="/contact/?intent=order&sku=${encodeURIComponent(p.sku)}">Request to Order</a>
        </div>
      </div>
    </a>
  `).join('') || `<p>No exact match. Try a different budget or occasion.</p>`;
});
