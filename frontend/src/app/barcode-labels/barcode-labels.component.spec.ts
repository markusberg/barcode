import { ComponentFixture, TestBed } from '@angular/core/testing'

import { BarcodeLabelsComponent } from './barcode-labels.component'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { GeneratorService } from '../generator.service'
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'

describe('BarcodeLabelsComponent', () => {
  let component: BarcodeLabelsComponent
  let fixture: ComponentFixture<BarcodeLabelsComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BarcodeLabelsComponent],
      providers: [
        GeneratorService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    })

    const generatorService = TestBed.inject(GeneratorService)
    const form = generatorService.getLabelsArrayForm()

    fixture = TestBed.createComponent(BarcodeLabelsComponent)
    fixture.componentRef.setInput('form', form)

    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
