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