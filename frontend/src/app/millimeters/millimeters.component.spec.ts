import { ComponentFixture, TestBed } from '@angular/core/testing'

import { MillimetersComponent } from './millimeters.component'

describe('MillimetersComponent', () => {
  let component: MillimetersComponent
  let fixture: ComponentFixture<MillimetersComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MillimetersComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(MillimetersComponent)
    component = fixture.componentInstance
    await fixture.whenStable()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
