import { ComponentFixture, TestBed } from '@angular/core/testing'

import { BarcodeLayoutComponent } from './barcode-layout.component'
import { GeneratorService } from '../generator.service'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'

describe('BarcodeLayoutComponent', () => {
  let component: BarcodeLayoutComponent
  let fixture: ComponentFixture<BarcodeLayoutComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BarcodeLayoutComponent],
      providers: [
        GeneratorService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    })

    const generatorService = TestBed.inject(GeneratorService)
    const form = generatorService.getLayoutForm('LTO')

    fixture = TestBed.createComponent(BarcodeLayoutComponent)
    fixture.componentRef.setInput('form', form)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
