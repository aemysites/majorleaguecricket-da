/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards3) block: 2 columns, multiple rows, each row = card
  // Header row
  const headerRow = ['Cards (cards3)'];

  // Find all card elements (each .videos__video is a card)
  const cardEls = element.querySelectorAll('.videos__video');
  const rows = [];

  cardEls.forEach((cardEl) => {
    // Image: find the thumbnail image (first img in .videos__thumbnailsec)
    const thumbnailSec = cardEl.querySelector('.videos__thumbnailsec');
    let imageEl = null;
    if (thumbnailSec) {
      imageEl = thumbnailSec.querySelector('img.videos__thumbnailsec--thumbnail');
    }
    // Defensive: fallback to first img if class not present
    if (!imageEl && thumbnailSec) {
      imageEl = thumbnailSec.querySelector('img');
    }

    // Text: date and title (both in .videos__desc)
    const descSec = cardEl.querySelector('.videos__desc');
    let textFrag = document.createDocumentFragment();
    if (descSec) {
      // Date
      const dateEl = descSec.querySelector('.videos__desc-date');
      if (dateEl) {
        const dateP = document.createElement('p');
        dateP.textContent = dateEl.textContent.trim();
        textFrag.appendChild(dateP);
      }
      // Title
      const titleEl = descSec.querySelector('.videos__desc-title');
      if (titleEl) {
        const titleP = document.createElement('p');
        titleP.textContent = titleEl.textContent.trim();
        titleP.style.fontWeight = 'bold';
        textFrag.appendChild(titleP);
      }
    }

    // Build row: [image, text]
    rows.push([
      imageEl ? imageEl : '',
      textFrag.childNodes.length ? textFrag : ''
    ]);
  });

  // Compose table
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with table
  element.replaceWith(table);
}
