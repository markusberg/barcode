import { ComponentFixture, TestBed } from '@angular/core/testing'

import { EnvBannerComponent } from './env-banner.component'
import { HttpClientTestingModule } from '@angular/common/http/testing'

describe('EnvBannerComponent', () => {
  let component: EnvBannerComponent
  let fixture: ComponentFixture<EnvBannerComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EnvBannerComponent, HttpClientTestingModule],
    })
    fixture = TestBed.createComponent(EnvBannerComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
