import { Component, OnDestroy, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormBuilder } from '@angular/forms'
import { DomSanitizer, SafeUrl } from '@angular/platform-browser'
import { ReplaySubject, Observable, map, catchError, EMPTY, tap } from 'rxjs'
import { GeneratorService } from '../generator.service'
import { BarcodeLabelsComponent } from '../barcode-labels/barcode-labels.component'
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap'
import { BarcodeDesignComponent } from '../barcode-design/barcode-design.component'
import { BarcodeLayoutComponent } from '../barcode-layout/barcode-layout.component'

@Component({
  selector: 'app-barcode',
  standalone: true,
  imports: [
    CommonModule,
    BarcodeDesignComponent,
    BarcodeLabelsComponent,
    BarcodeLayoutComponent,
    NgbNavModule,
  ],
  templateUrl: './barcode.component.html',
  styleUrls: ['./barcode.component.scss'],
})
export class BarcodeComponent implements OnInit, OnDestroy {
  isLoading: boolean = false
  error$: ReplaySubject<any> = new ReplaySubject()
  errorExpanded = false

  form = this.formBuilder.group({
    design: this.generatorService.getDesignForm(),
    labels: this.generatorService.getLabelsArrayForm(),
    layout: this.generatorService.getLayoutForm('LTO'),
  })

  pdfUrl: string = ''

  constructor(
    private generatorService: GeneratorService,
    private domSanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {}
  ngOnDestroy(): void {
    this.revokePdfUrl()
  }

  revokePdfUrl() {
    if (this.pdfUrl) {
      URL.revokeObjectURL(this.pdfUrl)
      this.pdfUrl = ''
    }
  }

  pdf$: Observable<SafeUrl> | null = null

  generatePdf() {
    this.revokePdfUrl()
    this.error$.next(null)
    this.isLoading = true

    if (this.form.invalid) {
      return
    }
    this.pdf$ = this.generatorService
      .generatePdf(this.form.getRawValue() as any)
      .pipe(
        map((blob) => {
          this.pdfUrl = URL.createObjectURL(blob)
          return this.domSanitizer.bypassSecurityTrustResourceUrl(this.pdfUrl)
        }),
        catchError((err) => {
          this.isLoading = false
          this.error$.next(err)
          return EMPTY
        }),
        tap(() => (this.isLoading = false)),
      )
  }

  setPageLayout(tapetype: 'LTO' | 'DLT' = 'LTO'): void {
    const layout = this.generatorService.defaultLayout[tapetype]
    this.form.get('layout')?.setValue(layout)
  }
}
