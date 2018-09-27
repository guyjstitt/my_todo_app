import * as _ from 'lodash';
import * as moment from 'moment';
import { catchError, finalize, mergeMap } from 'rxjs/operators';
import { ChangeDetectorRef, Component, ErrorHandler, OnInit, ViewChild, NgZone } from '@angular/core';
import { DialogService } from '@getbeyond/ng-beyond-js';
import { empty, of } from 'rxjs';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../../../shared/models/user.model';
import { Task } from '../../../shared/models/task.model';
import { TaskService } from '../../../shared/services/task/task.service';
import { UserService } from '../../../shared/services/user/user.service';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.scss']
})
export class TodoEditComponent implements OnInit {
  public accountUsers: Array<User> = [];
  public blockers: {[k: string]: boolean} = {
    api_processing: false,
    initializing: true
  };
  public currentDate: Date = moment().toDate();
  public editedTask: Task = null;
  public info: {[k: string]: string} = {
    message: null,
    type: 'info'
  };
  public title = '';
  public taskId: any;

  public formGroup: FormGroup;

  constructor(
    private dialog: DialogService,
    private errorHandler: ErrorHandler,
    private route: ActivatedRoute,
    private router: Router,
    private tasksService: TaskService,
    private usersService: UserService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.taskId = params['taskId'] ? params['taskId'] : null;

      this.title = this.taskId !== 'new' ? 'Edit Task' : 'Add Task';
    });

    this.formGroup = Task.asFormGroup({});

    this.usersService.load(null, {fields: 'id,first_name,last_name', sort: 'first_name,last_name'})
      .pipe(
        mergeMap((accountUsers: User[]) => {
          this.accountUsers = accountUsers;

          if (this.taskId !== 'new') {

            return this.tasksService.load(parseInt(this.taskId, 10));
          }

          return of(new Task({ description: null, assigned_user_id: null}));
        }),
        catchError((error: any) => {
          this.handleError(error);
          return empty();
        })
      ).subscribe((task: Task) => {

        this.editedTask = task;

        if (this.editedTask) {
          this.formGroup.patchValue(this.editedTask);
        }

        this.blockers.initializing = false;
        return;
      });
  }

  actionClose(): void {
    this.router.navigate(['todo']);
  }

  actionConfirmDeleteTask(): void {
    const dialog = this.dialog.openWithData({
      title: 'Confirm delete',
      text: `Are you sure you want to delete this task?`,
      ok_label: 'Confirm delete'
    });

    dialog.afterClosed()
      .subscribe((save: boolean) => {
        if (save) {
          this.deleteTask();
        }
      });
  }

  actionConfirmSaveTask(): void {
    const dialog =  this.dialog.openWithData({
      title: 'Confirm save',
      text: `Are you sure you want to ${ this.editedTask.id ? 'update this' : 'create a new' } task?`,
      ok_label: 'Save'
    });

    dialog.afterClosed()
      .subscribe((save: boolean) => {
        if (save) {
          this.saveTask();
        }
      });
  }

  // refactor to pipe
  // TODO access form value
  disableSaveButton(): boolean {

    return this.blockers.api_processing ||
      this.formGroup.invalid ||
      this.formGroup.invalid;
  }

  private deleteTask(): void {
    this.blockers.api_processing = true;

    this.tasksService.delete(this.editedTask)
      .pipe(
        catchError((error: any) => {
          this.handleError(error);
          return empty();
        }),
        finalize(() => {
          this.blockers.api_processing = false;
        })
      )
      .subscribe(() => {
        this.actionClose();
        return;
      });

  }

  private handleError(error: any = null, autoHide: boolean = false): void {
    let message = 'There was an error, please check console log for more details.'; // default message

    if (_.isString(error)) {
      message = `There was an error: ${error}`;
    } else if (_.isObject(error) && _.has(error, 'message')) {
      message = error.message;
    }

    this.errorHandler.handleError(error);
    this.showInfo({
      message: message,
      type: 'alert'
    });

    if (autoHide) {

      setTimeout(
        () => {
          this.showInfo(); // will hide message when called with no params
          return;
        },
        3000
      );
    }
  }

  private saveTask(): void {
    this.blockers.api_processing = true;

    const task = this.formGroup.value;

    this.tasksService.save(task)
      .pipe(
        catchError((error: any) => {
          this.handleError(error);
          return empty();
        }),
        finalize(() => {
          this.blockers.api_processing = false;
        })
      )
      .subscribe(() => {
        this.actionClose();
        return;
      });

  }

  private showInfo(info: {[k: string]: string} = {message: null, type: 'info'}): void {
    this.info = info;
    return;
  }
}
