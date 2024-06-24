import { ComponentFixture, TestBed } from '@angular/core/testing'

import { BarcodeLayoutComponent } from './barcode-layout.component'
import { GeneratorService } from '../generator.service'
import { HttpClientTestingModule } from '@angular/common/http/testing'

describe('BarcodeLayoutComponent', () => {
  let component: BarcodeLayoutComponent
  let fixture: ComponentFixture<BarcodeLayoutComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BarcodeLayoutComponent, HttpClientTestingModule],
      providers: [GeneratorService],
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
