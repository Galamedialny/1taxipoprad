const toggle=document.querySelector('.menu-toggle');const nav=document.querySelector('#navigation');toggle?.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',window.taxiTranslate?window.taxiTranslate(4):(open?'Zavrieť menu':'Otvoriť menu'));nav.classList.toggle('is-open',open)});document.addEventListener('keydown',e=>{if(e.key==='Escape'){toggle?.setAttribute('aria-expanded','false');nav?.classList.remove('is-open')}});
// Fleet photographs stay in the page; no image lightbox.
document.querySelectorAll('[data-photo]').forEach(button=>{const card=document.createElement('div');card.className=button.className;while(button.firstChild)card.append(button.firstChild);button.replaceWith(card);});
document.querySelector('#photo-dialog')?.remove();

// External maps are opt-in and independent of analytics.
(()=>{const sk=document.documentElement.lang==='sk';window.taxiMaps=function(on){document.querySelectorAll('iframe[data-consent-src]').forEach(frame=>{let gate=frame.previousElementSibling;if(!gate?.classList.contains('map-consent')){gate=document.createElement('div');gate.className='map-consent';const title=document.createElement('h3');title.textContent=sk?'Mapa až s vaším súhlasom':'Map available with your consent';const p=document.createElement('p');p.textContent=sk?'Google Mapy sa načítajú až po povolení externého obsahu. Google pritom môže spracovať vašu IP adresu a údaje zariadenia.':'Google Maps loads only after you allow external content. Google may process your IP address and device information.';const b=document.createElement('button');b.type='button';b.textContent=sk?'Nastavenia cookies':'Cookie settings';b.onclick=()=>document.querySelector('.cookie-settings')?.click();gate.append(title,p,b);frame.before(gate);}gate.hidden=on;frame.hidden=!on;if(on&&!frame.hasAttribute('src'))frame.src=frame.dataset.consentSrc;if(!on)frame.removeAttribute('src');});};window.taxiMaps(false);})();

// Basic consent mode: no Google requests before analytics consent.
(()=>{
 const ID='G-NWBZGGJ5TY',KEY='taxi-analytics-consent-v2',TTL=180*24*60*60*1000;
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
 const sk=lang==='sk';const options=document.createElement('div');options.className='cookie-options';
 const analyticsCheck=document.createElement('input');analyticsCheck.type='checkbox';analyticsCheck.checked=saved?.allowed===true;
 const mapsCheck=document.createElement('input');mapsCheck.type='checkbox';mapsCheck.checked=saved?.maps===true;
 [[analyticsCheck,sk?'Analytika · Google Analytics':'Analytics · Google Analytics'],[mapsCheck,sk?'Externý obsah · Google Mapy':'External content · Google Maps']].forEach(([input,label])=>{const l=document.createElement('label');l.append(input,document.createTextNode(label));options.append(l);});
 const notice=document.createElement('a');notice.href='/cookies';notice.textContent=sk?'Podrobnosti o cookies a ochrane údajov':'Cookie and privacy details';options.append(notice);

 function choose(value,maps=false){allowed=value;window.taxiMaps(maps);try{localStorage.setItem(KEY,JSON.stringify({allowed:value,maps:maps,time:Date.now()}));}catch{}if(value)enable();else{window['ga-disable-'+ID]=true;if(loaded)window.gtag('consent','update',{analytics_storage:'denied'});clearCookies();}panel.hidden=true;settings.focus();}
 const accept=document.createElement('button');accept.type='button';accept.textContent=sk?'Uložiť výber':'Save choices';accept.onclick=()=>choose(analyticsCheck.checked,mapsCheck.checked);
 const reject=document.createElement('button');reject.type='button';reject.textContent=t[3];reject.onclick=()=>{analyticsCheck.checked=false;mapsCheck.checked=false;choose(false,false);};
  const acceptAll=document.createElement('button');acceptAll.type='button';acceptAll.className='cookie-accept-all';acceptAll.textContent=({sk:'Prijať všetko',en:'Accept all',de:'Alle akzeptieren',ru:'Принять все',pl:'Akceptuj wszystkie',hu:'Összes elfogadása',uk:'Прийняти все',it:'Accetta tutto',fr:'Tout accepter',es:'Aceptar todo',zh:'全部接受',ja:'すべて許可',ar:'قبول الكل'})[lang]||'Accept all';acceptAll.onclick=()=>{analyticsCheck.checked=true;mapsCheck.checked=true;choose(true,true);};
 actions.append(acceptAll,reject,accept);panel.append(title,text,options,privacy,actions);document.body.append(panel);
 const settings=document.createElement('button');settings.type='button';settings.className='cookie-settings';settings.textContent=t[4];settings.onclick=()=>{panel.hidden=false;accept.focus();};(document.querySelector('footer')||document.body).append(settings);
 panel.hidden=!!saved;window.taxiMaps(saved?.maps===true);if(saved?.allowed===true)enable();else window['ga-disable-'+ID]=true;
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
