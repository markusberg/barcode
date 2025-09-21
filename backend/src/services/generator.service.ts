import { Document } from './document.class.js'

import type { Barcode } from '../interfaces/barcode.js'

class GeneratorService {
  public async generatePdf(barcode: Barcode): Promise<PDFKit.PDFDocument> {
    const labelsPerPage = barcode.layout.cols * barcode.layout.rows
    let labelsSoFar = 0

    let series = barcode.labels.map((label) => {
      let labels = []
      let startNo = Number(label.startno)
      let numberInSeries = label.fillpage
        ? labelsPerPage - (labelsSoFar % labelsPerPage)
        : label.num
      while (labels.length < numberInSeries) {
        let col =
          Math.floor(labelsSoFar / barcode.layout.rows) % barcode.layout.cols
        let row = labelsSoFar % barcode.layout.rows
        labelsSoFar++
        labels.push({
          col: col,
          row: row,
          text: [label.prefix, this.leftPad(startNo++, label.startno.length)]
            .join('')
            .toUpperCase(),
        })
      }
      return {
        tapetype: label.tapetype,
        suffix: label.suffix,
        labels: labels,
      }
    })

    const pdf = new Document(barcode.design, barcode.layout)

    for (let i = 0; i < series.length; i++) {
      await pdf.drawSeries(series[i])
    }

    return pdf.write()
  }

  private leftPad(num: number, len: number) {
    let retval = '' + num
    while (retval.length < len) {
      retval = '0' + retval
    }
    return retval
  }
}

export const generatorService = new GeneratorService()
