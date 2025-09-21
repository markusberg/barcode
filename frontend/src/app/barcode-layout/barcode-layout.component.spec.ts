import { ComponentFixture, TestBed } from '@angular/core/testing'

import { BarcodeLayoutComponent } from './barcode-layout.component'
import { GeneratorService } from '../generator.service'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'
import { FormGroup, FormGroupDirective } from '@angular/forms'

describe('BarcodeLayoutComponent', () => {
  let component: BarcodeLayoutComponent
  let fixture: ComponentFixture<BarcodeLayoutComponent>

  beforeEach(() => {
    const formGroupDirective = new FormGroupDirective([], [])

    TestBed.configureTestingModule({
      imports: [BarcodeLayoutComponent],
      providers: [
        GeneratorService,
        { provide: FormGroupDirective, useValue: formGroupDirective },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    })

    const generatorService = TestBed.inject(GeneratorService)
    const layout = generatorService.getLayoutForm('LTO')
    formGroupDirective.form = new FormGroup({ layout })

    fixture = TestBed.createComponent(BarcodeLayoutComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
