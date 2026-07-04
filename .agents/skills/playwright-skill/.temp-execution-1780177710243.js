const { chromium } = require('playwright');
const BASE = 'http://localhost:8484';
const PAGES = [
  { file:'index.html',      name:'Home' },
  { file:'story.html',      name:'Our Story' },
  { file:'craft.html',      name:'The Craft' },
  { file:'kindwords.html',  name:'Kind Words' },
  { file:'faq.html',        name:'FAQ' },
  { file:'clientcare.html', name:'Client Care' },
];

(async () => {
  const browser = await chromium.launch({ headless: true });
  const issues = [];

  for (const p of PAGES) {
    const page = await browser.newPage();
    await page.setViewportSize({ width: 390, height: 844 });
    await page.route('**/*.mp4', r => r.abort());
    await page.goto(`${BASE}/${p.file}`, { waitUntil: 'domcontentloaded', timeout: 12000 });
    await page.waitForTimeout(700);
    await page.evaluate(() => {
      document.querySelectorAll('section,footer,.block-1,.block-1-quote').forEach(el => {
        el.style.opacity='1'; el.style.transform='translateY(0)';
      });
    });
    await page.waitForTimeout(300);

    // Check overflow
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 2);
    if (overflow) {
      const w = await page.evaluate(() => document.documentElement.scrollWidth);
      issues.push(`${p.name}: overflow (scrollWidth=${w}px vs 390px)`);
    }

    // Check nav links — only flag if NOT bespoke (bespoke has no page yet)
    const dead = await page.evaluate(() =>
      Array.from(document.querySelectorAll('header.nav a, .mobile-menu a'))
        .filter(a => a.getAttribute('href') === '#' && !a.textContent.includes('Bespoke') && a.closest('.mark') === null)
        .map(a => a.textContent.trim())
    );
    if (dead.length) issues.push(`${p.name}: dead nav links → ${dead.join(', ')}`);

    // Screenshot top 844px
    await page.screenshot({ path: `/tmp/final-${p.file.replace('.html','')}`, fullPage: false });
    console.log(`✅ ${p.name}${overflow ? ' ⚠️ overflow' : ''}${dead.length ? ' ⚠️ dead: '+dead.join(',') : ''}`);
    await page.close();
  }

  if (issues.length) {
    console.log('\n⚠️  Issues:');
    issues.forEach(i => console.log(' -', i));
  } else {
    console.log('\n✅ All pages clean');
  }

  await browser.close();
})();
