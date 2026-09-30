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

// Buy From Iran — full-page language switcher for Homepage.
// Uses the existing AR / EN / FR / RU / ES / TR buttons and translates the whole visible page.
(function(){
  const path=location.pathname;
  if(!(path==='/' || path.endsWith('/index.html'))) return;

  const LANG_KEY='bfi_language';
  const codes={AR:'ar',EN:'en',FR:'fr',RU:'ru',ES:'es',TR:'tr'};
  let pendingLanguage=null;
  let translateReady=false;

  function buttonCode(btn){
    return String(btn && btn.textContent || '').replace(/\s+/g,'').toUpperCase();
  }

  function markActive(code){
    document.querySelectorAll('.lang-btn').forEach(btn=>{
      btn.classList.toggle('active',buttonCode(btn)===code);
    });
  }

  function setTranslateCookie(target){
    const value='/en/'+target;
    document.cookie='googtrans='+value+';path=/';
    document.cookie='googtrans='+value+';path=/;domain='+location.hostname;
  }

  function clearTranslateCookie(){
    document.cookie='googtrans=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
    document.cookie='googtrans=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain='+location.hostname;
  }

  function applyGoogleLanguage(code){
    const target=codes[code] || 'en';
    localStorage.setItem(LANG_KEY,code);
    markActive(code);
    document.documentElement.lang=target;
    document.documentElement.dir=target==='ar'?'rtl':'ltr';

    if(target==='en'){
      const translated=document.documentElement.classList.contains('translated-ltr') ||
        document.documentElement.classList.contains('translated-rtl') ||
        /googtrans=\/en\//.test(document.cookie);
      clearTranslateCookie();
      if(translated) location.reload();
      return;
    }

    const combo=document.querySelector('.goog-te-combo');
    if(combo){
      setTranslateCookie(target);
      combo.value=target;
      combo.dispatchEvent(new Event('change',{bubbles:true}));
    }else{
      pendingLanguage=code;
    }
  }

  // Override the inline visual-only handler on index.html.
  window.selectLang=function(btn){
    const code=buttonCode(btn);
    if(!codes[code]) return;
    if(!translateReady && code!=='EN'){
      pendingLanguage=code;
      localStorage.setItem(LANG_KEY,code);
      markActive(code);
      return;
    }
    applyGoogleLanguage(code);
  };

  // Keep Google Translate UI invisible; the existing site language buttons remain the only controls.
  const style=document.createElement('style');
  style.textContent=`
    #bfi-google-translate{position:absolute!important;left:-99999px!important;top:-99999px!important;width:1px!important;height:1px!important;overflow:hidden!important}
    .goog-te-banner-frame,.goog-te-balloon-frame,#goog-gt-tt,.goog-te-gadget-icon{display:none!important}
    body{top:0!important}
    html[dir="rtl"] .util-bar__right{margin-left:0;margin-right:auto}
    html[dir="rtl"] .nav-links{direction:rtl}
    html[dir="rtl"] .hero__content,html[dir="rtl"] .section-head,html[dir="rtl"] .footer{direction:rtl}
  `;
  document.head.appendChild(style);

  const mount=document.createElement('div');
  mount.id='bfi-google-translate';
  document.body.appendChild(mount);

  window.bfiGoogleTranslateInit=function(){
    try{
      new google.translate.TranslateElement({
        pageLanguage:'en',
        includedLanguages:'ar,en,fr,ru,es,tr',
        autoDisplay:false
      },'bfi-google-translate');
      translateReady=true;

      const saved=(localStorage.getItem(LANG_KEY)||'EN').toUpperCase();
      markActive(codes[saved]?saved:'EN');
      if(saved!=='EN'){
        pendingLanguage=saved;
        let attempts=0;
        const timer=setInterval(()=>{
          attempts++;
          const combo=document.querySelector('.goog-te-combo');
          if(combo){
            clearInterval(timer);
            applyGoogleLanguage(pendingLanguage||saved);
            pendingLanguage=null;
          }else if(attempts>40){
            clearInterval(timer);
          }
        },100);
      }
    }catch(e){
      console.debug('Language service unavailable');
    }
  };

  window.addEventListener('load',function(){
    const saved=(localStorage.getItem(LANG_KEY)||'EN').toUpperCase();
    markActive(codes[saved]?saved:'EN');
    document.documentElement.dir=saved==='AR'?'rtl':'ltr';

    if(document.querySelector('script[data-bfi-translate]')) return;
    const script=document.createElement('script');
    script.src='https://translate.google.com/translate_a/element.js?cb=bfiGoogleTranslateInit';
    script.async=true;
    script.dataset.bfiTranslate='1';
    document.head.appendChild(script);
  });
})();