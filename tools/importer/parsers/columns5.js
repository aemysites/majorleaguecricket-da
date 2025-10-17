/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as required
  const headerRow = ['Columns block (columns5)'];

  // Get the three main sponsor columns
  // Defensive: get all direct children divs (these are the columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, build the cell content
  const cells = columns.map((col) => {
    // Find the heading: look for h3 or div with class 'sponsors__heading'
    let heading = col.querySelector('h3, .sponsors__heading');
    // Defensive: reference the heading if found
    let headingElem = heading || null;

    // Find all sponsor logo containers (may be multiple per column)
    // We'll collect all <a> elements with an <img> inside (logo links)
    const logoLinks = Array.from(col.querySelectorAll('a > img')).map(img => {
      // Use the parent <a> (the logo link)
      return img.parentElement;
    });

    // Remove duplicates (in case)
    const uniqueLogoLinks = Array.from(new Set(logoLinks));

    // Build the cell content: heading + all logo links (each on its own line)
    const content = [];
    if (headingElem) {
      content.push(headingElem);
    }
    uniqueLogoLinks.forEach((a, idx) => {
      // Add a line break between logos if more than one
      if (idx > 0) content.push(document.createElement('br'));
      content.push(a);
    });

    // If no heading and no logos, add an empty string
    if (!headingElem && uniqueLogoLinks.length === 0) {
      content.push('');
    }

    return content;
  });

  // Build the table rows
  const tableRows = [headerRow, cells];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element
  element.replaceWith(block);
}
