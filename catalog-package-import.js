// Buy From Iran — Catalog Package Import
// Package format: one ZIP containing an Excel workbook (sheet: Bulk Import) plus product images.
// Excel column "Image Filename" links each product to the matching image file in the ZIP.
(function(){
  if(!location.pathname.includes('admin-supabase-live.html')) return;

  const state={zip:null,rows:[],headers:[],images:new Map(),ready:false};
  const esc