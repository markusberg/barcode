import PDFDocument from 'pdfkit'
import { Label } from './label.class'
import { Design, LabelDef, Layout, Series } from '../interfaces/barcode'

export class Document {
  doc: PDFKit.PDFDocument
  labelsSoFar: number = 0

  constructor(private design: Design, private layout: Layout) {
    this.doc = new PDFDocument({
      size: this.layout.pagesize,
      margins: {
        top: this.mmToPt(this.layout.marginTop),
        left: this.mmToPt(this.layout.marginLeft),
        bottom: 0,
        right: 0,
      },
    })

    this.doc.lineWidth(0.5)
  }

  public async drawSeries(series: Series) {
    if (this.labelsSoFar >= 512) {
      return
    }
    const labelsPerPage = this.layout.cols * this.layout.rows
    for (let i = 0; i < series.labels.length; i++) {
      if (this.labelsSoFar && this.labelsSoFar % labelsPerPage === 0) {
        this.doc.addPage({
          size: this.layout.pagesize,
          margins: {
            top: this.mmToPt(this.layout.marginTop),
            left: this.mmToPt(this.layout.marginLeft),
            bottom: 0,
            right: 0,
          },
        })
      }
      await this.drawBarcode(series.labels[i], series.tapetype, series.suffix)
      this.labelsSoFar++
    }
  }

  async drawBarcode(labelDef: LabelDef, tapetype: string, suffix: string) {
    const bc = new Label(this.design, tapetype, suffix, labelDef.text)

    const x =
      this.layout.marginLeft +
      labelDef.col * (bc.width + this.layout.spacingCol)
    const y =
      this.layout.marginTop +
      labelDef.row * (bc.height + this.layout.spacingRow)

    await bc.draw(this.doc, x, y)
  }

  public write() {
    this.doc.end()
    return this.doc
  }

  private mmToPt(mm: number): number {
    return (mm / 25.4) * 72
  }
}
