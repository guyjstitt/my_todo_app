import { Task } from './../../models/task.model';
import { mergeMap } from 'rxjs/operators';
import { BeyondService } from '@getbeyond/ng-beyond-js';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import * as moment from 'moment';

@Injectable()
export class TaskService {
  private resource: any;

  constructor(
    private beyondService: BeyondService
  ) {
    this.resource = this.beyondService.api.resource('bynddev_tasks');
  }

  load(findParams: object | number = null, otherParams: object = null): Observable<any> {
    return this.resource.find(findParams, otherParams)
      .pipe(
        mergeMap((response) => {

          return of ((response['id'] && response) || response['results'] || []);
        })
      );
  }

  save(task: Task) {
    return this.resource.save(this.forDB(task));
  }

  delete(findParams: object | number | Task = null): Observable<any> {
    if (findParams instanceof Task) {
      findParams = findParams.id;
    }

    return this.resource.remove(findParams);
  }

  public forDB(payload: Task): object {
    const dbObject: Task = {
      description: payload.description,
      is_complete: payload.is_complete,
      assigned_user_id: payload.assigned_user_id,
      due_date: moment(payload.due_date).format('YYYY-MM-DD'),
      location_id: 1
    };

    if (payload.id) {
      dbObject.id = payload.id;
    }

    // before sending to database, we need to replace user object data back with the user id
    if (moment.isDate(payload.due_date)) {
      payload.due_date = moment(payload.due_date).format('YYYY-MM-DD');
    }

    return dbObject;
  }
}
