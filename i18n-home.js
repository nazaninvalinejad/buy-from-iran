// Buy From Iran — deterministic Homepage translations
(function(){
  const path=location.pathname;
  if(!(path==='/' || path.endsWith('/index.html'))) return;

  const LANG_KEY='bfi_language';
  const langCodes={AR:'ar',EN:'en',FR:'fr',RU:'ru',ES:'es',TR:'tr'};
  const originals=new WeakMap();
  const placeholderOriginals=new WeakMap();
  const optionOriginals=new WeakMap();
  let applying=false;

  const L=(ar,fr,ru,es,tr)=>({ar,fr,ru,es,tr});
  const D={
    'About':L('من نحن','À propos','О нас','Nosotros','Hakkımızda'),
    'Listing':L('المنتجات','Produits','Каталог','Productos','Ürünler'),
    'Products':L('المنتجات','Produits','Товары','Productos','Ürünler'),
    'Categories':L('الفئات','Catégories','Категории','Categorías','Kategoriler'),
    'Suppliers':L('الموردون','Fournisseurs','Поставщики','Proveedores','Tedarikçiler'),
    'Export Services':L('خدمات التصدير','Services export','Экспортные услуги','Servicios de exportación','İhracat Hizmetleri'),
    'Blog':L('المدونة','Blog','Блог','Blog','Blog'),
    'Latest Articles':L('أحدث المقالات','Derniers articles','Последние статьи','Últimos artículos','Son Yazılar'),
    'Industry News':L('أخبار القطاع','Actualités du secteur','Новости отрасли','Noticias del sector','Sektör Haberleri'),
    'Guides & Reports':L('الأدلة والتقارير','Guides et rapports','Руководства и отчеты','Guías e informes','Rehberler ve Raporlar'),
    'Get a Quote':L('اطلب عرض سعر','Demander un devis','Запросить цену','Solicitar cotización','Teklif Al'),
    'Membership':L('العضوية','Adhésion','Членство','Membresía','Üyelik'),
    'Contact':L('اتصل بنا','Contact','Контакты','Contacto','İletişim'),
    'Sign in or Register':L('تسجيل الدخول أو إنشاء حساب','Se connecter ou s’inscrire','Войти или зарегистрироваться','Iniciar sesión o registrarse','Giriş yap veya kayıt ol'),
    'ADD LISTING':L('أضف منتجك','AJOUTER UN PRODUIT','ДОБАВИТЬ ТОВАР','AÑADIR PRODUCTO','ÜRÜN EKLE'),
    'Type your search...':L('اكتب ما تبحث عنه...','Tapez votre recherche...','Введите запрос...','Escribe tu búsqueda...','Aramanızı yazın...'),

    'Agriculture & Food':L('الزراعة والأغذية','Agriculture et alimentation','Сельское хозяйство и продукты','Agricultura y alimentos','Tarım ve Gıda'),
    'Biscuits & Crackers':L('البسكويت والكراكرز','Biscuits et crackers','Печенье и крекеры','Galletas y crackers','Bisküvi ve Kraker'),
    'Wafers':L('الويفر','Gaufrettes','Вафли','Obleas','Gofret'),
    'Cakes & Cookies':L('الكيك والكوكيز','Gâteaux et cookies','Кексы и печенье','Pasteles y cookies','Kek ve Kurabiye'),
    'Chocolate & Confectionery':L('الشوكولاتة والحلويات','Chocolat et confiserie','Шоколад и кондитерские изделия','Chocolate y confitería','Çikolata ve Şekerleme'),
    'Candy, Toffee & Gummies':L('الحلوى والتوفي والجيلي','Bonbons, toffee et gommes','Конфеты, ирис и жевательные сладости','Caramelos, toffee y gomitas','Şekerleme, Toffee ve Jelibon'),
    'Snacks & Chips':L('الوجبات الخفيفة والشيبس','Snacks et chips','Снеки и чипсы','Snacks y papas fritas','Atıştırmalık ve Cips'),
    'Tomato Paste':L('معجون الطماطم','Concentré de tomate','Томатная паста','Pasta de tomate','Domates Salçası'),
    'Sauces & Condiments':L('الصلصات والتوابل','Sauces et condiments','Соусы и приправы','Salsas y condimentos','Soslar ve Çeşniler'),
    'Canned Foods':L('الأغذية المعلبة','Conserves','Консервы','Alimentos enlatados','Konserve Gıdalar'),
    'Pickles & Olives':L('المخللات والزيتون','Pickles et olives','Соленья и оливки','Encurtidos y aceitunas','Turşu ve Zeytin'),
    'Pasta & Noodles':L('المعكرونة والنودلز','Pâtes et nouilles','Макароны и лапша','Pasta y fideos','Makarna ve Noodle'),
    'Jams, Honey & Spreads':L('المربى والعسل والمنتجات القابلة للدهن','Confitures, miel et pâtes à tartiner','Джемы, мед и пасты','Mermeladas, miel y untables','Reçel, Bal ve Sürülebilir Ürünler'),
    'Nuts & Dried Fruits':L('المكسرات والفواكه المجففة','Fruits à coque et fruits secs','Орехи и сухофрукты','Frutos secos y frutas deshidratadas','Kuruyemiş ve Kuru Meyve'),
    'Saffron & Spices':L('الزعفران والتوابل','Safran et épices','Шафран и специи','Azafrán y especias','Safran ve Baharatlar'),
    'Rice, Grains & Pulses':L('الأرز والحبوب والبقول','Riz, céréales et légumineuses','Рис, зерновые и бобовые','Arroz, cereales y legumbres','Pirinç, Tahıl ve Bakliyat'),

    'Beverage':L('المشروبات','Boissons','Напитки','Bebidas','İçecek'),
    'Fruit Juices & Nectars':L('عصائر الفاكهة والنكتار','Jus et nectars de fruits','Соки и нектары','Jugos y néctares','Meyve Suları ve Nektarlar'),
    'Malt & Non-Alcoholic Beverages':L('مشروبات الشعير وغير الكحولية','Boissons maltées et sans alcool','Солодовые и безалкогольные напитки','Bebidas de malta y sin alcohol','Malt ve Alkolsüz İçecekler'),
    'Soft Drinks & Energy Drinks':L('المشروبات الغازية ومشروبات الطاقة','Boissons gazeuses et énergétiques','Газированные и энергетические напитки','Refrescos y bebidas energéticas','Gazlı ve Enerji İçecekleri'),
    'Tea & Herbal Infusions':L('الشاي والمنقوعات العشبية','Thés et infusions','Чай и травяные настои','Té e infusiones','Çay ve Bitki Çayları'),
    'Coffee':L('القهوة','Café','Кофе','Café','Kahve'),
    'Syrups & Concentrates':L('الشرابات والمركزات','Sirops et concentrés','Сиропы и концентраты','Jarabes y concentrados','Şuruplar ve Konsantreler'),
    'Water & Functional Beverages':L('المياه والمشروبات الوظيفية','Eaux et boissons fonctionnelles','Вода и функциональные напитки','Agua y bebidas funcionales','Su ve Fonksiyonel İçecekler'),

    'Personal Care':L('العناية الشخصية','Soins personnels','Личная гигиена','Cuidado personal','Kişisel Bakım'),
    'Hair Care':L('العناية بالشعر','Soins capillaires','Уход за волосами','Cuidado del cabello','Saç Bakımı'),
    'Skin Care':L('العناية بالبشرة','Soins de la peau','Уход за кожей','Cuidado de la piel','Cilt Bakımı'),
    'Bath & Body':L('الاستحمام والعناية بالجسم','Bain et corps','Ванна и тело','Baño y cuerpo','Banyo ve Vücut'),
    'Hand & Personal Hygiene':L('نظافة اليدين والنظافة الشخصية','Hygiène des mains et personnelle','Гигиена рук и личная гигиена','Higiene de manos y personal','El ve Kişisel Hijyen'),
    'Oral Care':L('العناية بالفم','Soins bucco-dentaires','Уход за полостью рта','Cuidado bucal','Ağız Bakımı'),
    'Baby Care':L('العناية بالطفل','Soins bébé','Уход за детьми','Cuidado del bebé','Bebek Bakımı'),
    'Feminine Care':L('العناية النسائية','Hygiène féminine','Женская гигиена','Cuidado femenino','Kadın Bakımı'),

    'Home Care':L('العناية بالمنزل','Entretien de la maison','Товары для дома','Cuidado del hogar','Ev Bakımı'),
    'Laundry Care':L('العناية بالغسيل','Entretien du linge','Уход за бельем','Cuidado de la ropa','Çamaşır Bakımı'),
    'Dishwashing':L('غسيل الصحون','Vaisselle','Мытье посуды','Lavavajillas','Bulaşık Yıkama'),
    'Surface & Floor Cleaners':L('منظفات الأسطح والأرضيات','Nettoyants surfaces et sols','Средства для поверхностей и полов','Limpiadores de superficies y pisos','Yüzey ve Zemin Temizleyiciler'),
    'Bleach & Disinfectants':L('المبيضات والمطهرات','Javel et désinfectants','Отбеливатели и дезинфицирующие средства','Lejía y desinfectantes','Çamaşır Suyu ve Dezenfektanlar'),
    'Bathroom & Toilet Cleaners':L('منظفات الحمام والمرحاض','Nettoyants salle de bain et WC','Средства для ванной и туалета','Limpiadores de baño e inodoro','Banyo ve Tuvalet Temizleyicileri'),
    'Air Fresheners':L('معطرات الجو','Désodorisants','Освежители воздуха','Ambientadores','Oda Kokuları'),

    'Textile & Apparel':L('المنسوجات والملابس','Textile et habillement','Текстиль и одежда','Textil y prendas','Tekstil ve Giyim'),
    'T-Shirts':L('تي شيرت','T-shirts','Футболки','Camisetas','Tişörtler'),
    'Trousers & Pants':L('السراويل والبنطلونات','Pantalons','Брюки','Pantalones','Pantolonlar'),
    'Socks':L('الجوارب','Chaussettes','Носки','Calcetines','Çoraplar'),
    'Caps & Hats':L('القبعات','Casquettes et chapeaux','Кепки и шляпы','Gorras y sombreros','Şapka ve Kep'),
    'Towels':L('المناشف','Serviettes','Полотенца','Toallas','Havlular'),
    'Bed Sheets':L('ملاءات السرير','Draps de lit','Постельное белье','Sábanas','Çarşaflar'),

    'Trusted by buyers in 120+ countries':L('موثوق به من مشترين في أكثر من 120 دولة','Approuvé par des acheteurs dans plus de 120 pays','Нам доверяют покупатели более чем из 120 стран','Con la confianza de compradores en más de 120 países','120’den fazla ülkedeki alıcıların güvendiği platform'),
    'BFI is helping you connect with the best wholesale material suppliers from Iran — a trusted hub for global buyers.':L('تساعدك Buy From Iran على التواصل مع موردي الجملة من إيران عبر منصة موثوقة للمشترين الدوليين.','Buy From Iran vous aide à entrer en contact avec des fournisseurs grossistes iraniens via une plateforme fiable pour les acheteurs internationaux.','Buy From Iran помогает международным покупателям находить оптовых поставщиков из Ирана через надежную B2B-платформу.','Buy From Iran le ayuda a conectar con proveedores mayoristas de Irán mediante una plataforma fiable para compradores internacionales.','Buy From Iran, uluslararası alıcıların İran’daki toptan tedarikçilere güvenilir bir B2B platformu üzerinden ulaşmasına yardımcı olur.'),
    'Search products':L('البحث عن المنتجات','Rechercher des produits','Поиск товаров','Buscar productos','Ürün ara'),
    'What are you sourcing?':L('ما المنتج الذي تبحث عنه؟','Quel produit recherchez-vous ?','Что вы ищете?','¿Qué producto busca?','Hangi ürünü arıyorsunuz?'),
    'Category':L('الفئة','Catégorie','Категория','Categoría','Kategori'),
    'All categories':L('كل الفئات','Toutes les catégories','Все категории','Todas las categorías','Tüm kategoriler'),
    'Supplier location':L('موقع المورد','Localisation du fournisseur','Местоположение поставщика','Ubicación del proveedor','Tedarikçi konumu'),
    'Tehran, Tabriz, Mashhad…':L('طهران، تبريز، مشهد…','Téhéran, Tabriz, Machhad…','Тегеран, Тебриз, Мешхед…','Teherán, Tabriz, Mashhad…','Tahran, Tebriz, Meşhed…'),
    'Search':L('بحث','Rechercher','Поиск','Buscar','Ara'),
    'Popular:':L('الأكثر طلباً:','Populaire :','Популярное:','Popular:','Popüler:'),
    'Fruit Juices':L('عصائر الفاكهة','Jus de fruits','Фруктовые соки','Jugos de frutas','Meyve Suları'),

    'A Structured B2B Sourcing Hub for Products From Iran':L('منصة B2B منظمة لتوريد المنتجات من إيران','Une plateforme B2B structurée pour sourcer des produits d’Iran','Структурированная B2B-платформа для закупки товаров из Ирана','Una plataforma B2B estructurada para abastecerse de productos de Irán','İran’dan ürün tedariki için yapılandırılmış bir B2B platformu'),
    'Buy From Iran helps international buyers discover export-ready products across five core sectors: Agriculture & Food, Beverage, Personal Care, Home Care, and Textile & Apparel.':L('تساعد Buy From Iran المشترين الدوليين على اكتشاف منتجات جاهزة للتصدير ضمن خمسة قطاعات رئيسية: الزراعة والأغذية، المشروبات، العناية الشخصية، العناية بالمنزل، والمنسوجات والملابس.','Buy From Iran aide les acheteurs internationaux à découvrir des produits prêts à l’export dans cinq secteurs principaux : agriculture et alimentation, boissons, soins personnels, entretien de la maison, textile et habillement.','Buy From Iran помогает международным покупателям находить готовые к экспорту товары в пяти основных секторах: сельское хозяйство и продукты питания, напитки, личная гигиена, товары для дома, текстиль и одежда.','Buy From Iran ayuda a los compradores internacionales a descubrir productos listos para exportación en cinco sectores principales: agricultura y alimentos, bebidas, cuidado personal, cuidado del hogar y textil y prendas.','Buy From Iran, uluslararası alıcıların beş ana sektörde ihracata hazır ürünleri keşfetmesine yardımcı olur: Tarım ve Gıda, İçecek, Kişisel Bakım, Ev Bakımı ve Tekstil ve Giyim.'),
    'Products are organized by category and product range so buyers can compare relevant options without exposing internal supplier information on the public catalog.':L('يتم تنظيم المنتجات حسب الفئة ونطاق المنتج حتى يتمكن المشترون من مقارنة الخيارات المناسبة دون إظهار معلومات المورد الداخلية في الكتالوج العام.','Les produits sont organisés par catégorie et gamme afin que les acheteurs puissent comparer les options pertinentes sans exposer les informations internes des fournisseurs dans le catalogue public.','Товары организованы по категориям и товарным линейкам, чтобы покупатели могли сравнивать подходящие варианты без раскрытия внутренней информации о поставщиках в публичном каталоге.','Los productos se organizan por categoría y gama para que los compradores puedan comparar opciones relevantes sin exponer información interna de los proveedores en el catálogo público.','Ürünler kategori ve ürün grubuna göre düzenlenir; böylece alıcılar herkese açık katalogda tedarikçi iç bilgileri görünmeden ilgili seçenekleri karşılaştırabilir.'),
    'Buyers can submit structured quote requests, ask about private-label opportunities, and contact the sourcing team directly through WhatsApp.':L('يمكن للمشترين إرسال طلبات عروض أسعار منظمة، والاستفسار عن فرص العلامة الخاصة، والتواصل مباشرة مع فريق التوريد عبر واتساب.','Les acheteurs peuvent envoyer des demandes de devis structurées, se renseigner sur les possibilités de marque privée et contacter directement l’équipe sourcing via WhatsApp.','Покупатели могут отправлять структурированные запросы цен, узнавать о возможностях private label и напрямую связываться с командой по закупкам через WhatsApp.','Los compradores pueden enviar solicitudes de cotización estructuradas, consultar oportunidades de marca privada y contactar directamente con el equipo de abastecimiento por WhatsApp.','Alıcılar yapılandırılmış teklif talepleri gönderebilir, private label fırsatlarını sorabilir ve tedarik ekibiyle WhatsApp üzerinden doğrudan iletişime geçebilir.'),
    'The platform is being built around practical sourcing workflows: product discovery, commercial inquiries, lead management, and export coordination.':L('يتم تطوير المنصة حول مسارات توريد عملية تشمل اكتشاف المنتجات، الاستفسارات التجارية، إدارة العملاء المحتملين، وتنسيق التصدير.','La plateforme est conçue autour de flux de sourcing pratiques : découverte de produits, demandes commerciales, gestion des prospects et coordination des exportations.','Платформа строится вокруг практических процессов закупок: поиск товаров, коммерческие запросы, управление лидами и координация экспорта.','La plataforma se está construyendo en torno a flujos de abastecimiento prácticos: descubrimiento de productos, consultas comerciales, gestión de leads y coordinación de exportaciones.','Platform; ürün keşfi, ticari talepler, lead yönetimi ve ihracat koordinasyonu gibi pratik tedarik süreçleri etrafında geliştirilmektedir.'),

    'Structured product catalog':L('كتالوج منتجات منظم','Catalogue de produits structuré','Структурированный каталог товаров','Catálogo de productos estructurado','Yapılandırılmış ürün kataloğu'),
    'Private-label inquiries':L('استفسارات العلامة الخاصة','Demandes de marque privée','Запросы private label','Consultas de marca privada','Private label talepleri'),
    'Quote request workflow':L('مسار طلب عرض السعر','Processus de demande de devis','Процесс запроса цены','Flujo de solicitud de cotización','Teklif talebi süreci'),
    'Port-to-port logistics':L('خدمات لوجستية من ميناء إلى ميناء','Logistique port à port','Логистика порт–порт','Logística de puerto a puerto','Limandan limana lojistik'),

    'Simple & transparent':L('بسيط وشفاف','Simple et transparent','Просто и прозрачно','Simple y transparente','Basit ve şeffaf'),
    'How Buy From Iran works':L('كيف تعمل Buy From Iran','Comment fonctionne Buy From Iran','Как работает Buy From Iran','Cómo funciona Buy From Iran','Buy From Iran nasıl çalışır'),
    'STEP 1':L('الخطوة 1','ÉTAPE 1','ШАГ 1','PASO 1','ADIM 1'),
    'STEP 2':L('الخطوة 2','ÉTAPE 2','ШАГ 2','PASO 2','ADIM 2'),
    'STEP 3':L('الخطوة 3','ÉTAPE 3','ШАГ 3','PASO 3','ADIM 3'),
    'STEP 4':L('الخطوة 4','ÉTAPE 4','ШАГ 4','PASO 4','ADIM 4'),
    'Discover':L('اكتشف','Découvrir','Найдите','Descubrir','Keşfet'),
    'Connect':L('تواصل','Se connecter','Свяжитесь','Conectar','Bağlan'),
    'Verify':L('تحقق','Vérifier','Проверьте','Verificar','Doğrula'),
    'Ship':L('الشحن','Expédier','Доставка','Enviar','Sevk Et'),
    'Search thousands of vetted Iranian manufacturers by product, grade or region.':L('ابحث عن المصنعين الإيرانيين حسب المنتج أو المواصفات أو المنطقة.','Recherchez des fabricants iraniens par produit, qualité ou région.','Ищите иранских производителей по товару, характеристикам или региону.','Busque fabricantes iraníes por producto, especificación o región.','İranlı üreticileri ürün, özellik veya bölgeye göre arayın.'),
    'Message suppliers directly and request quotes with your specs and quantities.':L('تواصل مع الموردين مباشرة واطلب عروض أسعار وفق المواصفات والكميات المطلوبة.','Contactez directement les fournisseurs et demandez des devis selon vos spécifications et quantités.','Связывайтесь с поставщиками и запрашивайте цены с учетом характеристик и объемов.','Contacte directamente con proveedores y solicite cotizaciones según sus especificaciones y cantidades.','Tedarikçilerle doğrudan iletişime geçin ve teknik özelliklerinize ve miktarlarınıza göre teklif isteyin.'),
    'Review certificates, factory audits and ratings before you commit.':L('راجع الشهادات وتدقيقات المصانع والتقييمات قبل اتخاذ القرار.','Examinez les certificats, audits d’usine et évaluations avant de vous engager.','Проверяйте сертификаты, аудиты фабрик и оценки до принятия решения.','Revise certificados, auditorías de fábrica y valoraciones antes de comprometerse.','Karar vermeden önce sertifikaları, fabrika denetimlerini ve değerlendirmeleri inceleyin.'),
    'Coordinate inspection, payment terms and logistics to your port of choice.':L('نسّق الفحص وشروط الدفع والخدمات اللوجستية حتى الميناء الذي تختاره.','Coordonnez l’inspection, les conditions de paiement et la logistique jusqu’au port de votre choix.','Координируйте инспекцию, условия оплаты и логистику до выбранного порта.','Coordine la inspección, las condiciones de pago y la logística hasta el puerto elegido.','Kontrol, ödeme koşulları ve seçtiğiniz limana kadar lojistik süreçlerini koordine edin.'),

    'Core product sectors':L('قطاعات المنتجات الرئيسية','Secteurs de produits principaux','Основные товарные секторы','Sectores principales de productos','Ana ürün sektörleri'),
    'Buyer-focused sourcing':L('توريد موجه للمشترين','Sourcing orienté acheteurs','Закупки с фокусом на покупателя','Abastecimiento enfocado en compradores','Alıcı odaklı tedarik'),
    'Quote':L('عرض سعر','Devis','Цена','Cotización','Teklif'),
    'Structured inquiries':L('استفسارات منظمة','Demandes structurées','Структурированные запросы','Consultas estructuradas','Yapılandırılmış talepler'),
    'Direct WhatsApp contact':L('تواصل مباشر عبر واتساب','Contact WhatsApp direct','Прямой контакт через WhatsApp','Contacto directo por WhatsApp','Doğrudan WhatsApp iletişimi'),

    'Ready to source':L('هل أنت مستعد للتوريد','Prêt à vous approvisionner','Готовы закупать','¿Listo para abastecerse','Tedarike hazır mısınız'),
    'direct':L('مباشرة','directement','напрямую','directamente','doğrudan'),
    'from Iran?':L('من إيران؟','en Iran ?','из Ирана?','de Irán?','İran’dan?'),
    'Browse the catalog, submit a sourcing request, and connect with the Buy From Iran sourcing team.':L('تصفح الكتالوج، أرسل طلب توريد، وتواصل مع فريق Buy From Iran.','Parcourez le catalogue, envoyez une demande de sourcing et contactez l’équipe Buy From Iran.','Просматривайте каталог, отправляйте запрос на закупку и связывайтесь с командой Buy From Iran.','Explore el catálogo, envíe una solicitud de abastecimiento y contacte con el equipo de Buy From Iran.','Kataloğu inceleyin, tedarik talebi gönderin ve Buy From Iran ekibiyle iletişime geçin.'),
    'Join as Buyer':L('انضم كمشتري','Rejoindre comme acheteur','Стать покупателем','Unirse como comprador','Alıcı Olarak Katıl'),
    'Become a Supplier':L('انضم كمورد','Devenir fournisseur','Стать поставщиком','Ser proveedor','Tedarikçi Ol'),

    'Marketplace':L('السوق','Marché','Маркетплейс','Mercado','Pazar Yeri'),
    'Company':L('الشركة','Entreprise','Компания','Empresa','Şirket'),
    'Get in touch':L('تواصل معنا','Nous contacter','Связаться с нами','Contáctenos','İletişime Geçin'),
    'The trusted B2B hub connecting global buyers with verified Iranian manufacturers, exporters and wholesalers.':L('منصة B2B تربط المشترين الدوليين بالمصنعين والمصدرين وتجار الجملة الإيرانيين.','Une plateforme B2B reliant les acheteurs internationaux aux fabricants, exportateurs et grossistes iraniens.','B2B-платформа, соединяющая международных покупателей с иранскими производителями, экспортерами и оптовиками.','Una plataforma B2B que conecta compradores internacionales con fabricantes, exportadores y mayoristas iraníes.','Uluslararası alıcıları İranlı üreticiler, ihracatçılar ve toptancılarla buluşturan B2B platformu.'),
    'Vanak Square, Valiasr St, Tehran, Iran':L('ميدان ونك، شارع وليعصر، طهران، إيران','Place Vanak, avenue Valiasr, Téhéran, Iran','Площадь Ванак, ул. Валиаср, Тегеран, Иран','Plaza Vanak, calle Valiasr, Teherán, Irán','Vanak Meydanı, Valiasr Cd., Tahran, İran'),
    'Privacy':L('الخصوصية','Confidentialité','Конфиденциальность','Privacidad','Gizlilik'),
    'Terms':L('الشروط','Conditions','Условия','Términos','Şartlar'),
    'Buyer protection':L('حماية المشتري','Protection de l’acheteur','Защита покупателя','Protección del comprador','Alıcı Koruması'),
    '© 2026 Buy From Iran. All rights reserved.':L('© 2026 Buy From Iran. جميع الحقوق محفوظة.','© 2026 Buy From Iran. Tous droits réservés.','© 2026 Buy From Iran. Все права защищены.','© 2026 Buy From Iran. Todos los derechos reservados.','© 2026 Buy From Iran. Tüm hakları saklıdır.'),

    'Sign In':L('تسجيل الدخول','Se connecter','Войти','Iniciar sesión','Giriş Yap'),
    'Register':L('إنشاء حساب','S’inscrire','Регистрация','Registrarse','Kayıt Ol'),
    'Email':L('البريد الإلكتروني','E-mail','Эл. почта','Correo electrónico','E-posta'),
    'Password':L('كلمة المرور','Mot de passe','Пароль','Contraseña','Şifre'),
    'Username':L('اسم المستخدم','Nom d’utilisateur','Имя пользователя','Nombre de usuario','Kullanıcı adı'),
    'Remember me':L('تذكرني','Se souvenir de moi','Запомнить меня','Recordarme','Beni hatırla'),
    'Forgot password?':L('نسيت كلمة المرور؟','Mot de passe oublié ?','Забыли пароль?','¿Olvidó su contraseña?','Şifrenizi mi unuttunuz?'),
    'Create Account':L('إنشاء حساب','Créer un compte','Создать аккаунт','Crear cuenta','Hesap Oluştur'),
    'Enter your password':L('أدخل كلمة المرور','Entrez votre mot de passe','Введите пароль','Ingrese su contraseña','Şifrenizi girin'),
    'Enter your email':L('أدخل بريدك الإلكتروني','Entrez votre e-mail','Введите электронную почту','Ingrese su correo electrónico','E-postanızı girin'),
    'Choose a username':L('اختر اسم مستخدم','Choisissez un nom d’utilisateur','Выберите имя пользователя','Elija un nombre de usuario','Kullanıcı adı seçin'),
    'Create a password':L('أنشئ كلمة مرور','Créez un mot de passe','Создайте пароль','Cree una contraseña','Şifre oluşturun'),
    'Your personal data will be used to support your experience on this website, to manage access to your account and for other purposes described in our privacy policy.':L('ستُستخدم بياناتك الشخصية لدعم تجربتك على هذا الموقع وإدارة الوصول إلى حسابك ولأغراض أخرى موضحة في سياسة الخصوصية.','Vos données personnelles seront utilisées pour améliorer votre expérience sur ce site, gérer l’accès à votre compte et à d’autres fins décrites dans notre politique de confidentialité.','Ваши персональные данные будут использоваться для работы сайта, управления доступом к аккаунту и других целей, описанных в политике конфиденциальности.','Sus datos personales se utilizarán para mejorar su experiencia en este sitio, gestionar el acceso a su cuenta y otros fines descritos en nuestra política de privacidad.','Kişisel verileriniz bu web sitesindeki deneyiminizi desteklemek, hesabınıza erişimi yönetmek ve gizlilik politikamızda açıklanan diğer amaçlar için kullanılacaktır.'),
    'privacy policy':L('سياسة الخصوصية','politique de confidentialité','политике конфиденциальности','política de privacidad','gizlilik politikamız'),

    'IRAN':L('إيران','IRAN','ИРАН','IRÁN','İRAN'),
    'AMERICAS':L('الأمريكتان','AMÉRIQUES','АМЕРИКА','AMÉRICAS','AMERİKA'),
    'ASIA':L('آسيا','ASIE','АЗИЯ','ASIA','ASYA'),
    'AFRICA':L('أفريقيا','AFRIQUE','АФРИКА','ÁFRICA','AFRİKA'),
    'LATAM':L('أمريكا اللاتينية','AMÉRIQUE LATINE','ЛАТИНСКАЯ АМЕРИКА','LATAM','LATİN AMERİKA'),
    'SE ASIA':L('جنوب شرق آسيا','ASIE DU SUD-EST','ЮВА','SUDESTE ASIÁTICO','GÜNEYDOĞU ASYA'),
    'OCEANIA':L('أوقيانوسيا','OCÉANIE','ОКЕАНИЯ','OCEANÍA','OKYANUSYA')
  };

  const clean=s=>String(s||'').replace(/\s+/g,' ').trim();
  function activeLang(){return localStorage.getItem(LANG_KEY)||'EN';}
  function translateValue(source,lang){
    if(lang==='en') return source;
    const row=D[clean(source)];
    return row&&row[lang]?row[lang]:source;
  }

  function translateTextNode(node,lang){
    if(!originals.has(node)) originals.set(node,node.nodeValue);
    const original=originals.get(node);
    const key=clean(original);
    if(!key) return;

    if(/^Account:\s*/i.test(key)){
      const value=key.replace(/^Account:\s*/i,'');
      const prefix={ar:'الحساب:',fr:'Compte :',ru:'Аккаунт:',es:'Cuenta:',tr:'Hesap:'}[lang]||'Account:';
      node.nodeValue=original.replace(key,prefix+' '+value);
      return;
    }

    const translated=translateValue(key,lang);
    if(translated===key && lang!=='en') return;
    const left=(original.match(/^\s*/)||[''])[0];
    const right=(original.match(/\s*$/)||[''])[0];
    node.nodeValue=left+translated+right;
  }

  function applyLanguage(code){
    if(applying) return;
    applying=true;
    const safeCode=langCodes[code]?code:'EN';
    const lang=langCodes[safeCode];
    localStorage.setItem(LANG_KEY,safeCode);
    document.documentElement.lang=lang;
    document.documentElement.dir=lang==='ar'?'rtl':'ltr';
    document.querySelectorAll('.lang-btn').forEach(btn=>btn.classList.toggle('active',clean(btn.textContent).toUpperCase()===safeCode));

    const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
    let node;
    while((node=walker.nextNode())){
      const parent=node.parentElement;
      if(!parent || /^(SCRIPT|STYLE|NOSCRIPT)$/.test(parent.tagName)) continue;
      translateTextNode(node,lang);
    }

    document.querySelectorAll('input[placeholder],textarea[placeholder]').forEach(el=>{
      if(!placeholderOriginals.has(el)) placeholderOriginals.set(el,el.getAttribute('placeholder')||'');
      const original=placeholderOriginals.get(el);
      el.setAttribute('placeholder',translateValue(original,lang));
    });

    document.querySelectorAll('option').forEach(el=>{
      if(!optionOriginals.has(el)) optionOriginals.set(el,el.textContent||'');
      el.textContent=translateValue(optionOriginals.get(el),lang);
    });

    if(lang==='ar'){
      document.body.classList.add('bfi-rtl');
    }else{
      document.body.classList.remove('bfi-rtl');
    }
    applying=false;
  }

  window.selectLang=function(btn){
    const code=clean(btn.textContent).toUpperCase();
    applyLanguage(code);
  };
  window.bfiApplyLanguage=applyLanguage;

  const style=document.createElement('style');
  style.textContent=`
    html[dir="rtl"] .util-bar__right{margin-left:0;margin-right:auto}
    html[dir="rtl"] .main-nav__inner,html[dir="rtl"] .nav-links,html[dir="rtl"] .mobile-nav{direction:rtl}
    html[dir="rtl"] .hero__content,html[dir="rtl"] .about-panel,html[dir="rtl"] .how-section,html[dir="rtl"] .cta-band,html[dir="rtl"] footer{direction:rtl}
    html[dir="rtl"] .search-cell{text-align:right}
    html[dir="rtl"] .footer-contact-item{direction:rtl}
  `;
  document.head.appendChild(style);

  window.addEventListener('load',()=>{
    applyLanguage(activeLang());
    const observer=new MutationObserver(()=>{
      const code=activeLang();
      if(code!=='EN') setTimeout(()=>applyLanguage(code),0);
    });
    observer.observe(document.body,{childList:true,subtree:true,characterData:true});
  });
})();