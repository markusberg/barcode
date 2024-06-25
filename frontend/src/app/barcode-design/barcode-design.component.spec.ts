import { ComponentFixture, TestBed } from '@angular/core/testing'

import { BarcodeDesignComponent } from './barcode-design.component'
import { GeneratorService } from '../generator.service'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'

describe('BarcodeDesignComponent', () => {
  let component: BarcodeDesignComponent
  let fixture: ComponentFixture<BarcodeDesignComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BarcodeDesignComponent],
      providers: [
        GeneratorService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    })

    const generatorService = TestBed.inject(GeneratorService)
    const form = generatorService.getDesignForm()

    fixture = TestBed.createComponent(BarcodeDesignComponent)
    fixture.componentRef.setInput('form', form)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
