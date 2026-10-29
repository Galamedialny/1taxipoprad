from lxml import etree
import re
PATHS={
'phone':'<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.79a2 2 0 0 1-.45 2.11L8.09 9.89a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.33 1.83.56 2.79.69A2 2 0 0 1 22 16.92z"/>',
'chat':'<path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6A8.4 8.4 0 0 1 12.5 3h.5a8.5 8.5 0 0 1 8 8v.5z"/><path d="M9 7.5c0 4 3.5 7.5 7.5 7.5l.5-2-2-1-1 1a8 8 0 0 1-3.5-3.5l1-1-1-2z"/>',
'facebook':'<path d="M14 21v-8h3l.5-4H14V7c0-1.1.4-2 2-2h2V1.5c-.8-.2-1.8-.3-2.8-.3-3 0-5.2 1.9-5.2 5.4V9H7v4h3v8z" fill="currentColor" stroke="none"/>',
'mail':'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/>',
'pin':'<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0z"/><circle cx="12" cy="10" r="2.5"/>',
'car':'<path d="m5 8 2-5h10l2 5M3 8h18v10H3zM5 18v3m14-3v3M3 12h18"/><circle cx="7" cy="15" r="1"/><circle cx="17" cy="15" r="1"/>',
'price':'<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M16 7a5 5 0 1 0 0 10M6 10h8M6 14h8"/>',
'plane':'<path d="m22 2-7 20-4-9-9-4 20-7zM22 2 11 13"/>',
'app':'<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M10 18h4"/>',
'building':'<path d="M4 22V4h12v18M16 10h4v12M1 22h22M8 8h4M8 12h4M8 16h4"/>',
'globe':'<circle cx="12" cy="12" r="10"/><ellipse cx="12" cy="12" rx="4" ry="10"/><path d="M2 12h20"/>',
'home':'<path d="m3 10 9-8 9 8v11H3zM9 21v-8h6v8"/>'}
def icon(name):
 el=etree.fromstring(('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" class="ui-icon" aria-hidden="true" focusable="false">'+PATHS[name]+'</svg>').encode());return el
def enhance(root):
 # Add prominent Facebook entry points without changing translated content.
 header=root.xpath('//div[contains(concat(" ",normalize-space(@class)," ")," header-inner ")]')[0]
 a=etree.SubElement(header,'a',href='https://www.facebook.com/1taxipoprad',target='_blank',rel='noopener',attrib={'class':'header-facebook','aria-label':'Facebook — 1 Taxi Poprad'});a.text='Facebook'
 footer=root.xpath('//div[contains(concat(" ",normalize-space(@class)," ")," footer-grid ")]')[0]
 contact=footer[2];a=etree.SubElement(contact,'a',href='https://www.facebook.com/1taxipoprad',target='_blank',rel='noopener');a.text='Facebook · 1 Taxi Poprad'
 floating=root.xpath('//div[contains(concat(" ",normalize-space(@class)," ")," floating-contact ")]')[0]
 a=etree.SubElement(floating,'a',href='https://www.facebook.com/1taxipoprad',target='_blank',rel='noopener',attrib={'class':'floating-facebook','aria-label':'Facebook — 1 Taxi Poprad'});a.text='Facebook'
 for a in root.xpath('//a[@href]'):
  if 'brand' in a.get('class','').split() or a.get('hreflang') or a.get('class')=='skip':continue
  href=a.get('href');kind=None
  if href.startswith('tel:'):kind='phone'
  elif 'wa.me/' in href:kind='chat'
  elif 'facebook.com/' in href:kind='facebook'
  elif href.startswith('mailto:'):kind='mail'
  elif 'google.com/maps' in href:kind='pin'
  elif 'play.google.com' in href:kind='app'
  elif 'cennik.html' in href:kind='price'
  elif 'vozidla.html' in href:kind='car'
  elif 'kontakt.html' in href:kind='phone'
  elif 'finstat.sk' in href:kind='building'
  elif href.startswith('http'):kind='globe'
  elif href.endswith('/'):kind='home'
  if not kind:continue
  for child in list(a):
   if child.tag=='span' and child.get('aria-hidden')=='true' or child.tag=='span' and (child.text or '').strip() in ['↗','◉']:
    tail=child.tail or '';a.remove(child);a.text=(a.text or '')+tail
  for el in a.iter():
   if el.text:el.text=el.text.replace('↗','').replace('◉','')
   if el.tail:el.tail=el.tail.replace('↗','').replace('◉','')
  a.insert(0,icon(kind))
  if a.text:
   text=a.text;a.text=None;a[0].tail=' '+text.strip()
  a.set('class',(a.get('class','')+' icon-link').strip())
 # Replace decorative arrows with approved artwork, using only the existing logo image.
 for el in root.xpath('//*[@class="cta-mark"]'):el.getparent().remove(el)
 for el in root.xpath('//span[@class="phone-bottom"]'):pass
 for el in root.iter():
  if el.tag not in ['script','style']:
   if el.text:el.text=el.text.replace('↗','')
   if el.tail:el.tail=el.tail.replace('↗','')
 main=root.find('body').find('main');sections=[el for el in list(main) if el.tag=='section' and 'hero' not in el.get('class','').split() and 'page-intro' not in el.get('class','').split()]
 for i,section in enumerate(sections):
  tone='tone-red' if i%2==0 else 'tone-white';idx=main.index(section);main.remove(section);band=etree.Element('div',{'class':'section-band '+tone});main.insert(idx,band);band.append(section)
  ornament=etree.SubElement(band,'span',{'class':'section-ornament','aria-hidden':'true'});etree.SubElement(ornament,'img',src='/assets/logo.png',alt='',loading='lazy')
