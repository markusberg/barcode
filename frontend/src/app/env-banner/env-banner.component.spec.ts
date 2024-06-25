import { ComponentFixture, TestBed } from '@angular/core/testing'

import { EnvBannerComponent } from './env-banner.component'
import { provideHttpClientTesting } from '@angular/common/http/testing'
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'

describe('EnvBannerComponent', () => {
  let component: EnvBannerComponent
  let fixture: ComponentFixture<EnvBannerComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EnvBannerComponent],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    })
    fixture = TestBed.createComponent(EnvBannerComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
