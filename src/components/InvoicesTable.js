import React from "react";
import {
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  IconButton
} from "@material-ui/core";

import Download from "@material-ui/icons/CloudDownload";

export class InvoiceItem {
  constructor(month, date, amount) {
    this.month = month;
    this.date = date;
    this.amount = amount;
  }

  formatAmount() {
    return `NIS${this.amount}`;
  }
}

const columns = [
  {
    title: "Month"
  },
  {
    title: "Invoice Date"
  },
  {
    title: "Amount"
  },
  {
    title: "Download"
  }
];

/**
 * invoices array should contain items of InvoiceItem
 * @param {*} param0
 * @returns
 */
export default function InvoicesTable({ invoices, onDownloadInvoiceClicked }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          {columns.map((col) => (
            <TableCell>{col.title}</TableCell>
          ))}
          {/* <TableCell>Month</TableCell>
          <TableCell align="right">Invoice Date</TableCell>
          <TableCell align="right">Amount</TableCell>
          <TableCell align="right">Download</TableCell> */}
        </TableRow>
      </TableHead>
      <TableBody>
        {invoices.map((invoiceItem, index) => (
          <TableRow key={`invoice_item_${index}`}>
            <TableCell>{invoiceItem.month}</TableCell>
            <TableCell align="right">{invoiceItem.date}</TableCell>
            <TableCell align="right">{invoiceItem.formatAmount()}</TableCell>
            <TableCell align="right">
              <IconButton onClick={() => onDownloadInvoiceClicked(invoiceItem)}>
                <Download />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
