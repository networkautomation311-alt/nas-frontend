// =====================================
// src/utils/generateInvoicePdf.js
// =====================================

import jsPDF from "jspdf";

export const generateInvoicePdf =
  (invoice) => {

    const doc =
      new jsPDF();

    doc.setFontSize(20);

    doc.text(
      "NAS TECHNOLOGY",
      20,
      20
    );

    doc.setFontSize(14);

    doc.text(
      "TAX INVOICE",
      20,
      30
    );

    doc.text(
      `Invoice No: ${invoice.invoiceNumber}`,
      20,
      40
    );

    doc.text(
      `Customer: ${invoice.client?.clientName}`,
      20,
      50
    );

    doc.text(
      `Mobile: ${invoice.client?.mobileNumber}`,
      20,
      60
    );

    doc.text(
      `Grand Total: ₹${invoice.grandTotal}`,
      20,
      70
    );

    doc.text(
      `Payment Status: ${invoice.paymentStatus}`,
      20,
      80
    );

    doc.save(
      `${invoice.invoiceNumber}.pdf`
    );
  };