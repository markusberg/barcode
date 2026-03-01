import BwipJs from 'bwip-js'

import type { Design } from '../interfaces/barcode.js'

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

  design: Design
  tapeType: string
  suffix: string
  text: string

  constructor(design: Design, tapeType: string, suffix: string, text: string) {
    this.design = design
    this.tapeType = tapeType
    this.suffix = suffix
    this.text = text

    this.width = this.tapeType === 'DLT' ? 156 : 216
    this.height = this.tapeType === 'DLT' ? 59.5 : 45
    this.radius = this.tapeType === 'DLT' ? 0 : 7
    this.barcodeWidth = this.tapeType === 'DLT' ? 133 : 184
    this.barcodeHeight = this.tapeType === 'DLT' ? 42.5 : 30
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

  #getRotationOrigin(x: number, y: number): { origin: [number, number] } {
    return {
      origin: [x + this.boxWidth / 2, y + this.boxHeight / 2],
    }
  }

  #getFillColor(char: string): [number, number, number] | null {
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
  public async draw(
    doc: PDFKit.PDFDocument,
    x: number,
    y: number,
  ): Promise<void> {
    if (this.design.borders) {
      doc.roundedRect(x, y, this.width, this.height, this.radius).stroke()
    }

    doc.font('Helvetica-Bold')

    for (let i = 0; i < this.numberOfBoxes; i++) {
      const xBox = x + this.radius + this.boxWidth * i
      const yBox =
        y +
        (this.design.textPosition === 'top' ? 0 : this.height - this.boxHeight)

      let box = doc.rect(xBox, yBox, this.boxWidth, this.boxHeight)
      const color = this.#getFillColor(this.text[i])
      if (this.design.colorized && color) {
        box.fillAndStroke(color, 'black')
      } else {
        box.stroke()
      }

      let txt, offsetTop
      // Tape type goes in the last box. But not for DLT
      if (this.tapeType !== 'DLT' && i + 1 === this.numberOfBoxes) {
        txt = this.suffix
        offsetTop = 4.5
        doc.fontSize(this.boxHeight - 6)
      } else {
        txt = this.text[i] || ''
        offsetTop = 3
        if (this.design.textOrientation === 'vertical') {
          doc.fontSize(this.boxHeight)
        } else {
          doc.fontSize(this.boxHeight - 3)
        }
      }

      const block =
        this.design.textOrientation === 'vertical'
          ? doc.rotate(-90, this.#getRotationOrigin(xBox, yBox))
          : doc

      block.fillColor('black').text(txt, xBox, yBox + offsetTop, {
        width: this.boxWidth,
        height: this.boxHeight - 6,
        align: 'center',
      })
      if (this.design.textOrientation === 'vertical') {
        doc.rotate(90, this.#getRotationOrigin(xBox, yBox))
      }
    }

    // Finish with the barcode itself
    const barcode = this.text + (this.tapeType === 'DLT' ? '' : this.suffix)

    // barcode generation uses a callback, so we wrap it in a promise in order to flatten the call structure
    const image: Buffer = await new Promise((resolve, reject) => {
      BwipJs.toBuffer(
        {
          bcid: 'code39',
          text: barcode,
          height: this.barcodeHeight,
          includetext: false,
        },
        (err: string | Error, png: Buffer) => {
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

    doc.image(image, xBox, yBox, {
      width: this.barcodeWidth,
      height: this.barcodeHeight,
    })
  }
}
