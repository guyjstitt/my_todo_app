import { Permission } from './../../shared/models/permission.model';
import { mergeMap } from 'rxjs/operators';
import { UserService } from './../../shared/services/user/user.service';
import { TaskService } from './../../shared/services/task/task.service';
import { BeyondService } from '@getbeyond/ng-beyond-js';
import { BehaviorSubject, forkJoin, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
  private resource: any;
  public userInfo: any;
  public accountInfo: any;

  private defaultPermissions: Permission = {
    default: false,
    todo_admin: false
  };

  private permissions: Permission = {};

  constructor(
    private beyondService: BeyondService
  ) {
    this.resource = this.beyondService.api.resource('bynddev_tasks');
  }

  getPermissions() {
    if (Object.keys(this.permissions).length) {

      return this.permissions;
    }

    let isAdmin = false;

    return forkJoin([
      this.beyondService.account.getInfo(),
      this.beyondService.user.getInfo()
    ]).pipe(
      mergeMap((response) => {
        if (response[0]) {
          this.accountInfo = response[0];
        }

        if (response[1]) {
          this.userInfo = response[1];
        }

        isAdmin = this.accountInfo['is_admin'];

        const permissionCheck = [];
        const permissionKeys = Object.keys(this.defaultPermissions);

        for (let i = 0; i < permissionKeys.length; i++) {
          permissionCheck.push(this.beyondService.app.hasPermission(this.defaultPermissions[i]));
        }

        return forkJoin(permissionCheck);
      }),
      mergeMap((permissions) => {
        const keys = Object.keys(this.defaultPermissions);

        this.permissions['is_admin'] = isAdmin;

        for (let i = 0; i < keys.length; i++) {
          this.permissions[keys[i]] = permissions[i];
        }

        return of(this.permissions);
      })
    );
  }
}
