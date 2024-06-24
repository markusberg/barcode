import { Component, OnDestroy, signal } from '@angular/core'
import { AsyncPipe, JsonPipe, NgClass } from '@angular/common'
import { FormBuilder } from '@angular/forms'
import { DomSanitizer, SafeUrl } from '@angular/platform-browser'
import {
  ReplaySubject,
  Observable,
  map,
  catchError,
  EMPTY,
  tap,
  switchMap,
  filter,
} from 'rxjs'
import { GeneratorService } from '../generator.service'
import { BarcodeLabelsComponent } from '../barcode-labels/barcode-labels.component'
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap'
import { BarcodeDesignComponent } from '../barcode-design/barcode-design.component'
import { BarcodeLayoutComponent } from '../barcode-layout/barcode-layout.component'

@Component({
  selector: 'app-barcode',
  standalone: true,
  imports: [
    AsyncPipe,
    BarcodeDesignComponent,
    BarcodeLabelsComponent,
    BarcodeLayoutComponent,
    JsonPipe,
    NgbNavModule,
    NgClass,
  ],
  templateUrl: './barcode.component.html',
  styleUrls: ['./barcode.component.scss'],
})
export class BarcodeComponent implements OnDestroy {
  isLoading = signal<boolean>(false)
  error = signal<any>(null)
  errorExpanded = signal<boolean>(false)

  form = this.formBuilder.group({
    design: this.generatorService.getDesignForm(),
    labels: this.generatorService.getLabelsArrayForm(),
    layout: this.generatorService.getLayoutForm('LTO'),
  })

  toggleError() {
    this.errorExpanded.update((val) => !val)
  }

  pdfUrl = signal<string | null>(null)

  constructor(
    private generatorService: GeneratorService,
    private domSanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
  ) {}

  ngOnDestroy(): void {
    this.revokePdfUrl()
  }

  revokePdfUrl() {
    const url = this.pdfUrl()
    if (url) {
      URL.revokeObjectURL(url)
      this.pdfUrl.set(null)
    }
  }

  generate$ = new ReplaySubject<boolean>()

  pdf$: Observable<SafeUrl> = this.generate$.pipe(
    filter(() => this.form.valid),
    tap(() => {
      this.revokePdfUrl()
      this.error.set(null)
      this.isLoading.set(true)
    }),
    map(() => this.form.getRawValue()),
    switchMap((value) =>
      this.generatorService.generatePdf(value).pipe(
        map((blob) => URL.createObjectURL(blob)),
        tap((url) => this.pdfUrl.set(url)),
        map((url) => this.domSanitizer.bypassSecurityTrustResourceUrl(url)),
        catchError((err) => {
          this.isLoading.set(false)
          this.error.set(err)
          return EMPTY
        }),
        tap(() => this.isLoading.set(false)),
      ),
    ),
  )

  setPageLayout(tapetype: 'LTO' | 'DLT' = 'LTO'): void {
    const layout = this.generatorService.defaultLayout[tapetype]
    this.form.get('layout')?.setValue(layout)
  }
}
