import { ComponentFixture, TestBed } from '@angular/core/testing'

import { BarcodeLabelsComponent } from './barcode-labels.component'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { GeneratorService } from '../generator.service'

describe('BarcodeLabelsComponent', () => {
  let component: BarcodeLabelsComponent
  let fixture: ComponentFixture<BarcodeLabelsComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BarcodeLabelsComponent, HttpClientTestingModule],
      providers: [GeneratorService],
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
