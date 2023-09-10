import { ComponentFixture, TestBed } from '@angular/core/testing'

import { MenubarComponent } from './menubar.component'
import { RouterTestingModule } from '@angular/router/testing'

describe('MenubarComponent', () => {
  let component: MenubarComponent
  let fixture: ComponentFixture<MenubarComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MenubarComponent, RouterTestingModule],
    })
    fixture = TestBed.createComponent(MenubarComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
