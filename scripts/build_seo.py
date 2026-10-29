"""Regenerate static localized pages, metadata, OG artwork and sitemap.
Development dependencies: Python 3, lxml, Pillow. No server dependencies.
Default is preview/noindex. --live explicitly enables indexing for launch.
"""
from pathlib import Path
from lxml import html,etree
from PIL import Image,ImageDraw,ImageFont,ImageOps
import json,re,copy,sys
p=Path(__file__).resolve().parents[1]
origin='https://1taxipoprad.sk';live='--live' in sys.argv
bundle=json.loads((p/'translations.js').read_text().split('=',1)[1].rstrip(';\n'))
source=bundle['source'];locales=['sk']+list(bundle['locales']);ids={s:str(i) for i,s in enumerate(source)}
files=['index.html','cennik.html','vozidla.html','kontakt.html']
localetag={'sk':'sk_SK','en':'en_GB','de':'de_DE','ru':'ru_RU','pl':'pl_PL','hu':'hu_HU','uk':'uk_UA','it':'it_IT','fr':'fr_FR','es':'es_ES','zh':'zh_CN','ja':'ja_JP','ar':'ar_SA'}
def tr(s,lang):
 if lang=='sk':return s
 if s.strip() in ids:return s.replace(s.strip(),bundle['locales'][lang].get(ids[s.strip()],s.strip()))
 return s
def pagepath(lang,f):return ('/' if lang=='sk' else '/'+lang+'/')+('' if f=='index.html' else f)
def url(lang,f):return origin+pagepath(lang,f)
def meta(head,name,content,prop=False):
 key='property' if prop else 'name';old=head.xpath(f'meta[@{key}="{name}"]')
 if old:el=old[0]
 else:el=etree.SubElement(head,'meta');el.set(key,name)
 el.set('content',str(content))
# Design-native sharing cards use the original logo file; no logo redrawing.
font='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
regular='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
(p/'assets/og').mkdir(exist_ok=True)
for f,photo,large,small in [('index.html','g4.jpg','1 TAXI','POPRAD'),('cennik.html','g6.jpg','6+1','1 TAXI POPRAD'),('vozidla.html','g3.jpg','1 TAXI','POPRAD'),('kontakt.html','g2.jpg','24/7','1 TAXI POPRAD')]:
 canvas=Image.new('RGB',(1200,630),'#090909');pic=ImageOps.fit(Image.open(p/'assets'/photo).convert('RGB'),(620,630),centering=(.5,.5));canvas.paste(pic,(580,0))
 veil=Image.new('RGBA',canvas.size,(0,0,0,0));draw=ImageDraw.Draw(veil)
 for x in range(550,1000):draw.line((x,0,x,630),fill=(9,9,9,max(0,int(245*(1-(x-550)/450)))))
 canvas=Image.alpha_composite(canvas.convert('RGBA'),veil)
 logo=Image.open(p/'assets/logo.png').convert('RGBA');logo.thumbnail((112,112),Image.Resampling.LANCZOS);canvas.alpha_composite(logo,(54,44))
 d=ImageDraw.Draw(canvas);d.rectangle((54,188,105,193),fill='#ed1913');d.text((48,213),large,font=ImageFont.truetype(font,102),fill='white');d.text((54,340),small,font=ImageFont.truetype(font,37),fill='#ff615b');d.text((54,459),'0911 073 555',font=ImageFont.truetype(font,35),fill='white');d.text((54,521),'1taxipoprad.sk',font=ImageFont.truetype(regular,24),fill='#c3c3c3');d.rectangle((0,614,1200,630),fill='#d81b16')
 canvas.convert('RGB').save(p/'assets/og'/f.replace('.html','.jpg'),quality=91,optimize=True)
# Favicons retain the original artwork and aspect ratio.
logo=Image.open(p/'assets/logo.png').convert('RGBA')
for size,name in [(32,'favicon-32.png'),(180,'apple-touch-icon.png'),(192,'icon-192.png'),(512,'icon-512.png')]:
 icon=Image.new('RGBA',(size,size));scaled=logo.copy();scaled.thumbnail((size,size),Image.Resampling.LANCZOS);icon.alpha_composite(scaled,((size-scaled.width)//2,(size-scaled.height)//2));icon.save(p/'assets'/name)
for lang in locales:
 for f in files:
  root=html.fromstring((p/'seo-source'/f).read_text());root.set('lang',lang);root.set('dir','rtl' if lang=='ar' else 'ltr');root.set('data-page',f)
  for el in root.iter():
   if el.tag not in ['script','style','option']:
    if el.text:el.text=tr(el.text,lang)
   if el.tail:el.tail=tr(el.tail,lang)
  head=root.find('head');title=head.find('title').text
  for unused in root.xpath('//script[@src="translations.js"]'):unused.getparent().remove(unused)
  if lang=='sk':description=head.xpath('meta[@name="description"]')[0].get('content')
  else:
   description=tr({'index.html':source[16]+' '+source[17], 'cennik.html':source[119], 'vozidla.html':source[135], 'kontakt.html':source[144]}[f],lang)
   if f=='index.html':description=tr(source[16],lang)+' '+tr(source[17],lang)
   if len(description)<125:description+=' +421 911 073 555. WhatsApp: +421 950 410 888.'
  meta(head,'description',description);meta(head,'robots','index,follow,max-image-preview:large' if live else 'noindex,nofollow');meta(head,'format-detection','telephone=no')
  canonical=etree.SubElement(head,'link',rel='canonical',href=url(lang,f))
  for other in locales:etree.SubElement(head,'link',rel='alternate',hreflang=other,href=url(other,f))
  etree.SubElement(head,'link',rel='alternate',hreflang='x-default',href=url('sk',f))
  og=origin+'/assets/og/'+f.replace('.html','.jpg')
  for key,value in {'og:title':title,'og:description':description,'og:type':'website','og:url':url(lang,f),'og:site_name':'1 Taxi Poprad','og:locale':localetag[lang],'og:image':og,'og:image:secure_url':og,'og:image:type':'image/jpeg','og:image:width':'1200','og:image:height':'630','og:image:alt':'1 Taxi Poprad — '+tr(source[8],lang)+' — '+tr(source[22],lang)}.items():meta(head,key,value,True)
  for other in locales:
   if other!=lang:etree.SubElement(head,'meta',property='og:locale:alternate',content=localetag[other])
  for key,value in {'twitter:card':'summary_large_image','twitter:title':title,'twitter:description':description,'twitter:image':og,'twitter:image:alt':'1 Taxi Poprad — '+tr(source[8],lang)}.items():meta(head,key,value)
  for el in head.xpath('link[@rel="icon"]'):head.remove(el)
  etree.SubElement(head,'link',rel='icon',type='image/png',sizes='32x32',href='/assets/favicon-32.png')
  etree.SubElement(head,'link',rel='apple-touch-icon',sizes='180x180',href='/assets/apple-touch-icon.png')
  etree.SubElement(head,'link',rel='manifest',href='/site.webmanifest')
  etree.SubElement(head,'link',rel='preconnect',href='https://fonts.googleapis.com')
  etree.SubElement(head,'link',rel='preconnect',href='https://fonts.gstatic.com',crossorigin='anonymous')
  schema={'@context':'https://schema.org','@graph':[
   {'@type':'LocalBusiness','@id':origin+'/#business','name':'1 Taxi Poprad','legalName':'K.J.T. s.r.o.','url':origin+'/','image':origin+'/assets/og/index.jpg','logo':origin+'/assets/logo.png','telephone':'+421911073555','email':'info@1taxipoprad.sk','address':{'@type':'PostalAddress','streetAddress':'Dostojevského 2514/7','addressLocality':'Poprad','postalCode':'058 01','addressCountry':'SK'},'areaServed':{'@type':'City','name':'Poprad'},'sameAs':['https://www.facebook.com/1taxipoprad'],'openingHoursSpecification':[{'@type':'OpeningHoursSpecification','dayOfWeek':['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],'opens':'00:00','closes':'23:59'}],'contactPoint':[{'@type':'ContactPoint','telephone':phone,'contactType':'reservations'} for phone in ['+421911073555','+421950410666']]},
   {'@type':'TaxiService','@id':origin+'/#taxi','name':'1 Taxi Poprad','provider':{'@id':origin+'/#business'},'areaServed':{'@type':'City','name':'Poprad'},'serviceType':'Taxi, airport transfers, 6+1 passenger transport','url':origin+'/'},
   {'@type':'WebSite','@id':origin+'/#website','url':origin+'/','name':'1 Taxi Poprad','publisher':{'@id':origin+'/#business'},'inLanguage':locales},
   {'@type':'WebPage','@id':url(lang,f)+'#page','url':url(lang,f),'name':title,'description':description,'inLanguage':lang,'isPartOf':{'@id':origin+'/#website'},'about':{'@id':origin+'/#taxi'},'primaryImageOfPage':{'@type':'ImageObject','url':og,'width':1200,'height':630}}]}
  if f!='index.html':schema['@graph'].append({'@type':'BreadcrumbList','itemListElement':[{'@type':'ListItem','position':1,'name':tr(source[6],lang),'item':url(lang,'index.html')},{'@type':'ListItem','position':2,'name':tr(source[{'cennik.html':7,'vozidla.html':8,'kontakt.html':9}[f]],lang),'item':url(lang,f)}]})
  script=etree.SubElement(head,'script',type='application/ld+json');script.text=json.dumps(schema,ensure_ascii=False,separators=(',',':'))
  # Root-relative resources work from all language directories.
  for el in root.iter():
   for attr in ['src','href','data-photo']:
    value=el.get(attr)
    if not value or value.startswith(('http:','https:','data:','tel:','mailto:','#','/')):continue
    filename=value.split('?',1)[0].split('#',1)[0]
    if filename in files:
     el.set(attr,pagepath(lang,filename)+('#'+value.split('#',1)[1] if '#' in value else ''))
    else:el.set(attr,'/'+value)
   for attr in ['aria-label','title','alt']:
    value=el.get(attr)
    if not value or lang=='sk':continue
    if value in ids:el.set(attr,tr(value,lang))
    elif 'Otvoriť menu'==value or 'Zavrieť menu'==value or 'Hlavná navigácia'==value:el.set(attr,tr(source[4],lang))
    elif 'Zavolať taxi' in value:el.set(attr,tr(source[18],lang)+' +421 911 073 555')
    elif 'cez WhatsApp' in value:el.set(attr,tr(source[20],lang))
    elif value.startswith('Zväčšiť fotografiu'):el.set(attr,tr(source[8],lang)+' — '+value.replace('Zväčšiť fotografiu ',''))
    elif 'úvodná stránka' in value:el.set(attr,'1 Taxi Poprad — '+tr(source[6],lang))
    elif 'Mapa stanovišťa' in value:el.set(attr,tr(source[92],lang)+' — 1 Taxi Poprad')
    elif el.tag=='img' and '1 Taxi Poprad' in value:el.set(attr,tr(source[8],lang)+' — 1 Taxi Poprad')
  # Add intrinsic dimensions to avoid shifting while images load.
  for image in root.xpath('//img[@src]'):
   path=p/image.get('src').lstrip('/')
   if path.exists():
    with Image.open(path) as im:image.set('width',str(im.width));image.set('height',str(im.height))
  footer=root.find('body').find('footer'); language_nav=etree.SubElement(footer,'nav',{'class':'wrap seo-language-links','aria-label':'Languages'})
  for code,country,name in [['sk', 'sk', 'Slovenčina'], ['en', 'gb', 'English'], ['de', 'de', 'Deutsch'], ['ru', 'ru', 'Русский'], ['pl', 'pl', 'Polski'], ['hu', 'hu', 'Magyar'], ['uk', 'ua', 'Українська'], ['it', 'it', 'Italiano'], ['fr', 'fr', 'Français'], ['es', 'es', 'Español'], ['zh', 'cn', '中文'], ['ja', 'jp', '日本語'], ['ar', 'sa', 'العربية']]:
   a=etree.SubElement(language_nav,'a',href=pagepath(code,f),hreflang=code,lang=code);a.text=name
  dest=p/f if lang=='sk' else p/lang/f;dest.parent.mkdir(exist_ok=True)
  dest.write_text('<!doctype html>\n'+html.tostring(root,encoding='unicode',method='html'))
ns='http://www.sitemaps.org/schemas/sitemap/0.9';xhtml='http://www.w3.org/1999/xhtml';image_ns='http://www.google.com/schemas/sitemap-image/1.1'
site=etree.Element('{'+ns+'}urlset',nsmap={None:ns,'xhtml':xhtml,'image':image_ns})
for lang in locales:
 for f in files:
  entry=etree.SubElement(site,'{'+ns+'}url');etree.SubElement(entry,'{'+ns+'}loc').text=url(lang,f)
  for other in locales:etree.SubElement(entry,'{'+xhtml+'}link',rel='alternate',hreflang=other,href=url(other,f))
  etree.SubElement(entry,'{'+xhtml+'}link',rel='alternate',hreflang='x-default',href=url('sk',f))
  for photo in (['g%d.jpg'%i for i in range(1,9)] if f=='vozidla.html' else ['g4.jpg'] if f=='index.html' else []):
   image=etree.SubElement(entry,'{'+image_ns+'}image');etree.SubElement(image,'{'+image_ns+'}loc').text=origin+'/assets/'+photo
(p/'sitemap.xml').write_bytes(etree.tostring(site,xml_declaration=True,encoding='UTF-8',pretty_print=True))
(p/'robots.txt').write_text('User-agent: *\n'+('Allow: /\n' if live else 'Disallow: /\n')+'\nSitemap: '+origin+'/sitemap.xml\n')
config=json.loads((p/'vercel.json').read_text())
for block in config.get('headers',[]):block['headers']=[h for h in block['headers'] if h['key'].lower()!='x-robots-tag']
if not live:config['headers'][0]['headers'].append({'key':'X-Robots-Tag','value':'noindex, nofollow'})
# Permanently normalize the duplicate index URL while preserving historic .html pages.
config['redirects']=[{'source':'/index.html','destination':'/','permanent':True}]+[{'source':'/'+lang+'/index.html','destination':'/'+lang+'/','permanent':True} for lang in locales if lang!='sk']
(p/'vercel.json').write_text(json.dumps(config,indent=2))
(p/'site.webmanifest').write_text(json.dumps({'name':'1 Taxi Poprad','short_name':'1Taxi','start_url':'/','display':'browser','background_color':'#090909','theme_color':'#090909','icons':[{'src':'/assets/icon-192.png','sizes':'192x192','type':'image/png'},{'src':'/assets/icon-512.png','sizes':'512x512','type':'image/png'}]}))
print('Generated 52 static pages, 4 OG cards, favicons, schema and sitemap; mode:', 'LIVE' if live else 'PREVIEW / NOINDEX')
