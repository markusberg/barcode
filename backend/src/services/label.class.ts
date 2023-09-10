import { Design } from '../interfaces/barcode'

// FIXME: esm is causing problems :-/
const bwipJs = require('bwip-js')

export class Label {
  private colors: [number, number, number][] = [
    [182, 40, 42],
    [252, 227, 75],
    [149, 196, 83],
    [1, 165, 226],
    [160, 167, 181],
    [216, 125, 54],
    [226, 121, 152],
    [102, 166, 69],
    [245, 182, 84],
    [113, 88, 128],
  ]

  constructor(
    private design: Design,
    private tapeType: string,
    private suffix: string,
    private text: string,
  ) {
    this.width = this.tapeType === 'DLT' ? 55 : 76.2
    this.height = this.tapeType === 'DLT' ? 21 : 15.875
    this.radius = this.tapeType === 'DLT' ? 0 : 2.5
    this.barcodeWidth = this.tapeType === 'DLT' ? 47 : 65
    this.barcodeHeight = this.tapeType === 'DLT' ? 15 : 10.5
    this.paddingSide = Math.round((this.width - this.barcodeWidth) / 2)

    this.numberOfBoxes = this.tapeType === 'DLT' ? 6 : 7
    this.boxWidth = (this.width - 2 * this.radius) / this.numberOfBoxes
    this.boxHeight = this.height - this.barcodeHeight - this.paddingTop
  }

  width: number
  height: number
  radius: number
  barcodeWidth: number
  barcodeHeight: number
  paddingTop: number = 0
  paddingSide: number

  // Define the "boxes" that the letters and numbers will be printed in
  numberOfBoxes: number
  boxWidth: number
  boxHeight: number

  private getRotationOrigin(
    x: number,
    y: number,
  ): { origin: [number, number] } {
    return {
      origin: [
        this.mmToPt(x + this.boxWidth / 2),
        this.mmToPt(y + this.boxHeight / 2),
      ],
    }
  }

  private getFillColor(char: string): [number, number, number] | null {
    const idx = parseInt(char)
    return isNaN(idx) ? null : this.colors[idx]
  }

  // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //

  /**
   * Draw the label on the provided pdf document at the specified coordinates
   * @param doc
   * @param x
   * @param y
   */
  public async draw(doc: PDFKit.PDFDocument, x: number, y: number) {
    if (this.design.borders) {
      doc
        .roundedRect(
          this.mmToPt(x),
          this.mmToPt(y),
          this.mmToPt(this.width),
          this.mmToPt(this.height),
          this.mmToPt(this.radius),
        )
        .stroke()
    }

    doc.font('Helvetica-Bold')

    for (let i = 0; i < this.numberOfBoxes; i++) {
      const xBox = x + this.radius + this.boxWidth * i
      const yBox =
        y +
        (this.design.textPosition === 'top' ? 0 : this.height - this.boxHeight)

      let box = doc.rect(
        this.mmToPt(xBox),
        this.mmToPt(yBox),
        this.mmToPt(this.boxWidth),
        this.mmToPt(this.boxHeight),
      )
      const color = this.getFillColor(this.text[i])
      if (this.design.colorized && color) {
        box.fillAndStroke(color, 'black')
      } else {
        box.stroke()
      }

      let txt, offsetTop
      // Tape type goes in the last box. But not for DLT
      if (this.tapeType !== 'DLT' && i + 1 === this.numberOfBoxes) {
        txt = this.suffix
        offsetTop = 1.5
        doc.fontSize(this.mmToPt(this.boxHeight - 2))
      } else {
        txt = this.text[i] || ''
        offsetTop = 1
        if (this.design.textOrientation === 'vertical') {
          doc.fontSize(this.mmToPt(this.boxHeight))
        } else {
          doc.fontSize(this.mmToPt(this.boxHeight - 1))
        }
      }

      const block =
        this.design.textOrientation === 'vertical'
          ? doc.rotate(-90, this.getRotationOrigin(xBox, yBox))
          : doc

      block
        .fillColor('black')
        .text(txt, this.mmToPt(xBox), this.mmToPt(yBox + offsetTop), {
          width: this.mmToPt(this.boxWidth),
          height: this.mmToPt(this.boxHeight - 2),
          align: 'center',
        })
      if (this.design.textOrientation === 'vertical') {
        doc.rotate(90, this.getRotationOrigin(xBox, yBox))
      }
    }

    // Finish with the barcode itself
    const barcode = this.text + (this.tapeType === 'DLT' ? '' : this.suffix)

    // barcode generation uses a callback, so we wrap it in a promise in order to flatten the call structure
    const image = await new Promise((resolve, reject) => {
      bwipJs.toBuffer(
        {
          bcid: 'code39',
          text: barcode,
          height: this.barcodeHeight,
          includetext: false,
        },
        (err: any, png: any) => {
          if (err) {
            reject(err)
          } else {
            resolve(png)
          }
        },
      )
    })

    const xBox = x + this.paddingSide
    const yBox = y + (this.design.textPosition === 'top' ? this.boxHeight : 0)

    doc.image(image, this.mmToPt(xBox), this.mmToPt(yBox), {
      width: this.mmToPt(this.barcodeWidth),
      height: this.mmToPt(this.barcodeHeight),
    })
  }

  private mmToPt(mm: number): number {
    return (mm / 25.4) * 72
  }
}
