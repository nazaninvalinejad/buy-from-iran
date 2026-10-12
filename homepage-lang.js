// Buy From Iran — Homepage language switcher
(function(){
  const path=location.pathname;
  if(!(path==='/' || path.endsWith('/index.html'))) return;

  const LANG_KEY='bfi_language';
  const langMap={AR:'ar',EN:'en',FR:'fr',RU:'ru',ES:'es',TR:'tr'};
  const translations={
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

  const textOriginals=new WeakMap();
  const placeholderOriginals=new WeakMap();
  const clean=s=>(s||'').replace(/\s+/g,' ').trim();

  function translate(value,lang){
    if(lang==='en') return value;
    const row=translations[clean(value)];
    return row && row[lang] ? row[lang] : value;
  }

  function applyLanguage(code){
    const lang=langMap[code]||'en';
    document.documentElement.lang=lang;
    document.documentElement.dir=lang==='ar'?'rtl':'ltr';
    document.querySelectorAll('.lang-btn').forEach(btn=>btn.classList.toggle('active',clean(btn.textContent).toUpperCase()===code));

    const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
    let node;
    while((node=walker.nextNode())){
      const parent=node.parentElement;
      if(!parent || /^(SCRIPT|STYLE|TEXTAREA|OPTION)$/.test(parent.tagName)) continue;
      if(!textOriginals.has(node)) textOriginals.set(node,node.nodeValue);
      const original=textOriginals.get(node);
      const key=clean(original);
      if(!key) continue;
      if(lang==='en') node.nodeValue=original;
      else if(translations[key] && translations[key][lang]){
        const left=(original.match(/^\s*/)||[''])[0];
        const right=(original.match(/\s*$/)||[''])[0];
        node.nodeValue=left+translations[key][lang]+right;
      } else {
        node.nodeValue=original;
      }
    }

    document.querySelectorAll('input[placeholder],textarea[placeholder]').forEach(el=>{
      if(!placeholderOriginals.has(el)) placeholderOriginals.set(el,el.getAttribute('placeholder')||'');
      const original=placeholderOriginals.get(el);
      el.setAttribute('placeholder',translate(original,lang));
    });

    localStorage.setItem(LANG_KEY,code);
  }

  window.selectLang=function(btn){applyLanguage(clean(btn.textContent).toUpperCase());};
  window.addEventListener('load',function(){
    const saved=(localStorage.getItem(LANG_KEY)||'EN').toUpperCase();
    applyLanguage(langMap[saved]?saved:'EN');
  });
})();