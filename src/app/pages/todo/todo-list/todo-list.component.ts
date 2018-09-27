import { TaskService } from './../../../shared/services/task/task.service';
import { TodoService } from './../todo.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BeyondService } from '@getbeyond/ng-beyond-js';
import { Observable, Subscription } from 'rxjs';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Task } from '../../../shared/models/task.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, OnDestroy {
  public formGroup: FormGroup;
  private subscriptions = new Subscription();
  private getTaskSub: Subscription;

  constructor(
    private todoService: TodoService,
    private taskService: TaskService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      tasks: this.fb.array([])
    });

    this.getTaskSub = this.taskService.load().subscribe((tasks) => {
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
