/* global WebImporter */
export default function parse(element, { document }) {
  // Extract columns
  const wrapper = element.querySelector('.wrapper');
  const columns = wrapper ? Array.from(wrapper.querySelectorAll(':scope > .footer__container > .footer__column, :scope > .footer__container > .footer__column--1')) : [];
  if (!columns.length) {
    columns.push(...element.querySelectorAll(':scope > div > div.footer__column, :scope > div > div.footer__column--1'));
  }

  // Column 1: logo, addresses
  let col1Content = [];
  const col1 = columns.find(col => col.classList.contains('footer__column--1'));
  if (col1) {
    const logo = col1.querySelector('.footer__logo');
    if (logo) col1Content.push(logo.cloneNode(true));
    const addressSec = col1.querySelector('.footer__addresssec');
    if (addressSec) col1Content.push(addressSec.cloneNode(true));
  }

  // Column 2: Teams
  let col2Content = [];
  const col2 = columns.find(col => {
    const h = col.querySelector('h3');
    return h && h.textContent.trim().toLowerCase() === 'teams';
  });
  if (col2) {
    const heading = col2.querySelector('h3');
    if (heading) col2Content.push(heading.cloneNode(true));
    const links = col2.querySelector('.footer__column--links');
    if (links) col2Content.push(links.cloneNode(true));
  }

  // Column 3: Site Map
  let col3Content = [];
  const col3 = columns.find(col => {
    const h = col.querySelector('h3');
    return h && h.textContent.trim().toLowerCase() === 'site map';
  });
  if (col3) {
    const heading = col3.querySelector('h3');
    if (heading) col3Content.push(heading.cloneNode(true));
    const links = col3.querySelector('.footer__column--links');
    if (links) col3Content.push(links.cloneNode(true));
  }

  // Column 4: About + social icons
  let col4Content = [];
  const col4 = columns.find(col => {
    const h = col.querySelector('h3');
    return h && h.textContent.trim().toLowerCase() === 'about';
  });
  if (col4) {
    const heading = col4.querySelector('h3');
    if (heading) col4Content.push(heading.cloneNode(true));
    const links = col4.querySelector('.footer__column--links');
    if (links) col4Content.push(links.cloneNode(true));
    const social = col4.querySelector('.footer__social');
    if (social) col4Content.push(social.cloneNode(true));
  }

  // Copyright: must be a row with 4 columns, copyright in a single cell with colspan=4
  const copyright = element.querySelector('.footer__copy');
  let copyrightRow = null;
  if (copyright) {
    // Use a single cell with colspan=4
    const td = document.createElement('td');
    td.colSpan = 4;
    td.appendChild(copyright.cloneNode(true));
    copyrightRow = [td];
  }

  // Compose table rows
  const headerRow = ['Columns block (columns6)'];
  const contentRow = [col1Content, col2Content, col3Content, col4Content];
  const cells = [headerRow, contentRow];
  if (copyrightRow) cells.push(copyrightRow);
  const table = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(table);
}
