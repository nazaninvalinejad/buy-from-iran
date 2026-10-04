// Quote page enhancements: keep shared contact details current and prefill category from selected catalog product.
(function(){
  if(!location.pathname.endsWith('/quote.html') && !location.pathname.endsWith('quote.html')) return;

  const CURRENT_PHONE_DISPLAY='+98 912 220 2363';
  const CURRENT_PHONE_TEL='+989122202363';

  function updatePhone(){
    document.querySelectorAll('a[href^="tel:"]').forEach(a=>{
      if((a