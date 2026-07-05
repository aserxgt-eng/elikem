/**
 * Report generation helpers — Excel export via SheetJS-style `xlsx`,
 * PDF export via jsPDF + autotable, and a printable HTML view.
 */
import type { Product } from './types';
import { formatCurrency, formatDate, getProductStatus } from './utils';

function toRows(products: Product[]) {
  return products.map((p) => ({
    Name: p.name,
    Category: p.category,
    Price: p.price,
    Stock: p.stockQuantity,
    Availability: p.availability,
    Status: getProductStatus(p),
    Origin: p.placeOfOrigin,
    'Batch Number': p.batchNumber,
    'Manufacturing Date': formatDate(p.manufacturingDate),
    'Expiry Date': formatDate(p.expiryDate),
  }));
}

export async function exportProductsToExcel(products: Product[]) {
  const XLSX = await import('xlsx');
  const worksheet = XLSX.utils.json_to_sheet(toRows(products));
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');
  XLSX.writeFile(workbook, `elikem-products-${Date.now()}.xlsx`);
}

export async function exportProductsToPdf(products: Product[]) {
  const { jsPDF } = await import('jspdf');
  const autoTable = (await import('jspdf-autotable')).default;

  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text('Elikem — Product Inventory Report', 14, 18);
  doc.setFontSize(10);
  doc.setTextColor(120);
  doc.text(`Generated ${new Date().toLocaleString()}`, 14, 24);

  autoTable(doc, {
    startY: 30,
    head: [['Name', 'Category', 'Price', 'Stock', 'Status', 'Batch', 'Expiry']],
    body: products.map((p) => [
      p.name,
      p.category,
      formatCurrency(p.price),
      String(p.stockQuantity),
      getProductStatus(p),
      p.batchNumber,
      formatDate(p.expiryDate),
    ]),
    headStyles: { fillColor: [0, 102, 204] },
    styles: { fontSize: 8 },
  });

  doc.save(`elikem-products-${Date.now()}.pdf`);
}

/** Opens a print-friendly window with a clean, minimal product list. */
export function printProductList(products: Product[]) {
  const win = window.open('', '_blank');
  if (!win) return;

  const rows = toRows(products)
    .map(
      (r) =>
        `<tr>${Object.values(r)
          .map((v) => `<td style="padding:8px;border-bottom:1px solid #E2E8F0;font-size:12px;">${v}</td>`)
          .join('')}</tr>`
    )
    .join('');

  const headers = Object.keys(toRows(products)[0] ?? {})
    .map((h) => `<th style="text-align:left;padding:8px;font-size:12px;color:#8A94A6;">${h}</th>`)
    .join('');

  win.document.write(`
    <html>
      <head><title>Elikem — Product List</title></head>
      <body style="font-family: sans-serif; padding: 24px;">
        <h2 style="color:#0066CC;">Elikem Product Inventory</h2>
        <table style="width:100%;border-collapse:collapse;">
          <thead><tr>${headers}</tr></thead>
          <tbody>${rows}</tbody>
        </table>
        <script>window.onload = () => window.print();</script>
      </body>
    </html>
  `);
  win.document.close();
}
