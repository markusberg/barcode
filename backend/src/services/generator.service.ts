import { Document } from './document.class.js'

import type { Barcode, LabelDef, Series } from '../interfaces/barcode.js'

export async function generatePdf(
  barcode: Barcode,
): Promise<PDFKit.PDFDocument> {
  const labelsPerPage = barcode.layout.cols * barcode.layout.rows
  let labelsSoFar = 0

  const series: Series[] = barcode.labels.map((label) => {
    const labels: LabelDef[] = []
    const startNumber = parseInt(label.startno, 10)
    const seriesLength = label.fillpage
      ? labelsPerPage - (labelsSoFar % labelsPerPage)
      : label.num
    for (let idx = startNumber; idx < startNumber + seriesLength; idx++) {
      const col =
        Math.floor(labelsSoFar / barcode.layout.rows) % barcode.layout.cols
      const row = labelsSoFar % barcode.layout.rows
      labelsSoFar++

      const num = idx.toString().padStart(label.startno.length, '0')
      const text = `${label.prefix.toUpperCase()}${num}`
      labels.push({ col, row, text })
    }
    return {
      tapetype: label.tapetype,
      suffix: label.suffix,
      labels: labels,
    }
  })

  const pdf = new Document(barcode.design, barcode.layout)

  for (const serie of series) {
    await pdf.drawSeries(serie)
  }

  return pdf.write()
}
