import { Design } from '../interfaces/barcode'

import { toBuffer } from 'bwip-js'

export class Label {
  private colors = [
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

  private x!: number
  private y!: number
  private text!: string

  private textPosition: string
  private textOrientation: string
  private borders: boolean
  private colorized: boolean

  private tapeType!: string
  private suffix!: string

  constructor(design: Design) {
    this.textPosition = design.textPosition
    this.textOrientation = design.textOrientation
    this.borders = design.borders
    this.colorized = design.colorized
  }

  public setTapetype(tapetype: string) {
    this.tapeType = tapetype
  }
  public setSuffix(suffix: string) {
    this.suffix = suffix.slice(0, 2)
  }
  public setOrigin(x: number, y: number) {
    this.x = x
    this.y = y
  }
  public setText(text: string) {
    this.text = text
  }
  public getWidth(): number {
    return this.tapeType === 'DLT' ? 55 : 76.2
  }
  public getHeight(): number {
    return this.tapeType === 'DLT' ? 21 : 15.875
  }

  // // // // // // //

  private getRadius(): number {
    return this.tapeType === 'DLT' ? 0 : 2.5
  }
  private getBarcodeWidth(): number {
    return this.tapeType === 'DLT' ? 47 : 65
  }
  private getBarcodeHeight(): number {
    return this.tapeType === 'DLT' ? 15 : 10.5
  }
  private getPaddingTop(): number {
    return 0
  }
  private getPaddingSide(): number {
    // return this.tapeType === 'DLT' ? 3 : 5
    return Math.round((this.getWidth() - this.getBarcodeWidth()) / 2)
  }

  // Define the "boxes" that the letters and numbers will be printed in
  private getNumberOfBoxes(): number {
    return this.tapeType === 'DLT' ? 6 : 7
  }
  private getBoxWidth(): number {
    return (this.getWidth() - 2 * this.getRadius()) / this.getNumberOfBoxes()
  }
  private getBoxHeight(): number {
    return this.getHeight() - this.getBarcodeHeight() - this.getPaddingTop()
  }
  private getRotationOrigin(x: number, y: number) {
    return {
      origin: [
        this.mmToPt(x + this.getBoxWidth() / 2),
        this.mmToPt(y + this.getBoxHeight() / 2),
      ],
    }
  }

  private getFillColor(char: string) {
    const idx = Number(char)
    if (Number.isInteger(idx)) {
      return this.colors[idx]
    }
  }

  // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //

  public async draw(doc: any) {
    if (this.borders) {
      doc
        .roundedRect(
          this.mmToPt(this.x),
          this.mmToPt(this.y),
          this.mmToPt(this.getWidth()),
          this.mmToPt(this.getHeight()),
          this.mmToPt(this.getRadius()),
        )
        .stroke()
    }

    doc.font('Helvetica-Bold')

    for (let i = 0; i < this.getNumberOfBoxes(); i++) {
      const xBox = this.x + this.getRadius() + this.getBoxWidth() * i
      const yBox =
        this.y +
        (this.textPosition === 'top'
          ? 0
          : this.getHeight() - this.getBoxHeight())

      let box = doc.rect(
        this.mmToPt(xBox),
        this.mmToPt(yBox),
        this.mmToPt(this.getBoxWidth()),
        this.mmToPt(this.getBoxHeight()),
      )
      const color = this.getFillColor(this.text[i])
      if (this.colorized && color) {
        box.fillAndStroke(color, 'black')
      } else {
        box.stroke()
      }

      let txt, offsetTop
      // Tape type goes in the last box. But not for DLT
      if (this.tapeType !== 'DLT' && i + 1 === this.getNumberOfBoxes()) {
        txt = this.suffix
        offsetTop = 1.5
        doc.fontSize(this.mmToPt(this.getBoxHeight() - 2))
      } else {
        txt = this.text[i] || ''
        offsetTop = 1
        if (this.textOrientation === 'vertical') {
          doc.fontSize(this.mmToPt(this.getBoxHeight()))
        } else {
          doc.fontSize(this.mmToPt(this.getBoxHeight() - 1))
        }
      }

      let block
      if (this.textOrientation === 'vertical') {
        block = doc.rotate(-90, this.getRotationOrigin(xBox, yBox))
      } else {
        block = doc
      }

      block
        .fillColor('black')
        .text(txt, this.mmToPt(xBox), this.mmToPt(yBox + offsetTop), {
          width: this.mmToPt(this.getBoxWidth()),
          height: this.mmToPt(this.getBoxHeight() - 2),
          align: 'center',
        })
      if (this.textOrientation === 'vertical') {
        doc.rotate(90, this.getRotationOrigin(xBox, yBox))
      }
    }

    // Finish with the barcode itself
    let barcode = this.text
    if (this.tapeType !== 'DLT') {
      barcode += this.suffix
    }

    // barcode generation uses a callback, so we wrap it in a promise in order to flatten the call structure
    const image = await new Promise((resolve, reject) => {
      toBuffer(
        {
          bcid: 'code39',
          text: barcode,
          height: this.getBarcodeHeight(),
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

    const xBox = this.x + this.getPaddingSide()
    const yBox =
      this.y + (this.textPosition === 'top' ? this.getBoxHeight() : 0)

    doc.image(image, this.mmToPt(xBox), this.mmToPt(yBox), {
      width: this.mmToPt(this.getBarcodeWidth()),
      height: this.mmToPt(this.getBarcodeHeight()),
    })
  }

  private mmToPt(mm: number): number {
    return (mm / 25.4) * 72
  }
}
