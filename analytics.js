// Buy From Iran — first-party anonymous analytics (Supabase)
// Stores anonymous page-view events only. No names, email, phone, or IP are collected here.
(function(){
  if(!window.supabase || !window.BFI_SUPABASE) return;
  if(location.pathname.includes('admin-supabase-live.html')) return;

  const key='bfi_visitor_id';
  let visitorId=localStorage.getItem(key);
  if(!visitorId){
    visitorId=(crypto.randomUUID