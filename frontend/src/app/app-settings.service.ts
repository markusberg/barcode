import { inject, Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { NodeEnv } from '@interfaces/node-env'
import { HttpClient } from '@angular/common/http'

@Injectable({ providedIn: 'root' })
export class AppSettingsService {
  httpClient = inject(HttpClient)
  url = 'api/app-settings'

  getNodeEnv(): Observable<NodeEnv> {
    const url = `${this.url}/node-env`
    return this.httpClient.get<NodeEnv>(url)
  }
}
