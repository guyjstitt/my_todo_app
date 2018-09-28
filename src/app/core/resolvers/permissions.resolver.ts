import { Injectable } from '@angular/core';

import { Resolve } from '@angular/router';
import { PermissionsService } from '../services/permissions.service';

@Injectable({
  providedIn: 'root',
})
export class PermissionsResolver implements Resolve<any> {
  constructor(
    private permissionsService: PermissionsService
  ) {}

  resolve() {
    return this.permissionsService.getPermissions();
  }
}
