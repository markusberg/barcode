import { ComponentFixture, TestBed } from '@angular/core/testing'

import { BarcodeDesignComponent } from './barcode-design.component'
import { GeneratorService } from '../generator.service'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'
import { FormGroup, FormGroupDirective } from '@angular/forms'

describe('BarcodeDesignComponent', () => {
  let component: BarcodeDesignComponent
  let fixture: ComponentFixture<BarcodeDesignComponent>

  beforeEach(() => {
    const formGroupDirective = new FormGroupDirective([], [])

    TestBed.configureTestingModule({
      imports: [BarcodeDesignComponent],
      providers: [
        GeneratorService,
        { provide: FormGroupDirective, useValue: formGroupDirective },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    })

    const generatorService = TestBed.inject(GeneratorService)
    const design = generatorService.getDesignForm()
    formGroupDirective.form = new FormGroup({ design })

    fixture = TestBed.createComponent(BarcodeDesignComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
