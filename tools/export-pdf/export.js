const puppeteer = require('puppeteer-core');
const { PDFDocument } = require('pdf-lib');
const path = require('path');
const fs = require('fs');

const DECK_PATH = process.argv[2] || path.resolve(__dirname, '../../index.html');
const OUT_PATH = process.argv[3] || path.resolve(__dirname, '../../slides.pdf');
const TOTAL = parseInt(process.argv[4], 10) ||
  fs.readFileSync(DECK_PATH, 'utf8').match(/<section class="slide/g).length;
const CHROME_PATH = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const HIDE_UI_CSS = `
  .hint, .navbtn, #ovBtn, .chrome, #overview { display: none !important; }
  .slide, .slide.noanim { transition: none !important; }
`;

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 2 });
  await page.emulateMediaType('screen');

  const merged = await PDFDocument.create();

  for (let i = 1; i <= TOTAL; i++) {
    const url = 'file://' + path.resolve(DECK_PATH) + '#' + i;
    await page.goto(url, { waitUntil: 'networkidle0' });
    await page.addStyleTag({ content: HIDE_UI_CSS });
    await new Promise(r => setTimeout(r, 200));

    const pdfBuffer = await page.pdf({
      width: '1920px',
      height: '1080px',
      printBackground: true,
      pageRanges: '1',
      margin: { top: 0, bottom: 0, left: 0, right: 0 },
    });

    const src = await PDFDocument.load(pdfBuffer);
    const [copiedPage] = await merged.copyPages(src, [0]);
    merged.addPage(copiedPage);
    console.log('slide', i, 'done');
  }

  await browser.close();
  const bytes = await merged.save();
  fs.writeFileSync(OUT_PATH, bytes);
  console.log('Saved to', OUT_PATH);
})();
