import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { MenubarComponent } from './menubar/menubar.component'
import { EnvBannerComponent } from './env-banner/env-banner.component'

@Component({
  selector: 'app-root',
  template: `<app-menubar /><app-env-banner />
    <div class="flex-grow-1 overflow-auto py-3">
      <router-outlet />
    </div>`,
  standalone: true,
  imports: [EnvBannerComponent, MenubarComponent, RouterModule],
})
export class AppComponent {
  title = 'frontend'
}
