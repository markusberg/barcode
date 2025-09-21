import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms'

import {
  Barcode,
  Design,
  Label,
  Layout,
} from '../../../backend/dist/interfaces/barcode.js'
import { Observable } from 'rxjs'

type Formify<T> = FormGroup<{ [key in keyof T]: FormControl<T[key]> }>

export type frmDesign = Formify<Design>
export type frmLabel = Formify<Label>
export type frmLayout = Formify<Layout>

@Injectable({ providedIn: 'root' })
export class GeneratorService {
  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClient,
  ) {}
  url = `api/generator`

  generatePdf(barcode: Barcode): Observable<Blob> {
    return this.httpClient.post(this.url, barcode, {
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

  getDesignForm(): frmDesign {
    return this.fb.nonNullable.group({
      borders: this.defaultDesign.borders,
      colorized: this.defaultDesign.colorized,
      textOrientation: this.defaultDesign.textOrientation,
      textPosition: this.defaultDesign.textPosition,
    })
  }

  getLabelsArrayForm(): FormArray<frmLabel> {
    return this.fb.array([this.buildLabel(this.defaultLabel)])
  }

  getLayoutForm(tapetype: 'DLT' | 'LTO'): frmLayout {
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

  buildLabel(label: Label): frmLabel {
    return this.fb.nonNullable.group({
      tapetype: [label.tapetype, [Validators.required]],
      prefix: [label.prefix, [Validators.required]],
      startno: [label.startno, [Validators.required]],
      suffix: [label.suffix, [Validators.required]],
      fillpage: label.fillpage,
      num: [
        label.num,
        [Validators.min(1), Validators.max(999), this.positiveIntValidator()],
      ],
    })
  }

  positiveIntValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const parsed = parseInt(control.value)

      if (parsed === control.value) {
        return null
      }
      return { invalidInt: true }
    }
  }
}
