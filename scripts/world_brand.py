from lxml import etree
COPY={
'sk':('Z Popradu','do celého sveta.','Odvezieme vás z Popradu na letisko. Odtiaľ už môžete letieť, kam len chcete.'),
'en':('From Poprad','to the whole world.','We take you from Poprad to the airport. From there, fly wherever you want.'),
'de':('Von Poprad','in die ganze Welt.','Wir bringen Sie von Poprad zum Flughafen. Von dort fliegen Sie, wohin Sie möchten.'),
'ru':('Из Попрада','по всему миру.','Довезём вас из Попрада в аэропорт. А дальше летите, куда захотите.'),
'pl':('Z Popradu','na cały świat.','Zawieziemy Cię z Popradu na lotnisko. Stamtąd leć, dokąd tylko chcesz.'),
'hu':('Poprádról','az egész világba.','Elvisszük Poprádról a repülőtérre. Onnan oda repülhet, ahová csak szeretne.'),
'uk':('З Попрада','у цілий світ.','Відвеземо вас із Попрада до аеропорту. А далі летіть, куди забажаєте.'),
'it':('Da Poprad','in tutto il mondo.','Ti portiamo da Poprad all’aeroporto. Da lì, vola dove vuoi.'),
'fr':('De Poprad','vers le monde entier.','Nous vous conduisons de Poprad à l’aéroport. Ensuite, envolez-vous où vous voulez.'),
'es':('De Poprad','al mundo entero.','Te llevamos de Poprad al aeropuerto. Desde allí, vuela adonde quieras.'),
'zh':('从波普拉德','走向全世界。','我们送您从波普拉德前往机场。从那里，飞往您向往的地方。'),
'ja':('ポプラトから','世界中へ。','ポプラトから空港までお送りします。そこからは、お好きな場所へ。'),
'ar':('من بوبراد','إلى العالم أجمع.','نوصلك من بوبراد إلى المطار. ومن هناك، سافر إلى حيث تشاء.')}
def apply(root):
 lang=root.get('lang','sk');a,b,desc=COPY.get(lang,COPY['en']);slogan=a+' '+b
 for h in root.xpath('//section[contains(concat(" ",normalize-space(@class)," ")," hero ")]//h1'):
  h.clear();h.text=a;etree.SubElement(h,'br');etree.SubElement(h,'em').text=b
 for p in root.xpath('//*[contains(concat(" ",normalize-space(@class)," ")," hero-copy ")]/p'):
  p.clear();p.text=desc
 for img in root.xpath('//img[contains(concat(" ",normalize-space(@class)," ")," hero-photo ")]'):
  img.set('src','/assets/airport-hero.jpg');img.set('alt',slogan+' — 1 Taxi Poprad');img.set('width','1536');img.set('height','1024')
 for p in root.xpath('//div[contains(concat(" ",normalize-space(@class)," ")," footer-grid ")]/div[1]/p'):
  p.clear();p.text=slogan
 for section in root.xpath('//section[contains(concat(" ",normalize-space(@class)," ")," cta ")]'):
  p=section.find('p')
  if p is not None:p.text=desc
 for section in root.xpath('//*[@id="sluzby"]'):
  h=section.xpath('.//article[2]/h3')
  if h:
   p=etree.Element('span',{'class':'airport-tagline'});p.text=slogan;h[0].addprevious(p)
 if root.xpath('//section[contains(concat(" ",normalize-space(@class)," ")," hero ")]'):
  root.find('head').find('title').text='1 Taxi Poprad — '+slogan
  for m in root.xpath('//head/meta[@name="description" or @property="og:description" or @name="twitter:description"]'):m.set('content',desc+' 1 Taxi Poprad · +421 911 073 555.')
  for m in root.xpath('//head/meta[@property="og:title" or @name="twitter:title"]'):m.set('content','1 Taxi Poprad — '+slogan)
