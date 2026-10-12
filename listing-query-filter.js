// Apply Homepage ?cat=&sub= links to the new live catalog filters,
// including the empty-catalog state before any products are published.
(function(){
  if(!location.pathname.endsWith('/listing-supabase-live.html') && !location.pathname.endsWith('listing-supabase-live.html')) return;

  function slugify(v){
    return String(v||'').toLowerCase().replace(/&/g,'and').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  }

  const params=new URLSearchParams(location.search);
  const catSlug=slugify(params.get('cat'));
  const subSlug=slugify(params.get('sub'));
  if(!catSlug && !subSlug) return;

  const topLabels={
    'agriculture-food':'Agriculture & Food',
    'beverage':'Beverage',
    'personal-care':'Personal Care',
    'home-care':'Home Care',
    'textile-apparel':'Textile & Apparel'
  };
  const subLabels={
    'biscuits-crackers':'Biscuits & Crackers','wafers':'Wafers','cakes-cookies':'Cakes & Cookies',
    'chocolate-confectionery':'Chocolate & Confectionery','candy-toffee-gummies':'Candy, Toffee & Gummies',
    'snacks-chips':'Snacks & Chips','tomato-paste':'Tomato Paste','sauces-condiments':'Sauces & Condiments',
    'canned-foods':'Canned Foods','pickles-olives':'Pickles & Olives','pasta-noodles':'Pasta & Noodles',
    'jams-honey-spreads':'Jams, Honey & Spreads','nuts-dried-fruits':'Nuts & Dried Fruits',
    'saffron-spices':'Saffron & Spices','rice-grains-pulses':'Rice, Grains & Pulses',
    'fruit-juices-nectars':'Fruit Juices & Nectars','malt-non-alcoholic-beverages':'Malt & Non-Alcoholic Beverages',
    'soft-drinks-energy-drinks':'Soft Drinks & Energy Drinks','tea-herbal-infusions':'Tea & Herbal Infusions',
    'coffee':'Coffee','syrups-concentrates':'Syrups & Concentrates','water-functional-beverages':'Water & Functional Beverages',
    'hair-care':'Hair Care','skin-care':'Skin Care','bath-body':'Bath & Body','hand-personal-hygiene':'Hand & Personal Hygiene',
    'oral-care':'Oral Care','baby-care':'Baby Care','feminine-care':'Feminine Care','laundry-care':'Laundry Care',
    'dishwashing':'Dishwashing','surface-floor-cleaners':'Surface & Floor Cleaners','bleach-disinfectants':'Bleach & Disinfectants',
    'bathroom-toilet-cleaners':'Bathroom & Toilet Cleaners','air-fresheners':'Air Fresheners','t-shirts':'T-Shirts',
    'trousers-pants':'Trousers & Pants','socks':'Socks','caps-hats':'Caps & Hats','towels':'Towels','bed-sheets':'Bed Sheets'
  };

  function dedupeOptions(select){
    const seen=new Set();
    [...select.options].forEach((opt,index)=>{
      const key=slugify(opt.textContent||opt.value);
      if(index===0 || !key){seen.add(key);return;}
      if(seen.has(key)) opt.remove(); else seen.add(key);
    });
  }

  function applyRequestedContext(){
    const category=document.getElementById('categoryFilter');
    const search=document.getElementById('searchInput');
    if(!category || !search) return false;

    dedupeOptions(category);
    const subLabel=subLabels[subSlug]||'';
    const topLabel=topLabels[catSlug]||'';

    if(subLabel){
      let option=[...category.options].find(opt=>slugify(opt.textContent)===subSlug);
      if(!option){
        option=document.createElement('option');
        option.value=subLabel;
        option.textContent=subLabel;
        option.dataset.bfiInjected='1';
        category.appendChild(option);
      }
      dedupeOptions(category);
      option=[...category.options].find(opt=>slugify(opt.textContent)===subSlug) || option;
      category.value=option.value;
      if(typeof window.refreshRanges==='function') window.refreshRanges();
      if(typeof window.applyFilters==='function') window.applyFilters();

      const heading=document.querySelector('.summary-row h2');
      if(heading) heading.textContent=subLabel+' catalog';
      const notice=document.querySelector('.notice');
      if(notice && (!window.catalog || window.catalog.length===0)){
        notice.textContent='Supplier identity is kept internal. This page is ready for published '+subLabel+' products.';
      }
      const empty=document.querySelector('.empty h3');
      const emptyP=document.querySelector('.empty p');
      if(empty && /No published products/i.test(empty.textContent)) empty.textContent='No published '+subLabel+' products yet';
      if(emptyP && /Products will appear here/i.test(emptyP.textContent)) emptyP.textContent=subLabel+' products will appear here after they are added in Admin and set to Published.';
      return true;
    }

    if(topLabel){
      search.value=topLabel;
      search.dispatchEvent(new Event('input',{bubbles:true}));
      return true;
    }
    return false;
  }

  let tries=0;
  const timer=setInterval(function(){
    tries++;
    if(applyRequestedContext() || tries>60) clearInterval(timer);
  },100);

  [800,1400,2200].forEach(ms=>setTimeout(applyRequestedContext,ms));
})();

// Ensure View Details uses the SKU fields that actually exist in the public SKU view.
(function(){
  if(!location.pathname.includes('listing-supabase-live.html')) return;
  if(!window.supabase || !window.BFI_SUPABASE) return;

  const client=supabase.createClient(window.BFI_SUPABASE.url,window.BFI_SUPABASE.publishableKey,{auth:{persistSession:false,autoRefreshToken:false,detectSessionInUrl:false}});
  let productIdByName={};
  let skuByProduct={};

  Promise.all([
    client.from('public_product_catalog').select('product_id,product_name'),
    client.from('public_product_skus').select('*')
  ]).then(([productsRes,skuRes])=>{
    (productsRes.data||[]).forEach(p=>{productIdByName[p.product_name]=p.product_id;});
    (skuRes.data||[]).forEach(s=>{if(!skuByProduct[s.product_id]||s.is_default)skuByProduct[s.product_id]=s;});
    applyDetails();
  });

  function setDetail(label,value){
    if(value===null||value===undefined||String(value).trim()==='') return;
    document.querySelectorAll('#mDetails .detail-item').forEach(item=>{
      if(item.querySelector('b')?.textContent?.trim().toLowerCase()===label.toLowerCase()){
        const span=item.querySelector('span'); if(span) span.textContent=value;
      }
    });
  }

  function applyDetails(){
    const modal=document.getElementById('productModal');
    if(!modal?.classList.contains('open')) return;
    const name=document.getElementById('mName')?.textContent?.trim();
    const id=productIdByName[name];
    const s=skuByProduct[id];
    if(!s) return;

    setDetail('SKU',s.sku_code||s.code);
    const packSize=s.label || ([s.pack_weight,s.pack_weight_unit].filter(Boolean).join(' '));
    setDetail('Pack size',packSize);
    setDetail('Packs per carton',s.packs_per_carton);

    const packDims=[s.pack_length_cm,s.pack_width_cm,s.pack_height_cm].filter(v=>v!==null&&v!==undefined&&v!=='').join(' × ');
    if(packDims) setDetail('Pack dimensions',packDims+' cm');

    const cartonDims=[s.carton_length_cm,s.carton_width_cm,s.carton_height_cm].filter(v=>v!==null&&v!==undefined&&v!=='').join(' × ');
    if(cartonDims) setDetail('Carton dimensions',cartonDims+' cm');
    if(s.carton_gross_weight_kg) setDetail('Carton gross weight',s.carton_gross_weight_kg+' kg');
  }

  const observer=new MutationObserver(()=>setTimeout(applyDetails,0));
  observer.observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['class']});
  document.addEventListener('click',()=>setTimeout(applyDetails,20),true);
})();