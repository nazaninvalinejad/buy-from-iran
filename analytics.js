// Buy From Iran — first-party anonymous analytics (Supabase)
// Stores anonymous page-view events only. No names, email, phone, or IP are collected here.
(function(){
  if(!window.supabase || !window.BFI_SUPABASE) return;
  if(location.pathname.includes('admin-supabase-live.html')) return;

  const key='bfi_visitor_id';
  let visitorId=localStorage.getItem(key);
  if(!visitorId){
    visitorId=(crypto.randomUUID?crypto.randomUUID():Date.now()+'-'+Math.random().toString(36).slice(2));
    localStorage.setItem(key,visitorId);
  }
  const sessionKey='bfi_session_id';
  let sessionId=sessionStorage.getItem(sessionKey);
  if(!sessionId){
    sessionId=(crypto.randomUUID?crypto.randomUUID():Date.now()+'-'+Math.random().toString(36).slice(2));
    sessionStorage.setItem(sessionKey,sessionId);
  }

  function deviceType(){
    const ua=navigator.userAgent||'';
    if(/ipad|tablet/i.test(ua)) return 'Tablet';
    if(/mobi|android|iphone/i.test(ua)) return 'Mobile';
    return 'Desktop';
  }
  function browserName(){
    const ua=navigator.userAgent||'';
    if(/Edg\//.test(ua)) return 'Edge';
    if(/OPR\//.test(ua)) return 'Opera';
    if(/Chrome\//.test(ua)) return 'Chrome';
    if(/Safari\//.test(ua) && !/Chrome\//.test(ua)) return 'Safari';
    if(/Firefox\//.test(ua)) return 'Firefox';
    return 'Other';
  }

  const client=window.__BFI_ANALYTICS_SB || supabase.createClient(
    window.BFI_SUPABASE.url,
    window.BFI_SUPABASE.publishableKey,
    {auth:{persistSession:false,autoRefreshToken:false,detectSessionInUrl:false}}
  );
  window.__BFI_ANALYTICS_SB=client;

  const cleanReferrer=document.referrer && !document.referrer.startsWith(location.origin)
    ? document.referrer.slice(0,500)
    : null;

  async function recordPageView(){
    let country=null;
    try{
      const response=await fetch('/api/geo',{cache:'no-store'});
      if(response.ok){
        const geo=await response.json();
        country=geo && geo.country ? String(geo.country).slice(0,10) : null;
      }
    }catch(_){}

    const {error}=await client.from('analytics_events').insert({
      event_type:'page_view',
      visitor_id:visitorId,
      session_id:sessionId,
      page_path:location.pathname+(location.search||''),
      page_title:document.title||null,
      referrer:cleanReferrer,
      device_type:deviceType(),
      browser:browserName(),
      country
    });
    if(error) console.debug('Analytics event not recorded');
  }

  recordPageView();
})();

// Load the deterministic Homepage translation layer independently from analytics logic.
(function(){
  const p=location.pathname;
  if(!(p==='/' || p.endsWith('/index.html'))) return;
  if(document.querySelector('script[data-bfi-i18n]')) return;
  const s=document.createElement('script');
  s.src='./i18n-home.js';
  s.defer=true;
  s.dataset.bfiI18n='1';
  document.head.appendChild(s);
})();

// Preserve old Homepage category/subcategory URLs on the new live catalog.
(function(){
  if(!location.pathname.endsWith('/listing-supabase-live.html') && !location.pathname.endsWith('listing-supabase-live.html')) return;
  if(document.querySelector('script[data-bfi-listing-filter]')) return;
  const s=document.createElement('script');
  s.src='./listing-query-filter.js';
  s.defer=true;
  s.dataset.bfiListingFilter='1';
  document.head.appendChild(s);
})();

// Admin-only enhancement: make Bulk Import Preview fully inspectable before import.
(function(){
  if(!location.pathname.includes('admin-supabase-live.html')) return;

  const critical=['Supplier Code','Supplier Name','Main Category','Subcategory','Range Code','Product Status'];

  function install(){
    const head=document.getElementById('bulkHead');
    const body=document.getElementById('bulkBody');
    if(!head || !body || typeof window.renderBulkPreview!=='function') return false;
    if(window.__BFI_BULK_PREVIEW_PATCHED) return true;
    window.__BFI_BULK_PREVIEW_PATCHED=true;

    const style=document.createElement('style');
    style.textContent=`
      #bulk .card:last-child{overflow:hidden}
      #bulk .card:last-child>div:last-child{overflow-x:auto!important;overflow-y:auto!important;max-height:520px!important;width:100%!important;border:1px solid #e8edf1;border-radius:10px}
      #bulk .card:last-child table{width:max-content!important;min-width:100%!important;table-layout:auto!important}
      #bulk .card:last-child th,#bulk .card:last-child td{min-width:140px!important;max-width:240px!important;white-space:normal!important;word-break:break-word!important;background:#fff}
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
      head.innerHTML='<tr>'+ordered.map(h=>'<th data-critical="'+(critical.includes(h)?'1':'0')+'">'+window.esc(h)+'</th>').join('')+'</tr>';
      body.innerHTML=rows.slice(0,25).map(r=>'<tr>'+ordered.map(h=>'<td data-critical="'+(critical.includes(h)?'1':'0')+'">'+window.esc(r[h]??'')+'</td>').join('')+'</tr>').join('');
      const count=document.getElementById('bulkCount');
      if(count) count.textContent=rows.length+' row(s) loaded'+(rows.length>25?' — first 25 shown':'')+' — all columns visible';

      let summary=document.getElementById('bfiBulkCriticalSummary');
      if(!summary){
        summary=document.createElement('div');
        summary.id='bfiBulkCriticalSummary';
        const previewCard=head.closest('.card');
        const tableWrap=head.closest('table')?.parentElement;
        if(previewCard && tableWrap) previewCard.insertBefore(summary,tableWrap);
      }
      if(summary){
        const first=rows[0]||{};
        summary.innerHTML=critical.map(h=>'<div class="bfiBulkSummaryItem"><b>'+window.esc(h)+'</b>'+window.esc(first[h]??'—')+'</div>').join('');
      }
    };
    return true;
  }

  let tries=0;
  const timer=setInterval(()=>{
    tries++;
    if(install()||tries>50) clearInterval(timer);
  },100);
})();