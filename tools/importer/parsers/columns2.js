/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get immediate children divs
  const mainDiv = element.querySelector(':scope > div');
  if (!mainDiv) return;
  const topSec = mainDiv.querySelector(':scope > .news__topsec');
  if (!topSec) return;

  // Left column: main article
  const leftCol = topSec.querySelector(':scope > .news__left');
  // Right column: latest news
  const rightCol = topSec.querySelector(':scope > .news__right');

  // Defensive: if either column is missing, fallback to single column
  let columnsRow;
  if (leftCol && rightCol) {
    columnsRow = [leftCol, rightCol];
  } else if (leftCol) {
    columnsRow = [leftCol];
  } else if (rightCol) {
    columnsRow = [rightCol];
  } else {
    // fallback: use all children as columns
    columnsRow = Array.from(topSec.children);
  }

  const headerRow = ['Columns block (columns2)'];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow
  ], document);

  element.replaceWith(table);
}
