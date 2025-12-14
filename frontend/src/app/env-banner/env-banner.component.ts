import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { filter } from 'rxjs'
import { AppSettingsService } from '../app-settings.service'
import { AsyncPipe } from '@angular/common'

@Component({
  selector: 'app-env-banner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe],
  template: `
    @if (nodeEnv$ | async; as nodeEnv) {
      <div
        class="text-uppercase border border-dark py-2 bg-warning opacity-75 text-center w-100 fw-bold fs-2 px-3 shadow"
      >
        {{ nodeEnv }}
      </div>
    }
  `,
  styles: [
    `
      :host {
        overflow: hidden;
        position: fixed;
        width: 25rem;
        height: 25rem;
        top: 0;
        right: 0;
        z-index: 2000;
        pointer-events: none;

        div {
          transform: translateX(30%) translateY(-100%) rotate(45deg);
          transform-origin: bottom left;
        }
      }
    `,
  ],
})
export class EnvBannerComponent {
  #appSettingsService = inject(AppSettingsService)

  nodeEnv$ = this.#appSettingsService
    .getNodeEnv()
    .pipe(filter((nodeEnv) => nodeEnv !== 'production'))
}
