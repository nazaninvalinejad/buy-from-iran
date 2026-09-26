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
    const a=e.target.closest && e.target.closest('a[href*="wa.me"],a[href*="api.whatsapp.com"]');
    if(a) submit('whatsapp',{p_subject:'WhatsApp click'});
  },true);

  document.addEventListener('DOMContentLoaded',function(){
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