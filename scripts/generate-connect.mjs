import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const escape = (s) => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const statuses = new Set(['active', 'planned', 'hidden']);
const platforms = {instagram:'Instagram', threads:'Threads', tiktok:'TikTok', x:'X', youtube:'YouTube', github:'GitHub', website:'Web'};
const icons = {
  instagram:'<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".5"/>',
  threads:'<path d="M19 7c-2-6-15-6-15 5 0 12 17 12 17 1 0-6-13-6-13 0 0 5 9 4 9-3 0-4-5-5-7-3"/>',
  tiktok:'<path d="M14 3v13a4 4 0 1 1-4-4M14 3c0 4 3 6 7 6"/>',
  x:'<path d="M4 3h5l11 18h-5L4 3ZM20 3 4 21"/>',
  youtube:'<rect x="2" y="5" width="20" height="14" rx="4"/><path d="m10 9 5 3-5 3Z"/>',
  github:'<path d="M9 21v-4c-4 1-5-2-5-2M15 21v-4c0-1-.5-2-1-2 5-.5 7-3 5-7 .5-2 0-4 0-4l-4 2a12 12 0 0 0-6 0L5 4s-.5 2 0 4c-2 4 0 6.5 5 7-1 0-1 1-1 2"/>'
};
function validateURL(url) {
  if (typeof url !== 'string') throw Error('URL must be a string');
  if (url.startsWith('/') && !url.startsWith('//') && !url.includes('\\')) {
    const u = new URL(url, 'https://peakheadz.com');
    if ([...u.searchParams.keys()].some(k => k.startsWith('utm_'))) throw Error('Internal UTM is forbidden');
    return;
  }
  const u = new URL(url);
  if (u.protocol !== 'https:' || u.username || u.password) throw Error('Only public HTTPS URLs are allowed');
  if (u.origin === 'https://peakheadz.com' && [...u.searchParams.keys()].some(k => k.startsWith('utm_'))) throw Error('Internal UTM is forbidden');
}
export function validate(data) {
  const ids = new Set();
  for (const item of [...data.links, ...data.comingNext]) {
    if (!/^[a-z][a-z0-9_]{1,63}$/.test(item.id) || ids.has(item.id)) throw Error('Invalid/duplicate ID');
    ids.add(item.id);
    if (!statuses.has(item.status)) throw Error('Invalid status');
    if (item.status === 'hidden') continue;
    for (const key of ['brand','platform','accountName','description','category']) if (!item[key]) throw Error(`Missing ${key}`);
    if (!platforms[item.platform]) throw Error('Unknown platform');
    if (!Number.isFinite(item.displayOrder)) throw Error('Missing displayOrder');
    if (item.status === 'active') {
      validateURL(item.url);
      if (!/^\d{4}-\d{2}-\d{2}$/.test(item.verifiedAt || '') || !item.source) throw Error('Active links need verification and source');
    }
    if (item.status === 'planned' && (!item.announcementApprovedAt || item.url)) throw Error('Planned items need approval and must not expose URLs');
  }
  if (data.analytics.enabled !== false) throw Error('Central analytics onboarding is required before enabling');
}
const sorted = (items) => [...items].sort((a,b) => a.displayOrder-b.displayOrder);
const meta = (x, placement) => `data-mo-cta="${escape(x.id)}" data-mo-cta-group="connect_${placement}" data-connect-link data-link-id="${escape(x.id)}" data-brand="${escape(x.brand)}" data-platform="${escape(x.platform)}" data-category="${escape(x.category)}" data-destination-id="${escape(x.id)}" data-placement="${placement}"`;
function card(x, placement, social = false) {
  const title = social ? `${platforms[x.platform]} · ${x.accountName}` : x.accountName;
  const icon = social ? `<svg class="platform-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[x.platform]}</svg>` : '';
  const body = `${icon}<span class="card-body"><span class="card-label">${escape(x.brand)}</span><span class="card-title">${escape(title)}</span><span class="card-description">${escape(x.description)}</span><span class="card-action">${x.status === 'planned' ? '準備中' : `${escape(x.cta || '見に行く')} <span aria-hidden="true">↗</span>`}</span></span>`;
  if (x.status === 'planned') return `<li class="connect-card planned">${body}</li>`;
  const external = new URL(x.url, 'https://peakheadz.com').origin !== 'https://peakheadz.com';
  return `<li><a class="connect-card" href="${escape(x.url)}" ${external ? 'target="_blank" rel="noopener noreferrer"' : ''} ${meta(x,placement)}>${body}${external ? '<span class="sr-only">（新しいタブで開きます）</span>' : ''}</a></li>`;
}
export function render(data, template) {
  validate(data);
  const visible = sorted(data.links.filter(x => x.status !== 'hidden'));
  const socials = visible.filter(x => x.category === 'social');
  const follow = [...new Set(socials.map(x => x.brand))].map(brand => `<div class="brand-group"><h3>${escape(brand)}</h3><ul class="connect-grid social-grid">${socials.filter(x=>x.brand===brand).map(x=>card(x,'follow',true)).join('\n')}</ul></div>`).join('\n');
  const featured = visible.filter(x => x.status === 'active' && x.featured).map(x=>card(x,'featured')).join('\n');
  const projects = ['Web Experiences','Apps & Tools','Making & Reviews','Other Projects'].map(category => `<div class="brand-group"><h3>${category}</h3><ul class="connect-grid">${visible.filter(x=>x.category===category).map(x=>card(x,'projects')).join('\n')}</ul></div>`).join('\n');
  const coming = sorted(data.comingNext.filter(x=>x.status!=='hidden')).map(x=>card(x,'coming_next')).join('\n');
  return template.replace('{{FOLLOW}}',follow).replace('{{FEATURED}}',featured).replace('{{PROJECTS}}',projects).replace('{{COMING_NEXT}}',coming ? `<ul class="connect-grid">${coming}</ul>` : '<p class="section-note">次の公開情報は、準備が整い次第ここでお知らせします。</p>');
}
export function generate() {
  return render(loadData(),fs.readFileSync(path.join(root,'templates/connect.html'),'utf8').replace(/\r\n/g,'\n'));
}
export function loadData() {
  const config = JSON.parse(fs.readFileSync(path.join(root,'data/connect.json'),'utf8'));
  const catalog = JSON.parse(fs.readFileSync(path.join(root,'data/profile-catalog.json'),'utf8'));
  const resolve = id => {
    const row = catalog[id];
    if (!row || !row.connect) throw Error(`Unknown CONNECT catalog ID: ${id}`);
    return {...row.connect, id, url:row.url, source:row.source};
  };
  return {...config,links:config.linkIds.map(resolve),comingNext:config.comingNextIds.map(resolve)};
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const html = generate();
  const output = path.join(root,'public/connect.html');
  if (process.argv.includes('--check')) {
    if (!fs.existsSync(output) || fs.readFileSync(output,'utf8').replace(/\r\n/g,'\n') !== html) throw Error('Run node scripts/generate-connect.mjs');
    console.log('CONNECT generated HTML is current.');
  } else { fs.writeFileSync(output,html); console.log('Generated public/connect.html'); }
}
