const toggle=document.querySelector('.menu-toggle');const nav=document.querySelector('#navigation');toggle?.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',window.taxiTranslate?window.taxiTranslate(4):(open?'Zavrieť menu':'Otvoriť menu'));nav.classList.toggle('is-open',open)});document.addEventListener('keydown',e=>{if(e.key==='Escape'){toggle?.setAttribute('aria-expanded','false');nav?.classList.remove('is-open')}});const dialog=document.querySelector('#photo-dialog');document.querySelectorAll('[data-photo]').forEach(button=>button.addEventListener('click',()=>{dialog.querySelector('img').src=button.dataset.photo;dialog.querySelector('img').alt=button.dataset.caption;dialog.querySelector('p').textContent=button.dataset.caption;dialog.showModal()}));dialog?.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());dialog?.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});


// Basic consent mode: no Google requests before analytics consent.
(()=>{
 const ID='G-NWBZGGJ5TY',KEY='taxi-analytics-consent-v1',TTL=180*24*60*60*1000;
 const lang=document.documentElement.lang||'sk';
 const copy={
 sk:['Analytické cookies','S vaším súhlasom používame Google Analytics na meranie návštevnosti a kliknutí na kontakty. Voľbu uchovávame 180 dní. Google môže údaje spracúvať aj mimo EÚ.','Povoliť analytiku','Odmietnuť','Nastavenia cookies'],
 en:['Analytics cookies','With your consent, we use Google Analytics to measure visits and contact clicks. Your choice is stored for 180 days. Google may process data outside the EU.','Allow analytics','Reject','Cookie settings'],
 de:['Analyse-Cookies','Mit Ihrer Zustimmung nutzen wir Google Analytics für Besuche und Kontaktklicks. Ihre Wahl gilt 180 Tage. Google kann Daten außerhalb der EU verarbeiten.','Analyse erlauben','Ablehnen','Cookie-Einstellungen'],
 ru:['Аналитические cookies','С вашего согласия Google Analytics измеряет посещения и нажатия на контакты. Выбор хранится 180 дней. Данные могут обрабатываться вне ЕС.','Разрешить','Отклонить','Настройки cookies'],
 pl:['Analityczne cookies','Za Twoją zgodą Google Analytics mierzy wizyty i kliknięcia kontaktów. Wybór zapisujemy na 180 dni. Dane mogą być przetwarzane poza UE.','Zezwól','Odrzuć','Ustawienia cookies'],
 hu:['Analitikai sütik','Hozzájárulásával a Google Analytics méri a látogatásokat és a kapcsolatfelvételi kattintásokat. A választást 180 napig tároljuk. Az adatok az EU-n kívül is feldolgozhatók.','Engedélyezés','Elutasítás','Sütibeállítások'],
 uk:['Аналітичні cookies','За вашою згодою Google Analytics вимірює відвідування та натискання на контакти. Вибір зберігається 180 днів. Дані можуть оброблятися поза ЄС.','Дозволити','Відхилити','Налаштування cookies'],
 it:['Cookie analitici','Con il tuo consenso Google Analytics misura visite e clic sui contatti. La scelta dura 180 giorni. I dati possono essere trattati fuori dall’UE.','Consenti','Rifiuta','Impostazioni cookie'],
 fr:['Cookies analytiques','Avec votre accord, Google Analytics mesure les visites et clics de contact. Votre choix est conservé 180 jours. Les données peuvent être traitées hors UE.','Accepter','Refuser','Paramètres des cookies'],
 es:['Cookies analíticas','Con tu consentimiento, Google Analytics mide visitas y clics de contacto. Guardamos tu elección durante 180 días. Los datos pueden tratarse fuera de la UE.','Permitir','Rechazar','Ajustes de cookies'],
 zh:['分析 Cookie','经您同意，我们使用 Google Analytics 衡量访问量和联系点击次数。您的选择保存180天。数据可能在欧盟以外处理。','允许分析','拒绝','Cookie 设置'],
 ja:['分析用 Cookie','同意いただいた場合、Google Analyticsで訪問数と連絡先のクリックを測定します。選択は180日間保存されます。データはEU域外で処理される場合があります。','許可する','拒否する','Cookie 設定'],
 ar:['ملفات تعريف الارتباط التحليلية','بموافقتك نستخدم Google Analytics لقياس الزيارات والنقرات على جهات الاتصال. نحفظ اختيارك لمدة 180 يومًا. قد تتم معالجة البيانات خارج الاتحاد الأوروبي.','السماح','رفض','إعدادات ملفات الارتباط']
 }[lang]||null;
 const t=copy||['Analytics cookies','We use Google Analytics with your consent. Your choice is stored for 180 days.','Allow analytics','Reject','Cookie settings'];
 let allowed=false,loaded=false,saved=null;
 try{saved=JSON.parse(localStorage.getItem(KEY));if(!saved||Date.now()-saved.time>TTL)saved=null;}catch{}
 window.dataLayer=window.dataLayer||[];
 window.gtag=window.gtag||function(){window.dataLayer.push(arguments)};
 window.gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
 function enable(){allowed=true;window['ga-disable-'+ID]=false;window.gtag('consent','update',{analytics_storage:'granted'});if(loaded)return;loaded=true;window.gtag('js',new Date());window.gtag('config',ID,{send_page_view:true,allow_google_signals:false,allow_ad_personalization_signals:false});const s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id='+ID;document.head.append(s);}
 function clearCookies(){for(const c of document.cookie.split(';')){const name=c.split('=')[0].trim();if(!/^_ga(?:_|$)/.test(name))continue;for(const domain of ['',location.hostname,'.'+location.hostname])document.cookie=name+'=; Max-Age=0; path=/'+(domain?'; domain='+domain:'');}}
 const panel=document.createElement('section');panel.className='cookie-panel';panel.setAttribute('aria-label',t[0]);
 const title=document.createElement('strong');title.textContent=t[0];const text=document.createElement('p');text.textContent=t[1];
 const privacy=document.createElement('a');privacy.href='https://policies.google.com/privacy';privacy.target='_blank';privacy.rel='noopener';privacy.textContent='Google · Privacy';
 const actions=document.createElement('div');actions.className='cookie-actions';
 function choose(value){allowed=value;try{localStorage.setItem(KEY,JSON.stringify({allowed:value,time:Date.now()}));}catch{}if(value)enable();else{window['ga-disable-'+ID]=true;if(loaded)window.gtag('consent','update',{analytics_storage:'denied'});clearCookies();}panel.hidden=true;settings.focus();}
 const accept=document.createElement('button');accept.type='button';accept.textContent=t[2];accept.onclick=()=>choose(true);
 const reject=document.createElement('button');reject.type='button';reject.textContent=t[3];reject.onclick=()=>choose(false);
 actions.append(accept,reject);panel.append(title,text,privacy,actions);document.body.append(panel);
 const settings=document.createElement('button');settings.type='button';settings.className='cookie-settings';settings.textContent=t[4];settings.onclick=()=>{panel.hidden=false;accept.focus();};(document.querySelector('footer')||document.body).append(settings);
 panel.hidden=!!saved;if(saved?.allowed===true)enable();else window['ga-disable-'+ID]=true;
 document.addEventListener('click',event=>{const a=event.target.closest?.('a[href]');if(!allowed||!a)return;const href=a.getAttribute('href');const name=href.startsWith('tel:')?'click_phone':href.startsWith('https://wa.me/')?'click_whatsapp':href.startsWith('https://www.facebook.com/1taxipoprad')?'click_facebook':href.startsWith('mailto:')?'click_email':null;if(name)window.gtag('event',name,{page_language:lang,contact_location:a.closest('header')?'header':a.closest('footer')?'footer':a.closest('.floating-contact')?'floating':'content',transport_type:'beacon'});});
})();

// Contact bar labels and agency credit follow the active page language.
(()=>{
 const labels={
 sk:['Online rezervácia WhatsApp','Zavolať hneď taxi','Sleduj nás Facebook','Web vytvorila mediálna agentúra '],
 en:['Online booking WhatsApp','Call a taxi now','Follow us on Facebook','Website by media agency '],
 de:['Online buchen WhatsApp','Jetzt Taxi anrufen','Folge uns auf Facebook','Website erstellt von der Medienagentur '],
 ru:['Онлайн-бронирование WhatsApp','Вызвать такси сейчас','Мы в Facebook','Сайт создан медиаагентством '],
 pl:['Rezerwacja online WhatsApp','Zadzwoń po taxi teraz','Obserwuj nas na Facebooku','Stronę stworzyła agencja medialna '],
 hu:['Online foglalás WhatsApp','Hívjon taxit most','Kövessen a Facebookon','A weboldalt készítette a médiaügynökség '],
 uk:['Онлайн-бронювання WhatsApp','Викликати таксі зараз','Ми у Facebook','Сайт створено медіаагентством '],
 it:['Prenota online WhatsApp','Chiama subito un taxi','Seguici su Facebook','Sito creato dall’agenzia media '],
 fr:['Réservation en ligne WhatsApp','Appelez un taxi maintenant','Suivez-nous sur Facebook','Site créé par l’agence média '],
 es:['Reserva online WhatsApp','Llama a un taxi ahora','Síguenos en Facebook','Web creada por la agencia de medios '],
 zh:['WhatsApp 在线预订','立即致电叫车','在 Facebook 关注我们','网站由媒体机构制作 '],
 ja:['WhatsApp オンライン予約','今すぐタクシーを呼ぶ','Facebook でフォロー','ウェブサイト制作：メディアエージェンシー '],
 ar:['حجز عبر الإنترنت WhatsApp','اتصل بسيارة أجرة الآن','تابعنا على Facebook','الموقع من إعداد الوكالة الإعلامية ']
 }[document.documentElement.lang];if(!labels)return;
 document.querySelectorAll('.floating-contact > a').forEach((a,i)=>{if(i>2)return;const svg=a.querySelector('svg');a.replaceChildren();if(svg)a.append(svg);a.append(document.createTextNode(' '+labels[i]));a.setAttribute('aria-label',labels[i]);});
 const credit=document.querySelector('.footer-bottom > span:last-child');
 if(credit){const link=credit.querySelector('a');if(link){link.textContent='GALA MEDIA';credit.replaceChildren(document.createTextNode(labels[3]),link);}}
})();

(()=>{const paths=['<path d="m5 8 2-5h10l2 5M3 8h18v10H3zM5 18v3m14-3v3M3 12h18"/><circle cx="7" cy="15" r="1"/><circle cx="17" cy="15" r="1"/>','<path d="m22 2-7 20-4-9-9-4 20-7zM22 2 11 13"/>','<circle cx="9" cy="7" r="3"/><path d="M3 21v-4a6 6 0 0 1 12 0v4M16 4a3 3 0 0 1 0 6m2 4a5 5 0 0 1 3 5v2"/>'];document.querySelectorAll('#sluzby .service-grid .number').forEach((el,i)=>{if(!paths[i])return;el.textContent='';const svg=new DOMParser().parseFromString('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+paths[i]+'</svg>','image/svg+xml').documentElement;el.append(document.importNode(svg,true));el.setAttribute('aria-hidden','true');});})();
