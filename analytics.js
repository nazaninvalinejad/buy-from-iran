// Buy From Iran — first-party anonymous analytics (Supabase)
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

// Full Homepage language switcher with Google Translate + local fallback.
(function(){
  const path=location.pathname;
  if(!(path==='/' || path.endsWith('/index.html'))) return;

  const LANG_KEY='bfi_language';
  const codes={AR:'ar',EN:'en',FR:'fr',RU:'ru',ES:'es',TR:'tr'};
  let translateReady=false;
  let pendingLanguage=null;
  const originalText=new WeakMap();
  const originalPlaceholder=new WeakMap();
  const originalOption=new WeakMap();

  const T={
    'Trusted by buyers in 120+ countries':{ar:'موثوق به من مشترين في أكثر من 120 دولة',fr:'Approuvé par des acheteurs dans plus de 120 pays',ru:'Нам доверяют покупатели более чем из 120 стран',es:'Con la confianza de compradores en más de 120 países',tr:'120’den fazla ülkedeki alıcıların güvendiği platform'},
    'BFI is helping you connect with the best wholesale material suppliers from Iran — a trusted hub for global buyers.':{ar:'تساعدك Buy From Iran على التواصل مع موردي الجملة من إيران عبر منصة موثوقة للمشترين الدوليين.',fr:'Buy From Iran vous aide à entrer en contact avec des fournisseurs grossistes iraniens via une plateforme fiable pour les acheteurs internationaux.',ru:'Buy From Iran помогает международным покупателям находить оптовых поставщиков из Ирана через надежную B2B-платформу.',es:'Buy From Iran le ayuda a conectar con proveedores mayoristas de Irán mediante una plataforma fiable para compradores internacionales.',tr:'Buy From Iran, uluslararası alıcıların İran’daki toptan tedarikçilere güvenilir bir B2B platformu üzerinden ulaşmasına yardımcı olur.'},
    'Search products':{ar:'البحث عن المنتجات',fr:'Rechercher des produits',ru:'Поиск товаров',es:'Buscar productos',tr:'Ürün ara'},
    'What are you sourcing?':{ar:'ما المنتج الذي تبحث عنه؟',fr:'Quel produit recherchez-vous ?',ru:'Что вы ищете?',es:'¿Qué producto busca?',tr:'Hangi ürünü arıyorsunuz?'},
    'Category':{ar:'الفئة',fr:'Catégorie',ru:'Категория',es:'Categoría',tr:'Kategori'},
    'All categories':{ar:'كل الفئات',fr:'Toutes les catégories',ru:'Все категории',es:'Todas las categorías',tr:'Tüm kategoriler'},
    'Supplier location':{ar:'موقع المورد',fr:'Localisation du fournisseur',ru:'Местоположение поставщика',es:'Ubicación del proveedor',tr:'Tedarikçi konumu'},
    'Tehran, Tabriz, Mashhad…':{ar:'طهران، تبريز، مشهد…',fr:'Téhéran, Tabriz, Machhad…',ru:'Тегеран, Тебриз, Мешхед…',es:'Teherán, Tabriz, Mashhad…',tr:'Tahran, Tebriz, Meşhed…'},
    'Search':{ar:'بحث',fr:'Rechercher',ru:'Поиск',es:'Buscar',tr:'Ara'},
    'Popular:':{ar:'الأكثر طلباً:',fr:'Populaire :',ru:'Популярное:',es:'Popular:',tr:'Popüler:'},
    'Biscuits & Crackers':{ar:'البسكويت والكراكرز',fr:'Biscuits et crackers',ru:'Печенье и крекеры',es:'Galletas y crackers',tr:'Bisküvi ve Kraker'},
    'Chocolate & Confectionery':{ar:'الشوكولاتة والحلويات',fr:'Chocolat et confiserie',ru:'Шоколад и кондитерские изделия',es:'Chocolate y confitería',tr:'Çikolata ve Şekerleme'},
    'Tomato Paste':{ar:'معجون الطماطم',fr:'Concentré de tomate',ru:'Томатная паста',es:'Pasta de tomate',tr:'Domates Salçası'},
    'Fruit Juices':{ar:'عصائر الفاكهة',fr:'Jus de fruits',ru:'Фруктовые соки',es:'Zumos de frutas',tr:'Meyve Suları'},
    'A Structured B2B Sourcing Hub for Products From Iran':{ar:'منصة B2B منظمة لتوريد المنتجات من إيران',fr:'Une plateforme B2B structurée pour sourcer des produits d’Iran',ru:'Структурированная B2B-платформа для закупки товаров из Ирана',es:'Una plataforma B2B estructurada para abastecerse de productos de Irán',tr:'İran’dan ürün tedariki için yapılandırılmış bir B2B platformu'},
    'Buy From Iran helps international buyers discover export-ready products across five core sectors: Agriculture & Food, Beverage, Personal Care, Home Care, and Textile & Apparel.':{ar:'تساعد Buy From Iran المشترين الدوليين على اكتشاف منتجات جاهزة للتصدير ضمن خمسة قطاعات رئيسية: الزراعة والأغذية، المشروبات، العناية الشخصية، العناية بالمنزل، والمنسوجات والملابس.',fr:'Buy From Iran aide les acheteurs internationaux à découvrir des produits prêts à l’export dans cinq secteurs principaux : agriculture et alimentation, boissons, soins personnels, entretien de la maison, textile et habillement.',ru:'Buy From Iran помогает международным покупателям находить готовые к экспорту товары в пяти основных секторах: сельское хозяйство и продукты питания, напитки, личная гигиена, товары для дома, текстиль и одежда.',es:'Buy From Iran ayuda a los compradores internacionales a descubrir productos listos para exportación en cinco sectores principales: agricultura y alimentos, bebidas, cuidado personal, cuidado del hogar y textil y prendas.',tr:'Buy From Iran, uluslararası alıcıların beş ana sektörde ihracata hazır ürünleri keşfetmesine yardımcı olur: Tarım ve Gıda, İçecek, Kişisel Bakım, Ev Bakımı ve Tekstil ve Giyim.'},
    'Products are organized by category and product range so buyers can compare relevant options without exposing internal supplier information on the public catalog.':{ar:'يتم تنظيم المنتجات حسب الفئة ونطاق المنتج حتى يتمكن المشترون من مقارنة الخيارات المناسبة دون إظهار معلومات المورد الداخلية في الكتالوج العام.',fr:'Les produits sont organisés par catégorie et gamme afin que les acheteurs puissent comparer les options pertinentes sans exposer les informations internes des fournisseurs dans le catalogue public.',ru:'Товары организованы по категориям и товарным линейкам, чтобы покупатели могли сравнивать подходящие варианты без раскрытия внутренней информации о поставщиках в публичном каталоге.',es:'Los productos se organizan por categoría y gama para que los compradores puedan comparar opciones relevantes sin exponer información interna de los proveedores en el catálogo público.',tr:'Ürünler kategori ve ürün grubuna göre düzenlenir; böylece alıcılar herkese açık katalogda tedarikçi iç bilgileri görünmeden ilgili seçenekleri karşılaştırabilir.'},
    'Buyers can submit structured quote requests, ask about private-label opportunities, and contact the sourcing team directly through WhatsApp.':{ar:'يمكن للمشترين إرسال طلبات عروض أسعار منظمة، والاستفسار عن فرص العلامة الخاصة، والتواصل مباشرة مع فريق التوريد عبر واتساب.',fr:'Les acheteurs peuvent envoyer des demandes de devis structurées, se renseigner sur les possibilités de marque privée et contacter directement l’équipe sourcing via WhatsApp.',ru:'Покупатели могут отправлять структурированные запросы цен, узнавать о возможностях private label и напрямую связываться с командой по закупкам через WhatsApp.',es:'Los compradores pueden enviar solicitudes de cotización estructuradas, consultar oportunidades de marca privada y contactar directamente con el equipo de abastecimiento por WhatsApp.',tr:'Alıcılar yapılandırılmış teklif talepleri gönderebilir, private label fırsatlarını sorabilir ve tedarik ekibiyle WhatsApp üzerinden doğrudan iletişime geçebilir.'},
    'The platform is being built around practical sourcing workflows: product discovery, commercial inquiries, lead management, and export coordination.':{ar:'يتم تطوير المنصة حول مسارات توريد عملية تشمل اكتشاف المنتجات، الاستفسارات التجارية، إدارة العملاء المحتملين، وتنسيق التصدير.',fr:'La plateforme est conçue autour de flux de sourcing pratiques : découverte de produits, demandes commerciales, gestion des prospects et coordination des exportations.',ru:'Платформа строится вокруг практических процессов закупок: поиск товаров, коммерческие запросы, управление лидами и координация экспорта.',es:'La plataforma se está construyendo en torno a flujos de abastecimiento prácticos: descubrimiento de productos, consultas comerciales, gestión de leads y coordinación de exportaciones.',tr:'Platform; ürün keşfi, ticari talepler, lead yönetimi ve ihracat koordinasyonu gibi pratik tedarik süreçleri etrafında geliştirilmektedir.'},
    'Agriculture & Food':{ar:'الزراعة والأغذية',fr:'Agriculture et alimentation',ru:'Сельское хозяйство и продукты',es:'Agricultura y alimentos',tr:'Tarım ve Gıda'},
    'Beverage':{ar:'المشروبات',fr:'Boissons',ru:'Напитки',es:'Bebidas',tr:'İçecek'},
    'Personal Care':{ar:'العناية الشخصية',fr:'Soins personnels',ru:'Личная гигиена',es:'Cuidado personal',tr:'Kişisel Bakım'},
    'Home Care':{ar:'العناية بالمنزل',fr:'Entretien de la maison',ru:'Товары для дома',es:'Cuidado del hogar',tr:'Ev Bakımı'},
    'Textile & Apparel':{ar:'المنسوجات والملابس',fr:'Textile et habillement',ru:'Текстиль и одежда',es:'Textil y prendas',tr:'Tekstil ve Giyim'},
    'Structured product catalog':{ar:'كتالوج منتجات منظم',fr:'Catalogue de produits structuré',ru:'Структурированный каталог товаров',es:'Catálogo de productos estructurado',tr:'Yapılandırılmış ürün kataloğu'},
    'Private-label inquiries':{ar:'استفسارات العلامة الخاصة',fr:'Demandes de marque privée',ru:'Запросы private label',es:'Consultas de marca privada',tr:'Private label talepleri'},
    'Quote request workflow':{ar:'مسار طلب عرض السعر',fr:'Processus de demande de devis',ru:'Процесс запроса цены',es:'Flujo de solicitud de cotización',tr:'Teklif talebi süreci'},
    'Port-to-port logistics':{ar:'خدمات لوجستية من ميناء إلى ميناء',fr:'Logistique port à port',ru:'Логистика порт–порт',es:'Logística de puerto a puerto',tr:'Limandan limana lojistik'},
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
    'Search thousands of vetted Iranian manufacturers by product, grade or region.':{ar:'ابحث عن المصنعين الإيرانيين حسب المنتج أو المواصفات أو المنطقة.',fr:'Recherchez des fabricants iraniens par produit, qualité ou région.',ru:'Ищите иранских производителей по товару, характеристикам или региону.',es:'Busque fabricantes iraníes por producto, especificación o región.',tr:'İranlı üreticileri ürün, özellik veya bölgeye göre arayın.'},
    'Message suppliers directly and request quotes with your specs and quantities.':{ar:'تواصل مع الموردين مباشرة واطلب عروض أسعار وفق المواصفات والكميات المطلوبة.',fr:'Contactez directement les fournisseurs et demandez des devis selon vos spécifications et quantités.',ru:'Связывайтесь с поставщиками и запрашивайте цены с учетом характеристик и объемов.',es:'Contacte directamente con proveedores y solicite cotizaciones según sus especificaciones y cantidades.',tr:'Tedarikçilerle doğrudan iletişime geçin ve teknik özelliklerinize ve miktarlarınıza göre teklif isteyin.'},
    'Review certificates, factory audits and ratings before you commit.':{ar:'راجع الشهادات وتدقيقات المصانع والتقييمات قبل اتخاذ القرار.',fr:'Examinez les certificats, audits d’usine et évaluations avant de vous engager.',ru:'Проверяйте сертификаты, аудиты фабрик и оценки до принятия решения.',es:'Revise certificados, auditorías de fábrica y valoraciones antes de comprometerse.',tr:'Karar vermeden önce sertifikaları, fabrika denetimlerini ve değerlendirmeleri inceleyin.'},
    'Coordinate inspection, payment terms and logistics to your port of choice.':{ar:'نسّق الفحص وشروط الدفع والخدمات اللوجستية حتى الميناء الذي تختاره.',fr:'Coordonnez l’inspection, les conditions de paiement et la logistique jusqu’au port de votre choix.',ru:'Координируйте инспекцию, условия оплаты и логистику до выбранного порта.',es:'Coordine la inspección, las condiciones de pago y la logística hasta el puerto elegido.',tr:'Kontrol, ödeme koşulları ve seçtiğiniz limana kadar lojistik süreçlerini koordine edin.'},
    'Core product sectors':{ar:'قطاعات المنتجات الرئيسية',fr:'Secteurs de produits principaux',ru:'Основные товарные секторы',es:'Sectores principales de productos',tr:'Ana ürün sektörleri'},
    'Buyer-focused sourcing':{ar:'توريد موجه للمشترين',fr:'Sourcing orienté acheteurs',ru:'Закупки с фокусом на покупателя',es:'Abastecimiento enfocado en compradores',tr:'Alıcı odaklı tedarik'},
    'Structured inquiries':{ar:'استفسارات منظمة',fr:'Demandes structurées',ru:'Структурированные запросы',es:'Consultas estructuradas',tr:'Yapılandırılmış talepler'},
    'Direct WhatsApp contact':{ar:'تواصل مباشر عبر واتساب',fr:'Contact WhatsApp direct',ru:'Прямой контакт через WhatsApp',es:'Contacto directo por WhatsApp',tr:'Doğrudan WhatsApp iletişimi'},
    'Ready to source direct from Iran?':{ar:'هل أنت مستعد للتوريد مباشرة من إيران؟',fr:'Prêt à vous approvisionner directement en Iran ?',ru:'Готовы закупать напрямую из Ирана?',es:'¿Listo para abastecerse directamente de Irán?',tr:'İran’dan doğrudan tedarike hazır mısınız?'},
    'Browse the catalog, submit a sourcing request, and connect with the Buy From Iran sourcing team.':{ar:'تصفح الكتالوج، أرسل طلب توريد، وتواصل مع فريق Buy From Iran.',fr:'Parcourez le catalogue, envoyez une demande de sourcing et contactez l’équipe Buy From Iran.',ru:'Просматривайте каталог, отправляйте запрос на закупку и связывайтесь с командой Buy From Iran.',es:'Explore el catálogo, envíe una solicitud de abastecimiento y contacte con el equipo de Buy From Iran.',tr:'Kataloğu inceleyin, tedarik talebi gönderin ve Buy From Iran ekibiyle iletişime geçin.'},
    'Join as Buyer':{ar:'انضم كمشتري',fr:'Rejoindre en tant qu’acheteur',ru:'Стать покупателем',es:'Unirse como comprador',tr:'Alıcı Olarak Katıl'},
    'Become a Supplier':{ar:'انضم كمورد',fr:'Devenir fournisseur',ru:'Стать поставщиком',es:'Ser proveedor',tr:'Tedarikçi Ol'},
    'Marketplace':{ar:'السوق',fr:'Marché',ru:'Маркетплейс',es:'Mercado',tr:'Pazar Yeri'},
    'Products':{ar:'المنتجات',fr:'Produits',ru:'Товары',es:'Productos',tr:'Ürünler'},
    'Categories':{ar:'الفئات',fr:'Catégories',ru:'Категории',es:'Categorías',tr:'Kategoriler'},
    'Suppliers':{ar:'الموردون',fr:'Fournisseurs',ru:'Поставщики',es:'Proveedores',tr:'Tedarikçiler'},
    'Export Services':{ar:'خدمات التصدير',fr:'Services export',ru:'Экспортные услуги',es:'Servicios de exportación',tr:'İhracat Hizmetleri'},
    'Company':{ar:'الشركة',fr:'Entreprise',ru:'Компания',es:'Empresa',tr:'Şirket'},
    'About':{ar:'من نحن',fr:'À propos',ru:'О нас',es:'Nosotros',tr:'Hakkımızda'},
    'Membership':{ar:'العضوية',fr:'Adhésion',ru:'Членство',es:'Membresía',tr:'Üyelik'},
    'Blog':{ar:'المدونة',fr:'Blog',ru:'Блог',es:'Blog',tr:'Blog'},
    'Contact':{ar:'اتصل بنا',fr:'Contact',ru:'Контакты',es:'Contacto',tr:'İletişim'},
    'Get in touch':{ar:'تواصل معنا',fr:'Nous contacter',ru:'Связаться с нами',es:'Contáctenos',tr:'İletişime Geçin'},
    'The trusted B2B hub connecting global buyers with verified Iranian manufacturers, exporters and wholesalers.':{ar:'منصة B2B تربط المشترين الدوليين بالمصنعين والمصدرين وتجار الجملة الإيرانيين.',fr:'Une plateforme B2B reliant les acheteurs internationaux aux fabricants, exportateurs et grossistes iraniens.',ru:'B2B-платформа, соединяющая международных покупателей с иранскими производителями, экспортерами и оптовиками.',es:'Una plataforma B2B que conecta compradores internacionales con fabricantes, exportadores y mayoristas iraníes.',tr:'Uluslararası alıcıları İranlı üreticiler, ihracatçılar ve toptancılarla buluşturan B2B platformu.'},
    '© 2026 Buy From Iran. All rights reserved.':{ar:'© 2026 Buy From Iran. جميع الحقوق محفوظة.',fr:'© 2026 Buy From Iran. Tous droits réservés.',ru:'© 2026 Buy From Iran. Все права защищены.',es:'© 2026 Buy From Iran. Todos los derechos reservados.',tr:'© 2026 Buy From Iran. Tüm hakları saklıdır.'},
    'Sign in or Register':{ar:'تسجيل الدخول أو إنشاء حساب',fr:'Se connecter ou s’inscrire',ru:'Войти или зарегистрироваться',es:'Iniciar sesión o registrarse',tr:'Giriş yap veya kayıt ol'},
    'ADD LISTING':{ar:'أضف منتجك',fr:'AJOUTER UNE ANNONCE',ru:'ДОБАВИТЬ ТОВАР',es:'AÑADIR PRODUCTO',tr:'ÜRÜN EKLE'},
    'Type your search...':{ar:'اكتب ما تبحث عنه...',fr:'Tapez votre recherche...',ru:'Введите запрос...',es:'Escribe tu búsqueda...',tr:'Aramanızı yazın...'},
    'Get a Quote':{ar:'اطلب عرض سعر',fr:'Demander un devis',ru:'Запросить цену',es:'Solicitar cotización',tr:'Teklif Al'},
    'Latest Articles':{ar:'أحدث المقالات',fr:'Derniers articles',ru:'Последние статьи',es:'Últimos artículos',tr:'Son Yazılar'},
    'Industry News':{ar:'أخبار القطاع',fr:'Actualités du secteur',ru:'Новости отрасли',es:'Noticias del sector',tr:'Sektör Haberleri'},
    'Guides & Reports':{ar:'الأدلة والتقارير',fr:'Guides et rapports',ru:'Руководства и отчеты',es:'Guías e informes',tr:'Rehberler ve Raporlar'},
    'IRAN':{ar:'إيران',fr:'IRAN',ru:'ИРАН',es:'IRÁN',tr:'İRAN'},
    'AMERICAS':{ar:'الأمريكتان',fr:'AMÉRIQUES',ru:'АМЕРИКА',es:'AMÉRICAS',tr:'AMERİKA'},
    'ASIA':{ar:'آسيا',fr:'ASIE',ru:'АЗИЯ',es:'ASIA',tr:'ASYA'},
    'AFRICA':{ar:'أفريقيا',fr:'AFRIQUE',ru:'АФРИКА',es:'ÁFRICA',tr:'AFRİKA'},
    'LATAM':{ar:'أمريكا اللاتينية',fr:'AMÉRIQUE LATINE',ru:'ЛАТИНСКАЯ АМЕРИКА',es:'LATAM',tr:'LATİN AMERİKA'},
    'SE ASIA':{ar:'جنوب شرق آسيا',fr:'ASIE DU SUD-EST',ru:'ЮВА',es:'SUDESTE ASIÁTICO',tr:'GÜNEYDOĞU ASYA'},
    'OCEANIA':{ar:'أوقيانوسيا',fr:'OCÉANIE',ru:'ОКЕАНИЯ',es:'OCEANÍA',tr:'OKYANUSYA'}
  };

  function clean(s){return String(s||'').replace(/\s+/g,' ').trim();}
  function buttonCode(btn){return clean(btn&&btn.textContent).toUpperCase();}
  function markActive(code){
    document.querySelectorAll('.lang-btn').forEach(btn=>btn.classList.toggle('active',buttonCode(btn)===code));
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

  function applyFallback(code){
    const lang=codes[code]||'en';
    if(lang==='en') return;

    const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
    let node;
    while((node=walker.nextNode())){
      const p=node.parentElement;
      if(!p || /^(SCRIPT|STYLE)$/.test(p.tagName)) continue;
      if(!originalText.has(node)) originalText.set(node,node.nodeValue);
      const source=clean(originalText.get(node));
      if(T[source] && T[source][lang]){
        const original=originalText.get(node);
        const left=(original.match(/^\s*/)||[''])[0];
        const right=(original.match(/\s*$/)||[''])[0];
        node.nodeValue=left+T[source][lang]+right;
      }
    }

    document.querySelectorAll('input[placeholder],textarea[placeholder]').forEach(el=>{
      if(!originalPlaceholder.has(el)) originalPlaceholder.set(el,el.getAttribute('placeholder')||'');
      const source=clean(originalPlaceholder.get(el));
      if(T[source] && T[source][lang]) el.setAttribute('placeholder',T[source][lang]);
    });

    document.querySelectorAll('option').forEach(el=>{
      if(!originalOption.has(el)) originalOption.set(el,el.textContent||'');
      const source=clean(originalOption.get(el));
      if(T[source] && T[source][lang]) el.textContent=T[source][lang];
    });
  }

  function applyGoogleLanguage(code){
    const target=codes[code]||'en';
    localStorage.setItem(LANG_KEY,code);
    markActive(code);
    document.documentElement.lang=target;
    document.documentElement.dir=target==='ar'?'rtl':'ltr';

    if(target==='en'){
      clearTranslateCookie();
      location.reload();
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

    [150,500,1000,1800,2800].forEach(ms=>setTimeout(()=>applyFallback(code),ms));
  }

  window.selectLang=function(btn){
    const code=buttonCode(btn);
    if(!codes[code]) return;
    if(!translateReady && code!=='EN'){
      pendingLanguage=code;
      localStorage.setItem(LANG_KEY,code);
      markActive(code);
      applyFallback(code);
      return;
    }
    applyGoogleLanguage(code);
  };

  const style=document.createElement('style');
  style.textContent=`
    #bfi-google-translate{position:absolute!important;left:-99999px!important;top:-99999px!important;width:1px!important;height:1px!important;overflow:hidden!important}
    .goog-te-banner-frame,.goog-te-balloon-frame,#goog-gt-tt,.goog-te-gadget-icon{display:none!important}
    body{top:0!important}
    html[dir="rtl"] .util-bar__right{margin-left:0;margin-right:auto}
    html[dir="rtl"] .nav-links{direction:rtl}
    html[dir="rtl"] .hero__content,html[dir="rtl"] .about-panel,html[dir="rtl"] .how-section,html[dir="rtl"] .cta-band,html[dir="rtl"] footer{direction:rtl}
  `;
  document.head.appendChild(style);

  const mount=document.createElement('div');
  mount.id='bfi-google-translate';
  document.body.appendChild(mount);

  window.bfiGoogleTranslateInit=function(){
    try{
      new google.translate.TranslateElement({pageLanguage:'en',includedLanguages:'ar,en,fr,ru,es,tr',autoDisplay:false},'bfi-google-translate');
      translateReady=true;
      const saved=(localStorage.getItem(LANG_KEY)||'EN').toUpperCase();
      markActive(codes[saved]?saved:'EN');
      if(saved!=='EN'){
        let attempts=0;
        const timer=setInterval(()=>{
          attempts++;
          if(document.querySelector('.goog-te-combo')){
            clearInterval(timer);
            applyGoogleLanguage(pendingLanguage||saved);
            pendingLanguage=null;
          }else if(attempts>40){
            clearInterval(timer);
            applyFallback(saved);
          }
        },100);
      }
    }catch(e){
      const saved=(localStorage.getItem(LANG_KEY)||'EN').toUpperCase();
      applyFallback(saved);
    }
  };

  window.addEventListener('load',function(){
    const saved=(localStorage.getItem(LANG_KEY)||'EN').toUpperCase();
    markActive(codes[saved]?saved:'EN');
    document.documentElement.dir=saved==='AR'?'rtl':'ltr';
    if(saved!=='EN') [100,400,900,1600].forEach(ms=>setTimeout(()=>applyFallback(saved),ms));

    if(document.querySelector('script[data-bfi-translate]')) return;
    const script=document.createElement('script');
    script.src='https://translate.google.com/translate_a/element.js?cb=bfiGoogleTranslateInit';
    script.async=true;
    script.dataset.bfiTranslate='1';
    document.head.appendChild(script);
  });
})();