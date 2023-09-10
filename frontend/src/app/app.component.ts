import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { MenubarComponent } from './menubar/menubar.component'

@Component({
  selector: 'app-root',
  template: `
    <app-menubar class="sticky-top"></app-menubar>
    <router-outlet></router-outlet>
  `,
  standalone: true,
  imports: [CommonModule, MenubarComponent, RouterModule],
})
export class AppComponent {
  title = 'frontend'
}
