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

  window.BFITrackLead=submit;

  document.addEventListener('click',function(e){
    const a=e.target.closest && e.target.closest('a[href*="wa.me"],a[href*="api.whatsapp.com"],[data-bfi-whatsapp]');
    if(!a) return;
    submit('whatsapp',{
      p_subject:a.getAttribute('data-bfi-subject')||'WhatsApp click',
      p_product_name:a.getAttribute('data-bfi-product')||null,
      p_range_code:a.getAttribute('data-bfi-range')||null
    });
  },true);

  async function mountWhatsApp(){
    try{
      const {data,error}=await sb.from('contact_settings')
        .select('whatsapp,whatsapp_message_template')
        .eq('setting_key','default')
        .single();
      if(error || !data || !data.whatsapp) return;
      if(document.querySelector('[data-bfi-floating-whatsapp]')) return;

      const phone=String(data.whatsapp).replace(/\D/g,'');
      if(!phone) return;

      const a=document.createElement('a');
      a.href='https://wa.me/'+phone+'?text='+encodeURIComponent('Hello, I would like more information about Buy From Iran.');
      a.target='_blank';
      a.rel='noopener';
      a.setAttribute('data-bfi-whatsapp','1');
      a.setAttribute('data-bfi-floating-whatsapp','1');
      a.setAttribute('data-bfi-subject','Floating WhatsApp click');
      a.setAttribute('aria-label','Chat with Buy From Iran on WhatsApp');
      a.textContent='WhatsApp';
      Object.assign(a.style,{
        position:'fixed',right:'22px',bottom:'92px',zIndex:'9998',
        background:'#25D366',color:'#fff',padding:'12px 16px',
        borderRadius:'999px',fontWeight:'700',fontFamily:'inherit',
        boxShadow:'0 8px 24px rgba(0,0,0,.18)',textDecoration:'none'
      });
      document.body.appendChild(a);
    }catch(_){}
  }

  document.addEventListener('DOMContentLoaded',function(){
    mountWhatsApp();
    const widget=document.querySelector('elevenlabs-convai');
    if(!widget) return;

    widget.addEventListener('elevenlabs-convai:call',function(event){
      const key='bfi_chatbot_lead_'+location.pathname;
      if(!sessionStorage.getItem(key)){
        sessionStorage.setItem(key,'1');
        submit('chatbot',{p_subject:'Chatbot conversation started'});
      }

      if(!event.detail || !event.detail.config) return;
      event.detail.config.clientTools=Object.assign({},event.detail.config.clientTools||{},{
        saveQualifiedLead: async function(params){
          const p=params||{};
          const payload={
            p_full_name:p.full_name||null,
            p_company_name:p.company_name||null,
            p_email:p.email||null,
            p_phone:p.phone||null,
            p_product_name:p.product_name||null,
            p_destination_country:p.destination_country||null,
            p_quantity_needed:p.quantity_needed||null,
            p_preferred_contact:p.preferred_contact||null,
            p_message:p.notes||null,
            p_visitor_id:visitorId(),
            p_page_path:location.pathname+(location.search||'')
          };
          try{
            const {data,error}=await sb.rpc('submit_chatbot_qualification',payload);
            if(error) throw error;
            const ref=Array.isArray(data)&&data[0]?data[0].reference_no:null;
            return {
              success:true,
              reference_no:ref,
              message:ref?'Lead saved successfully. Reference #'+ref:'Lead saved successfully.'
            };
          }catch(err){
            return {success:false,message:(err&&err.message)||'Could not save lead.'};
          }
        }
      });
    });
  });
})();