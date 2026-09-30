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
        position:'fixed',left:'22px',bottom:'24px',zIndex:'9998',
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

// Buy From Iran — homepage language switcher
(function(){
  const path=location.pathname;
  if(!(path==='/' || path.endsWith('/index.html'))) return;

  const langs={AR:'ar',EN:'en',FR:'fr',RU:'ru',ES:'es',TR:'tr'};
  const dict={
    'About':{ar:'من نحن',fr:'À propos',ru:'О нас',es:'Nosotros',tr:'Hakkımızda'},
    'Listing':{ar:'المنتجات',fr:'Produits',ru:'Каталог',es:'Productos',tr:'Ürünler'},
    'Blog':{ar:'المدونة',fr:'Blog',ru:'Блог',es:'Blog',tr:'Blog'},
    'Get a Quote':{ar:'اطلب عرض سعر',fr:'Demander un devis',ru:'Запросить цену',es:'Solicitar cotización',tr:'Teklif Al'},
    'Membership':{ar:'العضوية',fr:'Adhésion',ru:'Членство',es:'Membresía',tr:'Üyelik'},
    'Contact':{ar:'اتصل بنا',fr:'Contact',ru:'Контакты',es:'Contacto',tr:'İletişim'},
    'Sign in or Register':{ar:'تسجيل الدخول أو إنشاء حساب',fr:'Se connecter ou s’inscrire',ru:'Войти или зарегистрироваться',es:'Iniciar sesión o registrarse',tr:'Giriş yap veya kayıt ol'},
    'ADD LISTING':{ar:'أضف منتجك',fr:'AJOUTER UNE ANNONCE',ru:'ДОБАВИТЬ ТОВАР',es:'AÑADIR PRODUCTO',tr:'ÜRÜN EKLE'},
    'Type your search...':{ar:'اكتب ما تبحث عنه...',fr:'Tapez votre recherche...',ru:'Введите запрос...',es:'Escribe tu búsqueda...',tr:'Aramanızı yazın...'},
    'What are you sourcing?':{ar:'ما المنتج الذي تبحث عنه؟',fr:'Quel produit recherchez-vous ?',ru:'Что вы ищете?',es:'¿Qué producto busca?',tr:'Hangi ürünü arıyorsunuz?'},
    'All categories':{ar:'كل الفئات',fr:'Toutes les catégories',ru:'Все категории',es:'Todas las categorías',tr:'Tüm kategoriler'},
    'Search':{ar:'بحث',fr:'Rechercher',ru:'Поиск',es:'Buscar',tr:'Ara'},
    'Popular:':{ar:'الأكثر طلباً:',fr:'Populaire :',ru:'Популярное:',es:'Popular:',tr:'Popüler:'},
    'Agriculture & Food':{ar:'الزراعة والأغذية',fr:'Agriculture et alimentation',ru:'Сельское хозяйство и продукты',es:'Agricultura y alimentos',tr:'Tarım ve Gıda'},
    'Beverage':{ar:'المشروبات',fr:'Boissons',ru:'Напитки',es:'Bebidas',tr:'İçecek'},
    'Personal Care':{ar:'العناية الشخصية',fr:'Soins personnels',ru:'Личная гигиена',es:'Cuidado personal',tr:'Kişisel Bakım'},
    'Home Care':{ar:'العناية بالمنزل',fr:'Entretien de la maison',ru:'Товары для дома',es:'Cuidado del hogar',tr:'Ev Bakımı'},
    'Textile & Apparel':{ar:'المنسوجات والملابس',fr:'Textile et habillement',ru:'Текстиль и одежда',es:'Textil y prendas',tr:'Tekstil ve Giyim'},
    'A Structured B2B Sourcing Hub for Products From Iran':{ar:'منصة B2B منظمة لتوريد المنتجات من إيران',fr:'Une plateforme B2B structurée pour sourcer des produits d’Iran',ru:'Структурированная B2B-платформа для закупки товаров из Ирана',es:'Una plataforma B2B estructurada para abastecerse de productos de Irán',tr:'İran’dan ürün tedariki için yapılandırılmış bir B2B platformu'},
    'Simple & transparent':{ar:'بسيط وشفاف',fr:'Simple et transparent',ru:'Просто и прозрачно',es:'Simple y transparente',tr:'Basit ve şeffaf'},
    'How Buy From Iran works':{ar:'كيف تعمل Buy From Iran',fr:'Comment fonctionne Buy From Iran',ru:'Как работает Buy From Iran',es:'Cómo funciona Buy From Iran',tr:'Buy From Iran nasıl çalışır'},
    'STEP 1':{ar:'الخطوة 1',fr:'ÉTAPE 1',ru:'ШАГ 1',es:'PASO 1',tr:'ADIM 1'},
    'STEP 2':{ar:'الخطوة 2',fr:'ÉTAPE 2',ru:'ШАГ 2',es:'PASO 2',tr:'ADIM 2'},
    'STEP 3':{ar:'الخطوة 3',fr:'ÉTAPE 3',ru:'ШАГ 3',es:'PASO 3',tr:'ADIM 3'},
    'STEP 4':{ar:'الخطوة 4',fr:'ÉTAPE 4',ru:'ШАГ 4',es:'PASO 4',tr:'ADIM 4'},
    'Discover':{ar:'اكتشف',fr:'Découvrir',ru:'Найдите',es:'Descubrir',tr:'Keşfet'},
    'Connect':{ar:'تواصل',fr:'Se connecter',ru:'Свяжитесь',es:'Conectar',tr:'Bağlan'},
    'Verify':{ar:'تحقق',fr:'Vérifier',ru:'Проверьте',es:'Verificar',tr:'Doğrula'},
    'Ship':{ar:'الشحن',fr:'Expédier',ru:'Доставка',es:'Enviar',tr:'Sevk Et'},
    'Browse products':{ar:'تصفح المنتجات',fr:'Parcourir les produits',ru:'Смотреть товары',es:'Ver productos',tr:'Ürünlere Göz At'},
    'Request a quote':{ar:'اطلب عرض سعر',fr:'Demander un devis',ru:'Запросить цену',es:'Solicitar cotización',tr:'Teklif İste'},
    'Join as Buyer':{ar:'انضم كمشتري',fr:'Rejoindre en tant qu’acheteur',ru:'Стать покупателем',es:'Unirse como comprador',tr:'Alıcı Olarak Katıl'},
    'Become a Supplier':{ar:'انضم كمورد',fr:'Devenir fournisseur',ru:'Стать поставщиком',es:'Ser proveedor',tr:'Tedarikçi Ol'},
    'Sign In':{ar:'تسجيل الدخول',fr:'Se connecter',ru:'Войти',es:'Iniciar sesión',tr:'Giriş Yap'},
    'Register':{ar:'إنشاء حساب',fr:'S’inscrire',ru:'Регистрация',es:'Registrarse',tr:'Kayıt Ol'},
    'Email':{ar:'البريد الإلكتروني',fr:'E-mail',ru:'Эл. почта',es:'Correo electrónico',tr:'E-posta'},
    'Username':{ar:'اسم المستخدم',fr:'Nom d’utilisateur',ru:'Имя пользователя',es:'Nombre de usuario',tr:'Kullanıcı adı'},
    'Password':{ar:'كلمة المرور',fr:'Mot de passe',ru:'Пароль',es:'Contraseña',tr:'Şifre'},
    'Create Account':{ar:'إنشاء حساب',fr:'Créer un compte',ru:'Создать аккаунт',es:'Crear cuenta',tr:'Hesap Oluştur'},
    'Remember me':{ar:'تذكرني',fr:'Se souvenir de moi',ru:'Запомнить меня',es:'Recordarme',tr:'Beni hatırla'},
    'Forgot password?':{ar:'نسيت كلمة المرور؟',fr:'Mot de passe oublié ?',ru:'Забыли пароль?',es:'¿Olvidó su contraseña?',tr:'Şifrenizi mi unuttunuz?'}
  };

  const textOriginal=new WeakMap();
  const placeholderOriginal=new WeakMap();
  const norm=s=>(s||'').replace(/\s+/g,' ').trim();

  function apply(code){
    const lang=langs[code]||'en';
    document.documentElement.lang=lang;
    document.documentElement.dir=lang==='ar'?'rtl':'ltr';
    document.querySelectorAll('.lang-btn').forEach(btn=>btn.classList.toggle('active',norm(btn.textContent).toUpperCase()===code));

    const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
    let node;
    while((node=walker.nextNode())){
      const el=node.parentElement;
      if(!el || /^(SCRIPT|STYLE|TEXTAREA|OPTION)$/.test(el.tagName)) continue;
      if(!textOriginal.has(node)) textOriginal.set(node,node.nodeValue);
      const original=textOriginal.get(node);
      const key=norm(original);
      const translated=dict[key]&&dict[key][lang];
      node.nodeValue=lang==='en' || !translated ? original : (original.match(/^\s*/)||[''])[0]+translated+(original.match(/\s*$/)||[''])[0];
    }

    document.querySelectorAll('input[placeholder],textarea[placeholder]').forEach(el=>{
      if(!placeholderOriginal.has(el)) placeholderOriginal.set(el,el.getAttribute('placeholder')||'');
      const original=placeholderOriginal.get(el);
      const translated=dict[norm(original)]&&dict[norm(original)][lang];
      el.setAttribute('placeholder',lang==='en'||!translated?original:translated);
    });
    localStorage.setItem('bfi_language',code);
  }

  window.selectLang=function(btn){ apply(norm(btn.textContent).toUpperCase()); };
  window.addEventListener('load',function(){
    const saved=(localStorage.getItem('bfi_language')||'EN').toUpperCase();
    apply(langs[saved]?saved:'EN');
  });
})();