import { Task } from './../../../shared/task/task.model';
import { TodoService } from './../todo.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BeyondService } from '@getbeyond/ng-beyond-js';
import { Observable, Subscription } from 'rxjs';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

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
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.formGroup = this.fb.group({
      tasks: this.fb.array([])
    });

    this.getTaskSub = this.todoService.getTasks().subscribe((tasks) => {
      for (const task of tasks) {

        const formGroup = Task.asFormGroup(task);

        this.subscriptions.add(
          formGroup.valueChanges.subscribe((value: Task) => {
            this.todoService.saveTask(value);
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
}
