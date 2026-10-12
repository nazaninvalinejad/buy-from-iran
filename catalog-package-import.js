// Buy From Iran — Catalog Package Import
// ZIP contains one Excel workbook (sheet: Bulk Import) plus image files.
// Excel column "Image Filename" links each product row to its image.
(function(){
  if(!location.pathname.includes('admin-supabase-live.html')) return;

  const state={zip:null,rows:[],headers:[],files:new Map(),ready:false};
  const clean=v=>String(v??'').trim();
  const slug=v=>String(v||'').toLowerCase().replace(/&/g,'and').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  const esc=v=>String(v??'').replace(/[&<>"']/g,s=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]));

  function loadScript(src){
    return new Promise((resolve,reject)=>{
      const existing=[...document.scripts].find(s=>s.src===src||s.src.includes(src));
      if(existing){ if(window.JSZip) resolve(); else existing.addEventListener('load',resolve,{once:true}); return; }
      const s=document.createElement('script');s.src=src;s.onload=resolve;s.onerror=reject;document.head.appendChild(s);
    });
  }

  function normalizeRow(row){const o={};Object.keys(row||{}).forEach(k=>o[String(k).trim()]=row[k]);return o;}
  function basename(path){return String(path||'').split('/').pop().toLowerCase();}
  function imageNameFromRow(row){return clean(row['Image Filename']||row['Image File']||row['Primary Image']);}
  function productSlugFromRow(row){return clean(row['Product Slug'])||slug(clean(row['Product Name']));}

  function injectUi(){
    const bulk=document.getElementById('bulk');
    if(!bulk||document.getElementById('catalogPackageCard')) return false;
    const cards=bulk.querySelectorAll('.card');
    const anchor=cards[0];
    if(!anchor) return false;
    const card=document.createElement('div');
    card.id='catalogPackageCard';card.className='card';
    card.innerHTML=`
      <div class="top" style="margin-bottom:10px"><h3 style="margin:0;color:#123c56">Catalog Package Import</h3><span class="small">Excel + product images in one ZIP</span></div>
      <div class="tabs-note" style="margin-bottom:12px">Recommended workflow: upload one ZIP containing the Bulk Import Excel file and the extracted product images. The <strong>Image Filename</strong> column links each image to the correct product automatically.</div>
      <div class="formgrid two">
        <div class="field"><label>Catalog Package (.zip)</label><input id="catalogZipFile" type="file" accept=".zip"></div>
        <div class="field"><label>Package Status</label><div id="catalogZipStatus" style="padding:10px 0;color:#64748b">No package loaded</div></div>
      </div>
      <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">
        <button id="catalogPreviewBtn" type="button" class="btn secondary">Preview Package</button>
        <button id="catalogImportBtn" type="button" class="btn primary" disabled>Import Products + Images</button>
      </div>
      <div id="catalogPackagePreview" style="margin-top:14px"></div>`;
    anchor.parentElement.insertBefore(card,anchor.nextSibling);
    document.getElementById('catalogPreviewBtn').addEventListener('click',previewPackage);
    document.getElementById('catalogImportBtn').addEventListener('click',importPackage);
    return true;
  }

  async function previewPackage(){
    const input=document.getElementById('catalogZipFile');
    const status=document.getElementById('catalogZipStatus');
    const preview=document.getElementById('catalogPackagePreview');
    const btn=document.getElementById('catalogImportBtn');
    btn.disabled=true;state.ready=false;state.rows=[];state.files.clear();
    const file=input.files[0];if(!file){status.textContent='Choose a ZIP package first.';return;}
    status.textContent='Reading package…';preview.innerHTML='';
    try{
      if(!window.JSZip) await loadScript('https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js');
      const zip=await JSZip.loadAsync(file);state.zip=zip;
      const entries=Object.values(zip.files).filter(f=>!f.dir);
      const excel=entries.find(f=>/\.xlsx?$/i.test(f.name));
      if(!excel) throw new Error('No Excel file found in ZIP.');
      entries.forEach(f=>state.files.set(basename(f.name),f));
      const excelBytes=await excel.async('uint8array');
      const wb=XLSX.read(excelBytes,{type:'array'});
      const sheet=wb.Sheets['Bulk Import']||wb.Sheets[wb.SheetNames[0]];
      const rows=XLSX.utils.sheet_to_json(sheet,{defval:''}).map(normalizeRow).filter(r=>clean(r['Product Name'])||clean(r['SKU Code']));
      if(!rows.length) throw new Error('No product rows found in Excel.');
      state.rows=rows;state.headers=Object.keys(rows[0]);
      const required=['Supplier Code','Supplier Name','Main Category','Subcategory','Range Code','Product Name','Product Status'];
      const missing=required.filter(h=>!state.headers.includes(h));if(missing.length) throw new Error('Missing required columns: '+missing.join(', '));
      const imageStats=rows.map(r=>{
        const n=imageNameFromRow(r);return {name:n,ok:!!n&&state.files.has(basename(n)),product:clean(r['Product Name'])};
      });
      const matched=imageStats.filter(x=>x.ok).length;
      const missingImages=imageStats.filter(x=>x.name&&!x.ok);
      const noImage=imageStats.filter(x=>!x.name);
      preview.innerHTML=`
        <div style="display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;margin-bottom:10px">
          <div class="bfiBulkSummaryItem"><b>Rows</b>${rows.length}</div>
          <div class="bfiBulkSummaryItem"><b>Images matched</b>${matched}</div>
          <div class="bfiBulkSummaryItem"><b>Image missing</b>${missingImages.length}</div>
          <div class="bfiBulkSummaryItem"><b>No image assigned</b>${noImage.length}</div>
        </div>
        <div style="overflow:auto;max-height:340px;border:1px solid #e1e8ee;border-radius:10px"><table style="width:max-content;min-width:100%"><thead><tr><th>Product</th><th>SKU</th><th>Image Filename</th><th>Image Match</th><th>Status</th></tr></thead><tbody>${rows.slice(0,50).map(r=>{const n=imageNameFromRow(r);const ok=!!n&&state.files.has(basename(n));return `<tr><td>${esc(r['Product Name'])}</td><td>${esc(r['SKU Code'])}</td><td>${esc(n||'—')}</td><td>${n?(ok?'<span class="badge green">Matched</span>':'<span class="badge" style="background:#fff0f0;color:#b42318">Missing</span>'):'<span class="small">No image</span>'}</td><td>${esc(r['Product Status']||'draft')}</td></tr>`;}).join('')}</tbody></table></div>`;
      status.textContent=`Package ready: ${rows.length} row(s), ${matched} image match(es).`;
      state.ready=missingImages.length===0;btn.disabled=!state.ready;
      if(!state.ready) status.textContent+=' Fix missing image filenames before import.';
    }catch(err){console.error(err);status.textContent='Could not read package: '+(err?.message||String(err));}
  }

  async function importPackage(){
    const status=document.getElementById('catalogZipStatus');
    const btn=document.getElementById('catalogImportBtn');
    if(!state.ready||!state.rows.length){status.textContent='Preview a valid package first.';return;}
    btn.disabled=true;btn.textContent='Importing…';
    try{
      // Reuse the same validated rows and existing Bulk Import functions.
      bulkRows=state.rows;
      await runBulkImport();
      // runBulkImport refreshes products; now attach unique images to product records.
      const seen=new Set();let uploaded=0;
      for(const row of state.rows){
        const imageName=imageNameFromRow(row);if(!imageName) continue;
        const pSlug=productSlugFromRow(row);const product=products.find(p=>String(p.slug).toLowerCase()===pSlug.toLowerCase());
        if(!product) throw new Error('Product not found after import: '+clean(row['Product Name']));
        const zipFile=state.files.get(basename(imageName));if(!zipFile) throw new Error('Image missing in ZIP: '+imageName);
        const dedupeKey=product.id+'|'+basename(imageName);if(seen.has(dedupeKey)) continue;seen.add(dedupeKey);
        const blob=await zipFile.async('blob');
        const ext=(basename(imageName).split('.').pop()||'jpg').toLowerCase();
        const storagePath=product.id+'/catalog-'+Date.now()+'-'+Math.random().toString(36).slice(2,7)+'.'+ext;
        const up=await sb.storage.from('product-images').upload(storagePath,blob,{upsert:false,contentType:blob.type||undefined});
        if(up.error) throw up.error;
        const existingPrimary=images.find(i=>i.product_id===product.id&&i.is_primary);
        const {error}=await sb.from('product_images').insert({product_id:product.id,sku_id:null,storage_path:storagePath,alt_text:clean(row['Product Name'])||null,is_primary:!existingPrimary});
        if(error){await sb.storage.from('product-images').remove([storagePath]);throw error;}
        uploaded++;
      }
      await loadAll();
      status.textContent=`Catalog package imported successfully: ${state.rows.length} row(s), ${uploaded} image(s) uploaded.`;
      alert(status.textContent);
    }catch(err){console.error(err);status.textContent='Package import failed: '+(err?.message||String(err));alert(status.textContent);}
    finally{btn.disabled=false;btn.textContent='Import Products + Images';}
  }

  let tries=0;const timer=setInterval(()=>{tries++;if(injectUi()||tries>100)clearInterval(timer);},100);
})();