/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header row
  const headerRow = ['Hero (hero4)'];

  // 2. Background image row: Should be empty, as there is no image in the HTML
  const imageRow = [''];

  // 3. Content row: Heading and CTA button
  const subscribeDiv = element.querySelector('.subscribe');
  let contentElements = [];
  if (subscribeDiv) {
    // Heading
    const heading = subscribeDiv.querySelector('.subscribe__heading');
    if (heading) {
      contentElements.push(heading);
    }
    // Button (CTA)
    const button = subscribeDiv.querySelector('.subscribe__btn');
    if (button) {
      contentElements.push(document.createElement('br'));
      // Preserve the original button text casing from the HTML
      contentElements.push(button);
    }
  }
  // Compose the table rows
  const cells = [
    headerRow,
    imageRow,
    [contentElements]
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
