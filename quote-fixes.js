// Quote page enhancements: keep shared contact details current and reliably prefill category from selected catalog product.
(function(){
  if(!location.pathname.endsWith('/quote.html') && !location.pathname.endsWith('quote.html')) return;

  const CURRENT_PHONE_DISPLAY='+98 912 220 2363';
  const CURRENT_PHONE_TEL='+989122202363';

  function updatePhone(){
    document.querySelectorAll('a[href^="tel:"]').forEach(a=>{
      a.setAttribute('href','tel:'+CURRENT_PHONE_TEL);
      const textNodes=Array.from(a.childNodes).filter(n=>n.nodeType===Node.TEXT_NODE);
      textNodes.forEach(n=>n.remove());
      a.appendChild(document.createTextNode(' '+CURRENT_PHONE_DISPLAY));
    });
  }

  async function resolveCategory(){
    const category=document.getElementById('f-category');
    if(!category || !window.supabase || !window.BFI_SUPABASE) return false;

    let item={};
    try{ item=JSON.parse(localStorage.getItem('bfi_quote_item')||'{}')||{}; }catch(_){ return false; }
    if(!item.product_id && !item.product_name) return false;

    const client=window.__BFI_QUOTE_SB || supabase.createClient(
      window.BFI_SUPABASE.url,
      window.BFI_SUPABASE.publishableKey,
      {auth:{persistSession:false,autoRefreshToken:false,detectSessionInUrl:false}}
    );
    window.__BFI_QUOTE_SB=client;

    let q=client.from('public_product_catalog').select('product_id,product_name,parent_category_name,category_name');
    q=item.product_id ? q.eq('product_id',item.product_id) : q.eq('product_name',item.product_name);
    const {data,error}=await q.limit(1).maybeSingle();
    if(error || !data) return false;

    const wanted=(data.parent_category_name||data.category_name||'').trim();
    if(!wanted) return false;

    let opt=[...category.options].find(o=>o.value.trim()===wanted || o.textContent.trim()===wanted);
    if(!opt){
      opt=document.createElement('option');
      opt.value=wanted;
      opt.textContent=wanted;
      category.appendChild(opt);
    }
    category.value=opt.value;
    category.dispatchEvent(new Event('change',{bubbles:true}));
    return category.value===opt.value;
  }

  function run(){
    updatePhone();
    resolveCategory();
    [250,700,1400,2500].forEach(ms=>setTimeout(resolveCategory,ms));
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',run,{once:true});
  else run();
})();