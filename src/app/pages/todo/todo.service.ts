import { Task } from './../../shared/task/task.model';
import { BeyondService } from '@getbeyond/ng-beyond-js';
import { mergeMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { Injectable, NgZone } from '@angular/core';

@Injectable()
export class TodoService {
  private resource: any;

  constructor(
    private beyondService: BeyondService
  ) {
    this.resource = this.beyondService.api.resource('bynddev_tasks');
  }

  getTasks(): Observable<any> {
    return this.resource.find()
      .pipe(
        mergeMap((response) => {
          return of(response['results']);
        })
      );
  }

  saveTask(task: Task) {
    this.resource.save(task);
  }
}
