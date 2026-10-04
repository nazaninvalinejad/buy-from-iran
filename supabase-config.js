// Buy From Iran — Supabase config
// Safe for browser use: Publishable key only.
// NEVER place a Supabase Secret key in frontend code.

window.BFI_SUPABASE = {
  url: "https://qffludknayrshiisazqe.supabase.co",
  publishableKey: "sb_publishable_3Y9IEf5ZmyJKHNG2kAL8tQ_ekpFHsdz"
};

// Admin enhancement: make Bulk Import Preview show all columns clearly before import.
(function(){
  if(!location.pathname.includes('admin-supabase-live.html')) return;

  const critical=['Supplier Code','Supplier Name','Main Category','Subcategory','Range Code','Product Status'];

  function escLocal(v){
    return String(v??'').replace(/[&<>"']/g,s=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]));
  }

  function install(){
    if(window.__BFI_BULK_PREVIEW_PATCHED) return true;
    if(typeof window.renderBulkPreview!=='function') return false;
    const head=document.getElementById('bulkHead');
    const body=document.getElementById('bulkBody');
    if(!head||!body) return false;

    window.__BFI_BULK_PREVIEW_PATCHED=true;

    const style=document.createElement('style');
    style.textContent=`
      #bulk .card:last-child{overflow:hidden}
      #bulk .card:last-child>div:last-child{overflow-x:auto!important;overflow-y:auto!important;max-height:520px!important;width:100%!important;border:1px solid #e8edf1;border-radius:10px}
      #bulk .card:last-child table{width:max-content!important;min-width:100%!important;table-layout:auto!important}
      #bulk .card:last-child th,#bulk .card:last-child td{min-width:150px!important;max-width:260px!important;white-space:normal!important;word-break:break-word!important;background:#fff}
      #bulk .card:last-child th{position:sticky;top:0;z-index:3;background:#f7f9fb!important}
      #bulk .card:last-child th[data-critical="1"]{background:#eaf2ff!important;color:#1a5fd4!important}
      #bulk .card:last-child td[data-critical="1"]{background:#f7faff!important;font-weight:700;color:#123c56}
      #bulk .card:last-child th:first-child,#bulk .card:last-child td:first-child{position:sticky;left:0;z-index:2;box-shadow:2px 0 0 #edf1f4}
      #bulk .card:last-child th:first-child{z-index:4}
      #bfiBulkCriticalSummary{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin:10px 0 12px}
      .bfiBulkSummaryItem{background:#f7f9fb;border:1px solid #e1e8ee;border-radius:9px;padding:9px 10px;font-size:12px}
      .bfiBulkSummaryItem b{display:block;color:#64748b;font-size:10px;text-transform:uppercase;margin-bottom:3px}
      @media(max-width:900px){#bfiBulkCriticalSummary{grid-template-columns:1fr 1fr}}
    `;
    document.head.appendChild(style);

    window.renderBulkPreview=function(headers,rows){
      const ordered=[...critical.filter(h=>headers.includes(h)),...headers.filter(h=>!critical.includes(h))];
      head.innerHTML='<tr>'+ordered.map(h=>'<th data-critical="'+(critical.includes(h)?'1':'0')+'">'+escLocal(h)+'</th>').join('')+'</tr>';
      body.innerHTML=rows.slice(0,25).map(r=>'<tr>'+ordered.map(h=>'<td data-critical="'+(critical.includes(h)?'1':'0')+'">'+escLocal(r[h]??'')+'</td>').join('')+'</tr>').join('');

      const count=document.getElementById('bulkCount');
      if(count) count.textContent=rows.length+' row(s) loaded'+(rows.length>25?' — first 25 shown':'')+' — all columns visible';

      let summary=document.getElementById('bfiBulkCriticalSummary');
      const tableWrap=head.closest('table')?.parentElement;
      if(!summary && tableWrap){
        summary=document.createElement('div');
        summary.id='bfiBulkCriticalSummary';
        tableWrap.parentElement.insertBefore(summary,tableWrap);
      }
      if(summary){
        const first=rows[0]||{};
        summary.innerHTML=critical.map(h=>'<div class="bfiBulkSummaryItem"><b>'+escLocal(h)+'</b>'+escLocal(first[h]??'—')+'</div>').join('');
      }
    };
    return true;
  }

  let tries=0;
  const timer=setInterval(()=>{
    tries++;
    if(install()||tries>100) clearInterval(timer);
  },100);
})();

// Admin enhancement: load Catalog Package Import (Excel + images in one ZIP).
(function(){
  if(!location.pathname.includes('admin-supabase-live.html')) return;
  if(document.querySelector('script[data-bfi-catalog-package]')) return;
  const s=document.createElement('script');
  s.src='./catalog-package-import.js';
  s.defer=true;
  s.dataset.bfiCatalogPackage='1';
  document.head.appendChild(s);
})();

// Public catalog fix: convert product_images.storage_path into a usable public Storage URL.
(function(){
  if(!location.pathname.includes('listing-supabase-live.html')) return;

  function installImageFix(){
    if(typeof window.supabase==='undefined' || typeof window.imageMap==='undefined' || typeof window.applyFilters!=='function') return false;
    if(window.__BFI_PUBLIC_IMAGE_FIX) return true;
    window.__BFI_PUBLIC_IMAGE_FIX=true;

    const client=window.__BFI_PUBLIC_IMAGE_SB || supabase.createClient(
      window.BFI_SUPABASE.url,
      window.BFI_SUPABASE.publishableKey,
      {auth:{persistSession:false,autoRefreshToken:false,detectSessionInUrl:false}}
    );
    window.__BFI_PUBLIC_IMAGE_SB=client;

    (async()=>{
      const {data,error}=await client.from('public_product_images').select('*');
      if(error){console.error('Could not load product images',error);return;}
      (data||[]).forEach(i=>{
        if(!i.product_id||!i.storage_path) return;
        const publicUrl=client.storage.from('product-images').getPublicUrl(i.storage_path).data.publicUrl;
        if(!window.imageMap[i.product_id]||i.is_primary) window.imageMap[i.product_id]=publicUrl;
      });
      window.applyFilters();
    })();
    return true;
  }

  let tries=0;
  const timer=setInterval(()=>{
    tries++;
    if(installImageFix()||tries>100) clearInterval(timer);
  },100);
})();