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

  client.from('analytics_events').insert({
    event_type:'page_view',
    visitor_id:visitorId,
    session_id:sessionId,
    page_path:location.pathname+(location.search||''),
    page_title:document.title||null,
    referrer:cleanReferrer,
    device_type:deviceType(),
    browser:browserName()
  }).then(({error})=>{ if(error) console.debug('Analytics event not recorded'); });
})();