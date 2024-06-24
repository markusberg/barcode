import { ComponentFixture, TestBed } from '@angular/core/testing'

import { BarcodeDesignComponent } from './barcode-design.component'
import { GeneratorService } from '../generator.service'
import { HttpClientTestingModule } from '@angular/common/http/testing'

describe('BarcodeDesignComponent', () => {
  let component: BarcodeDesignComponent
  let fixture: ComponentFixture<BarcodeDesignComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BarcodeDesignComponent, HttpClientTestingModule],
      providers: [GeneratorService],
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
