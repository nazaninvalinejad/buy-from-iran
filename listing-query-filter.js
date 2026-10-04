// Apply legacy Homepage ?cat=&sub= links to the new live catalog filters.
(function(){
  if(!location.pathname.endsWith('/listing-supabase-live.html') && !location.pathname.endsWith('listing-supabase-live.html')) return;

  function slugify(v){
    return String(v||'').toLowerCase().replace(/&/g,'and').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  }

  const params=new URLSearchParams(location.search);
  const catSlug=slugify(params.get('cat'));
  const subSlug=slugify(params.get('sub'));
  if(!catSlug && !subSlug) return;

  let tries=0;
  const timer=setInterval(function(){
    tries++;
    const category=document.getElementById('categoryFilter');
    if(!category || category.options.length<=1){
      if(tries>80) clearInterval(timer);
      return;
    }

    let matched='';
    if(subSlug){
      for(const opt of category.options){
        if(slugify(opt.textContent)===subSlug){ matched=opt.value; break; }
      }
    }

    if(matched){
      clearInterval(timer);
      category.value=matched;
      category.dispatchEvent(new Event('change',{bubbles:true}));
      return;
    }

    // For top-level category links, narrow the catalog by parent category through the search field.
    if(catSlug){
      const topLabels={
        'agriculture-food':'Agriculture & Food',
        'beverage':'Beverage',
        'personal-care':'Personal Care',
        'home-care':'Home Care',
        'textile-apparel':'Textile & Apparel'
      };
      const label=topLabels[catSlug];
      const search=document.getElementById('searchInput');
      if(label && search){
        clearInterval(timer);
        search.value=label;
        search.dispatchEvent(new Event('input',{bubbles:true}));
      }
    }

    if(tries>80) clearInterval(timer);
  },100);
})();