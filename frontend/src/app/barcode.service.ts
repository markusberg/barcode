import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  UntypedFormControl,
  Validators,
} from '@angular/forms'

import { Barcode, Design, Label, Layout } from '@interfaces/barcode'
import { Observable } from 'rxjs'

type Formify<T> = FormGroup<{ [key in keyof T]: FormControl<T[key]> }>

export type IDesignForm = Formify<Design>
export type ILabelForm = Formify<Label>
export type ILayoutForm = Formify<Layout>

@Injectable({ providedIn: 'root' })
export class BarcodeService {
  constructor(private fb: FormBuilder, private httpClient: HttpClient) {}

  generatePdf(barcode: Barcode): Observable<Blob> {
    const url = `api/barcodes/`
    return this.httpClient.post(url, barcode, {
      responseType: 'blob',
    })
  }

  defaultLabel: Label = {
    tapetype: 'L8',
    prefix: 'ZF',
    startno: '0001',
    suffix: 'L8',
    fillpage: true,
    num: 1,
  }

  defaultDesign: Design = {
    borders: true,
    colorized: true,
    textOrientation: 'horizontal',
    textPosition: 'top',
  }

  defaultLayout: { [key: string]: Layout } = {
    LTO: {
      pagesize: 'a4',
      cols: 2,
      rows: 16,
      marginLeft: 18.5,
      marginTop: 22,
      spacingCol: 20.5,
      spacingRow: 0,
    },

    DLT: {
      pagesize: 'a4',
      cols: 3,
      rows: 13,
      marginLeft: 15,
      marginTop: 15,
      spacingCol: 0,
      spacingRow: 0,
    },
  }

  getDesignForm(): IDesignForm {
    return this.fb.nonNullable.group({
      borders: this.defaultDesign.borders,
      colorized: this.defaultDesign.colorized,
      textOrientation: this.defaultDesign.textOrientation,
      textPosition: this.defaultDesign.textPosition,
    })
  }

  getLabelsArrayForm(): FormArray<ILabelForm> {
    return this.fb.array([this.buildLabel(this.defaultLabel)])
  }

  getLayoutForm(tapetype: string): ILayoutForm {
    const layout = this.defaultLayout[tapetype]
    return this.fb.nonNullable.group({
      pagesize: [layout.pagesize],
      marginLeft: [layout.marginLeft, Validators.min(0)],
      marginTop: [layout.marginTop, Validators.min(0)],
      cols: [layout.cols, Validators.min(1)],
      rows: [layout.rows, Validators.min(1)],
      spacingCol: [layout.spacingCol, Validators.min(0)],
      spacingRow: [layout.spacingRow, Validators.min(0)],
    })
  }

  buildLabel(label: Label): ILabelForm {
    return this.fb.nonNullable.group({
      tapetype: [label.tapetype, [Validators.required]],
      prefix: [label.prefix, [Validators.required]],
      startno: [label.startno, [Validators.required]],
      suffix: new UntypedFormControl(
        { value: label.suffix, disabled: label.tapetype !== 'custom' },
        [Validators.required],
      ),

      fillpage: label.fillpage,
      num: label.num,
    })
  }
}
