// Buy From Iran — lead tracking
(function(){
  if(!window.supabase || !window.BFI_SUPABASE) return;
  const sb=window.__BFI_LEADS_SB || supabase.createClient(
    window.BFI_SUPABASE.url,
    window.BFI_SUPABASE.publishableKey,
    {auth:{persistSession:false,autoRefreshToken:false,detectSessionInUrl:false}}
  );
  window.__BFI_LEADS_SB=sb;

  function visitorId(){ return localStorage.getItem('bfi_visitor_id') || null; }
  async function submit(source, extra){
    const payload=Object.assign({
      p_source:source,
      p_full_name:null,p_company_name:null,p_email:null,p_phone:null,
      p_subject:null,p_message:null,p_visitor_id:visitorId(),
      p_page_path:location.pathname+(location.search||''),
      p_product_name:null,p_range_code:null
    },extra||{});
    try{ await sb.rpc('submit_lead',payload); }catch(_){}
  }

  document.addEventListener('click',function(e){
    const a=e.target.closest && e.target.closest('a[href*="wa.me"],a[href*="api.whatsapp.com"]');
    if(a) submit('whatsapp',{p_subject:'WhatsApp click'});
  },true);

  document.addEventListener('DOMContentLoaded',function(){
    const widget=document.querySelector('elevenlabs-convai');
    if(!widget) return;
    widget.addEventListener('elevenlabs-convai:call',function(){
      const key='bfi_chatbot_lead_'+location.pathname;
      if(sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key,'1');
      submit('chatbot',{p_subject:'Chatbot conversation started'});
    });
  });
})();