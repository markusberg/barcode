import { ComponentFixture, TestBed } from '@angular/core/testing'

import { BarcodeLabelsComponent } from './barcode-labels.component'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { GeneratorService } from '../generator.service'
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'
import { FormGroup, FormGroupDirective } from '@angular/forms'

describe('BarcodeLabelsComponent', () => {
  let component: BarcodeLabelsComponent
  let fixture: ComponentFixture<BarcodeLabelsComponent>

  beforeEach(() => {
    const formGroupDirective = new FormGroupDirective([], [])

    TestBed.configureTestingModule({
      imports: [BarcodeLabelsComponent],
      providers: [
        GeneratorService,
        { provide: FormGroupDirective, useValue: formGroupDirective },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    })

    const generatorService = TestBed.inject(GeneratorService)
    const labels = generatorService.getLabelsArrayForm()
    formGroupDirective.form = new FormGroup({ labels })

    fixture = TestBed.createComponent(BarcodeLabelsComponent)

    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
