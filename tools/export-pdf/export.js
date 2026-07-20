const puppeteer = require('puppeteer-core');
const { PDFDocument } = require('pdf-lib');
const path = require('path');
const fs = require('fs');

const DECK_PATH = process.argv[2] || path.resolve(__dirname, '../../index.html');
const OUT_PATH = process.argv[3] || path.resolve(__dirname, '../../slides.pdf');
const TOTAL = parseInt(process.argv[4], 10) ||
  fs.readFileSync(DECK_PATH, 'utf8').match(/<section class="slide/g).length;
const CHROME_PATH = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

// The deck's content column has a fixed max-width and the slide padding is
// in vw/vh, so rendering at the deck's native 1920x1080 leaves a lot of
// unused margin around the content. Exporting at a smaller (but same
// 16:9) viewport/page size makes the content fill the page more, without
// touching the deck's own CSS (which stays tuned for a real 1920x1080
// screen when presenting live).
const PDF_WIDTH = 1536;
const PDF_HEIGHT = 864;

const HIDE_UI_CSS = `
  .hint, .navbtn, #ovBtn, .chrome, #overview { display: none !important; }
  .slide, .slide.noanim { transition: none !important; }
  /* Chrome's print-to-PDF path doesn't blur box-shadow correctly: it
     paints the shadow's bounding box as a solid rectangle instead of a
     soft glow. Drop it here only, so the live deck keeps the glow. */
  #plenitudeOrbCore { box-shadow: none !important; }
  /* Print-only: the h1 sits taller in the print layout than on screen,
     so the phone mockup card creeps up and overlaps the title. Give the
     title extra clearance here only. */
  .slide-inner:has(#plenitudeAudio) h1.h1 { margin-bottom: 2.6rem !important; }
`;

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
  });
  const page = await browser.newPage();
  await page.setViewport({ width: PDF_WIDTH, height: PDF_HEIGHT, deviceScaleFactor: 2 });
  await page.emulateMediaType('screen');

  const merged = await PDFDocument.create();

  for (let i = 1; i <= TOTAL; i++) {
    // a hash-only URL change is a same-document navigation in Chrome and
    // wouldn't re-run the deck's script, so the query param forces a real reload
    const url = 'file://' + path.resolve(DECK_PATH) + '?s=' + i + '#' + i;
    await page.goto(url, { waitUntil: 'networkidle0' });
    await page.addStyleTag({ content: HIDE_UI_CSS });
    await new Promise(r => setTimeout(r, 200));

    const pdfBuffer = await page.pdf({
      width: PDF_WIDTH + 'px',
      height: PDF_HEIGHT + 'px',
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
