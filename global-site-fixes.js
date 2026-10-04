// Buy From Iran — global public-site normalization.
// Keeps shared navigation taxonomy and contact details consistent across all public pages.
(function(){
  if(location.pathname.includes('admin-supabase-live.html')) return;

  const PHONE_DISPLAY='+98 912 220 2363';
  const PHONE_TEL='+989122202363';
  const EMAIL='hello@buyfromiran.com';
  const ADDRESS='Vanak Square, Valiasr St, Tehran, Iran';

  const cols=[
    {
      title:'AGRICULTURE & FOOD',
      items:[
        ['Biscuits & Crackers','agriculture-food','biscuits-crackers'],['Wafers','agriculture-food','wafers'],['Cakes & Cookies','agriculture-food','cakes-cookies'],['Chocolate & Confectionery','agriculture-food','chocolate-confectionery'],['Candy, Toffee & Gummies','agriculture-food','candy-toffee-gummies'],['Snacks & Chips','agriculture-food','snacks-chips'],['Tomato Paste','agriculture-food','tomato-paste'],['Sauces & Condiments','agriculture-food','sauces-condiments'],['Canned Foods','agriculture-food','canned-foods'],['Pickles & Olives','agriculture-food','pickles-olives'],['Pasta & Noodles','agriculture-food','pasta-noodles'],['Jams, Honey & Spreads','agriculture-food','jams-honey-spreads'],['Nuts & Dried Fruits','agriculture-food','nuts-dried-fruits'],['Saffron & Spices','agriculture-food','saffron-spices'],['Rice, Grains & Pulses','agriculture-food','rice-grains-pulses']
      ]
    },
    {
      title:'BEVERAGE',
      items:[['Fruit Juices & Nectars','beverage','fruit-juices-nectars'],['Malt & Non-Alcoholic Beverages','beverage','malt-non-alcoholic-beverages'],['Soft Drinks & Energy Drinks','beverage','soft-drinks-energy-drinks'],['Tea & Herbal Infusions','beverage','tea-herbal-infusions'],['Coffee','beverage','coffee'],['Syrups & Concentrates','beverage','syrups-concentrates'],['Water & Functional Beverages','beverage','water-functional-beverages']]
    },
    {
      title:'PERSONAL CARE',
      items:[['Hair Care','personal-care','hair-care'],['Skin Care','personal-care','skin-care'],['Bath & Body','personal-care','bath-body'],['Hand & Personal Hygiene','personal-care','hand-personal-hygiene'],['Oral Care','personal-care','oral-care'],['Baby Care','personal-care','baby-care'],['Feminine Care','personal-care','feminine-care']]
    },
    {
      title:'HOME CARE',
      items:[['Laundry Care','home-care','laundry-care'],['Dishwashing','home-care','dishwashing'],['Surface & Floor Cleaners','home-care','surface-floor-cleaners'],['Bleach & Disinfectants','home-care','bleach-disinfectants'],['Bathroom & Toilet Cleaners','home-care','bathroom-toilet-cleaners'],['Air Fresheners','home-care','air-fresheners']]
    },
    {
      title:'TEXTILE & APPAREL',
      items:[['T-Shirts','textile-apparel','t-shirts'],['Trousers & Pants','textile-apparel','trousers-pants'],['Socks','textile-apparel','socks'],['Caps & Hats','textile-apparel','caps-hats'],['Towels','textile-apparel','towels'],['Bed Sheets','textile-apparel','bed-sheets']]
    }
  ];

  function listingHref(cat,sub){
    return 'listing-supabase-live.html?cat='+encodeURIComponent(cat)+'&sub='+encodeURIComponent(sub);
  }

  function normalizeMegaMenus(){
    document.querySelectorAll('.mega-menu').forEach(menu=>{
      menu.innerHTML=cols.map(col=>
        '<div class="mega-col"><div class="mega-col__title">'+col.title+'</div>'+col.items.map(i=>'<a href="'+listingHref(i[1],i[2])+'">'+i[0]+'</a>').join('')+'</div>'
      ).join('');
    });
  }

  function replaceTextEverywhere(oldText,newText){
    const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
    const nodes=[];
    while(walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(n=>{if(n.nodeValue&&n.nodeValue.includes(oldText)) n.nodeValue=n.nodeValue.split(oldText).join(newText);});
  }

  function normalizeContact(){
    replaceTextEverywhere('+98 21 4000 5000',PHONE_DISPLAY);
    replaceTextEverywhere('Valiasr St, Tehran, Iran',ADDRESS);
    replaceTextEverywhere('Vanak Square, Valiasr St, Tehran, Iran',ADDRESS);

    document.querySelectorAll('a[href^="tel:"]').forEach(a=>a.setAttribute('href','tel:'+PHONE_TEL));
    document.querySelectorAll('a[href^="mailto:"]').forEach(a=>a.setAttribute('href','mailto:'+EMAIL));

    document.querySelectorAll('.footer-contact-item, .util-bar__link').forEach(el=>{
      const t=(el.textContent||'').trim();
      if(/\+98\s*21\s*4000\s*5000/.test(t) || /\+98\s*912\s*220\s*2363/.test(t)){
        Array.from(el.childNodes).forEach(n=>{if(n.nodeType===Node.TEXT_NODE) n.textContent=' '+PHONE_DISPLAY;});
      }
      if(/Valiasr St, Tehran, Iran|Vanak Square, Valiasr St, Tehran, Iran/.test(t)){
        Array.from(el.childNodes).forEach(n=>{if(n.nodeType===Node.TEXT_NODE) n.textContent=' '+ADDRESS;});
      }
      if(/hello@buyfromiran\.com/i.test(t)){
        Array.from(el.childNodes).forEach(n=>{if(n.nodeType===Node.TEXT_NODE) n.textContent=' '+EMAIL;});
      }
    });
  }

  function run(){
    normalizeMegaMenus();
    normalizeContact();
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',run,{once:true}); else run();
  setTimeout(run,300);
  setTimeout(run,1000);
})();