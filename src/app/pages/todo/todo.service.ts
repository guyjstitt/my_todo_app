import { BeyondService } from '@getbeyond/ng-beyond-js';
import { mergeMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { Injectable, NgZone } from '@angular/core';
import { TaskService } from '../../shared/services/task/task.service';
import { Task } from '../../shared/models/task.model';
import { User } from '../../shared/models/user.model';
import { UserService } from '../../shared/services/user/user.service';
import * as moment from 'moment';

@Injectable()
export class TodoService {
  private resource: any;

  constructor(
    private beyondService: BeyondService,
    private taskService: TaskService,
    private userService: UserService
  ) {
    this.resource = this.beyondService.api.resource('bynddev_tasks');
  }
}
