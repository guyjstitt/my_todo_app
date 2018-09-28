import { PermissionsService } from './../../../core/services/permissions.service';
import { TaskService } from './../../../shared/services/task/task.service';
import { TodoService } from './../todo.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BeyondService } from '@getbeyond/ng-beyond-js';
import { Observable, Subscription } from 'rxjs';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Task } from '../../../shared/models/task.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Permission } from '../../../shared/models/permission.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, OnDestroy {
  public permissions: Permission = null;
  public canEdit: boolean;
  public formGroup: FormGroup;
  private subscriptions = new Subscription();
  private getTaskSub: Subscription;

  constructor(
    private todoService: TodoService,
    private taskService: TaskService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private permissionsService: PermissionsService
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.permissions = data && data.permissions;

      if (this.permissions) {
        this.canEdit = this.permissions.todo_admin;
      }
    });

    this.formGroup = this.fb.group({
      tasks: this.fb.array([])
    });

    const userId = this.permissionsService.userInfo && this.permissionsService.userInfo['id'];
    const filters = !this.canEdit ? { assigned_user_id: userId } : null;

    this.getTaskSub = this.taskService.load(filters).subscribe((tasks) => {
      for (const task of tasks) {

        const formGroup = Task.asFormGroup(task);

        this.subscriptions.add(
          formGroup.valueChanges.subscribe((value: Task) => {
            this.taskService.save(value);
          })
        );

        (this.formGroup.get('tasks') as FormArray).push(formGroup);
      }
    });
  }

  ngOnDestroy() {
    this.getTaskSub.unsubscribe();
    this.subscriptions.unsubscribe();
  }

  actionOpenTaskModal(taskId: string | number = 'new'): void {
    this.router.navigate(['todo/task', taskId]);
  }
}
